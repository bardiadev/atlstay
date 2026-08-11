// Mid-term service lines — 30+ day furnished stays.
//
// The strategic spine of this whole file: the City of Atlanta ordinance defines
// a short-term rental as lodging "for a period of time not to exceed 30
// consecutive days." A furnished let of 30+ consecutive days therefore is not a
// short-term rental under the ordinance — no STR licence, and not caught by the
// primary-residence-plus-one-dwelling cap. That is the single strongest reason
// an Atlanta owner moves to mid-term, and every page here leads with it.
//
// CONTENT INTEGRITY: every number below is traceable to an entry in that page's
// `sources` array, and every URL in those arrays was fetched and confirmed to
// resolve. No competitor marketing claims. No fee percentages (the fee is a
// quoted range that lives in src/config/site.ts).

import type { ServiceLine } from './types';

export const midTermServices: ServiceLine[] = [
  // ---------------------------------------------------------------------------
  // 1. FLAGSHIP
  // ---------------------------------------------------------------------------
  {
    slug: 'mid-term-rental-management',
    name: 'Mid-Term Rental Management',
    category: 'mid-term',
    headlineKeyword: 'Mid-Term Rental Management in Atlanta',
    eyebrow: 'Mid-Term Rentals',
    tagline: 'Furnished 30+ day stays — outside the short-term rental ordinance.',
    seoTitle: 'Mid-Term Rental Management in Atlanta, GA | 30+ Day',
    seoDescription:
      "A 30+ day furnished let sits outside Atlanta's short-term rental ordinance. We manage mid-term rentals across metro Atlanta, end to end.",
    intro:
      "Thirty days is not an arbitrary number. It is the line the City of Atlanta drew, and crossing it changes which rules apply to your property. We manage furnished 30+ day rentals across metro Atlanta — pricing, listing, screening, the lease, the stay, and the turn.",

    forWhom: [
      'Owners who have already used their Atlanta short-term rental licence on a primary residence plus one dwelling, and want a legal path for property number three.',
      'Owners inside an HOA or condo association that bans short-term rentals but permits stays of 30 days or longer.',
      'Owners tired of dozens of turnovers a year who want fewer, longer, calmer bookings without going to a bare 12-month lease.',
      'Investors near Emory, Grady, Piedmont, Northside, Children’s, or the studio corridors who want to serve the professionals those places bring into town.',
      'Owners between selling and holding who need the property to earn while it stays show-ready.',
    ],

    included: [
      'Strategy call first: we model the property as short-term, mid-term, and long-term before you commit to any of them.',
      'Furnishing specification and sourcing built for someone living in the home, not visiting it.',
      'Listing, photography, and copy tuned for the mid-term audience — commute times, parking, desk, laundry, pet policy.',
      'Distribution across Furnished Finder, the monthly channels on Airbnb and Vrbo, corporate and relocation desks, insurance housing coordinators, and direct enquiry.',
      'Monthly pricing with a written utility policy, so nobody argues about the power bill in week six.',
      'Guest screening: identity, employment or assignment verification, and stated purpose of stay.',
      'Written occupancy agreements with a defined end date and documented renewal mechanics.',
      'Security-deposit handling that meets the Georgia escrow-or-bond rule that applies once a management agent is involved.',
      'Signed move-in condition list with photographs, and a matching move-out inspection.',
      'Rent collection on a schedule, with a paper trail you could take to a magistrate court if you ever had to.',
      'Mid-stay housekeeping and linen refresh, maintenance response, and a check-in cadence appropriate to a long stay.',
      'Owner statements, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'The 30-day line is the entire strategy',
        body: [
          'Atlanta’s short-term rental ordinance (20-O-1656) has been enforced since 5 March 2023. It defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, and it caps a single licence at the holder’s primary residence plus one additional dwelling unit.',
          'Read that definition carefully, because the opportunity is inside it. A furnished let of 30 or more consecutive days is not a short-term rental under the ordinance. It does not need a short-term rental licence, and it is not counted against the two-dwelling cap. For an owner who has already spent their licence on a primary residence and one rental, mid-term is the compliant way to put a third, fourth, or fifth property to work.',
          'The same logic applies inside buildings. Plenty of Atlanta condo boards and suburban HOAs ban "short-term rentals" while explicitly permitting leases of 30 days or more — the exact structure mid-term uses. We read the covenants before we recommend anything, because some associations set a 6-month or 12-month floor instead, and that is a different answer.',
          'One caution we will always give you in writing: outside the City of Atlanta limits, the county or municipality writes its own rules. Cobb, Gwinnett, DeKalb, Fulton’s cities, and Cherokee do not all treat this the same way. We confirm the specific jurisdiction for your address during onboarding rather than assuming the city rule travels.',
        ],
      },
      {
        heading: 'What mid-term actually earns — the honest version',
        body: [
          'A well-run short-term rental in a strong Atlanta submarket will almost always gross more than the same home let on 30-day terms. Anyone selling mid-term to you as a pure revenue upgrade is not being straight with you, and we would rather lose the conversation than start it with a lie.',
          'The trade is real, though, and for a lot of owners it is the better one. Fewer turnovers means dramatically lower cleaning and linen cost, fewer consumables, less wear on the soft furnishings, and fewer of the small breakages that eat a nightly calendar. It means less regulatory exposure, because you are outside the licence regime entirely. It means steadier occupancy, because one 90-day booking does not care whether it rained in February. And it means the phone rings at 2am a great deal less often.',
          'It also changes the shape of your risk. On a nightly calendar your income is spread across thirty small bookings and one bad review can cost you months. On a mid-term calendar your income is concentrated in two or three tenancies, so screening and the lease matter far more than listing photos do. Different discipline, not a lesser one.',
          'We model both before you decide. If the numbers say your Buckhead condo should stay nightly, we will tell you that and manage it nightly. Mid-term is a tool, not a religion.',
        ],
      },
      {
        heading: 'Taxes change at day 31 — and the first 30 days still count',
        body: [
          'Here is the single most common mistake owners make when they move to mid-term. They assume a 30-plus-day booking is free of lodging taxes from the first night. It is not.',
          'The Georgia state hotel-motel fee is $5.00 per calendar night on each night an accommodation is rented until the rental becomes an extended-stay rental. The Georgia Department of Revenue is explicit about when that switch happens: on the 31st day of uninterrupted continuous occupancy, the fee is no longer collected. The first thirty nights are still fee-bearing.',
          'There is a second detail underneath it that catches people out. In the Department’s own words, if the customer checks out then checks back into the same facility, the continuous occupancy has been broken and the day-count to establish an extended stay begins anew. So the tidy-looking trick of ending a stay and restarting it to refresh paperwork is not free — it resets the clock and puts the fee back on.',
          'Local hotel-motel excise tax follows a comparable continuous-use logic, and the details vary by jurisdiction. We flag the treatment for your specific address and keep the records your accountant needs, but we are property managers, not tax advisers, and we will always tell you to confirm the final position with your CPA.',
        ],
      },
      {
        heading: 'Where mid-term demand actually comes from in Atlanta',
        body: [
          'Mid-term is not one market. It is five or six markets that happen to share a length of stay, and they behave nothing alike.',
          'Travelling healthcare is the deepest and steadiest. Atlanta’s clinical employment is clustered along a handful of corridors — Emory University Hospital at 1364 Clifton Rd NE, the wider Clifton Road corridor, Grady downtown, Piedmont Atlanta in Buckhead, Northside in Sandy Springs, and Children’s Healthcare of Atlanta’s Arthur M. Blank Hospital at I-85 and North Druid Hills Road in Brookhaven, which opened on 29 September 2024 with 446 licensed beds. Contracts run in 13-week blocks and extend often.',
          'Corporate relocation and project teams are the second pillar, concentrated around Central Perimeter, Cumberland and the Galleria, the Alpharetta and Johns Creek technology corridor, and Midtown. Insurance displacement housing is a third, driven by fire and water losses and routed through third-party coordinators rather than the family itself. Film and television crews are a fourth, following the stages in Doraville and Fayetteville and the locations that carry a shoot out into Covington, Senoia, and Newnan. Academic and clinical trainees — residents, fellows, visiting faculty, postdocs — are a fifth, and they arrive on calendars set by programmes, not by demand curves.',
          'They pay differently, book on different lead times, and need different leases. A relocation management company wants an invoice on net terms. A travel nurse wants to pay by card the week she arrives. A production coordinator wants four units in the same building and an answer within the hour. We run distribution across all of them so a gap in one channel does not become a gap on your calendar.',
        ],
      },
      {
        heading: 'The tenancy question — where mid-term owners get hurt',
        body: [
          'Georgia does not set a bright-line day count at which a guest becomes a tenant. The state’s own Landlord-Tenant Handbook puts it plainly: an extended stay guest could become a tenant based on an express agreement or conduct of the parties. Length of stay is evidence, not a switch.',
          'The consequence matters more than the definition. If your occupant is a tenant and stops paying, you cannot change the locks, cut the power, or move their belongings to the kerb. Self-help evictions by the landlord are illegal in Georgia even where the tenant has broken the lease, and removal runs through a dispossessory action filed in magistrate court. That is weeks, not days, and it is a process you want to have prepared for rather than discovered.',
          'So we manage the paperwork as though every mid-term stay could become a tenancy, because functionally it can. Every occupant signs a written agreement sized to the stay with a defined end date. Renewals are documented rather than allowed to roll indefinitely. Screening happens before the booking is confirmed, not after the keys are handed over. Rent is collected on a schedule with a record. And the notice provisions are written to match Georgia procedure instead of a template borrowed from another state.',
          'None of this is legal advice, and we will say so on the call. Where the stakes justify it — a high-value home, a corporate counterparty, an unusual term — we will tell you to have your own attorney read the agreement before it goes out.',
        ],
      },
      {
        heading: 'Security deposits: hiring a manager can change your obligations',
        body: [
          'This is the disclosure most management companies do not volunteer, and we would rather you hear it from us before you sign than from a lawyer afterwards.',
          'Under Georgia law, a landlord who owns more than ten rental units — including units owned by a spouse or children — must place security deposits in a bank escrow account used only for security deposits, or post bond with the superior court clerk. The same requirement applies to a landlord who contracts with a management agent. There is no unit-count exemption once an agent is in the picture.',
          'That means hiring us can trigger an obligation you did not have when you were self-managing a single unit. The matching requirement comes with it: unless the landlord owns fewer than ten units and does not use a management agent, the tenant must be given a complete list of existing damage before the deposit is accepted, must be allowed to inspect the property to check that list, and both parties must sign it.',
          'We build to that standard as default on every mid-term stay we run. Deposits go into compliant handling, and every move-in starts with a photographed, signed condition list that we match against at move-out. It protects you at the end of a stay far more often than it inconveniences you at the start of one.',
        ],
      },
      {
        heading: 'How we run a mid-term property',
        body: [
          'The furnishing spec is different from a nightly rental, because your occupant is living in the house rather than passing through it. That means a real desk and a real chair rather than a decorative one, a kitchen someone can actually cook in for three months, full-size laundry wherever the property allows it, blackout in the bedrooms, storage for suitcases so the hallway does not become a luggage rack, and internet we have speed-tested and documented rather than assumed.',
          'Distribution is deliberately wide. Furnished Finder is foundational for this segment and its pitch to owners is straightforward — no commissions, no booking fees, just 30+ day stays. What that pitch leaves out is that the subscription buys you visibility and nothing else: the screening, the lease, the deposit handling, and the rent collection are all still yours to do. That gap is exactly the work we take on. Alongside it we run the monthly channels on the major platforms, corporate and relocation desks, insurance housing coordinators, and direct enquiry from the site.',
          'Pricing is quoted by the month, not by the night, with the utility policy fixed in writing before the agreement is signed — included up to a cap is usually cleanest, and it removes the single most common source of friction in month three. Rates are reviewed against real local comparables and against what the payer can actually approve, which for a lot of corporate and healthcare demand is a benchmarked allowance rather than an open budget.',
          'During the stay we run a scheduled mid-stay clean and linen refresh, keep a maintenance response path open, and check in on a cadence that suits a long occupancy rather than pestering someone who lives there. Between stays we turn the property properly — deep clean, inventory check, touch-up, and a fresh condition record. Our management fee is quoted up front, in writing, before you sign anything, and it is set against your property, its size and scope, and your market.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Do I need an Atlanta short-term rental licence for a 30-day-plus furnished rental?',
        a: 'Not under the City of Atlanta short-term rental ordinance. Ordinance 20-O-1656, enforced since 5 March 2023, defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days. A furnished let of 30 or more consecutive days falls outside that definition, so it does not require a short-term rental licence and does not count against the primary-residence-plus-one-dwelling cap. Outside the city limits, the county or municipality sets its own rules, and we confirm the position for your specific address during onboarding.',
      },
      {
        q: 'Will I make more money on mid-term than on Airbnb?',
        a: 'Usually not on gross revenue. A well-run short-term rental in a strong Atlanta submarket typically grosses more than the same home on 30-day terms, and we will tell you that before you switch. What mid-term buys you is fewer turnovers and lower cleaning, linen and consumables cost, less wear, less regulatory exposure, and steadier occupancy. Net can be much closer than gross suggests, and for some properties it is better. We model both before you decide.',
      },
      {
        q: 'Do I still pay lodging taxes on a 30-plus day stay?',
        a: 'On the first thirty nights, yes. The Georgia state hotel-motel fee is $5.00 per calendar night until the rental becomes an extended-stay rental, and the Department of Revenue states that on the 31st day of uninterrupted continuous occupancy the fee is no longer collected. Note the word uninterrupted: if the guest checks out and checks back in, continuous occupancy is broken and the count starts again. Local hotel-motel excise tax follows a comparable continuous-use rule and varies by jurisdiction. We keep the records; your CPA should confirm the final position.',
      },
      {
        q: 'Can a long-staying guest become a tenant I cannot remove?',
        a: 'Georgia sets no bright-line day count. The state Landlord-Tenant Handbook says an extended stay guest could become a tenant based on an express agreement or conduct of the parties. If that happens and the occupant stops paying, you cannot lock them out — self-help eviction is illegal in Georgia, and removal requires a dispossessory action in magistrate court. We manage every mid-term stay on the assumption that it could be a tenancy: written agreement, defined end date, documented renewals, screening before confirmation, and rent collected on a recorded schedule.',
      },
      {
        q: 'My HOA bans short-term rentals. Does mid-term get around that?',
        a: 'Often, but not always, and we check before we promise anything. Many Atlanta condo boards and suburban HOAs prohibit short-term rentals while expressly permitting leases of 30 days or more, which is exactly how a mid-term stay is structured. Others set a 6-month or 12-month minimum, or cap the number of rented units in the building. We read the covenants for your specific property and give you a straight answer rather than a hopeful one.',
      },
      {
        q: 'Who pays the utilities on a mid-term rental?',
        a: 'On almost every stay we run, utilities are included in the monthly rate up to a written cap, with overage billed to the occupant. It is the cleanest structure for both sides: the tenant gets a single predictable number, and you are protected from a guest who runs the air conditioning at 65 degrees all August. The cap is set from the property’s actual usage history rather than a guess, and it is in the agreement before anyone moves in.',
      },
      {
        q: 'What does the property need to be furnished with?',
        a: 'Think residence, not hotel room. A genuine work setup with a proper desk and task chair, a kitchen equipped for real cooking over months rather than a weekend, full-size laundry where the property allows it, blackout in the bedrooms, luggage storage, and internet that has been speed-tested and documented. Bedding and towels need enough spare sets to survive a mid-stay linen swap. We produce a per-property specification and can source and install it if you would rather not.',
      },
      {
        q: 'What does mid-term management cost?',
        a: 'Our fee is a percentage of collected rent, and your exact rate depends on your property, its size and scope, and your market. It is quoted up front, in writing, before you sign anything — no hidden charges bolted on later, and no surprise line items on your statement. Ask us for the number on the first call and you will have it in writing the same week.',
      },
    ],

    sources: [
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; enforcement began 5 March 2023, and a single licence covers the primary residence and one additional dwelling.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'City of Atlanta Code of Ordinances, Part 20 — Short-Term Rentals: licence requirement, 30-consecutive-day definition, and $150 annual licence fee.',
        publisher: 'Municode Library — City of Atlanta Code of Ordinances',
        url: 'https://library.municode.com/ga/atlanta/codes/code_of_ordinances?nodeId=PTIIICOORANDECO_PT20SHTERE',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'The Georgia state hotel-motel fee is $5.00 per calendar night until the rental becomes an extended-stay rental; on the 31st day of uninterrupted continuous occupancy the fee is no longer collected, and if the customer checks out then checks back in, the day-count begins anew.',
        publisher: 'Georgia Department of Revenue',
        url: 'https://dor.georgia.gov/state-hotel-motel-faq',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'An extended stay guest could become a tenant based on an express agreement or conduct of the parties; self-help evictions by the landlord are illegal in Georgia and removal requires a dispossessory action. Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and must provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
      {
        claim:
          'Emory University Hospital is located at 1364 Clifton Rd NE, Atlanta, and is a teaching hospital whose medical staff are faculty at Emory University School of Medicine.',
        publisher: 'Emory Healthcare',
        url: 'https://www.emoryhealthcare.org/locations/hospitals/emory-university-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          "Children's Healthcare of Atlanta's Arthur M. Blank Hospital opened on 29 September 2024 with 446 licensed beds, at the corner of I-85 and North Druid Hills Road.",
        publisher: "Children's Healthcare of Atlanta",
        url: 'https://www.choa.org/locations/arthur-m-blank-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim: 'Furnished Finder markets its landlord product as "No commissions. No booking fees. Just 30+ day stays."',
        publisher: 'Furnished Finder',
        url: 'https://www.furnishedfinder.com/list-your-property',
        asOf: 'Verified August 2026',
      },
    ],

    marketCities: [
      'atlanta',
      'sandy-springs',
      'brookhaven',
      'dunwoody',
      'decatur',
      'chamblee',
      'doraville',
      'tucker',
      'avondale-estates',
      'clarkston',
      'smyrna',
      'vinings',
      'marietta',
      'mableton',
      'austell',
      'kennesaw',
      'acworth',
      'woodstock',
      'roswell',
      'alpharetta',
      'milton',
      'johns-creek',
      'duluth',
      'norcross',
      'peachtree-corners',
      'suwanee',
      'lawrenceville',
      'snellville',
      'lilburn',
      'stone-mountain',
      'stonecrest',
      'east-point',
      'college-park',
      'hapeville',
      'douglasville',
      'conyers',
      'newnan',
      'peachtree-city',
      'fayetteville',
      'stockbridge',
    ],
    relatedResources: [
      'mid-term-rentals-atlanta',
      'furnished-rentals-atlanta',
      'airbnb-vs-furnished-finder-midterm',
      'atlanta-short-term-rental-regulations',
      'corporate-housing-atlanta',
      'short-term-rental-exit-strategy',
    ],
    relatedServices: [
      'corporate-housing-management',
      'travel-nurse-housing',
      'insurance-housing',
      'film-production-housing',
      'student-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'serviceManagement',
    published: true,
    order: 1,
  },

  // ---------------------------------------------------------------------------
  // 2. CORPORATE HOUSING
  // ---------------------------------------------------------------------------
  {
    slug: 'corporate-housing-management',
    name: 'Corporate Housing Management',
    category: 'mid-term',
    headlineKeyword: 'Corporate Housing Management in Atlanta',
    eyebrow: 'Corporate Housing',
    tagline: 'Furnished homes for relocations, project teams, and executive assignments.',
    seoTitle: 'Corporate Housing Management in Atlanta, GA',
    seoDescription:
      'Furnished 30+ day homes for relocations and project teams. We handle the lease, the invoicing and the stay so your property works for corporate tenants.',
    intro:
      'Corporate housing is the same asset run on commercial terms. The occupant is an employee; the payer is a company with an approval chain, a benchmarked allowance, and an accounts-payable department. We set your property up to satisfy all three.',

    forWhom: [
      'Owners of furnished homes and condos inside the Perimeter, in Central Perimeter, or along the Alpharetta technology corridor who want longer, steadier bookings.',
      'Owners who would rather invoice a company on net terms than chase a card payment from a consumer.',
      'Owners in buildings where short-term rentals are prohibited but 30-day-plus leases are allowed.',
      'Investors with two or more comparable units who can take a project team that needs several homes at once.',
      'Owners who want the mid-term stability of a corporate tenant without becoming the person answering relocation paperwork at 9pm.',
    ],

    included: [
      'Positioning the property against the corridors that actually generate corporate demand, rather than listing it and hoping.',
      'Furnishing and equipment specification built to what a relocating employee or project engineer genuinely needs.',
      'Listing and copy written for a housing coordinator scanning twenty options, not for a weekend traveller.',
      'Outreach and listing across relocation desks, project-staffing firms, Furnished Finder, and the monthly channels on the major platforms.',
      'Monthly pricing benchmarked against per diem allowances and real local comparables.',
      'Corporate paperwork handled: W-9, certificate of insurance requests, vendor onboarding forms, and purchase-order references.',
      'Invoicing on net terms with statements an accounts-payable department will actually pay, plus collections follow-up.',
      'Fixed-term occupancy agreements with named occupants, defined end dates, and early-termination mechanics tied to project change.',
      'Security-deposit handling that meets the Georgia escrow-or-bond requirement that applies once a management agent is engaged.',
      'Arrival logistics for a traveller landing at Hartsfield-Jackson at 11pm — documented access, parking, and a working first night.',
      'Mid-stay housekeeping, linen service, and a single named point of contact for the account.',
      'Owner reporting, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'The occupant is not the customer',
        body: [
          'This is the mental shift that separates corporate housing from a monthly Airbnb booking. The person sleeping in the bed is an employee. The person deciding whether your property gets used is a relocation consultant, a corporate travel manager, an HR business partner, or a project staffing coordinator — and they are choosing from a list, against a policy, with a budget they did not set.',
          'That changes what wins the booking. A coordinator is not moved by a hero shot of the kitchen island. They are checking commute time to a specific office, whether parking is assigned or a gamble, whether the internet will hold a video call, whether the lease can flex if the project slips six weeks, whether you will invoice on net terms, and whether you can produce a W-9 and a certificate of insurance today rather than next Tuesday.',
          'It also changes the tone of the relationship. Corporate placements repeat. A coordinator who has a good experience with one unit will call about the next assignment, and the one after that. Getting the boring parts right — paperwork, invoicing, a named contact who answers — is worth more over three years than any amount of styling.',
        ],
      },
      {
        heading: 'Per diem is the ceiling on a large slice of this market',
        body: [
          'Federal travellers are bound by the GSA per diem, and a great many private employers benchmark their own housing allowances to it because it is the defensible number. So it functions as a practical ceiling well beyond government work.',
          'For fiscal year 2026, the GSA lodging rate for Atlanta — Fulton and DeKalb counties — is $182 per night from October through December 2025, $197 per night from January through March 2026, and $182 per night from April through September 2026. Meals and incidental expenses are set at $86 per day.',
          'Convert that to a monthly equivalent and you have an honest ceiling for a large part of corporate demand. Price a unit meaningfully above it and you are no longer competing on value; you are asking a coordinator to seek an exception, which is exactly the friction that gets your property skipped. Price sensibly under it with better space, better parking, and a real kitchen and you win against an extended-stay hotel every time, because the traveller gets more and the employer pays less.',
          'We price to the allowance the payer can actually approve, then we make the property obviously worth it. That is a different exercise from maximising a nightly rate, and it is why corporate units should not simply be run on short-term pricing software with a monthly discount stapled on.',
        ],
      },
      {
        heading: 'Where corporate demand sits on the Atlanta map',
        body: [
          'Corporate housing demand is geographic in a way leisure demand is not. Nobody takes a 90-day assignment and then commutes across the top end of I-285 twice a day if they can help it.',
          'Central Perimeter — Dunwoody, Sandy Springs, and the Brookhaven side — anchors a large share of professional-services and healthcare-administration assignments. The Cumberland and Galleria corridor pulls from Vinings, Smyrna, and Marietta. The Alpharetta and Johns Creek technology corridor runs its own ecosystem of contract engineers and implementation teams, with Duluth, Suwanee, and Peachtree Corners feeding it. Midtown and Tech Square draw consultants, product teams, and academic-industry secondments.',
          'The airport corridor is its own market. College Park, Hapeville, and East Point serve aviation, logistics, and Hartsfield-Jackson-adjacent operations, where an assignment may be measured in weeks and the commute tolerance is close to zero. Norcross and Peachtree Corners take manufacturing and engineering project teams who want several units near one site.',
          'We position each property to the corridors it can genuinely serve rather than claiming the whole metro. A well-targeted unit in Dunwoody beats a vaguely marketed one every time, because the coordinator is filtering on drive time before they look at anything else.',
        ],
      },
      {
        heading: 'The commercial requirements that trip owners up',
        body: [
          'Corporate tenants ask for things a leisure guest never mentions, and an owner who cannot produce them loses the booking without ever knowing why.',
          'Expect to supply a W-9 and to complete a vendor onboarding form. Expect a request for a certificate of insurance, sometimes naming the corporate client as an additional interested party. Expect to invoice on net terms rather than take a card at booking, and expect the invoice to need a purchase-order or cost-centre reference to clear accounts payable. Expect a named contact who answers within business hours and does not route the coordinator through a call queue.',
          'On the property side the requirements are equally specific: assigned parking that is actually assigned, documented arrival instructions that work for a traveller who lands late, internet with a tested and stated speed, a genuine work surface, in-unit laundry wherever the property allows it, and a utility position agreed in writing so nobody argues about a bill in month three.',
          'We run all of this as standard. It is unglamorous, and it is the reason a corporate account renews.',
        ],
      },
      {
        heading: 'The agreement is the product',
        body: [
          'A corporate housing agreement is not a booking confirmation. It is a fixed-term contract with a named occupant, a defined start and end date, documented renewal mechanics, a clear early-termination path for when a project changes, a no-subletting clause, and a damage and condition regime that both sides signed at the start.',
          'Georgia gives you no bright-line protection here. The state Landlord-Tenant Handbook is explicit that an extended stay guest could become a tenant based on an express agreement or conduct of the parties, so a long corporate stay is best structured and papered as though it is a tenancy from day one. Self-help eviction is illegal in Georgia in any event; removal runs through a dispossessory action in magistrate court.',
          'There is one more obligation that catches owners specifically because they hired a manager. In Georgia, a landlord who owns more than ten rental units — or who contracts with a management agent, regardless of unit count — must place security deposits in a dedicated escrow account or post bond with the superior court clerk, and must give the tenant a complete signed list of existing damage before accepting the deposit. We tell owners this before signing rather than after, and we operate to that standard on every stay.',
        ],
      },
      {
        heading: 'How we run a corporate unit',
        body: [
          'We start by deciding honestly whether the property is a corporate unit at all. Location relative to a real employment corridor, parking, internet, and the ability to seat someone at a desk for three months are the gates. If a property fails them, we will say so and recommend a different strategy rather than list it and let it sit.',
          'From there: furnishing and equipment to spec, photography and copy written for a coordinator, and distribution across relocation desks, project-staffing firms, Furnished Finder, and the monthly channels. Furnished Finder is worth saying something honest about — its landlord pitch is no commissions, no booking fees, just 30+ day stays, which is true, and which also means the screening, the lease, the deposit handling, and the collections remain entirely your problem. Those are the parts we take over.',
          'During the stay we run scheduled housekeeping and linen service, keep a single named contact on the account, handle extension requests before they become gaps, and manage the invoice cycle to term. Between stays we turn the unit properly and refresh the condition record.',
          'Our management fee is a percentage of collected rent, set against your property, its size and scope, and your market — quoted up front, in writing, before you sign anything.',
        ],
      },
    ],

    faqs: [
      {
        q: 'What is the difference between corporate housing and a monthly Airbnb booking?',
        a: 'The payer and the paperwork. A monthly platform booking is a consumer transaction settled by card at the point of booking. Corporate housing is a business-to-business arrangement: a fixed-term agreement with a named occupant, a W-9 and often a certificate of insurance, invoicing on net terms to an accounts-payable department, and a named account contact. The physical property can be identical. The commercial operation is not.',
      },
      {
        q: 'Do I need a short-term rental licence for corporate housing in Atlanta?',
        a: 'Not if the stays are 30 consecutive days or longer. Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, so a 30-plus-day corporate let falls outside the licence regime and outside the primary-residence-plus-one-dwelling cap. Outside the City of Atlanta, the local jurisdiction sets its own rules and we confirm the position for your address during onboarding.',
      },
      {
        q: 'How much can I charge a corporate tenant?',
        a: 'Benchmark to what the payer can approve. The GSA per diem lodging rate for Atlanta in fiscal year 2026 is $182 per night for October through December 2025, $197 per night for January through March 2026, and $182 per night from April through September 2026, with meals and incidentals at $86 per day. Many private employers set their allowances against that same table. Pricing above it forces a coordinator to seek an exception, which usually means they choose someone else. We price to the approvable number and make the property clearly better value than a hotel at that level.',
      },
      {
        q: 'How do I get onto a relocation company’s list?',
        a: 'By being easy to transact with. Coordinators build shortlists from suppliers who answer quickly, hold accurate availability, invoice properly, and do not create exceptions. We handle the vendor onboarding, keep availability current across channels, and maintain the account relationship so a good first placement turns into repeat ones. Nobody can guarantee you a corporate account, and we will not pretend otherwise — but consistent execution is what moves you up the list.',
      },
      {
        q: 'What happens if the assignment ends early?',
        a: 'This is why the early-termination clause matters. Corporate projects slip and get cancelled, and an agreement with no exit mechanism produces a dispute rather than a payment. We write a defined early-termination path with notice and a minimum term into the agreement up front, so both sides know the position before it is needed, and so the unit goes back to market quickly rather than sitting in limbo.',
      },
      {
        q: 'Do I need different insurance for corporate housing?',
        a: 'Almost certainly a different policy from a standard homeowner’s policy, and possibly different from your short-term rental cover. Corporate clients also frequently request a certificate of insurance as part of vendor onboarding. We will tell you what is being asked for and coordinate the paperwork, but the cover itself is a conversation for you and your broker — we do not place insurance.',
      },
      {
        q: 'Can you handle several units for one project team?',
        a: 'Yes, and it is one of the better uses of this service. Project teams frequently need three to eight comparable units near a single site, arriving and departing on a shared schedule. We can coordinate a block across multiple owners, keep the units consistent so the coordinator is not managing variations, and run a single invoicing relationship on behalf of the group.',
      },
    ],

    sources: [
      {
        claim:
          'GSA FY2026 per diem for Atlanta (Fulton and DeKalb counties): lodging $182 per night October through December 2025, $197 per night January through March 2026, $182 per night April through September 2026; meals and incidental expenses $86 per day.',
        publisher: 'U.S. General Services Administration',
        url: 'https://www.gsa.gov/travel/plan-book/per-diem-rates/',
        asOf: 'Fiscal year 2026',
      },
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; a single licence covers the primary residence and one additional dwelling, enforced since 5 March 2023.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'An extended stay guest could become a tenant based on an express agreement or conduct of the parties; self-help eviction is illegal in Georgia. Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
      {
        claim: 'Furnished Finder markets its landlord product as "No commissions. No booking fees. Just 30+ day stays."',
        publisher: 'Furnished Finder',
        url: 'https://www.furnishedfinder.com/list-your-property',
        asOf: 'Verified August 2026',
      },
    ],

    marketCities: [
      'atlanta',
      'sandy-springs',
      'dunwoody',
      'brookhaven',
      'chamblee',
      'doraville',
      'decatur',
      'tucker',
      'smyrna',
      'vinings',
      'marietta',
      'kennesaw',
      'roswell',
      'alpharetta',
      'milton',
      'johns-creek',
      'duluth',
      'norcross',
      'peachtree-corners',
      'suwanee',
      'cumming',
      'lawrenceville',
      'college-park',
      'hapeville',
      'east-point',
      'peachtree-city',
    ],
    relatedResources: [
      'corporate-housing-atlanta',
      'mid-term-rentals-atlanta',
      'furnished-rentals-atlanta',
      'airbnb-vs-furnished-finder-midterm',
      'business-traveler-airbnb-atlanta',
    ],
    relatedServices: [
      'mid-term-rental-management',
      'travel-nurse-housing',
      'film-production-housing',
      'insurance-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'atlantaSkyline',
    published: true,
    order: 2,
  },

  // ---------------------------------------------------------------------------
  // 3. TRAVEL NURSE HOUSING
  // ---------------------------------------------------------------------------
  {
    slug: 'travel-nurse-housing',
    name: 'Travel Nurse Housing Management',
    category: 'mid-term',
    headlineKeyword: 'Travel Nurse Housing Management in Atlanta',
    eyebrow: 'Travel Healthcare',
    tagline: 'Furnished 13-week homes near Atlanta’s hospital corridors.',
    seoTitle: 'Travel Nurse Housing Management in Atlanta, GA',
    seoDescription:
      "Furnished stays for travel nurses near Emory, Grady, Piedmont, Northside and Children's. We price, list, screen and run the whole 13-week contract.",
    intro:
      'Travelling healthcare is the deepest and steadiest slice of Atlanta mid-term demand. Contracts run in 13-week blocks, extensions are common, and the tenant is a working professional on a night rota. We manage the property around that reality.',

    forWhom: [
      'Owners within a realistic commute of Emory’s Clifton Road corridor, Grady, Piedmont Atlanta, Northside, or Children’s in Brookhaven.',
      'Owners of one-bedroom, two-bedroom, and small single-family homes — the sizes travelling clinicians actually book.',
      'Owners who want a tenant with verifiable employment and a contract end date already written down.',
      'Owners in HOAs or condo buildings that prohibit short-term rentals but permit stays of 30 days or more.',
      'Owners with a pet-friendly property, which is one of the strongest differentiators in this segment.',
    ],

    included: [
      'Honest assessment of whether your address actually commutes to a hospital campus at shift-change times.',
      'Furnishing specification tuned to a clinician on rotating shifts — blackout bedrooms, quiet, real laundry, a usable kitchen.',
      'Listing on Furnished Finder plus the monthly channels on the major platforms, and direct enquiry from our own site.',
      'Pricing set against what a nurse actually keeps from a stipend, not against the theoretical ceiling.',
      'Screening: licence verification, assignment or contract letter, and agency or employer confirmation.',
      'Written occupancy agreements sized to a 13-week contract with defined extension mechanics.',
      'Security-deposit handling that meets the Georgia escrow-or-bond rule that applies once a management agent is engaged.',
      'Signed, photographed move-in condition list and a matching move-out inspection.',
      'Rent collection on schedule with a full record, and follow-up when a payment slips.',
      'Mid-contract housekeeping and linen refresh scheduled around a night rota rather than in the middle of someone’s sleep.',
      'Extension handling ahead of the contract end date so a renewal never becomes a vacancy.',
      'Owner statements, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'The stipend sets the ceiling, and the nurse sets the price',
        body: [
          'Travel healthcare contracts typically pay a housing stipend alongside the taxable hourly rate. Agencies benchmark those stipends against published per diem tables, which is why the GSA rate is the number that quietly governs this whole market.',
          'For fiscal year 2026, the GSA lodging rate for Atlanta in Fulton and DeKalb counties is $182 per night from October through December 2025, $197 per night from January through March 2026, and $182 per night from April through September 2026, with meals and incidentals at $86 per day. That is the outer boundary of what an agency will fund.',
          'Now the part most owners miss. A travelling nurse who takes the stipend does not have to spend all of it on rent — whatever is left over stays in their pocket, and for most travellers that surplus is a meaningful part of why they take the assignment. So the real market rate sits comfortably below the per diem ceiling, not at it. Price to the ceiling and your listing gets scrolled past by someone doing exactly this arithmetic.',
          'We price to what a clinician will actually pay for a good home near their campus, and we make the value obvious: utilities included to a cap, parking sorted, no surprise fees. A unit that books three consecutive 13-week contracts at a fair rate beats one that sits empty holding out for the per diem.',
        ],
      },
      {
        heading: 'Where the shifts are',
        body: [
          'Atlanta’s clinical employment concentrates in a handful of corridors, and a property either commutes to one of them at 5:30am or it does not.',
          'The Clifton Road corridor in northeast Atlanta is the densest. Emory University Hospital sits at 1364 Clifton Rd NE, a teaching hospital whose medical staff are faculty at Emory University School of Medicine, and the surrounding campus and CDC Roybal complex extend the corridor further. Housing that works here draws from Druid Hills, Decatur, Avondale Estates, Brookhaven, Chamblee, Clarkston, and Tucker.',
          'Grady anchors downtown and the near south and west sides. Piedmont Atlanta sits in Buckhead and pulls from Buckhead itself, Brookhaven, Sandy Springs, and the Vinings side. Northside’s Atlanta campus in Sandy Springs draws from Dunwoody, Roswell, and the north Perimeter. And Children’s Healthcare of Atlanta’s Arthur M. Blank Hospital, which opened on 29 September 2024 with 446 licensed beds at the corner of I-85 and North Druid Hills Road, has moved a significant pool of paediatric clinical staff into the Brookhaven and Chamblee catchment.',
          'We are careful about how we describe a property’s position. "Minutes from Emory" written by someone who has never sat on North Druid Hills at 7am is exactly the kind of claim that produces a bad review in week two. We state real drive times, name the campus, and let the honesty do the selling.',
        ],
      },
      {
        heading: 'Thirteen weeks is the unit of account',
        body: [
          'Travel contracts are typically written in 13-week blocks. That single fact should shape how the property is priced, listed, and scheduled — and most owners instead run a 30-day mindset and wonder why their calendar has holes in it.',
          'Extensions are where the money is. A nurse who likes the assignment and likes the home very often extends for another 13 weeks, and sometimes a third. An extension costs you nothing: no turnover clean, no re-listing, no vacancy gap, no re-screening. We ask about extension intent well before the contract end date rather than discovering the answer on the last Friday, so the calendar either rolls or gets re-let with lead time.',
          'Cancellations are the other side of the same coin. Assignments do get cancelled, sometimes before the traveller arrives. We write the agreement with that possibility in it, hold a deposit properly, and keep the listing warm enough that a gap can be refilled rather than eaten.',
          'The practical upshot: a property that lands three consecutive 13-week contracts with two extensions has a far better year than one chasing a higher monthly rate with four turnovers and six weeks of vacancy. We manage for the former.',
        ],
      },
      {
        heading: 'What a travelling clinician actually needs',
        body: [
          'The requirements in this segment are specific and unforgiving, because the tenant is working twelve-hour shifts and sleeping on the wrong side of the clock.',
          'Blackout in the bedroom is not a nice touch; for a night-shift nurse it is the difference between a five-star stay and a mid-contract move. Quiet matters for the same reason — a shared wall with a family on a normal schedule is a genuine problem. Parking must be included and predictable, because a clinician arriving home at 8am after a night rota is not going to circle for a space. In-unit laundry is close to mandatory; scrubs get washed constantly. The kitchen needs to work for someone cooking real meals over three months, not assembling breakfast for a weekend.',
          'Pet-friendly is one of the strongest differentiators available to an owner in this market. A large share of travellers bring a dog or a cat, and the pool of properties that accepts them is far smaller than the pool that does not. If your property can take pets with a sensible deposit and a written policy, it will book faster and hold tenants longer.',
          'Then the small things that decide reviews: a working, speed-tested internet connection, somewhere to put a suitcase, enough linen for a mid-contract swap, and a move-in that can happen on a Sunday because that is when assignments start.',
        ],
      },
      {
        heading: 'Screening, the lease, and the tenancy line',
        body: [
          'Travelling clinicians are, as a group, an unusually good tenant profile: employed, verifiable, licensed, and on a contract with a printed end date. That is not a reason to skip screening — it is a reason screening is easy.',
          'We verify professional licensure, ask for the assignment or contract letter, and confirm with the agency or employer where appropriate. It takes very little time and it filters out the small number of applicants who are not what they claim to be.',
          'The lease still needs to be written properly. Georgia sets no bright-line day count at which a guest becomes a tenant; the state Landlord-Tenant Handbook says an extended stay guest could become a tenant based on an express agreement or conduct of the parties. And self-help eviction is illegal in Georgia regardless — removing an occupant requires a dispossessory action in magistrate court. So we paper every stay as though it is a tenancy: written agreement, named occupant, defined end date, documented extensions, rent on a recorded schedule.',
          'Deposits are handled to the Georgia standard that applies the moment you engage a management agent: escrow or bond, plus a complete signed list of existing damage given to the tenant before the deposit is accepted, with the tenant allowed to inspect and check it. We photograph everything at move-in and match it at move-out.',
        ],
      },
      {
        heading: 'How we run a travel-nurse property',
        body: [
          'Distribution starts with Furnished Finder, which is where a large share of travelling clinicians search. Its landlord proposition is honest and worth repeating: no commissions, no booking fees, just 30+ day stays. What the subscription does not buy you is any of the actual work — screening, the lease, the deposit rules, rent collection, and the mid-contract relationship are all still yours. Those are precisely the parts we run.',
          'Alongside it we list on the monthly channels of the major platforms, take direct enquiry through our own site, and keep relationships with agencies and housing coordinators who place clinicians into the metro.',
          'Operationally, we schedule around a rota rather than a nine-to-five. Housekeeping and linen refreshes are booked with the tenant, not dropped on them. Maintenance response is fast and quiet. Communication is written and brief, because a nurse coming off a fourth consecutive night does not want a phone call.',
          'Our fee is a percentage of collected rent, set against your property, its size and scope, and your market, and it is quoted up front, in writing, before you sign anything.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How much can I charge a travel nurse in Atlanta?',
        a: 'Less than the per diem ceiling, and that is the point. The GSA lodging rate for Atlanta in fiscal year 2026 is $182 per night from October through December 2025, $197 from January through March 2026, and $182 from April through September 2026, with $86 a day for meals and incidentals. Agencies benchmark stipends against that table, but travellers keep whatever they do not spend on rent — so they shop well below the ceiling. We price to what a clinician will genuinely pay for a good home near their campus, and we would rather fill three consecutive contracts than hold out for a number nobody books.',
      },
      {
        q: 'Do I need an Atlanta short-term rental licence to host travel nurses?',
        a: 'Not for stays of 30 consecutive days or more. Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, so a 13-week clinical contract sits outside the licence requirement and outside the primary-residence-plus-one-dwelling cap. Outside the City of Atlanta, the local jurisdiction sets its own rules and we confirm your specific position during onboarding.',
      },
      {
        q: 'Which Atlanta neighbourhoods work best for travel nurse rentals?',
        a: 'Follow the campuses. For Emory University Hospital at 1364 Clifton Rd NE and the wider Clifton Road corridor, look at Druid Hills, Decatur, Avondale Estates, Brookhaven, Chamblee, Clarkston, and Tucker. Piedmont Atlanta in Buckhead draws from Buckhead, Brookhaven, Sandy Springs, and Vinings. Northside in Sandy Springs draws from Dunwoody, Roswell, and the north Perimeter. Children’s Arthur M. Blank Hospital at I-85 and North Druid Hills Road, which opened in September 2024 with 446 licensed beds, has strengthened the Brookhaven and Chamblee catchment considerably. Grady anchors downtown and the near south and west sides.',
      },
      {
        q: 'How long do travel nurses usually stay?',
        a: 'Thirteen weeks is the standard contract length, and extensions of another 13 weeks are common. Extensions are the most profitable outcome you can have — no turnover, no re-listing, no vacancy. We raise the extension conversation well before the contract end date so the calendar either rolls smoothly or gets re-let with proper lead time.',
      },
      {
        q: 'Should I allow pets?',
        a: 'If you can, yes. A large share of travelling clinicians bring a dog or cat, and the supply of pet-friendly furnished units is much smaller than the demand for them. Allowing pets with a written policy and a sensible deposit typically means faster bookings, more extensions, and a wider applicant pool. We will tell you honestly if your specific flooring or furnishing makes it a bad idea.',
      },
      {
        q: 'How do you screen a travelling clinician?',
        a: 'Professional licence verification, the assignment or contract letter showing the facility and dates, and confirmation with the agency or employer where appropriate. It is a fast process because the tenant profile is genuinely verifiable. We do it before the booking is confirmed rather than after the keys are handed over.',
      },
      {
        q: 'Can a travel nurse become a tenant I have to evict?',
        a: 'It is possible, which is why we paper the stay properly. Georgia sets no bright-line day count; the state Landlord-Tenant Handbook says an extended stay guest could become a tenant based on an express agreement or conduct of the parties. Self-help eviction is illegal in Georgia in any case — removal requires a dispossessory action in magistrate court. Every stay we run has a written agreement with a defined end date, documented extensions, screened occupants, rent collected on a recorded schedule, and deposits held under the Georgia escrow rule that applies once a management agent is involved.',
      },
    ],

    sources: [
      {
        claim:
          'GSA FY2026 per diem for Atlanta (Fulton and DeKalb counties): lodging $182 per night October through December 2025, $197 per night January through March 2026, $182 per night April through September 2026; meals and incidental expenses $86 per day.',
        publisher: 'U.S. General Services Administration',
        url: 'https://www.gsa.gov/travel/plan-book/per-diem-rates/',
        asOf: 'Fiscal year 2026',
      },
      {
        claim:
          'Emory University Hospital is located at 1364 Clifton Rd NE, Atlanta, and is a teaching hospital whose medical staff are faculty at Emory University School of Medicine.',
        publisher: 'Emory Healthcare',
        url: 'https://www.emoryhealthcare.org/locations/hospitals/emory-university-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          "Children's Healthcare of Atlanta's Arthur M. Blank Hospital opened on 29 September 2024 with 446 licensed beds, at the corner of I-85 and North Druid Hills Road in Atlanta.",
        publisher: "Children's Healthcare of Atlanta",
        url: 'https://www.choa.org/locations/arthur-m-blank-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; a single licence covers the primary residence and one additional dwelling, enforced since 5 March 2023.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'An extended stay guest could become a tenant based on an express agreement or conduct of the parties; self-help eviction is illegal in Georgia. Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
      {
        claim: 'Furnished Finder markets its landlord product as "No commissions. No booking fees. Just 30+ day stays."',
        publisher: 'Furnished Finder',
        url: 'https://www.furnishedfinder.com/list-your-property',
        asOf: 'Verified August 2026',
      },
    ],

    marketCities: [
      'atlanta',
      'decatur',
      'avondale-estates',
      'brookhaven',
      'chamblee',
      'doraville',
      'tucker',
      'clarkston',
      'sandy-springs',
      'dunwoody',
      'smyrna',
      'vinings',
      'marietta',
      'mableton',
      'austell',
      'east-point',
      'college-park',
      'hapeville',
      'stone-mountain',
      'norcross',
      'duluth',
      'lawrenceville',
    ],
    relatedResources: [
      'traveling-nurse-housing-atlanta',
      'mid-term-rentals-atlanta',
      'furnished-rentals-atlanta',
      'airbnb-vs-furnished-finder-midterm',
      'corporate-housing-atlanta',
    ],
    relatedServices: [
      'mid-term-rental-management',
      'corporate-housing-management',
      'student-housing',
      'insurance-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'guestExperience',
    published: true,
    order: 3,
  },

  // ---------------------------------------------------------------------------
  // 4. INSURANCE / ALE HOUSING — OWNER-SIDE
  // ---------------------------------------------------------------------------
  {
    slug: 'insurance-housing',
    name: 'Insurance & ALE Housing Management',
    category: 'mid-term',
    headlineKeyword: 'Insurance & ALE Housing Management in Atlanta',
    eyebrow: 'Insurance Housing',
    tagline: 'Additional living expense placements, explained from the owner’s side.',
    seoTitle: 'Insurance & ALE Housing for Atlanta Property Owners',
    seoDescription:
      'Insurance displacement housing, explained for owners. We register your home with the coordinators who place ALE families and run the stay for you.',
    intro:
      'When a fire or a burst pipe makes a home unliveable, the policy pays for somewhere else to live. That money reaches property owners through a specific chain of companies. This page explains how to get into it — and how much of it is outside your control.',

    forWhom: [
      'Owners of furnished whole-home rentals anywhere in metro Atlanta who want an additional demand channel alongside their main strategy.',
      'Owners with pet-friendly or accessible properties, both of which are chronically short in this segment.',
      'Owners who can hold short-notice availability and accept an end date that may move as repairs run long.',
      'Owners of two-, three-, and four-bedroom homes able to take a displaced family rather than a single traveller.',
      'Owners who want a commercial counterparty on the invoice instead of a consumer on a card.',
    ],

    included: [
      'A frank assessment of whether your property is a realistic ALE candidate before you spend anything on it.',
      'Registration and profile setup with the third-party housing coordinators who place displaced policyholders.',
      'Ongoing availability updates, because a stale listing is the fastest way to fall out of a placement search.',
      'Furnishing and equipment specification for a family arriving with almost nothing after a loss.',
      'Screening, paperwork, and coordination with the placing company rather than with the family directly.',
      'W-9, vendor onboarding, and certificate-of-insurance handling for corporate counterparties.',
      'Invoicing on the placing company’s terms, with collections follow-up.',
      'Written occupancy agreements with extension mechanics built in, because repair timelines slip.',
      'Security-deposit handling that meets the Georgia escrow-or-bond rule that applies once a management agent is engaged.',
      'Photographed, signed move-in condition list and a matching move-out inspection.',
      'A communication protocol appropriate to a household under real stress, not a leisure guest.',
      'Owner statements, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'How the money actually reaches you',
        body: [
          'Almost every owner who looks at insurance housing starts by imagining a displaced family finding their listing. That is not how it works, and understanding why saves a lot of wasted effort.',
          'A homeowner suffers a covered loss. Their policy’s additional living expense cover — ALE, sometimes called loss of use — pays for temporary accommodation. The carrier assigns an adjuster. The adjuster, in most cases, hands the housing problem to a third-party temporary housing coordinator. That coordinator searches its own database of registered properties near the damaged home and places the family. You, the property owner, contract with the coordinator or the carrier, not with the family.',
          'The named coordinators operating in this space include ALE Solutions, CRS Temporary Housing, Sedgwick, and Sinistar. Each maintains its own landlord or housing-provider database, and each has its own registration process. If you are not in those databases, you are invisible to the entire channel no matter how good your property is.',
          'There is one important exception. A policyholder is not required to accept the carrier’s chosen housing vendor — consumer advocates including United Policyholders make that point clearly. Some displaced families find and arrange their own accommodation and submit it for reimbursement. That is a genuine but smaller path, and it looks like an ordinary direct mid-term booking from your side.',
        ],
      },
      {
        heading: 'Getting into the pipeline',
        body: [
          'Registration is direct, free to start, and unglamorous. Each coordinator wants a property profile: address, size, bedroom and bathroom count, furnishing status, pet policy, accessibility features, parking, availability, and your contact details.',
          'ALE Solutions takes landlord registrations through a form on its own site, with a multi-property worksheet for owners submitting ten or more properties at once. Updating a listing means resubmitting the form; the company uses the most recent submission in its database. CRS Temporary Housing starts with a landlord survey and then offers enrolment as a Preferred Housing Provider — that tier carries an annual fee and, per CRS, places properties at the top of placement search results with a verified badge. Sedgwick and Sinistar run their own equivalents.',
          'We handle the registrations, keep the profiles accurate, and — the part owners consistently neglect — keep availability current. A coordinator searching for a home within a few miles of a fire loss at 4pm on a Friday is not going to phone a landlord whose listing says available six weeks ago. Stale profiles are the single most common reason an otherwise good property never gets a call.',
        ],
      },
      {
        heading: 'What nobody can promise you',
        body: [
          'We would rather set this expectation properly than sell you a channel that disappoints. The coordinators themselves are admirably blunt about it, and we will quote them rather than paraphrase.',
          'ALE Solutions tells landlords plainly: "We are not able to predict where, or when, a policyholder loss will occur." CRS is equally direct: "CRS cannot guarantee the use of your property, as selections depend on the proximity of the damaged property, which varies greatly."',
          'That is the whole economics of this channel in two sentences. Placement is driven by geography — how close your property sits to a loss that has not happened yet. You cannot forecast it, you cannot market your way into it, and no manager can guarantee you a booking from it. Anyone who tells you otherwise is selling something.',
          'So treat insurance housing as upside on a calendar that already works, not as the plan. We build your property around a primary strategy — mid-term, corporate, travel healthcare, or short-term — and register it for ALE placements as an additional channel that occasionally pays very well. When a placement lands, it often lands for months and pays reliably, because the counterparty is a company under a policy. When it does not land, your calendar was never depending on it.',
        ],
      },
      {
        heading: 'What makes a property get selected',
        body: [
          'Since proximity to the loss dominates, metro coverage matters more than prestige. A modest three-bedroom in Tucker or Douglasville can be placed far more often than a beautiful condo in a submarket where losses are rare, simply because it sits near more housing stock.',
          'After proximity, the filters that decide placements are practical. Whole homes beat shared or partial units — a displaced family needs to live together. Pet-friendly is close to decisive; households do not surrender their animals because their house flooded, and refusing pets removes you from a large share of searches. Accessible units are chronically short and get placed quickly. Bedroom count needs to match a family rather than a solo traveller.',
          'Availability behaviour matters as much as the property. Losses do not schedule themselves, so short-notice availability — sometimes same-day — is a genuine advantage. So is flexibility on the end date, because repairs almost always run longer than the first estimate, and a coordinator remembers the landlord who extended without drama.',
          'Finally, condition. A family that has just lost their home to a fire is being placed into your property on the worst week of their year. Clean, complete, functional, and calm is the standard. It is also, not coincidentally, the standard that gets you called again.',
        ],
      },
      {
        heading: 'The commercial terms are different',
        body: [
          'An ALE placement is a business-to-business transaction wearing a residential costume. The payer is a coordinator or a carrier, so expect vendor onboarding, a W-9, possibly a certificate of insurance, and invoicing on the placing company’s terms rather than a card charged at booking.',
          'Extensions are the norm rather than the exception, and they frequently arrive late — a contractor finds asbestos, a permit takes an extra month, a supplier is behind. An agreement with no built-in extension mechanism turns a routine renewal into a negotiation. We write extension terms in up front.',
          'The tenancy questions still apply, and they apply harder because the stays are long. Georgia sets no bright-line day count at which a guest becomes a tenant; the state Landlord-Tenant Handbook says an extended stay guest could become a tenant based on an express agreement or conduct of the parties. Self-help eviction is illegal in Georgia regardless. And once you engage a management agent, Georgia requires security deposits to be held in escrow or covered by bond, with a complete signed list of existing damage given before the deposit is accepted. We operate to that standard on every placement.',
          'The last difference is human rather than legal. The occupants are not on holiday. They have lost their home, they are dealing with an adjuster, and they may be in your property for six months. The communication style that suits a weekend guest is wrong here. We keep it calm, responsive, and low-touch, and we route commercial questions to the coordinator rather than to the family.',
        ],
      },
      {
        heading: 'How we run an insurance placement',
        body: [
          'Before anything else, we tell you whether this is worth doing for your property. If your home is a one-bedroom high-rise condo in a building with restrictive access rules, ALE placement is unlikely to be your channel and we will say so.',
          'If it is a fit, we register the property with the coordinators, build the profiles properly, and keep availability live. We handle the vendor paperwork, negotiate the placement terms, and paper the stay with a written agreement that has an extension path in it. Deposits go into compliant handling and move-in starts with a photographed, signed condition list.',
          'During the stay we run the property the way any long occupancy should be run: scheduled maintenance response, mid-stay service where appropriate, and a single point of contact. We manage the invoice cycle with the coordinator so payment does not drift, and we handle extension requests before the end date arrives.',
          'Our management fee is a percentage of collected rent, set against your property, its size and scope, and your market, and it is quoted up front, in writing, before you sign anything.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How do I get my property used for insurance housing?',
        a: 'You register directly with the third-party housing coordinators that carriers use to place displaced policyholders — companies such as ALE Solutions, CRS Temporary Housing, Sedgwick, and Sinistar. Each maintains its own landlord database with its own registration form. If you are not in those databases you are invisible to the channel. We handle the registrations, build the profiles, and keep availability current, which is the part owners most often let slip.',
      },
      {
        q: 'Can you guarantee my property will get insurance placements?',
        a: 'No, and neither can anyone else. The coordinators say so themselves. ALE Solutions tells landlords: "We are not able to predict where, or when, a policyholder loss will occur." CRS says: "CRS cannot guarantee the use of your property, as selections depend on the proximity of the damaged property, which varies greatly." Placements follow losses, and losses are unpredictable. Treat this as a valuable additional channel on a calendar that already works, not as a business plan.',
      },
      {
        q: 'Who actually pays the rent — the family or the insurer?',
        a: 'In the common case, neither directly. You contract with and invoice the third-party housing coordinator, who is engaged by the carrier under the policyholder’s additional living expense cover. That means a commercial counterparty, vendor onboarding, a W-9, sometimes a certificate of insurance, and payment on the placing company’s terms rather than a card at booking. A smaller share of placements are arranged directly by the policyholder, who is not obliged to use the carrier’s vendor — those look like an ordinary direct mid-term booking from your side.',
      },
      {
        q: 'Do I need a short-term rental licence for ALE housing in Atlanta?',
        a: 'Not for stays of 30 consecutive days or longer. Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, and displacement placements almost always run well past that. Outside the City of Atlanta, the local jurisdiction writes its own rules and we confirm the position for your address during onboarding.',
      },
      {
        q: 'What kind of property gets selected most often?',
        a: 'Proximity to the loss dominates everything, so ordinary homes across the metro get placed more often than prestige properties in low-loss submarkets. After that: whole homes rather than shared units, pet-friendly, accessible where possible, bedroom counts that suit a family, genuine short-notice availability, and flexibility on the end date, because repairs routinely run longer than the first estimate.',
      },
      {
        q: 'Do the coordinators charge landlords a fee?',
        a: 'It varies by company and you should read each one’s terms rather than assume. CRS, for example, offers an annual Preferred Housing Provider enrolment that places properties at the top of placement search results with a verified badge. Registration itself is generally free. We will walk you through what each coordinator asks for and what it actually buys before you pay anything.',
      },
      {
        q: 'How long do insurance placements usually last?',
        a: 'Longer than most owners expect, and longer than the first estimate. A displaced household stays until their home is repaired, which is governed by contractors, permits, and supply chains rather than by a planned end date. Extensions are the norm. That is genuinely good for an owner — a placement that runs for months with no turnover cost is one of the more profitable outcomes in mid-term — but only if the agreement was written with an extension path in it from the start.',
      },
    ],

    sources: [
      {
        claim:
          'ALE Solutions states to landlords: "We are not able to predict where, or when, a policyholder loss will occur." Landlords register via a form on the ALE Solutions site, with a multi-property worksheet for ten or more properties; the most recent submission is used.',
        publisher: 'ALE Solutions',
        url: 'https://www.alesolutions.com/landlord-faq/',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'CRS Temporary Housing states: "CRS cannot guarantee the use of your property, as selections depend on the proximity of the damaged property, which varies greatly." CRS offers a paid annual Preferred Housing Provider enrolment that places properties at the top of placement search results with a verified badge.',
        publisher: 'CRS Temporary Housing',
        url: 'https://crsth.com/landlords/',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Policyholders are not required to accept the insurance carrier’s chosen temporary-housing vendor and may arrange their own accommodation for reimbursement.',
        publisher: 'United Policyholders',
        url: 'https://uphelp.org/',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; a single licence covers the primary residence and one additional dwelling, enforced since 5 March 2023.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'An extended stay guest could become a tenant based on an express agreement or conduct of the parties; self-help eviction is illegal in Georgia. Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
    ],

    marketCities: [
      'atlanta',
      'decatur',
      'avondale-estates',
      'brookhaven',
      'chamblee',
      'doraville',
      'tucker',
      'clarkston',
      'stone-mountain',
      'lithonia',
      'stonecrest',
      'conyers',
      'sandy-springs',
      'dunwoody',
      'roswell',
      'alpharetta',
      'duluth',
      'norcross',
      'peachtree-corners',
      'lawrenceville',
      'snellville',
      'lilburn',
      'smyrna',
      'vinings',
      'mableton',
      'austell',
      'marietta',
      'kennesaw',
      'acworth',
      'douglasville',
      'lithia-springs',
      'east-point',
      'college-park',
      'jonesboro',
      'stockbridge',
    ],
    relatedResources: [
      'mid-term-rentals-atlanta',
      'furnished-rentals-atlanta',
      'corporate-housing-atlanta',
      'short-term-rental-insurance-atlanta',
      'airbnb-damage-and-aircover',
    ],
    relatedServices: [
      'mid-term-rental-management',
      'corporate-housing-management',
      'travel-nurse-housing',
      'film-production-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'ownerHandshake',
    published: true,
    order: 4,
  },

  // ---------------------------------------------------------------------------
  // 5. FILM & PRODUCTION HOUSING
  // ---------------------------------------------------------------------------
  {
    slug: 'film-production-housing',
    name: 'Film & Production Housing',
    category: 'mid-term',
    headlineKeyword: 'Film & Production Crew Housing in Atlanta',
    eyebrow: 'Film & Production',
    tagline: 'Crew housing near the stages — and your home as a filming location.',
    seoTitle: 'Film & Production Crew Housing Management in Atlanta',
    seoDescription:
      'Crew housing near Assembly, Trilith and Tyler Perry Studios, plus honest guidance on listing your own home as a Georgia filming location.',
    intro:
      'Georgia’s production industry creates two separate opportunities for a property owner: housing the crew, and renting the house itself as a location. They are different businesses with different rules, and we are straight with you about which parts we can and cannot do for you.',

    forWhom: [
      'Owners near the Doraville, Fayetteville, and southwest Atlanta studio corridors who can take crew on a production schedule.',
      'Investors with several comparable units who can absorb a block booking for a department.',
      'Owners of distinctive, camera-friendly homes considering listing the property itself as a filming location.',
      'Owners who can tolerate late-night arrivals, pre-dawn calls, and a schedule that moves without much notice.',
      'Owners who want a commercial counterparty — a production company — rather than a consumer booking.',
    ],

    included: [
      'Positioning against the actual stage and location corridors rather than generic "near Atlanta" marketing.',
      'Furnishing and equipment specification for crew working long, irregular hours.',
      'Block-booking coordination across multiple comparable units for a single department or production.',
      'Direct outreach and listing to production coordinators, travel coordinators, and crew housing desks.',
      'Fast-turnaround availability responses, because production decisions are made in hours, not weeks.',
      'W-9, certificate of insurance, and vendor onboarding paperwork for production-company counterparties.',
      'Invoicing to the production company on its terms, with collections follow-up.',
      'Occupancy agreements with extension and early-termination mechanics matched to a shooting schedule.',
      'Security-deposit handling that meets the Georgia escrow-or-bond rule that applies once a management agent is engaged.',
      'Photographed, signed condition records at move-in and move-out on every unit.',
      'Location-day support if your home is used for filming: preparation, scheduling, on-site presence, and restoration checks.',
      'Owner statements, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'The market, sized honestly',
        body: [
          'Georgia’s production industry is large and stable. In fiscal year 2026, the Georgia Department of Economic Development reported $2 billion in direct spending across 280 productions — 13 feature films, 77 independent films, 130 television and episodic productions, and 54 commercials. Independent film was up 83 percent year over year.',
          'We are going to resist the word "booming," because it would not be accurate. Georgia’s peak spending years were higher than this, and the honest framing is that the industry has settled into a steady base of roughly $2 billion across a wide spread of productions rather than a single blockbuster cycle. Steady is arguably better for a housing owner than a spike: 280 productions in a year is a lot of separate crews needing beds, and a base of 130 episodic shows produces returning seasons rather than one-off visits.',
          'The infrastructure underneath it is the reason it holds. Georgia has more than 4 million square feet of stage space and a film tax credit of up to 30 percent on eligible production expenses, with no annual cap and no sunset — which is why the productions keep coming back rather than chasing the next state.',
          'For an owner, that translates into two distinct opportunities. Housing the people who make the shows, and renting the property itself as a place to shoot. They pay differently, they carry different risks, and the rules that govern them are not the same.',
        ],
      },
      {
        heading: 'Where the crews actually sleep',
        body: [
          'Crew housing follows the stage and the location, not the skyline. A gaffer working out of a Doraville stage at a 6am call is not going to live in Alpharetta.',
          'Assembly Studios in Doraville anchors the northeast corridor, pulling housing demand into Doraville, Chamblee, Brookhaven, Norcross, Peachtree Corners, and Tucker. Trilith Studios in Fayetteville anchors the south metro, drawing from Fayetteville, Peachtree City, Newnan, Fairburn, and Union City. Tyler Perry Studios on the former Fort McPherson site anchors southwest Atlanta and the East Point and College Park corridor.',
          'Location shoots pull crews further out. Covington and Senoia have hosted enough production over the years to have their own local crew-housing patterns, and a location-heavy shoot can move a unit crew into a small town for weeks.',
          'The decision-maker is a production coordinator, a travel coordinator, or a housing coordinator working against a locked schedule. They need availability answers in hours, they want multiple comparable units rather than a single hero property, and they will remember a property manager who answered quickly far longer than they will remember your backsplash.',
        ],
      },
      {
        heading: 'What production housing demands that other guests do not',
        body: [
          'The operational profile is unusual, and it is worth understanding before you pursue it.',
          'Block bookings are common: a department may need four to ten comparable units in one area, arriving together and leaving together. Being able to serve that as a coordinated block, rather than as one unit among many, is what gets you the call.',
          'The hours are brutal and unavoidable. Crew arrive at midnight and leave at 4:30am. That means self-check-in that genuinely works in the dark, parking that does not require negotiation, and neighbours who have been prepared for a household on a strange schedule. In-unit laundry is close to essential — crew wash constantly and nobody is going to a laundromat after a fourteen-hour day.',
          'And the schedule moves. Shoots extend, shift, relocate, and occasionally cancel. An agreement with rigid dates and no flex clause produces a dispute; an agreement that anticipates a two-week extension or an early wrap produces a repeat customer. On the commercial side, expect to invoice a production company on net terms, with a W-9 and often a certificate of insurance, rather than take a card at booking.',
        ],
      },
      {
        heading: 'Renting your home as a filming location — the honest walkthrough',
        body: [
          'This is where we have to tell you something that costs us work, because it is true and you would find out anyway. The Georgia Film Office maintains the state’s location database, and its submission rules are explicit: only property owners may submit private residences, and submissions from realtors or agents will not be considered. We are licensed Georgia real estate professionals. That means we cannot submit your home to the state location database on your behalf, full stop. Any management company telling you they will list your house with the Georgia Film Office is either not reading the rules or not telling you the truth.',
          'So here is how you do it yourself, which takes about an evening. Gather your images first — 10 to 20 photographs are ideal, at 150 dpi or higher, at a minimum resolution of 1680 by 1054, ideally between 1 and 3 MB each. Shoot every room, both approaches to the house, the street view, the garden, and any distinctive feature. Then submit through the Georgia Film Office location listing page yourself, as the owner.',
          'Two things to know before you press send. Once a listing is approved it cannot be edited — if the property changes significantly you have to submit an entirely new listing, so get the photographs right the first time. And the Film Office does not advise on location fees; those vary from project to project and the production makes an offer against its own budget. There is no published rate card, and anyone quoting you one is guessing.',
          'What we can do is everything either side of that submission: get the property genuinely camera-ready, tell you honestly whether it has the features productions look for, coordinate the shoot day, protect the asset while it happens, and keep your rental calendar clean around it.',
        ],
      },
      {
        heading: 'Protecting the asset on a location shoot',
        body: [
          'A filming day is a commercial use of your property by a large crew with heavy equipment. It is not a guest stay, and it should not be papered like one.',
          'Before anyone arrives: a full photographic condition record, room by room, including floors, walls, thresholds, and any fragile or valuable item. A written location agreement with the production company covering dates, hours, permitted areas, crew and vehicle numbers, and what happens if the shoot overruns. A certificate of insurance from the production naming you. And a clear, written schedule for anything the production wants to change — paint, fixtures, wall hangings, landscaping — together with an explicit restoration obligation and a date by which it must be complete.',
          'On the day: someone present who represents your interests, a defined area that is off-limits, protection down on floors and thresholds, and a note of any deviation from the agreed plan as it happens rather than after.',
          'Afterwards: a matching photographic record, a walkthrough against the original condition list, and restoration signed off before the final invoice is settled. Also worth planning for: parking and neighbour communication, which is the single most common source of friction on a residential location shoot, and something a good manager sorts out a week in advance rather than on the morning. And one practical note we will repeat every time — your standard homeowner’s or rental policy is unlikely to contemplate a commercial film shoot, so speak to your broker before you agree to one. We do not place insurance and we will not tell you that you are covered.',
        ],
      },
      {
        heading: 'How we run production housing',
        body: [
          'We position the property against a real corridor — Assembly, Trilith, Tyler Perry, or the location markets — rather than marketing it vaguely to "the Atlanta film industry." Coordinators filter on drive time to a stage or a base camp, so a precise, honest position beats a broad one.',
          'Then: furnishing to spec for crew hours, fast availability responses, block coordination across multiple units where the inventory allows it, direct relationships with coordinators, and the commercial paperwork handled so a production’s accounts department can pay you without chasing.',
          'During the stay we run the property for irregular hours: quiet, reliable access, responsive maintenance, and scheduled service that works around a shooting calendar. Between stays we turn units quickly, because production timelines rarely leave a comfortable gap.',
          'Agreements are written with the extension and early-wrap mechanics a production schedule actually requires, deposits are handled to the Georgia escrow standard that applies once a management agent is engaged, and every unit gets a photographed, signed condition record at both ends. Our fee is a percentage of collected rent, set against your property, its size and scope, and your market — quoted up front, in writing, before you sign anything.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How big is the film industry in Georgia right now?',
        a: 'Steady rather than surging, and that is a fair thing for an owner to plan around. The Georgia Department of Economic Development reported $2 billion in direct spending across 280 productions in fiscal year 2026 — 13 feature films, 77 independent films, 130 television and episodic productions, and 54 commercials, with independent film up 83 percent year over year. Georgia has more than 4 million square feet of stage space and a film tax credit of up to 30 percent with no annual cap, which is why productions keep returning. Peak years were higher than this; a steady $2 billion across 280 separate productions is the defensible framing.',
      },
      {
        q: 'Can ATLStay list my house with the Georgia Film Office as a location?',
        a: 'No, and no other management company or agent can either. The Georgia Film Office is explicit: only property owners may submit private residences, and submissions from realtors or agents will not be considered. We are licensed Georgia real estate professionals, so we are squarely inside that exclusion. What we can do is get the property camera-ready, tell you honestly whether it has what productions look for, walk you through submitting it yourself, and then coordinate and protect the shoot day when work comes in.',
      },
      {
        q: 'How do I submit my home as a filming location?',
        a: 'You submit it yourself through the Georgia Film Office location listing page, as the owner. Prepare 10 to 20 photographs at 150 dpi or higher, at a minimum resolution of 1680 by 1054, ideally 1 to 3 MB each — cover every room, both approaches, the street view, and any distinctive feature. Get them right first time, because once a listing is approved it cannot be edited; a significant change to the property means submitting a new listing entirely.',
      },
      {
        q: 'What should I charge for a filming day?',
        a: 'There is no published rate card, and we will not invent one for you. The Georgia Film Office states plainly that it does not advise on location fees, which vary from project to project. In practice the production makes an offer against its own budget and shooting needs, and the number depends on the property, the number of days, the size of the crew, and how much disruption the shoot involves. Judge each offer against the disruption and the risk rather than against a number you read somewhere.',
      },
      {
        q: 'Which parts of metro Atlanta have the most crew housing demand?',
        a: 'Follow the stages. Assembly Studios in Doraville anchors the northeast corridor and pulls demand into Doraville, Chamblee, Brookhaven, Norcross, Peachtree Corners, and Tucker. Trilith Studios in Fayetteville anchors the south metro across Fayetteville, Peachtree City, Newnan, Fairburn, and Union City. Tyler Perry Studios on the former Fort McPherson site anchors southwest Atlanta, East Point, and College Park. Location-heavy shoots also move crews into Covington, Senoia, and other production-friendly towns for weeks at a time.',
      },
      {
        q: 'Do I need a short-term rental licence for crew housing?',
        a: 'Not for stays of 30 consecutive days or longer. Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, so a 30-plus-day crew stay sits outside the licence requirement and the two-dwelling cap. Shorter crew stays are short-term rentals and are subject to the licence and the cap. Outside the City of Atlanta, the local jurisdiction sets its own rules. A filming day is a different matter again — that is a commercial use of the property, so speak to your insurance broker first.',
      },
      {
        q: 'Can you handle a block booking for a whole department?',
        a: 'Yes, and it is one of the better ways to serve this market. Productions frequently need four to ten comparable units in one area, arriving and departing together. We coordinate the block across multiple owners where needed, keep the units consistent so the coordinator is not managing variations, run a single invoicing relationship with the production company, and hold the schedule together when the shooting calendar moves.',
      },
    ],

    sources: [
      {
        claim:
          'Georgia fiscal year 2026 production: $2 billion in direct spending across 280 productions — 13 feature films, 77 independent films, 130 television and episodic productions, and 54 commercials; independent film up 83 percent year over year.',
        publisher: 'Georgia Department of Economic Development',
        url: 'https://georgia.org/blogs/georgia-productions-remain-steady-competition-heats',
        asOf: '30 July 2026',
      },
      {
        claim:
          'Georgia has more than 4 million square feet of stage space and offers a film tax credit of up to 30 percent on eligible production expenses, with no annual cap and no sunset.',
        publisher: 'Georgia Department of Economic Development — Georgia Film Office',
        url: 'https://georgia.org/industries/film-entertainment/georgia-film-tv-production',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Georgia Film Office location database: 10 to 20 photographs are ideal, at 150 dpi or higher and a minimum resolution of 1680 by 1054, ideally 1 to 3 MB each. "Only property owners may submit private residences; submissions from realtors or agents will not be considered." Once approved, the listing cannot be edited. The Film Office does not advise on location fees, which vary from project to project.',
        publisher: 'Georgia Department of Economic Development — Georgia Film Office',
        url: 'https://georgia.org/industries/film-entertainment/georgia-film-tv-production/list-your-property-as-a-film-location',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; a single licence covers the primary residence and one additional dwelling, enforced since 5 March 2023.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
    ],

    marketCities: [
      'atlanta',
      'doraville',
      'chamblee',
      'brookhaven',
      'dunwoody',
      'norcross',
      'peachtree-corners',
      'duluth',
      'tucker',
      'decatur',
      'smyrna',
      'vinings',
      'marietta',
      'sandy-springs',
      'fayetteville',
      'peachtree-city',
      'senoia',
      'newnan',
      'fairburn',
      'union-city',
      'college-park',
      'hapeville',
      'east-point',
      'douglasville',
      'covington',
    ],
    relatedResources: [
      'film-crew-housing-atlanta',
      'mid-term-rentals-atlanta',
      'corporate-housing-atlanta',
      'furnished-rentals-atlanta',
      'luxury-airbnb-management-atlanta',
    ],
    relatedServices: [
      'mid-term-rental-management',
      'corporate-housing-management',
      'insurance-housing',
      'travel-nurse-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'photography',
    published: true,
    order: 5,
  },

  // ---------------------------------------------------------------------------
  // 6. STUDENT / ACADEMIC HOUSING — written around the profitable slice
  // ---------------------------------------------------------------------------
  {
    slug: 'student-housing',
    name: 'Student & Academic Housing',
    category: 'mid-term',
    headlineKeyword: 'University-Adjacent Housing Management in Atlanta',
    eyebrow: 'Academic & Medical',
    tagline: 'Residents, fellows, postdocs and grad students — the part of university housing that pays.',
    seoTitle: 'Housing for Med Residents & Grad Students in Atlanta',
    seoDescription:
      'The profitable slice of university housing is residents, fellows, postdocs and grad students. We furnish, lease and manage those stays across Atlanta.',
    intro:
      'Undergraduate student housing is a hard business to win as a single-home owner. The money in university-adjacent property is in the people who arrive furnished-and-funded on a programme calendar: medical residents, fellows, visiting faculty, postdocs, graduate students, and summer interns.',

    forWhom: [
      'Owners near the Clifton Road medical corridor, Grady, or Children’s in Brookhaven, where residents and fellows rotate on fixed calendars.',
      'Owners of one- and two-bedroom homes suited to a single professional or a couple rather than a roommate group.',
      'Owners near Georgia Tech, Georgia State, Emory, Agnes Scott, Oglethorpe, Kennesaw State, or the Perimeter campuses who want an academic tenant without an undergraduate lease cycle.',
      'Owners who want a low-wear tenant with institutional or stipend-backed income and a documented end date.',
      'Owners who have been told to buy near a campus for undergraduate demand and want an honest second opinion first.',
    ],

    included: [
      'A straight assessment of whether your property should chase academic demand at all, before you spend anything.',
      'Positioning against a specific institution and calendar rather than a vague "near campus" claim.',
      'Furnishing specification for someone arriving with two suitcases and no car full of furniture.',
      'Listing on Furnished Finder, the monthly platform channels, and direct enquiry, plus outreach to institutional housing offices where they accept private listings.',
      'Lease terms cut to a rotation, an appointment, or a summer internship rather than to a generic 30-day booking.',
      'Screening: institutional affiliation, appointment or offer letter, and stated occupancy.',
      'Written occupancy agreements with defined end dates and documented renewal mechanics.',
      'Security-deposit handling that meets the Georgia escrow-or-bond rule that applies once a management agent is engaged.',
      'Photographed, signed move-in condition list and a matching move-out inspection.',
      'Turnover management between appointments, timed to programme start dates rather than to weekends.',
      'Occupancy and zoning guidance so a roommate arrangement does not quietly breach the code.',
      'Owner statements, and a management fee quoted up front, in writing, before you sign anything.',
    ],

    sections: [
      {
        heading: 'The honest read on undergraduate student housing',
        body: [
          'The numbers look irresistible at first glance. Georgia Tech’s own Common Data Set for 2025-2026 reports 21,028 undergraduates, and 70 percent of degree-seeking undergraduates living off campus or commuting in Fall 2025. Tens of thousands of students needing somewhere to live, right next to your property.',
          'It is a much worse business than it looks for a single-home owner. Undergraduate housing near a large campus is dominated by purpose-built operators who lease by the bed, take a parent guarantee on every bed, sign twelve-month leases in the autumn for the following August, and amortise their marketing and turnover across hundreds of units. You cannot price against that with one house, and you cannot match their leasing calendar without carrying vacancy risk they simply do not have.',
          'Be careful with headline enrolment figures too. Georgia Tech’s grand total across all levels is 56,715 students, but that number is heavily inflated by large online master’s programmes whose students never move to Atlanta. Underwriting a property purchase on it would be a serious mistake, and you will see it quoted uncritically in a lot of investment content.',
          'One more number worth sitting with: Georgia Tech’s own published cost-of-attendance allowance for housing alone, for a student living off campus, is $12,084 for the year — roughly $1,007 a month spread across twelve months, and undergraduates routinely split that between roommates. That is the budget you would actually be competing for. It is not a premium market.',
        ],
      },
      {
        heading: 'The slice that actually pays',
        body: [
          'The profitable version of university-adjacent housing is not undergraduates. It is the professional and postgraduate population that moves to Atlanta on a programme calendar.',
          'Medical residents and fellows relocating for training. Medical, nursing, and allied-health students on clinical rotations of one to three months. Visiting faculty on semester or year appointments. Postdoctoral researchers. Funded graduate students. Summer interns placed by companies and research programmes. Each of them shares a set of characteristics that make them an excellent mid-term tenant.',
          'They arrive furnished-and-funded: institutional salary, stipend, or employer support, so the income is verifiable and the payment is reliable. They arrive with two suitcases, so a furnished home is a requirement rather than a preference and they will pay for it. They occupy as a single person or a couple, not as a six-person roommate group, so wear is low and disputes are rare. Their end date is written on an appointment letter before they even look for housing. And they are, almost without exception, quiet tenants who work long hours somewhere else.',
          'They are, in other words, mid-term tenants who happen to be affiliated with a university. That is how we market and manage them — and it is why this page is really about residents, fellows, and postdocs rather than about freshers.',
        ],
      },
      {
        heading: 'Where this demand sits in Atlanta',
        body: [
          'The medical corridor is the deepest pool by a wide margin. Emory University Hospital sits at 1364 Clifton Rd NE and is a teaching hospital whose medical staff are faculty at Emory University School of Medicine, which means a continuous flow of residents, fellows, and rotating students into the Clifton Road corridor. The CDC’s Roybal campus sits on the same road and brings its own research and fellowship population. Grady anchors downtown teaching and trauma training. Children’s Healthcare of Atlanta’s Arthur M. Blank Hospital, which opened on 29 September 2024 with 446 licensed beds at I-85 and North Druid Hills Road, has added a substantial paediatric training population to the Brookhaven catchment.',
          'Here is the local insight that matters when you are matching a trainee to a property: Atlanta residency programmes commonly rotate their trainees between several of these sites over a single year. A resident may spend one block at Emory, the next at Grady, and the next at Children’s. So the property that wins is not necessarily the one closest to a single hospital — it is the one with a tolerable commute to two or three of them. Decatur, Druid Hills, Avondale Estates, Brookhaven, and Chamblee do this unusually well.',
          'The academic institutions layer on top. Georgia Tech and Georgia State anchor Midtown and Downtown. Emory’s main campus sits in Druid Hills. Agnes Scott and Columbia Theological are in Decatur. Oglethorpe is in Brookhaven. Georgia State’s Perimeter campuses reach into Dunwoody and Clarkston. Kennesaw State runs campuses in Kennesaw and Marietta. And the University of Georgia in Athens carries its own graduate, medical-partnership, and visiting-faculty demand outside the metro.',
        ],
      },
      {
        heading: 'The calendar is the whole game',
        body: [
          'Academic and clinical demand is not a demand curve; it is a timetable. If you price and open your calendar to it, you fill. If you ignore it, you sit empty in the exact weeks the market was buying.',
          'Clinical rotations typically start at the beginning of a month and run in blocks of four, eight, or twelve weeks. Residency intern years begin in late June across most programmes, which produces a concentrated relocation window in the weeks before it and a matching wave of departures. Fellowships generally follow the same July start. Postdoctoral and visiting-faculty appointments track semester boundaries. Summer internships run roughly mid-May to mid-August and are booked in the spring.',
          'That gives you a small number of very predictable dates each year to be available, priced, and listed. A property offered from late June with a twelve-month term is a completely different asset from one offered mid-May for a fourteen-week summer let — different tenant, different rate, different marketing.',
          'The other consequence is that turnovers can be planned rather than reacted to. We schedule cleaning, maintenance, and re-listing around programme start dates so a departure and an arrival meet cleanly instead of leaving a three-week hole in July.',
        ],
      },
      {
        heading: 'Occupancy limits and the roommate question',
        body: [
          'Owners regularly ask whether they should rent a four-bedroom house by the room to students. There are two reasons we usually advise against it, one legal and one practical.',
          'The legal one: City of Atlanta zoning limits how many unrelated people may occupy a dwelling as a single "family." The current provision, Sec. 16-29.001(10)(b), states that no such family shall contain over six persons. Verify the current text before you plan around it — the city’s proposed Zoning 2.0 rewrite would reduce that limit, and it had not been adopted as of mid-2026. A by-the-bed plan built on today’s number could become non-compliant, and the risk sits with the owner.',
          'The practical one: a roommate-group lease multiplies everything that goes wrong. Joint-and-several liability is only useful if you are willing to pursue a twenty-two-year-old for their housemate’s rent. Turnover happens per bed rather than per house. Damage is harder to attribute at move-out. Common-area cleaning becomes a dispute. And your neighbours notice.',
          'A single professional tenant, or a couple, on a documented appointment produces a fraction of that management load at a comparable or better monthly rate. It is the quieter business, and it is usually the more profitable one.',
        ],
      },
      {
        heading: 'How we run an academic-market property',
        body: [
          'Furnishing assumes someone arriving by plane with two suitcases. Everything they need to live has to already be in the house: bed linen and towels, a working kitchen with real cookware, a genuine desk and task chair for someone writing up research or studying for boards, blackout in the bedroom for anyone on a clinical rota, and internet we have tested and documented.',
          'Lease terms are cut to the actual appointment rather than to a generic 30-day booking. A twelve-week rotation, a June-to-June residency year, and a mid-May-to-mid-August internship are three different agreements, and writing them as three different agreements is a large part of why this works.',
          'Distribution runs across Furnished Finder — whose landlord proposition is honestly stated as no commissions, no booking fees, just 30+ day stays, and which leaves the screening, lease, deposits, and collections entirely to you — plus the monthly platform channels, direct enquiry, and institutional housing offices where they accept private listings. Screening confirms the affiliation and the appointment letter.',
          'Deposits are handled to the Georgia standard that applies the moment you engage a management agent: escrow or bond, with a complete signed list of existing damage provided to the tenant before the deposit is accepted. Every stay starts and ends with a photographed condition record. Our fee is a percentage of collected rent, set against your property, its size and scope, and your market — quoted up front, in writing, before you sign anything.',
        ],
      },
    ],

    faqs: [
      {
        q: 'Should I buy a property near Georgia Tech to rent to undergraduates?',
        a: 'Probably not for that reason on its own. Purpose-built by-the-bed operators dominate undergraduate housing near large campuses: they lease per bed, take parent guarantees, sign twelve-month leases the autumn before, and spread costs across hundreds of units. Georgia Tech’s own published housing allowance for a student living off campus is $12,084 a year — about $1,007 a month before roommates split it — which tells you what budget you would be competing for. If the property also works for residents, fellows, postdocs, or visiting faculty, the purchase can make excellent sense. Buy it for that, not for freshers.',
      },
      {
        q: 'Georgia Tech has over 56,000 students. Isn’t that enormous demand?',
        a: 'Be careful with that number. Georgia Tech’s Common Data Set for 2025-2026 shows a grand total of 56,715 students, but that total is heavily inflated by large online master’s programmes whose students never relocate to Atlanta. The figure that describes local housing demand is 21,028 undergraduates, of whom 70 percent lived off campus or commuted in Fall 2025 — still a large market, and still one dominated by purpose-built operators. Do not underwrite a purchase on the headline enrolment.',
      },
      {
        q: 'Who is the ideal tenant in this market?',
        a: 'A medical resident, fellow, rotating clinical student, postdoc, visiting faculty member, funded graduate student, or summer intern. They have institutional or stipend-backed income, an appointment letter with a written end date, a need for a furnished home because they are arriving with two suitcases, single or couple occupancy rather than a roommate group, and long hours spent somewhere other than your property. They are mid-term tenants who happen to be affiliated with a university, and we market them that way.',
      },
      {
        q: 'When should my property be available?',
        a: 'Work backwards from the programme calendar. Residency and fellowship years begin in late June at most Atlanta programmes, producing a concentrated relocation window in the weeks before. Clinical rotations typically start at the beginning of a month in blocks of four, eight, or twelve weeks. Visiting faculty and postdoc appointments track semester boundaries. Summer internships run roughly mid-May to mid-August and are booked in the spring. Being priced, listed, and genuinely available on those dates matters more than almost anything else you can do.',
      },
      {
        q: 'Which Atlanta neighbourhoods work best for medical trainees?',
        a: 'The ones with a tolerable commute to more than one training site, because Atlanta residency programmes commonly rotate trainees between several hospitals across a single year. Emory University Hospital sits at 1364 Clifton Rd NE, Grady anchors downtown, and Children’s Arthur M. Blank Hospital opened in September 2024 at I-85 and North Druid Hills Road. Decatur, Druid Hills, Avondale Estates, Brookhaven, and Chamblee sit well between them. A property that only serves one campus is a narrower proposition than it looks.',
      },
      {
        q: 'Can I rent my house out by the room to students?',
        a: 'Legally you need to check the occupancy limit first, and practically we usually advise against it. City of Atlanta zoning limits the number of unrelated people who may occupy a dwelling as a single "family" — the current provision, Sec. 16-29.001(10)(b), states that no such family shall contain over six persons, and you should verify the current text because the proposed Zoning 2.0 rewrite would lower that limit and had not been adopted as of mid-2026. Beyond the code, by-the-bed letting multiplies turnover, complicates damage attribution at move-out, makes joint-and-several liability awkward to enforce, and tends to strain relations with neighbours.',
      },
      {
        q: 'Do I need an Atlanta short-term rental licence for academic tenants?',
        a: 'Not for stays of 30 consecutive days or longer. Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days, so a rotation, an academic year, or a summer internship let sits outside the licence requirement and outside the primary-residence-plus-one-dwelling cap. Outside the City of Atlanta, the local jurisdiction sets its own rules and we confirm the position for your address during onboarding.',
      },
    ],

    sources: [
      {
        claim:
          'Georgia Tech reported 21,028 total undergraduates, with 70 percent of degree-seeking undergraduates living off campus or commuting in Fall 2025. Grand total enrolment across all levels was 56,715, a figure inflated by large online master’s programmes. The published housing-only cost allowance for a student living off campus is $12,084 for the year.',
        publisher: 'Georgia Institute of Technology — Common Data Set 2025-2026',
        url: 'https://irp.gatech.edu/common-data-set',
        asOf: 'Common Data Set 2025-2026',
      },
      {
        claim:
          'Emory University Hospital is located at 1364 Clifton Rd NE, Atlanta, and is a teaching hospital whose medical staff are faculty at Emory University School of Medicine.',
        publisher: 'Emory Healthcare',
        url: 'https://www.emoryhealthcare.org/locations/hospitals/emory-university-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          "Children's Healthcare of Atlanta's Arthur M. Blank Hospital opened on 29 September 2024 with 446 licensed beds, at the corner of I-85 and North Druid Hills Road in Atlanta.",
        publisher: "Children's Healthcare of Atlanta",
        url: 'https://www.choa.org/locations/arthur-m-blank-hospital',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'City of Atlanta zoning, Sec. 16-29.001(10)(b): where a "family" consists of unrelated persons, no such family shall contain over six persons. The city’s proposed Zoning 2.0 rewrite would reduce this figure and had not been adopted as of mid-2026 — verify the current text before relying on it.',
        publisher: 'Municode Library — City of Atlanta Code of Ordinances',
        url: 'https://library.municode.com/ga/atlanta/codes/code_of_ordinances',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Atlanta ordinance 20-O-1656 defines a short-term rental as lodging for a period of time not to exceed 30 consecutive days; a single licence covers the primary residence and one additional dwelling, enforced since 5 March 2023.',
        publisher: 'City of Atlanta (ATL311)',
        url: 'https://www.atl311.com/en-us/knowledgearticle/?code=KB0013809',
        asOf: 'Verified August 2026',
      },
      {
        claim:
          'Landlords who own more than ten rental units, or who contract with a management agent, must hold security deposits in escrow or post bond and provide a signed list of existing damage before accepting the deposit.',
        publisher: 'Georgia Department of Community Affairs — Georgia Landlord-Tenant Handbook (revised 29 August 2024)',
        url: 'https://dca.georgia.gov/georgia-landlord-tenant-handbook',
        asOf: 'Revised 29 August 2024',
      },
      {
        claim: 'Furnished Finder markets its landlord product as "No commissions. No booking fees. Just 30+ day stays."',
        publisher: 'Furnished Finder',
        url: 'https://www.furnishedfinder.com/list-your-property',
        asOf: 'Verified August 2026',
      },
    ],

    marketCities: [
      'atlanta',
      'decatur',
      'avondale-estates',
      'brookhaven',
      'chamblee',
      'clarkston',
      'tucker',
      'dunwoody',
      'sandy-springs',
      'doraville',
      'smyrna',
      'marietta',
      'kennesaw',
      'athens',
    ],
    relatedResources: [
      'mid-term-rentals-atlanta',
      'furnished-rentals-atlanta',
      'traveling-nurse-housing-atlanta',
      'airbnb-vs-furnished-finder-midterm',
      'airbnb-vs-long-term-rental-atlanta',
    ],
    relatedServices: [
      'mid-term-rental-management',
      'travel-nurse-housing',
      'corporate-housing-management',
      'insurance-housing',
      'long-term-rental-management',
      'tenant-placement',
    ],
    heroImageKey: 'metroAtlanta',
    published: true,
    order: 6,
  },
];
