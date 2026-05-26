# Keystone Stays — STR Management Marketing Site
### Design Spec — 2026-05-26

> Working brand name: **Keystone Stays** (centralized in config; trivially renamable).
> This document is the authoritative contract for the build. All page-building agents must follow the design system, content rules, and file-ownership map defined here.

---

## 1. Overview & Goals

A market-dominating marketing website for a short-term-rental (STR) **property management** company. Primary purpose: generate **owner leads** — homeowners who want us to manage their Airbnb/VRBO for a fee. Arbitrage is a secondary offer.

- **Launch market:** Atlanta, GA (fully built out).
- **Architecture:** national brand, **clone-per-city** — adding a market = adding data entries, not rebuilding.
- **Primary conversion:** "Free custom rental projection" — a multi-step lead form; our team delivers a real, comps-based number. **No auto-calculated number is shown on-site.**
- **Win condition:** look like the biggest, most credible, most premium STR manager in the market AND out-rank everyone on local + owner-intent SEO.

### Strategic positioning (the spine)
**"The Premium Local Authority" — the local expert, at national quality.** Research (see `/research`) shows the market splits into (a) national brands with authority but no local soul and corporate, blended guest/owner sites, and (b) local operators with credibility but dated sites, no pricing transparency, and no SEO infrastructure. **Nobody is both local AND national-quality.** We take that throne.

---

## 2. Brand

- **Name:** Keystone Stays (config: `site.brandName`).
- **Personality:** confident, warm, precise. Boutique-hotel hospitality, not corporate property management. "The most competent person in the room who also genuinely loves hosting."
- **Tagline options (config):** "Atlanta's home for effortless hosting." / "Your home, hosted flawlessly." / "Five-star hosting, handled."
- **Voice:** plain-spoken expertise. Short, confident sentences. Specific and local. Never hypey-empty; never corporate jargon.

---

## 3. Content & Integrity Rules (LOCKED — every agent must obey)

These are non-negotiable guardrails (also stored in memory + global CLAUDE.md):

1. **Hype through framing, never fabricated numbers.** Project scale with credible-but-vague language ("a growing portfolio of homes across metro Atlanta," "hundreds of five-star stays," "millions in bookings managed"). NEVER invent precise statistics stated as fact (no "we manage 437 homes" unless real).
2. **Every hard number is real or clearly market-sourced.** Real numbers come from the owner via config; illustrative market figures must be framed as market data with a source. Nothing that could be "totally wrong."
3. **No fabricated testimonials.** No fake named reviews. Use clearly-marked placeholder testimonials (in `src/data/testimonials.ts` with a `placeholder: true` flag and a comment) for the owner to replace with real proof. Same for press logos / award badges.
4. **All business facts live in config, not hardcoded in pages.** Fee %, guarantee terms, contract terms, phone, email, address, service-area list, scale claims, social links — ALL in `src/config/site.ts`. These are values the owner sets to real data; we ship sensible, clearly-flagged placeholders.
5. **Recommended-but-unconfirmed commitments are flagged.** The money-back guarantee and "no long-term contract" are powerful differentiators but are business decisions. Ship them ON by default with placeholder terms, each behind a config flag (`features.guarantee`, `features.noLockIn`) and a `// CONFIRM with owner` comment.
6. **Zero AI fingerprints.** Nothing in copy, comments shipped to client, metadata, or generated assets signals how the site was built. No "AI-generated" anywhere.

---

## 4. Information Architecture

### Global pages
| Route | Purpose | Primary keyword target |
|---|---|---|
| `/` | Home — positioning, proof, funnel entry | airbnb management atlanta |
| `/how-it-works/` | The onboarding-to-payout process | how does airbnb management work |
| `/services/` | Full-service management scope | short term rental management services |
| `/pricing/` | Transparent fee + what's included | airbnb management fees / cost atlanta |
| `/rental-projection/` | Lead-magnet landing + the multi-step form | what could my airbnb earn / free rental estimate |
| `/about/` | Story, local credibility, team, trust | (brand + trust) |
| `/contact/` | Contact + secondary lead form | contact / phone |

### Local SEO engine (clone-per-city)
| Route | Purpose |
|---|---|
| `/areas-we-serve/` | Hub: links to city + all neighborhoods |
| `/[city]/` | City landing (Atlanta built; dynamic from `content/cities`) |
| `/[city]/[neighborhood]/` | Neighborhood landing (dynamic from `content/neighborhoods`) |

