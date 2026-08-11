// Long-term residential + commercial service lines.
//
// These five entries cover the part of Silverstone Management's business that
// has nothing to do with nightly rentals: 12-month unfurnished residential
// management, leasing-only tenant placement, commercial, small multi-family,
// and realtor-enabled investor services.
//
// CONTENT INTEGRITY NOTES FOR ANYONE EDITING THIS FILE:
//  - Every number on these pages is either (a) a Georgia legal requirement
//    cited in `sources`, or (b) absent. There are no invented statistics,
//    vacancy rates, timelines, or market sizes anywhere in this file.
//  - Long-term management pricing is NOT the short-term 10–15% range and has
//    not been confirmed. Fee copy is deliberately generic ("quoted up front,
//    in writing, before you sign"). Do not add a percentage or a flat
//    placement fee here without owner confirmation.
//  - Georgia landlord-tenant claims come from the Dept. of Community Affairs
//    Georgia Landlord-Tenant Handbook (revised 8-29-24) and the O.C.G.A.
//    sections cited in each entry's `sources`. Do not paraphrase them from
//    memory — re-check the handbook if you change this copy.
//  - The owners hold Georgia real estate licenses. Never state a license
//    number; we do not have one on file.

import type { ServiceLine } from './types';

export const longTermServices: ServiceLine[] = [
  // ==========================================================================
  // 1. LONG-TERM RENTAL MANAGEMENT
  // ==========================================================================
  {
    slug: 'long-term-rental-management',
    name: 'Long-Term Rental Management',
    category: 'long-term',
    headlineKeyword: 'Long-Term Rental Property Management in Atlanta',
    eyebrow: 'Long-Term Residential',
    tagline: 'Twelve-month leases, run properly — by licensed Georgia Realtors.',

    seoTitle: 'Long-Term Rental Property Management in Atlanta, GA',
    seoDescription:
      'Full-service 12-month rental management across metro Atlanta by licensed Georgia Realtors. Screening, leasing, rent, maintenance, and compliance.',
    intro:
      'A rental property should behave like an investment, not a second job. ATLStay manages unfurnished twelve-month residential rentals across metro Atlanta end to end — marketing, screening, leasing, rent collection, maintenance, inspections, accounting, and renewals — with the Georgia compliance work that becomes mandatory the moment you hire a management agent.',

    forWhom: [
      'Owners of one Atlanta rental who are tired of chasing rent, sourcing plumbers, and answering 9pm texts.',
      'Accidental landlords — you moved, kept the house, and now need it run properly instead of informally.',
      'Out-of-state and overseas owners who need real boots on the ground in Fulton, DeKalb, Cobb, and Gwinnett.',
      'Short-term-rental owners converting a property to a 12-month lease after an HOA change, an ordinance change, or plain burnout.',
      'Investors with two to ten doors who want one operator, one statement, and one phone number.',
    ],

    included: [
      'Rent-ready walkthrough and a written punch list of what the property needs to lease at the top of its band',
      'Professional listing photography, floor plan, and syndication across the major rental portals plus the Georgia MLS feeds',
      'Showing coordination, application intake, and a written screening standard applied identically to every applicant',
      'Income, credit, employment, prior-landlord, eviction, and public-record verification on every adult applicant',
      'Georgia-specific lease preparation, disclosures, and execution',
      'Documented move-in inspection with a signed, photographed existing-damage list before the deposit is accepted',
      'Security deposit held in a dedicated escrow account, with written notice to the tenant of where it is held',
      'Online rent collection, a dated late-notice sequence, and owner and tenant portals',
      'Maintenance triage and dispatch through vetted, insured Atlanta vendors, with approval thresholds you set',
      'Scheduled interior and exterior condition inspections with photo reports',
      'Monthly owner statements, year-end summaries, and 1099 handling',
      'Renewal negotiation, market rent review before every expiry, and dispossessory coordination with a Georgia landlord-tenant attorney when it becomes unavoidable',
    ],

    sections: [
      {
        heading: 'What Full-Service Management Actually Covers',
        body: [
          'Most owners reach us after managing a rental themselves for a while. It usually works fine — right up until a water heater fails on a Friday night, or a tenant goes quiet on the 8th of the month, or a renewal slips past and a below-market rent rolls forward for another year. The real cost of self-managing is rarely the money. It is the attention.',
          'Full-service means we own the entire lifecycle. We assess what the property needs to lease well, photograph and market it, screen applicants against a written standard, prepare and execute a Georgia-compliant lease, complete a documented move-in inspection, collect the rent, handle maintenance, inspect on a schedule, account for every dollar, and negotiate the renewal before the lease runs out. When something goes wrong, we fix it and then tell you exactly what happened.',
          'You keep the decisions that matter. Repair approval thresholds, target rent, pet policy, renewal strategy, and whether to sell all stay with you. Everything underneath that line is ours. The point of hiring a manager is not to hand over control — it is to stop being the one who has to notice.',
        ],
      },
      {
        heading: 'Screening Is the Decision That Sets Up the Next Two Years',
        body: [
          'Nearly every bad landlord story starts with a rushed approval. A vacant month feels expensive, so the first applicant with a pulse gets the keys. Twelve months later that decision has cost several times what the vacancy would have.',
          'We screen every adult applicant the same way, every time: verified income measured against a written threshold, full credit review, rental history with prior landlords contacted directly rather than by emailed form, employment verification, and public-record review for prior evictions. The standard is written down before the property is ever listed. That matters for quality, and it matters for Fair Housing — criteria that shift depending on who is asking are exactly how owners end up in a complaint.',
          'We also read an application for what it does not say. Gaps in address history. An employer whose number nobody answers. A co-signer volunteered before anyone asked for one. None of those are automatic denials. All of them are worth a phone call before a lease gets signed.',
          "Criminal history gets handled with particular care. Georgia's own landlord-tenant handbook flags that refusing applicants with a criminal record can create Fair Housing exposure when it is applied as a blanket rule, and points landlords to HUD's guidance on evaluating the nature, severity, and age of an offense case by case. We follow that approach and document the reasoning.",
        ],
      },
      {
        heading: "Georgia's Deposit Rules Change the Day You Hire a Manager",
        body: [
          "This is the part most owners have never been told, and it is the single most useful thing on this page. Georgia exempts small landlords from several security-deposit requirements — but that exemption vanishes the moment a third party manages the property for a fee. O.C.G.A. § 44-7-36 exempts an owner who, with spouse and minor children, holds ten or fewer rental units, then adds that the exemption 'does not apply to units for which management, including rent collection, is performed by third persons, natural or otherwise, for a fee.'",
          "In practice, three things become mandatory on a professionally managed Georgia rental. The security deposit must sit in an escrow account established only for that purpose at a regulated bank, or be bonded with the superior court clerk, and the tenant must be told in writing where it is held. Before the deposit is accepted, the tenant must receive a complete written list of existing damage and be allowed to inspect the unit to check that the list is accurate, with both parties signing it. And at move-out, the unit must be inspected within three business days of lease termination, with a written list of damage and estimated dollar values — the tenant may then inspect within five business days.",
          "Getting this wrong is expensive in a specific, quantified way. The state handbook says plainly that a landlord who owns more than ten units or uses a management agent can be liable for three times a wrongfully withheld deposit, plus attorney's fees. So every deposit we hold goes into escrow. Every move-in and move-out is inspected, itemized, and photographed. That is not a premium feature. It is the floor, and a manager who treats it casually is handing your tenant a treble-damages claim.",
          "Two more rules apply to every Georgia landlord regardless of portfolio size. A security deposit cannot exceed two months' rent. And the deposit must be returned within thirty days of lease termination or the date the tenant leaves, whichever is later — with an itemized notice of any damage withheld inside that same window.",
        ],
      },
      {
        heading: 'Rent, Delinquency, and Evictions — Done the Legal Way',
        body: [
          'Rent is due on the 1st. Our workflow starts before it is late: automated reminders, online payment, and a dated late-notice sequence that begins the day the grace period ends. Most delinquencies resolve inside the first week, for the unglamorous reason that somebody actually followed up.',
          "When they do not, Georgia's process is specific and completely unforgiving of shortcuts. Self-help eviction is illegal here. No lock changes, no removing belongings, no cutting utilities — the state handbook states that a landlord may not knowingly suspend heat, cooling, light, or water before the judge's final decision, and a lease clause claiming the landlord can evict without going to court is itself unlawful. Before filing a dispossessory for nonpayment, the landlord must give the tenant at least three business days' written notice to pay the back rent.",
          'From there it is a court matter. A dispossessory affidavit is filed in magistrate court in the county where the property sits — Fulton, DeKalb, Cobb, Gwinnett, Clayton, Henry, Douglas, and Rockdale each run their own calendars and their own habits, and knowing them is half the job. The tenant has seven days from service to answer. A tenant can also defeat a nonpayment case by tendering everything owed plus court costs, though only once in any twelve-month period.',
          'We coordinate all of it and work alongside a Georgia landlord-tenant attorney for the filing itself. We are licensed Realtors, not lawyers, and eviction is precisely the point where an owner should have counsel. What we contribute is a clean file — dated notices, a complete ledger, signed inspection records, documented communication — so a case never fails on paperwork.',
        ],
      },
      {
        heading: 'Maintenance Without the 9pm Phone Call',
        body: [
          'Rentals degrade quietly. A slow supply-line leak becomes subfloor replacement. A skipped HVAC service becomes a July condenser failure at peak pricing. Deferred exterior paint becomes rot around the window frames. Owners who do well treat maintenance as scheduled spending rather than emergency spending, and the difference shows up in the sale price years later.',
          'Tenants submit requests through a portal, so nothing important lives in somebody\'s text thread. We triage, dispatch a vetted and insured vendor, and handle anything below your approval threshold without calling you. Above it, you get the quote, the photos, and a recommendation. Emergencies — water, gas, no heat, no power, anything unsafe — get handled first and reported immediately, because that is what emergency means.',
          "We inspect on a schedule rather than only when someone complains. Photo-documented interior and exterior reports catch lease violations, unauthorized occupants and pets, and the slow problems tenants never think to report. Georgia places the duty to maintain the structure and keep electrical, plumbing, heating, and cooling in working order on the landlord, and a tenant who is ignored has real remedies, including repair-and-deduct and a damages claim. Responding fast is simultaneously the right thing and the cheap thing.",
        ],
      },
      {
        heading: 'What It Costs',
        body: [
          'Long-term management is priced differently from short-term management, and it moves with the property. A single-family home in Grant Park and a fourplex in Clarkston are not the same job, and pretending otherwise with one headline number would just mean quietly making it up somewhere else.',
          'So we do not publish a percentage we would have to walk back on the phone. You get your exact fee structure — management, leasing, renewal, and anything else that could ever appear — quoted up front, in writing, before you sign anything. Nothing shows up later that was not in that document.',
          'Ask every manager you are comparing us against for the same thing in writing. Ask specifically about the leasing fee, the renewal fee, whether maintenance invoices carry a markup, whether inspections are billed separately, and what happens if a tenant they placed breaks the lease in month three. The answers to those five questions tell you far more about your real cost than the advertised rate does.',
        ],
      },
      {
        heading: 'Where We Manage Across Metro Atlanta',
        body: [
          'We manage long-term rentals across the metro: intown Atlanta from Grant Park and Kirkwood through West End, Adair Park, and Capitol View; the eastside through Decatur, Avondale Estates, Tucker, Stone Mountain, Lithonia, and Stonecrest; the northern arc through Brookhaven, Chamblee, Doraville, Dunwoody, Sandy Springs, Roswell, Alpharetta, Milton, and Johns Creek; the Cobb corridor through Smyrna, Vinings, Mableton, Marietta, Kennesaw, and Acworth; Gwinnett from Norcross and Duluth out to Lawrenceville, Snellville, and Grayson; and the south metro through East Point, College Park, Hapeville, Union City, Fairburn, Jonesboro, Morrow, Stockbridge, and McDonough.',
          'Local knowledge is not decoration in this business. Rent bands, tenant profiles, school-zone demand, and county magistrate practice all shift within a few miles. Being licensed in Georgia and working these specific submarkets every week is how you price a lease correctly the first time, and how you know which applicant pool a given street will actually draw before you list it.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How much does long-term property management cost in Atlanta?',
        a: 'Long-term management is priced differently from short-term management and varies with the property type, unit count, and market. Rather than advertise a number we would have to adjust, we quote your exact structure — management fee, leasing fee, renewal fee, and anything else — up front and in writing before you sign anything. When you compare managers, ask each one whether maintenance invoices carry a markup and what happens if a tenant they placed breaks the lease early. That is usually where the real difference sits.',
      },
      {
        q: 'What does a property manager actually do that I cannot do myself?',
        a: 'Plenty of owners can do the individual tasks. What is hard is doing all of them consistently, on time, for years, while also having a job. In practice a manager earns their fee in four places: pricing the lease correctly instead of guessing, screening to a written standard instead of by gut feel, responding to maintenance fast enough that small problems stay small, and handling the legal machinery — escrowed deposits, signed inspection lists, dated notices, dispossessory filings — without creating liability. The fourth one is where self-managing owners most often get hurt.',
      },
      {
        q: 'How do you screen tenants?',
        a: 'Every adult applicant goes through the same written standard: verified income against a set threshold, full credit review, rental history with prior landlords contacted directly, employment verification, and public-record review including prior evictions. The criteria are documented before the property is listed so they cannot drift based on who applies, which is both better screening and the correct Fair Housing posture. Criminal history is evaluated individually against the nature, severity, and age of the offense rather than as a blanket exclusion, consistent with the guidance Georgia\'s landlord-tenant handbook points landlords toward.',
      },
      {
        q: 'Who holds the security deposit, and what are Georgia\'s rules?',
        a: 'On a managed property, we do — in a dedicated escrow account, with written notice to the tenant of where it is held. That is not a preference: under Georgia law the small-landlord exemption stops applying to any unit managed by a third party for a fee, so escrow (or a bond posted with the superior court clerk) becomes mandatory. Georgia also caps the deposit at two months\' rent, requires it back within thirty days of lease termination or the tenant\'s departure (whichever is later), and exposes landlords who use a management agent to three times any wrongfully withheld amount plus attorney\'s fees.',
      },
      {
        q: 'What happens if my tenant stops paying rent?',
        a: 'Our late-notice sequence starts the day the grace period ends, and most delinquencies clear in the first week once someone actually follows up. If it does not clear, Georgia requires at least three business days\' written notice to pay the back rent before a dispossessory can be filed, then the case goes to magistrate court in the county where the property sits and the tenant has seven days from service to answer. Note that a tenant can stop a nonpayment eviction once in any twelve-month period by paying everything owed plus court costs. We coordinate the process and work with a Georgia landlord-tenant attorney on the filing.',
      },
      {
        q: 'Can I just change the locks or shut off the utilities?',
        a: 'No — and this is the fastest way for an owner to turn a rent problem into a lawsuit. Self-help eviction is illegal in Georgia. You cannot change locks, remove belongings, or knowingly suspend heat, cooling, light, or water before a judge issues a final decision. A lease clause that claims to let the landlord evict without going through court is itself unlawful and will not save you. The only route to possession is the court dispossessory process, and it is worth having counsel for it.',
      },
      {
        q: 'Do I need a property manager if I only own one rental?',
        a: 'Not necessarily — plenty of single-property owners self-manage well, particularly if they live nearby, have a reliable handyman, and enjoy the work. It stops making sense when any of three things are true: you live out of the area, the property is your largest asset and you are managing it casually, or you have already had a tenant issue you did not know how to handle. One badly documented deposit dispute or one botched eviction filing generally costs more than a year of management.',
      },
      {
        q: 'Can I switch my property from short-term rental to a long-term lease?',
        a: 'Yes, and it is one of the more common conversions we handle — usually after an HOA covenant change, a local ordinance change, or simple operator fatigue. The mechanics differ: furniture comes out or gets sold, the listing strategy changes completely, the pricing model shifts from nightly to a twelve-month band, and the compliance layer around deposits and inspections switches on. We will model both paths honestly for your specific property, including the cases where staying short-term is the better call.',
      },
    ],

    sources: [
      {
        claim: 'Landlords who own more than ten rental units, or who contract with a management agent, must place security deposits in a dedicated escrow account or post bond with the superior court clerk, and must tell tenants in writing where the deposit is held.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "A Georgia security deposit cannot exceed two months' rent, and all landlords must return it within thirty days of lease termination or the date the tenant leaves, whichever is later.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: 'Landlords who own more than ten units or employ a management agent must give the tenant a written list of existing damage before accepting the deposit and allow the tenant to inspect; at move-out they must inspect within three business days, and the tenant may inspect within five business days.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "A landlord who owns more than ten units or uses a management agent can be liable for three times a wrongfully withheld security deposit plus attorney's fees.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "Self-help eviction is illegal in Georgia; a landlord may not knowingly suspend heat, cooling, light, or water before the judge's final decision, and must give at least three business days' written notice to pay back rent before filing a dispossessory for nonpayment. The tenant has seven days from service to answer, and may use the tender defense once in a twelve-month period.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "O.C.G.A. § 44-7-36 exempts an owner who with spouse and minor children holds ten or fewer rental units, but the exemption 'does not apply to units for which management, including rent collection, is performed by third persons, natural or otherwise, for a fee.'",
        publisher: 'Official Code of Georgia Annotated § 44-7-36 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-7-36.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Georgia law requires a real estate license to lease or rent real estate for others, collect rents, or perform property management services for a fee.',
        publisher: 'Official Code of Georgia Annotated §§ 43-40-1, 43-40-30 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-43-professions-and-businesses/ga-code-sect-43-40-1.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'decatur', 'brookhaven', 'chamblee', 'doraville', 'dunwoody', 'sandy-springs',
      'smyrna', 'vinings', 'mableton', 'marietta', 'kennesaw', 'acworth', 'woodstock', 'roswell',
      'alpharetta', 'milton', 'johns-creek', 'cumming', 'duluth', 'norcross', 'peachtree-corners',
      'suwanee', 'buford', 'lawrenceville', 'snellville', 'lilburn', 'grayson', 'tucker',
      'stone-mountain', 'clarkston', 'avondale-estates', 'stonecrest', 'lithonia', 'conyers',
      'east-point', 'college-park', 'hapeville', 'union-city', 'fairburn', 'douglasville',
      'jonesboro', 'morrow', 'stockbridge', 'mcdonough',
    ],
    relatedResources: [
      'airbnb-vs-long-term-rental-atlanta',
      'short-term-rental-exit-strategy',
      'is-airbnb-profitable-in-atlanta',
    ],
    relatedServices: [
      'tenant-placement',
      'multi-family-property-management',
      'mid-term-rental-management',
      'short-term-rental-management',
      'investor-services',
    ],

    heroImageKey: 'suburbHome',
    published: true,
    order: 1,
  },

  // ==========================================================================
  // 2. TENANT PLACEMENT
  // ==========================================================================
  {
    slug: 'tenant-placement',
    name: 'Tenant Placement',
    category: 'long-term',
    headlineKeyword: 'Tenant Placement & Leasing-Only Services in Atlanta',
    eyebrow: 'Leasing Only',
    tagline: 'We find and vet the tenant. You keep the keys and the day-to-day.',

    seoTitle: 'Atlanta Tenant Placement & Leasing-Only Services',
    seoDescription:
      'Leasing-only tenant placement in metro Atlanta by licensed Georgia Realtors. MLS and portal marketing, showings, screening, and lease execution.',
    intro:
      'Some owners genuinely want to manage their own rental — they just do not want to find the tenant. Tenant placement is a one-time, leasing-only service: we market the property, run the showings, screen every applicant against a written standard, execute a Georgia-compliant lease, and hand you a fully documented move-in. Then we step back.',

    forWhom: [
      'Self-managing owners who are comfortable with maintenance and rent collection but not with marketing and screening.',
      'Owners who live near the property, have their own vendors, and only need the hard part done right.',
      'Landlords who have been burned by a bad tenant once and will not screen casually again.',
      'Owners between managers who need the unit leased now without signing a long management agreement.',
      'Investors filling a vacancy in a portfolio they otherwise run themselves.',
    ],

    included: [
      'Rent analysis and a recommended asking rent with the comparable evidence behind it',
      'Rent-ready punch list — what to fix, what to skip, and what will actually change the rent',
      'Professional listing photography and written listing copy',
      'MLS listing through our Georgia real estate license, plus syndication to the major rental portals',
      'Yard signage, inquiry handling, and scheduled showings',
      'Application intake and a written, uniformly applied screening standard',
      'Income, credit, employment, prior-landlord, eviction, and public-record verification on every adult applicant',
      'Georgia-compliant lease preparation and execution, with required disclosures',
      'Move-in inspection with a signed, photographed existing-damage list, plus a documented condition report you keep',
      'Deposit and first-month collection, key handover, and a clean file transferred to you',
    ],

    sections: [
      {
        heading: 'Leasing-Only, For Owners Who Want to Stay Hands-On',
        body: [
          'Not every owner needs full management. If you live fifteen minutes away, already have a plumber and an HVAC guy you trust, and do not mind fielding a maintenance call, the ongoing management fee may not be buying you much.',
          'What most self-managing owners are genuinely bad at is the front end. Pricing a vacancy correctly. Reaching the full renter pool instead of just whoever sees a Facebook post. Running showings without giving up every evening. And screening rigorously enough that the person you approve is still paying on time in month fourteen.',
          'Tenant placement is exactly that front end, sold on its own. One engagement, one fee, one outcome: a qualified tenant in a properly executed Georgia lease, with a documented move-in condition record in your hands. After that the relationship is yours to run.',
        ],
      },
      {
        heading: 'How the Placement Works',
        body: [
          'We start with the rent number, because everything downstream depends on it. We pull genuine comparables — leased, not just listed — and give you an asking rent with the evidence attached. If your expectation and the market disagree, you will hear that on day one rather than discover it after six weeks of silence.',
          'Then the rent-ready conversation. We walk the property and give you a short punch list separated into what will move the rent, what will move the speed, and what is not worth doing. Paint and floors usually matter. A brand-new kitchen usually does not, at least not proportionally.',
          'Once it is ready we photograph it, write the listing, put it on the MLS through our Georgia license, syndicate it to the portals renters actually search, and start booking showings. Applications come to us. Screening runs to the written standard. When an applicant clears, we prepare the lease, execute it, complete the move-in inspection, collect the deposit and first month, and hand you the file.',
        ],
      },
      {
        heading: 'Why the MLS Matters More Than Owners Expect',
        body: [
          'A large share of renters in metro Atlanta never search alone. They are working with an agent — because they are relocating for a job, because the company relocation package includes one, or simply because it costs them nothing. Those agents search the MLS.',
          'A rental that only exists on consumer portals is invisible to that entire channel. Listing on the MLS through an active Georgia license puts the property in front of every leasing agent in the metro, and a cooperating-agent commission turns each of them into someone with a reason to show your house this weekend.',
          'This is one of the concrete advantages of hiring a licensed Realtor rather than an unlicensed "leasing service." In Georgia it is more than an advantage — leasing or renting real estate for someone else for a fee is broker activity under state law, and doing it without a license is unlawful. Anyone offering to place a tenant for you should be able to tell you their license status without hesitating.',
        ],
      },
      {
        heading: 'The Screening Standard',
        body: [
          'The screening is the product. Everything else is logistics.',
          'Every adult applicant gets the same treatment: income verified against a written threshold, full credit review, rental history with previous landlords contacted directly by phone, employment verification, and public-record review including prior evictions. Criminal history is assessed individually against the nature, severity, and age of the offense rather than as a blanket exclusion — the approach Georgia\'s landlord-tenant handbook steers landlords toward, and the one that keeps a Fair Housing complaint off your doorstep.',
          'Because the criteria are written down before the listing goes live, they cannot bend for a charming applicant on a slow week. You receive the full screening package on whoever we recommend — not a thumbs-up, the actual file — so you can see precisely what you are approving and keep it on record.',
        ],
      },
      {
        heading: 'The Lease, the Deposit, and the Move-In Record',
        body: [
          'A weak lease costs nothing on the day it is signed and everything on the day there is a dispute. We prepare and execute a Georgia-specific lease with the terms that actually get litigated spelled out: rent and due date, grace period and late charges, utilities, maintenance responsibilities and how requests must be submitted, entry notice, occupancy, pets, and how the lease ends. Georgia also requires written notice before a lease if the property has flooded at least three times in the past five years and damaged the living space — a disclosure many owners have never heard of.',
          'The move-in record is the other thing owners routinely skip and later regret. We complete a written, photographed condition report and existing-damage list, signed by both parties, before the deposit is accepted. Fourteen months later, when the question is whether that scuffed baseboard predates the tenant, that document is the entire argument.',
          'One important caveat on the deposit itself. Once we hand the tenancy back to you, you are the one holding the money, and Georgia\'s deposit rules turn on facts about your situation — how many units you own and whether anyone is managing or collecting rent for a fee. The state caps the deposit at two months\' rent and requires return within thirty days for every landlord, but whether escrow, bonding, and the formal inspection regime apply to you specifically is a question for a Georgia attorney. We will tell you what we see; we will not guess at your legal exposure.',
        ],
      },
      {
        heading: 'What Happens After We Hand You the Keys',
        body: [
          'The engagement ends cleanly. You receive the executed lease, the complete screening file, the signed move-in inspection with photographs, the tenant\'s contact and emergency information, and the deposit. From there rent collection, maintenance, renewals, and any enforcement are yours.',
          'We will still take your call. If a question comes up six months in about a notice period, a renewal, or how a dispossessory actually works in your county, ask — we would rather answer than watch an owner improvise. If it needs a lawyer, we will say so.',
          'And if managing it yourself turns out to be less fun than expected, moving to full management is straightforward. The property is already documented, the lease is already ours, and we know the tenant.',
        ],
      },
      {
        heading: 'What It Costs',
        body: [
          'Tenant placement is a one-time fee tied to the lease, not an ongoing percentage of rent. There is no monthly management charge, because there is no monthly management.',
          'The exact figure depends on the property and the market, so we quote it up front and in writing before you commit to anything — including how a cooperating agent\'s commission is handled if the tenant arrives through one, which is the line item owners most often get surprised by elsewhere.',
          'One thing worth weighing honestly: if you expect to turn the property over frequently, paying a placement fee every year can cost more than management would have. If you expect long tenancies and you genuinely enjoy running the property, placement-only is usually the better economics. We will tell you which one your situation looks like, even when the answer is the cheaper one for you.',
        ],
      },
    ],

    faqs: [
      {
        q: 'What is tenant placement, and how is it different from property management?',
        a: 'Tenant placement is leasing only. We market the property, run showings, screen applicants, execute the lease, complete the move-in inspection, collect the deposit and first month, and hand you the file — then the engagement ends. Property management is ongoing: we keep collecting rent, handling maintenance, inspecting, accounting, and negotiating renewals for the life of the tenancy. Placement is a one-time fee. Management is a recurring one.',
      },
      {
        q: 'How much does tenant placement cost in Atlanta?',
        a: 'It is a one-time fee tied to the signed lease rather than a percentage of monthly rent, and the exact amount depends on the property and the market. We quote it in writing before you commit — including how a cooperating agent\'s commission is handled if the tenant comes through another agent, which is the charge owners most often get surprised by. There is no ongoing management fee, because there is no ongoing management.',
      },
      {
        q: 'Will you list my rental on the MLS?',
        a: 'Yes. We hold Georgia real estate licenses, so your property goes on the MLS as well as the consumer rental portals. That matters more than most owners expect: a large share of metro Atlanta renters are working with an agent — relocation packages, corporate moves, or simply because it is free to them — and those agents search the MLS. A listing that lives only on consumer portals never reaches that channel at all.',
      },
      {
        q: 'How long will it take to find a tenant?',
        a: 'It depends on the asking rent, the condition, the season, and the submarket, and anyone who quotes you a number without seeing the property is guessing. What we will do is tell you honestly on day one whether your target rent matches what comparable properties have actually leased for, because an overpriced listing is the single most common cause of a long vacancy. If the market disagrees with the number, you will hear it before the listing goes live rather than six weeks in.',
      },
      {
        q: 'Who holds the security deposit if I am self-managing?',
        a: 'You do, once we hand the tenancy back. Georgia caps the deposit at two months\' rent and requires every landlord to return it within thirty days of lease termination or the tenant\'s departure, whichever is later. Whether the stricter rules — escrow or bonding, written notice of the deposit location, and the formal move-in and move-out inspection regime — apply to you depends on how many units you own and whether anyone manages or collects rent for a fee. That is a genuinely fact-specific question, and the right person to answer it for your situation is a Georgia landlord-tenant attorney.',
      },
      {
        q: 'Can I screen applicants myself, or make the final call?',
        a: 'The final call is always yours. We apply the written screening standard, verify everything, and give you the complete file on whoever we recommend rather than just a recommendation. What we will not do is apply criteria selectively from one applicant to the next — that is how Fair Housing problems begin, and it is your exposure as the owner, not just ours.',
      },
      {
        q: 'What if the tenant you place does not work out?',
        a: 'Ask us this directly and we will put the answer in the written agreement before you sign — any placement guarantee, its length, and exactly what it covers. We would rather define it precisely up front than have you rely on a promise made on a phone call. Be equally direct with every other company you are comparing, and get their answer in writing too.',
      },
      {
        q: 'Can I switch to full management later?',
        a: 'Easily. The property is already documented, the lease is already one of ours, the screening file is on record, and we know the tenant — so there is none of the usual mid-tenancy handover mess. Plenty of owners start with placement, discover that maintenance calls are less charming than expected, and move to full management at the first renewal.',
      },
    ],

    sources: [
      {
        claim: 'Georgia law defines broker activity to include leasing or renting real estate for others and collecting rents for a fee, and it is unlawful to act as a licensee without a license.',
        publisher: 'Official Code of Georgia Annotated §§ 43-40-1, 43-40-30 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-43-professions-and-businesses/ga-code-sect-43-40-30.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: "Georgia caps security deposits at two months' rent and requires all landlords to return the deposit within thirty days of lease termination or the tenant's departure, whichever is later.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: 'Georgia landlords must notify a prospective tenant in writing before entering a lease if the property has flooded at least three times in the past five years and damaged the living space.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "The stricter Georgia deposit rules — escrow or bond, written notice of the deposit's location, and formal move-in and move-out inspections — attach to landlords with more than ten units and to any unit managed, including rent collection, by a third party for a fee.",
        publisher: 'Official Code of Georgia Annotated § 44-7-36 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-7-36.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'decatur', 'brookhaven', 'chamblee', 'dunwoody', 'sandy-springs', 'smyrna',
      'vinings', 'mableton', 'marietta', 'kennesaw', 'acworth', 'woodstock', 'roswell',
      'alpharetta', 'milton', 'johns-creek', 'cumming', 'duluth', 'norcross', 'peachtree-corners',
      'suwanee', 'buford', 'lawrenceville', 'snellville', 'tucker', 'stone-mountain', 'conyers',
      'stockbridge', 'mcdonough', 'douglasville', 'east-point', 'college-park', 'fayetteville',
      'newnan',
    ],
    relatedResources: [
      'airbnb-vs-long-term-rental-atlanta',
      'short-term-rental-exit-strategy',
    ],
    relatedServices: [
      'long-term-rental-management',
      'investor-services',
      'multi-family-property-management',
      'mid-term-rental-management',
    ],

    heroImageKey: 'ownerHandshake',
    published: true,
    order: 2,
  },

  // ==========================================================================
  // 3. COMMERCIAL PROPERTY MANAGEMENT
  // ==========================================================================
  {
    slug: 'commercial-property-management',
    name: 'Commercial Property Management',
    category: 'commercial',
    headlineKeyword: 'Commercial Property Management in Atlanta',
    eyebrow: 'Commercial',
    tagline: 'Office, retail, flex, and mixed-use — run like an asset, not a building.',

    seoTitle: 'Commercial Property Management in Atlanta, GA',
    seoDescription:
      'Commercial property management in metro Atlanta: office, retail, flex, industrial, and mixed-use. CAM reconciliation, NNN leases, and vendor management.',
    intro:
      'Commercial real estate rewards precision. ATLStay manages office, retail, flex and industrial, and mixed-use property across metro Atlanta — lease administration, CAM reconciliation, triple-net pass-throughs, vendor and building operations, tenant relations, and owner-grade reporting that a lender will accept without a second draft.',

    forWhom: [
      'Owners of a single office, retail, or flex building who have outgrown managing it from a spreadsheet.',
      'Investors holding a small strip center or mixed-use property with several tenants and several lease structures.',
      'Owner-occupiers who lease out the remaining suites and need the landlord side handled professionally.',
      'Out-of-market and out-of-state owners of Atlanta commercial assets who need eyes on the property.',
      'Owners preparing for a refinance or sale who need clean, defensible operating statements.',
    ],

    included: [
      'Lease abstraction — every clause, option, escalation, and pass-through captured in one place',
      'Rent and CAM billing, collection, and escalation tracking against each lease',
      'Annual CAM reconciliation with a supportable, auditable tenant statement',
      'Triple-net pass-through administration: taxes, insurance, and common-area expense allocation',
      'Operating expense budgeting and variance reporting',
      'Vendor sourcing and management — janitorial, landscaping, HVAC, roofing, parking lot, life safety, and security',
      'Preventive maintenance scheduling on building systems, with service records retained',
      'Certificate of insurance tracking on every tenant and every vendor',
      'Tenant relations, service request handling, and move-in and move-out coordination',
      'Renewal and option-date tracking, with notice deadlines calendared well in advance',
      'Construction and tenant-improvement coordination',
      'Monthly owner reporting with rent roll, aged receivables, and operating statements',
    ],

    sections: [
      {
        heading: 'Commercial Is a Different Discipline',
        body: [
          'People often assume commercial management is residential management with bigger buildings. It is not. The economics, the legal framework, and the tenant relationship are all different, and an operator who treats them the same will eventually cost an owner real money.',
          'The clearest example is the law. Georgia\'s landlord-tenant statutes and the state\'s own handbook are written for residential tenancies — the handbook states directly that its information does not apply to commercial or business leases. There is no statutory deposit cap, no mandated return window, and none of the residential consumer protections. What governs a commercial tenancy is the lease document itself.',
          'That single fact reorganizes the whole job. In residential, the statute fills the gaps. In commercial, the gaps are the exposure. A missing audit-rights clause, a vague CAM definition, an option that renews automatically because nobody calendared the notice date — these are the failures that show up years later, and none of them are fixable after the fact.',
          'So commercial management is fundamentally lease administration plus building operations. Get the abstraction right, bill precisely what the lease permits, run the building so tenants stay, and produce records that survive an audit.',
        ],
      },
      {
        heading: 'Lease Administration and CAM Reconciliation',
        body: [
          'Every lease we take on gets abstracted: term dates, base rent and escalation schedule, renewal and expansion options with their notice deadlines, the exact definition of operating expenses, exclusions and caps, the pro-rata share calculation, audit rights, insurance requirements, and who is responsible for the roof, the HVAC, and the parking lot. That abstract becomes the operating manual for the tenancy.',
          'CAM reconciliation is where most small commercial portfolios quietly leak. Under-billing means the owner absorbs costs the lease entitled them to recover. Over-billing produces a tenant dispute, a demanded audit, and sometimes a refund with interest — and it poisons a renewal conversation that was otherwise going fine.',
          'We reconcile annually against actual expenses, with a statement a tenant can follow line by line and backup a tenant can request without anyone scrambling. Where a lease caps controllable expenses or excludes categories such as capital improvements or leasing commissions, we apply the cap and the exclusions properly rather than billing the pool and hoping nobody reads closely.',
        ],
      },
      {
        heading: 'Triple-Net, Modified Gross, and Knowing What You Actually Signed',
        body: [
          'Owners describe their leases as triple-net far more often than their leases actually are. The label is casual; the arithmetic is not.',
          'In a true triple-net structure the tenant carries property taxes, insurance, and common-area maintenance on top of base rent, and the owner\'s exposure is mostly structural and capital. Modified gross splits those items in whatever way the parties negotiated. Full-service gross leaves the owner carrying operating expenses, usually with an expense stop above which increases pass through. Small strip centers in metro Atlanta frequently carry all three structures in the same building because they were leased at different times by different people.',
          'We read what is actually in each document rather than what the rent roll calls it. Then we bill to it. When you are underwriting a refinance or a sale, the difference between assumed net income and actual net income is exactly this — and it is the sort of surprise that surfaces during due diligence at the worst possible moment.',
        ],
      },
      {
        heading: 'Building Operations and Vendor Management',
        body: [
          'Commercial buildings run on their systems. Rooftop HVAC units, life-safety and fire suppression, elevators where applicable, parking lot and lighting, roofing, and janitorial all need scheduled service and documented service history — not reactive calls when a tenant complains.',
          'We source and manage that vendor stack, hold certificates of insurance on every vendor and every tenant, and keep the service records. Preventive maintenance on a rooftop package unit costs a fraction of an emergency replacement in an Atlanta August, and the documentation matters again at sale, when a buyer\'s inspector asks what has been done to the roof since 2019.',
          'Site presence matters more in commercial than owners expect. A retail center where the lot is cracked, the lighting is out, and the landscaping is tired loses tenants at renewal for reasons nobody puts in writing. We inspect on a schedule and report with photographs.',
        ],
      },
      {
        heading: 'Tenant Relations, Renewals, and Option Dates',
        body: [
          'Commercial tenants are businesses. Their concerns are operational and financial: uptime, access, parking, signage, and whether the landlord answers. Handled well, a commercial tenancy is one of the most stable income streams in real estate, because relocating a business is genuinely painful and tenants will pay to avoid it.',
          'Renewal work starts long before expiry. Option and notice dates go on the calendar the day the lease is abstracted, with reminders well ahead — because an option that lapses through inattention, or an auto-renewal that triggers at a below-market rent because nobody sent notice in time, is a pure unforced error.',
          'When a suite does go dark, the re-tenanting sequence starts immediately: broker engagement, marketing, tenant-improvement scoping and budgeting, and coordination of the build-out. Vacancy in commercial is expensive in a way residential vacancy is not — the downtime is longer, the improvement allowance is real money, and the leasing commission is front-loaded. Keeping a good tenant is almost always cheaper than replacing them.',
        ],
      },
      {
        heading: 'Reporting Owners and Lenders Can Use',
        body: [
          'Monthly reporting includes the rent roll, aged receivables, the operating statement against budget, variance explanations that name the cause, and a maintenance summary. Annually you get the CAM reconciliation with tenant-level detail and a budget for the year ahead.',
          'The standard we build to is not "clear enough for the owner." It is clear enough for a lender, a buyer\'s analyst, or an accountant during a refinance or a sale — because those are the moments when disorganized records cost real dollars, either in a lower valuation or in a deal that drags while somebody reconstructs three years of expenses.',
          'That habit also protects you day to day. Owners who can see receivables aging in real time chase a slow tenant in month one rather than month four.',
        ],
      },
      {
        heading: 'Where We Work Across Metro Atlanta',
        body: [
          'We manage commercial property across the metro\'s working corridors: the Perimeter Center office cluster spanning Dunwoody and Sandy Springs, Cumberland and the Galleria area through Smyrna and Vinings, Buckhead and Midtown office and retail, the Alpharetta and Roswell corridor along Georgia 400, Technology Park in Peachtree Corners, the Gwinnett spine through Norcross, Duluth, and Lawrenceville, the flex and industrial belt through Chamblee, Doraville, Tucker, and Austell, the airport and Aerotropolis submarkets around College Park and Hapeville, and the I-75 South logistics corridor through Stockbridge and McDonough.',
          'Each of those submarkets has its own tenant profile, its own lease conventions, and its own competitive set. Office in Perimeter behaves nothing like flex space off Buford Highway, and a neighborhood retail center in Marietta is a different business from a mixed-use ground-floor suite in Decatur. Knowing the difference is how a building gets positioned and priced correctly.',
        ],
      },
    ],

    faqs: [
      {
        q: 'What does a commercial property manager actually do?',
        a: 'Two jobs at once. The first is lease administration: abstracting every lease, billing base rent and escalations exactly as written, administering CAM and triple-net pass-throughs, reconciling annually, and tracking option and notice dates. The second is building operations: vendor management, preventive maintenance on building systems, insurance certificate tracking, tenant service requests, and site inspections. Underneath both sits reporting an owner, a lender, or a buyer can rely on.',
      },
      {
        q: 'How is commercial property management different from residential?',
        a: 'The legal framework is the biggest difference. Georgia\'s residential landlord-tenant statutes and the state handbook explicitly do not apply to commercial or business leases — there is no statutory deposit cap, no mandated return window, and none of the residential consumer protections. In commercial, the lease document is the law between the parties. That makes lease abstraction and precise billing the core of the job, where residential management leans more heavily on statutory process.',
      },
      {
        q: 'What is CAM reconciliation, and how often should it happen?',
        a: 'Common Area Maintenance reconciliation compares what tenants were billed in monthly estimates against the actual operating expenses for the year, then trues up the difference. It should happen annually, on a consistent schedule, with a statement each tenant can follow line by line and backup available on request. Getting it wrong in either direction hurts: under-billing means the owner eats recoverable costs, and over-billing invites an audit demand, a refund, and a much harder renewal conversation.',
      },
      {
        q: 'My lease is triple-net. Does that mean I have no expenses?',
        a: 'Not usually. A true triple-net lease passes property taxes, insurance, and common-area maintenance to the tenant on top of base rent, but the owner typically still carries structural and capital items — roof, foundation, sometimes major systems — and always carries whatever the lease did not successfully pass through. Many properties described as triple-net are really modified gross once you read the exclusions and caps. We abstract each lease and bill to what the document actually says, which is occasionally an uncomfortable conversation and always a useful one.',
      },
      {
        q: 'What types of commercial property do you manage?',
        a: 'Office, retail including neighborhood and strip centers, flex and light industrial, and mixed-use where ground-floor commercial sits under residential. Mixed-use is its own puzzle, since the residential component falls under Georgia\'s residential landlord-tenant rules while the commercial suites do not — two different rulebooks in one building, which is exactly the kind of thing that gets managed badly when nobody notices.',
      },
      {
        q: 'How do you handle a vacancy?',
        a: 'Immediately, because commercial downtime is expensive in a way residential vacancy is not — longer marketing cycles, real tenant-improvement dollars, and a front-loaded leasing commission. We coordinate broker engagement and marketing, scope and budget the improvements, and manage the build-out through to occupancy. Before that point, the cheaper play is almost always keeping the tenant you have, which is why renewal work starts well ahead of expiry rather than at it.',
      },
      {
        q: 'Do you handle tenant improvements and construction coordination?',
        a: 'Yes — scoping, bidding, vendor selection, permit coordination, and oversight through completion, with the allowance tracked against what the lease actually committed. Improvement allowances are one of the most common places a lease and its execution drift apart, usually because the work was managed informally and nobody reconciled it against the negotiated number.',
      },
      {
        q: 'What does commercial property management cost?',
        a: 'It varies with the asset type, the size, the number of tenants, and the lease structures involved — a single-tenant net-leased building is a very different workload from a twelve-suite center with three lease types. We quote your exact fee structure in writing before you sign, including anything that could ever be billed separately such as construction coordination or lease-up work.',
      },
    ],

    sources: [
      {
        claim: "Georgia's residential landlord-tenant law and the state's Landlord-Tenant Handbook do not apply to commercial or business leases; the handbook states this expressly in its introduction.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: 'Georgia law requires a real estate license to lease real estate for others, collect rents, or perform property management services for a fee.',
        publisher: 'Official Code of Georgia Annotated §§ 43-40-1, 43-40-30 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-43-professions-and-businesses/ga-code-sect-43-40-1.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'sandy-springs', 'dunwoody', 'brookhaven', 'chamblee', 'doraville', 'marietta',
      'smyrna', 'vinings', 'alpharetta', 'roswell', 'johns-creek', 'peachtree-corners', 'norcross',
      'duluth', 'lawrenceville', 'kennesaw', 'decatur', 'tucker', 'college-park', 'hapeville',
      'austell', 'stockbridge', 'mcdonough',
    ],
    relatedResources: [
      'scaling-to-multiple-short-term-rentals',
      'financing-a-short-term-rental',
    ],
    relatedServices: [
      'multi-family-property-management',
      'investor-services',
      'long-term-rental-management',
      'mid-term-rental-management',
    ],

    heroImageKey: 'atlantaSkyline',
    published: true,
    order: 3,
  },

  // ==========================================================================
  // 4. MULTI-FAMILY PROPERTY MANAGEMENT
  // ==========================================================================
  {
    slug: 'multi-family-property-management',
    name: 'Multi-Family Property Management',
    category: 'commercial',
    headlineKeyword: 'Multi-Family Property Management in Atlanta',
    eyebrow: 'Multi-Family',
    tagline: 'Duplexes to small apartment communities, run on real systems.',

    seoTitle: 'Multi-Family Property Management in Atlanta, GA',
    seoDescription:
      'Multi-family management across metro Atlanta, from duplexes to small apartment communities. Unit turns, rent rolls, delinquency, and capital planning.',
    intro:
      'Multi-family rewards operators, not owners. ATLStay manages duplexes, triplexes, fourplexes, and small apartment communities across metro Atlanta with the systems the asset class demands — fast unit turns, a rent roll that is actually current, disciplined delinquency management, portfolio-wide compliance, and capital planning that stops roofs and HVAC from becoming emergencies.',

    forWhom: [
      'Owners of a duplex, triplex, or fourplex who are managing several tenancies from one spreadsheet and a phone.',
      'Investors with a small apartment community that has outgrown a part-time on-site manager.',
      'House-hackers who bought a small multi-family, moved out, and now need all the doors run properly.',
      'Owners assembling a portfolio across several small buildings who want one operator and one reporting standard.',
      'Owners taking a property back from a manager who let the turns, the books, or the compliance slip.',
    ],

    included: [
      'Unit-level rent roll, lease expiry calendar, and staggered renewal planning',
      'Marketing, showings, and screening for every vacancy to one written standard',
      'Turn management — scope, vendor scheduling, and quality check before the unit goes back on market',
      'Online rent collection with a dated delinquency workflow applied consistently across every unit',
      'Escrowed security deposits with written notice to tenants of where each deposit is held',
      'Move-in and move-out inspections with signed, photographed damage lists on every unit',
      'Maintenance triage and dispatch, with a shared vendor network across the building or portfolio',
      'Common-area upkeep: landscaping, lighting, trash, parking, laundry, and pest control',
      'Preventive maintenance on shared systems and per-unit HVAC, with service records retained',
      'Capital planning — a written replacement horizon for roofs, HVAC, water heaters, parking, and exteriors',
      'Portfolio reporting: rent roll, occupancy, aged receivables, and operating statements against budget',
      'Delinquency escalation and dispossessory coordination with a Georgia landlord-tenant attorney',
    ],

    sections: [
      {
        heading: 'Small Multi-Family Is Its Own Asset Class',
        body: [
          'A fourplex is not four rental houses. The economics move differently, the failures cluster, and the operating discipline required sits closer to a small apartment community than to a single-family rental.',
          'Some of the differences are pleasant. Vacancy is diversified: one empty unit in a fourplex is a dent, not a cliff. Vendors get scale — one landscaper, one HVAC contractor, one turn crew across every door. Fixed costs like the roof and the lot spread across multiple rents.',
          'Others are not. Tenants share walls, so one problem resident affects everyone and can trigger a chain of non-renewals. Systems fail together, because the units were built at the same time and the water heaters and HVAC condensers age on the same clock. And multi-family is unforgiving of casual administration — miss the pattern in one unit and you have usually missed it in all of them.',
          'That is the whole argument for running it on systems. Same screening standard on every unit, same delinquency workflow on every tenant, same turn checklist, one current rent roll, one capital plan for the building.',
        ],
      },
      {
        heading: 'Unit Turns: The Number That Quietly Decides Your Year',
        body: [
          'Turn speed is the most underrated line in multi-family. Every day a unit sits empty between tenants is revenue that does not come back, and unlike vacancy caused by weak demand, turn time is almost entirely inside the operator\'s control.',
          'Slow turns come from predictable places. Nobody scoped the unit until after the tenant left. The paint crew was booked three weeks out because nobody called them until the walls were bare. The unit was listed only once it was already photo-ready instead of pre-marketed during the notice period. Punch items surfaced during the new tenant\'s move-in instead of during a quality check.',
          'We work the sequence in the other order: scope during the notice period, book vendors before the tenant is out, pre-market where the unit condition allows it, and run a quality check before it goes back on the market rather than discovering the problems through a new resident. Consistency is what compounds here — a few days saved on every turn, across every unit, every year.',
        ],
      },
      {
        heading: 'Rent Roll, Delinquency, and Collections',
        body: [
          'The rent roll is the instrument panel: every unit, tenant, rent, lease dates, deposit held, and balance. Kept current, it tells you where the building actually is. Kept casually, it becomes the reason an owner is surprised by their own property.',
          'Delinquency management is a discipline before it is an enforcement action. Reminders go out before rent is late, the late-notice sequence starts the day the grace period ends, and it is applied identically across every unit — because inconsistent enforcement is both a Fair Housing risk and, more mundanely, a signal residents pass to each other about what the rules really are here.',
          'When a case has to escalate, Georgia\'s process is exact. At least three business days\' written notice to pay the back rent before a dispossessory can be filed for nonpayment. Filing in magistrate court in the county where the property sits. Seven days from service for the tenant to answer. And a tender defense the tenant may use once in any twelve-month period. We keep the file clean — dated notices, complete ledgers, signed inspection records — and work with a Georgia landlord-tenant attorney on the filing itself.',
          'One rule worth repeating because owners break it under pressure: self-help eviction is illegal in Georgia. No lock changes, no removing belongings, and no cutting off heat, cooling, light, or water before a judge\'s final decision. In a multi-family building, where neighbors watch everything, that mistake also becomes a story the rest of your residents hear about within a day.',
        ],
      },
      {
        heading: 'Compliance Multiplies Across Units',
        body: [
          'Georgia\'s stricter deposit and inspection rules attach to landlords who own more than ten rental units and to any unit managed by a third party for a fee. Both triggers matter here: assemble a few small buildings and you cross the unit count on your own, and hiring a manager puts you there immediately regardless of size.',
          'What that means operationally, on every single unit: the deposit sits in a dedicated escrow account or is bonded with the superior court clerk, with written notice to the tenant of where it is held. A complete written list of existing damage goes to the tenant before the deposit is accepted, with the tenant allowed to inspect and both parties signing. At move-out the unit is inspected within three business days of lease termination with an itemized damage list and estimated values, and the tenant may inspect within five business days.',
          'The universal rules apply too: no deposit above two months\' rent, and the deposit returned within thirty days of termination or departure, whichever is later. The penalty for getting it wrong is the part owners underestimate — a landlord over ten units or using a management agent can be liable for three times a wrongfully withheld deposit plus attorney\'s fees. Multiply one sloppy process across a whole building and you have manufactured a portfolio-wide liability out of pure administration.',
          'Renewals and notices carry their own timing. A tenancy at will in Georgia requires sixty days\' notice from the landlord to terminate, and sixty days\' notice to change the rent, while a tenant needs only thirty. On a building where several leases have quietly rolled into month-to-month, that asymmetry decides how quickly you can reposition rents at all.',
        ],
      },
      {
        heading: 'Capital Planning and the Big-Ticket Items',
        body: [
          'In small multi-family the capital items are the whole game, because they arrive together. A building constructed in one year has water heaters, HVAC condensers, and a roof that age on the same schedule, which means the failures cluster and the bills cluster with them.',
          'We keep a written capital plan: what the major components are, their approximate age and condition, an expected replacement horizon, and a running record of what has actually been serviced or replaced. That converts a series of shocks into a budget. It also lets you sequence work sensibly — replacing four water heaters over eighteen months, negotiated as a package, rather than four emergency calls at retail pricing over one bad winter.',
          'The same record does double duty at refinance or sale. A buyer\'s inspector and a lender\'s underwriter both ask the same questions about the roof and the systems, and an owner who can answer with dates, invoices, and photographs is negotiating from a genuinely stronger position than one who cannot.',
        ],
      },
      {
        heading: 'Reporting Built for Lenders, Not Just Owners',
        body: [
          'Monthly reporting covers the rent roll, occupancy and unit status, aged receivables by unit, the operating statement against budget with variance explanations, and a maintenance summary. Year-end brings a full summary and 1099 handling.',
          'We build to the standard a lender or a buyer\'s analyst applies, not just the standard an owner needs to feel informed. Multi-family owners refinance, they add doors, and they eventually sell — and every one of those events is an audit of how well the books were kept while nobody was watching.',
          'Clean records are also how you spot the slow problems. A unit that turns every twelve months while the others hold for three years is telling you something specific about that unit, and you only see it if the data is in one place.',
        ],
      },
      {
        heading: 'Where We Manage Multi-Family',
        body: [
          'We manage small multi-family across the metro: intown Atlanta and the in-town eastside through Decatur, Clarkston, Tucker, Stone Mountain, Lithonia, and Stonecrest; the Buford Highway corridor through Chamblee, Doraville, and Brookhaven; the Cobb side through Smyrna, Mableton, Austell, Powder Springs, Marietta, Kennesaw, and Acworth; Gwinnett through Norcross, Duluth, Lilburn, Lawrenceville, and Snellville; the south metro through East Point, College Park, Hapeville, Union City, Fairburn, Jonesboro, and Morrow; and Athens, where small multi-family behaves differently because the calendar runs on the university year.',
          'Submarket knowledge matters more in multi-family than in single-family, because you are underwriting a tenant pool rather than a single household. Rent bands, turnover patterns, and the mix of workforce, student, and workforce-adjacent demand vary sharply between a fourplex off Buford Highway, one in Clarkston, and one in Smyrna — and those differences drive both the rent you can hold and the turn frequency you should expect.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Do you manage duplexes, triplexes, and fourplexes?',
        a: 'Yes — small multi-family is a core part of what we run. Two-to-four unit properties sit in an awkward spot for a lot of management companies: too complex for a single-family process, too small for an apartment-community operator with on-site staffing assumptions. We run them on the same systems as larger buildings, scaled down: one rent roll, one screening standard, one delinquency workflow, one turn checklist, one capital plan.',
      },
      {
        q: 'How many units do I need before hiring a property manager makes sense?',
        a: 'There is no magic number, but there is a clear tipping point: when the units stop being individually memorable. Most owners can hold two doors in their head. By six or eight, lease dates blur, deposits get tracked inconsistently, and turns slow down because nothing is scheduled. Georgia adds a second consideration — cross more than ten rental units and stricter deposit and inspection rules apply to you directly, whether or not anyone is helping you run them.',
      },
      {
        q: 'What is a unit turn, and how do you keep it short?',
        a: 'A turn is everything between one tenant moving out and the next moving in: inspection, cleaning, repairs, paint, any upgrades, marketing, and lease-up. We compress it by working the sequence before the unit is empty — scoping during the notice period, booking vendors ahead of move-out, pre-marketing where condition allows, and running a quality check before the unit goes back on the market rather than letting a new resident find the punch list. Turn time is one of the few parts of vacancy an operator genuinely controls.',
      },
      {
        q: 'Does Georgia require me to escrow security deposits on a multi-family property?',
        a: 'If you own more than ten rental units, or if a third party manages the property for a fee, then yes — deposits must go into a dedicated escrow account or be bonded with the superior court clerk, and tenants must be told in writing where the money is held. Those same triggers bring the formal move-in and move-out inspection requirements with them. Independently of unit count, every Georgia landlord is capped at two months\' rent and must return the deposit within thirty days of termination or departure, whichever is later.',
      },
      {
        q: 'How do you handle delinquency across multiple units?',
        a: 'The same way in every unit, which is the point. Reminders before rent is late, a dated late-notice sequence starting when the grace period ends, and identical escalation regardless of tenant. Consistency protects you twice: it is the correct Fair Housing posture, and in a shared building residents compare notes, so selective enforcement quickly becomes everyone\'s policy. If a case has to go to court, Georgia requires at least three business days\' written notice to pay before a dispossessory can be filed, and we coordinate the filing with a landlord-tenant attorney.',
      },
      {
        q: 'How do you plan for roofs, HVAC, and other capital expenses?',
        a: 'With a written capital plan rather than a reaction. We inventory the major components, record age and condition, set an expected replacement horizon, and keep a running service and replacement log. In a small multi-family that discipline matters more than most owners expect, because a building put up in one year has systems that fail in roughly the same year — planning converts a cluster of emergencies into a sequence you can budget, negotiate as a package, and price properly.',
      },
      {
        q: 'Can you take over a property mid-lease from another manager?',
        a: 'Yes, and it is common. The handover work is where the risk sits: we collect and abstract every lease, reconcile the rent roll against actual deposits and balances, verify where each security deposit is held and whether the escrow and written-notice requirements were satisfied, and obtain the move-in inspection records. Missing deposit documentation is the most frequent problem we find, and it matters — a landlord using a management agent can face three times a wrongfully withheld deposit plus attorney\'s fees, so we would rather find the gap at takeover than at move-out.',
      },
      {
        q: 'Do you work with Housing Choice Voucher (Section 8) tenants?',
        a: 'Whether to accept vouchers is your decision as the owner, and we will run whichever policy you set consistently across every unit. Participation brings a housing-authority inspection, an approved rent determination, and its own paperwork cycle, all of which we handle on the operational side. Because source-of-income rules can differ by local jurisdiction and change over time, confirm your specific obligations with a Georgia attorney before setting a blanket policy — we will not give you a legal answer on that.',
      },
    ],

    sources: [
      {
        claim: 'Georgia landlords who own more than ten rental units, or who use a management agent, must escrow or bond security deposits, give tenants written notice of the deposit location, provide a signed existing-damage list before accepting the deposit, and complete a move-out inspection within three business days of lease termination (with the tenant able to inspect within five business days).',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "Every Georgia landlord is limited to a security deposit of no more than two months' rent and must return the deposit within thirty days of lease termination or the tenant's departure, whichever is later.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "A Georgia landlord who owns more than ten units or uses a management agent can be liable for three times a wrongfully withheld security deposit plus attorney's fees.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "Georgia requires at least three business days' written notice to pay back rent before a landlord files a dispossessory for nonpayment; the tenant has seven days from service to answer and may use the tender defense once in a twelve-month period. Self-help eviction, including utility shutoffs before the judge's final decision, is illegal.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "Ending a Georgia tenancy at will requires sixty days' notice from the landlord, including to change the rent, while the tenant may end it with thirty days' notice.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "O.C.G.A. § 44-7-36's exemption for owners of ten or fewer rental units 'does not apply to units for which management, including rent collection, is performed by third persons, natural or otherwise, for a fee.'",
        publisher: 'Official Code of Georgia Annotated § 44-7-36 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-7-36.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'decatur', 'east-point', 'college-park', 'hapeville', 'clarkston', 'stone-mountain',
      'lithonia', 'stonecrest', 'tucker', 'chamblee', 'doraville', 'brookhaven', 'smyrna',
      'marietta', 'austell', 'mableton', 'powder-springs', 'kennesaw', 'acworth', 'norcross',
      'duluth', 'lawrenceville', 'lilburn', 'snellville', 'jonesboro', 'morrow', 'union-city',
      'fairburn', 'athens',
    ],
    relatedResources: [
      'scaling-to-multiple-short-term-rentals',
      'financing-a-short-term-rental',
      'airbnb-vs-long-term-rental-atlanta',
    ],
    relatedServices: [
      'long-term-rental-management',
      'commercial-property-management',
      'investor-services',
      'tenant-placement',
    ],

    heroImageKey: 'metroAtlanta',
    published: true,
    order: 4,
  },

  // ==========================================================================
  // 5. INVESTOR SERVICES
  // ==========================================================================
  {
    slug: 'investor-services',
    name: 'Investor Services',
    category: 'commercial',
    headlineKeyword: 'Real Estate Investor Services in Atlanta',
    eyebrow: 'Investor Services',
    tagline: 'Licensed Georgia Realtors who also operate the properties they recommend.',

    seoTitle: 'Real Estate Investor Services in Atlanta, GA',
    seoDescription:
      'Licensed Georgia Realtors helping investors analyze, buy, sell, and scale metro Atlanta rentals — with the operator view most agents cannot give you.',
    intro:
      'Most agents sell you the building. Most managers meet it after you own it. We do both, which means we can tell you what a property will actually do before you make an offer — rental analysis, acquisition, disposition, portfolio growth, and 1031 exchange coordination alongside your qualified intermediary and CPA.',

    forWhom: [
      'First-time investors who want a realistic rent and expense picture before they commit, not after.',
      'Owners of one or two rentals looking to add doors without adding chaos.',
      'Out-of-state and international investors who need a licensed local operator, not a call center.',
      'Owners selling a tenant-occupied rental who want to keep the income until closing.',
      'Investors planning a 1031 exchange who need the replacement property identified and under contract on a hard deadline.',
    ],

    included: [
      'Rental analysis before purchase — realistic rent range, operating expense view, and the assumptions written down',
      'Short-term, mid-term, and long-term strategy comparison for a specific address',
      'Regulatory and covenant checks: local short-term rental rules, HOA restrictions, and zoning considerations',
      'Buyer representation on investment purchases across metro Atlanta',
      'Listing and seller representation, including tenant-occupied dispositions',
      'Off-market and portfolio acquisition sourcing',
      'Rent-roll and lease review on any tenant-occupied property you are buying',
      'Scope-of-work and rent-ready budgeting on value-add purchases',
      'Renovation and turn coordination between closing and first tenant',
      '1031 exchange timeline coordination, working alongside your qualified intermediary and CPA',
      'Direct handover into management — the team that analyzed the deal operates it',
    ],

    sections: [
      {
        heading: 'Advice Before You Buy, Not After',
        body: [
          'The most expensive mistakes in rental real estate are made before closing, and they are almost always the same mistake: an optimistic rent number nobody stress-tested.',
          'It happens because of how the industry is split. The agent selling the house does not operate rentals and has no reason to know what that street actually leases for. The management company meets the property after the money is spent and inherits whatever you bought. Nobody in that chain is accountable for the gap between projected and actual.',
          'We are on both sides of it. We hold Georgia real estate licenses and we run the properties afterwards, so when we give you a rent number we are the ones who will have to hit it. That changes what gets said out loud during a walkthrough. Sometimes it means telling you the deal does not work — which is a worse day for us and a much better one for you.',
        ],
      },
      {
        heading: 'Rental Analysis: What the Property Will Actually Do',
        body: [
          'A rental analysis is not a number pulled off an online estimator. It is a set of assumptions, written down, that you can argue with.',
          'For a long-term rental that means a realistic rent range built from what genuinely comparable properties have leased for recently — not asking prices, which are aspirations. It means the operating side too: taxes at the reassessed value rather than the seller\'s exempted number, insurance quoted rather than guessed, HOA dues, expected maintenance, capital reserves, turn costs, vacancy allowance, and management. Owners routinely model rent carefully and expenses carelessly, then wonder where the return went.',
          'For a property you are weighing as a short-term or mid-term rental, the analysis has to answer a regulatory question before a financial one. Can it legally be rented that way — under the local ordinance, under the HOA covenants, under the zoning? A revenue model for a property that cannot lawfully operate that way is worse than no model at all.',
          'You get the assumptions along with the conclusion. If you disagree with the maintenance reserve or think we are conservative on rent, argue with it — that is exactly what the document is for.',
        ],
      },
      {
        heading: 'Buying Investment Property in Metro Atlanta',
        body: [
          'Metro Atlanta is not one market and cannot be underwritten as one. Intown neighborhoods along the BeltLine, the established northern suburbs through Sandy Springs, Roswell, and Alpharetta, the Cobb corridor, the Gwinnett spine, and the south metro through Clayton and Henry counties all behave differently on rent, appreciation, turnover, tax rates, and tenant pool. A strategy that works in Kirkwood does not automatically travel to McDonough.',
          'We represent investors as buyers: sourcing, underwriting, walking properties with an operator\'s eye, negotiating, and coordinating inspections and due diligence. On a tenant-occupied purchase we review the existing leases and rent roll before you are committed — because you are buying those tenancies exactly as they are, including any below-market rent, any month-to-month conversion, and any security deposit that may or may not have been handled and transferred properly.',
          'On value-add deals we scope the work in terms of what actually changes rent. Kitchens and baths and floors usually do. Some improvements owners love do not move the number at all, and it is cheaper to hear that before the contractor starts than during the lease-up.',
        ],
      },
      {
        heading: 'Selling — Including With a Tenant in Place',
        body: [
          'Selling a rental raises a question a primary-residence sale never does: do you keep the income until closing, or deliver the property empty?',
          'Selling tenant-occupied keeps rent coming and widens the buyer pool to investors who want stabilized income from day one. The trade-offs are real — showing access depends on tenant cooperation, condition is whatever the tenant maintains, and owner-occupant buyers are largely out of the pool. A lease that runs past closing conveys with the property, so the buyer inherits it.',
          'Delivering vacant opens the property to owner-occupants, who often pay more, and lets you present the house at its best. It also means giving up income during marketing and handling the tenancy correctly on the way out. Timing matters here: ending a Georgia tenancy at will requires sixty days\' notice from the landlord, while a tenant only owes thirty — so a plan to sell vacant in six weeks may simply not be available to you.',
          'We list and represent on both paths and will model them for your specific property. The right answer depends on the buyer pool for that address, the lease terms in place, and how much the income actually matters to you between now and closing.',
        ],
      },
      {
        heading: 'Portfolio Acquisition and Scaling Without Chaos',
        body: [
          'Going from one rental to five is not a matter of doing the same thing five times. Most owners feel it at door three or four: leases blur together, deposits get tracked inconsistently, turns slow down because nothing is scheduled, and the whole portfolio starts running on memory.',
          'Georgia adds a specific threshold to that curve. Cross more than ten rental units — counting units owned by a spouse and minor children — and the stricter deposit and inspection requirements apply to you directly. Hiring a manager brings those requirements on immediately at any size, since the statutory exemption does not reach units managed for a fee. Neither of these is a reason to avoid scaling. Both are reasons to have the systems in place before you get there rather than after.',
          'We source small portfolios and off-market opportunities, underwrite them as a group rather than one at a time, and sequence acquisitions so that operations keep up with ownership. Buying well and operating badly produces the same result as buying badly.',
        ],
      },
      {
        heading: '1031 Exchanges: What We Do, and What We Will Not Do',
        body: [
          'A 1031 like-kind exchange lets an investor defer gain by rolling proceeds from one investment property into another. Since the 2017 tax law changes, Section 1031 treatment applies only to real property held for use in a trade or business or for investment — not to personal or intangible property.',
          'The deadlines are unforgiving and they are the reason exchanges fail. Per the IRS instructions for Form 8824, the replacement property must be identified within 45 days after the relinquished property is transferred, and must be received within 180 days or by the due date of your return including extensions, whichever is earlier. Those clocks run on calendar days and they do not pause for a difficult inspection or a slow appraisal.',
          'A deferred exchange also runs through a qualified intermediary. The IRS treats the transfer as a like-kind exchange when a QI handles it — and importantly, your own agents and certain related parties are disqualified from serving as your QI. This is one of the areas where an ordinary agent relationship can quietly create a problem, and it is why the intermediary must be genuinely independent.',
          'Here is the boundary. We are licensed Georgia Realtors and property managers. We are not tax advisors, we are not attorneys, and we will not tell you whether an exchange is right for you or how it affects your return. What we do is the real estate: identify viable replacement properties fast enough to clear the 45-day window, get them under contract, and coordinate closing dates against the 180-day deadline while your qualified intermediary and your CPA handle the structure and the tax treatment. Engage both of those professionals before you sell — not after, because once you have received the proceeds the exchange is generally already lost.',
        ],
      },
      {
        heading: 'Why a Licensed Manager-Realtor Is a Different Animal',
        body: [
          'Georgia requires a real estate license to lease or rent property for others, collect rents, or provide property management services for a fee. It is not optional and it is not a formality — the code makes it unlawful to act as a licensee without one. Yet plenty of "rental services" operate in the gaps, and owners rarely think to ask.',
          'Holding the license is what makes this whole service line possible under one roof. It is what lets us put your rental on the MLS, represent you as a buyer or seller, and manage the property afterwards without handing you off to a third party who was not in any of the earlier conversations.',
          'It also changes the incentives. An agent who never sees the property again is paid at closing. An operator who has to hit the rent number they quoted has to live with it every month for years. When those two roles sit in the same company, the analysis you get before you buy is meaningfully more conservative — and that is precisely the number you want to be given.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Can you help me buy an investment property in Atlanta?',
        a: 'Yes. We are licensed Georgia Realtors and represent investors on purchases across the metro — sourcing, underwriting, walking properties with an operator\'s eye, negotiating, and coordinating due diligence. The difference from a standard buyer\'s agent is that we manage rentals afterwards, so the rent and expense numbers we give you before the offer are numbers we will have to hit later.',
      },
      {
        q: 'Will you tell me what a property will rent for before I make an offer?',
        a: 'Yes, with the assumptions attached so you can push back on them. For a long-term rental that means a rent range built from properties that actually leased recently rather than asking prices, plus the expense side — reassessed taxes rather than the seller\'s exempted figure, quoted insurance, HOA, maintenance, reserves, turn costs, vacancy, and management. For a short-term or mid-term strategy we check the regulatory question first, because a revenue model for a property that cannot lawfully operate that way is worthless.',
      },
      {
        q: 'What does a rental analysis cost?',
        a: 'Tell us the address and what you are considering and we will give you our read — that conversation is how most of our relationships start. If a piece of work carries a fee, you will see the amount in writing before it begins, never afterwards. We would rather talk you out of a bad deal early than be paid for a report that tells you what you hoped to hear.',
      },
      {
        q: 'Can I sell a rental property with a tenant still in it?',
        a: 'Yes, and sometimes you should. Selling occupied keeps the income running and appeals to investors who want stabilized cash flow from day one. The costs are access, since showings depend on tenant cooperation, condition, and the loss of most owner-occupant buyers. A lease running past closing conveys with the property. Timing also constrains you: ending a Georgia tenancy at will takes sixty days\' notice from the landlord, so selling vacant may not be available on a short timeline. We model both paths for the specific property.',
      },
      {
        q: 'What is a 1031 exchange, and can you handle it?',
        a: 'A 1031 exchange defers gain by rolling proceeds from one investment property into another, and since 2018 it applies only to real property held for business or investment. We handle the real estate side — finding viable replacement properties fast, getting them under contract, and coordinating closing dates. We do not handle the exchange itself and we do not give tax advice. The structure runs through a qualified intermediary, who must be independent of you, and the tax treatment belongs to your CPA. Engage both before you sell, because once you have received the proceeds the exchange is generally already lost.',
      },
      {
        q: 'What are the 1031 deadlines I need to know about?',
        a: 'Two, and they are strict. Per the IRS instructions for Form 8824, you must identify the replacement property within 45 days after transferring the property you are giving up, and you must receive the replacement within 180 days or by your tax return due date including extensions, whichever comes first. Those are calendar days and they do not extend for a bad inspection or a slow lender. The 45-day identification window is where most exchanges fail, which is why the property search should start well before your sale closes rather than after.',
      },
      {
        q: 'Should I buy for short-term, mid-term, or long-term rental?',
        a: 'It depends on the address, not on a general preference — and the regulatory answer comes first. Some Atlanta-area properties cannot legally operate as short-term rentals under the local ordinance or the HOA covenants, which ends the discussion regardless of the revenue model. Where more than one strategy is genuinely available, we compare them for that specific property, including the operating intensity of each: short-term earns more per night and costs far more to run, long-term earns less and demands much less, and mid-term furnished sits in between.',
      },
      {
        q: 'Do you work with out-of-state and international investors?',
        a: 'Yes, and they are a natural fit for this structure. A remote investor needs someone licensed who can represent them on the purchase, tell them the truth about a neighborhood they cannot visit easily, and then actually operate the property afterwards. We do all three, and we will say plainly when a property is not worth buying — which is more useful to a remote buyer than to anyone else.',
      },
    ],

    sources: [
      {
        claim: 'In a deferred like-kind exchange the replacement property must be identified within 45 days after the relinquished property is transferred, and must be received within 180 days or by the due date of the tax return including extensions, whichever is earlier.',
        publisher: 'Internal Revenue Service — Instructions for Form 8824 (Like-Kind Exchanges)',
        url: 'https://www.irs.gov/pub/irs-pdf/i8824.pdf',
        asOf: '2025 instructions, dated December 2, 2025',
      },
      {
        claim: 'A deferred exchange made through a qualified intermediary is treated as a like-kind exchange; related parties and agents of the taxpayer are disqualified from serving as the qualified intermediary.',
        publisher: 'Internal Revenue Service — Instructions for Form 8824 (Like-Kind Exchanges)',
        url: 'https://www.irs.gov/pub/irs-pdf/i8824.pdf',
        asOf: '2025 instructions, dated December 2, 2025',
      },
      {
        claim: 'Since the Tax Cuts and Jobs Act, Section 1031 applies only to exchanges of real property and not to exchanges of personal or intangible property, effective for exchanges after December 31, 2017.',
        publisher: 'Internal Revenue Service — Like-Kind Exchanges Real Estate Tax Tips',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Georgia law defines broker activity to include leasing or renting real estate for others, collecting rents, and performing property management services for a fee, and makes it unlawful to act as a licensee without a license.',
        publisher: 'Official Code of Georgia Annotated §§ 43-40-1, 43-40-30 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-43-professions-and-businesses/ga-code-sect-43-40-30.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: "Ending a Georgia tenancy at will requires sixty days' notice from the landlord, while the tenant may end it with thirty days' notice.",
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Handbook revised 8-29-24; retrieved August 2026',
      },
      {
        claim: "O.C.G.A. § 44-7-36 exempts owners of ten or fewer rental units (counting a spouse's and minor children's units) from several security-deposit requirements, but the exemption does not reach units managed, including rent collection, by third parties for a fee.",
        publisher: 'Official Code of Georgia Annotated § 44-7-36 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-7-36.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'decatur', 'east-point', 'college-park', 'hapeville', 'smyrna', 'mableton',
      'marietta', 'kennesaw', 'acworth', 'woodstock', 'canton', 'roswell', 'alpharetta', 'cumming',
      'duluth', 'lawrenceville', 'snellville', 'stone-mountain', 'stonecrest', 'conyers',
      'stockbridge', 'mcdonough', 'jonesboro', 'douglasville',
    ],
    relatedResources: [
      'buying-a-property-to-airbnb-atlanta',
      'financing-a-short-term-rental',
      'is-airbnb-profitable-in-atlanta',
      'scaling-to-multiple-short-term-rentals',
    ],
    relatedServices: [
      'long-term-rental-management',
      'tenant-placement',
      'multi-family-property-management',
      'commercial-property-management',
      'short-term-rental-management',
    ],

    heroImageKey: 'pricingDashboard',
    published: true,
    order: 5,
  },
];
