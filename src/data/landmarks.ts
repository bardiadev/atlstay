// Landmark "near {X}" pages — programmatic local-intent pages targeting
// "Airbnb / short-term rental management near {landmark}" searches, which are
// high-conversion and call-driving. Each landmark links to the real nearby
// city/neighborhood pages we already publish. All facts are real and
// verifiable; no fabricated figures.

export interface Landmark {
  slug: string;
  name: string;
  /** Optional shorter name for the SEO <title> when the full name is long. */
  shortName?: string;
  /** Short label used in the hero eyebrow. */
  kind: string;
  /** CSS gradient is assigned at render from the slug. */
  tagline: string;
  intro: string; // ~60-90 words, real
  demand: string; // ~50-80 words, real demand drivers
  /** Real nearby pages we already publish. */
  nearby: { name: string; href: string }[];
  faqs: { q: string; a: string }[];
  published: boolean;
}

export const landmarks: Landmark[] = [
  {
    slug: 'mercedes-benz-stadium',
    name: 'Mercedes-Benz Stadium',
    kind: 'Stadium & events',
    tagline: 'Falcons, Atlanta United, and the biggest events in the South',
    intro:
      "Mercedes-Benz Stadium anchors downtown Atlanta's event economy — home to the Atlanta Falcons and Atlanta United, and the venue for college football playoffs, SEC Championships, major concerts, and Final Four-tier events. For short-term rental owners on the west side and downtown, that calendar is one of the most reliable demand engines in the city: a single marquee weekend can outearn an ordinary month.",
    demand:
      'Demand spikes hard and predictably around the stadium calendar — NFL home games, Atlanta United matches, the SEC Championship, College Football Playoff games, and stadium concerts. Properties within walking distance or a short rideshare of the stadium command sharp event-weekend premiums. Capturing those nights with proactive pricing — rather than a flat nightly rate — is the single biggest revenue lever for properties in this zone.',
    nearby: [
      { name: 'Castleberry Hill', href: '/atlanta/castleberry-hill/' },
      { name: 'West End', href: '/atlanta/west-end/' },
      { name: 'Adair Park', href: '/atlanta/adair-park/' },
      { name: 'Capitol View', href: '/atlanta/capitol-view/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    faqs: [
      {
        q: 'Which neighborhoods are best for an Airbnb near Mercedes-Benz Stadium?',
        a: 'Castleberry Hill is the closest walkable neighborhood and earns the strongest event-weekend premiums. West End, Adair Park, and Capitol View sit a short rideshare away and capture overflow demand when closer supply tightens. We manage properties across all of them and price each one against the stadium event calendar.',
      },
      {
        q: 'How much more can I earn on event weekends near the stadium?',
        a: 'Event weekends — Falcons games, the SEC Championship, College Football Playoff, big concerts — drive the sharpest demand spikes in the area, but the exact premium depends on the event, your property, and how far in advance pricing is set. The owners who leave money on the table are the ones running flat rates. We set event pricing proactively, before the platform algorithms catch up. Request a free projection for an estimate on your specific property.',
      },
      {
        q: 'Do you handle Airbnb management near the stadium?',
        a: 'Yes — ATLStay manages full-service short-term rentals across the downtown and west-side neighborhoods around Mercedes-Benz Stadium: listing, dynamic event-aware pricing, 24/7 guest care, cleaning, and turnovers. Call (678) 938-6413 or get a free projection to see what your property could earn.',
      },
    ],
    published: true,
  },
  {
    slug: 'hartsfield-jackson-airport',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    shortName: 'Hartsfield-Jackson Airport',
    kind: 'Airport corridor',
    tagline: "The world's busiest airport — a year-round demand engine",
    intro:
      "Hartsfield-Jackson is the busiest airport on earth, and the neighborhoods around it run a steady, year-round short-term rental business that most of Atlanta's event-driven markets can't match. Layover travelers, early-flight pre-positioning, flight crews, and Atlanta-bound visitors who land late all need a bed near the terminals. For owners in the airport corridor, that means consistent occupancy rather than feast-or-famine event spikes.",
    demand:
      "Airport demand is steady and less seasonal than the rest of metro Atlanta: layover and missed-connection stays, early-departure pre-positioning, airline crew lodging, and convention/business travelers who want to be minutes from the terminal. Well-equipped 1–2 bedroom units optimized for traveler convenience — secure parking, fast Wi-Fi, blackout curtains, easy check-in — typically outperform larger homes in this submarket.",
    nearby: [
      { name: 'College Park', href: '/college-park/' },
      { name: 'East Point', href: '/east-point/' },
      { name: 'Hapeville', href: '/hapeville/' },
      { name: 'Union City', href: '/union-city/' },
    ],
    faqs: [
      {
        q: 'Which areas are best for an Airbnb near Hartsfield-Jackson?',
        a: 'College Park, East Point, and Hapeville border the airport and capture the most consistent layover, crew, and pre-flight demand. Each is minutes from the terminals. We manage properties across all three and tune each listing for the airport-traveler guest.',
      },
      {
        q: 'What kind of property works best near the airport?',
        a: 'Compact, convenience-focused units win here — 1 to 2 bedrooms with secure parking, fast Wi-Fi, blackout curtains for shift workers, and frictionless self-check-in. Larger family homes do better in adjacent neighborhoods for group and event stays than for pure airport demand.',
      },
      {
        q: 'Is airport-area Airbnb demand year-round?',
        a: "Yes — that's the airport corridor's biggest advantage. While much of Atlanta's STR demand spikes around events, airport-area occupancy stays steady through the year on layovers, crew stays, and business travel. It's one of the more predictable submarkets in the metro.",
      },
    ],
    published: true,
  },
  {
    slug: 'state-farm-arena',
    name: 'State Farm Arena',
    kind: 'Arena & concerts',
    tagline: 'Hawks basketball and a year-round concert calendar downtown',
    intro:
      "State Farm Arena sits in the heart of downtown Atlanta — home to the Atlanta Hawks and one of the busiest concert venues in the country. Between an 82-game NBA season (41 home dates), a packed touring-act schedule, and downtown's convention traffic, the blocks around the arena see steady event-driven short-term rental demand throughout the year.",
    demand:
      "Hawks home games run from October through spring, layering on top of a heavy concert calendar and Georgia World Congress Center convention traffic just blocks away. Downtown and Castleberry Hill properties capture concert-goers, basketball fans, and business travelers who want to walk to the arena and the convention district. Event-aware pricing is essential to capture the premium nights.",
    nearby: [
      { name: 'Castleberry Hill', href: '/atlanta/castleberry-hill/' },
      { name: 'Sweet Auburn', href: '/atlanta/sweet-auburn/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    faqs: [
      {
        q: 'Where should I buy an Airbnb near State Farm Arena?',
        a: 'Castleberry Hill is the closest walkable neighborhood and pairs arena demand with Mercedes-Benz Stadium and convention traffic. Sweet Auburn and Old Fourth Ward sit a short distance east and capture overflow plus their own BeltLine and dining demand. We manage across all of them.',
      },
      {
        q: 'Does State Farm Arena drive enough demand to matter?',
        a: 'Yes — between 41 Hawks home games, a heavy concert schedule, and adjacent convention traffic, the arena anchors steady downtown event demand across most of the year. Combined with Mercedes-Benz Stadium nearby, downtown is one of the most event-dense STR zones in the Southeast.',
      },
      {
        q: 'Do you manage short-term rentals downtown near the arena?',
        a: 'Yes. ATLStay runs full-service management for downtown and Castleberry Hill properties — event-aware pricing, 24/7 guest care, cleaning, and turnovers. Call (678) 938-6413 or request a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'georgia-world-congress-center',
    name: 'Georgia World Congress Center',
    kind: 'Convention center',
    tagline: "The South's largest convention center — weekday business demand",
    intro:
      "The Georgia World Congress Center is one of the largest convention centers in the country, hosting major trade shows, conventions, and corporate events year-round in downtown Atlanta. For short-term rental owners, the GWCC means something most leisure markets lack: steady weekday demand from business travelers and exhibitors who want more space and a kitchen than a hotel room offers.",
    demand:
      'Convention and trade-show calendars drive midweek and multi-night business demand — exhibitors, attendees, and corporate teams who prefer a furnished home near the convention district. Demand layers with Mercedes-Benz Stadium and State Farm Arena events next door. Properties in Castleberry Hill and West Midtown capture the convention guest who wants walkability plus more room than downtown hotels provide.',
    nearby: [
      { name: 'Castleberry Hill', href: '/atlanta/castleberry-hill/' },
      { name: 'West Midtown', href: '/atlanta/west-midtown/' },
      { name: 'Home Park', href: '/atlanta/home-park/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    faqs: [
      {
        q: 'Is the convention center good for Airbnb demand?',
        a: 'Yes — the GWCC brings steady weekday and multi-night business demand that balances out the weekend-heavy leisure market. Convention exhibitors and corporate teams regularly choose furnished homes near the convention district over hotels for the extra space and kitchen.',
      },
      {
        q: 'Which neighborhoods serve GWCC visitors best?',
        a: 'Castleberry Hill for closest walkability, and West Midtown and Home Park for design-forward properties a short ride away. All three put guests near the convention district plus the downtown stadium-and-arena cluster.',
      },
      {
        q: 'Do you manage rentals near the convention center?',
        a: 'Yes — full-service management with convention-aware pricing, 24/7 guest care, and reliable turnovers. Call (678) 938-6413 or get a free projection for your property.',
      },
    ],
    published: true,
  },
  {
    slug: 'truist-park-battery',
    name: 'Truist Park & The Battery',
    kind: 'Ballpark & entertainment',
    tagline: 'Braves baseball and a year-round entertainment district',
    intro:
      "Truist Park and the surrounding Battery Atlanta sit in Cobb County, just outside the Perimeter — home of the Atlanta Braves and a mixed-use entertainment district that draws visitors well beyond game days. For short-term rental owners in Smyrna, Vinings, and Marietta, the ballpark provides predictable demand pulses six months a year, plus steady Battery dining-and-concert traffic the rest of the time.",
    demand:
      'Braves home stands (April through October, plus playoff runs) create predictable demand pulses, especially Friday–Sunday games and weeknight series against rivals. The Battery adds concerts, dining, and corporate events year-round. Properties within roughly ten minutes of the ballpark — Smyrna, Vinings, and Battery-adjacent Marietta — see the strongest game-night premiums.',
    nearby: [
      { name: 'Smyrna', href: '/smyrna/' },
      { name: 'Vinings', href: '/vinings/' },
      { name: 'Marietta', href: '/marietta/' },
      { name: 'Mableton', href: '/mableton/' },
    ],
    faqs: [
      {
        q: 'Which area is best for an Airbnb near Truist Park?',
        a: 'Smyrna and Vinings typically lead on nightly rate thanks to ballpark proximity and intown-adjacent location. Marietta captures strong year-round occupancy from corporate, leisure, and university demand on top of game nights. We manage across all of them and price each to the Braves schedule.',
      },
      {
        q: 'How do Braves games affect Airbnb earnings?',
        a: 'Home stands six months a year create reliable demand pulses, with the sharpest premiums on weekend games and rival series. The Battery adds concert and dining demand outside baseball season. Our dynamic pricing captures those nights automatically; flat-rate owners routinely undercharge.',
      },
      {
        q: 'Do you manage short-term rentals near The Battery?',
        a: 'Yes — ATLStay manages properties across Smyrna, Vinings, and Marietta with ballpark-aware pricing and full-service operations. Call (678) 938-6413 or request a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'piedmont-park',
    name: 'Piedmont Park',
    kind: 'Park & festivals',
    tagline: "Midtown's front yard — festivals, concerts, and green space",
    intro:
      "Piedmont Park is Atlanta's signature green space, anchoring Midtown and hosting the city's biggest outdoor events — Music Midtown, the Atlanta Jazz Festival, the Dogwood Festival, and countless concerts and gatherings. For short-term rental owners in the surrounding neighborhoods, the park and its festival calendar add a steady stream of leisure demand on top of Midtown's strong year-round base.",
    demand:
      "Festival and concert weekends — Music Midtown chief among them — drive sharp demand spikes for walkable Midtown and Virginia-Highland properties. The park's year-round draw, plus Midtown's arts, dining, and corporate base (Georgia Tech, the High Museum, the Fox Theatre nearby), keeps occupancy strong between events. Walkability to the park is a genuine booking trigger guests search for.",
    nearby: [
      { name: 'Midtown', href: '/atlanta/midtown/' },
      { name: 'Virginia-Highland', href: '/atlanta/virginia-highland/' },
      { name: 'Ansley Park', href: '/atlanta/ansley-park/' },
      { name: 'Morningside', href: '/atlanta/morningside/' },
    ],
    faqs: [
      {
        q: 'Which neighborhoods are best near Piedmont Park?',
        a: 'Midtown wraps the park directly and earns the strongest rates for walkable properties. Virginia-Highland, Ansley Park, and Morningside sit just east and north and pair park access with their own dining and residential charm. We manage across all of them.',
      },
      {
        q: 'Does Music Midtown affect Airbnb pricing near the park?',
        a: 'Significantly. Music Midtown and the park’s other festivals are among the biggest leisure-demand spikes in intown Atlanta. Properties within walking distance command strong festival-weekend premiums when priced proactively — which our management does automatically.',
      },
      {
        q: 'Do you manage Airbnbs near Piedmont Park?',
        a: 'Yes — full-service management for Midtown and the surrounding neighborhoods, with festival-aware pricing and 24/7 guest care. Call (678) 938-6413 or get a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'georgia-tech',
    name: 'Georgia Tech',
    kind: 'University',
    tagline: 'Campus visits, graduations, and game-day demand in Midtown',
    intro:
      'The Georgia Institute of Technology sits at the western edge of Midtown, drawing a steady stream of visiting families, prospective students, conference attendees, and football fans throughout the academic year. For short-term rental owners in Home Park and West Midtown — the neighborhoods bordering campus — that means recurring, calendar-driven demand layered on top of Midtown’s strong base market.',
    demand:
      'Graduation weekends, family weekends, move-in, homecoming, and Yellow Jackets football games create predictable campus-driven demand spikes. Research conferences and corporate recruiting visits add midweek stays. Home Park borders campus directly; West Midtown and Atlantic Station sit a short walk or ride away and capture overflow plus their own dining and retail demand.',
    nearby: [
      { name: 'Home Park', href: '/atlanta/home-park/' },
      { name: 'West Midtown', href: '/atlanta/west-midtown/' },
      { name: 'Atlantic Station', href: '/atlanta/atlantic-station/' },
      { name: 'Midtown', href: '/atlanta/midtown/' },
    ],
    faqs: [
      {
        q: 'Where should I host near Georgia Tech?',
        a: 'Home Park borders campus and is the most walkable option for visiting families and recruits. West Midtown and Atlantic Station sit a short ride away and add dining, retail, and their own demand. We manage across all of them and price to the academic and football calendars.',
      },
      {
        q: 'When is demand strongest near Georgia Tech?',
        a: 'Graduation, family weekends, move-in, homecoming, and home football games are the reliable peaks, with research conferences and recruiting visits filling midweek. A property priced to the campus calendar captures meaningfully more than one running flat rates.',
      },
      {
        q: 'Do you manage rentals near Georgia Tech?',
        a: 'Yes — full-service management for Home Park, West Midtown, and the surrounding Midtown area. Call (678) 938-6413 or request a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'emory-university-cdc',
    name: 'Emory University & the CDC',
    kind: 'University & medical',
    tagline: 'Academic and medical demand that runs all year',
    intro:
      'Emory University and the adjacent Centers for Disease Control and Prevention anchor one of Atlanta’s most distinctive short-term rental submarkets. Visiting academics, researchers, faculty candidates, conference speakers, and medical professionals create steady, professional, often multi-night demand throughout the year — a profile that runs on the academic and medical calendar rather than the event calendar.',
    demand:
      'Emory’s academic calendar and the CDC’s research and conference activity drive consistent professional demand: faculty recruitment visits, multi-week research stays, conference speakers, and medical professionals connected to Emory’s health system. This demand is less seasonal and less price-sensitive than leisure travel, and it favors quiet, well-appointed properties with good workspace. Druid Hills and Decatur sit closest to campus.',
    nearby: [
      { name: 'Druid Hills', href: '/atlanta/druid-hills/' },
      { name: 'Decatur (neighborhood)', href: '/atlanta/decatur/' },
      { name: 'Decatur (city)', href: '/decatur/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
    ],
    faqs: [
      {
        q: 'What kind of property works best near Emory and the CDC?',
        a: 'Quiet, well-appointed homes with good workspace, fast internet, and quality beds. The guest visiting Emory or attending a CDC conference wants a calm place to work and rest, not a party house. A higher baseline of investment pays back through better reviews from a discerning, often repeat-booking clientele.',
      },
      {
        q: 'Is Emory/CDC demand year-round?',
        a: 'Largely yes. The academic and research calendars run through most of the year, including periods when general Atlanta tourism softens. Graduation in May and fall semester start in August add peaks. The result is a more evenly distributed demand profile than event-dependent neighborhoods.',
      },
      {
        q: 'Do you manage short-term rentals near Emory?',
        a: 'Yes — ATLStay manages properties across Druid Hills, Decatur, and the surrounding area, tuned to the academic and medical guest. Call (678) 938-6413 or get a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'lenox-square-phipps-plaza',
    name: 'Lenox Square & Phipps Plaza',
    kind: 'Shopping & luxury',
    tagline: "Buckhead's flagship retail — upscale, year-round leisure demand",
    intro:
      "Lenox Square and Phipps Plaza are the Southeast’s flagship luxury shopping destinations, anchoring Buckhead’s upscale retail and dining district. They draw shoppers, diners, and travelers from across the region who book multi-night stays for the Buckhead experience. For short-term rental owners, proximity to Lenox and Phipps means premium nightly rates and a steady, year-round leisure-and-corporate guest mix.",
    demand:
      "Buckhead’s retail anchors pull regional shoppers and diners year-round, layered with strong corporate travel from Buckhead’s office towers and a busy private-event and wedding calendar. Properties near Lenox and Phipps consistently command rates above the Atlanta average. The guest expects polish — quality finishes and professional presentation directly drive both rates and reviews here.",
    nearby: [
      { name: 'Buckhead', href: '/atlanta/buckhead/' },
      { name: 'Buckhead Village', href: '/atlanta/buckhead-village/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
    ],
    faqs: [
      {
        q: 'Is Buckhead near Lenox a strong Airbnb market?',
        a: 'Yes — it’s one of Atlanta’s premium markets. Lenox and Phipps draw year-round regional leisure demand, and Buckhead’s office towers add steady corporate travel. Properties with quality finishes near the retail district command rates above the Atlanta average.',
      },
      {
        q: 'What does it take to perform well near Lenox and Phipps?',
        a: 'Polish. The Buckhead guest expects a five-star experience — high-end finishes, professional photography, fast responses, and flawless turnovers. Presentation directly drives both nightly rate and review scores in this market, which is exactly where professional management pays for itself.',
      },
      {
        q: 'Do you manage luxury Airbnbs in Buckhead?',
        a: 'Yes — ATLStay runs white-glove management for Buckhead properties near Lenox and Phipps. Call (678) 938-6413 or request a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'stone-mountain-park',
    name: 'Stone Mountain Park',
    kind: 'Park & tourism',
    tagline: "Georgia's most-visited attraction, just east of the city",
    intro:
      'Stone Mountain Park is one of Georgia’s most-visited attractions — a 3,200-acre park drawing families year-round for hiking, the summit, seasonal events, and the laser show. For short-term rental owners on Atlanta’s east side, the park anchors steady family-travel demand, with seasonal peaks around its events calendar that reward larger, group-friendly properties.',
    demand:
      'Stone Mountain draws families and groups year-round, with peaks around summer, the seasonal light and laser events, and holiday programming. Larger homes that sleep families and groups outperform compact units here. Stone Mountain, Tucker, and east DeKalb properties capture park visitors plus their own steady demand, and Decatur sits a short drive west.',
    nearby: [
      { name: 'Stone Mountain', href: '/stone-mountain/' },
      { name: 'Tucker', href: '/tucker/' },
      { name: 'Stonecrest', href: '/stonecrest/' },
      { name: 'Decatur', href: '/decatur/' },
    ],
    faqs: [
      {
        q: 'What kind of Airbnb performs best near Stone Mountain?',
        a: 'Larger, family-and-group-friendly homes — 3+ bedrooms with outdoor space and parking — outperform compact units near Stone Mountain, because the park’s demand skews toward families and groups. Properties near the park’s entrances earn the strongest event-season premiums.',
      },
      {
        q: 'Is Stone Mountain demand seasonal?',
        a: 'It has a year-round family-travel base with clear peaks: summer, the seasonal light and laser shows, and holiday programming. A property priced to that calendar captures meaningfully more than one running flat rates through the year.',
      },
      {
        q: 'Do you manage short-term rentals near Stone Mountain Park?',
        a: 'Yes — full-service management across Stone Mountain, Tucker, and the surrounding east-side markets. Call (678) 938-6413 or get a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'lake-lanier',
    name: 'Lake Lanier',
    kind: 'Lake & recreation',
    tagline: "Metro Atlanta's summer playground on 38,000 acres of water",
    intro:
      'Lake Lanier is metro Atlanta’s closest major lake — 38,000 acres of water just an hour north of the city, drawing boaters, families, and weekend travelers all summer. For short-term rental owners around Buford, Sugar Hill, Cumming, and Gainesville, the lake anchors a heavily seasonal but highly profitable market, with the Fourth of July weekend often the single biggest revenue night of the year.',
    demand:
      'Lake demand is concentrated and intense: Memorial Day through Labor Day is the peak, with the Fourth of July weekend commanding the highest premiums of the year and multi-night minimums. Lakefront and near-lake properties earn meaningful summer premiums; inland properties capture overflow when lakefront supply tightens. Weddings at lake venues add booked-out shoulder-season weekends.',
    nearby: [
      { name: 'Buford', href: '/buford/' },
      { name: 'Sugar Hill', href: '/sugar-hill/' },
      { name: 'Cumming', href: '/cumming/' },
      { name: 'Gainesville', href: '/gainesville/' },
    ],
    faqs: [
      {
        q: 'When is peak season for a Lake Lanier rental?',
        a: 'Memorial Day through Labor Day is the unmistakable peak, with the Fourth of July weekend the single highest-revenue window — often multi-night minimums at 3–4x off-season rates. Shoulder weekends in May, September, and October still earn strong premiums for weddings and fall getaways.',
      },
      {
        q: 'Do I need a lakefront property to do well on Lake Lanier?',
        a: 'Lakefront and near-lake homes earn the strongest summer premiums, but inland properties in Buford, Sugar Hill, Cumming, and Gainesville capture real overflow demand when lakefront supply tightens. Many lake communities have HOA covenants that restrict short-term rentals — we verify those before recommending a strategy.',
      },
      {
        q: 'Do you manage lake-house rentals on Lake Lanier?',
        a: 'Yes — ATLStay manages lake houses with the dock-aware, seasonal operations the asset class requires. Call (678) 938-6413 or request a free projection. See our lake-house management page for the full operational picture.',
      },
    ],
    published: true,
  },
  {
    slug: 'atlanta-beltline',
    name: 'The Atlanta BeltLine',
    kind: 'Trail & neighborhoods',
    tagline: "The city's most-used trail — walkable demand that books itself",
    intro:
      "The Atlanta BeltLine’s Eastside Trail is one of the most-used stretches of public space in the city, connecting Old Fourth Ward, Inman Park, and the surrounding neighborhoods to restaurants, parks, and Ponce City Market. “Steps from the BeltLine” is one of the highest-converting location descriptors in Atlanta’s short-term rental market — guests search for it by name.",
    demand:
      'BeltLine-adjacent properties draw a deliberate, experience-driven guest who chooses the neighborhood specifically for trail access, walkable dining, and intown energy. Demand is strong year-round with spring and fall peaks, weekend-heavy, and boosted by events and festivals along the corridor. Walkability to the trail is a genuine, marketable booking trigger that supports premium rates.',
    nearby: [
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Inman Park', href: '/atlanta/inman-park/' },
      { name: 'Reynoldstown', href: '/atlanta/reynoldstown/' },
      { name: 'Cabbagetown', href: '/atlanta/cabbagetown/' },
      { name: 'Edgewood', href: '/atlanta/edgewood/' },
    ],
    faqs: [
      {
        q: 'Which neighborhoods are best along the BeltLine?',
        a: 'Old Fourth Ward and Inman Park sit on the busiest Eastside Trail stretch and earn the strongest rates for walkable properties. Reynoldstown, Cabbagetown, and Edgewood line the corridor too and pair trail access with their own character. We manage across all of them.',
      },
      {
        q: 'Does BeltLine proximity actually drive bookings?',
        a: 'Yes — “steps from the BeltLine” is one of the highest-converting descriptors in intown Atlanta. Guests search for trail access by name, and walkable properties convert at premium rates. Accurate, specific distance in the listing matters because guests verify it.',
      },
      {
        q: 'Do you manage BeltLine-area short-term rentals?',
        a: 'Yes — full-service management across the Eastside Trail neighborhoods, with listings written to surface BeltLine walkability. Call (678) 938-6413 or get a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'ponce-city-market',
    name: 'Ponce City Market',
    kind: 'Market & dining',
    tagline: "Atlanta's most popular food hall, on the BeltLine",
    intro:
      'Ponce City Market is one of Atlanta’s most popular destinations — a massive adaptive-reuse building on the BeltLine packed with food vendors, retailers, and rooftop amenities. It sits at the heart of Old Fourth Ward, and proximity to it is something guests actively search for. For short-term rental owners nearby, “walk to Ponce City Market” is a listing asset that shows up in bookings and reviews.',
    demand:
      'Ponce City Market and the adjacent BeltLine draw a steady, experience-driven leisure guest year-round, with weekend and festival-season peaks. Old Fourth Ward and Virginia-Highland properties within walking distance command premium rates and convert strongly, because the location does the marketing. Group and couple travelers dominate the booking mix.',
    nearby: [
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Poncey-Highland', href: '/atlanta/poncey-highland/' },
      { name: 'Virginia-Highland', href: '/atlanta/virginia-highland/' },
      { name: 'Inman Park', href: '/atlanta/inman-park/' },
    ],
    faqs: [
      {
        q: 'Is it worth hosting near Ponce City Market?',
        a: 'Yes — walkability to Ponce City Market and the BeltLine is a genuine booking trigger. Old Fourth Ward and Poncey-Highland properties within walking distance command premium rates and convert strongly, because guests specifically search for the location.',
      },
      {
        q: 'Who books Airbnbs near Ponce City Market?',
        a: 'Mostly experience-driven leisure travelers — couples on city trips, weekend groups, and food-and-culture visitors who want to walk to dining and the BeltLine rather than drive. Properties with local character outperform generic units with this guest.',
      },
      {
        q: 'Do you manage rentals near Ponce City Market?',
        a: 'Yes — full-service management across Old Fourth Ward and the surrounding BeltLine neighborhoods. Call (678) 938-6413 or request a free projection.',
      },
    ],
    published: true,
  },
  {
    slug: 'georgia-aquarium',
    name: 'Georgia Aquarium & Centennial Park District',
    shortName: 'Georgia Aquarium District',
    kind: 'Attractions',
    tagline: "Downtown's tourist core — aquarium, Coca-Cola, and the park",
    intro:
      'The Georgia Aquarium, World of Coca-Cola, and Centennial Olympic Park form downtown Atlanta’s tourist core, drawing families and visitors from around the world. Clustered with the College Football Hall of Fame and steps from the stadium-and-arena district, this concentration of attractions anchors steady family-travel demand for short-term rentals in the surrounding downtown and Castleberry Hill neighborhoods.',
    demand:
      'The aquarium-and-park district draws year-round family tourism, layered with the heavy event calendar at Mercedes-Benz Stadium, State Farm Arena, and the Georgia World Congress Center next door. Downtown and Castleberry Hill properties capture families who want to walk to the attractions plus event-driven demand. The mix balances weekend leisure with midweek convention and event stays.',
    nearby: [
      { name: 'Castleberry Hill', href: '/atlanta/castleberry-hill/' },
      { name: 'Sweet Auburn', href: '/atlanta/sweet-auburn/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    faqs: [
      {
        q: 'Is downtown near the aquarium good for Airbnb?',
        a: 'Yes — the aquarium, World of Coca-Cola, and Centennial Park draw steady family tourism year-round, and the adjacent stadium, arena, and convention center add heavy event demand. Castleberry Hill and downtown properties capture both. It’s one of the most attraction-dense zones in the Southeast.',
      },
      {
        q: 'What guests book near Centennial Park?',
        a: 'A mix of family tourists visiting the attractions and event-driven travelers for games, concerts, and conventions. Properties that sleep families comfortably and sit within walking or short-ride distance of the attractions perform best.',
      },
      {
        q: 'Do you manage downtown Atlanta short-term rentals?',
        a: 'Yes — full-service management across the downtown and Castleberry Hill core. Call (678) 938-6413 or get a free projection.',
      },
    ],
    published: true,
  },
];
