// =============================================================================
// Keystone Stays — single source of truth for BUSINESS FACTS.
// The owner sets these to REAL values. Anything marked `CONFIRM` is a sensible
// placeholder pending owner confirmation; anything marked `INTEGRATE` needs
// wiring to an external service. NEVER hardcode these facts inside pages.
// Scale phrases are credible-but-vague by design — never invent precise stats.
// =============================================================================

export const site = {
  brandName: 'Keystone Stays',
  tagline: "Atlanta's home for effortless hosting.",
  domain: 'https://www.keystonestays.com', // update before deploy
  description:
    'Premium short-term rental management in Atlanta. We handle everything — listing, pricing, guests, cleaning, and five-star reviews — so your home earns more, effortlessly.',

  // Contact / NAP — used in footer + LocalBusiness schema. Set to REAL values.
  contact: {
    phone: '(404) 555-0142', // CONFIRM — placeholder
    phoneHref: 'tel:+14045550142', // CONFIRM
    email: 'hello@keystonestays.com', // CONFIRM — placeholder
    address: {
      street: '', // CONFIRM — blank omits street from schema
      city: 'Atlanta',
      region: 'GA',
      postalCode: '', // CONFIRM
      country: 'US',
    },
    geo: { lat: 33.749, lng: -84.388 }, // Atlanta center (approx; refine)
  },

  social: {
    instagram: '', // CONFIRM
    facebook: '', // CONFIRM
    linkedin: '', // CONFIRM
  },

  // Pricing — radical transparency is a core differentiator. Set REAL rate.
  pricing: {
    rate: '10%', // CONFIRM — base all-in rate; premium/large-scope markets may run higher
    rateNote: 'of booking revenue — all-inclusive, with no hidden fees',
  },

  // Recommended differentiators — business decisions; confirm before publishing.
  features: {
    guarantee: true, // CONFIRM
    guaranteeText: '6-month happiness guarantee', // CONFIRM
    noLockIn: true, // CONFIRM — no long-term contract
    marketRange: false, // keep OFF unless citing a sourced market range
  },

  // Lead-form endpoint. Wire to Formspree/Netlify/etc.; '' = graceful no-op.
  forms: {
    projectionEndpoint: '', // INTEGRATE — e.g. https://formspree.io/f/xxxxxx
  },

  // Scale framing — credible-but-vague ONLY. No fabricated precise stats.
  scale: {
    portfolioPhrase: 'a growing portfolio of homes across metro Atlanta',
    staysPhrase: 'hundreds of five-star stays',
    bookingsPhrase: 'millions in bookings managed',
    ratingPhrase: 'consistently five-star rated', // swap for real aggregate rating
  },

  // Service areas for LocalBusiness areaServed schema (curated highlights; the
  // full market list lives in the cities collection + /areas-we-serve/).
  serviceAreas: [
    'Atlanta, GA', 'Sandy Springs, GA', 'Roswell, GA', 'Alpharetta, GA',
    'Marietta, GA', 'Smyrna, GA', 'Brookhaven, GA', 'Dunwoody, GA',
    'Johns Creek, GA', 'Kennesaw, GA', 'Duluth, GA', 'Peachtree City, GA',
    'Stone Mountain, GA', 'Decatur, GA', 'Savannah, GA', 'Tybee Island, GA',
    'Blue Ridge, GA', 'Helen, GA', 'Athens, GA', 'Lake Lanier, GA',
    'Augusta, GA', 'Columbus, GA', 'Georgia, US',
  ],
} as const;

export type Site = typeof site;
