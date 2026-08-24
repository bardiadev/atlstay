# Lead Desk — design

**Date:** 2026-08-24
**Status:** approved in brainstorming, ready to plan
**Problem owner:** Brandon (sole operator)

## The problem

Leads are never stored. `functions/api/lead.js` receives a submission, forwards it to
email and Telegram, and forgets it. There is no database and no Cloudflare data
binding of any kind on the project.

Because nothing holds state, an answered lead and an ignored lead are
indistinguishable. That is the direct cause of the reported failure: the last lead
actioned was 14 Aug 2026, and the backlog since then is invisible because it lives
only in an inbox.

Volume is 5–15 leads/week across two brands. Junk is minimal. One operator.

## What we are building

A system of record plus a workspace. Explicitly NOT a CRM, not an email sender,
not a proposal generator.

### 1. Storage — Cloudflare D1

A `leads` table written by `/api/lead` on every submission, from both
atlstay.com and ssmproperty.com (they already share the endpoint).

**Hard constraint: the write must be fail-soft.** `/api/lead` is revenue-critical
for two live sites. The D1 write is wrapped so it can never throw, never blocks,
and never changes the existing email/Telegram behaviour. A deliberate DB failure
must still deliver email + Telegram. This is tested before deploy.

Columns: an id, received_at, brand (derived from the submitting page), form name,
service_interest, the full lead payload as JSON, the full meta payload as JSON,
plus the flattened fields worth querying and sorting on (name, email, phone,
address, service). Then the operator-owned columns: status, proposal_sent_at,
proposal_sent_to, notes, updated_at.

Storing the raw payloads as JSON alongside the flattened columns means a future
form field is captured automatically without a migration — the same property that
already makes the email and Telegram renderers field-agnostic.

### 2. Workspace — /boroto/leads/

Sits behind the existing Basic Auth in `functions/_middleware.js`. No new auth.

**Landing view: counts first.** New · Proposal sent · Won · Lost, plus a
"gone quiet" count (proposal sent, no movement in N days). Click a count, get
that list. One queue for both brands, each row tagged.

**Lead detail is the centrepiece.** Every captured field, grouped into panels
rather than a key/value dump:

- Contact — name, email, phone
- The property — variant-dependent: address/bedrooms/bathrooms/type/sq ft/
  currently listed/platforms/listing URL/months available/priority; or tenant in
  place, current rent, available from; or asset type, unit count, occupancy,
  currently managed; or doors, association type, current manager, contract ends,
  reason for change
- Source — service interest, page URL, referrer, UTM tags
- Session — approx location, device, browser, OS, screen, browser window,
  language, device timezone, submitted local + UTC
- Yours — status, timeline, notes

**Copy everything** — one button that puts the whole lead on the clipboard as
formatted text, ready to paste into Claude or ChatGPT. This is the primary
workflow: the operator writes proposals in their own AI tool and sends from
their own inbox. The system never does either.

**Open in AirDNA** — a link that jumps to the address. AirDNA stays manual (paid
plan, no API); this only removes the retyping.

**Add lead** — a manual entry form, so the backlog currently trapped in email
can be keyed in and the queue started clean.

**Duplicate flagging** — matching email or phone surfaces on the lead.

### 3. Telegram — same alert, reorganised

Currently cherry-picks name/phone/email/address and dumps everything else flat.
Redesigned to lead with the **service category** (HOA board vs house is the
single most useful triage fact), then the qualifying fields, then a link to the
lead in the dashboard. Forensic fields (user agent, screen, browser window) are
dropped from Telegram — they belong on the dashboard.

Destination moves to a group chat. **This is a config change only.** `chat_id` is
passed through unmodified, so a negative supergroup ID works as-is.

**Shared-bot constraint:** the notifier bot is used by the owner's other,
unrelated projects. This project must only ever call `sendMessage` with its own
chat ID. It must NEVER call `setWebhook` or `getUpdates` — those are global to
the bot and would break other projects' notifications. Chat ID is obtained from
the Telegram Web URL, not from the Bot API.

### 4. Dual email recipients

`LEAD_TO_EMAIL` becomes comma-separated so leads reach both
silverstonemgmtllc@gmail.com (work) and hello@bardia.dev (developer).
`to:` is already an array in the Resend call; this splits and trims.

Note to verify at build time: if `LEAD_FROM_EMAIL` is still on the
`onboarding@resend.dev` test sender, Resend restricts delivery to the account
owner's address and the second recipient may silently fail. Must be confirmed
with a real test send, not assumed.

## Explicitly out of scope

File storage (no R2), auto-drafted proposals, automated follow-up emails,
e-signature, anything past "proposal sent", multi-user accounts, lead scoring.

## Stages

New → Proposal sent → Won / Lost. Four states. "Gone quiet" is derived from
proposal_sent_at, not a stored state.

## Risks

1. **Touching /api/lead.** Mitigated by fail-soft wrapping and an explicit
   induced-failure test before deploy.
2. **Second recipient silently not delivering** if the Resend sender is
   unverified. Mitigated by a real test send the owner confirms receiving.
3. **Privacy.** The group chat exposes customer contact details to every member.
   Flagged to the owner; membership is their call.

## Cost

Zero. D1's free tier is orders of magnitude beyond 5–15 leads/week.
