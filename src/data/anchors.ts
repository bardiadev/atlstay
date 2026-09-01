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
];

export const publishedAnchors = anchors.filter((a) => a.published);