**Atlanta neighborhoods built at launch (8):** Buckhead, Midtown, Old Fourth Ward, Inman Park, Virginia-Highland, Grant Park, East Atlanta Village, Decatur. (Template scales to more + to other cities.)

### Content / authority hub (`/resources/`)
| Route | Purpose | Why |
|---|---|---|
| `/resources/` | Blog/resource hub | topical authority |
| `/resources/airbnb-management-cost-atlanta/` | Fees/cost pillar + FAQ schema | high commercial intent |
| `/resources/atlanta-short-term-rental-regulations/` | Definitive regulations hub | earns links, AI-cited |
| `/resources/is-airbnb-management-worth-it/` | Decision content, self-manage vs hire | informational→commercial |

### Comparison / alternative pages (`/compare/`)
- `/compare/vacasa-alternative/` — "The local alternative to Vacasa."
- `/compare/evolve-alternative/`
- `/compare/awning-alternative/`

### Campaign landing (timely)
- `/world-cup-2026-atlanta/` — Atlanta is a FIFA World Cup 2026 host city (matches summer 2026). Owner-acquisition landing: "Rent your Atlanta home during the World Cup." Near-zero competition; window closes after July 2026. (Verify exact match dates before publishing claims.)

### Utility
- `sitemap-index.xml` (via @astrojs/sitemap), `robots.txt`, custom `404`.

---

## 5. Page Blueprints (key sections)

**Home (`/`):**
1. Hero — headline (local + premium), subhead, primary CTA "Get my free rental projection" → `/rental-projection/`, secondary "See how it works." Background: editorial interior photo (placeholder). NO fabricated earnings number in hero; optional sourced market range behind config `features.marketRange` (default OFF).
2. Trust strip — review-platform marks + "X five-star stays" style framing (config-driven, vague-credible), press/logo cloud (placeholder).
3. The problem/why-a-manager — self-managing pain → our solution.
4. What we do (services overview, 4–6 cards linking to `/services/`).
5. Why Keystone (the Local Authority differentiators: local expertise, transparent fee, guarantee, no lock-in, full-service).
6. How it works (3–4 step condensed → `/how-it-works/`).
7. Local proof — "We know Atlanta" mini neighborhoods grid → `/areas-we-serve/`.
8. Results framing / owner outcomes (vague-credible).
9. Testimonials (placeholders).
10. FAQ (FAQPage schema).
11. Final CTA band → projection funnel.

**Services (`/services/`):** Full-service scope — listing creation & optimization, dynamic pricing, guest comms 24/7, cleaning & turnovers, maintenance coordination, restocking, professional photography, review management, multi-platform distribution (Airbnb/VRBO/Booking), owner dashboard/reporting. Each as a detailed block. Service schema.

**Pricing (`/pricing/`):** Transparency as a weapon. Single clear management rate (config `pricing.rate`, default "starting at 15%" — `// CONFIRM`), "what's included" checklist, "what we DON'T charge for" (anti-hidden-fee), guarantee + no-lock-in callouts, comparison vs typical national fee (framed as market-typical), fee FAQ (FAQPage schema). CTA → projection.

**Rental Projection (`/rental-projection/`):** Lead magnet landing wrapping the multi-step form (Section 6). Trust framing: "a real comps analysis, not an algorithm." Social proof + objection handling near the form.

**How it works:** Onboarding → setup → launch → ongoing management → payouts. Numbered, with timeline. Reassurance on owner control.

**About:** The Local Authority story; founder/team (placeholder); "why we started"; local roots; trust signals; values. (No fabricated bios stated as fact — placeholder-flagged.)

**Contact:** Phone (config), email (config), service area, short contact form, map of service area. LocalBusiness emphasis.

**City page `/atlanta/`:** H1 "Airbnb & Short-Term Rental Management in Atlanta"; local market intro; neighborhoods grid; local stats framing; regulations teaser → regulations hub; why local matters; testimonials (local placeholders); FAQ (Atlanta-specific); CTA. This template is data-driven so other cities clone it.

**Neighborhood page `/atlanta/[neighborhood]/`:** Hyper-local: neighborhood intro (character, demand drivers, nearby attractions), why STR works there, our local management, mini-FAQ, CTA. Data-driven from `content/neighborhoods`.

**Resources pillars:** Long-form, genuinely useful, FAQ schema, internal links to money pages. Regulations hub must summarize *current* rules with sources (City of Atlanta permit ~$150/yr + 2-property cap; DeKalb County program; metro variations) — keep factual and sourced.

**Compare pages:** Honest, tasteful positioning vs competitor (local vs national, transparency, service). No defamation; factual + framed. CTA → projection.

