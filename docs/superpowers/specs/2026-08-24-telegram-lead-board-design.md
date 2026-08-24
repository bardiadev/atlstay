# Telegram Lead Board — two-way sync between the group and the Lead Desk

**Date:** 2026-08-24
**Status:** built, deployed and verified live 2026-08-24

## The problem

Lead alerts are a one-way broadcast. A partner reading the group has no way to
say "I called this one", and no way to see whether anybody else already did.
With several partners joining the group, the failure mode is obvious and
expensive: two people call the same owner, or everyone assumes someone else did.

The Lead Desk knows the status, but only Brandon can log in, so that knowledge
is invisible to the people doing the work.

## The idea

The Telegram card stops being a notification and becomes **the shared
workspace**. One message per lead, rewriting itself in place for the life of the
lead. The dashboard and the card are two windows onto the same data — neither is
the authoritative one; the database is.

This is explicitly **not** a claiming/ownership model. Work is collaborative:
partner one calls, partner two emails, partner three sends the proposal. Every
button stays live for everyone, always, so anyone can pick up where anyone else
left off. The card's job is to make the current state obvious at a glance.

## Scope

**In:**
- Five action buttons on lead cards: Called · Emailed · Proposal · Won · Lost
- A lighter set on contact messages: Replied · Not relevant · Move to Leads
- Notes by replying to a card
- Activity history visible on the card and in the dashboard
- Dashboard status changes rewrite the Telegram card
- Re-post the 8 existing leads as live cards
- Trim technical noise out of Telegram (keep it in email + dashboard)

**Out (deliberately):**
- Partner logins to the dashboard — Telegram identity is the only identity
- Editing lead details from Telegram
- Assignment/ownership semantics
- Reporting UI over the event history (the data will support it; the screens can come later)

## Architecture

### A new bot

`@SSM_Lead_bot` ("SilverStone Lead Bot", id 8774799278), dedicated to ATLStay.

The universal "Brandon assistant" bot is **not** used, because receiving button
taps requires `setWebhook`, and that setting is global to a bot. Pointing the
universal bot's webhook at ATLStay would hijack updates for every other project
that shares it. A dedicated bot isolates this permanently.

Verified 2026-08-24: token valid, `member` of the leads group, no webhook set,
privacy mode on.

**Privacy mode stays ON.** With it on the bot still receives callback queries
from its own buttons and replies to its own messages — everything this design
needs. Turning it off would only push unrelated group chatter through the
webhook.

### Components

Each has one job and can be understood without reading the others.

| Module | Responsibility |
|---|---|
| `functions/api/_card.js` | Pure render: `(lead, events) → { text, reply_markup }`. No I/O. |
| `functions/api/_telegram.js` | Telegram transport: send, edit, answer callback. No business logic. |
| `functions/api/_leadEvents.js` | Append and read events; derive status from an action. |
| `functions/api/telegram.js` | The webhook. Validates, dispatches, always answers 200. |
| `functions/api/lead.js` | Existing. Now also posts the card and records where it lives. |
| `functions/boroto/api.js` | Existing. Now writes events and refreshes the card. |

The renderer being pure and shared is the load-bearing decision: both directions
call the same function, so the card and the dashboard cannot drift apart. It is
also trivially testable with no network.

### Data model

**New table `lead_events`** — append-only. Never updated, never deleted.

```sql
CREATE TABLE lead_events (
  id          TEXT PRIMARY KEY,
  lead_id     TEXT NOT NULL,
  action      TEXT NOT NULL,   -- called | emailed | proposal | won | lost
                               -- replied | not_relevant | moved | note | created
  actor       TEXT NOT NULL,   -- display name ("Bardia")
  actor_tg_id TEXT,            -- Telegram user id, null for dashboard actions
  note        TEXT,            -- free text for action='note'
  source      TEXT NOT NULL,   -- telegram | dashboard | system
  created_at  TEXT NOT NULL
);
CREATE INDEX idx_lead_events_lead ON lead_events (lead_id, created_at);
```

Append-only is chosen over a JSON blob on the lead row for one decisive reason:
several partners can tap buttons at the same moment. Inserting a row is atomic;
read-modify-write on a JSON blob silently loses whichever write lands second.
The audit trail it gives ("how many did Sam call in September") is a bonus, not
the justification.

**`leads` gains `tg_cards`** — a JSON array of `[{ chat, mid }]` recording where
this lead's cards live, so either side can rewrite them. JSON is safe here
because it is written once at send time, not concurrently.

### Flow: Telegram → dashboard

1. Partner taps **Proposal**.
2. Webhook verifies the `X-Telegram-Bot-Api-Secret-Token` header, then verifies
   the callback's `chat.id` is a configured chat. Anything failing either check
   is dropped silently with a 200.
