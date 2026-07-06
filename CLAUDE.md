# ATLStay — atlstay.com (folder "STR Mng Website"): Astro marketing site for the Atlanta short-term-rental management business. Repo github.com/bardiadev/atlstay, branch main.

- **Brand:** ATLStay is a secondary SEO brand; the real company is Silverstone Management LLC / ssmproperty.com — same business as the SSM apps. Schema links UP via `parentOrganization`; never present Silverstone's GBP reviews as ATLStay's own.
- **Business facts** (fee, phone, email, stats, address) come only from `src/config/site.ts` — never hardcode new ones in pages. Fields marked `CONFIRM` there are placeholders, not confirmed facts.
- **Phone (678) 938-6413** is unified sitewide (local-SEO NAP consistency) but hardcoded in ~190 files (`src/config/site.ts`, `src/content/resources/*.md`, `functions/api/lead.js`). If it ever changes: grep the whole repo first, then change EVERYWHERE or nowhere.

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
