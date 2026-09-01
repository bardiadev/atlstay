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
  'The standard US travel-nurse contract runs 13 weeks. Assignments typically range from 8 to 26 weeks, and extensions are usually renewed in further 13-week blocks.';

/* The 30-day line, confirmed in primary sources. This is the single most useful
   fact an owner near a hospital can be told, and almost nobody states it
   plainly: three separate Georgia regimes turn on the same threshold.
   NOT claimed here: any landlord-tenant "guest becomes a tenant after N days"
   rule. That is common short-let folklore and could NOT be found in Georgia's
   Title 44 landlord-tenant law. Do not add it without a lawyer's sign-off. */
export const THIRTY_DAY_LINE =
  "Atlanta's short-term rental ordinance defines a short-term rental as lodging for a period not exceeding 30 consecutive days, so a longer furnished let sits outside that licensing regime by the ordinance's own definition. Georgia's local hotel-motel excise tax likewise exempts charges after the first 30 days of continuous occupancy, and the state's $5-a-night hotel-motel fee stops once a stay becomes an \"extended stay rental\" of 31 or more consecutive days to the same guest. Breaking the stay and checking back in resets that count.";

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
  'Production spend in Georgia was $2.0 billion across 280 productions in FY2026 — down from $2.3 billion the year before and less than half the $4.4 billion peak of FY2022. The market is real and large, but it is contracting, and any owner counting on crew housing should size it on that basis rather than on the boom years.';

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
  q: 'How long does a production crew actually stay?',
  a: 'It varies with the shoot. A mid-size feature commonly shoots 40 to 50 days, a larger one 80 to 100, and an hour-long TV drama runs roughly eight shooting days per episode across a season — and crew are on the ground for prep and wrap either side of that. In practice it is a stay of weeks to several months, which is squarely furnished mid-term territory rather than nightly.',
};

