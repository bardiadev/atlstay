// Inputs for /compare/* pages. Keep competitor claims GENERAL and defensible —
// positioning, not precise figures that could be wrong/outdated. Verify any
// specific stat against a current source before publishing. Our strengths are
// the focus; the contrast is honest, never disparaging.
export interface Comparison {
  slug: string;
  competitor: string;
  headline: string;
  summary: string;
  /** Honest, general contrasts — framed as "why owners choose local". */
  theirModel: string[];
  ourEdge: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: 'vacasa-alternative',
    competitor: 'Vacasa',
    headline: 'The local alternative to Vacasa in Atlanta',
    summary:
      'Vacasa is one of the largest vacation-rental managers in the country. If you want a national operator, they’re an option. If you want a team that actually knows Atlanta — with transparent pricing and hands-on service — that’s us.',
    theirModel: [
      'A large national operator managing tens of thousands of homes across the country',
      'Pricing and terms that owners often say aren’t clear until later in the process',
      'Service delivered at national scale rather than by a local, Atlanta-based team',
    ],
    ourEdge: [
      'Atlanta-local expertise — neighborhoods, demand, and events we actually know',
      'Transparent, all-inclusive pricing you see before you sign',
      'A premium, hands-on team that treats your home like the only one that matters',
    ],
  },
  {
    slug: 'evolve-alternative',
    competitor: 'Evolve',
    headline: 'A full-service alternative to Evolve in Atlanta',
    summary:
      'Evolve’s model leaves a lot of the day-to-day to the owner. We’re genuinely full-service — you do nothing, and a local team handles everything end to end.',
    theirModel: [
      'A lighter-touch model where owners still coordinate cleaning, guests, and logistics themselves',
      'A national brand rather than a local Atlanta operator',
    ],
    ourEdge: [
      'Truly hands-off — we manage guests, cleaning, pricing, and maintenance for you',
      'Local team, local knowledge, local accountability',
      'Transparent pricing and premium, concierge-level service',
    ],
  },
  {
    slug: 'awning-alternative',
    competitor: 'Awning',
    headline: 'The Atlanta-local alternative to Awning',
    summary:
      'Awning operates nationally with a tech-forward, remote model. We pair professional systems with a real local team on the ground in Atlanta.',
    theirModel: [
      'A national, largely remote management model',
      'Less neighborhood-level local presence in any single market',
    ],
    ourEdge: [
      'Boots-on-the-ground Atlanta team that knows your neighborhood',
      'Premium guest experience tuned to local demand and events',
      'Clear, all-inclusive pricing with no tier games',
    ],
  },
];
