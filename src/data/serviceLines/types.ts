// Service-line pages — the SERVICE axis of the site.
//
// Until now the IA had exactly one dimension: location. Every page was
// implicitly a short-term-rental page. These entries add the second axis so
// ATLStay can rank for the whole business Silverstone actually runs —
// long-term, commercial, multi-unit, tenant placement, mid-term/corporate,
// specialty housing, and platform-specific management.
//
// CONTENT INTEGRITY (non-negotiable, see docs/BUILD-GUIDE.md):
//  - Never invent a statistic, price, search volume, or market size.
//  - Any external number MUST carry a real source in `sources` and be quoted
//    with its date. If it cannot be sourced, leave it out.
//  - Never state a competitor's marketing claim as fact.
//  - Fee copy comes from `site.pricing` — never hardcode a percentage.

export type ServiceCategory =
  | 'short-term' // nightly STR / vacation rental
  | 'long-term' // 12-month unfurnished residential
  | 'mid-term' // 30+ day furnished
  | 'commercial' // commercial / multi-unit / investor
  | 'platform'; // platform-specific listing management

export interface ServiceFaq {
  q: string;
  a: string;
}

/** A cited external fact. Everything factual on the page flows through here. */
export interface ServiceSource {
  /** The claim, written exactly as it may appear on the page. */
  claim: string;
  /** Publisher/organisation, e.g. "Georgia Dept. of Economic Development". */
  publisher: string;
  /** Direct URL to the primary source. */
  url: string;
  /** When the figure was published or captured, e.g. "July 2026". */
  asOf: string;
}

/** One block of page body copy. Rendered as an h2 + prose in order. */
export interface ServiceSection {
  heading: string;
  /** 1–4 paragraphs. Plain text; no markdown, no HTML. */
  body: string[];
}

export interface ServiceLine {
  slug: string; // "long-term-rental-management"
  name: string; // "Long-Term Rental Management"
  category: ServiceCategory;

  /** Primary keyword, used in the H1. Keep natural, not stuffed. */
  headlineKeyword: string; // "Long-Term Rental Property Management in Atlanta"
  /** Small brass eyebrow above the H1. */
  eyebrow: string;
  /** Short positioning line. */
  tagline: string;

  /** SEO <title> — <=60 chars, keyword-led, NO brand suffix (auto-added). */
  seoTitle: string;
  /** Meta description — <=155 chars, written to land naturally under the cap. */
  seoDescription: string;
  /** Hero subhead. 1–2 sentences. */
  intro: string;

  /** Who this is for — short, concrete owner profiles. 3–5 items. */
  forWhom: string[];
  /** What's included in the service. 6–12 items. */
  included: string[];
  /** Ordered body sections. 4–7 sections, each 1–4 paragraphs. */
  sections: ServiceSection[];
  /** 5–8 genuinely useful FAQs. These become FAQPage schema. */
  faqs: ServiceFaq[];

  /** Cited facts backing anything numeric on the page. May be empty. */
  sources: ServiceSource[];

  /** City slugs (must exist in the cities collection) for the ×city expansion. */
  marketCities: string[];
  /** Existing /resources/ slugs to cross-link. Must already exist. */
  relatedResources: string[];
  /** Other service-line slugs to cross-link. */
  relatedServices: string[];

  /** Image manifest key for the hero. */
  heroImageKey?: string;
  /** Set false to keep an entry out of the build. */
  published: boolean;
  /** Sort order within its category. */
  order: number;
}
