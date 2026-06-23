// =============================================================================
// ATLStay — single source of truth for BUSINESS FACTS.
// The owner sets these to REAL values. Anything marked `CONFIRM` is a sensible
// placeholder pending owner confirmation; anything marked `INTEGRATE` needs
// wiring to an external service. NEVER hardcode these facts inside pages.
// Stats/scale below are the owner's real, verified track record (10+ yrs).
// =============================================================================

export const site = {
  brandName: 'ATLStay',
  tagline: "Atlanta's home for effortless hosting.",
  domain: 'https://atlstay.com', // update before deploy
  description:
    'Premium short-term rental management in Atlanta. We handle everything — listing, pricing, guests, cleaning, and five-star reviews — so your home earns more, effortlessly.',

  // Contact / NAP — used in footer + LocalBusiness schema. Set to REAL values.
  contact: {
    phone: '(678) 938-6413',
    phoneHref: 'tel:+16789386413',
    email: 'hello@atlstay.com', // CONFIRM — placeholder
    address: {
      street: '3343 Peachtree Rd NE',
      city: 'Atlanta',
      region: 'GA',
      postalCode: '30326',
      country: 'US',
    },
    geo: { lat: 33.8487, lng: -84.3637 }, // Buckhead (matches mailing address for NAP consistency)
  },

  social: {
    instagram: '', // CONFIRM
    facebook: '', // CONFIRM
    linkedin: '', // CONFIRM
  },

  // Parent / operating company. ATLStay is a SECONDARY SEO brand; the real
  // company is Silverstone Management LLC (ssmproperty.com), which owns the
  // Google Business Profile. We link UP to it (parentOrganization + footer)
  // rather than claiming its GBP reviews as ATLStay's own.
  company: {
    legalName: 'Silverstone Management LLC',
    name: 'SilverStone Management',
    url: 'https://ssmproperty.com',
    phone: '(404) 751-7841',
    phoneHref: 'tel:+14047517841',
    gbpUrl: 'https://share.google/UvKPapN7lSie0J1ta',
    mapsUrl: 'https://www.google.com/maps/place/SilverStone+Management+LLC/@33.9078682,-84.4876078,17z',
    address: {
      street: '1355 Terrell Mill Rd, Building 1480',
      city: 'Marietta',
      region: 'GA',
      postalCode: '30067',
      country: 'US',
    },
    geo: { lat: 33.9078682, lng: -84.4876078 },
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

  // Lead delivery. Leads email the owner via Web3Forms (free, no backend —
  // perfect for a static Cloudflare Pages site). To turn ON lead emails:
  //   1. Sign up at https://web3forms.com with hello@atlstay.com (60 sec).
  //   2. Paste the Access Key below. That's it — both the projection form and
  //      the contact form will start emailing every lead to that inbox.
  // While blank, forms still work for the visitor (graceful success message)
  // but no data leaves the browser. `projectionEndpoint` is an optional
  // override for a custom POST endpoint (Formspree/Netlify) if ever preferred.
  forms: {
    web3formsKey: '3b77cc25-dd1c-48f9-b8bd-c30905d66335', // public client-side key — Web3Forms fallback inside the lead function
    projectionEndpoint: '/api/lead', // Cloudflare Function → branded Resend email (falls back to Web3Forms)
    // Address autocomplete on the projection form. Get a free key (no credit
    // card, 3,000/day) at https://www.geoapify.com → paste below. Strong US
    // house-number coverage via OpenAddresses. BLANK = plain text field (always
    // reliable; the visitor just types their address).
    geoapifyKey: '',
  },

  // Real, owner-verified track record across the portfolio (10+ years).
  stats: {
    homes: '450+',
    reviews: '10,000+',
    years: '10+',
    foundingYear: 2014,
  },

  // Aggregate rating from real five-star reviews across platforms (owner-verified).
  reviews: {
    ratingValue: '5.0', // shown in visible ReviewProof copy only (omitted from schema markup)
    reviewCount: 10000, // 10,000+ five-star reviews across platforms & years
    bestRating: '5',
  },

  // Google Analytics 4 (gtag) — loaded site-wide from BaseLayout.
  analytics: { gaId: 'G-FVRSWVRPE4' },

  // Scale phrases (now backed by the real numbers above).
  scale: {
    portfolioPhrase: '450+ homes managed across our portfolio',
    staysPhrase: '10,000+ five-star guest reviews',
    bookingsPhrase: 'millions in bookings managed',
    ratingPhrase: '5.0★ across 10,000+ reviews',
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