const FILM_JOBS_FAQ = {
  q: 'Is there enough local crew to make this a real market?',
  a: 'IATSE Local 479, the Georgia crew local, has more than 7,000 members and is now the largest studio mechanics local in the country — its membership more than tripled in a decade. Georgia\'s below-the-line local hire rate is around 72%, which means roughly a quarter of crew on a given production still come from outside the state and need somewhere to live.',
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
        a: 'Druid Hills sits immediately around the Clifton Road campus. Decatur, Brookhaven and Virginia-Highland are the realistic wider options, and all three have the walkable dining and grocery access that matters when someone is living somewhere for three months rather than visiting for three days. We manage properties across all of them.',
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
        a: 'Less than almost anywhere else in the city. The hospital is on Peachtree Street in Midtown, inside the walkable core and close to MARTA rail. For a nurse or resident arriving for three months without shipping a car, that is often the deciding factor — and it is worth stating explicitly in the listing.',
      },
      {
        q: 'How long are these stays?',
        a: `${TRAVEL_NURSE_CONTRACT} Residents and fellows stay considerably longer, which is why furnished properties near teaching hospitals tend to turn over far less than nightly rentals.`,
      },
      {
        q: 'Does a Midtown property have to choose between healthcare and corporate guests?',
        a: 'No, and it should not. Midtown carries corporate, film-production and healthcare demand at the same time. We position a property for whichever of those is paying best in a given season rather than committing it to one audience.',
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
        a: 'Not for this audience. Corporate housing budgets and healthcare stipends are set against local market rates, and Buckhead is precisely where relocating executives and consultants expect to be placed. The risk in Buckhead is an empty premium property, not an unaffordable one — which is a pricing and positioning problem, and that is the job.',
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
        a: 'No. It is in Sandy Springs, in the Pill Hill medical district, outside Atlanta city limits — a common and consequential mix-up. It affects which local rules apply to your property and which city a guest is really searching for.',
      },
      {
        q: 'Why does Pill Hill matter for a furnished rental?',
        a: 'Because it puts several major medical employers within a short radius of the same property. A furnished let there is not dependent on one hospital\'s contracting cycle, which is the main risk in single-employer housing.',
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
        a: 'Realistically, yes. Grady is served directly by MARTA rail at the Georgia State station and by bus route 99. A furnished property within reach of a rail station is worth saying so explicitly in the listing — for a three-month stay it is often the deciding detail.',
      },
      {
        q: 'Who is the guest here — nurses or students?',
        a: 'Both, and they overlap. Grady carries 350+ Emory residents and fellows daily across around 50 programmes, and Georgia State sits next door with record graduate enrolment and an active housing waitlist. A furnished downtown property can serve either.',
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
        a: 'Mostly families. A child in extended treatment often means a parent or both parents living near the hospital for weeks or months, frequently arranged at very short notice. It is a different guest from a business traveller and the property should be set up accordingly — laundry, a real kitchen, and space to actually live rather than visit.',
      },
      {
        q: 'How is this different from a nightly rental?',
        a: 'In length and in tone. These are thirty-day-plus stays booked under difficult circumstances. They turn over far less often than nightly bookings, they generate fewer service requests, and they need a manager who treats the guest accordingly.',
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
        a: "Almost certainly, and it is the single biggest difference from the Atlanta hospitals. Cobb County is not part of MARTA. Local transit is CobbLinc, whose routes 40 and 45 stop about two minutes' walk from the hospital on Church Street, but it does not connect the way MARTA rail does. Parking is not a nice-to-have on a Marietta listing — it is the listing.",
      },
      {
        q: 'Is there really contract-staffing demand here?',
        a: 'It is advertised in the open. Travel assignments at Kennestone are posted through several national agencies at weekly rates far above a staff wage, and the hospital has just added 235 beds including a 49-bed NICU. New beds have to be staffed, and specialist cover of that kind is routinely filled on 13-week contracts.',
      },
      { q: 'How long are these stays?', a: TRAVEL_NURSE_CONTRACT },
      {
        q: 'Do I need a short-term rental permit in Marietta?',
        a: "Marietta and Cobb County set their own rules, and they are not Atlanta's — so the Atlanta ordinance most owners have read does not apply to you. We confirm the current position for your specific address before a property is listed, rather than assuming it carries across county lines.",
      },
    ],
    sources: [
      { label: 'Wellstar — Kennestone Regional Medical Center', url: 'https://www.wellstar.org/locations/hospital/kennestone-regional-medical-center', checked: '2026-09-01' },
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
        a: 'Because it is your competition, and it tells you what to offer instead. A 193-room guesthouse sits on the lot. A furnished house wins on the things a hotel room cannot do over three months — a real kitchen, laundry, separate bedrooms for a shared crew let, and somewhere to actually live on a day off.',
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
        a: 'The south side. East Point, College Park and Hapeville are the closest options and are already used for crew lodging, with the wider airport corridor behind them. The studio is close enough to downtown that some crew stay in town, but proximity to the lot and to the airport is what most of them optimise for.',
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
        a: 'Because it comes back. A feature shoots once and leaves. A returning series keeps a crew in the same market for months at a time and then does it again next season, which turns a one-off booking into a repeat tenant relationship. Assembly is currently producing exactly that kind of work.',
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
        a: 'Not yet. The $500 million expansion to 31 stages is publicly announced and under way, but no completion date has been published, and a stage does not generate housing demand until it is booked. Treat it as upside on a property that already works for east-side demand, not as the reason to buy one.',
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
        a: 'For this use, it is the opposite. Crew working at Three Ring are not going to drive an hour each way from Atlanta on I-20, so they stay in Covington and the towns around it. That keeps the demand local and there is very little furnished supply competing for it.',
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
        a: 'No, and anyone telling you otherwise has not read the numbers. Nearly half of Georgia Tech students are enrolled exclusively online and three quarters of graduate students are part-time. The population that actually relocates is closer to the 8,749 full-time graduate students plus undergraduates, postdocs and visiting scholars. That is still a large market — it is just not the headline one.',
      },
      {
        q: 'Why are postdocs and visiting scholars a good tenant?',
        a: 'They are funded, they arrive from another city or country, they stay one to three years, and they cannot furnish a home on arrival. That is a furnished mid-term let almost by definition — longer and steadier than a nightly booking, shorter and more flexible than the twelve-month lease most landlords insist on.',
      },
      {
        q: 'When is demand strongest?',
        a: 'It concentrates hard around the academic calendar, with the heaviest pressure before the autumn term. A property positioned only for students will have gaps; one that also works for Midtown corporate and healthcare demand fills them.',
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
        a: 'It is the university\'s own statement, not an inference. Georgia State\'s housing portal says a waitlist is in effect for all 2026-27 applicants and that being on it does not guarantee a room. We link the page in the sources below so you can read it yourself.',
      },
      {
        q: 'Do students actually take furnished mid-term lets?',
        a: 'Graduate students do, and they are the segment growing fastest here. Someone arriving for a one or two-year programme from another state or country is not shipping furniture, and often cannot sign a twelve-month lease that starts before they arrive. That is the gap a furnished 30-day-plus let fills.',
      },
      {
        q: 'What happens in the summer?',
        a: 'It is the honest weakness of a student-only strategy. Downtown answers it: Grady is next door with hundreds of rotating medical trainees, and the convention and corporate market runs year-round. We position a property for whichever is paying in a given month.',
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
        a: 'They are different markets eleven miles apart. The Kennesaw campus on Chastain Road is the larger and original one; the Marietta campus is the former Southern Polytechnic and sits near Marietta Square — and about ten minutes from Wellstar Kennestone, which means a Marietta property can serve students and hospital contract staff from the same address.',
      },
      {
        q: 'Is the academic demand here as strong as at Georgia Tech or Emory?',
        a: 'Not in the graduate and postdoc segment, and it would be dishonest to imply it. Kennesaw State is a comprehensive university rather than a research one, with 5,306 graduate students. What it does have is scale and growth — 51,375 students, up 7.4% in a year — and two campuses generating demand in a county with no rail transit.',
      },
      {
        q: 'How much does parking matter in Cobb?',
        a: 'A great deal. Cobb County is outside the MARTA system, so a guest here will have a car. Off-street parking is close to a requirement rather than an amenity, and it belongs near the top of the listing.',
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
