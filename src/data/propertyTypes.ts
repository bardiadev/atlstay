// Property-type service pages — programmatic transactional pages targeting
// "{property type} management {Georgia market}" intent. Each type is a real
// asset class with distinct demand, operational realities, and city
// concentration. Copy is hand-written per type (no fabricated stats); city
// lists must match slugs in the cities content collection (or neighborhoods,
// for intown-only types like ADU).

export interface PropertyType {
  slug: string;
  name: string; // "Cabin"
  pluralName: string; // "Cabins"
  /** Used in the H1 heading. */
  headlineKeyword: string; // "Cabin Rental Management"
  /** Short eyebrow tagline. */
  tagline: string;
  /** Free-text label for the markets where this type concentrates. */
  marketLabel: string;
  /** City slugs (from cities collection) where this property type is most relevant. */
  marketCities: string[];
  /** Atlanta neighborhood slugs (from neighborhoods collection) — used for intown-leaning types. */
  marketNeighborhoods?: string[];
  intro: string;
  demand: string;
  operations: string;
  faqs: { q: string; a: string }[];
  published: boolean;
}

export const propertyTypes: PropertyType[] = [
  {
    slug: 'cabin',
    name: 'Cabin',
    pluralName: 'Cabins',
    headlineKeyword: 'Cabin Rental Management',
    tagline: 'North Georgia mountain getaway specialists',
    marketLabel: 'North Georgia mountains',
    marketCities: ['blue-ridge', 'helen', 'dahlonega', 'ellijay', 'big-canoe', 'jasper', 'ball-ground', 'cleveland', 'hiawassee', 'young-harris', 'clayton-ga', 'dillard'],
    intro: 'North Georgia cabin rentals are one of the strongest short-term-rental asset classes in the state — a steady stream of Atlanta-area weekend escapes plus destination travelers from across the Southeast. ATLStay manages cabins across Blue Ridge, Helen, Dahlonega, Ellijay, and the rest of the North Georgia mountain corridor end-to-end: photography, dynamic pricing, guest care, cleaning, hot-tub service, and the freeze prep that mountain rentals specifically need.',
    demand: 'Cabin demand stacks across the year. Fall foliage (mid-October through early November) is the single peak — owners can earn a meaningful share of annual revenue in a 6-week window. Summer pulls families and groups. Holidays, ski weekends to North Carolina, and shoulder-season romance weekends fill the rest. Weddings at mountain venues add booked-out weekends in spring and fall. We price daily against this layered demand.',
    operations: 'Mountain cabins have operational realities that suburban rentals do not. Hot tubs need scheduled service and water-quality checks. Gravel roads and steep driveways affect cleaner access and guest reviews. Wood stoves and fireplaces require sweep schedules and seasoned-firewood supply. Sub-freezing nights need pipe-protection protocols. We run a vetted local cleaning, hot-tub, and handyman network across the entire North Georgia corridor so owners do not have to source vendors from out of market.',
    faqs: [
      {
        q: 'When is the best time to rent out a North Georgia cabin?',
        a: 'Fall foliage (mid-October through early November) is the peak — nightly rates can run 2-3x off-season. Summer is the second-strongest window for families. Romance weekends, weddings, and ski-weekend overflow round out shoulder-season demand. A properly priced cabin should book strongly across at least three of the four seasons.',
      },
      {
        q: 'Do I need a permit to rent a cabin in Blue Ridge or Ellijay?',
        a: 'Permit rules vary by county. Fannin (Blue Ridge), Gilmer (Ellijay), Lumpkin (Dahlonega), and White (Helen) each apply their own short-term-rental ordinances or zoning treatment. We confirm the right path for each cabin during onboarding and handle the licensing process so owners do not have to navigate it alone.',
      },
      {
        q: 'How do you handle hot tub maintenance and freeze prep?',
        a: 'We run a vetted hot-tub vendor across the North Georgia corridor with scheduled cleanings, water-quality checks between guests, and end-of-season drain-and-cover. For freeze prep, we follow a winter protocol — pipe-protection runs on sub-freezing forecasts, scheduled checks during cold snaps, and on-call response for any incidents. This is one of the things owner-managed cabins most often get wrong.',
      },
    ],
    published: true,
  },
  {
    slug: 'lake-house',
    name: 'Lake House',
    pluralName: 'Lake Houses',
    headlineKeyword: 'Lake House Rental Management',
    tagline: 'Lake Lanier, Lake Oconee, Hartwell — full-service lake management',
    marketLabel: "Georgia's lake-house markets",
    marketCities: ['lake-lanier', 'lake-oconee', 'hartwell', 'buford', 'sugar-hill', 'cumming', 'gainesville'].filter((s) =>
      ['lake-lanier', 'lake-oconee', 'hartwell', 'buford', 'sugar-hill', 'cumming'].includes(s),
    ),
    intro: "Georgia lake houses are one of the most seasonal — and most profitable — short-term-rental asset classes in the state. Lake Lanier's south and north shores, Lake Oconee, and Lake Hartwell anchor a summer-driven STR market that captures Atlanta and Southeast travelers all the way through early fall. ATLStay manages lake houses with the dock-side, weather-aware operational layer they require — and the dynamic pricing that captures peak summer weekends.",
    demand: 'Lake demand is heavy and concentrated. Memorial Day through Labor Day is the peak window, with Fourth of July weekend the single biggest revenue night of the year. Spring weekends warm up quickly after Easter; fall holds for warm shoulder weeks. Winter is quiet but not dead — corporate retreats, romance weekends, and family Thanksgivings fill some demand. Wedding-venue lake properties add booked-out weekends in spring and fall.',
    operations: 'Lake houses bring operational realities a typical Airbnb does not. Dock liability, swim-area safety, and boat-lift care affect both guest experience and risk exposure. Weather closures (severe thunderstorms, lightning) require fast guest communication. Lakefront landscaping, debris cleanup after high-wind days, and seasonal pool/dock opening and closing all need a local vendor network. We handle all of this with a vetted lake-specific operations team.',
    faqs: [
      {
        q: 'Can I rent out a lake house on Lake Lanier as an Airbnb?',
        a: 'Often yes, but Lake Lanier communities have a wide range of HOA covenants — some neighborhoods (especially gated lake-access communities) restrict or prohibit short-term rentals entirely. We verify covenants for any lake-house property before recommending positioning, and we map the right marketing strategy to the specific lake-access and dock setup.',
      },
      {
        q: 'When is peak season for a Georgia lake-house rental?',
        a: 'Memorial Day through Labor Day is the unmistakable peak. The Fourth of July weekend can run 3-4x normal nightly rates with multi-night minimums. Shoulder weekends in May, September, and October still earn strong premiums for weddings and fall retreats. Winter is steady but quieter — a well-managed lake house should still earn meaningful off-season revenue.',
      },
      {
        q: 'How do you handle dock and boat-lift liability?',
        a: "We set clear guest house rules around dock and water use, document the property's specific dock and boat-lift conditions in onboarding, and verify proper hosting insurance and liability coverage. We do not let guests use owner-personal watercraft without explicit owner approval and a separate waiver — this is one of the most common ways lake-house owners create unexpected liability exposure.",
      },
    ],
    published: true,
  },
  {
    slug: 'luxury-home',
    name: 'Luxury Home',
    pluralName: 'Luxury Homes',
    headlineKeyword: 'Luxury Home Rental Management',
    tagline: 'White-glove management for premium Atlanta-area properties',
    marketLabel: 'Buckhead, Milton, Alpharetta, Sandy Springs',
    marketCities: ['sandy-springs', 'milton', 'roswell'],
    marketNeighborhoods: ['buckhead', 'ansley-park', 'morningside', 'druid-hills'],
    intro: 'Luxury short-term rentals are a different operating discipline. The guest is paying a premium and expects design-magazine aesthetics, hotel-grade linen, executive-level concierge, and zero-friction arrival. ATLStay manages high-end properties across Buckhead, Milton, Alpharetta, and the rest of the Atlanta luxury corridor with the white-glove operations and elevated guest experience that protect both reviews and asset value.',
    demand: 'Luxury demand is concentrated. Fortune-500 executive stays, celebrity and athlete short-stays, high-end wedding parties and milestone-celebration groups, and film-production talent housing make up most of the calendar. SEC Championship weekend, Music Midtown, NCAA Final Four-tier events drive sharp event premiums in Buckhead. Steady year-round demand comes from corporate relocation and discreet professional stays.',
    operations: "Luxury management is the highest-touch tier ATLStay runs. Stocked premium amenities, professional weekly upkeep between bookings, gardener and pool service coordination, designer-quality replacement of any wear-and-tear, and a discreet concierge line for guests are all standard. Cleanings use restaurant-grade processes — staged photography, white-glove inspection, and zero tolerance for compromise. We protect both the asset and the owner's reputation.",
    faqs: [
      {
        q: 'Do luxury rentals require minimum-stay rules?',
        a: 'Usually yes. We typically recommend 2-3 night minimums on standard weekends and 4-7 night minimums on event weekends. This protects the asset from one-night-party bookings and concentrates the calendar around higher-value stays. Specific minimums are tuned to each property and owner risk tolerance.',
      },
      {
        q: 'How do you screen guests on a luxury property?',
        a: "We layer multiple screening signals: platform-level identity verification, communication-style review, profile-history check, and on-property arrival protocols. For ultra-premium properties we recommend additional verification — government ID confirmation, security deposit holds via the platform, and selective acceptance only of guests whose profile matches the property's intended use.",
      },
      {
        q: 'Can ATLStay handle film production and talent housing in Buckhead?',
        a: 'Yes — Atlanta is one of the top film-production cities in the U.S., and Buckhead and Sandy Springs are the most common talent-housing submarkets. We handle mid-term production stays end-to-end: dedicated production-liaison communication, prop-friendly house rules, accelerated turnover support, and the operational consistency that production schedules require.',
      },
    ],
    published: true,
  },
  {
    slug: 'condo',
    name: 'Condo',
    pluralName: 'Condos',
    headlineKeyword: 'Condo Rental Management',
    tagline: 'Intown high-rise and mid-rise STR specialists',
    marketLabel: 'Midtown, Buckhead, Downtown, Atlantic Station',
    marketCities: ['atlanta'],
    marketNeighborhoods: ['midtown', 'buckhead', 'old-fourth-ward', 'atlantic-station', 'west-midtown'],
    intro: "Atlanta condos are one of the most efficient STR property types: low square footage, premium intown location, and steady year-round demand from corporate and event travelers. ATLStay manages condos across Midtown, Buckhead, Downtown, and Atlantic Station with the operational layer high-rises require — building access logistics, HOA compliance, and concierge coordination — and the pricing strategy that captures Atlanta's deep event calendar.",
    demand: 'Condo demand is a mix of corporate weekday business (Buckhead and Midtown executives, conference attendees), weekend event tourism (GWCC conventions, Mercedes-Benz Stadium events, Fox Theatre shows, BeltLine weekends), and steady leisure travelers drawn to walkable intown amenities. Dragon Con, Music Midtown, NFL home games, and SEC Championship weekend drive the biggest event premiums.',
    operations: 'Condo management is logistics-heavy on the building side. Concierge or front-desk relationships, controlled-access entry coordination, parking validation, amenity rules (pool, gym, rooftop), package handling, and HOA compliance with STR rules all need active management. We run a process designed for high-rise condo realities — every building we manage in has a vetted operational protocol that scales across multiple units in the same property.',
    faqs: [
      {
        q: 'Are short-term rentals allowed in Atlanta condo buildings?',
        a: 'It depends entirely on the specific building. Some Atlanta condo associations explicitly permit STR; others restrict to 30+ day stays; others prohibit STR entirely. We verify HOA rules for every condo before recommending positioning and never list a property in a building where STR is prohibited.',
      },
      {
        q: 'Does ATLStay manage condos in specific Midtown or Buckhead buildings?',
        a: "Yes — we manage condos in multiple Midtown, Buckhead, Atlantic Station, and Downtown buildings. We're happy to confirm whether we already operate in a specific building before owners commit to onboarding. Operating in a building we already know lets us start faster with established concierge and HOA relationships.",
      },
      {
        q: 'How do condos compare to single-family homes for STR returns?',
        a: 'Condos typically earn lower absolute revenue than larger single-family homes but stronger revenue-per-dollar-invested due to smaller acquisition cost and lower operating overhead. Intown high-rise condos earn the strongest premium for corporate weekday and event-weekend pricing; suburban condos compete on family-travel base demand. We model both for any owner considering between asset classes.',
      },
    ],
    published: true,
  },
  {
    slug: 'townhome',
    name: 'Townhome',
    pluralName: 'Townhomes',
    headlineKeyword: 'Townhome Rental Management',
    tagline: 'The mid-tier sweet spot for family and small-group travel',
    marketLabel: 'Metro Atlanta',
    marketCities: ['atlanta', 'sandy-springs', 'roswell', 'marietta', 'smyrna', 'decatur', 'brookhaven', 'alpharetta'],
    intro: 'Townhomes sit at a sweet spot in the Atlanta STR market: more space than condos, lower entry price than single-family homes, walkable to intown amenities, and well-suited to small-group and family travelers. ATLStay manages townhomes across intown Atlanta and the metro suburbs with attention to the operational realities (shared walls, HOA rules, parking) that townhome STR specifically requires.',
    demand: 'Townhome demand fits naturally with small-group travel — 2-4 person business trips, family stays of 3-6 people, milestone celebrations, and short-stay leisure travel. Intown townhomes capture corporate and event demand; suburban townhomes capture family travel, sports-tournament weekends, and corporate-housing mid-term stays. The townhome floor plan is also one of the most popular for traveling nurses and remote workers staying 30+ days.',
    operations: 'Townhome operations focus on three things: HOA compliance (covenants, parking rules, trash schedules), shared-wall noise management (clear quiet-hours, sound-mitigation guidance for guests), and the right parking experience (HOA-controlled garages, guest pass coordination). We codify all three in every townhome listing and house-rules setup.',
    faqs: [
      {
        q: 'Do townhome HOAs allow Airbnb in Atlanta?',
        a: 'It varies. Some Atlanta townhome HOAs explicitly permit STR; others restrict to 30+ day rentals; some prohibit STR entirely. We always check HOA covenants before recommending a strategy. If STR is restricted, mid-term (30+ day) furnished rental is often an alternative with strong demand from traveling nurses and corporate relocations.',
      },
      {
        q: 'How do you manage noise complaints in a townhome?',
        a: 'Prevention first — we set clear quiet-hours in house rules, use smart-noise monitors in shared-wall properties (privacy-respecting decibel only, no recording), screen guests for short stays known to skew toward parties, and respond within minutes to any neighbor or HOA complaint. Quick response is the single biggest factor in keeping HOA relationships healthy.',
      },
      {
        q: 'Are townhomes better than condos for STR returns?',
        a: 'Depends on goals. Townhomes typically earn more absolute revenue than condos due to larger square footage and ability to sleep more guests, but they often have higher operating overhead and HOA restrictions. Condos have stronger revenue-per-dollar-invested in many submarkets. We model both for any owner choosing between asset classes.',
      },
    ],
    published: true,
  },
  {
    slug: 'adu-basement',
    name: 'ADU or Basement Apartment',
    pluralName: 'ADUs and Basement Apartments',
    headlineKeyword: 'ADU & Basement Apartment Rental Management',
    tagline: 'Maximize an existing-home asset without giving up the main residence',
    marketLabel: 'Intown Atlanta neighborhoods',
    marketCities: ['atlanta', 'decatur', 'brookhaven'],
    marketNeighborhoods: ['virginia-highland', 'candler-park', 'inman-park', 'old-fourth-ward', 'morningside', 'east-atlanta-village', 'kirkwood', 'edgewood', 'grant-park', 'reynoldstown'],
    intro: "Accessory dwelling units (ADUs), basement apartments, garage carriage houses, and in-law suites are an under-marketed Atlanta STR asset class. Owners get a meaningful additional income stream from existing property without giving up the main residence — and intown Atlanta's regulatory framework is increasingly favorable for ADUs. ATLStay manages ADU and basement-apartment STR with the owner-occupied operational layer this specifically requires.",
    demand: "ADU and basement-apartment demand skews toward solo travelers and couples — corporate travelers on 3-7 night business stays, traveling nurses on 30-90 day mid-term contracts, remote workers and digital nomads, and design-conscious leisure travelers who want intown walkability at a lower nightly rate than a full home. Many of these units perform best as a mix of short-term and mid-term rather than pure STR.",
    operations: "Owner-occupied ADUs have a distinctive operational rhythm. Separate-entrance access, sound mitigation between unit and main residence, shared utilities or sub-metering, and clear guest expectations about owner presence all need to be set up correctly from the start. We design the guest experience around the owner's actual living arrangement so the property earns reliably without making the owner's daily life harder.",
    faqs: [
      {
        q: 'Are ADUs legal for Airbnb in Atlanta?',
        a: 'Atlanta has been progressively expanding ADU permissions in residential zones, but specific rules vary by neighborhood and zoning overlay. The City of Atlanta Short-Term Rental License requirements apply, and primary-residence rules may affect non-owner-occupied ADUs. We verify the specific zoning, ADU permitting status, and STR licensing requirements before recommending a strategy.',
      },
      {
        q: 'Should an ADU be short-term or mid-term rental?',
        a: 'Often a hybrid. Many owner-occupied ADUs perform best as a mix — short-term during peak demand (events, weekends, fall/spring), mid-term filler during slower periods (traveling nurse contracts, corporate housing). This optimizes for both nightly rate and occupancy. We model the right mix for each specific property.',
      },
      {
        q: 'How do you handle guest privacy with an owner-occupied ADU?',
        a: 'Clear separation is the foundation: separate entrances, separate addresses where possible, dedicated parking, soundproofed shared walls, no shared common spaces (laundry, kitchen) unless specifically positioned as a shared-stay model. We also set explicit guest expectations in listing copy so the right travelers self-select for the property.',
      },
    ],
    published: true,
  },
  {
    slug: 'beach-house',
    name: 'Beach House',
    pluralName: 'Beach Houses',
    headlineKeyword: 'Beach House Rental Management',
    tagline: "Tybee, St. Simons, and Georgia's coastal vacation-rental specialists",
    marketLabel: "Georgia's coast",
    marketCities: ['tybee-island', 'st-simons-island', 'jekyll-island', 'brunswick', 'pooler', 'richmond-hill', 'savannah'],
    intro: "Georgia's coast — Tybee Island, St. Simons, Jekyll Island, and the surrounding markets — is one of the strongest beach-house STR markets in the Southeast. Atlanta and Southeast families drive a deep summer season, and historic destination appeal (Savannah, the Golden Isles) gives the coast shoulder-season strength most beach markets lack. ATLStay manages coastal properties end-to-end with the coast-specific operations the asset class requires.",
    demand: "Beach-house demand is heavy in summer, with Memorial Day through Labor Day the unmistakable peak. Spring break, Easter, and fall family weekends extend the season meaningfully. Savannah's St. Patrick's Day weekend drives sharp coastal premiums every March. Winter is quieter but holds steady from snowbird visitors, romance weekends, and milestone celebrations in walkable historic districts.",
    operations: "Coastal operations have realities that inland rentals do not. Salt-air corrosion accelerates wear on metal fixtures, HVAC systems, and exterior surfaces — proactive maintenance is essential. Hurricane preparation between June and November requires a documented protocol (windows boarded, outdoor furniture secured, refrigerators emptied for evacuations, guest communication and refunds during mandatory evacuation orders). Beach equipment (chairs, umbrellas, coolers), pool service, and pest control all need a vetted local network.",
    faqs: [
      {
        q: "What's the busiest week of the year for a Tybee Island Airbnb?",
        a: 'Fourth of July week is typically the single highest-revenue week of the year on Tybee, with multi-night minimums and nightly rates that run 3-4x off-season. Spring break (mid-March through early April) and Memorial Day weekend follow closely. Savannah St. Patrick\'s Day weekend is the biggest March driver. We tune dynamic pricing to capture each of these windows automatically.',
      },
      {
        q: 'How do you handle hurricane season for coastal rentals?',
        a: 'We run a documented hurricane-prep protocol from June through November: pre-positioned shutters or board materials, secured outdoor furniture and grills, refrigerator-empty protocol during mandatory evacuations, transparent guest-communication scripts, and platform-policy-aligned refund decisions during named storms. Owners get a clear pre-storm checklist and rapid post-storm property report.',
      },
      {
        q: 'Can I rent on St. Simons or Jekyll year-round?',
        a: 'Yes — Golden Isles properties earn meaningful winter revenue from snowbirds, romance weekends, and milestone celebrations. Year-round demand is steadier than most beach markets due to the historic and dining draw of the Golden Isles and Savannah corridor. Pricing should flex sharply — winter rates much lower than peak summer — but the calendar fills.',
      },
    ],
    published: true,
  },
  {
    slug: 'corporate-housing',
    name: 'Corporate Housing',
    pluralName: 'Corporate Housing Units',
    headlineKeyword: 'Corporate Housing & Furnished Rental Management',
    tagline: '30-90 day furnished stays for relocations, executives, traveling medical, and insurance displacement',
    marketLabel: 'Atlanta corporate corridors',
    marketCities: ['atlanta', 'sandy-springs', 'alpharetta', 'dunwoody', 'brookhaven', 'marietta', 'smyrna', 'college-park'],
    marketNeighborhoods: ['buckhead', 'midtown', 'old-fourth-ward', 'atlantic-station'],
    intro: 'Corporate housing — furnished 30-90 day stays — is one of the most overlooked segments of the Atlanta short-term-rental market. Demand is steady, average length-of-stay is far longer than nightly STR, and the operational pattern is friendlier on properties and owners. ATLStay manages corporate-housing inventory across Atlanta with the platform mix (Furnished Finder, direct-corporate, traveling-nurse contracts) and operational consistency the segment requires.',
    demand: "Corporate-housing demand is steady and predictable. Corporate relocations (especially Fortune-500 inbound moves), executive temporary stays, traveling medical professionals (Emory, Piedmont, Grady, Northside), insurance displacement housing (homeowners displaced by fire/water damage with ALE coverage), film and TV production crews, military and government relocations, and remote workers on 30-90 day stays all feed the segment. Volume is meaningful — Atlanta's medical and film economies alone drive thousands of corporate-housing bookings annually.",
    operations: 'Corporate housing operations are simpler than nightly STR in some ways and more demanding in others. Longer stays mean fewer turnovers and less linen wear, but every booking needs full furnishing (functional kitchen, work setup, sleeping for full party), platform listings beyond Airbnb (Furnished Finder is foundational; corporate relocation companies and insurance ALE networks are major sources), monthly billing and lease-style agreements, and the operational consistency that 30+ day guests expect across the entire stay.',
    faqs: [
      {
        q: "What's the difference between corporate housing and Airbnb?",
        a: "Corporate housing typically means 30+ day furnished stays at monthly rates with lease-style agreements; Airbnb / STR typically means nightly bookings under 30 days at variable pricing. Same physical asset can serve both — but corporate housing involves different marketing channels (Furnished Finder, corporate relocation networks), pricing structure, and guest expectations.",
      },
      {
        q: 'Can a single property work as both corporate housing and nightly Airbnb?',
        a: "Often yes, and we routinely run hybrid strategies — corporate-housing mid-term contracts fill the calendar's slow periods (winter, summer mid-week) while nightly STR captures peak weekends and event-driven demand. The right mix depends on the property, market, and owner goals. We model both pure and hybrid strategies for each property.",
      },
      {
        q: 'Which Atlanta submarkets are best for corporate housing?',
        a: 'Buckhead, Sandy Springs, Midtown, and Perimeter for Fortune-500 executive stays. Druid Hills, Decatur, and intown medical-corridor neighborhoods for traveling medical. Airport corridor (College Park, East Point) for layover-driven shorter stays. Film-production stays concentrate in West Midtown, Buckhead, and Sandy Springs. Different submarkets fit different sub-segments of the corporate-housing market.',
      },
    ],
    published: true,
  },
];
