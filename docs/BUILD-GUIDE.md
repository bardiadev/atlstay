# Build Guide — read before building any page

Shared reference for page-building agents. The full design contract is in
`docs/superpowers/specs/2026-05-26-str-management-site-design.md`.

## Mission & non-negotiable rules
- Premium STR **management** marketing site. Positioning: **"The Premium Local Authority"** — the local expert at national quality. Audience: **Atlanta homeowners** who would hire us to manage their Airbnb/Vrbo. Every page funnels to the primary CTA → **`/rental-projection/`**.
- **CONTENT INTEGRITY (critical):**
  - Never invent precise stats/numbers as fact. Use the credible-but-vague phrases in `site.scale`.
  - No fabricated testimonials beyond the flagged placeholders in `@/data/testimonials`.
  - All business facts (fee, phone, email, guarantee, etc.) come from `@/config/site` — never hardcode them.
  - Never hint the site was AI-built. No "AI-generated" anywhere.
- **Copy voice:** confident, warm, precise. Specific and local (name real Atlanta neighborhoods, events, demand drivers). Short sentences. Premium hospitality, not corporate property-management. Make owners feel "these people clearly know my market AND this is the most legit operation I've seen."
- Quality bar: this must visibly out-class Vacasa/Evolve/Awning/Awning and every local competitor. No filler. Real, persuasive, scannable.

## Tech & conventions
- **Astro 6 + Tailwind v4 + TypeScript.** React island only for the form.
- **Use the `@/` import alias** (→ `src/`). e.g. `import Section from '@/components/ui/Section.astro'`. (Avoids fragile `../../`.)
- **Internal links MUST end with a trailing slash** (`trailingSlash: 'always'`). e.g. `/services/`, `/atlanta/buckhead/`.
- **Color tokens (use ONLY these):** `forest`, `forest-700`, `forest-900`, `forest-50`, `brass`, `brass-600`, `brass-50`, `cream`, `ink`, `stone`, `line`. Backgrounds: light sections = `cream`/`white`; dark sections = `forest` (use `cream`/`brass` text on them).
- **Fonts:** `font-display` (Fraunces) for headings, `font-sans` (Inter) is the default body.
- **Section rhythm:** wrap each band in `<Section variant=...>` + `<Container>`. Vertical padding is built in.
- **Images:** reference the manifest — `import { images } from '@/data/images'`; `<img src={images.heroHome.src} alt={images.heroHome.alt} loading="lazy" />`. Hero images use `loading="eager"`. Put images in fixed-aspect wrappers with `object-cover`. (Real files are downloaded separately to `/public/images`.)
- **DO NOT EDIT** shared files: `src/config/*`, `src/lib/*`, `src/layouts/*`, `src/components/ui/*`, `src/components/layout/*`, `src/data/*`, `src/content.config.ts`, `astro.config.mjs`, `src/styles/global.css`. If you need a bespoke section component, create it under **your assigned folder** `src/components/<area>/` with an area-prefixed name (e.g. `HomeHero.astro`).

## How to build a page
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Section from '@/components/ui/Section.astro';
import Container from '@/components/ui/Container.astro';
import Eyebrow from '@/components/ui/Eyebrow.astro';
import Button from '@/components/ui/Button.astro';
import FAQ from '@/components/ui/FAQ.astro';
import CTABand from '@/components/ui/CTABand.astro';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';

const faqs = [{ q: '…', a: '…' }];
const schemas = [
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }]),
  serviceSchema({ name: 'Short-term rental management', description: '…' }),
];
---
<BaseLayout title="Page title (no brand suffix — added automatically)" description="≤155 chars, keyword-led" schemas={schemas}>
  <Section variant="white">
    <Container>
      <Eyebrow>Section label</Eyebrow>
      <h1 class="mt-3 font-display text-4xl text-forest sm:text-5xl">Headline</h1>
      <p class="mt-4 max-w-2xl text-lg text-ink/80">Subhead.</p>
      <Button href="/rental-projection/" size="lg" class="mt-8">Get my free projection</Button>
    </Container>
  </Section>

  <Section variant="cream">
    <Container><FAQ items={faqs} /></Container>
  </Section>

  <CTABand />
