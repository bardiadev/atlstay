import type { ServiceNotes } from './types';

// Commercial, multi-family, investor and HOA local notes.
//
// PARTIAL BY DESIGN. The batch that was researching the remaining ~100
// combinations died on a session API limit before drafting, so this file
// carries only the entries whose facts were fully verified against a primary
// source. Everything here is quoted or paraphrased from an adopted
// comprehensive plan, a codified ordinance, a court's own page, or a city's own
// economic-development data — never from an aggregator and never from memory.
//
// Deliberately absent: Duluth, Suwanee, Marietta, Braselton, Cumming and the
// rest. Their research never completed, and a padded entry is worse than none
// (see ./types.ts). Add them when the facts exist, not before.
//
// Two corrections worth preserving for whoever extends this:
//  - "Technology Corridor" is NOT Alpharetta's own phrase. The city says
//    "Technology City of the South". Do not put the former in its mouth.
//  - MARTA rail does not reach North Fulton, but MARTA BUS routes 185, 140, 85,
//    87 and 312 do serve Alpharetta and feed North Springs station. "No MARTA
//    service in North Fulton" is false; "no MARTA rail" is true.

export const commercialNotes: ServiceNotes = {
  // ---------------------------------------------------------------- commercial
  'commercial-property-management:johns-creek':
    [
      'Johns Creek commercial property is concentrated, not scattered. The city\'s adopted 2023 Comprehensive Plan Update puts Technology Park at "more than 10,000 employees" across "nearly six million square feet of developed office and industrial space," naming Alcon, Ebix, Nordson, Bomgar, Teradata and PerkinElmer among its tenants, alongside Emory Johns Creek Hospital. Most of the city\'s roughly 28,166 jobs sit there or along SR 141 / Medlock Bridge Road.',
      'The plan is candid about what happened to the office market. Inventory fell from about 3.2 million square feet to roughly 2.8 million with the demolition of the 342,088 square foot State Farm building, after State Farm consolidated to Dunwoody and took 1,200 jobs with it. What remains is tighter than the headline suggests: office vacancy of 10.4 percent, described as a ten-year low, market rent around $25.33 per square foot, and Class A vacancy of just 4.5 percent across 14 buildings, most of them in Tech Park. Industrial is tighter still — 444,383 square feet across three buildings at zero percent vacancy.',
      'One local rule catches out-of-market owners. The city\'s occupation tax ordinance reaches any business that "owns personal or real property which generates income and which is located in the City of Johns Creek," even where the business has no Georgia location. That is a filing obligation attached to the asset, not to a storefront, and it is the sort of thing an owner discovers late if nobody local is watching the calendar.',
    ],

  'commercial-property-management:alpharetta':
    [
      'Alpharetta is a genuine employment center rather than a bedroom suburb, and the numbers the city publishes make the case. Its economic development office reports 5,117 businesses and 107,342 employees, against a resident population of 66,684 and a daytime population of 123,575. More people work in Alpharetta than live there, and that inversion is what supports the office and retail inventory: over 20 million square feet of office space and over 14 million square feet of retail by the city\'s own count.',
      'The tenant base is unusually concentrated in a handful of large employers. Drawing on city business licence data from May 2026, the largest are Fiserv at 2,087 employees, ADP at 2,074, Verizon at 1,928, Equifax at 1,722, Jackson Healthcare at 1,235 and Morgan Stanley at 1,225. The city counts roughly 700 tech-driven businesses and over 11,000 professionals in computer and mathematical roles. Note the city\'s own language is "Technology City of the South" — there is no formally designated technology corridor, whatever the listing sites say.',
      'North Point is the piece to watch. The mall alone carries over 1.3 million square feet of retail, and the city runs a dedicated Livable Centers Initiative planning program for the North Point activity center. Retail and mixed-use owners in that submarket are managing an asset whose surrounding land-use framework is actively being rewritten, which changes how you think about lease terms and capital timing.',
    ],

  'commercial-property-management:atlanta':
    [
      'Managing commercial property inside Atlanta means managing across two counties. The city\'s own charter is explicit that taxes are assessed by "the Fulton County or DeKalb County board of tax assessors" and that returns are prepared separately "for the City of Atlanta in Fulton County and for that portion of the City of Atlanta located in DeKalb County." The Emory corridor, Kirkwood, East Atlanta and Edgewood all sit in DeKalb while carrying an Atlanta address.',
      'That split is not academic. A dispossessory on a property in the DeKalb portion of the city is filed in DeKalb County Magistrate Court, whose civil jurisdiction expressly covers evictions and garnishments; the identical filing for a Midtown or West End property goes to Fulton County Magistrate Court, whose Civil Division handles dispossessory actions with a $15,000 jurisdictional ceiling and no jury trials. Two courts, two clerks, two workflows, one city. An owner with a small portfolio spread across town is running both.',
      'Code enforcement also sits somewhere owners do not expect. Under the city code the office of code enforcement is housed inside the Department of Police, and it administers both the Atlanta Housing Code and the commercial, institutional and industrial building maintenance code. Violations are prosecuted in Atlanta Municipal Court, which is a different venue again from the magistrate court that hears your evictions.',
    ],

  // -------------------------------------------------------------- multi-family
  'multi-family-property-management:atlanta':
    [
      'There is one Atlanta ordinance that binds multi-family owners and is routinely missed, because it does not live in the housing code. Chapter 94, Article IX, Section 94-152 applies to any landlord who owns or controls more than ten rental units and requires a security deposit of more than 60 percent of the monthly rent. On a tenant\'s request, such a landlord must offer either qualifying rental security insurance or payment of the deposit across no fewer than three equal monthly installments — and must give written notice of those alternatives before the lease is signed. It was enacted in October 2020 and sits in the chapter headed Human Relations.',
      'The ten-unit threshold is what makes it a multi-family rule in practice. Cross it and the obligation switches on for the whole portfolio inside the city, so it tends to arrive at exactly the moment an owner scales from a fourplex or two into something larger. It is also easy to comply with once you know it exists, and expensive to discover from a tenant complaint.',
      'New rental development carries its own layer. The Westside Affordable Workforce Housing Overlay applies to "all residential rental developments of ten or more new residential rental dwelling units" in its district, with a parallel Northwest Atlanta Workforce Housing Overlay operating on the same model. And separately, Atlanta imposes an affirmative duty to register vacant real property with code enforcement — a filing that catches owners mid-repositioning, when a building is empty by plan rather than by accident.',
    ],

  // ------------------------------------------------------------------ investor
  'investor-services:atlanta':
    [
      'The single most useful thing to know before buying an Atlanta rental is which county it is actually in. The city straddles Fulton and DeKalb, its charter provides for separate tax returns on each side, and the practical consequences follow the line: which board of assessors values the property, which magistrate court hears an eviction, and which county\'s appeal calendar you are working to. Kirkwood, East Atlanta, Edgewood-Candler Park and the Emory corridor are all DeKalb addresses that read as Atlanta.',
      'Two city rules change the underwriting on larger deals. Cross ten rental units and Atlanta\'s security deposit ordinance requires you to offer an insurance-or-installments alternative on request, with written notice before signing. Build ten or more new rental units inside the Westside or Northwest workforce housing overlays and an affordability requirement attaches to the development. Neither is fatal to a deal; both are the sort of thing that should be priced in before closing rather than discovered after.',
      'On the demand side, the durable anchors are institutional rather than cyclical. Twenty-three MARTA rail stations sit inside the city limits. Georgia State reports more than 53,000 students downtown, Georgia Tech more than 53,000 across its programs, and the Atlanta University Center schools cluster in the West End. Atlanta Housing describes itself as the largest housing authority in Georgia, serving roughly 27,000 households, and it runs an owner portal and an up-front rent estimate tool — a voucher channel worth understanding before you dismiss it.',
    ],

  'investor-services:alpharetta':
    [
      'Alpharetta prices like the employment base it has. The city reports a median home value of $634,568 and median household income of $174,223 across roughly 27,638 housing units, against a daytime population of 123,575 versus 66,684 residents. That gap — more jobs than residents — is the structural reason rental demand here is not dependent on Atlanta\'s intown cycle.',
      'For an investor the relevant read is employer concentration rather than headcount alone. City business licence data from May 2026 puts Fiserv at 2,087 employees, ADP at 2,074, Verizon at 1,928, Equifax at 1,722, Jackson Healthcare at 1,235 and Morgan Stanley at 1,225. Finance, insurance and professional and technical services dominate, which produces a tenant profile that is well-paid, relocation-driven and comparatively stable — and a market that would feel a single large corporate consolidation. Johns Creek learned that lesson when State Farm left for Dunwoody and took 1,200 jobs.',
      'Two practical notes. There is no long-term rental registration or rental inspection programme in Alpharetta — consistent with Georgia law, which bars local governments from requiring registration of residential rental property. But short-term rentals are separately licensed here, and the ordinance caps them at no more than five percent of homes within a neighbourhood, and only where the HOA declarations permit them at all. If a purchase thesis depends on short-term letting, the covenants decide it before the city does.',
    ],

  // ----------------------------------------------------------------------- HOA
  'hoa-management:buford':
    [
      'Buford is the rare Georgia city where an association\'s governing county is a real operational question. The city\'s adopted 2045 Comprehensive Plan describes growth "most heavily in the northern portion in Hall County and the southern portion of recently annexed land along I-85 in Gwinnett County." A board here can be dealing with Hall County on one matter and Gwinnett on another, and the two do not run the same processes.',
      'The zoning framework shapes what kinds of associations exist. Buford has sixteen base districts, with multi-family split across RM, RM-8 at up to eight units per acre, RM-6 at up to six, and RMD for duplexes. Notably there is no planned unit development district among the sixteen, and townhomes appear as a permitted use only through a Special Use Permit in the RL Lakeside Residence District — so townhome communities here tend to sit in RMD or on approvals rather than in a purpose-built district.',
      'The newer communities are small and townhome-heavy, which is a different management job from a large single-family HOA. The comprehensive plan names City Walk at 59 three-bedroom townhomes off North Gwinnett Street, Lanier Harbor at 113 townhomes near the city lake park, and Alexander Park at 11 townhomes off Alexander Street. Associations at that scale carry the same statutory obligations as a 400-door community with a fraction of the assessment base to fund them, which is exactly where a volunteer treasurer starts to struggle.',
    ],

  'hoa-management:sugar-hill':
    [
      'Sugar Hill zoning gives communities here a shape that is unusual for the corridor. The city operates a Town Center Overlay District that came directly out of a Town Center Master Plan prepared under the Atlanta Regional Commission\'s Livable Centers Initiative, with the ordinance recording that residents held "widely shared values related to protection of the visual environment and enhancement of the pedestrian experience Downtown." Design expectations in that district are a live governance issue for any association inside it.',
      'The city also has a purpose-built age-restricted vehicle, which many Georgia cities do not. A Senior Residential Development is a planned unit development type on a five-acre minimum, sited within an RS-100 or R36 district, permitting detached and attached homes and what the ordinance calls "villas/town homes." It carries a hard occupancy standard: at least 80 percent of occupied units must house someone 55 or older. That is a compliance obligation the board owns, not the developer, once the community is turned over.',
      'For condominium and mixed-stock communities, the Planned Residential Development route is the other one to know — a ten-acre minimum that may contain single-family detached houses, condominiums and attached single-family houses in one development. Mixed ownership types under one association means mixed maintenance responsibilities and mixed assessment logic, and it is worth having that mapped explicitly in the budget rather than inherited from whatever the developer set up.',
    ],

  'hoa-management:johns-creek':
    [
      'Johns Creek is a high owner-occupancy city, which shapes what its associations actually spend their time on. The adopted 2023 Comprehensive Plan Update reports 77 percent of homes owner-occupied against 62 percent in northern Fulton County and 59 percent across the Atlanta region, with 19.1 percent renter-occupied and vacancy at just 3.9 percent. The plan is specific that renter-occupied housing concentrates "in townhome subdivisions" in the western and central sections of the city.',
      'That concentration is the practical point for a board. Where a community has a meaningful rented share, leasing policy, tenant registration and covenant enforcement against non-resident owners become the recurring agenda items, rather than the occasional ones. Where it does not, the work is architectural review and reserves. Knowing which kind of community you are before writing the year\'s budget saves a lot of argument.',
      'The city also has a substantial and growing senior-housing stock: the plan counts 902 retirement community units, 1,165 assisted living and memory care units and 1,691 active adult units for residents 55 and older, out of roughly 29,000 housing units citywide. Age-restricted communities carry occupancy verification duties that ordinary associations do not, and those obligations sit with the board.',
    ],

  'hoa-management:alpharetta':
    [
      'One Alpharetta ordinance puts associations directly in the enforcement path, and boards should read it closely. The city\'s short-term rental ordinance establishes annual licensing, occupancy and noise rules, and a cap limiting short-term rentals to no more than five percent of homes within a neighbourhood — but only "if permitted in the HOA declarations and covenants." The city has, in effect, made the association\'s own governing documents the first gate.',
      'That has two consequences worth planning for. A community whose covenants are silent or ambiguous on short-term letting will find the question arriving as a licence application rather than as a covenant dispute, and boards get asked to interpret documents that were never drafted with the question in mind. And a community that does permit it now has a numeric cap to track across the neighbourhood, which is a records job rather than a judgement call.',
      'On the other side, there is no long-term rental registration or rental inspection programme in Alpharetta at all — a full review of the city\'s published site finds only short-term rentals, business licences and code enforcement. That is consistent with Georgia law, which bars local governments from requiring registration of residential rental property and limits inspections to cases of probable cause. So a board\'s leverage over long-term rentals comes from the covenants, not from the city.',
    ],

  'hoa-management:milton':
    [
      'Milton is almost entirely residential by design, and its own economic development office says so plainly: the city is "almost exclusively residential with 60% zoned residential and 30% agricultural," with "less than 2% of land in Milton zoned for commercial development across the three commercial nodes: Deerfield, Crabapple, and Birmingham Crossroads." Associations here are governing large-lot, low-density, often equestrian-character communities rather than dense subdivisions.',
      'That land pattern changes the work. Large lots, agricultural adjacency and horse property bring covenant questions that simply do not arise elsewhere in the corridor — fencing, pasture, outbuildings, trails and shared access. The city currently runs a targeted survey aimed at owners of horse farms and larger lots, which is a fair indication of how much of the housing stock sits in that category.',
      'One thing to be precise about: Milton\'s code enforcement describes performing "systematic inspections... throughout the city to ensure properties are in compliance with city code," and violations are heard in the city\'s own municipal court. That is general property-maintenance enforcement, not a rental inspection programme — Georgia law bars local governments from requiring registration of residential rental property and limits inspections to probable cause. Worth knowing which one is knocking, because the answer changes how a board should respond.',
    ],
};
