# Lead form: optional detail fields + conversion tracking

**Date:** 2026-09-01
**Status:** approved, ready to build

## Problem

Two separate gaps, found while auditing the multi-step projection form.

**1. We capture no qualitative detail.** The form collects property facts
(address, beds, baths, sqft, listing status) and contact details, but nothing
about intent: when the owner wants to start, what is wrong with their current
setup, or anything they want to say in their own words. That detail is what
decides who to call first and what to say.

**2. There is no conversion tracking at all.** GA4 records `call_click` but has
no event for a form submission. So the site cannot answer which of its 939 pages
produce leads, or where people abandon the form. We are optimising for leads
with analytics that cannot see leads.

## Evidence

Pulled from the live D1 database, all 17 leads to date:

| Field | Filled / seen |
|---|---|
| Name, Email | 17 / 17 |
| Property Address | 15 / 15 |
| Bedrooms, Bathrooms, Type, Priority | 14 / 14 |
| Phone (labelled optional) | 13 / 13 |
| Square Feet, Currently Listed, Months Available | 12 / 12 |

Every field is filled by everyone who sees it, including the one marked
optional. **This does not prove adding fields is free** — the database only
contains people who finished. Anyone who abandoned on step 3 never appears.
That blind spot is precisely why the tracking half of this matters.

## Design

### Three optional fields, step 4 only

Placed below name/email/phone and above the legal line, under a quiet
"Optional" heading so the submit button keeps the visual focus. Steps 1-3 do
not change.

| Field | Question | Control |
|---|---|---|
| `message` | Anything else we should know? | textarea |
| `timeline` | When are you hoping to start? | pills: ASAP / 1-3 months / 3-6 months / Just exploring |
| `changeReason` | What's not working right now? | pills, conditional |

**Why `message` and not `notes`.** The Telegram card already special-cases
`/message|comment|how can we help/i` and renders that field large with a 💬
instead of as a small bullet. Naming it `message` earns that treatment for
free. `notes` is deliberately avoided: it is already the Lead Desk's *internal
private notes*, and having the owner's words and the team's private note share
a label is how the wrong one eventually gets pasted into an email.

**Why `changeReason` is reused.** The HOA variant already asks "What's
prompting the change?" under that name. Reusing it means one field name, one
label everywhere. It is therefore suppressed on HOA to avoid double-asking.

**Conditional rule.** `changeReason` appears only when the owner has indicated
an existing arrangement — `currentlyListed`, `tenantInPlace` or
`currentlyManaged` is 'yes'. Those are answered on steps 2-3 and are locked by
the time step 4 renders, so **the step never changes shape while the user is
looking at it**. That is what separates helpful conditional logic from a form
that feels unstable.

### Conversion tracking

- `generate_lead` on successful submit — GA4's standard recommended event name,
  so it appears in reports without custom configuration. Dimensions: page path,
  form variant, and whether a phone number was supplied.
- `form_step` on each advance — dimensions: step number, form variant.

Together these answer "which pages produce leads" and "where do people drop",
neither of which is answerable today.

## What this must not break

| Risk | Mitigation |
|---|---|
| ssmproperty.com posts to the same `/api/lead` | Its payload and the endpoint contract are untouched. New fields are additive and originate only in this form. |
| Database schema | None needed. `raw_lead` is a JSON blob. |
| A user getting stuck | Optional fields carry no validation. No new failure path exists. |
| Cluttered Telegram cards and emails | `clean()` in `src/lib/leads.ts` drops empty values before send, so a skipped field produces exactly today's output. |
| Lead Desk regression | Not modified. |

Telegram, email and the admin panel all iterate every field in `raw_lead`
already — `_card.js` carries a comment stating a new field appears
automatically without touching that file — so no downstream code changes are
required for the fields to render, correctly labelled, in all three places.

## Out of scope

- **Address autocomplete.** `geoapifyKey` is blank so step 1 is a plain text
  input. Turning it on would cut friction at the highest-abandonment field, but
  it needs an API key from the owner. Raised and deferred.
- **Phone's "(optional)" label.** 13 of 13 supply it anyway. Working; leave it.
- **Success screen.** Already personalised, variant-specific and sets a
  one-business-day expectation. No change.

## How we will know it worked

- `generate_lead` appears in GA4 within a day, and lead counts there reconcile
  with the Lead Desk total.
- `form_step` shows a step-by-step funnel; any step with a sharp drop is the
  next thing to fix.
- The three new fields appear in the Telegram card, the email and the Lead Desk
  on the first submission that uses them, without further code changes.
- If `generate_lead` counts diverge from D1 counts, the tracking is wrong and
  should be trusted less than the database.