</BaseLayout>
```
BaseLayout auto-adds the header, footer, and sitewide Organization/WebSite/LocalBusiness JSON-LD. You only add **page-specific** schema via the `schemas` prop. Pass `image` (a `/images/...` path) for a custom OG image.

## Component catalog (props)
- **Section** — `variant?: 'cream'|'white'|'forest'|'tint'`, `id?`, `class?`. Slot.
- **Container** — `size?: 'narrow'|'default'|'wide'`, `class?`. Slot.
- **Button** — `href?`, `variant?: 'primary'|'secondary'|'ghost'|'inverse'`, `size?: 'md'|'lg'`, `class?`. Slot = label. (No href → renders a `<button>`.)
- **Eyebrow** — small brass label. On `forest` sections add `class="text-brass"`. Slot.
- **Badge** — `variant?: 'brass'|'forest'|'outline'`, `class?`. Slot.
- **Card** — `class?`. Slot.
- **Stat** — `value: string` (a short phrase like "24/7", "5★", "100s" — never a fabricated precise number), `label: string`.
- **CheckList** — `items: string[]`, `columns?: 1|2`.
- **StepList** — `steps: {title,text}[]`.
- **FAQ** — `items: {q,a}[]`, `emitSchema?: boolean` (default true; use the schema-emitting one only ONCE per page).
- **TestimonialCard** — `quote`, `name`, `location?`, `rating?`.
- **LogoCloud** — `heading?`, `logos?: string[]` (factual platform strip).
- **NeighborhoodCard** — `name`, `href`, `imageKey?` (key of `images`), `blurb?`.
- **CTABand** — `heading?`, `text?`, `ctaLabel?`, `ctaHref?`. Defaults to the projection CTA. Drop near the end of most pages.
- **Prose** (`@/components/ui/Prose.astro`) — wrap long-form/markdown HTML for styled typography.

## Data & helpers
- `@/config/site` → `site`: `brandName, tagline, domain, description, contact{phone,phoneHref,email,address{city,region,…},geo}, social, pricing{rate,rateNote}, features{guarantee,guaranteeText,noLockIn,marketRange}, forms{projectionEndpoint}, scale{portfolioPhrase,staysPhrase,bookingsPhrase,ratingPhrase}`.
- `@/data/navigation` → `mainNav`, `footerNav`, `primaryCta`.
- `@/data/services` → `services: Service[]` ({title, short, description, imageKey?}).
- `@/data/testimonials` → `testimonials` (placeholder-flagged).
- `@/data/faqs` → `homeFaqs`, `pricingFaqs`.
- `@/data/comparisons` → `comparisons` (inputs for /compare/*).
- `@/data/images` → `images` (key → {src, alt}), `ImageKey`.
- `@/lib/schema` → `serviceSchema`, `faqPageSchema`, `breadcrumbSchema`, `articleSchema` (org/website/localBusiness are auto-added by BaseLayout — do not re-add).

## The projection form (island)
```astro
import ProjectionForm from '@/components/react/ProjectionForm';
<ProjectionForm client:load />
```

## Content collections (local + resources agents)
Schemas live in `src/content.config.ts`: `cities`, `neighborhoods`, `resources`. Create entries as markdown in `src/content/<collection>/`. Query with `getCollection('…')` and render dynamic routes via `getStaticPaths`.

## SEO checklist for every page
- Unique `title` (≤60 chars, keyword-led) + `description` (≤155). One `<h1>`.
- Logical h2/h3, descriptive `alt` on all images.
- Add `breadcrumbSchema` for any page below the home level.
- Add a FAQ block (great for FAQ schema + AI citations) where it fits.
- Internal-link to relevant money pages (/services/, /pricing/, /rental-projection/, neighborhoods).
- End with `<CTABand />` (or a custom CTA) → `/rental-projection/`.
