# ATLStay — atlstay.com (folder "STR Mng Website"): Astro marketing site for the Atlanta short-term-rental management business. Repo github.com/bardiadev/atlstay, branch main.

- **Brand:** ATLStay is a secondary SEO brand; the real company is Silverstone Management LLC / ssmproperty.com — same business as the SSM apps. Schema links UP via `parentOrganization`; never present Silverstone's GBP reviews as ATLStay's own.
- **Business facts** (fee, phone, email, stats, address) come only from `src/config/site.ts` — never hardcode new ones in pages. Fields marked `CONFIRM` there are placeholders, not confirmed facts.
- **Phone (678) 938-6413** is unified sitewide (local-SEO NAP consistency) but hardcoded in ~190 files (`src/config/site.ts`, `src/content/resources/*.md`, `functions/api/lead.js`). If it ever changes: grep the whole repo first, then change EVERYWHERE or nowhere.
- **The management fee is a RANGE, 10–15%, never "flat."** `site.pricing` carries `rate` (the range), `rateFrom`, `rateHigh`, `rateBasis`. Copy that says "flat" about the fee is a bug. "Flat" is still correct when it means flat *nightly* pricing — don't sweep those.
- **Owner-confirmed 2026-08-10:** 10+ years in business is correct (not 15). They hold Georgia broker licensure, their lawyers have cleared it, and they legitimately manage long-term rentals and HOAs — write those as real services, don't hedge.

## This repository is PUBLIC — never commit customer data
`github.com/bardiadev/atlstay` is public. Real lead names, emails, phone
numbers, addresses and IPs must never enter the working tree — not in tests, not
in fixtures, not in a "temporary" JSON file. (Learned the hard way 2026-08-24: a
real sender's name, work email and phone went into `test/telegram.test.mjs` and
was pushed before I caught it.) Tests use invented data. Import/backlog files
live outside the repo; `.gitignore` blocks `backlog*.json` and friends.

## Lead Desk (/boroto/leads/)
- Two inboxes, split on arrival by form name: `kind='lead'` (projection and
  proposal forms) and `kind='message'` (anything whose form name contains
  "contact"). Either can be moved to the other from the record.
- The panel fetches the whole dataset ONCE and filters in memory. Do not put a
  fetch in an interaction handler — that is what made it feel laggy before.
- **Basic Auth must never be re-enabled on /boroto.** Browsers cache those
  credentials and resend them automatically, which silently defeats "Sign out".
  The signed session cookie is the only way in, and the API's 401 must not carry
  `WWW-Authenticate` or the browser throws up its native prompt again.
- Historical leads are replayed with `scripts/import-leads.mjs`, gated on the
  `LEAD_IMPORT_KEY` Pages secret: it backdates `received_at` and suppresses the
  email, but still stores and still alerts Telegram, in chronological order.

## The Telegram lead board (two-way sync)
The card in the leads group IS the workspace, not a notification. One message
per lead, rewritten in place forever, with action buttons everyone can use.
- **`@SSM_Lead_bot` (`TELEGRAM_LEAD_BOT_TOKEN`) carries this, and it must stay
  dedicated.** Receiving button presses needs `setWebhook`, and that setting is
  GLOBAL to a bot — pointing Brandon's universal notification bot at this site
  would hijack updates belonging to his unrelated projects. `TELEGRAM_BOT_TOKEN`
  remains only as a send fallback.
- **`functions/api/_card.js` is a pure function of (lead, events)** and BOTH
  directions render through it. That is what stops the card and the Lead Desk
  from disagreeing — don't add a second place that formats a card.
- **`lead_events` is append-only.** Several partners can tap the same card at
  once; an INSERT is atomic where read-modify-write on a JSON blob loses races.
  Never "tidy" it into a column on `leads`.
- **Never use `deleteMessage` to replace a stale card.** Editing a bot's own
  message has no time limit, but deletion is capped at 48 hours and would fail
  on exactly the old cards needing repair. `editCards()` heals by posting a
  replacement and repointing `tg_cards`.