3. Append an event (`proposal`, actor from `callback_query.from`, source
   `telegram`).
4. If the action maps to a status, update the lead. `proposal` also stamps
   `proposal_sent_at` if unset.
5. Re-render from `(lead, events)` and edit the card.
6. `answerCallbackQuery` so the button stops spinning, with a short toast
   ("Marked proposal sent").

### Flow: dashboard → Telegram

Brandon changes status in the Lead Desk → the same event is appended
(source `dashboard`) → the card is re-rendered and edited. Editing a Telegram
message sends no notification, so the group updates silently.

### Flow: notes

A partner replies to a card with text. Privacy mode still delivers replies to
the bot's own messages. The webhook matches `reply_to_message.message_id`
against `tg_cards`, appends a `note` event credited to the replier, and
re-renders. The reply itself is left in the chat — it reads as natural
conversation and doubles as the notification the silent edit doesn't give.

### Action → status mapping

| Action | Status effect |
|---|---|
| `called`, `emailed`, `note` | none — logged only |
| `proposal` | `status = proposal_sent`, stamp `proposal_sent_at` |
| `won` | `status = won` |
| `lost` | `status = lost` |
| `replied`, `not_relevant` | none (messages inbox) |
| `moved` | `kind = lead` |

Tapping a status the lead is already in is a no-op with an explanatory toast, so
double-taps don't pollute the history. Touch actions (called/emailed) always
log, because calling twice is a real event worth recording.

### The card

Technical context is stripped: no IP, ISP, operating system, browser, screen,
user agent, or referrer. Those stay in the email and the dashboard, where
they're occasionally useful. The card carries only what someone needs in order
to act, plus who has already acted.

The "Open in Lead Desk" link is removed — partners have no dashboard access, so
it was dead weight.

The activity trail shows the most recent 8 events; older ones collapse to a
count ("+3 earlier"). This keeps a long-running lead's card readable and well
inside Telegram's 4096-character limit.

## Resilience

**The card can always heal.** Editing a bot's own message has no 48-hour limit,
but the system does not depend on that being true. If an edit fails for any
reason, it posts a replacement card, repoints `tg_cards` at the new message id,
and marks the old one superseded if it is still editable. `deleteMessage` is
deliberately not used in this path, because it *does* carry a 48-hour limit and
would fail on exactly the old cards that need healing.

**Events are written before the card is touched.** A Telegram outage can
therefore never lose a partner's action; the card simply catches up on the next
render.

**The webhook always returns 200**, even on internal failure, so Telegram never
enters a retry loop. Failures are recorded, not surfaced.

**`/api/lead` keeps its fail-soft guarantee.** Card posting is additive: if it
fails, the lead is still stored, still emailed, still alerted. The existing
four-scenario fail-soft test must continue to pass unchanged.

**Bot cutover is fallback-protected.** Sending prefers `TELEGRAM_LEAD_BOT_TOKEN`
and falls back to `TELEGRAM_BOT_TOKEN`, so a misconfiguration during the switch
cannot cost a notification.

## Security

- The webhook is public by necessity. It is protected by Telegram's secret
  token header (a random value we generate and register with `setWebhook`) and
  by an allowlist check on the originating chat id.
- A request failing either check gets a 200 and no processing. It is never told
  why, and never sees lead data.
- The secret token lives in Cloudflare as `TELEGRAM_WEBHOOK_SECRET`, never in
  the repo.
- This repository is public. No customer data, tokens, or chat ids in tests or
  fixtures.

## Testing

Unit tests, no network, in the existing `test/*.test.mjs` style:

1. **Card rendering** — status line, activity trail, trail collapsing past 8,
   stays under 4096 chars, technical fields absent, no Lead Desk link.
2. **Action mapping** — each action produces the right status; no-op on repeat;
   touches never change status.
3. **Webhook security** — wrong secret rejected, unknown chat rejected, both
   still 200, neither reaches the database.
4. **Note matching** — a reply to a known card attaches; a reply to an unknown
   message is ignored.
5. **Fail-soft regression** — the existing four scenarios still deliver.

Live verification after deploy: post a card, tap each button, confirm the card
rewrites and the dashboard agrees, then change status in the dashboard and
confirm the card follows.

## Rollout

1. Migrate D1 (additive: new table, new column).
2. Build and unit-test the modules.
3. Register the webhook with a generated secret.
4. Verify end to end on a single test card, then delete it.
5. Brandon clears the group's old messages.
6. Re-post all 8 leads as live cards, oldest first.
7. Brandon removes Brandon-assistant from the group and adds his partners.

## Open questions

None blocking. Deferred by choice: reporting screens over the event history,
and editing lead details from Telegram.
