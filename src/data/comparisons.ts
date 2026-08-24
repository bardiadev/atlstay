// Inputs for /compare/* pages.
//
// FACTS, WITH SOURCES OR NOT AT ALL. These pages previously carried no number a
// reader (or an answer engine) could extract — only soft positioning — so there
// was nothing to cite and nothing to check. They now carry a comparison table,
// under one hard rule: every figure is either taken from the competitor's OWN
// published material and linked, or it is not stated as their rate.
//
// Where a company does not publish a rate, that is what we say. It is accurate,
// it is checkable, and it is a stronger contrast than a guess: ATLStay publishes
// a range openly, and two of the three largest alternatives publish nothing.
// Third-party estimates are labelled as third-party and attributed, never
// presented as the company's own figure.
//
// Never invent, round up, or "estimate" a competitor's fee here. A wrong number
// about a named competitor on a public page is a legal problem, not an SEO one.
// Verified 24 Aug 2026 — recheck the `asOf` dates before relying on them.
export interface Comparison {
  slug: string;
  competitor: string;
  headline: string;
  summary: string;
  /** Honest, general contrasts — framed as "why owners choose local". */
  theirModel: string[];
  ourEdge: string[];
  /** Checkable facts for the comparison table. Every row needs a source. */
  facts?: ComparisonFact[];
}

export interface ComparisonFact {
  label: string;
  /** Their position. Use 'Not published' when the company does not state one. */
  theirs: string;
  /** Ours — must match src/config/site.ts, never restated independently. */
  ours: string;
  /** Where `theirs` came from. Required. */
  source: { publisher: string; url: string; asOf: string };
  /** True when `theirs` is a third-party estimate rather than their own figure. */
  thirdParty?: boolean;
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
    facts: [
      {
        label: 'Management fee',
        theirs: 'Not published. Vacasa states fees are tailored per property and quoted individually.',
        ours: '10–15% of booking revenue, all-inclusive, quoted in writing before you sign',
        source: { publisher: 'Vacasa', url: 'https://www.vacasa.com/homeowner-guides/vacation-rental-management-fees', asOf: '2026-08-24' },
      },
      {
        label: 'Third-party reporting on that fee',
        theirs: 'Industry reviews report a base in the 25–35% range, higher once add-ons are counted. Vacasa itself publishes no figure.',
        ours: '10–15%, published on our pricing page',
        source: { publisher: 'RedAwning (third-party review)', url: 'https://www.redawning.com/pm/post/vacasa-property-management-review-2026', asOf: '2026-08-24' },
        thirdParty: true,
      },
      {
        label: 'Who you contract with',
        theirs: 'Following the Casago acquisition, some markets are franchise-operated rather than corporate — worth asking which you are signing with.',
        ours: 'One Atlanta team. The people who quote you are the people who manage the home.',
        source: { publisher: 'RedAwning (third-party review)', url: 'https://www.redawning.com/pm/post/vacasa-property-management-review-2026', asOf: '2026-08-24' },
        thirdParty: true,
      },
    ],
  },
  {
    slug: 'evolve-alternative',
    competitor: 'Evolve',
    headline: 'A full-service alternative to Evolve in Atlanta',
    summary:
      'Evolve publishes a 10% headline rate — but by their own description it covers the listing and the guest messaging, and leaves cleaning, maintenance and local property care for you to arrange and pay for. Our rate is the whole cost of having the home managed, not the starting point.',
    theirModel: [
      'A lighter-touch model where owners still coordinate cleaning, guests, and logistics themselves',
      'A national brand rather than a local Atlanta operator',
    ],
    ourEdge: [
      'Truly hands-off — we manage guests, cleaning, pricing, and maintenance for you',
      'Local team, local knowledge, local accountability',
      'Transparent pricing and premium, concierge-level service',
    ],
    facts: [
      {
        label: 'Management fee',
        theirs: 'Published: 10% on the Core plan, 15% on Plus, custom pricing on Pro for multi-property owners.',
        ours: '10–15% of booking revenue, all-inclusive',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
      {
        label: 'Onboarding fee',
        theirs: '$250 one-time onboarding fee.',
        ours: 'None',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
      {
        label: 'What the fee covers',
        theirs: 'Listing creation and optimisation, dynamic pricing, distribution, and guest communication. Cleaning, maintenance and on-the-ground property care remain the owner\'s responsibility to arrange.',
        ours: 'Everything, including cleaning coordination, maintenance and on-the-ground care',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
      {
        // The row that makes the comparison like-for-like. A published 10% and a
        // published 10-15% are not the same product, and saying so is both true
        // and a far better argument than hiding their number would have been.
        label: 'What you still pay for separately',
        theirs: 'Cleaning, maintenance, restocking and local property oversight are arranged and paid for by the owner, on top of the management fee.',
        ours: 'Nothing. Our rate is the whole cost of managing the property.',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
      {
        label: 'The honest comparison',
        theirs: 'A published 10% covers the listing and the guest messaging. It is not the total cost of having a property managed.',
        ours: 'One all-inclusive rate covering the listing, the pricing, the guests and everything physical the home needs.',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
      {
        label: 'Contract length',
        theirs: 'No long-term commitment.',
        ours: 'No long-term contract',
        source: { publisher: 'Evolve', url: 'https://evolve.com/blog/homeowner-tips/how-much-should-i-pay-for-vacation-rental-management', asOf: '2026-08-24' },
      },
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
    facts: [
      {
        label: 'Management fee',
        theirs: 'Not published. Awning states the fee is a percentage of gross rental revenue, quoted per property after a free analysis.',
        ours: '10–15% of booking revenue, published before you talk to us',
        source: { publisher: 'Awning', url: 'https://awning.com/post/awning-a-guide-to-property-management', asOf: '2026-08-24' },
      },
      {
        label: 'Setup fee',
        theirs: 'States no setup fee and no maintenance markups.',
        ours: 'None',
        source: { publisher: 'Awning', url: 'https://awning.com/post/awning-a-guide-to-property-management', asOf: '2026-08-24' },
      },
      {
        label: 'Local presence',
        theirs: 'Operates nationwide without geographic restriction.',
        ours: 'Atlanta and Georgia only — we do not manage a home we cannot drive to',
        source: { publisher: 'Awning', url: 'https://awning.com/post/awning-a-guide-to-property-management', asOf: '2026-08-24' },
      },
    ],
  },
];