- **The webhook has two independent gates** (Telegram's secret header, and an
  allowlist on the originating chat) and always answers 200 so Telegram never
  retry-loops. `test/webhook.test.mjs` proves a failed gate writes nothing and
  leaks nothing — keep it passing.
- Telegram deliberately omits IP/ISP/OS/browser/screen/user-agent/referrer and
  any Lead Desk link: partners have no dashboard login. That detail belongs in
  the email and the dashboard.
- Privacy mode stays ON for the bot. It still receives its own button presses
  and replies to its own cards; turning it off would only add group noise.

## No web-app manifest
A manifest with `display: standalone` is what makes browsers offer to install
the site as an app. It was interrupting real visitors, so it is gone. Do not
re-add `<link rel="manifest">` or `public/site.webmanifest`. The PNG icons stay
— `apple-touch-icon` for bookmarks, `icon-512` for the Organization schema logo.

## Conversion: the form is the funnel, not the email
- **The multi-step projection form is the primary conversion path everywhere.** `hello@atlstay.com` is a real inbox but Brandon does NOT want people emailing — email is the fallback, the form is the ask.
- Put the form in the hero (automatic via `PageHero` — don't pass `hideForm`) **and repeat it down the page.** Long landing pages carry 3+ instances via `@/components/services/ServiceFormBand.astro`.
- Below-the-fold form instances use `client:visible`, never `client:load` — several eager React islands on one page ships the bundle repeatedly on first paint.

## The service axis (added 2026-08-10)
- The site has TWO dimensions now: location and service. Service lines live in `src/data/serviceLines/` (`types.ts` + one file per category + an `index.ts` barrel). Adding an entry there automatically creates the hub page, every service×city page, the schema, the nav entry, and the llms.txt/llms-full.txt sections.
- **Routing trap:** `src/pages/[city]/[neighborhood].astro` catches ANY two-segment path under a city, so `/marietta/long-term-rental-management/` would collide with the real `/marietta/east-cobb/`. Service pages must stay service-first (`/services/{service}/{city}/`). Never nest a service under a city path.
- Every external figure in a service line needs a real `sources` entry (URL + date); the template renders them on-page. Unsourceable → leave the number out.

## Stack & commands
- Astro 6 + Tailwind v4 + TypeScript; React island only for forms. pnpm: `pnpm dev --port 4327` (per `.claude/launch.json`), `pnpm build`, `pnpm check`.
- Before creating/editing any page read `docs/BUILD-GUIDE.md` — color tokens, `@/` alias, do-not-edit shared-files list, copy voice. Internal links must end in `/` (`trailingSlash: 'always'`).

## Hosting & deploy (verified live 2026-07-06)
- Live host = **Cloudflare Pages** — `functions/` runs live and the site serves HEAD. The green "Deploy to GitHub Pages" Action + `public/CNAME` are a DECOY: atlstay.com does not serve that output, so never debug deploys via GitHub Actions. Function env vars/secrets live in the CF Pages dashboard, not the repo.
- Pushing main goes live (auto-deploy repo → the smart gate applies to the push itself).
- After any deploy that adds/changes pages run `node scripts/indexnow.mjs` (pings Bing/Yandex/etc.; Google relies on the sitemap).

## Functions (both load-bearing)
- `/api/lead` is SHARED: ssmproperty.com's live forms POST here cross-origin (CORS allowlist in `functions/api/lead.js`) so both sites use one email+Telegram pipeline — changing its path or payload contract breaks SSMProperty's forms too. Keep the Resend → Web3Forms fallback chain intact: it exists so a lead is never lost.
- `/boroto` = private dashboard: Basic Auth in `functions/_middleware.js` (fails closed without `BOROTO_PASS`), excluded from the sitemap. That middleware also does the www→apex 301 — `public/_redirects` can't match hostnames, so don't move it there.
