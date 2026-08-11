// HOA / community association management.
//
// This is the one service line on the site whose buyer is not a property
// owner. It is a BOARD, acting by committee, usually on an annual RFP cycle.
// The page is written for that reader.
//
// CONTENT INTEGRITY NOTES FOR ANYONE EDITING THIS FILE:
//  - Every number here is a Georgia legal requirement cited in `sources`.
//    There are no portfolio counts, no door counts, no "communities managed",
//    no fee percentages, and no per-door pricing anywhere in this file.
//  - HOA management is priced per door, per month, and Silverstone's schedule
//    has NOT been confirmed. Pricing copy is deliberately generic ("quoted per
//    community, in writing"). Do not add a number without owner confirmation.
//  - The owners hold the Georgia real estate licensure required to provide
//    community association management services, their counsel has reviewed it,
//    and the fidelity bond requirement is in place (confirmed 2026-08-10).
//    Never state a license number; we do not have one on file.
//  - CMCA, AMS, PCAM and AAMC are VOLUNTARY industry credentials. Do not imply
//    ATLStay or Silverstone holds any of them.
//  - A perpetuity exception to O.C.G.A. § 44-5-60 for POA Act associations is
//    widely claimed online and could NOT be verified. It is deliberately absent
//    from this file. Do not add it back without a statutory cite.
//  - CAI Georgia does not state that licensure is mandatory. Cite GREC and the
//    statute for the licensing requirement — never CAI.
//
// CTA NOTE: the shared service template embeds the sitewide projection form on
// every page. A board does not want a rental projection, so the copy below
// reframes that form as a proposal / transition-review request in the intro and
// again in the first body section. If the template ever gains a per-service CTA
// override, this page should use it.

import type { ServiceLine } from './types';