**World Cup landing:** Urgency + opportunity for owners; "maximize your home during the World Cup"; capture lead via projection form (variant). Verify match facts before publishing.

---

## 6. Conversion Funnel Spec (the projection form)

Grounded in the funnel teardown (`/research/04-conversion-funnels.md`). Multi-step (4 steps) > single page (research: materially higher completion).

- **Step 1 — Address.** Single address field (autocomplete optional/progressive-enhanced; plain text fallback). CTA: **"Start my projection."** Progress: Step 1 of 4.
- **Step 2 — Property details.** Bedrooms, bathrooms, property type (icon radios), optional square footage. CTA "Next." No contact info yet.
- **Step 3 — Intent qualifier.** Currently listed? (and platforms) · months/year available · "What matters most?" (maximize income / truly passive / just exploring). Segments follow-up + qualifies lead.
- **Step 4 — Contact.** First name + email (required), phone (optional, honest framing: "Optional — lets us deliver your projection faster"). Submit: **"Send me my free projection."** Directly below: "No sales pitch. Just honest Atlanta data. No obligation — ever. We'll reply within 1 business day."
- **Confirmation.** "Your projection is in the works. No sales call unless you want one." Set expectation (1 business day).

**Implementation:** React island (`@astrojs/react`) — `ProjectionForm.tsx`. State machine for steps, client-side validation, accessible (labels, focus management, keyboard, aria-live for step changes + errors), progress bar, back button, no data loss between steps. Submits to a **configurable endpoint** (`site.forms.projectionEndpoint`) — default a clearly-marked placeholder (Formspree/Netlify-Forms-ready) with a graceful success state even if endpoint unset (stores nothing, shows confirmation). `// INTEGRATE` comment. Honeypot + basic anti-spam. No tracking that leaks PII; no third-party scripts beyond the form endpoint.

---

## 7. Design System

**Colors (Tailwind theme tokens):**
- `forest` #14342B (primary brand dark) · `forest-700` #1C4A3C · `forest-50` #EAF1ED
- `brass` #C9A24B (accent/CTA) · `brass-600` #B08A38 · `brass-50` #F7EFD9
- `cream` #F7F4EC (light bg) · `ink` #1A2420 (body text) · `stone` #6B7770 (muted) · `line` #E2E0D6 (borders) · white.
- Dark sections: `forest` bg, cream/white text, brass accents. Light sections: cream/white bg, ink text.

**Typography:**
- Display/headlines: **Fraunces** (variable, via `@fontsource-variable/fraunces`) — premium serif. Tight leading, optical sizing.
- Body/UI: **Inter** (variable, via `@fontsource-variable/inter`).
- Self-hosted (fontsource) for performance + reliability.
- Scale: generous. Hero h1 clamp(2.75rem, 6vw, 4.5rem). Section padding py-24/py-32. Max content width ~1200px container.

**Components (shared, in `src/components/ui/`):** `Button` (primary brass, secondary outline-forest, link), `Container`, `Section` (light/dark variants), `Eyebrow` (small caps label), `Card`, `Stat`, `Badge`, `Accordion`/`FAQ` (with FAQPage JSON-LD emitter), `TestimonialCard`, `LogoCloud`, `CTABand`, `NeighborhoodCard`, `StepList`, `CheckList`. Layout: `Header` (sticky, transparent-over-hero → solid on scroll, primary CTA button), `Footer` (nav, service-area links, NAP, social, legal).

**Motion:** subtle fade/translate on scroll (prefers-reduced-motion respected). No gimmicks.

**Imagery:** editorial interior/exterior photography. Use high-quality royalty-free placeholders (e.g., Unsplash via local download or referenced) clearly swappable; consistent warm grade. Provide an `images` manifest. (No AI-watermarked assets.)

---

## 8. SEO Architecture

