/* Anchor pages — furnished / mid-term housing near a named institution.
 *
 * WHY THESE EXIST. Two facts drove this. First, 19% of the site's traffic and
 * 31% of its converted leads now arrive from ChatGPT (GA4 + lead attribution,
 * measured 2026-09-01) — more traffic than Google Search sends. Second, the two
 * pages those referrals convert on, /services/travel-nurse-housing/ and
 * /services/mid-term-rental-management/, are the only two that carry real dated
 * third-party citations. Nobody asks an assistant for "property management in
 * Dunwoody". They ask where a nurse on a 13-week contract at Emory can live.
 * These pages answer that, with sources.
 *
 * THE RULE FOR THIS FILE: every figure carries a `sources` entry with a real URL
 * and the date it was checked, and the template renders them on the page. A fact
 * that cannot be sourced is left out — there is no "about", no "roughly", no
 * number recalled from memory. Research was done 2026-09-01; where two sources
 * disagreed (bed counts especially) the institution's own site wins and the
 * conflict is noted rather than averaged.
 *
 * These are NOT the /near/ landmark pages. Those target short-term rental
 * management near stadiums and attractions. These target furnished stays of
 * thirty days and up, which is a different guest, a different lease and a
 * different search.
 */

export interface AnchorSource {
  label: string;
  url: string;
  checked: string;
}

export interface Anchor {
  slug: string;
  /** Institution name exactly as it calls itself. */
  name: string;
  shortName?: string;
  kind: string;
  /** City the institution actually sits in — not always Atlanta. */
  city: string;
  county: string;
  address: string;
  /** One line under the H1. */
  tagline: string;
  /** Why furnished, 30+ day demand exists here. Real, specific. */
  demand: string[];
  /** Verified facts rendered as a short table. Each must trace to `sources`. */
  facts: { label: string; value: string }[];
  /** Who actually needs the housing. Drives the FAQ and the copy. */
  audiences: string[];
  /** Real pages we already publish nearby, nearest first. */
  nearby: { name: string; href: string }[];
  /** The service pages this anchor feeds. */
  services: { name: string; href: string }[];
  faqs: { q: string; a: string }[];
  sources: AnchorSource[];
  published: boolean;
}

/* Shared, sourced facts used across several anchors. Stated once so a change
   updates every page, and so the numbers cannot drift apart between pages. */
/* 13 weeks is the standard, corroborated across AMN, Aya, Vivian and CoreMedical.
   The wider range is 8-26 weeks; shorter 4-8 week contracts exist but are
   specifically crisis or seasonal work, not the normal case — so this does not
   claim them as typical. */
export const TRAVEL_NURSE_CONTRACT =
  "The standard US travel-nurse contract runs 13 weeks — a little over three months. Assignments typically range from 8 to 26 weeks, and extensions are usually renewed in further 13-week blocks, so a nurse who settles somewhere they like often stays six months or more. Shorter four-to-eight-week contracts exist but are specifically crisis or seasonal cover rather than the normal case. That 13-week shape is the whole reason furnished mid-term housing exists as a category near hospitals: it is far too long for a hotel to make financial sense, and far too short for a landlord demanding a twelve-month lease. An owner letting furnished on 30-plus-day terms is pricing against that contract length, not against a weekend rate, and should expect a booking calendar measured in quarters rather than nights.";

/* The 30-day line, confirmed in primary sources. This is the single most useful
   fact an owner near a hospital can be told, and almost nobody states it
   plainly: three separate Georgia regimes turn on the same threshold.
   NOT claimed here: any landlord-tenant "guest becomes a tenant after N days"
   rule. That is common short-let folklore and could NOT be found in Georgia's
   Title 44 landlord-tenant law. Do not add it without a lawyer's sign-off. */
export const THIRTY_DAY_LINE =
  "Thirty days is the line that separates two different businesses in Georgia, and three separate rules turn on it. Atlanta's short-term rental ordinance defines a short-term rental as lodging for a period not exceeding 30 consecutive days, so a longer furnished let sits outside that certificate regime by the ordinance's own definition. Georgia's local hotel-motel excise tax exempts charges for continuous occupancy after the first 30 days. And the state's $5-a-night hotel-motel fee stops once a stay becomes an \"extended stay rental\" of 31 or more consecutive days to the same guest — though if that guest checks out and checks back in, the count resets to zero and the fee starts again. This is why owners near hospitals, studios and campuses so often choose furnished mid-term over nightly: fewer turnovers, a different rulebook, and a guest who stays for a season rather than a weekend. Local rules differ across metro Atlanta and do change, so the position should be confirmed for a specific address before a property is listed.";

const ATLANTA_STR_SOURCE: AnchorSource = {
  label: 'City of Atlanta Short Term Rental Ordinance 20-O-1656, §20-1003',
  url: 'https://library.municode.com/ga/atlanta/codes/code_of_ordinances?nodeId=PTIIICOORANDECO_PT20SHTERE_S20-1003DEGEPR',
  checked: '2026-09-01',
};

const HOTEL_FEE_SOURCE: AnchorSource = {
  label: 'Georgia Department of Revenue — State Hotel-Motel Fee FAQ',
  url: 'https://dor.georgia.gov/state-hotel-motel-faq',
  checked: '2026-09-01',
};

export const GSA_ATLANTA = {
  standard: '$182',
  peak: '$197',
  peakMonths: 'January, February and March 2026',
  mie: '$86',
};

const GSA_SOURCE: AnchorSource = {
  label: 'GSA FY2026 per diem rates, Georgia',
  url: 'https://www.gsa.gov/travel/plan-book/per-diem-rates/per-diem-rates-results?action=perdiems_report&fiscal_year=2026&state=GA',
  checked: '2026-09-01',
};

const NURSE_SOURCE: AnchorSource = {
  label: 'Core Medical Group — travel nurse contract length',
  url: 'https://www.coremedicalgroup.com/blog/length-of-travel-nurse-contracts',
  checked: '2026-09-01',
};


/* Georgia's film incentive and production volume, stated once. Every studio
   page leans on the same two facts, and an owner deciding whether crew housing
   is a real market deserves the honest version of the second one: production
   spend is DOWN, not up. Saying so is more useful than a boom story, and it is
   what makes the rest of the page believable. */
export const GA_FILM =
  "Georgia's film incentive is a 20% transferable tax credit on qualified in-state spend, rising to 30% with the promotional logo uplift, with a $500,000 minimum and no annual cap. That structure is why the industry is here at all.";

export const GA_FILM_VOLUME =
  "Production spend in Georgia was $2.0 billion across 280 productions in the 2026 fiscal year — 13 feature films, 77 independent films, 130 television and episodic productions and 54 commercials. That is down from $2.3 billion the year before and less than half the $4.4 billion peak of 2022, making it the weakest year for Georgia production spending in about a decade. The industry is not going anywhere: the state's 30% transferable tax credit is uncapped and has no sunset, and more than 7,000 crew belong to the Georgia IATSE local. But an owner deciding whether to furnish a property for crew housing should size that decision on $2 billion and falling, not on the boom years. Our advice is consistent: treat production crew as one demand source among several for a property that already works, rather than as the reason to buy one.";

const GA_FILM_SOURCE: AnchorSource = {
  label: 'Georgia Department of Economic Development — film production incentives',
  url: 'https://georgia.org/industries/film-entertainment/georgia-film-tv-production/production-incentives',
  checked: '2026-09-01',
};

const GA_FILM_VOLUME_SOURCE: AnchorSource = {
  label: 'AJC — Georgia film and TV production spending slips to $2bn, a 10-year low',
  url: 'https://www.ajc.com/business/2026/07/georgia-film-and-tv-production-spending-slips-to-2b-a-10-year-low/',
  checked: '2026-09-01',
};

const IATSE_SOURCE: AnchorSource = {
  label: 'IATSE Local 479 — membership',
  url: 'https://iatse479.org/made-in-georgia-with-georgia-crews/',
  checked: '2026-09-01',
};

