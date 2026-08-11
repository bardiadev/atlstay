# ATLStay — atlstay.com (folder "STR Mng Website"): Astro marketing site for the Atlanta short-term-rental management business. Repo github.com/bardiadev/atlstay, branch main.

- **Brand:** ATLStay is a secondary SEO brand; the real company is Silverstone Management LLC / ssmproperty.com — same business as the SSM apps. Schema links UP via `parentOrganization`; never present Silverstone's GBP reviews as ATLStay's own.
- **Business facts** (fee, phone, email, stats, address) come only from `src/config/site.ts` — never hardcode new ones in pages. Fields marked `CONFIRM` there are placeholders, not confirmed facts.
- **Phone (678) 938-6413** is unified sitewide (local-SEO NAP consistency) but hardcoded in ~190 files (`src/config/site.ts`, `src/content/resources/*.md`, `functions/api/lead.js`). If it ever changes: grep the whole repo first, then change EVERYWHERE or nowhere.
- **The management fee is a RANGE, 10–15%, never "flat."** `site.pricing` carries `rate` (the range), `rateFrom`, `rateHigh`, `rateBasis`. Copy that says "flat" about the fee is a bug. "Flat" is still correct when it means flat *nightly* pricing — don't sweep those.
- **Owner-confirmed 2026-08-10:** 10+ years in business is correct (not 15). They hold Georgia broker licensure, their lawyers have cleared it, and they legitimately manage long-term rentals and HOAs — write those as real services, don't hedge.

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