- **On-page:** unique `<title>` + meta description per page (templated, keyword-led, brand-suffixed), one `<h1>`, logical h2/h3, descriptive alt text, canonical URLs, semantic HTML.
- **Keyword→page map:** as in IA tables. Head terms on money pages; long-tail/neighborhood on local pages; informational on resources.
- **Schema (JSON-LD, via helpers in `src/lib/schema.ts`):** `Organization` + `LocalBusiness` (sitewide, with NAP/areaServed/geo from config), `Service` (services), `FAQPage` (any page with FAQ), `BreadcrumbList` (all deep pages), `Article` (resources), `WebSite` + `SearchAction` (home).
- **Local SEO:** city + neighborhood pages, `/areas-we-serve/` hub, consistent NAP in footer + schema, GBP-aligned category language ("Vacation Home Rental Agency"), embedded service-area. (GBP/Yelp/directory submissions = off-site task list in spec §11.)
- **Technical:** `@astrojs/sitemap` → sitemap-index, `robots.txt` (allow + sitemap ref), fast (Astro ships ~0 JS except form island), responsive/mobile-first, accessible (WCAG AA target), OG/Twitter meta + OG image per page (default + per-page), clean URLs (trailing slash consistent), 404.
- **Internal linking:** money pages interlinked; resources link to services/pricing/projection; neighborhoods ↔ city ↔ areas hub; compare pages → projection.
- **GEO/AI search:** definitive, well-structured answers + FAQ blocks on key pages (cited by AI assistants); concise "answer-first" paragraphs on informational pages.
- **Performance budget:** Lighthouse 95+ perf/SEO/best-practices/a11y on key pages (verify in QA).

---

## 9. Tech Stack & Build Approach

- **Framework:** Astro (latest), TypeScript (strict).
- **Styling:** Tailwind CSS (theme tokens above) — via the current Astro-recommended integration (verify at scaffold; adapt if deprecated).
- **Interactivity:** `@astrojs/react` for the `ProjectionForm` island only (keep JS minimal elsewhere).
- **Content:** Astro **content collections** — `cities`, `neighborhoods`, `resources` (MD/MDX), plus `src/data/*.ts` for testimonials, services, faqs, comparisons.
- **Config:** `src/config/site.ts` — single source of truth for all business facts (§3.4).
- **Fonts:** `@fontsource-variable/fraunces`, `@fontsource-variable/inter`.
- **Sitemap:** `@astrojs/sitemap`.
- **Forms:** configurable endpoint (placeholder), graceful no-op success if unset.
- **Deploy target:** static output, host-agnostic (Netlify/Vercel-ready). No server required for v1.
- **Quality gates:** `pnpm build` must pass; `astro check` (types) clean; local run + browser QA of golden path.

---

## 10. Build Plan — File-Ownership Map (parallel agents)

**Foundation (orchestrator builds first, committed before any agent runs):** scaffold, `astro.config`, Tailwind theme, `tsconfig`, fonts, global CSS, `src/config/site.ts`, content-collection schemas (`src/content/config.ts`), `src/lib/schema.ts` + `src/lib/seo.ts`, `BaseLayout.astro`, `Header`, `Footer`, ALL `src/components/ui/*`, `src/data/*` stubs, placeholder image manifest, the `ProjectionForm.tsx` island. This establishes every convention agents consume.

Then parallel agents (each owns disjoint files; all import shared components; none edit config/components/layout):
- **Agent 1 — Home + global pages:** `/`, `/how-it-works/`, `/about/`, `/contact/`.
- **Agent 2 — Money pages:** `/services/`, `/pricing/`, `/rental-projection/` (page wrapping the island; island already built).
- **Agent 3 — Local engine:** `/areas-we-serve/`, `/[city]/index.astro`, `/[city]/[neighborhood].astro`, plus `content/cities/atlanta` + `content/neighborhoods/*` (8 Atlanta neighborhoods) data.
- **Agent 4 — Authority + compare + campaign:** `/resources/` hub + 3 pillar articles, `/compare/*` (3), `/world-cup-2026-atlanta/`.

Orchestrator then integrates (nav/footer links, sitemap, robots, OG images, 404), runs SEO/schema/a11y/perf polish, builds, runs, and does browser QA.

---

## 11. Out of Scope (future phases)
- Off-site SEO execution (GBP setup, Yelp, directory submissions — list provided as deliverable, but submissions are owner actions).
- Real content/assets swap (owner provides photos, real testimonials, real fee, NAP, guarantee terms).
- Additional cities beyond Atlanta (data-add only).
- CMS/blog authoring UI, owner dashboard app, booking integration, analytics wiring (add post-launch).
- Domain + hosting provisioning (owner decision).

---

## 12. Success Criteria
- Looks unmistakably premium + local; visibly outclasses every competitor in `/research`.
- Full Atlanta page set + 8 neighborhoods live and interlinked.
- Projection funnel works end-to-end (4 steps → confirmation), accessible, mobile.
- `pnpm build` + `astro check` pass; Lighthouse 95+ on key pages.
- Complete SEO: titles/meta/schema/sitemap/robots/internal links.
- Clone-per-city ready (adding a city = adding data).
- Zero AI fingerprints; all business facts config-driven with placeholders flagged.
