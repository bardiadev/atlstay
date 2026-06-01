// County service pages — one programmatic page per Georgia county we cover.
// Each county is a real geographic market with its own demand mix, city
// portfolio, and regulatory landscape. Copy is written by-hand per county
// (no fabricated stats); city lists must match slugs in the cities content
// collection.

export interface County {
  slug: string;
  name: string;
  state: string;
  region: 'metro' | 'north-metro' | 'south-metro' | 'east-metro' | 'west-metro';
  countySeat: string;
  geo: { lat: number; lng: number };
  /** City slugs in this county that we manage. Must match cities collection slugs. */
  cities: string[];
  /** Short headline tagline used as a hero eyebrow. */
  tagline: string;
  /** ~70-100 unique words — county character + ATLStay positioning. */
  intro: string;
  /** ~50-80 unique words — what specifically drives STR demand in this county. */
  demand: string;
  /** ~60-100 unique words — qualitative regulation orientation (NO invented permit fees). */
  regulationsNote: string;
  /** 3 county-specific FAQs. */
  faqs: { q: string; a: string }[];
  published: boolean;
}

export const counties: County[] = [
  {
    slug: 'fulton',
    name: 'Fulton',
    state: 'GA',
    region: 'metro',
    countySeat: 'Atlanta',
    geo: { lat: 33.7901, lng: -84.4670 },
    cities: ['atlanta', 'sandy-springs', 'roswell', 'milton', 'college-park', 'east-point', 'hapeville', 'fairburn', 'union-city'],
    tagline: 'The largest short-term rental market in Georgia',
    intro: "Fulton County is Atlanta — and more. It runs from the BeltLine and Buckhead through North Fulton's affluent suburbs (Sandy Springs, Roswell, Milton) down to the airport corridor (College Park, East Point, Hapeville, Union City). It's the densest, most diversified short-term-rental market in the state: intown event tourism, North Fulton corporate travel, and airport-corridor layovers all sit inside one county. ATLStay manages owner properties full-service across every Fulton submarket.",
    demand: "Demand stacks across Fulton. GWCC and Mercedes-Benz Stadium events drive intown bookings — NFL, the SEC Championship, Music Midtown, Dragon Con. Fortune-500 HQs in Buckhead and Sandy Springs fuel weekday corporate stays. Hartsfield-Jackson generates layover bookings in the southern corridor. Roswell and Milton capture suburban family travel and golf weekends.",
    regulationsNote: "Fulton's STR rules vary by jurisdiction. The City of Atlanta requires a Short-Term Rental License administered via atl311.com, with primary-residence rules and an annual renewal. Sandy Springs, Roswell, and Milton each have their own ordinances; unincorporated Fulton applies county-level rules. We walk every owner through the right local process for their exact address.",
    faqs: [
      {
        q: 'Do I need a permit to run an Airbnb in Fulton County?',
        a: 'Yes — and which permit depends on where the property sits. The City of Atlanta requires a Short-Term Rental License; Sandy Springs, Roswell, Milton, and unincorporated Fulton each apply their own ordinance. We confirm the right requirement for your address as part of onboarding.',
      },
      {
        q: 'Which part of Fulton County earns the most as an Airbnb?',
        a: "It depends on property type. Intown Atlanta (Midtown, Old Fourth Ward, Buckhead) earns the highest nightly rates and benefits most from event surges. North Fulton (Sandy Springs, Roswell, Milton) captures steadier corporate and family demand at slightly lower nightly rates but with strong occupancy. We provide a free, comps-based projection for your exact address.",
      },
      {
        q: 'How fast can ATLStay onboard a Fulton County property?',
        a: 'Typical onboarding runs three to four weeks: readiness review, professional photography, pricing strategy, and listing build across platforms. For City of Atlanta properties, permit timing is the variable — we handle the licensing process so it runs in parallel with onboarding.',
      },
    ],
    published: true,
  },
  {
    slug: 'dekalb',
    name: 'DeKalb',
    state: 'GA',
    region: 'metro',
    countySeat: 'Decatur',
    geo: { lat: 33.7748, lng: -84.2963 },
    cities: ['brookhaven', 'chamblee', 'doraville', 'clarkston', 'stone-mountain', 'lithonia', 'tucker', 'stonecrest', 'avondale-estates'],
    tagline: 'Eastside Atlanta plus the most-changed STR rules in the metro',
    intro: "DeKalb County sits on Atlanta's east side and runs from Brookhaven and Chamblee in the north through Decatur, Tucker, and Stone Mountain out to Stonecrest. It's the metro's most diverse county and one of the busiest STR markets — but it also brings the most active 2026 regulatory change in Georgia. ATLStay manages DeKalb properties end-to-end and keeps current on the new ordinance so owners stay compliant.",
    demand: "DeKalb demand is anchored by Emory University and the CDC (Druid Hills, Decatur), the Peachtree Industrial corridor, Stone Mountain Park tourism, and the BeltLine spilling east into Edgewood and Reynoldstown. Brookhaven and Chamblee capture upscale weekday and weekend travel; Decatur draws family-friendly stays around the downtown square.",
    regulationsNote: "DeKalb County introduced a new short-term rental ordinance effective May 2026 with annual registration, a local-contact requirement, and inspection elements. Several cities within DeKalb — Brookhaven, Decatur, Tucker, Chamblee, Stonecrest — overlay city-level rules. We track every change as it lands and onboard owners against the right combination for their exact address.",
    faqs: [
      {
        q: 'What changed with DeKalb County STR rules in May 2026?',
        a: 'DeKalb adopted a county-level Short-Term Rental ordinance with annual registration, a designated local-contact requirement, and minimum operating standards. Existing operators are not grandfathered — every property in unincorporated DeKalb needs to register. We walk owners through the registration process and stay current as the program matures.',
      },
      {
        q: 'Is Decatur the same as DeKalb County for STR purposes?',
        a: 'The City of Decatur sits inside DeKalb County but has its own STR regulations distinct from the new county program. If your property has a Decatur address, you follow the city ordinance; if it sits in unincorporated DeKalb, you follow the county program. Same for Brookhaven, Tucker, Chamblee, and Stonecrest.',
      },
      {
        q: 'Which DeKalb neighborhoods perform best for STR?',
        a: 'Brookhaven and Chamblee lead on nightly rate for design-forward properties; Decatur captures premium family and conference demand; Stone Mountain and Tucker work well for larger group properties and event-weekend pricing. Property type matters as much as neighborhood — we model your specific address before recommending positioning.',
      },
    ],
    published: true,
  },
  {
    slug: 'cobb',
    name: 'Cobb',
    state: 'GA',
    region: 'metro',
    countySeat: 'Marietta',
    geo: { lat: 33.9526, lng: -84.5499 },
    cities: ['marietta', 'smyrna', 'kennesaw', 'mableton', 'powder-springs', 'austell', 'acworth', 'vinings'],
    tagline: 'Truist Park, Lockheed, and a deep suburban portfolio',
    intro: "Cobb County is northwest metro Atlanta — Marietta's historic square, Smyrna and Vinings against the I-285 corridor, Kennesaw and Acworth along I-75 north, plus the South Cobb growth zone (Mableton, Powder Springs, Austell). It's a corporate-heavy market anchored by Truist Park, Lockheed Martin, Kennesaw State University, and the Cobb Galleria. ATLStay manages owner properties across every Cobb submarket.",
    demand: "Cobb's strongest demand drivers: Atlanta Braves home stands at Truist Park (April–October), Lockheed Martin and other defense employers driving weekday corporate travel, Kennesaw State events and parents' weekends, and Cobb Galleria conference traffic. Marietta Square weekends and the Battery entertainment district pull leisure stays year-round.",
    regulationsNote: "Cobb County's approach to short-term rentals is more permissive than the City of Atlanta but each city within the county has its own ordinance and zoning treatment. Marietta, Smyrna, Kennesaw, and Acworth each handle STR differently — some require local registration, others rely on zoning enforcement. We confirm the right path per address before listing.",
    faqs: [
      {
        q: 'Is Airbnb legal in Cobb County?',
        a: 'Yes, with caveats by city. Cobb County itself does not run a centralized STR licensing program, but Marietta, Smyrna, Kennesaw, and Acworth each have their own ordinances and zoning rules. We confirm the requirement for your specific property address before listing.',
      },
      {
        q: 'How does Truist Park affect Airbnb earnings in Cobb?',
        a: "Braves home stands create predictable demand pulses six months a year, especially Friday–Sunday games and weeknight series against rival teams. Properties within ~10 minutes of The Battery — Smyrna, Vinings, north Atlanta-adjacent Marietta — see the strongest game-night premiums. Our dynamic pricing captures those nights automatically.",
      },
      {
        q: "Which Cobb city earns the most as an Airbnb?",
        a: 'Smyrna and Vinings typically lead on nightly rate due to Truist Park proximity and intown-adjacent location. Marietta captures strong year-round occupancy from corporate, leisure, and university traffic. Kennesaw and Acworth perform best on family-friendly larger properties for sports tournaments and lake-adjacent stays.',
      },
    ],
    published: true,
  },
  {
    slug: 'gwinnett',
    name: 'Gwinnett',
    state: 'GA',
    region: 'metro',
    countySeat: 'Lawrenceville',
    geo: { lat: 33.9526, lng: -83.9988 },
    cities: ['duluth', 'norcross', 'lawrenceville', 'suwanee', 'buford', 'grayson', 'snellville', 'lilburn', 'dacula', 'sugar-hill', 'peachtree-corners'],
    tagline: 'The northeast corporate corridor and Lake Lanier gateway',
    intro: "Gwinnett County runs along I-85 northeast of Atlanta — Norcross and Peachtree Corners at the southern end through Duluth, Suwanee, and Lawrenceville to Buford and Sugar Hill at Lake Lanier's south shore. It's metro Atlanta's second-most-populous county, a diversified corporate market with strong family-travel demand and increasing year-round STR activity. ATLStay manages properties across every Gwinnett submarket.",
    demand: "Gwinnett demand mixes corporate (Peachtree Corners and Norcross tech corridor, Gas South Arena conferences), Mall of Georgia tourism in Buford, sports-tournament weekends in Suwanee and Lawrenceville, and Lake Lanier visitors staying inland. The Korean-American and Hispanic business communities also drive consistent multilingual guest demand around Duluth and Norcross.",
    regulationsNote: "Gwinnett County does not run a county-wide STR licensing program, but several cities within Gwinnett — including Lawrenceville, Suwanee, and Duluth — have implemented local ordinances or are actively considering them. Zoning treatment varies by jurisdiction and HOA. We confirm city-level requirements and HOA covenants for every Gwinnett property we onboard.",
    faqs: [
      {
        q: 'Do I need a permit to Airbnb in Gwinnett County?',
        a: 'It depends on the city. Lawrenceville, Suwanee, and several other Gwinnett cities have STR ordinances; unincorporated Gwinnett is regulated primarily by zoning. HOAs across Gwinnett also commonly restrict STR — we check covenants before recommending a strategy.',
      },
      {
        q: 'Which Gwinnett city is best for Airbnb investing?',
        a: 'Buford and Sugar Hill capture Lake Lanier demand. Duluth and Peachtree Corners earn premium rates on corporate-traveler properties. Suwanee and Lawrenceville do well on family-sized homes for sports tournaments and graduation weekends. Choice depends on your property type and timeline — we provide a free, address-specific projection.',
      },
      {
        q: 'How does Lake Lanier affect Gwinnett STR demand?',
        a: 'Lake Lanier draws boating, fishing, and weekend visitors from late spring through early fall. Lakefront and near-lake properties in Buford and Sugar Hill earn meaningful summer premiums; inland Gwinnett properties capture overflow when lake supply tightens. Pricing strategy needs to flex with the lake calendar.',
      },
    ],
    published: true,
  },
  {
    slug: 'cherokee',
    name: 'Cherokee',
    state: 'GA',
    region: 'north-metro',
    countySeat: 'Canton',
    geo: { lat: 34.2369, lng: -84.4910 },
    cities: ['canton', 'woodstock', 'holly-springs', 'ball-ground', 'waleska'],
    tagline: 'North metro growth, mountain doorstep',
    intro: "Cherokee County sits directly north of Cobb along I-575 — Woodstock's walkable downtown, Canton's growing core, Holly Springs, Ball Ground at the I-575 terminus, and Waleska on Lake Arrowhead. It's one of the fastest-growing counties in Georgia, with strong family-travel demand and an emerging position as a mountain-doorstep market for owners targeting the Blue Ridge / Ellijay weekend traffic. ATLStay manages owner properties across every Cherokee submarket.",
    demand: "Cherokee demand stacks: Woodstock's downtown draws weekend visitors year-round; Canton captures Reinhardt University parents' weekends and small-town events; Ball Ground and the I-575 corridor service families heading to the North Georgia mountains; Lake Arrowhead in Waleska generates summer lake-house demand. Atlanta corporate travel reaches Woodstock for hybrid-work stays.",
    regulationsNote: "Cherokee County treats short-term rentals primarily through zoning rather than a county-wide licensing program. Cities within Cherokee — Canton, Woodstock, Holly Springs — each apply their own ordinance and HOAs commonly restrict STR. We confirm the specific jurisdictional treatment and any covenant constraints before recommending positioning.",
    faqs: [
      {
        q: 'Is Airbnb allowed in Woodstock and Canton?',
        a: 'Generally yes, subject to zoning and HOA covenants. Both cities permit short-term rentals in most residential zones but apply local rules around guest counts, parking, and quiet hours. We review the specific zoning for any property before recommending a listing strategy.',
      },
      {
        q: 'What kind of Airbnb earns best in Cherokee County?',
        a: 'Walking-distance-to-Woodstock-downtown properties earn the strongest nightly rates. Larger family homes (4+ bedrooms) in Canton, Holly Springs, and Ball Ground capture family travel and sports-tournament weekends. Lake Arrowhead properties in Waleska earn premium summer rates with strong winter occupancy from getaway travelers.',
      },
      {
        q: 'Can I Airbnb a mountain-doorstep cabin in Cherokee?',
        a: "Yes — and Cherokee's I-575 corridor (Ball Ground, north Canton) is a smart cabin-style market because guests get mountain proximity without the full Blue Ridge drive. We position these properties for weekend Atlanta escapes plus pass-through travel to the North Georgia destinations.",
      },
    ],
    published: true,
  },
  {
    slug: 'forsyth',
    name: 'Forsyth',
    state: 'GA',
    region: 'north-metro',
    countySeat: 'Cumming',
    geo: { lat: 34.2073, lng: -84.1402 },
    cities: ['cumming'],
    tagline: 'Lake Lanier north shore and a top-income suburban market',
    intro: "Forsyth County wraps Lake Lanier's western and southern shores and centers on Cumming. It's one of the highest-income counties in the country and a strong family-travel market — Lake Lanier visitors all summer, GA-400 commuters from Atlanta employers, and an increasingly active corporate-housing market for owners managing furnished mid-term stays. ATLStay manages properties across Cumming and unincorporated Forsyth.",
    demand: "Forsyth demand is split between Lake Lanier leisure (boating, weddings at lake-adjacent venues, summer weekends) and corporate-related stays connected to North Atlanta employers along GA-400. The Halcyon and The Collection at Forsyth retail districts pull weekend visitors year-round. Family weddings and high-school sporting events round out steady demand.",
    regulationsNote: "Forsyth County and the City of Cumming regulate short-term rentals primarily through zoning. Specific lake-adjacent communities have HOA-level restrictions that affect listing eligibility. We confirm zoning and covenants before recommending a strategy for any Forsyth property.",
    faqs: [
      {
        q: 'Can I Airbnb a lake house on Lake Lanier in Forsyth?',
        a: 'Usually yes for waterfront and near-lake properties, but several lake communities (especially gated developments) have HOA covenants that restrict short-term rentals. We confirm covenants before recommending positioning; lakefront properties that ARE eligible earn meaningful summer premiums.',
      },
      {
        q: 'When is peak Airbnb season in Forsyth County?',
        a: 'Late May through early September is the lake-driven peak, with major boost weekends around Memorial Day, July 4, and Labor Day. Year-round demand from GA-400 corporate travel and family visits fills the shoulder seasons; our pricing flexes daily to capture both patterns.',
      },
      {
        q: 'Is Cumming a good Airbnb market for non-lake properties?',
        a: 'Yes. Inland Cumming captures families visiting the Halcyon/Collection retail districts, GA-400 corporate stays, parents visiting students at North Forsyth schools, and overflow when lakefront supply tightens in summer. Larger family homes earn the strongest results.',
      },
    ],
    published: true,
  },
  {
    slug: 'henry',
    name: 'Henry',
    state: 'GA',
    region: 'south-metro',
    countySeat: 'McDonough',
    geo: { lat: 33.4476, lng: -84.1469 },
    cities: ['mcdonough', 'stockbridge', 'hampton', 'locust-grove'],
    tagline: 'South metro family travel and Atlanta Motor Speedway',
    intro: "Henry County is the southeast metro Atlanta gateway — McDonough's historic square, Stockbridge along I-75, Hampton at the Atlanta Motor Speedway, and Locust Grove at the I-75/Tanger Outlets junction. It's a family-traveler market with predictable race-weekend demand pulses and growing year-round occupancy from south-metro corporate growth. ATLStay manages owner properties across every Henry submarket.",
    demand: "Henry's clearest demand driver is Atlanta Motor Speedway in Hampton — two major race weekends a year (Quaker State 400 in summer; Truck/Xfinity Series fall stop) plus the speedway's other events generate sharp price spikes within 15 miles of the track. Tanger Outlets in Locust Grove pulls weekend shopping travel; I-75 corridor business drives weekday corporate stays in McDonough and Stockbridge.",
    regulationsNote: "Henry County and its cities take a relatively permissive approach to short-term rentals, governed primarily by zoning and HOA covenants. Hampton, McDonough, Stockbridge, and Locust Grove apply local rules around occupancy and noise. We confirm requirements per address before listing.",
    faqs: [
      {
        q: 'When are the Atlanta Motor Speedway race weekends?',
        a: "Atlanta Motor Speedway hosts a Cup Series race in summer (Quaker State 400 weekend) and a Truck/Xfinity event later in the year, plus track activities throughout the season. Race weekends are the single largest demand surge in Hampton-area STR — we adjust pricing automatically against the official schedule.",
      },
      {
        q: 'Which Henry city is best for steady Airbnb occupancy?',
        a: "McDonough captures the most consistent year-round demand: historic-square walkability, hospital corridor traffic, and the I-75 corridor. Hampton earns its biggest revenue on race weekends but slower occupancy off-season. Stockbridge balances family-traveler and corporate demand. We model your address against this mix for an accurate projection.",
      },
      {
        q: 'Is south metro Atlanta a viable Airbnb investing market?',
        a: 'Yes for the right property type. South metro favors larger family-sized homes (4+ bedrooms) close to I-75 corridor amenities. Race-weekend premiums in Hampton and Tanger Outlets weekends in Locust Grove provide event-driven upside on top of steady family-travel base demand.',
      },
    ],
    published: true,
  },
  {
    slug: 'clayton',
    name: 'Clayton',
    state: 'GA',
    region: 'south-metro',
    countySeat: 'Jonesboro',
    geo: { lat: 33.5404, lng: -84.3733 },
    cities: ['jonesboro', 'morrow'],
    tagline: 'Hartsfield-Jackson airport corridor on the south side',
    intro: "Clayton County sits immediately south of Atlanta and is the most airport-anchored STR market in the metro — Hartsfield-Jackson's busiest concourses are minutes from Jonesboro, Morrow, and Forest Park. The county also draws Gone-with-the-Wind heritage tourism in Jonesboro and Clayton State University traffic in Morrow. ATLStay manages owner properties end-to-end across Clayton's airport-adjacent submarkets.",
    demand: "Clayton's primary STR demand is airport-driven: layover stays, early-flight pre-positioning, crew lodging, and Atlanta-bound travelers who land late and need a bed before their next move. Mountain View / Forest Park warehouse logistics employers drive weekday corporate stays. Jonesboro's historic district adds weekend leisure travel for film tourists and history visitors.",
    regulationsNote: "Clayton County and its cities regulate short-term rentals primarily through zoning. Jonesboro and Morrow each apply local rules around occupancy and noise; HOA covenants in newer Clayton subdivisions sometimes restrict STR. We confirm zoning and covenant requirements per address before listing.",
    faqs: [
      {
        q: 'Is Clayton County a good Airbnb market for airport guests?',
        a: 'Yes — Clayton is the natural airport-corridor STR market. Properties within 10 minutes of Hartsfield-Jackson capture consistent layover, crew, and pre-flight bookings year-round, with strong nightly occupancy at moderate rates. Smaller, well-equipped units typically outperform larger family-style homes in this submarket.',
      },
      {
        q: 'What property type works best near the Atlanta airport?',
        a: '1–2 bedroom units optimized for traveler convenience (early breakfast, secure parking, fast Wi-Fi, blackout curtains for shift workers) typically earn the strongest results. Larger family homes do better in adjacent neighborhoods and for group/event bookings rather than pure airport demand.',
      },
      {
        q: 'How does Clayton compare to College Park for airport STR?',
        a: "College Park sits in Fulton County but borders Hartsfield-Jackson and competes directly with Clayton for airport demand. College Park typically commands slightly higher nightly rates due to closer proximity to the domestic terminal; Clayton offers more property inventory and broader price points. Both work — choice depends on the specific property and price target.",
      },
    ],
    published: true,
  },
  {
    slug: 'douglas',
    name: 'Douglas',
    state: 'GA',
    region: 'west-metro',
    countySeat: 'Douglasville',
    geo: { lat: 33.7515, lng: -84.7477 },
    cities: ['douglasville', 'lithia-springs'],
    tagline: 'West metro gateway and growing Atlanta-adjacent value market',
    intro: "Douglas County is metro Atlanta's western gateway along I-20 — Douglasville at the county center and Lithia Springs against the Fulton border. It's an Atlanta-adjacent value market that captures overflow from intown supply, west-metro corporate travel along I-20, and an emerging cabin-style getaway demand around Sweetwater Creek State Park. ATLStay manages owner properties across Douglas County.",
    demand: "Douglas demand combines I-20 corridor corporate stays, Six Flags Over Georgia traffic (Cobb-side but with overflow into Douglas), Sweetwater Creek State Park weekend visitors, and steady airport-corridor business given Hartsfield's proximity via I-285. Family-sized properties with outdoor space outperform compact units in this market.",
    regulationsNote: "Douglas County and Douglasville treat short-term rentals through zoning rather than a county-wide STR license. HOA covenants in newer subdivisions commonly restrict STR. We confirm zoning treatment and covenants before recommending a strategy for any Douglas County property.",
    faqs: [
      {
        q: 'Is Airbnb allowed in Douglas County?',
        a: 'Yes, subject to zoning and HOA covenants. The county and Douglasville do not run a centralized STR license, but specific subdivisions and condominium associations frequently restrict short-term rentals. We check both before recommending positioning for any Douglas property.',
      },
      {
        q: 'What earns best in Douglasville for Airbnb?',
        a: "Family-sized homes (3–5 bedrooms) with outdoor space and parking for multiple vehicles tend to outperform smaller units. Properties within 15 minutes of Sweetwater Creek State Park earn premiums on weekend nature-travel bookings; I-20 corridor proximity helps weekday corporate occupancy.",
      },
      {
        q: 'How does Douglas County compare to Cobb for Airbnb investing?',
        a: 'Douglas typically offers stronger entry-price economics with slightly lower nightly rates than comparable Cobb properties. Demand mix is more value-focused and less event-driven than Cobb. Best suited to owners targeting steady occupancy on family-traveler properties rather than premium event-rate plays.',
      },
    ],
    published: true,
  },
  {
    slug: 'fayette',
    name: 'Fayette',
    state: 'GA',
    region: 'south-metro',
    countySeat: 'Fayetteville',
    geo: { lat: 33.4487, lng: -84.4549 },
    cities: ['fayetteville', 'peachtree-city'],
    tagline: 'Pinewood Studios, golf-cart paths, and affluent south metro',
    intro: "Fayette County sits south of Atlanta in the Pinewood/Trilith corridor — Fayetteville at the county seat and Peachtree City with its iconic 100+ miles of golf-cart paths. It's one of the highest-income south-metro counties and a film-industry-anchored market: Pinewood Atlanta Studios and the Trilith development drive consistent crew, talent, and production-related lodging. ATLStay manages owner properties across both Fayetteville and Peachtree City.",
    demand: "Fayette's distinctive demand driver is film production — Pinewood / Trilith hosts major studio productions year-round and generates extended crew-housing stays. Peachtree City's golf-cart-path lifestyle and lake access pull leisure travel; Wyndham Atlanta South and corporate offices in the area feed weekday business stays. Steady family-travel base demand fills out the calendar.",
    regulationsNote: "Fayetteville and Peachtree City each apply their own short-term rental rules; Peachtree City's planned-community structure includes additional covenant-level restrictions in many neighborhoods. Fayette County treats unincorporated areas primarily through zoning. We verify the right framework before listing any Fayette property.",
    faqs: [
      {
        q: 'Is Airbnb allowed in Peachtree City?',
        a: "Yes, but Peachtree City's planned-community covenants restrict short-term rentals in many subdivisions, and the city applies its own zoning rules. We verify both city zoning and HOA covenants for any specific Peachtree City address before recommending positioning.",
      },
      {
        q: 'Does Pinewood Studios drive Airbnb demand in Fayette?',
        a: 'Yes — film production drives consistent crew-housing demand across Fayetteville and Peachtree City, often as 30+ day mid-term stays during active productions. Production-friendly properties (furnished, parking, fast Wi-Fi, neutral aesthetic) tend to outperform purely leisure-focused units in this market.',
      },
      {
        q: 'How do mid-term film-crew stays compare to standard Airbnb?',
        a: "Mid-term film stays trade nightly-rate ceiling for occupancy floor — typical bookings run 30–90 days at a discount versus nightly Airbnb rates, but with very high reliability. Mixing mid-term and nightly inventory is a common Fayette strategy. We model the right mix for each owner's property and goals.",
      },
    ],
    published: true,
  },
  {
    slug: 'coweta',
    name: 'Coweta',
    state: 'GA',
    region: 'south-metro',
    countySeat: 'Newnan',
    geo: { lat: 33.3812, lng: -84.7997 },
    cities: ['newnan', 'senoia'],
    tagline: 'Newnan, Senoia, and the Walking Dead corridor',
    intro: "Coweta County is southwest of Atlanta along I-85 — Newnan at the historic county seat and Senoia as the small-town heart of Georgia's film tourism corridor. Senoia's downtown stood in as Woodbury in The Walking Dead and continues to draw film tourists; Newnan combines a beautifully preserved historic core with growing I-85 corridor corporate demand. ATLStay manages owner properties across both Newnan and Senoia.",
    demand: "Coweta's demand mix is unusual: Senoia draws film-tourism visitors year-round who specifically seek a Senoia stay; Newnan's historic district pulls weekend leisure travel and small-town wedding parties; I-85 corridor traffic generates weekday business stays. Film production occasionally bumps the market when crews film locally.",
    regulationsNote: "Coweta County, Newnan, and Senoia regulate short-term rentals through zoning and city-level ordinances. Senoia's historic district has design and use restrictions that affect what properties qualify and how they can be marketed. We confirm zoning and any historic-district treatment before listing any Coweta property.",
    faqs: [
      {
        q: 'Can I Airbnb a Senoia historic property?',
        a: "Often yes, but Senoia's historic district applies design review and use restrictions that vary by exact address. We confirm whether the specific property sits within the historic overlay and what restrictions apply before recommending positioning.",
      },
      {
        q: 'Does film tourism actually drive Airbnb bookings in Senoia?',
        a: "Yes — Senoia is a small market, but a meaningfully high share of Senoia Airbnb bookings come from film tourists making specific Walking Dead / film-location trips. Properties walkable to downtown Senoia earn the strongest premiums; properties further out compete more on standard small-town leisure demand.",
      },
      {
        q: 'How does Newnan compare to other south-metro markets?',
        a: "Newnan's historic district is one of the best-preserved in Georgia and pulls a leisure-traveler mix that other south-metro markets don't have. Combined with I-85 corridor corporate demand, Newnan typically earns steady year-round occupancy at moderate nightly rates. Best suited to design-forward owners targeting both leisure and business segments.",
      },
    ],
    published: true,
  },
  {
    slug: 'newton',
    name: 'Newton',
    state: 'GA',
    region: 'east-metro',
    countySeat: 'Covington',
    geo: { lat: 33.5968, lng: -83.8602 },
    cities: ['covington'],
    tagline: 'Covington and the Vampire Diaries / Sweet Magnolias filming corridor',
    intro: "Newton County sits east of Atlanta along I-20 and centers on Covington — known regionally as the 'Hollywood of the South' for its long film history (In the Heat of the Night, The Vampire Diaries, The Originals, Sweet Magnolias, Legacies, and dozens more). The downtown square and historic neighborhoods continue to draw film tourists year-round. ATLStay manages owner properties across Covington and unincorporated Newton.",
    demand: "Newton's distinctive STR demand is film tourism. Covington's downtown stood in as Mystic Falls in The Vampire Diaries and the entire universe continues to bring fans on specific trip-purpose stays. Steady weekday I-20 corporate corridor demand fills out the calendar; weddings and reunions at historic Covington venues add weekend leisure base.",
    regulationsNote: "Newton County and the City of Covington regulate short-term rentals through zoning and local ordinances. Covington's historic district applies design and use rules that affect what properties qualify for STR use. We confirm zoning and historic-district treatment before listing any Newton property.",
    faqs: [
      {
        q: 'How big is film tourism for Covington Airbnbs?',
        a: 'Significant — a meaningful share of Covington bookings come from Vampire Diaries / Sweet Magnolias / Originals fans making destination trips. Properties walkable to the downtown square (the on-camera Mystic Falls town center) consistently outperform properties further out for this guest type.',
      },
      {
        q: 'Is Covington a good year-round Airbnb market?',
        a: "Yes for the right property. Film tourism provides a steady leisure base; I-20 corporate corridor demand fills weekdays; downtown weddings and reunions drive weekend leisure. Larger 3–4 bedroom homes near the square earn the most balanced demand. Smaller condos do less well — Covington travelers typically come in groups.",
      },
      {
        q: 'Are there specific filming-location homes I can buy and rent?',
        a: "Some private homes used as on-camera filming locations are listed by Vampire Diaries / Originals fans on Airbnb specifically as 'Mystic Falls' stays. These earn substantial premiums but are limited inventory. Even non-location properties near downtown Covington benefit from the broader Mystic Falls tourism halo.",
      },
    ],
    published: true,
  },
  {
    slug: 'rockdale',
    name: 'Rockdale',
    state: 'GA',
    region: 'east-metro',
    countySeat: 'Conyers',
    geo: { lat: 33.6679, lng: -84.0177 },
    cities: ['conyers'],
    tagline: 'Conyers, the Georgia International Horse Park, and east-metro value',
    intro: "Rockdale County sits east of Atlanta along I-20 and centers on Conyers. Its defining feature is the Georgia International Horse Park — the 1996 Olympic equestrian venue, still active for major equestrian, dog show, and motorsport events. Conyers itself combines a walkable historic downtown with growing I-20 corridor housing. ATLStay manages owner properties across Conyers and unincorporated Rockdale.",
    demand: "Rockdale's strongest demand driver is the Georgia International Horse Park — major equestrian competitions, AKC dog shows, and motorsport events bring out-of-town competitors who book 3–7 night stays in Conyers. Year-round I-20 corridor corporate travel and family-traveler base demand fill the calendar.",
    regulationsNote: "Rockdale County and the City of Conyers regulate short-term rentals through zoning. HOA covenants in newer Conyers subdivisions sometimes restrict STR. We confirm zoning and any covenant restrictions before recommending positioning.",
    faqs: [
      {
        q: 'Does the Georgia International Horse Park really drive Airbnb demand?',
        a: 'Yes — major equestrian, dog-show, and motorsport events at the Horse Park bring competitors who need stalls and lodging within minutes of the venue. Event-weekend pricing in Conyers commands premiums comparable to mid-tier event weekends in Atlanta proper, and family-sized properties with multiple parking spaces earn the most.',
      },
      {
        q: 'Is Conyers a good year-round Airbnb market?',
        a: "Yes for family-sized properties. Horse Park events anchor a steady event calendar; I-20 corporate stays fill weekdays; downtown Conyers' historic walkability draws weekend leisure travelers. Smaller condos and apartments generally underperform versus 3–4 bedroom homes in this market.",
      },
      {
        q: 'How does Rockdale compare to Newton for Airbnb investing?',
        a: "Both are east-metro I-20 corridor markets with similar entry-price economics. Rockdale's Horse Park provides a more consistent event calendar; Newton's Covington has stronger film-tourism leisure demand. Choice depends on which demand profile a specific property matches best — we model both for any address.",
      },
    ],
    published: true,
  },
  {
    slug: 'paulding',
    name: 'Paulding',
    state: 'GA',
    region: 'west-metro',
    countySeat: 'Dallas',
    geo: { lat: 33.9237, lng: -84.8408 },
    cities: ['dallas-ga', 'hiram'],
    tagline: 'West metro growth corridor and family-traveler value market',
    intro: "Paulding County sits northwest of Atlanta — Dallas at the county seat and Hiram along US-278. It's one of the fastest-growing west-metro counties and an Atlanta-adjacent value market for STR owners targeting family travel, west-Cobb spillover, and steady year-round demand from growing local employment. ATLStay manages owner properties across Dallas and Hiram.",
    demand: "Paulding demand combines west-metro spillover (Cobb properties at lower entry price), family-traveler base demand, sports tournament traffic at local complexes, and steady weekday corporate stays from growing west-metro logistics and healthcare employment. Sweetwater Creek State Park is also nearby and pulls overflow nature-travel demand.",
    regulationsNote: "Paulding County and its cities regulate short-term rentals through zoning rather than a central STR license. HOA covenants in newer Paulding subdivisions frequently restrict STR. We confirm zoning and covenant treatment before recommending a strategy.",
    faqs: [
      {
        q: 'Is Paulding County a good Airbnb investing market?',
        a: 'For the right property type, yes. Paulding offers favorable entry-price economics versus comparable Cobb properties with a similar family-traveler demand mix. Best suited to owners targeting steady occupancy on 3–5 bedroom homes rather than premium event-rate plays.',
      },
      {
        q: 'What property type performs best in Dallas or Hiram?',
        a: 'Family-sized homes (3–5 bedrooms) with outdoor space, multi-car parking, and proximity to US-278 / I-20 access. Properties on cul-de-sacs or with bonus rooms (game room, finished basement) consistently outperform standard floor plans in this market.',
      },
      {
        q: 'How do west-metro counties compare for STR?',
        a: "Paulding, Douglas, and west Cobb form a contiguous value-market band. Paulding typically offers the most favorable entry-price economics; Douglas adds Sweetwater Creek nature-travel demand; west Cobb (Marietta-adjacent) commands higher nightly rates. We model an owner's specific address against the right submarket positioning.",
      },
    ],
    published: true,
  },
  {
    slug: 'barrow',
    name: 'Barrow',
    state: 'GA',
    region: 'north-metro',
    countySeat: 'Winder',
    geo: { lat: 33.9876, lng: -83.7203 },
    cities: ['auburn-ga', 'braselton', 'winder'],
    tagline: 'Chateau Élan, the I-85 corridor, and quiet luxury demand',
    intro: "Barrow County sits northeast of metro Atlanta along the I-85 corridor — Winder at the county seat, Braselton on the western edge anchored by Chateau Élan Winery & Resort, and Auburn as a growing residential community. It's a quietly affluent corridor with strong destination-resort demand (Chateau Élan), corporate corridor business, and growing residential family travel. ATLStay manages owner properties across Auburn, Braselton, and Winder.",
    demand: "Chateau Élan drives meaningful destination-resort overflow demand into Braselton and surrounding Barrow — weddings, golf weekends, and wine-country trips that book nearby STR when the resort itself is full. I-85 corridor employment (manufacturing, logistics) supports weekday corporate stays; Northeast Georgia Medical Center brings traveling medical staff into mid-term stays.",
    regulationsNote: "Barrow County and its cities regulate short-term rentals primarily through zoning. Braselton specifically applies city-level rules around STR in residential zones; HOA covenants in resort-adjacent neighborhoods sometimes restrict STR. We confirm zoning and covenants per address before recommending positioning.",
    faqs: [
      {
        q: 'Does Chateau Élan drive Airbnb demand in Barrow?',
        a: 'Yes — weddings, golf tournaments, and corporate retreats at Chateau Élan generate consistent overflow demand into nearby STR inventory when the resort is full. Properties within 10 minutes of the resort earn meaningful weekend premiums, especially during peak wedding season (May–October).',
      },
      {
        q: 'Is Braselton a good Airbnb market?',
        a: 'Yes for properties positioned for resort-overflow and wedding-guest demand. Larger family-sized homes (3+ bedrooms) with outdoor space and modern interiors typically outperform smaller units in this market. The Mall of Georgia in adjacent Hall/Gwinnett also pulls weekend visitors into Braselton.',
      },
      {
        q: 'How does Barrow compare to neighboring Gwinnett and Hall for STR?',
        a: "Barrow typically offers more favorable entry-price economics than Gwinnett's premium submarkets, with comparable demand for the right property type. Chateau Élan provides a unique resort-anchored demand layer that neither Gwinnett nor Hall offers in the same concentration.",
      },
    ],
    published: true,
  },
  {
    slug: 'walton',
    name: 'Walton',
    state: 'GA',
    region: 'east-metro',
    countySeat: 'Monroe',
    geo: { lat: 33.7951, lng: -83.7129 },
    cities: ['monroe-ga', 'social-circle'],
    tagline: 'Monroe and Social Circle, quiet historic east-metro charm',
    intro: "Walton County sits east of Atlanta — Monroe at the county seat and Social Circle as one of Georgia's most photogenic small downtowns. Both centers have meticulously preserved historic districts that draw weekend leisure travelers, wedding parties, and antique-shopping visitors. ATLStay manages owner properties across Monroe and Social Circle.",
    demand: "Walton's STR demand is anchored by historic-small-town leisure travel — Monroe's downtown square and Social Circle's preserved Main Street pull weekend visitors year-round. Weddings at restored historic venues drive booked-out weekends in shoulder seasons. Steady I-20 / US-78 corridor traffic adds weekday corporate base.",
    regulationsNote: "Walton County, Monroe, and Social Circle each regulate short-term rentals through zoning and city-level ordinances. Historic districts in both cities apply design and use restrictions that affect what properties qualify. We confirm zoning, historic-district treatment, and any HOA covenants before listing any Walton property.",
    faqs: [
      {
        q: 'Can I Airbnb a historic-district property in Monroe or Social Circle?',
        a: "Often yes, but each historic district applies design and use rules that affect what's allowed. We confirm the specific historic-district treatment for any address before recommending a listing strategy.",
      },
      {
        q: 'Is Walton County a good year-round Airbnb market?',
        a: 'Yes for the right property. Walton trades event-rate volatility for steady leisure-traveler base demand. Larger family-sized homes near downtown Monroe or Social Circle, and design-forward properties marketed for weddings and small-group leisure, earn the most balanced year-round results.',
      },
      {
        q: 'How does Walton compare to other east-metro counties for STR?',
        a: "Walton is smaller and more leisure-anchored than Rockdale or Newton, with less event-driven volatility and stronger weekend wedding/leisure demand. Best suited to owners with character-rich properties they want to position around historic-small-town charm rather than pure event-rate optimization.",
      },
    ],
    published: true,
  },
];

// Reverse-lookup helpers built from `counties[].cities` so the two structures
// never drift. Used by the [city]/index.astro template to render an "up to
// county" link, and by llms.txt to enumerate counties per city.
export const cityCountyMap: Record<string, string> = counties.reduce(
  (acc, c) => {
    for (const citySlug of c.cities) acc[citySlug] = c.slug;
    return acc;
  },
  {} as Record<string, string>,
);

export const countyBySlug: Record<string, County> = Object.fromEntries(
  counties.map((c) => [c.slug, c]),
);