export const hoaServices: ServiceLine[] = [
  // ==========================================================================
  // HOA / COMMUNITY ASSOCIATION MANAGEMENT
  // ==========================================================================
  {
    slug: 'hoa-management',
    name: 'HOA & Community Association Management',
    category: 'commercial',
    headlineKeyword: 'HOA & Community Association Management in Atlanta',
    eyebrow: 'Community Associations',
    tagline: 'Your board sets the policy. We run the association.',

    seoTitle: 'HOA & Community Association Management in Atlanta, GA',
    seoDescription:
      'HOA and community association management across metro Atlanta: assessments, covenants, vendors, and board reporting. Request a written proposal.',
    intro:
      'Silverstone Management runs homeowner and community associations across metro Atlanta — assessment billing and collections, covenant and architectural enforcement, vendor and common-area oversight, meeting and election support, and financials a volunteer treasurer can actually reconcile. Boards do not shop for rental projections, so whatever the form on this page is labelled, what a board gets back from us is a management proposal. Send us the community name, the number of doors, and when your current contract renews, and a real person replies within one business day.',

    forWhom: [
      'Boards of 20 to 80-door communities the national management firms treat as an afterthought — subdivisions in Suwanee, townhome courts in Smyrna, small condo buildings in Brookhaven.',
      'Self-managed associations where one volunteer holds the bank login, the vendor list, the covenant file, and all the risk.',
      'Boards running an annual RFP who need at least one proposal that spells out scope, reporting, and the fee in writing instead of a glossy brochure.',
      'Communities that just came out of developer control and are administering a declaration nobody on the board has read end to end.',
      'Boards leaving an incumbent manager after a rough audit, a reserve surprise, unanswered violation complaints, or a manager who changed three times in two years.',
    ],

    included: [
      'Assessment billing, homeowner statements, online payment, and a written delinquency ladder applied identically to every owner',
      'Late fees and interest charged only inside the caps Georgia law allows, so a collection file never becomes the association\'s problem',
      'Association funds held in a designated trust account, credited to your association, with a written reconciliation every month',
      'A fidelity bond covering your association\'s funds, naming the association as an additional named insured, held separately for your community',
      'Lien preparation and coordination with the association\'s attorney, including the statutory statement-of-amounts-due response that protects the lien at closing',
      'Monthly financial package: balance sheet, income and expense against budget, aged assessment receivables, bank reconciliation, and check register',
      'Annual budget built with the board, plus reserve-contribution modelling against your reserve study',
      'Covenant and rule enforcement — scheduled inspections, dated violation notices, hearing coordination, and a file that holds up',
      'Architectural review intake, tracking, and written decisions returned inside the deadlines your declaration sets',
      'Vendor management: landscaping, irrigation, pool, gate and access control, lighting, pressure washing, trash, and pest — bid, contracted, insured, and inspected',
      'Board and annual meeting support: notices, packets, agendas, quorum and proxy tracking, minutes, and election administration',
      'Resale and lender packages, closing letters, governing-document requests, and records retention to the standard Georgia requires of a licensed firm',
    ],

    sections: [
      {
        heading: 'A Board Buys a Proposal, Not a Rental Projection',
        body: [
          'Almost everything else on this site is written for a homeowner deciding what to do with one property. This page is not. The buyer here is a volunteer board with a fiduciary duty, a budget it has to defend at the annual meeting, and a decision that gets made by vote — usually once a year, usually against two or three other bids.',
          'So the useful thing we can give you is a proposal you can actually compare. Ours states the scope in plain terms, the fee, what is included versus billed separately, the reporting you will receive and when, who your named manager is, how after-hours emergencies are handled, and what the transition from your current manager involves week by week. A board should be able to lay three proposals side by side and see where they differ. Most cannot, and that is not an accident.',
          'Pricing is per door, per month, and it moves with the community. A 34-home subdivision with a front entrance, an irrigation system, and a mailbox cluster is a different job from a 70-unit condo association with shared building systems, a pool, and an elevator. We quote your community specifically, in writing, before anything is signed — including anything that could ever be billed on top, such as collection work, resale letters, special-project management, or extra meetings. We do not publish a per-door number we would have to walk back once we see your declaration.',
          'Whatever the form on this page says, what comes back to a board is that proposal — or, if you are earlier than that, a transition review: an honest read of your current financials, delinquency file, and vendor contracts, and whether changing managers is actually your problem. Sometimes it is not. We would rather tell you that than win a contract we will lose in eighteen months.',
        ],
      },
      {
        heading: 'First Question: Is Your Community Actually Under the POA Act?',
        body: [
          'Most Georgia boards assume the Property Owners\' Association Act governs them. Many are wrong, and the ones who are wrong usually find out during a collection action, when it is expensive.',
          'The POA Act is opt-in. It applies to a development that is "subject to a declaration and submitted to this article," and the statute is explicit about how that submission happens: a declaration or amendment intending to bring a development under the Act "shall state an affirmative election to be so governed." If your declaration never made that election, you are not under it. Your association still exists, your covenants are still enforceable as recorded covenants, and your board still has authority — but the statutory package that comes with the Act, including its automatic assessment lien, is not yours to use.',
          'That distinction changes the practical answer to the question boards ask most: what do we do about the owner who has not paid in fourteen months. Under the Act there is a defined lien with defined priority and a defined path. Outside it, collection runs on your declaration and general Georgia law, and what your documents actually say becomes the whole argument. Condominiums are a third case again — a Georgia condominium comes into existence on recordation of its declaration under the Condominium Act, which carries its own rules.',
          'This is the first thing we read when a community comes to us, before we look at a single invoice. It costs nothing to check and it determines how the rest of the job gets done. If your board cannot say with certainty which regime you are under, that is the most valuable hour your attorney will bill you all year.',
        ],
      },
      {
        heading: 'Assessments, Liens, and the Five Business Days That Can Erase One',
        body: [
          'For an association operating under the POA Act, the assessment lien is the strongest tool the board has, and it is stronger than most boards realise. It is prior and superior to all other liens except ad valorem taxes, first-priority mortgages, and certain secondary purchase-money mortgages. Recording the declaration is itself record notice that the lien exists — there is no separate filing to remember. It covers the unpaid assessments plus costs of collection, including court costs and reasonable attorney\'s fees actually incurred.',
          'It also comes with limits that a sloppy manager blows through. Late fees are capped at the greater of $10.00 or 10 percent of each assessment. Interest is capped at 10 percent per annum. Those are ceilings, not suggestions, and an association that has been quietly charging above them has a defect in every collection file it owns. Foreclosure is bounded too: no foreclosure action on the lien is permitted unless the lien is at least $2,000.00, and it requires not less than 30 days\' notice first. And the lien does not wait forever — it expires four years after the assessment or installment first became due and payable.',
          'Then there is the provision that quietly destroys liens, and almost no management company in Atlanta writes about it. When a lot owner, a mortgagee, someone under contract to buy a lot, or a lender considering a loan secured by a lot requests a statement of the amounts due, the association has five business days to furnish it. Miss that window and the lien for assessments is extinguished and of no further force or effect as to the title or interest acquired by that purchaser or lender, and their successors and assigns. Five business days. A closing goes through, and the money the association was owed simply stops being collectable from the new owner.',
          'That is why closing-letter requests are not administrative busywork here. They are logged, dated, and turned around inside the statutory window, every time, and the response is filed with the account. Our delinquency ladder is written down before it is applied — reminder, formal notice, attorney referral, lien, and only then the conversation about foreclosure — and it runs the same way for every owner in the community, because selective enforcement is how a board loses a case it should have won.',
        ],
      },
      {
        heading: 'Where the Association\'s Money Sits',
        body: [
          'Georgia is unusual here, and it works in a board\'s favour. Most states let anyone hang out a shingle and manage community associations. Georgia does not: the state issues a distinct Community Association Manager licence through the Georgia Real Estate Commission, requiring the applicant to be at least 18, complete a 25-hour Commission-approved prelicense course, and pass the PSI examination. Community association management services are written into the licence law itself — the definition reaches the provision of management or administrative services to the operation of an association\'s affairs, and separately covers collecting assessments and other trust funds. Handling your association\'s money is licensed activity even if nobody involved ever touches a lease.',
          'The bond rule is the part boards should ask every bidder about by name. Under the Commission\'s rules, a broker providing community association management services who collects, maintains, controls, has access to, or disburses association funds must be covered at all times by a fidelity bond or fidelity insurance policy, unless they never handle more than $60,000.00 in association funds. The coverage has to be at least the sum of three months\' assessments due from all members of the associations managed, plus any reserves the association requires the broker to hold. The policy must name the community association as an additional named insured. The insurer cannot cancel, substantially modify, or refuse to renew it without 30 days\' prior written notice to both the broker and the association. And a separate policy is required for each community association managed — not one blanket policy stretched across a book of business.',
          'Trust accounting sits under the same rulebook. A broker required to maintain a trust or escrow account must produce a written reconciliation statement at least monthly comparing trust liability against bank balances, funds have to be credited and deposited to the association\'s own account, and the Commission examines those accounts during each renewal period. Transaction records are retained for three years and made available to the Commission on request.',
          'Silverstone Management holds the Georgia licensure required to provide these services, our counsel has reviewed the arrangement, and the fidelity bond requirement is in place. Ask us for the bond and we will send it. Ask every other firm bidding on your community the same question — the bond, the named insured, the coverage amount, and whether it is separate for your association — and pay close attention to which of them has to go and find out.',
        ],
      },
      {
        heading: 'Covenant Enforcement, and the 20-Year Clock Nobody Is Watching',
        body: [
          'Enforcement is where boards burn out. The complaints are personal, the neighbours are neighbours, and the volunteer who sends the letter has to see that person at the mailbox. Handing enforcement to a manager is not about being tougher. It is about being consistent, documented, and one step removed.',
          'We inspect on a published schedule rather than only when somebody complains, which is the difference between a community that looks maintained and one that runs on grudges. Violations get a dated notice with a photo, a cure period, and a written record. Architectural review requests get logged on arrival and answered inside the deadline your declaration sets, because a request that sits past its deadline can become an approval by default. Where a matter needs a hearing, we build the file and coordinate it. Where it needs the association\'s attorney, we say so early rather than after the board has already sent four increasingly annoyed letters.',
          'And there is a calendar item almost nobody watches. Under Georgia law, covenants restricting land to certain uses do not run for more than 20 years in municipalities that have adopted zoning laws, or in the zoned areas of counties that have. For planned subdivisions of at least 15 individual plots, those covenants automatically renew for successive 20-year periods with no limit on renewals — but at least 51 percent of the affected plot owners can terminate them by recording a termination document, and they can only do it within the two years before an expiration date. That is a narrow, recurring window that arrives quietly.',
          'If your declaration dates from the late 1990s or early 2000s — which describes an enormous number of Gwinnett, north Fulton, and Cherokee subdivisions — the arithmetic on that is worth doing this year rather than the year somebody else does it for you. We flag it and put it in front of the board with the recording date attached. What the association should do about it is a question for your attorney, not for us.',
        ],
      },
      {
        heading: 'Changing Managers Without Losing the Records',
        body: [
          'Boards delay a manager change because the switch itself sounds worse than the problem. Usually it is not, but it does have to be run properly, and the failure mode is always the same: the outgoing manager hands over less than the association owns.',
          'A transition is a records job first. The association\'s files belong to the association, not to the company holding them — the governing documents and any amendments, the current and prior budgets, the general ledger and bank statements, the reserve study, the full owner roster with contact and account balances, the delinquency and collection files with their correspondence, every executed vendor contract with its renewal and cancellation dates, insurance policies and claims history, architectural review history, violation history, meeting minutes and election records, and the operational keys: gate and access codes, pool keys, clubhouse access, domain and portal logins, and the mailbox. Anything that does not come across on day one gets listed, dated, and requested in writing, and the board sees that list.',
          'Then the mechanics. Bank accounts move to a trust account with new signature authority, and the reserve account moves with them. Assessment billing has to be running before the next due date, with owners notified of where and how to pay. Vendor contracts are read rather than inherited — we want the term, the renewal trigger, and the cancellation notice on every one, because auto-renewing landscaping and pool contracts are the most common place a community quietly overpays for years. Insurance is confirmed in force with the association named. The fidelity bond for your association is put in place. The first board meeting under new management should have a clean opening balance sheet, an aged receivable list, and a written punch list of what is still outstanding.',
          'The one thing to check before any of it: your current management agreement. The notice period and the termination terms are in that document, and they set the calendar. Read it, or let your attorney read it, before the board votes. We will build the transition schedule backwards from whatever it says.',
        ],
      },
      {
        heading: 'What the Board Controls, and What Lands in Your Inbox',
        body: [
          'The board remains the association\'s governing body and the client. Every decision that belongs to it stays with it: the budget and the assessment amount, the reserve funding strategy, whether to pursue a lien or a foreclosure, which vendor bid to accept, rule changes, architectural policy, special assessments, and hiring or firing us. We recommend, we prepare the options with real numbers attached, and we execute what the board decides. A manager who is quietly making those calls for a passive board is a liability, not a service.',
          'What we own is execution and the record. Assessments billed and collected on schedule. Vendors bid, contracted, insured, and inspected. Common areas walked and photographed. Violations noticed and tracked. Meetings noticed, packeted, minuted, and elections administered. Owner questions answered by a named person, not a general inbox — boards deserve to know whose name is on their account before they sign, which is why ours is in the proposal.',
          'The reporting cadence is fixed so a treasurer never has to chase it. Monthly: balance sheet, income and expense against budget with variances explained by cause rather than by category, aged assessment receivables, bank reconciliation, and check register, delivered on a set date each month. Annually: the draft budget prepared with the board ahead of the vote, reserve contributions modelled against the reserve study, year-end financials in a form your CPA or auditor can work with directly, and the records the association needs to hand a lender or a buyer without a scramble. Between those, board members and owners see current financials and their own accounts in the portal rather than waiting for a PDF.',
          'We manage communities across the northern arc through Alpharetta, Johns Creek, Milton, Roswell, and Sandy Springs; the Gwinnett corridor from Peachtree Corners and Duluth out through Suwanee, Lawrenceville, Dacula, and Snellville; Cobb and Cherokee through Marietta, Kennesaw, Acworth, Woodstock, and Canton; and the southern crescent through Fayetteville, Peachtree City, Newnan, Stockbridge, and McDonough. Those are the parts of metro Atlanta where covenant communities actually concentrate, and where a manager who can be at your front entrance in twenty minutes is worth more than one with a national logo and a call centre in another state.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How much does HOA management cost in metro Atlanta?',
        a: 'Community association management is priced per door, per month, and it varies with what the community actually contains — amenities, shared building systems, meeting frequency, delinquency load, and how much enforcement the board wants. We quote your community specifically, in writing, before anything is signed, including anything billable on top such as collection work, resale and lender letters, special-project management, or additional meetings. When you compare bids, ask each firm the same four questions: what is billed outside the monthly fee, how many communities your named manager handles, whether they keep any portion of late fees or resale-letter charges, and what the exit terms are.',
      },
      {
        q: 'We are a 45-home community. Are we too small for a management company?',
        a: 'Not for us. Smaller associations are exactly where professional management tends to be most needed and least available — the large regional firms are built for scale and a 40 or 60-door community often ends up at the bottom of somebody\'s route list. The work is genuinely smaller at that size, but it is not simpler: the same lien deadlines, the same trust-account and bond rules, and the same covenant obligations apply whether you have 45 doors or 450. What changes is that a single unpaid account is a much larger share of your budget, which is precisely why the collection process has to be run properly.',
      },
      {
        q: 'Does an HOA manager have to be licensed in Georgia?',
        a: 'Yes, and Georgia is unusual in this — most states have no such requirement. The Georgia Real Estate Commission issues a distinct Community Association Manager licence, requiring the applicant to be at least 18, complete a 25-hour Commission-approved prelicense course, and pass the PSI examination. The licence law defines community association management services broadly enough to reach the provision of management or administrative services to an association\'s affairs, and separately covers collecting assessments and other trust funds. In practice that means handling your association\'s money is licensed activity even if nobody involved ever touches a lease. Ask any firm bidding on your community for their licence status directly — note that CMCA, AMS, PCAM and AAMC are voluntary industry credentials, not the Georgia licence.',
      },
      {
        q: 'Who holds the association\'s money, and what protects it?',
        a: 'Association funds sit in a designated trust account, credited and deposited to your association\'s own account, with a written reconciliation produced at least monthly comparing trust liability against bank balances — and the Commission examines those accounts during each renewal period. On top of that, Georgia rules require a broker who collects, controls, has access to, or disburses association funds to carry a fidelity bond or fidelity insurance at all times, unless they never handle more than $60,000.00. The coverage must be at least three months\' assessments from all members plus any reserves held, the association must be named as an additional named insured, the insurer must give 30 days\' written notice before cancelling or refusing to renew, and a separate policy is required for each association managed. Ask to see the bond. We will send it.',
      },
      {
        q: 'What happens when an owner stops paying assessments?',
        a: 'A written ladder, applied identically to every owner: reminder, formal notice, attorney referral, lien, and only then a conversation about foreclosure. For an association under the Georgia Property Owners\' Association Act, the lien is prior and superior to other liens except ad valorem taxes and certain mortgages, and recording the declaration is itself record notice — there is no separate lien filing. The limits matter as much as the powers: late fees cannot exceed the greater of $10.00 or 10 percent of each assessment, interest is capped at 10 percent per annum, no foreclosure action is permitted unless the lien is at least $2,000.00, and it requires not less than 30 days\' notice first. The lien also expires four years after the assessment first became due, which is why a file that has been drifting needs attention now rather than at the next annual meeting. The lien and any litigation run through the association\'s attorney; what we contribute is a complete, dated, defensible file.',
      },
      {
        q: 'A closing is scheduled and the lender wants a statement of what is owed. What is the deadline?',
        a: 'Five business days, and missing it is one of the most expensive administrative errors an association can make. Under the POA Act, when a lot owner, a mortgagee, a person under contract to purchase a lot, or a lender considering a loan secured by a lot requests a statement of amounts due, the association must furnish it within five business days. If it does not, the assessment lien is extinguished and of no further force or effect as to the title or interest acquired by that purchaser or lender and their successors and assigns. The closing completes and the debt simply stops being collectable from the new owner. We log every request with its date, turn it around inside the window, and file the response with the account.',
      },
      {
        q: 'Our declaration is from the 1990s. Can our covenants expire?',
        a: 'Possibly, and it is worth checking. Georgia law provides that covenants restricting land to certain uses do not run for more than 20 years in municipalities that have adopted zoning laws, or in the zoned areas of counties that have. For planned subdivisions of at least 15 individual plots, the covenants automatically renew for successive 20-year periods with no limit on the number of renewals — but at least 51 percent of the affected plot owners can terminate them by recording a termination document, and only within the two years before an expiration date. So the practical question for your board is what your recording date is and when the next window opens. We will pull the date and put it in front of the board; what the association should do about it is a question for your attorney.',
      },
      {
        q: 'How hard is it to switch from our current management company?',
        a: 'Less painful than most boards expect, but it has to be run as a records project rather than a phone call. The association\'s files belong to the association: governing documents, budgets, general ledger and bank statements, reserve study, owner roster with balances, delinquency and collection files, executed vendor contracts with their renewal and cancellation dates, insurance policies, architectural and violation history, minutes, and the operational keys — gate codes, pool and clubhouse access, portal and domain logins, and the mailbox. Anything that does not arrive gets listed, dated, and requested in writing, with the board copied. Start by reading your current management agreement, because its notice period and termination terms set the whole calendar. We build the transition schedule backwards from that date, and the first meeting under new management opens with a clean balance sheet, an aged receivable list, and a written punch list of whatever is still outstanding.',
      },
    ],

    sources: [
      {
        claim: 'Georgia issues a distinct Community Association Manager licence through the Georgia Real Estate Commission: the applicant must be at least 18, complete a 25-hour Commission-approved prelicense course, and pass the examination administered by PSI.',
        publisher: 'Georgia Real Estate Commission — Obtaining a License',
        url: 'https://grec.state.ga.us/obtaining-a-license/real-estate/',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Georgia licence law defines "community association management services" as the provision, for valuable consideration, of management or administrative services to the operation of the affairs of a community association, and separately covers collecting assessments or other trust funds.',
        publisher: 'Official Code of Georgia Annotated § 43-40-1(4.2) and § 43-40-1(2)(C) (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-43-professions-and-businesses/ga-code-sect-43-40-1.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'A broker providing community association management services who collects, maintains, controls, has access to, or disburses association funds must be covered at all times by a fidelity bond or fidelity insurance policy, unless the broker at no time handles association funds totaling more than $60,000.00.',
        publisher: 'Georgia Real Estate Commission Rule 520-1-.06(3) (via Cornell Legal Information Institute)',
        url: 'https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-520-1-.06',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: "The fidelity coverage must equal at least three months' assessments due from all members of the associations managed plus any reserve funds held, must name the community association as an additional named insured, cannot be cancelled, substantially modified, or non-renewed without 30 days' prior written notice to the broker and the association, and a separate policy is required for each community association managed.",
        publisher: 'Georgia Real Estate Commission Rule 520-1-.06(3) (via Cornell Legal Information Institute)',
        url: 'https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-520-1-.06',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'A broker required to maintain a trust or escrow account must produce a written reconciliation statement at least monthly comparing trust liability with bank balances, must credit and deposit funds to the association\'s account, and must authorise the Commission to examine those accounts during each renewal period.',
        publisher: 'Georgia Real Estate Commission Rule 520-1-.08 — Managing Trust Accounts and Trust Funds (via Cornell Legal Information Institute)',
        url: 'https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-520-1-.08',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Documents related to a real estate transaction required by law to be maintained in a broker\'s file for three years must be made available to authorised agents of the Commission on reasonable request.',
        publisher: 'Georgia Real Estate Commission Rule 520-1-.10(4) — Handling Real Estate Transactions (via Cornell Legal Information Institute)',
        url: 'https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-520-1-.10',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'The Georgia Property Owners\' Association Act applies to a development consisting of real property containing lots, located in Georgia, "subject to a declaration and submitted to this article."',
        publisher: 'Official Code of Georgia Annotated § 44-3-221 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-3-221.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Submission to the Property Owners\' Association Act is opt-in: any declaration or amendment intending to bring or avail a development of the benefits and provisions of the article "shall state an affirmative election to be so governed."',
        publisher: 'Official Code of Georgia Annotated § 44-3-222 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-3-222.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'A Georgia condominium comes into existence upon recordation of the declaration under the Condominium Act together with the required plats and plans — a separate statutory regime from the Property Owners\' Association Act.',
        publisher: 'Official Code of Georgia Annotated § 44-3-72 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-3-72.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: "A POA Act assessment lien is prior and superior to all other liens except ad valorem taxes, first-priority mortgages, and certain secondary purchase money mortgages; recording the declaration constitutes record notice of the lien; the lien covers costs of collection including court costs and reasonable attorney's fees actually incurred; late fees may not exceed the greater of $10.00 or 10 percent of each assessment; and interest may not exceed 10 percent per annum.",
        publisher: 'Official Code of Georgia Annotated § 44-3-232 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-3-232.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'No foreclosure action on a POA Act assessment lien is permitted unless the lien is at least $2,000.00, and not less than 30 days\' notice is required first; the lien expires four years after the assessment or installment first became due and payable. When a lot owner, mortgagee, purchaser under contract, or prospective lender requests a statement of amounts due, the association must furnish it within five business days or the lien is extinguished and of no further force or effect as to the title or interest acquired by that purchaser or lender and their successors and assigns.',
        publisher: 'Official Code of Georgia Annotated § 44-3-232 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-3-232.html',
        asOf: 'Retrieved August 2026',
      },
      {
        claim: 'Covenants restricting lands to certain uses shall not run for more than 20 years in municipalities which have adopted zoning laws nor in those areas of counties for which zoning laws have been adopted; for planned subdivisions of at least 15 individual plots the covenants automatically renew for successive 20-year periods with no limit on renewals, but at least 51 percent of the affected plot owners may terminate them by recording a termination document no sooner than but within the two years prior to an expiration date.',
        publisher: 'Official Code of Georgia Annotated § 44-5-60 (via FindLaw)',
        url: 'https://codes.findlaw.com/ga/title-44-property/ga-code-sect-44-5-60.html',
        asOf: 'Retrieved August 2026',
      },
    ],

    marketCities: [
      'alpharetta', 'johns-creek', 'milton', 'roswell', 'sandy-springs', 'dunwoody', 'brookhaven',
      'peachtree-corners', 'duluth', 'suwanee', 'lawrenceville', 'snellville', 'grayson', 'dacula',
      'sugar-hill', 'buford', 'braselton', 'cumming', 'marietta', 'kennesaw', 'acworth',
      'powder-springs', 'mableton', 'woodstock', 'canton', 'holly-springs', 'douglasville',
      'tucker', 'stone-mountain', 'conyers', 'stockbridge', 'mcdonough', 'fayetteville',
      'peachtree-city', 'newnan',
    ],
    relatedResources: [
      'hoa-rules-and-airbnb-atlanta',
      'condo-airbnb-management-atlanta',
      'how-to-switch-airbnb-management-companies',
    ],
    relatedServices: [
      'long-term-rental-management',
      'multi-family-property-management',
      'commercial-property-management',
      'investor-services',
    ],

    heroImageKey: 'metroAtlanta',
    published: true,
    order: 6,
  },
];