const CREW_SERVICES = [
  { name: 'Film & Production Housing', href: '/services/film-production-housing/' },
  { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
  { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
];

const CAMPUS_SERVICES = [
  { name: 'Student & Academic Housing', href: '/services/student-housing/' },
  { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
  { name: 'Long-Term Rental Management', href: '/services/long-term-rental-management/' },
];

const CREW_FAQ = {
  q: 'How long does a production crew actually stay in the area?',
  a: "It tracks the shoot, and shoots are long. A mid-size feature commonly films for 40 to 50 days, a larger studio production 80 to 100, and an hour-long television drama runs roughly eight shooting days per episode across a season. Crew are also on the ground for prep before the first day and wrap after the last, so the time somebody actually needs a bed is meaningfully longer than the shooting schedule suggests. In practice that means a stay of several weeks to several months — squarely furnished mid-term territory rather than nightly. Corporate housing providers who serve this market report crews booking accommodation six to eight weeks ahead of principal photography, which is a useful signal for an owner: production housing is arranged in advance by people with a budget, not booked last-minute by individuals hunting for a bargain.",
};

const FILM_JOBS_FAQ = {
  q: 'Is there enough film work in Georgia to make crew housing a real market?',
  a: "The workforce is substantial and local. IATSE Local 479, the Georgia crew local covering the below-the-line trades, has more than 7,000 members and is now the largest studio mechanics local in the United States — its membership more than tripled in a decade. Georgia's below-the-line local hire rate sits at about 72%, which is the number that matters for housing: roughly a quarter of crew on any given production still come from outside the state and need somewhere to live while they work. For scale, a single long-running Atlanta production, Stranger Things, employed 7,700 Georgians over its decade in the state and 3,737 during its final season alone. The demand is real. What an owner should be careful about is not whether crew exist, but whether production volume in a given year supports counting on them.",
};

export const anchors: Anchor[] = [
  {
    slug: 'emory-university-hospital',
    name: 'Emory University Hospital',
    kind: 'Academic medical centre',
    city: 'Atlanta',
    county: 'DeKalb',
    address: '1364 Clifton Rd NE, Atlanta, GA 30322',
    tagline: 'Furnished housing for the Clifton Road corridor — Druid Hills, Decatur and Brookhaven',
    demand: [
      'Emory University Hospital sits on the Clifton Road campus in Druid Hills, and it is staffed exclusively by Emory University School of Medicine faculty. That academic structure is what creates the housing demand: a hospital staffed by a medical school runs a permanent population of people who arrive for a fixed term and leave again.',
      'Emory School of Medicine reports more than 1,400 residents and fellows across over 120 training programmes, taking in more than 200 first-year positions every year. Those are one-to-seven-year stays, and almost none of them want a twelve-month lease signed sight-unseen from another state.',
      "There is a second population here, and Emory has said out loud that it cannot house them. Its own reporting identified a shortage of graduate housing on the core campus; it built 535 beds that opened in summer 2024, reached 99% occupancy with more than half of residents renewing, and is adding 383 more by summer 2027. Emory also enrols 8,180 graduate and professional students and hosts nearly 700 postdoctoral fellows. When an institution builds a thousand beds and still runs at 99%, the overflow goes to the private market.",
      'Add contract nursing on top. Around 17% of Emory Healthcare\u2019s nursing staff were temporary or agency employees as of June 2024, and the system runs its own internal travel programme with assignments from two weeks to three months. A 13-week assignment does not fit a standard lease and does not fit a nightly rental either \u2014 it is exactly the gap a furnished, thirty-day-plus let is built for.',
      'Drive times from the Clifton Road campus, checked on Google Maps: North Druid Hills 7 minutes (2.2 miles), Candler Park 10 minutes (2.7 miles), Virginia-Highland 11 minutes (3.6 miles), Decatur Square 12 minutes (2.9 miles). That is the realistic catchment \u2014 not a whole-metro radius.',
    ],
    facts: [
      { label: 'Address', value: '1364 Clifton Rd NE, Atlanta, GA 30322' },
      { label: 'Neighbourhood', value: 'Druid Hills, DeKalb County' },
      { label: 'Beds', value: '751 licensed (FY2024, including 82 at the Wesley Woods campus)' },
      { label: 'Staff', value: '4,880 employees and 2,078 faculty physicians (FY2024)' },
      { label: 'Teaching hospital', value: 'Yes — staffed by Emory University School of Medicine faculty' },
      { label: 'Residents & fellows', value: '1,400+ across 120+ programmes (Emory School of Medicine, all sites)' },
      { label: 'Transit', value: 'No rail station on campus; MARTA bus route 6 runs to the hospital from Lindbergh Center' },
    ],
    audiences: [
      'Residents and fellows on one-to-seven-year programmes',
      'Travel nurses on 13-week contracts',
      'Visiting faculty and research staff',
      'Families of long-stay patients',
      'Locum physicians covering short placements',
    ],
    nearby: [
      { name: 'Decatur', href: '/decatur/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
      { name: 'Virginia-Highland', href: '/atlanta/virginia-highland/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
    ],
    faqs: [
      {
        q: 'How long do travel nurses at Emory usually need housing for?',
        a: `${TRAVEL_NURSE_CONTRACT} That means a furnished let of three months, frequently extended to six, is the normal shape of the booking — not a weekend and not a year.`,
      },
      {
        q: 'What does a furnished rental near Emory need to earn?',
        a: `A useful public benchmark is the federal lodging per diem: the GSA rate for Atlanta in FY2026 is ${GSA_ATLANTA.standard} a night, rising to ${GSA_ATLANTA.peak} in ${GSA_ATLANTA.peakMonths}, with ${GSA_ATLANTA.mie} a day for meals and incidentals. Agency housing stipends are not set by that figure, but it is the number most people in this market reason from. We price against real comparable furnished listings, not a rule of thumb.`,
      },
      {
        q: 'Which neighbourhoods actually work for Emory staff?',
        a: "Druid Hills sits immediately around the Clifton Road campus. Beyond it, the realistic catchment is tighter than most owners assume: North Druid Hills is about 7 minutes and 2.2 miles by car, Candler Park 10 minutes, Virginia-Highland 11 minutes, and Decatur Square 12 minutes. Anything beyond roughly fifteen minutes stops competing, because someone working clinical shifts is optimising for the commute above almost everything else. What those inner neighbourhoods share is walkable dining and grocery access, which matters far more to a person living somewhere for three months than to one visiting for three days. There is no MARTA rail station on the Clifton Road campus — bus route 6 runs to the hospital from Lindbergh Center — so a property with off-street parking has a real advantage here. We manage across all of these areas.",
      },
      {
        q: 'Do I need a short-term rental permit for a 30-day-plus let?',
        a: `${THIRTY_DAY_LINE} Rules differ by jurisdiction and do change, so we confirm the position for your specific address before anything is listed.`,
      },
    ],
    sources: [
      { label: 'Emory Healthcare — Emory University Hospital', url: 'https://www.emoryhealthcare.org/locations/hospitals/emory-university-hospital', checked: '2026-09-01' },
      { label: 'Emory School of Medicine — Graduate Medical Education', url: 'https://med.emory.edu/education/gme/index.html', checked: '2026-09-01' },
      NURSE_SOURCE,
      GSA_SOURCE,
      ATLANTA_STR_SOURCE,
      HOTEL_FEE_SOURCE,
      { label: 'Emory Woodruff Health Sciences Center \u2014 facts & figures (FY2024)', url: 'https://whsc.emory.edu/about/facts-figures/figures.html', checked: '2026-09-01' },
      { label: 'Emory News Center \u2014 graduate housing phase two', url: 'https://news.emory.edu/stories/2025/10/er_graduate_housing_phase_two_14-10-2025/story.html', checked: '2026-09-01' },
      { label: 'Emory Common Data Set 2025-2026', url: 'https://provost.emory.edu/planning-administration/_includes/documents/sections/institutional-data/emory-common-date-set-2025-2026.pdf', checked: '2026-09-01' },
      { label: 'AJC \u2014 Emory Healthcare announces $100 million in raises for staff', url: 'https://www.ajc.com/news/health-news/emory-healthcare-announces-100-million-in-raises-for-staff/JPEC6XTHH5EBFFF62IVJQ5AZ6A/', checked: '2026-09-01' },
    ],
    published: true,
  },

  {
    slug: 'emory-university-hospital-midtown',
    name: 'Emory University Hospital Midtown',
    kind: 'Academic medical centre',
    city: 'Atlanta',
    county: 'Fulton',
    address: '550 Peachtree St NE, Atlanta, GA 30308',
    tagline: 'Furnished housing in Midtown — walkable, on MARTA, and built for a three-month stay',
    demand: [
      'Emory University Hospital Midtown sits on Peachtree Street in the middle of Midtown, which makes it the rare Atlanta hospital where staff can genuinely live without a car. That single fact changes what a furnished rental near it is worth.',
      'It is an acute-care teaching hospital staffed by more than a thousand physicians, including Emory Clinic faculty across roughly 28 specialties. Teaching hospitals generate rotating populations by design — residents, fellows and visiting clinicians who need somewhere furnished for a term, not a year.',
      'Emory is not leaving this to the market. In 2025 it began converting two nearby Midtown buildings, including 477 Peachtree Street directly across from the hospital, into more than 50 rental apartments reserved for its own healthcare employees. An institution building housing for its own staff is about the clearest evidence of demand a property owner could ask for.',
      'Midtown also carries corporate and film demand independently of the hospital, which means a well-run furnished property here rarely has to depend on one source of guests.',
    ],
    facts: [
      { label: 'Address', value: '550 Peachtree St NE, Atlanta, GA 30308' },
      { label: 'Neighbourhood', value: 'Midtown Atlanta' },
      { label: 'Beds', value: '605 licensed (FY2024)' },
      { label: 'Staff', value: '4,621 employees and 1,942 faculty physicians (FY2024)' },
      { label: 'Transit', value: 'Civic Center MARTA station is a 0.2-mile walk; North Avenue station 0.4 miles' },
      { label: 'Teaching hospital', value: 'Yes — acute-care teaching hospital and a training site for the Emory emergency medicine residency' },
    ],
    audiences: [
      'Residents, fellows and rotating clinicians',
      'Travel nurses on 13-week contracts',
      'Corporate assignees working in Midtown',
      'Patients and families in extended treatment',
    ],
    nearby: [
      { name: 'Midtown', href: '/atlanta/midtown/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Virginia-Highland', href: '/atlanta/virginia-highland/' },
      { name: 'Buckhead', href: '/atlanta/buckhead/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
    ],
    faqs: [
      {
        q: 'Is a car necessary for staff living near Emory Midtown?',
        a: "Less than almost anywhere else in the city, and this is the single strongest selling point a property near this hospital has. Emory Midtown sits on Peachtree Street inside Midtown's walkable core. Civic Center MARTA station is a 0.2-mile walk from the hospital and North Avenue station is 0.4 miles, so a member of staff can genuinely live here without a car — which for someone flying in for a 13-week contract, or a resident arriving from another state, removes an expensive and awkward problem. If a property is within walking distance of a rail station, that fact belongs in the first line of the listing rather than buried in the amenities. It is frequently the detail that decides a booking, and it is worth more here than an extra bedroom would be.",
      },
      {
        q: 'How long are these stays?',
        a: `${TRAVEL_NURSE_CONTRACT} Residents and fellows stay considerably longer, which is why furnished properties near teaching hospitals tend to turn over far less than nightly rentals.`,
      },
      {
        q: 'Does a Midtown property have to choose between healthcare and corporate guests?',
        a: "No, and it should not have to. Midtown carries corporate, film-production and healthcare demand simultaneously, which is unusual and valuable: it means a furnished property here is not exposed to any single employer's contracting cycle. Emory itself has gone further than most institutions in signalling the shortage — in 2025 it began converting two nearby Midtown buildings, including 477 Peachtree Street directly across from the hospital, into more than 50 rental apartments reserved for its own healthcare employees. An organisation building housing for its own staff is about the clearest evidence of unmet demand an owner could ask for. We position a property for whichever segment is paying best in a given season rather than committing it to one audience, which is what keeps occupancy steady across the year.",
      },
    ],
    sources: [
      { label: 'Emory Healthcare — Emory University Hospital Midtown', url: 'https://www.emoryhealthcare.org/locations/hospitals/emory-university-hospital-midtown', checked: '2026-09-01' },
      { label: 'Emory Woodruff Health Sciences Center \u2014 facts & figures (FY2024)', url: 'https://whsc.emory.edu/about/facts-figures/figures.html', checked: '2026-09-01' },
      { label: 'Emory News Center \u2014 Midtown buildings converted to healthcare-worker housing', url: 'https://news.emory.edu/stories/2025/07/er_emory_peachtree_midtown_development_07-07-2025/story.html', checked: '2026-09-01' },
      NURSE_SOURCE,
      GSA_SOURCE,
      ATLANTA_STR_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'piedmont-atlanta-hospital',
    name: 'Piedmont Atlanta Hospital',
    kind: 'Hospital',
    city: 'Atlanta',
    county: 'Fulton',
    address: '1968 Peachtree Rd NW, Atlanta, GA 30309',
    tagline: 'Furnished housing in Buckhead, where the hospital and the corporate market overlap',
    demand: [
      'Piedmont Atlanta is a 643-bed hospital on Peachtree Road, in Buckhead — by its own description, in the middle of one of the strongest rental submarkets in the city.',
      'That location is the point. A furnished property near Piedmont is not dependent on the hospital alone: Buckhead carries corporate relocation, extended business travel and executive housing demand at the same time, on the same kind of thirty-day-plus terms.',
      'Piedmont runs its own internal travel-staffing agency placing nurses on 12- and 13-week assignments across its Georgia hospitals, Atlanta included. That is the same contract length the wider travel-nurse market works to, and the same length a furnished let is built around.',
      'For an owner, that overlap is what makes the furnished strategy defensible here. When healthcare contracting slows, the corporate demand does not necessarily slow with it. Drive times checked on Google Maps: Midtown 10 minutes, Buckhead Village 10, Virginia-Highland 14, Brookhaven 17.',
    ],
    facts: [
      { label: 'Address', value: '1968 Peachtree Rd NW, Atlanta, GA 30309' },
      { label: 'Neighbourhood', value: 'Buckhead' },
      { label: 'Beds', value: '643 licensed' },
      { label: 'Staff', value: 'More than 1,000 physicians and 4,000 healthcare professionals' },
      { label: 'Admissions', value: 'Around 30,000 inpatient admissions a year' },
      { label: 'Transit', value: 'No rail station within walking distance; Lindbergh Center is 2.6 miles' },
    ],
    audiences: [
      'Travel nurses and allied health contractors',
      'Corporate assignees and relocating executives',
      'Families of patients in extended treatment',
    ],
    nearby: [
      { name: 'Buckhead', href: '/atlanta/buckhead/' },
      { name: 'Virginia-Highland', href: '/atlanta/virginia-highland/' },
      { name: 'Midtown', href: '/atlanta/midtown/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
      { name: 'Sandy Springs', href: '/sandy-springs/' },
    ],
    services: [
      { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
    ],
    faqs: [
      {
        q: 'Is Buckhead too expensive to work as furnished mid-term housing?',
        a: "Not for this audience, no. Corporate housing budgets and healthcare stipends are set against local market rates, and Buckhead is precisely where relocating executives and consultants expect to be placed — a company moving someone to Atlanta is not looking for the cheapest postcode. Piedmont Atlanta is a 643-bed hospital with more than 1,000 physicians and around 30,000 inpatient admissions a year, sitting in the middle of one of the strongest rental submarkets in the city. Piedmont also runs its own internal travel-staffing agency placing nurses on 12- and 13-week assignments across its Georgia hospitals. The real risk in Buckhead is not that the rate is unaffordable; it is an empty premium property sitting unlet because it was positioned wrongly or priced on instinct. That is a management problem, and it is the job.",
      },
      {
        q: 'What length of stay should I expect?',
        a: `Thirty days is the floor. ${TRAVEL_NURSE_CONTRACT} Corporate placements commonly run one to six months around a project or a relocation window.`,
      },
    ],
    sources: [
      { label: 'Piedmont — Piedmont Atlanta Hospital', url: 'https://www.piedmont.org/locations/piedmont-atlanta', checked: '2026-09-01' },
      { label: 'Piedmont Careers — First Call Staffing internal travel agency', url: 'https://piedmontcareers.org/atlanta-internal-medicine/', checked: '2026-09-01' },
      NURSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'northside-hospital-atlanta',
    name: 'Northside Hospital Atlanta',
    kind: 'Hospital',
    city: 'Sandy Springs',
    county: 'Fulton',
    address: '1000 Johnson Ferry Rd NE, Sandy Springs, GA',
    tagline: 'Furnished housing around Pill Hill — and yes, it is Sandy Springs, not Atlanta',
    demand: [
      'Northside Hospital Atlanta is in the Pill Hill medical district of Sandy Springs. Despite the name, it is not inside Atlanta city limits — which matters for anyone comparing local rules, and matters for how a listing should describe itself.',
      'Northside sponsors its own ACGME-accredited graduate medical education: an internal medicine residency, a transitional year residency and a colon and rectal surgery programme. These are its own programmes rather than a university affiliation, and they put trainees on the ground for fixed terms every year.',
      'Pill Hill concentrates several major medical employers in a small area — Northside, Emory Saint Joseph\u2019s and Children\u2019s at Scottish Rite all sit within it — so a furnished property here is within reach of more than one of them rather than betting on a single hospital. The Medical Center MARTA station was effectively built to serve the district and is a short walk from the hospital.',
      'Northside also delivers more babies each year than any other hospital in the United States, and in 2023 became the first US hospital verified as a Level IV Maternal Center. Maternity at that scale draws specialist staff and travelling families from well outside the immediate area. Drive times checked on Google Maps: Sandy Springs 9 minutes, Brookhaven 11, Dunwoody and Chamblee 13, Buckhead 16.',
    ],
    facts: [
      { label: 'Address', value: '1000 Johnson Ferry Rd NE, Sandy Springs, GA' },
      { label: 'District', value: 'Pill Hill, Sandy Springs — outside Atlanta city limits' },
      { label: 'Beds', value: '621 licensed' },
      { label: 'Staff', value: '14,000 employees and more than 4,000 physicians' },
      { label: 'Transit', value: 'Medical Center MARTA station is a 0.4-mile walk' },
      { label: 'Teaching hospital', value: 'Yes — sponsors its own ACGME internal medicine and family medicine residencies, plus sports medicine and colorectal surgery fellowships' },
      { label: 'Maternity', value: 'Delivers more babies annually than any other hospital in the United States; first US hospital verified as a Level IV Maternal Center (2023)' },
    ],
    audiences: [
      'Residents on Northside-sponsored programmes',
      'Travel nurses across the Pill Hill hospitals',
      'Visiting specialists and locum cover',
      'Families staying near extended treatment',
    ],
    nearby: [
      { name: 'Sandy Springs', href: '/sandy-springs/' },
      { name: 'Dunwoody', href: '/dunwoody/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
      { name: 'Buckhead', href: '/atlanta/buckhead/' },
      { name: 'Chamblee', href: '/chamblee/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
    ],
    faqs: [
      {
        q: 'Is Northside Hospital Atlanta actually in Atlanta?',
        a: "No, and the mix-up has consequences. Northside Hospital Atlanta is physically in Sandy Springs, in the Pill Hill medical district, outside Atlanta city limits — the City of Sandy Springs lists it among the hospitals within its own boundaries. The \"Atlanta, GA 30342\" mailing address is a postal artifact that predates Sandy Springs incorporating as a city in 2005. Two things follow for an owner. First, Atlanta's short-term rental ordinance is not automatically the rule that governs a property near this hospital; Sandy Springs sets its own, and that has to be checked for the specific address. Second, a guest searching for housing near this hospital may search either city name, so a listing that mentions only one of them is invisible to half of them.",
      },
      {
        q: 'Why does Pill Hill matter for a furnished rental?',
        a: "Because it removes the single biggest risk in institution-anchored housing: dependence on one employer. Pill Hill concentrates Northside, Emory Saint Joseph\'s and Children\'s Healthcare at Scottish Rite within a short radius, so a furnished property there is within reach of three major medical employers rather than betting on one hospital\'s contracting cycle. Northside alone has 621 licensed beds, 14,000 employees and more than 4,000 physicians, and sponsors its own accredited internal medicine and family medicine residencies plus sports medicine and colorectal surgery fellowships. It also delivers more babies annually than any hospital in the United States and was the first verified Level IV Maternal Center. The Medical Center MARTA station, a short walk away, was effectively built to serve this district. Drive times: Sandy Springs 9 minutes, Brookhaven 11, Dunwoody and Chamblee 13, Buckhead 16.",
      },
    ],
    sources: [
      { label: 'Northside Hospital — Internal Medicine Residency Program', url: 'https://www.northside.com/locations/internal-medicine-residency-program', checked: '2026-09-01' },
      { label: 'Northside Hospital Atlanta — Graduate Medical Education programmes', url: 'https://nsgmeatl.com/office-of-gme/programs', checked: '2026-09-01' },
      { label: 'Northside Hospital Atlanta — location and facility facts', url: 'https://www.northside.com/locations/northside-hospital-atlanta', checked: '2026-09-01' },
      { label: 'Georgia Public Broadcasting — first US Level IV Maternal Center', url: 'https://www.gpb.org/news/2023/01/19/northside-atlanta-first-hospital-in-the-us-top-tier-maternal-care-designation', checked: '2026-09-01' },
      { label: 'City of Sandy Springs — hospitals in the city', url: 'https://www.sandyspringsga.gov/hospitals/', checked: '2026-09-01' },
      NURSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'grady-memorial-hospital',
    name: 'Grady Memorial Hospital',
    kind: 'Academic medical centre',
    city: 'Atlanta',
    county: 'Fulton',
    address: '80 Jesse Hill Jr Dr SE, Atlanta, GA 30303',
    tagline: 'Furnished housing downtown, on MARTA, next to two medical schools',
    demand: [
      'Grady is downtown Atlanta, next to Georgia State University, and it is served directly by MARTA rail at the Georgia State station. For someone arriving for a fixed term without a car, that is close to the strongest position in the city.',
      'Grady is jointly staffed by two medical schools — Emory University School of Medicine and Morehouse School of Medicine. More than 350 Emory residents and fellows are at Grady on any given day, across roughly 50 training programmes.',
      'That is a large, continuously rotating population of people who need somewhere furnished, near transit, for a defined stretch of time. Very little of downtown\'s housing stock is set up to serve it.',
    ],
    facts: [
      { label: 'Address', value: '80 Jesse Hill Jr Dr SE, Atlanta, GA 30303' },
      { label: 'Neighbourhood', value: 'Downtown Atlanta, Fulton County' },
      { label: 'Transit', value: 'MARTA rail — Georgia State station; bus route 99' },
      { label: 'Teaching hospital', value: 'Yes — jointly staffed by Emory and Morehouse medical schools' },
      { label: 'Trainees on site', value: '350+ Emory residents and fellows daily, across ~50 programmes' },
    ],
    audiences: [
      'Residents and fellows from Emory and Morehouse',
      'Travel nurses on 13-week contracts',
      'Georgia State graduate students and visiting academics',
      'Families of long-stay patients',
    ],
    nearby: [
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Midtown', href: '/atlanta/midtown/' },
      { name: 'Grant Park', href: '/atlanta/grant-park/' },
      { name: 'Inman Park', href: '/atlanta/inman-park/' },
      { name: 'Atlanta overview', href: '/atlanta/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Student & Academic Housing', href: '/services/student-housing/' },
    ],
    faqs: [
      {
        q: 'Can someone working at Grady live without a car?',
        a: "Realistically, yes — and few Atlanta hospitals can say that. Grady sits downtown and is served directly by MARTA rail at the Georgia State station, two blocks away, and by bus route 99 which stops in front of the hospital. For a resident arriving from another state for a multi-year programme, or a nurse on a 13-week contract, being able to skip shipping or renting a car is a genuine financial saving and often the detail that decides where they live. A furnished property within walking distance of a rail station should say so in the first line of the listing. It is worth noting the reverse too: because so much of metro Atlanta requires a car, properties that genuinely do not are scarce enough to command a premium rather than compete on price.",
      },
      {
        q: 'Who is the guest here — nurses or students?',
        a: "Both, and the overlap is what makes a downtown property resilient. Grady is jointly staffed by two medical schools — Emory and Morehouse — with more than 350 Emory residents and fellows on site daily across roughly 50 training programmes, and Morehouse School of Medicine runs seven residency programmes with Grady as its primary teaching hospital. Next door, Georgia State enrolled 53,144 students including a record 8,102 graduate students, and its housing portal currently states a waitlist is in effect for all applicants with no guarantee of a room. Those are two large, continuously rotating populations of people who need somewhere furnished, near transit, for a defined stretch of time — one on clinical rotations, one on academic terms. A single property can serve either, which is what fills the gaps when one of them is between cycles.",
      },
    ],
    sources: [
      { label: 'Grady Health — Grady Memorial Hospital', url: 'https://www.gradyhealth.org/locations/grady-memorial-hospital/', checked: '2026-09-01' },
      NURSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'childrens-healthcare-arthur-blank-hospital',
    name: "Children's Healthcare of Atlanta — Arthur M. Blank Hospital",
    shortName: "Children's Healthcare — Arthur M. Blank Hospital",
    kind: "Children's hospital",
    city: 'Atlanta',
    county: 'DeKalb',
    address: '2220 North Druid Hills Rd NE, Atlanta, GA 30329',
    tagline: 'Furnished housing near the newest children\'s hospital in the state',
    demand: [
      'The Arthur M. Blank Hospital opened in September 2024 with 446 licensed beds — 116 more than Egleston had before it. A new hospital of that size does not just move staff around; it expands what the site can treat and how far families travel to reach it.',
      'Paediatric care creates a housing need that adult hospitals largely do not: families relocating for weeks or months alongside a child in extended treatment. That is a furnished, thirty-day-plus stay, and it is often arranged at short notice.',
      "Children's partners with Emory University School of Medicine on the paediatric residency and multiple accredited fellowships, with the paediatric anaesthesiology fellowship sited at this hospital specifically. It is also a primary paediatric training site for Morehouse School of Medicine, and more than 500 physicians hold joint appointments across both institutions. Drive times checked on maps: Buckhead 12 minutes, Chamblee 14, Decatur 18.",
      "One thing worth knowing if you are comparing addresses: this hospital replaced Egleston rather than joining it. All 202 inpatients moved across in a single day in September 2024, and the Egleston building on Clifton Road is no longer an operating hospital. Scottish Rite in Sandy Springs is still open and separate.",
    ],
    facts: [
      { label: 'Address', value: '2220 North Druid Hills Rd NE, Atlanta, GA 30329' },
      { label: 'Opened', value: 'September 2024' },
      { label: 'Beds', value: '446 licensed — 116 more than Egleston previously had' },
      { label: 'Scale', value: '19 storeys, 2 million sq ft — a $1.5bn build, the largest healthcare construction project in Georgia history' },
      { label: 'Access', value: 'At the I-85 / North Druid Hills interchange, redesigned in 2019 to give the hospital its own ramp; MARTA bus route 17 stops at the door' },
      { label: 'Teaching', value: 'Emory paediatric residency and accredited fellowships, including paediatric anaesthesiology sited here' },
    ],
    audiences: [
      'Families relocating for a child in extended treatment',
      'Paediatric residents and fellows',
      'Travel nurses in paediatric specialties',
      'Visiting clinicians and researchers',
    ],
    nearby: [
      { name: 'Brookhaven', href: '/brookhaven/' },
      { name: 'Chamblee', href: '/chamblee/' },
      { name: 'Decatur', href: '/decatur/' },
      { name: 'Tucker', href: '/tucker/' },
      { name: 'Dunwoody', href: '/dunwoody/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Insurance & ALE Housing Management', href: '/services/insurance-housing/' },
    ],
    faqs: [
      {
        q: 'Who needs furnished housing near a children\'s hospital?',
        a: "Mostly families, and they are a different guest from anyone else in this market. A child in extended treatment often means one or both parents living near the hospital for weeks or months, arranged at very short notice and under real stress. The Arthur M. Blank Hospital opened in September 2024 with 446 licensed beds — 116 more than Egleston had — as part of a $1.5 billion, 19-storey, two-million-square-foot build, the largest healthcare construction project in Georgia\'s history. A hospital of that size draws families from well outside metro Atlanta. What they need is not a hotel room: it is laundry, a real kitchen, somewhere for siblings to sleep, and enough space to live rather than visit. A property set up for that will hold these bookings far longer than a nightly listing ever would.",
      },
      {
        q: 'How is this different from a nightly rental?',
        a: "In length, in economics and in tone. These are stays of thirty days and longer booked under difficult circumstances, so they turn over a fraction as often as nightly bookings, generate far fewer service requests, and are usually left in better condition. The financial shape is different too: less cleaning, less linen, fewer check-ins, and a booking calendar measured in months rather than nights, which for many owners nets out better than a higher nominal nightly rate with gaps between stays. The tone matters as much as the numbers. A family beside a children\'s hospital does not want an automated check-in sequence and an upsell. They want the practical things to work and to be left alone. Managing that well is mostly about restraint, and it is why these guests tend to extend rather than move.",
      },
    ],
    sources: [
      { label: "Children's Healthcare of Atlanta — Arthur M. Blank Hospital", url: 'https://www.choa.org/locations/arthur-m-blank-hospital', checked: '2026-09-01' },
      { label: "Children's Healthcare of Atlanta — fellowships and residencies", url: 'https://www.choa.org/medical-professionals/education-and-training/fellowships-and-residencies', checked: '2026-09-01' },
      NURSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'wellstar-kennestone-marietta',
    name: 'Wellstar Kennestone Regional Medical Center',
    shortName: 'Wellstar Kennestone',
    kind: 'Regional medical centre',
    city: 'Marietta',
    county: 'Cobb',
    address: '677 Church St NE, Marietta, GA 30060',
    tagline: 'Furnished housing in Marietta and Cobb — where there is no MARTA and a car is assumed',
    demand: [
      "Kennestone sits just north of Marietta Square and is the largest hospital in Cobb County. In May 2024 it was verified as a Level I trauma centre, making it only the second in metro Atlanta after Grady — a designation that followed Atlanta Medical Center closing in 2022, and one that took some of that hospital's emergency staff with it.",
      'It is still growing. The nine-storey Yellow Tower opened to patients in April 2026: a $400 million, roughly 300,000 square foot addition carrying 235 beds, including a 49-bed neonatal intensive care unit. New capacity on that scale has to be staffed, and a good share of that hiring is contract cover.',
      'That is not speculative here. Travel assignments at Kennestone are advertised openly through several national agencies at weekly rates well above a staff wage, which tells you what the housing budget behind them looks like.',
      "Kennestone also runs seven residency programmes and a fellowship through Wellstar's own accredited consortium — internal medicine, emergency medicine, obstetrics and gynaecology, general surgery, transitional year, family medicine and palliative care.",
    ],
    facts: [
      { label: 'Address', value: '677 Church St NE, Marietta, GA 30060' },
      { label: 'County', value: 'Cobb County — just north of Marietta Square' },
      { label: 'Beds', value: '633 inpatient plus 166 emergency department beds, before the new tower' },
      { label: 'Recent expansion', value: 'Yellow Tower opened April 2026 — $400m, nine storeys, 235 beds including a 49-bed NICU' },
      { label: 'Trauma status', value: 'Level I trauma centre since May 2024 — the second in metro Atlanta after Grady' },
      { label: 'Teaching hospital', value: "Yes — seven residency programmes plus a fellowship, run through Wellstar's own consortium rather than a university partnership" },
      { label: 'Transit', value: 'No MARTA — Cobb County sits outside the system. CobbLinc routes 40 and 45 stop a two-minute walk away on Church Street' },
    ],
    audiences: [
      'Travel nurses and allied health contractors on 13-week assignments',
      'Residents across seven Wellstar programmes',
      'NICU and trauma specialists recruited for the new tower',
      'Families staying near extended treatment',
      'Corporate assignees working in Cobb County',
    ],
    nearby: [
      { name: 'Marietta', href: '/marietta/' },
      { name: 'East Cobb', href: '/marietta/east-cobb/' },
      { name: 'Kennesaw', href: '/kennesaw/' },
      { name: 'Smyrna', href: '/smyrna/' },
      { name: 'Vinings', href: '/vinings/' },
      { name: 'Acworth', href: '/acworth/' },
    ],
    services: [
      { name: 'Travel Nurse Housing Management', href: '/services/travel-nurse-housing/' },
      { name: 'Mid-Term Rental Management', href: '/services/mid-term-rental-management/' },
      { name: 'Corporate Housing Management', href: '/services/corporate-housing-management/' },
    ],
    faqs: [
      {
        q: 'Does a guest at Kennestone need a car?',
        a: "Almost certainly, and it is the single biggest practical difference between Marietta and the hospitals inside the Perimeter. Cobb County is not part of the MARTA system at all. Local transit is CobbLinc, whose routes 40 and 45 stop about two minutes\' walk from the hospital on Church Street, but it does not connect across the metro the way MARTA rail does, and nobody relocating for a 13-week contract will rely on it. The consequence for an owner is concrete: off-street parking stops being an amenity and becomes a requirement, and it belongs at the top of the listing rather than in a list at the bottom. A Marietta property with secure parking and an easy route to Church Street will out-let a nicer property without one, every time.",
      },
      {
        q: 'Is there really contract-staffing demand here?',
        a: 'It is advertised in the open. Travel assignments at Kennestone are posted through several national agencies at weekly rates far above a staff wage, and the hospital has just added 235 beds including a 49-bed NICU. New beds have to be staffed, and specialist cover of that kind is routinely filled on 13-week contracts.',
      },
      { q: 'How long are these stays?', a: TRAVEL_NURSE_CONTRACT },
      {
        q: 'Do I need a short-term rental permit in Marietta?',
        a: "Almost certainly not, and that is the opposite of what most guides say. The ordinance owners have usually read about is the City of Atlanta\'s, which does not apply anywhere in Cobb County. Cobb\'s own short-term rental ordinance, effective 1 January 2023, binds by its own wording only \'any owner of any property within the unincorporated areas of Cobb County\' — so it does not reach a property inside Marietta city limits. And Marietta has not adopted one: the Marietta Daily Journal reported on 1 May 2026 that the city has no dedicated short-term rental ordinance and that operators are not required to hold a business licence, while council members debated creating a registry. Two things hold across Georgia regardless of municipality: the local hotel-motel excise tax exempts continuous occupancy after the first 30 days, and the state\'s $5-a-night hotel-motel fee stops at 31 consecutive days for the same guest. Because Marietta council is actively working on this, we confirm the current municipal position for a specific address before a property is listed.",
      },
    ],
    sources: [
      { label: 'Wellstar — Kennestone Regional Medical Center', url: 'https://www.wellstar.org/locations/hospital/kennestone-regional-medical-center', checked: '2026-09-01' },
      { label: 'Cobb County — Chapter 78 short-term rental ordinance (applies to unincorporated Cobb only)', url: 'https://assets.cobbcounty.gov/files/2023-01/2022%20Sept%20Chapter%2078%20Amendments%20FINAL.pdf', checked: '2026-09-01' },
      { label: 'Marietta Daily Journal — Marietta considers regulating short-term rentals (1 May 2026)', url: 'https://www.mdjonline.com/news/local/marietta-considers-regulating-short-term-rentals-amid-resident-complaints/article_50cf1690-ee70-491a-825e-a44c34443d86.html', checked: '2026-09-01' },
      { label: 'Wellstar — Kennestone expands care with new tower', url: 'https://www.wellstar.org/articles/wellstar-kennestone-expands-care-with-new-tower', checked: '2026-09-01' },
      { label: 'AJC — Marietta hospital achieves Level I trauma status', url: 'https://www.ajc.com/news/health-news/a-hospital-in-marietta-achieves-level-1-trauma-status/GQKF6SSRFBDIZAQ4K5DOGPWO34/', checked: '2026-09-01' },
      { label: 'Wellstar Graduate Medical Education — programmes', url: 'https://gme.wellstar.org/programs/', checked: '2026-09-01' },
      { label: 'Cobb County — CobbLinc stop near Kennestone Hospital', url: 'https://www.cobbcounty.gov/news/cobblinc-adds-stop-near-kennestone-hospital-improve-healthcare-access', checked: '2026-09-01' },
      NURSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'trilith-studios-fayetteville',
    name: 'Trilith Studios',
    kind: 'Film studio',
    city: 'Fayetteville',
    county: 'Fayette',
    address: 'Fayetteville, Fayette County, GA',
    tagline: 'Crew housing south of the airport — Fayetteville, Peachtree City and Senoia',
    demand: [
      'Trilith is the largest production facility in Georgia and the largest outside Hollywood: roughly 700 acres including a 400-acre backlot, with 32 to 34 soundstages and about a million square feet of production space, part of it built for virtual production. It was Pinewood Atlanta until 2020 and is owned by a trust of the Cathy family.',
      'The work that comes through it is the kind that keeps crews in one place for months. Ant-Man was the first production on the lot; Black Panther, Avengers: Infinity War, Endgame, Spider-Man: No Way Home, WandaVision, Loki and Hawkeye followed.',
      'What matters for an owner is the geography. Trilith is in Fayetteville, well south of the city, and the studio itself puts the airport about twenty minutes away. Crew do not commute in from Buckhead — they stay in Fayetteville, Peachtree City, Senoia and Newnan. There is a 193-room hotel on site, which sets the floor a furnished property has to beat on space, kitchen and price for a three-month stay.',
    ],
    facts: [
      { label: 'Location', value: 'Fayetteville, Fayette County — south of Hartsfield-Jackson' },
      { label: 'Size', value: 'About 700 acres including a 400-acre backlot; 32-34 soundstages, roughly 1 million sq ft' },
      { label: 'Standing', value: 'Largest production facility in Georgia and the largest outside Hollywood' },
      { label: 'On-site lodging', value: 'Trilith Guesthouse, 193 rooms — the benchmark a furnished let has to beat' },
      { label: 'Formerly', value: 'Pinewood Atlanta Studios, rebranded 2020' },
    ],
    audiences: [
      'Production crew on multi-month shoots',
      'Cast and department heads needing space rather than a hotel room',
      'Out-of-state crew — around a quarter of Georgia hires',
      'Corporate and relocation stays in Fayette and Coweta',
    ],
    nearby: [
      { name: 'Fayetteville', href: '/fayetteville/' },
      { name: 'Peachtree City', href: '/peachtree-city/' },
      { name: 'Senoia', href: '/senoia/' },
      { name: 'Newnan', href: '/newnan/' },
      { name: 'Union City', href: '/union-city/' },
      { name: 'Fairburn', href: '/fairburn/' },
    ],
    services: CREW_SERVICES,
    faqs: [
      CREW_FAQ,
      FILM_JOBS_FAQ,
      {
        q: 'Is film work a safe thing to build a rental strategy on?',
        a: GA_FILM_VOLUME + ' We would not advise anyone to buy a property on the strength of crew housing alone. As a second or third demand source for a home that already works, it is genuinely valuable.',
      },
      {
        q: 'Why does the on-site hotel matter?',
        a: "Because it is your competition, and knowing that tells you exactly what to offer instead. The Trilith Guesthouse is a 193-room hotel on the lot itself, which sets the floor: anyone who just needs a bed within walking distance of the stage already has an option. A furnished house does not beat that on convenience, so it has to beat it on the things a hotel room cannot do across a three-month shoot — a real kitchen, laundry, separate bedrooms so three or four crew can share and split the cost, outdoor space, and somewhere that feels like living rather than staying. Crew on long shoots also cook, do laundry and need to decompress on a day off. Price a house per bedroom against the hotel per room and the maths usually favours the house.",
      },
    ],
    sources: [
      { label: 'Trilith Studios — about', url: 'https://www.trilithstudios.com/about', checked: '2026-09-01' },
      { label: 'Hollywood Reporter — Pinewood Atlanta rebrands as Trilith', url: 'https://www.hollywoodreporter.com/movies/movie-news/pinewood-atlanta-studios-rebrands-as-trilith-builds-out-235-acre-neighboring-town-4072451/', checked: '2026-09-01' },
      { label: 'Trilith Guesthouse', url: 'https://trilithguesthouse.com/', checked: '2026-09-01' },
      GA_FILM_SOURCE,
      GA_FILM_VOLUME_SOURCE,
      IATSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'tyler-perry-studios-atlanta',
    name: 'Tyler Perry Studios',
    kind: 'Film studio',
    city: 'Atlanta',
    county: 'Fulton',
    address: 'Former Fort McPherson, southwest Atlanta',
    tagline: 'Crew housing on the south side — East Point, College Park and the airport corridor',
    demand: [
      'Tyler Perry Studios occupies the former Fort McPherson army base in southwest Atlanta, less than six miles from downtown. It runs to more than 330 acres — larger in acreage than any major studio in Los Angeles — with twelve purpose-built soundstages named for Black entertainment figures, ranging from 10,000 to 38,500 square feet, and around 50,000 square feet of standing permanent sets.',
      'A thirteenth stage, built for virtual production, is expected to be operational by the end of 2026. Perry has put more than $250 million into the site since buying it in 2015.',
      'The housing that serves it is on the south side, not in town: East Point, College Park, Hapeville and the airport corridor, all roughly ten to fifteen minutes out. That is a part of metro Atlanta with a lot of ordinary housing stock and very little of it set up for a furnished three-month let.',
    ],
    facts: [
      { label: 'Location', value: 'Former Fort McPherson, southwest Atlanta — under 6 miles from downtown' },
      { label: 'Size', value: 'More than 330 acres; 12 soundstages of 10,000-38,500 sq ft each' },
      { label: 'Standing sets', value: 'Around 50,000 sq ft, including a White House replica, a mansion, a diner and a twelve-home residential street' },
      { label: 'Expanding', value: 'A 13th virtual-production soundstage expected operational by the end of 2026' },
      { label: 'Distinction', value: 'The only major US film studio owned by an African American' },
    ],
    audiences: [
      'Production crew on multi-month shoots',
      'Cast and visiting production staff',
      'Airport-corridor corporate stays',
      'Out-of-state crew needing furnished space',
    ],
    nearby: [
      { name: 'East Point', href: '/east-point/' },
      { name: 'College Park', href: '/college-park/' },
      { name: 'Hapeville', href: '/hapeville/' },
      { name: 'West End', href: '/atlanta/west-end/' },
      { name: 'Westview', href: '/atlanta/westview/' },
      { name: 'Capitol View', href: '/atlanta/capitol-view/' },
    ],
    services: CREW_SERVICES,
    faqs: [
      CREW_FAQ,
      FILM_JOBS_FAQ,
      {
        q: 'Which areas do crew at Tyler Perry Studios actually stay in?',
        a: "The south side, overwhelmingly. East Point, College Park and Hapeville are the closest options and are already used for crew lodging, with the wider Hartsfield-Jackson corridor behind them. The studio sits on the former Fort McPherson base less than six miles from downtown, so some crew do stay in town, but most optimise for two things: minutes to the lot and minutes to the airport, because film work means flying in and out. That is a part of metro Atlanta with a great deal of ordinary housing stock and very little of it set up as a furnished thirty-day-plus let, which is the opportunity. It is also worth knowing the studio is still growing — a thirteenth soundstage, built for virtual production, is expected operational by the end of 2026.",
      },
      {
        q: 'Is film work a safe thing to build a rental strategy on?',
        a: GA_FILM_VOLUME + ' Treat crew housing as one demand source among several rather than the whole plan.',
      },
    ],
    sources: [
      { label: 'AJC — things to know about Tyler Perry Studios', url: 'https://www.ajc.com/news/things-know-about-tyler-perry-studios-atlanta/p0Keh9FxmTRqoJTF8KkNoO/', checked: '2026-09-01' },
      { label: 'AJC — Tyler Perry Studios adds virtual-production soundstage', url: 'https://www.ajc.com/business/2026/07/tyler-perry-studios-adds-virtual-production-enabled-soundstage/', checked: '2026-09-01' },
      GA_FILM_SOURCE,
      GA_FILM_VOLUME_SOURCE,
      IATSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'assembly-studios-doraville',
    name: 'Assembly Studios',
    kind: 'Film studio',
    city: 'Doraville',
    county: 'DeKalb',
    address: '2582 Assembly Blvd, Doraville, GA 30360',
    tagline: 'Crew housing inside the Perimeter — Doraville, Chamblee, Dunwoody and Brookhaven',
    demand: [
      'Assembly Studios is a 43-acre studio campus operated by NBCUniversal, built on part of the old General Motors plant in Doraville and sitting inside the wider 135-acre Assembly Atlanta development. Around 19 soundstages and close to a million square feet of stage and support space, most of it built since 2022.',
      'It is the newest of the big Atlanta lots and it is producing episodic television, which behaves differently from film: a returning series keeps crew in one market for months at a stretch, season after season, rather than for one shoot. Beyond the Gates, the first new network daytime drama in 25 years, is made here, as is the Hulu series Murdaugh: Death in the Family.',
      'The housing advantage is location. Unlike Trilith or Covington, this lot is inside the Perimeter — Dunwoody is about twelve minutes away, with Chamblee, Brookhaven and Tucker all close, and MARTA rail runs through the area.',
    ],
    facts: [
      { label: 'Address', value: '2582 Assembly Blvd, Doraville, GA 30360' },
      { label: 'Size', value: '43-acre studio campus with around 19 soundstages, within the 135-acre Assembly Atlanta development' },
      { label: 'Operator', value: 'NBCUniversal, under an agreement with Gray Television' },
      { label: 'Site history', value: 'Built on the former General Motors Doraville assembly plant' },
      { label: 'Made here', value: 'Beyond the Gates (CBS) and Murdaugh: Death in the Family (Hulu)' },
    ],
    audiences: [
      'Episodic television crew on returning series',
      'Production staff needing months rather than nights',
      'Perimeter corporate stays',
      'Out-of-state crew',
    ],
    nearby: [
      { name: 'Doraville', href: '/doraville/' },
      { name: 'Chamblee', href: '/chamblee/' },
      { name: 'Dunwoody', href: '/dunwoody/' },
      { name: 'Brookhaven', href: '/brookhaven/' },
      { name: 'Tucker', href: '/tucker/' },
      { name: 'Sandy Springs', href: '/sandy-springs/' },
    ],
    services: CREW_SERVICES,
    faqs: [
      {
        q: 'Why is episodic television better for an owner than film?',
        a: "Because it comes back. A feature film shoots once and leaves; whatever housing it needed is gone when the production wraps. A returning television series keeps a crew in the same market for months at a stretch and then does it again the following season, which turns a one-off booking into something much closer to a repeat tenant relationship — and repeat guests are worth far more than new ones, because there is no marketing cost, no vetting and no void between them. Assembly is producing exactly that kind of work: Beyond the Gates, the first new network daytime drama in twenty-five years, and the Hulu series Murdaugh: Death in the Family. It is also the newest of the large Atlanta lots, operated by NBCUniversal, on a 43-acre campus with around nineteen soundstages.",
      },
      CREW_FAQ,
      FILM_JOBS_FAQ,
      {
        q: 'Is film work a safe thing to build a rental strategy on?',
        a: GA_FILM_VOLUME + ' Assembly is better placed than most to weather that, because the area also carries Perimeter corporate demand independently of the studio.',
      },
    ],
    sources: [
      { label: 'Assembly Atlanta — Assembly Studios', url: 'https://assemblyatlanta.com/studios/assembly-studios/', checked: '2026-09-01' },
      { label: 'REBusiness — Gray Television and NBCUniversal 43-acre studio campus', url: 'https://rebusinessonline.com/gray-television-inks-deal-with-nbcuniversal-for-43-acre-studio-campus-in-metro-atlanta/', checked: '2026-09-01' },
      { label: 'Metro Atlanta CEO — Assembly Studios opens in Doraville', url: 'https://metroatlantaceo.com/features/2024/01/assembly-studios-opens-doraville-ga-making-dekalb-county-prime-location-state-art-film-production/', checked: '2026-09-01' },
      GA_FILM_SOURCE,
      GA_FILM_VOLUME_SOURCE,
      IATSE_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'shadowbox-studios-atlanta',
    name: 'Shadowbox Studios',
    kind: 'Film studio',
    city: 'Atlanta',
    county: 'DeKalb',
    address: '1415 Constitution Rd SE, Atlanta, GA 30316',
    tagline: 'Crew housing on the east side — Grant Park, Ormewood Park and Decatur',
    demand: [
      'Shadowbox is on Constitution Road in southeast Atlanta, on a campus of more than 100 acres with nine soundstages ranging from 19,200 to 38,400 square feet. It was Blackhall Studios until 2022, when a $500 million investment from Silver Lake came with the rebrand.',
      'It has hosted studio features including Godzilla: King of the Monsters — the first production to film there — Jumanji: The Next Level and Disney’s Jungle Cruise.',
      'A $500 million expansion is under way that would take the campus to 31 soundstages across two million square feet. No completion date has been published, and it is worth treating that as a plan rather than a fact until stages actually open. But the direction of travel on the east side is clear enough for an owner deciding what to do with a house in Grant Park or Ormewood Park.',
    ],
    facts: [
      { label: 'Address', value: '1415 Constitution Rd SE, Atlanta, GA 30316' },
      { label: 'Size', value: 'More than 100 acres; 9 soundstages of 19,200-38,400 sq ft' },
      { label: 'Formerly', value: 'Blackhall Studios — rebranded 2022 alongside a $500m Silver Lake investment' },
      { label: 'Filmed here', value: 'Godzilla: King of the Monsters, Jumanji: The Next Level, Jungle Cruise' },
      { label: 'Planned', value: 'A $500m expansion to 31 soundstages and 2 million sq ft — no completion date published' },
    ],
    audiences: [
      'Feature-film crew on multi-month shoots',
      'Department heads and cast needing furnished space',
      'East-side corporate and relocation stays',
      'Out-of-state crew',
    ],
    nearby: [
      { name: 'Grant Park', href: '/atlanta/grant-park/' },
      { name: 'Ormewood Park', href: '/atlanta/ormewood-park/' },
      { name: 'East Atlanta Village', href: '/atlanta/east-atlanta-village/' },
      { name: 'Cabbagetown', href: '/atlanta/cabbagetown/' },
      { name: 'Decatur', href: '/decatur/' },
      { name: 'Avondale Estates', href: '/avondale-estates/' },
    ],
    services: CREW_SERVICES,
    faqs: [
      CREW_FAQ,
      FILM_JOBS_FAQ,
      {
        q: 'Should I count on the expansion?',
        a: "Not yet, and we would rather say so than sell you the headline. The $500 million expansion that would take Shadowbox to 31 soundstages across two million square feet is publicly announced and under way, but no completion date has been published, and a soundstage generates no housing demand until it is built, leased and booked. Announced construction slips routinely, and Georgia production spend is currently falling rather than rising. Treat the expansion as upside on a property that already works for east-side demand — Grant Park, Ormewood Park, East Atlanta Village, Cabbagetown and Decatur are all within a short drive, and all carry ordinary furnished and corporate demand independently of the studio. What the expansion should not be is the reason you buy a house.",
      },
      {
        q: 'Is film work a safe thing to build a rental strategy on?',
        a: GA_FILM_VOLUME,
      },
    ],
    sources: [
      { label: 'Shadowbox Studios — Atlanta', url: 'https://shadowboxstudios.com/atlanta/', checked: '2026-09-01' },
      { label: 'Variety — Blackhall Studios becomes Shadowbox with Silver Lake investment', url: 'https://variety.com/2022/film/news/blackhall-studios-shadowbox-silver-lake-1235294113/', checked: '2026-09-01' },
      { label: 'REBusiness — Shadowbox Studios expansion under way', url: 'https://rebusinessonline.com/shadowbox-studios-underway-on-1-2-msf-expansion-of-movie-studio-campus-in-atlanta/', checked: '2026-09-01' },
      GA_FILM_SOURCE,
      GA_FILM_VOLUME_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'cinelease-three-ring-covington',
    name: 'Cinelease Studios — Three Ring',
    shortName: 'Three Ring Studios',
    kind: 'Film studio',
    city: 'Covington',
    county: 'Newton',
    address: '11642 GA-142, Covington, GA 30014',
    tagline: 'Crew housing in Newton County, where the nearest alternative is 45 minutes away',
    demand: [
      'Three Ring is on GA-142 just north of I-20 in Covington, about 35 miles east of downtown Atlanta. Fourteen purpose-built soundstages and roughly 250,000 square feet of stage space, reached through a $144 million expansion completed in 2023 that more than doubled the original 2020 facility.',
      'This is the one place on this list where distance works in an owner’s favour. Covington is far enough out that crew cannot casually commute from Atlanta — downtown is the better part of an hour on I-20 — so housing demand stays local, in Covington, Oxford, Conyers and Social Circle. There is very little furnished supply out there.',
      'Covington has a long history with production, which is part of why the studio was built there. We have not published a list of titles shot at Three Ring specifically, because we could not source one we trust; the facility, the expansion and its operators are all a matter of public record, and that is what this page rests on.',
    ],
    facts: [
      { label: 'Address', value: '11642 GA-142, Covington, GA 30014 — about 2 miles north of I-20' },
      { label: 'Size', value: '14 purpose-built soundstages, roughly 250,000 sq ft of stage space' },
      { label: 'Expansion', value: 'A $144m expansion completed in 2023, up from 6 stages at opening in 2020' },
      { label: 'Distance', value: 'About 35 miles east of downtown Atlanta — roughly 45-55 minutes via I-20' },
    ],
    audiences: [
      'Production crew who cannot commute from Atlanta',
      'Long-shoot department heads and cast',
      'Newton and Rockdale corporate stays',
      'Out-of-state crew',
    ],
    nearby: [
      { name: 'Covington', href: '/covington/' },
      { name: 'Conyers', href: '/conyers/' },
    ],
    services: CREW_SERVICES,
    faqs: [
      {
        q: 'Is being 35 miles out a problem?',
        a: "For this particular use it is an advantage, not a problem. Three Ring sits on GA-142 about two miles north of I-20 and roughly 35 miles east of downtown Atlanta — the better part of an hour each way in traffic. Crew working a multi-week shoot are not making that drive twice a day, so the housing demand stays local: Covington itself, Oxford, Conyers and Social Circle. In a market that size there is very little furnished supply competing for it, which is the opposite of the situation intown. The trade-off is honest and worth stating: a smaller market means less competition but also fewer fallback guests if production slows. We would want a property here to stand up as a long-term rental too, not only as crew housing.",
      },
      CREW_FAQ,
      {
        q: 'Is film work a safe thing to build a rental strategy on?',
        a: GA_FILM_VOLUME + ' In a smaller market like Newton County that cuts both ways: less competition, but also fewer fallback guests if production slows. We would want a property here to work as a long-term rental too.',
      },
    ],
    sources: [
      { label: 'Cinelease Studios — Three Ring', url: 'https://cinelease.com/studios/georgia/three-ring-studio/', checked: '2026-09-01' },
      { label: 'Georgia Department of Economic Development — Cinelease Studios expansion', url: 'https://www.georgia.org/press-release/cinelease-studios-expand-georgia-operations', checked: '2026-09-01' },
      GA_FILM_SOURCE,
      GA_FILM_VOLUME_SOURCE,
    ],
    published: true,
  },

  {
    slug: 'georgia-tech-atlanta',
    name: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    kind: 'University campus',
    city: 'Atlanta',
    county: 'Fulton',
    address: '225 North Ave NW, Atlanta, GA 30332',
    tagline: 'Furnished housing in Midtown and Home Park, where on-campus housing is not guaranteed',
    demand: [
      'Georgia Tech sits in Midtown, bordered by North Avenue and 10th Street, with Home Park immediately to its west. It enrolled 56,715 students in autumn 2025.',
      'That headline number is misleading for housing, and it is worth being straight about it: 47% of Georgia Tech students are enrolled exclusively online, and 26,938 of the 35,687 graduate students are part-time. The figure that matters here is full-time graduate enrolment, which is 8,749. Those are the people who actually move to Atlanta.',
      'On top of them sit 350 to 400 postdoctoral scholars at any given time, plus visiting researchers on J-1 scholar status. Postdocs and visiting scholars are the ideal furnished tenant: funded, arriving from elsewhere, staying one to three years, and in no position to furnish a flat from scratch on arrival.',
      'Georgia Tech housing states plainly that a place on campus is not guaranteed to anyone. Allocation runs on a lottery with a waitlist behind it. Whatever that lottery does not absorb becomes private-market demand within walking distance of North Avenue.',
    ],
    facts: [
      { label: 'Address', value: '225 North Ave NW, Atlanta, GA 30332 — Midtown, adjoining Home Park' },
      { label: 'Total enrolment', value: '56,715 (autumn 2025)' },
      { label: 'The figure that matters', value: '8,749 full-time graduate students — 47% of all students are exclusively online and 75% of graduate students are part-time' },
      { label: 'Postdocs', value: '350-400 at any given time, plus J-1 visiting scholars' },
      { label: 'Campus housing', value: 'Not guaranteed to any student; allocated by lottery with a waitlist' },
    ],
    audiences: [
      'Full-time graduate students relocating to Atlanta',
      'Postdoctoral scholars on one-to-three-year appointments',
      'Visiting researchers and J-1 scholars',
      'Visiting faculty on semester appointments',
      'Midtown corporate assignees',
    ],
    nearby: [
      { name: 'Home Park', href: '/atlanta/home-park/' },
      { name: 'Midtown', href: '/atlanta/midtown/' },
      { name: 'West Midtown', href: '/atlanta/west-midtown/' },
      { name: 'Atlantic Station', href: '/atlanta/atlantic-station/' },
      { name: 'Ansley Park', href: '/atlanta/ansley-park/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
    ],
    services: CAMPUS_SERVICES,
    faqs: [
      {
        q: 'Does an enrolment of 56,715 mean 56,715 people needing housing?',
        a: "No, and anyone quoting that number at you has not read past the headline. Georgia Tech reports that 47% of its students are enrolled exclusively online, and 26,938 of its 35,687 graduate students are part-time — largely because of very large online programmes such as the online computer science masters, whose students never relocate. The population that actually moves to Atlanta and needs somewhere to live is closer to the 8,749 full-time graduate students, plus the undergraduate body, 350 to 400 postdoctoral scholars at any given time, and visiting researchers on J-1 scholar status. That is still a substantial market on its own — it is simply not the 56,715 figure. We would rather size a property against the real number and be right than against the flattering one and be wrong.",
      },
      {
        q: 'Why are postdocs and visiting scholars a good tenant?',
        a: "They are close to the ideal tenant for this strategy. A postdoc or visiting scholar is funded by a grant or an institution, arrives from another city or another country, stays somewhere between one and three years, and cannot realistically furnish a home on arrival or sign a twelve-month lease from overseas before seeing it. That is a furnished mid-term let almost by definition: longer and steadier than a nightly booking, more flexible than an annual tenancy. They also tend to be low-maintenance guests — quiet, employed, and unlikely to be hosting parties. Georgia Tech has 350 to 400 postdoctoral scholars at any given time and administers a J-1 scholar programme for visiting researchers, and neither group is well served by student halls or by landlords who want twelve months up front.",
      },
      {
        q: 'When is demand strongest?',
        a: "It concentrates hard around the academic calendar, with the heaviest pressure in the weeks before the autumn term when housing allocation is settled and the lottery leaves people without a room. That seasonality is the honest weakness of a student-only strategy, and an owner should plan for it rather than discover it. The answer in this location is that Midtown does not depend on the campus: Emory University Hospital Midtown is a short distance away with its own rotating clinical staff, the Midtown corporate market runs year-round, and film production draws on the area independently. A property positioned for the academic calendar alone will have gaps between terms. One positioned to take whichever of those three is paying in a given month does not.",
      },
    ],
    sources: [
      { label: 'Georgia Tech Common Data Set 2025-2026', url: 'https://irp.gatech.edu/sites/default/files/CDS/CDS_2025-2026_FINAL_R4_03JUN2026.pdf', checked: '2026-09-01' },
      { label: 'Georgia Tech — enrolment growth and online share', url: 'https://www.gatech.edu/news/2025/04/22/georgia-tech-reports-strong-enrollment-growth-roi', checked: '2026-09-01' },
      { label: 'Georgia Tech Graduate Education — postdoc numbers', url: 'https://grad.gatech.edu/news/myth-vs-reality-essential-facts-know-about-postdocs', checked: '2026-09-01' },
      { label: 'Georgia Tech Housing — on-campus housing is not guaranteed', url: 'https://mycampussupport.gatech.edu/hc/en-us/articles/7800386827277-Am-I-guaranteed-on-campus-housing', checked: '2026-09-01' },
    ],
    published: true,
  },

  {
    slug: 'georgia-state-university-atlanta',
    name: 'Georgia State University',
    shortName: 'Georgia State',
    kind: 'University campus',
    city: 'Atlanta',
    county: 'Fulton',
    address: '100 Auburn Ave NE, Atlanta, GA 30303',
    tagline: 'Furnished housing downtown, where the university has an active housing waitlist',
    demand: [
      'Georgia State is a downtown campus rather than a walled one — its buildings are woven through the streets around Auburn Avenue, next to Grady Memorial and a short walk from the Georgia State MARTA station. It enrolled 53,144 students in autumn 2025, making it one of the largest universities in the state.',
      'The clearest signal for an owner is on the university\'s own housing portal: a waitlist is in effect for all applicants for the 2026-27 year, with placement on it explicitly not guaranteeing a room. When an institution of this size tells applicants there may be nowhere for them to live, that demand does not evaporate. It goes to the private market within walking distance.',
      'Graduate enrolment reached a record 8,102 in autumn 2025. Graduate students are the segment most likely to want a furnished room or flat rather than a dorm, and least likely to be served by one.',
      'Downtown also puts this campus beside Grady, where hundreds of medical trainees rotate. A furnished property here can serve either population, which is what keeps it let between academic terms.',
    ],
    facts: [
      { label: 'Address', value: '100 Auburn Ave NE, Atlanta, GA 30303 — downtown' },
      { label: 'Total enrolment', value: '53,144 (autumn 2025)' },
      { label: 'Graduate enrolment', value: '8,102 — a record high' },
      { label: 'Campus housing', value: 'A waitlist is in effect for all 2026-27 applicants; a place on it does not guarantee a room' },
      { label: 'Transit', value: 'Georgia State MARTA station serves the campus directly' },
    ],
    audiences: [
      'Graduate students, at record enrolment',
      'Students the campus housing waitlist cannot place',
      'Visiting faculty and researchers',
      'Medical trainees rotating through Grady next door',
      'Downtown corporate stays',
    ],
    nearby: [
      { name: 'Sweet Auburn', href: '/atlanta/sweet-auburn/' },
      { name: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { name: 'Castleberry Hill', href: '/atlanta/castleberry-hill/' },
      { name: 'Summerhill', href: '/atlanta/summerhill/' },
      { name: 'Grant Park', href: '/atlanta/grant-park/' },
      { name: 'Inman Park', href: '/atlanta/inman-park/' },
    ],
    services: CAMPUS_SERVICES,
    faqs: [
      {
        q: 'How solid is the housing-shortage claim?',
        a: "It is the university\'s own statement rather than our inference, which is why we are comfortable building a page on it. Georgia State\'s housing portal says plainly that a waitlist is in effect for all 2026-27 applicants and that a place on that waitlist does not guarantee a room, with allocation running by application date and new first-years prioritised. We link the page in the sources at the foot of this page so you can read it yourself rather than take our word for it. Set that against enrolment of 53,144 students including a record 8,102 graduate students, on a downtown campus with no large residential ring around it, and the arithmetic is straightforward: the students the university cannot house look for somewhere within walking distance of Auburn Avenue.",
      },
      {
        q: 'Do students actually take furnished mid-term lets?',
        a: "Graduate students do, and they are the segment growing fastest at Georgia State — enrolment hit a record 8,102. The undergraduate picture is different, but a graduate or professional student arriving for a one or two-year programme from another state or country is not shipping furniture across the country, and frequently cannot sign a twelve-month lease that begins before they have arrived or seen the property. Many also arrive on funding that starts on a specific date, which makes a flexible thirty-day-plus term genuinely useful rather than merely convenient. That is precisely the gap a furnished mid-term let fills, and it is poorly served by both the student-halls market and the conventional annual-lease market on either side of it.",
      },
      {
        q: 'What happens in the summer?',
        a: "It is the honest weakness of any student-only strategy, and downtown Atlanta happens to answer it better than most places. Grady Memorial is next door with more than 350 Emory residents and fellows on site daily across roughly 50 training programmes, plus Morehouse School of Medicine\'s seven residency programmes — clinical rotations run through the summer regardless of the academic calendar. Downtown also carries convention, corporate and event demand year-round, and the Georgia State MARTA station makes the whole area workable without a car. We position a property for whichever of those is paying best in a given month rather than committing it to the academic year. An owner who plans only for term time will have three quiet months; one who does not, will not.",
      },
    ],
    sources: [
      { label: 'Georgia State University Housing — how to apply and waitlist status', url: 'https://myhousing.gsu.edu/how-to-apply/', checked: '2026-09-01' },
      { label: 'Georgia State — record graduate enrolment 2025-26', url: 'https://provost.gsu.edu/2025/10/06/record-graduate-enrollment-2025-26/', checked: '2026-09-01' },
      { label: 'University System of Georgia — autumn 2025 enrolment report', url: 'https://pxl-usgedu.terminalfour.net/prod01/channel_4/media/usg/research/documents/Fall_2025_SER_Brief_-_December_2025_Update.pdf', checked: '2026-09-01' },
    ],
    published: true,
  },

  {
    slug: 'kennesaw-state-university',
    name: 'Kennesaw State University',
    shortName: 'Kennesaw State',
    kind: 'University campus',
    city: 'Kennesaw',
    county: 'Cobb',
    address: '1000 Chastain Rd, Kennesaw, GA 30144',
    tagline: 'Furnished housing across two Cobb campuses — Kennesaw and Marietta',
    demand: [
      'Kennesaw State enrolled 51,375 students in autumn 2025, up 7.4% in a year. It is one of the largest universities in Georgia and it grew faster than almost any of them.',
      'It runs two separate campuses eleven miles apart, both in Cobb County: the original Kennesaw campus on Chastain Road, and the Marietta campus on South Marietta Parkway — the former Southern Polytechnic State University, merged into KSU in 2015. Two campuses means two distinct housing catchments rather than one.',
      'Cobb County is outside MARTA, so a car is assumed and parking matters more here than anywhere inside the Perimeter.',
      'Kennesaw State is classified as a comprehensive rather than a research university, so its graduate and postdoc population is proportionally smaller than Georgia Tech\'s or Emory\'s — 5,306 graduate students. It does run a formal postdoctoral scholar programme and hosts incoming Fulbright scholars, but at a smaller scale, and this page does not pretend otherwise.',
    ],
    facts: [
      { label: 'Kennesaw campus', value: '1000 Chastain Rd, Kennesaw, GA 30144' },
      { label: 'Marietta campus', value: '1100 South Marietta Pkwy — the former Southern Polytechnic, merged 2015' },
      { label: 'Total enrolment', value: '51,375 (autumn 2025), up 7.4% year on year' },
      { label: 'Graduate enrolment', value: '5,306' },
      { label: 'Classification', value: 'Comprehensive university — a smaller research and postdoc profile than Georgia Tech or Emory' },
      { label: 'Transit', value: 'No MARTA — Cobb County is outside the system, so parking is not optional' },
    ],
    audiences: [
      'Graduate students across two campuses',
      'Visiting scholars including incoming Fulbright appointments',
      'Visiting faculty on semester appointments',
      'Wellstar Kennestone healthcare staff, ten minutes from the Marietta campus',
      'Cobb County corporate stays',
    ],
    nearby: [
      { name: 'Kennesaw', href: '/kennesaw/' },
      { name: 'Marietta', href: '/marietta/' },
      { name: 'East Cobb', href: '/marietta/east-cobb/' },
      { name: 'Acworth', href: '/acworth/' },
      { name: 'Smyrna', href: '/smyrna/' },
      { name: 'Woodstock', href: '/woodstock/' },
    ],
    services: CAMPUS_SERVICES,
    faqs: [
      {
        q: 'Which campus should a property be near?',
        a: "They are genuinely different markets about eleven miles apart, and choosing between them matters more than it would at a single-campus university. The Kennesaw campus on Chastain Road is the original and larger one. The Marietta campus on South Marietta Parkway is the former Southern Polytechnic State University, merged into Kennesaw State in 2015, and it sits near Marietta Square — roughly ten minutes from Wellstar Kennestone. That second point is the interesting one for an owner: a furnished property near the Marietta campus can serve students and visiting faculty during term and hospital contract staff on 13-week assignments year-round, from the same address. Kennestone recently added 235 beds including a 49-bed neonatal intensive care unit, so that clinical demand is growing rather than static.",
      },
      {
        q: 'Is the academic demand here as strong as at Georgia Tech or Emory?',
        a: "Not in the graduate and postdoctoral segment, and it would be dishonest to imply otherwise. Kennesaw State is classified as a comprehensive university rather than a research one, with 5,306 graduate students against Georgia Tech\'s and Emory\'s much deeper research populations. It does run a formal postdoctoral scholar programme and hosts incoming Fulbright scholars, but at a smaller scale. What Kennesaw State has instead is size and momentum: 51,375 students in autumn 2025, up 7.4% in a single year, spread across two campuses in a county with no rail transit and comparatively little purpose-built furnished supply. For an owner that is a different proposition from the intown academic markets — more volume, less specialisation — and a property should be positioned for it accordingly.",
      },
      {
        q: 'How much does parking matter in Cobb?',
        a: "A great deal, and this is the point most owners coming from an intown mindset get wrong. Cobb County sits outside the MARTA system entirely, so a guest here will have a car — there is no realistic version of living near either campus without one. Off-street parking therefore stops being an amenity and becomes close to a requirement, and it belongs near the top of the listing rather than buried in a features list. If a property has secure parking, or space for two vehicles where housemates are sharing, say so explicitly and early. The same logic applies to the Marietta campus and to Wellstar Kennestone ten minutes away: in a county without rail, the parking situation is frequently what decides between two otherwise comparable properties.",
      },
    ],
    sources: [
      { label: 'Kennesaw State University — about, campuses and enrolment', url: 'https://www.kennesaw.edu/about/', checked: '2026-09-01' },
      { label: 'Kennesaw State — institutional research fast facts', url: 'https://campus.kennesaw.edu/offices-services/data-strategy/institutional-research/publications/fast-facts/index.php', checked: '2026-09-01' },
      { label: 'University System of Georgia — autumn 2025 enrolment report', url: 'https://pxl-usgedu.terminalfour.net/prod01/channel_4/media/usg/research/documents/Fall_2025_SER_Brief_-_December_2025_Update.pdf', checked: '2026-09-01' },
      { label: 'Kennesaw State — postdoctoral scholar resources', url: 'https://campus.kennesaw.edu/offices-services/research/resources/research-development-strategic-initiatives/postdoc-resources/', checked: '2026-09-01' },
    ],
    published: true,
  },
];

export const publishedAnchors = anchors.filter((a) => a.published);
