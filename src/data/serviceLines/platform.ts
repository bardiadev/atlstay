// Platform-specific service lines — the "who runs my listing on X?" axis.
//
// These pages answer a search an owner types when they have already decided
// they want a booking channel run properly and are looking for the operator to
// run it. Every external fact carries a real, re-checked URL in `sources`.
//
// COMPLIANCE NOTE (do not remove):
//  - The Homes & Villas by Marriott Bonvoy entry is written as authority,
//    guidance and lead capture. ATLStay does NOT claim to be an approved,
//    select or partnered Homes & Villas property manager anywhere on that page,
//    and no commission figure is stated for that programme (Marriott publishes
//    none). If that ever changes it changes with written proof, not copy edits.
//  - Fee copy is generic on purpose. The real rate renders from `site.pricing`.
//  - TripAdvisor / FlipKey vacation rentals are dead and must never appear as a
//    distribution channel. Do not add them back.

import type { ServiceLine } from './types';

export const platformServices: ServiceLine[] = [
  // ---------------------------------------------------------------------------
  // 1. VRBO
  // ---------------------------------------------------------------------------
  {
    slug: 'vrbo-management',
    name: 'Vrbo Property Management',
    category: 'platform',

    headlineKeyword: 'Vrbo Property Management in Atlanta & Georgia',
    eyebrow: 'Platform management',
    tagline: 'The whole-home channel, run by people who actually know it.',

    seoTitle: 'Vrbo Property Management in Atlanta & Georgia',
    seoDescription:
      'Full-service Vrbo management for Georgia homeowners: listing, pricing, guests, cleaning and reviews. Your management rate is quoted in writing up front.',
    intro:
      'Vrbo is a different marketplace from Airbnb, with a different guest, a different fee structure and a different set of things that make a listing win. ATLStay runs Vrbo listings end to end for owners across Atlanta, the North Georgia mountains, the lakes and the coast — and tells you exactly what it costs before you sign anything.',

    forWhom: [
      'Owners of whole homes, cabins, lake houses and beach houses — the property type Vrbo was built around',
      'Second-home owners who want the house earning between their own visits without running it themselves',
      'Hosts already on Airbnb who know they are leaving the family and group market on the table',
      'Owners of 1–3 properties who were told they need channel-manager software and are not sure that is true',
      'Owners who want the management rate stated in writing before the conversation goes any further',
    ],

    included: [
      'Vrbo listing built from scratch — title, description, amenity mapping and house rules written for how Vrbo guests actually search',
      'Professional photography, shot and sequenced for the Vrbo layout',
      'Nightly dynamic pricing tuned to Georgia seasonality, local events and the longer Vrbo booking window',
      'Minimum-stay and gap-night strategy set per property, per season',
      'Calendar synced across every channel your home is on, so a Vrbo booking closes the date everywhere else',
      '24/7 guest messaging, from first enquiry to post-checkout follow-up',
      'Hotel-grade turnovers with vetted local cleaners and quality checks between every stay',
      'Maintenance coordination and restocking through a trusted local vendor network',
      'Review management — the response cadence and pre-review guest care that protects your rating',
      'Damage, deposit and incident handling, documented and escalated properly',
      'Monthly owner reporting: what booked, what it earned, what we changed and why',
      'A management rate quoted up front, in writing, before you sign — published on our pricing page, not buried in a proposal',
    ],

    sections: [
      {
        heading: 'Vrbo is not a second Airbnb listing. Treat it like one and it underperforms.',
        body: [
          'The most common mistake we see on Georgia properties is a Vrbo listing that was copy-pasted from Airbnb, published, and never touched again. It gets a trickle of bookings, the owner concludes "Vrbo does not work for my house", and a genuinely profitable channel gets written off on the strength of a listing nobody actually built. We take over homes in exactly this state most months — the same photos in the same order, an Airbnb-length description truncated halfway through, half the amenity fields left blank, a minimum stay that was set once and never revisited, and a calendar priced flat from January to December. The house is usually fine. The listing was simply never finished.',
          'The marketplace is structured differently. Vrbo is built around whole properties — if you are renting a private room or a shared space, this is not your channel. The guest skews toward families, multi-generational groups and travellers booking a specific trip rather than browsing for a city break, and they tend to book further ahead and stay longer. That single behavioural difference changes almost every decision downstream: how far out your calendar needs to be priced, where your minimum stays sit, which amenities belong at the top of the listing, and how quickly an unanswered enquiry costs you the booking.',
          'It also changes what your photos have to do. An Airbnb guest is often sold on a feeling — light, design, a neighbourhood. A Vrbo guest planning a family week at a Blue Ridge cabin or a Lake Oconee house is doing logistics: how many people actually sleep here, is the second bathroom real, can we all eat at one table, where do the kids go. We shoot and sequence Vrbo photography to answer those questions in the first six frames, because that is the question the guest is silently asking. The description does the same job: capacity and layout before atmosphere, distances stated in minutes rather than adjectives, and the practical detail — parking for three cars, the bunk room, the ground-floor bedroom for grandparents, whether the driveway is a problem in a saloon car — that decides a family booking and gets left out of most listings entirely.',
          'None of this is exotic. It is simply a second discipline, and it is the reason a house can sit half-empty on one platform while the identical house down the road stays booked on both. The encouraging part for owners is that the bar is low, because most of your competition made the same copy-paste decision you did. A listing that has genuinely been built for the channel — properly photographed, fully mapped, priced nightly, answered within minutes — is not competing against a market of experts. It is competing against a market of afterthoughts.',
        ],
      },
      {
        heading: 'What Vrbo actually costs you — and what Airbnb costs you now',
        body: [
          'Vrbo publishes its numbers, so we will too. Expedia Group states plainly that "there is no up-front cost associated with listing your property on Vrbo," and that booking fees consist of a 3% payment processing fee and a 5% commission fee. That is roughly 8% of the booking taken by the platform, and there is no annual subscription in that model. Owners occasionally remember an older Vrbo world of paid annual listings and assume there is still a joining fee. There is not — and you should not pay anybody a setup charge simply to put you on a platform that costs nothing to join.',
          'Airbnb is moving in the other direction, and owners should understand this before they compare the two. Airbnb has historically run a split fee, where "most hosts pay a 3% service fee" and the guest pays a separate service fee on top. It is now migrating hosts onto a single fee, where — in Airbnb\'s own words — "the entire fee is deducted from the host\'s payout" and "most hosts pay 15.5%". Critically for anyone considering professional management, Airbnb states the single-fee structure is mandatory for certain hosts, including hosts who use property management software. A professionally managed listing runs through that software by definition.',
          'That is not an argument against Airbnb — Airbnb is still the deepest pool of demand in Atlanta and we run it hard for every owner we work with. It is an argument against pricing your two listings identically and hoping for the best. Under a single-fee structure the headline price a guest sees is the number your payout gets calculated from, so any owner still setting rates by hand has to re-price or quietly lose margin on every booking. Airbnb built a price adjustment tool inside the app precisely because so many hosts would otherwise get this wrong.',
          'Our own fee sits alongside those platform fees, and we do not hide it. The rate is quoted up front, in writing, before you sign anything, and it is published on our pricing page. Nearly every competing Vrbo-management page you will read today asks you to "request a custom quote" and tells you nothing. That is a choice they made. We made a different one. The reason is not principle for its own sake. It is that an owner who cannot see the management rate cannot run the only calculation that matters — platform fee, plus management fee, against the revenue a properly run listing actually produces — and a company that stops you doing that arithmetic before the sales call has told you which of its numbers it is least proud of.',
        ],
      },
      {
        heading: 'Why your Vrbo listing turns up on Expedia, Travelocity and Trivago',
        body: [
          'This is the single most common question we get from owners new to Vrbo, and it usually arrives as a worry: "I only listed on Vrbo — why is my house on Expedia? Did someone copy my listing?" Nobody copied anything. Vrbo runs an Expanded Distribution Network, and your listing is very likely in it. Sometimes the question arrives the other way round: an owner spots their own house on Trivago at a price they do not recognise and assumes somebody has cloned the listing. Almost always it is the same explanation, and the price gap is a partner site displaying taxes and fees differently rather than anyone undercutting you.',
          'Vrbo\'s own help documentation is direct about how it works: "If your listing meets eligibility requirements, it will be automatically enrolled in the program," and "there is no additional cost for reservations received on listings from Vrbo\'s Expanded Distribution." The network places eligible listings in front of travellers on Expedia, Travelocity and Trivago, through the Travel Agent Affiliate Program, and via partners including Delta and Revolut, with the partner list subject to change.',
          'The practical takeaway is that one well-built Vrbo listing is quietly doing several channels\' worth of work, at no extra commission. It also means the answer to "should I also pay someone to manage my Expedia listing?" is usually no — Expedia Group routes vacation-rental owners to Vrbo for exactly this reason. If a management company is quoting you separately for "Expedia distribution", ask them precisely what they are adding on top of a network you are already enrolled in for free.',
          'What it does not mean is that the listing runs itself. Distribution puts the home in front of more people; conversion is still down to photography, copy, price, review score and response speed. Reach without craft just means more people scrolling past. It also means your listing is being judged by audiences you never consciously wrote for. A traveller arriving from Expedia is often in hotel-comparison mode, weighing your whole house against a room rate rather than against other rentals, and the listings that convert that traveller are the ones that make space, sleeping arrangement and total value obvious within a few seconds.',
        ],
      },
      {
        heading: 'You almost certainly do not need software. You need an operator.',
        body: [
          'There is a whole category of marketing aimed at small owners insisting that the thing standing between them and a full calendar is a channel manager subscription. Expedia Group\'s own guidance says otherwise: "You don\'t need to work with a connectivity software provider to list your property and get bookings on Vrbo." It only recommends connectivity software above a threshold — "if you have more than 10 properties, using a connectivity software provider will help you manage your properties more easily and effectively."',
          'If you own one house, or two, or three, you are nowhere near that line. What you are short of is not software. It is the person who prices the calendar on a Tuesday night when a festival gets announced, answers the 11pm enquiry before the guest messages three other properties, catches that the hot tub reading is off before the next family checks in, and writes the review response that keeps a four-star from becoming your public average.',
          'That said, once a property is genuinely multi-channel — Vrbo plus Airbnb plus Booking.com plus a direct channel — you do need one synced calendar underneath it all, or double-bookings are a matter of time rather than luck. That infrastructure is part of what we run for you. You do not buy it, configure it, or maintain it. It just works in the background, which is the only place infrastructure should ever be visible from.',
          'There is one wrinkle worth knowing before you subscribe to anything. Airbnb states that its single-fee structure — where the entire service fee comes out of the host payout — is mandatory for certain hosts, specifically including hosts who use property management software. Buying a channel manager in order to self-manage can therefore change the fee structure on your Airbnb listing as a side effect. That is not an argument against software or against management. It is an argument for understanding the whole picture before a free-trial banner makes the decision for you.',
        ],
      },
      {
        heading: 'How ATLStay runs a Vrbo listing',
        body: [
          'Onboarding starts with the property, not the platform. We walk the home, photograph it properly, and build a readiness list — the amenities that are missing, the wear that will show in reviews, the sleeping arrangement that needs rethinking, the licence or permit question that needs answering for that specific city or county. Georgia short-term-rental rules are genuinely local: what is routine in Blue Ridge is not what is required in Savannah, and neither matches the City of Atlanta. Fannin, Gilmer, Lumpkin, White and Chatham counties each apply their own treatment, HOA covenants sit on top of all of it, and getting that wrong after you have taken bookings is far more expensive than getting it right before you take any.',
          'The listing itself is written, not generated. Title and description are built around how Vrbo guests search for that property type in that market — "cabin with hot tub near downtown Blue Ridge" behaves nothing like "walkable Midtown home near the BeltLine". Amenities are mapped exhaustively, because Vrbo filters are unforgiving and an unticked box removes you from a search you would have won. Sleeping arrangements get the same scrutiny. A Vrbo guest is booking for a specific group, and a listing claiming to sleep ten without showing where those ten people actually sleep loses to the one that does. We document every bed, every bathroom and every space a family will care about, then write house rules that are enforceable rather than aspirational.',
          'Then it is run daily. Pricing moves nightly against real demand — Atlanta\'s convention and stadium calendar, fall foliage in the mountains, Fourth of July on the lakes, St Patrick\'s in Savannah, graduation and game weekends in Athens. Minimum stays flex by season so a three-night family booking does not get blocked by a one-night gap, and gap nights get priced to fill rather than left to rot. Guest messaging is covered around the clock. Turnovers are hotel-grade, with checks between every stay.',
          'And you see it. Monthly reporting shows what booked, what it earned, what we changed and why. No dashboard mystery, no "trust the process" — the actual decisions, in plain English, on a schedule. You also keep the relationship with your own home: block your own dates, use the house when you want it, and hear about anything material before it happens rather than after. We have never met an owner who wanted less information about their own property, which is why the default here runs the other way.',
        ],
      },
      {
        heading: 'Where Vrbo pulls hardest in Georgia',
        body: [
          'Vrbo\'s centre of gravity in Georgia is the whole-home leisure trip, and that maps almost perfectly onto four corridors. The North Georgia mountains — Blue Ridge, Ellijay, Helen, Dahlonega, Big Canoe, Jasper and up toward Clayton and Dillard — run on cabins built for groups, with a fall foliage peak that can carry a meaningful share of the year in about six weeks. Families book those trips months out, which is exactly the booking window Vrbo is strongest in. Mountain homes also carry an operating load that punishes absentee owners — hot tubs needing scheduled service and water checks between guests, wood stoves and fireplaces needing sweeps and seasoned firewood, steep gravel drives that decide whether a cleaner arrives on time, and a freeze protocol that has to run on the forecast rather than after a burst pipe.',
          'The lakes are the second corridor. Lake Lanier, Lake Oconee and Lake Hartwell sell a summer that starts warming after Easter and peaks hard around the Fourth of July, with multi-night minimums and group sizes that suit Vrbo\'s audience far better than a one-night city stay. Buford, Cumming, Gainesville and Sugar Hill all feed that market. Lake houses also come with an operational layer Vrbo guests will review you on directly: dock condition and swim-area safety, boat-lift rules, storm-day communication when a thunderstorm shuts the water down, and the lakefront cleanup a windy week leaves behind. Getting those right is the difference between a five-star summer and a run of four-star reviews nobody can explain.',
          'The coast is the third: Tybee Island, St Simons, Jekyll Island, Brunswick and the Savannah corridor, where a deep family summer is bracketed by spring break, St Patrick\'s Day weekend and warm autumn weekends. And the fourth, less obvious one, is intown Atlanta and the inner suburbs — whole homes in Decatur, Roswell, Marietta, Sandy Springs, Alpharetta and Milton that host visiting families, wedding parties, relocation stays and the group travel that a condo simply cannot absorb.',
          'If your property sits in any of those four, Vrbo deserves to be a properly managed channel rather than an afterthought listing you built once and forgot. And if it sits inside more than one demand pattern — a Savannah house catching both family summers and St Patrick\'s weekend, or an Alpharetta home drawing corporate stays midweek and wedding parties at the weekend — the channel mix matters more, not less, because the same calendar has to be sold to two different audiences at two different prices without either one cannibalising the other.',
        ],
      },
      {
        heading: 'This is not for you if…',
        body: [
          'We would rather lose the enquiry than take on a home we cannot make work, so here is the honest disqualification list. This is not for you if you are renting a private room or a shared space — Vrbo is a whole-property marketplace and that inventory belongs elsewhere. It is not for you if your HOA, condo association or lease prohibits short-term rental; we verify covenants during onboarding and we will not list a property into a fight it is going to lose.',
          'It is not for you if what you actually want is a guaranteed monthly cheque with no variance. That is a lease, not a short-term rental, and pretending otherwise helps nobody — ask us about long-term or mid-term management instead and we will tell you straight which one your property is better suited to. Short-term income is seasonal by nature, and in Georgia it is emphatically seasonal: a mountain cabin can earn a disproportionate share of its year inside about six weeks of autumn, and a lake house does much the same across one summer. If that shape does not fit the way you need the money to arrive, the honest answer is a different product, not a more optimistic projection.',
          'It is not for you if you want to keep control of the calendar, the pricing and the guest messages, and just need a cleaner and a software subscription. That is self-management with support, it is a completely legitimate choice, and we are not the cheapest way to buy it. And it is not for you if the deciding factor is finding the lowest percentage in Atlanta. There is always someone cheaper. What they are cheaper at is usually the part you only notice six months in, when the review average has slipped two tenths and nobody can tell you why.',
          'If none of that describes you, the next step is simple: we run the numbers on your actual address and show you what the home should be earning across Vrbo and every other channel it belongs on. No obligation, and no pressure. If the projection says your property is better off doing something else entirely, we will say that as clearly as we would say the opposite — we would rather be the company that told you the truth once than the company that managed your house badly for a year.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How much does it cost to list my property on Vrbo?',
        a: 'Nothing to list. Expedia Group states there is no up-front cost associated with listing a property on Vrbo. You are charged when you get booked: booking fees consist of a 3% payment processing fee and a 5% commission fee, so roughly 8% of the booking goes to the platform. Management is separate from that — our rate is quoted to you in writing before you sign anything, and it is published on our pricing page.',
      },
      {
        q: 'Is Vrbo better than Airbnb for an Atlanta or Georgia property?',
        a: 'Neither is better in the abstract — they are different marketplaces, and most owners should be on both. Airbnb has the deeper pool of demand, particularly for intown Atlanta, shorter stays and last-minute travel. Vrbo skews toward whole properties, families and groups, and longer trips booked further ahead, which is why it tends to over-perform on cabins, lake houses, beach houses and larger suburban homes. Fee structures also differ, and that gap has widened as Airbnb migrates hosts to a single host-paid fee.',
      },
      {
        q: 'Why is my Vrbo listing showing up on Expedia and Travelocity?',
        a: 'Because Vrbo enrolled it in its Expanded Distribution Network. Vrbo states that if a listing meets eligibility requirements it is automatically enrolled, and that there is no additional cost for reservations received through that distribution. Eligible listings can appear on Expedia, Travelocity and Trivago, through the Travel Agent Affiliate Program, and via partners including Delta and Revolut. Nobody copied your listing, and you are not paying extra commission for those bookings.',
      },
      {
        q: 'Do I need a channel manager or connectivity software to list on Vrbo?',
        a: 'Not to list. Expedia Group is explicit that you do not need a connectivity software provider to list a property and get bookings on Vrbo, and only recommends one if you have more than 10 properties. If you own one to three homes, software is not your bottleneck — daily pricing, fast guest response and consistent turnovers are. Once your home is live on several channels at once you do need one synced calendar underneath them, and that is part of what we run for you rather than something you buy.',
      },
      {
        q: 'Can you manage my property on Vrbo and Airbnb at the same time without double-bookings?',
        a: 'Yes — that is the standard setup. Your home runs on Airbnb, Vrbo and Booking.com with a single synced calendar, so a booking on any one channel immediately closes those dates everywhere else. Each listing is optimised separately, because the platforms reward different things, but they all draw from one availability source. We also run a direct-booking channel alongside them for repeat and referral guests.',
      },
      {
        q: 'What kinds of properties do best on Vrbo in Georgia?',
        a: 'Whole homes with real sleeping capacity. North Georgia cabins around Blue Ridge, Ellijay, Helen and Dahlonega; lake houses on Lanier, Oconee and Hartwell; coastal homes on Tybee, St Simons and Jekyll; and larger intown and suburban Atlanta homes that host visiting families, wedding parties and group travel. Studios, private rooms and shared spaces are not a fit for the channel.',
      },
      {
        q: 'How long does it take to get my home live on Vrbo?',
        a: 'Most homes are live and taking bookings within about two weeks of signing. That window covers the property walk-through and readiness list, professional photography, listing copy and amenity mapping, pricing setup, licensing and permit checks for your specific city or county, and calendar sync with your other channels. Homes that need furnishing, repairs or a permit that has not been applied for take longer, and we tell you that at the walk-through rather than after you sign.',
      },
      {
        q: 'Do I have to sign a long-term contract?',
        a: 'No. We do not use long-term lock-ins, and your management rate is quoted up front, in writing, before you sign anything. If we are not earning our keep you should be able to leave, and a contract that traps an unhappy owner is a sign a company has stopped competing on results.',
      },
    ],

    sources: [
      {
        claim: '"There is no up-front cost associated with listing your property on Vrbo." Booking fees consist of a 3% payment processing fee and a 5% commission fee.',
        publisher: 'Expedia Group — Vacation Rentals partner site',
        url: 'https://partner.expediagroup.com/en-us/industries/vacation-rentals',
        asOf: 'August 2026',
      },
      {
        claim: '"You don\'t need to work with a connectivity software provider to list your property and get bookings on Vrbo. However, if you have more than 10 properties, using a connectivity software provider will help you manage your properties more easily and effectively."',
        publisher: 'Expedia Group — Vacation Rentals partner site',
        url: 'https://partner.expediagroup.com/en-us/industries/vacation-rentals',
        asOf: 'August 2026',
      },
      {
        claim: 'Vrbo\'s Expanded Distribution Network places eligible listings on Expedia, Travelocity and Trivago, through the Travel Agent Affiliate Program and via partners including Delta and Revolut. "If your listing meets eligibility requirements, it will be automatically enrolled in the program," and "there is no additional cost for reservations received on listings from Vrbo\'s Expanded Distribution."',
        publisher: 'Vrbo Help Centre',
        url: 'https://help.vrbo.com/articles/What-is-the-Expanded-Distribution-Network',
        asOf: 'August 2026',
      },
      {
        claim: 'Under Airbnb\'s split-fee structure, "most hosts pay a 3% service fee". Under the single-fee structure, "the entire fee is deducted from the host\'s payout" and "most hosts pay 15.5%, remaining hosts typically pay 14%-16%".',
        publisher: 'Airbnb Help Centre — Airbnb service fees',
        url: 'https://www.airbnb.com/help/article/1857',
        asOf: 'August 2026',
      },
      {
        claim: 'Airbnb\'s single-fee structure "is mandatory for certain hosts, including traditional hospitality listings…, hosts who use property management software, and hosts in countries subject to this fee structure," and the split-fee structure will no longer be available to those hosts.',
        publisher: 'Airbnb Help Centre — Airbnb service fees',
        url: 'https://www.airbnb.com/help/article/1857',
        asOf: 'August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'blue-ridge', 'ellijay', 'helen', 'dahlonega', 'big-canoe', 'jasper', 'cleveland',
      'hiawassee', 'young-harris', 'clayton-ga', 'dillard', 'clarkesville', 'toccoa', 'lake-lanier',
      'lake-oconee', 'hartwell', 'buford', 'cumming', 'gainesville', 'sugar-hill', 'savannah',
      'tybee-island', 'st-simons-island', 'jekyll-island', 'brunswick', 'pooler', 'richmond-hill',
      'madison', 'social-circle', 'senoia', 'athens', 'marietta', 'roswell', 'alpharetta', 'milton',
      'decatur', 'sandy-springs', 'woodstock', 'canton',
    ],
    relatedResources: [
      'airbnb-vs-vrbo-for-atlanta-hosts',
      'direct-booking-for-atlanta-hosts',
      'airbnb-channel-manager-guide',
      'airbnb-listing-optimization-guide',
      'why-professional-airbnb-photos-matter',
    ],
    relatedServices: ['direct-booking', 'marriott-homes-villas', 'mid-term-rental-management'],

    heroImageKey: 'northGeorgia',
    published: true,
    order: 1,
  },

  // ---------------------------------------------------------------------------
  // 2. DIRECT BOOKING + MULTI-CHANNEL DISTRIBUTION
  // ---------------------------------------------------------------------------
  {
    slug: 'direct-booking',
    name: 'Direct Booking & Multi-Channel Distribution',
    category: 'platform',

    headlineKeyword: 'Direct Booking Websites & Channel Management in Atlanta',
    eyebrow: 'Platform management',
    tagline: 'Own the guest relationship. Keep one calendar. Never double-book.',

    seoTitle: 'Direct Booking Site & Channel Management, Atlanta',
    seoDescription:
      'A direct booking website plus synced Airbnb, Vrbo and Booking.com listings for Georgia owners — one calendar, no double-bookings, less platform dependence.',
    intro:
      'Every booking that comes through a platform costs you a percentage and gives you a guest the platform owns. A direct channel changes both — but only if it sits on top of proper multi-channel distribution and one synced calendar. ATLStay builds and runs the whole stack for Georgia owners.',

    forWhom: [
      'Owners with an established listing and a growing base of repeat and referral guests',
      'Hosts watching platform fees climb and wanting a channel where the fee structure is theirs to set',
      'Owners running two or more channels who have already had a near-miss on a double-booking',
      'Second-home and portfolio owners who want a branded property site guests can find and trust',
      'Corporate, relocation and group enquiries you currently have no clean way to accept',
    ],

    included: [
      'A branded direct-booking website for your property — built, hosted and maintained, not a template you have to babysit',
      'A real booking engine with live availability and secure card payment, so a guest books and pays without an email chain',
      'One synced calendar across Airbnb, Vrbo, Booking.com and direct, so any booking closes those dates everywhere',
      'Listing optimisation on every channel separately — each platform rewards different things',
      'Nightly dynamic pricing applied consistently across channels, including your direct rates',
      'Rate and policy strategy per channel, so direct is genuinely the best place for a returning guest to book',
      'Repeat-guest capture: post-stay follow-up within platform rules, plus an owned guest list you keep',
      'Damage protection, deposit handling and clear cancellation terms on direct bookings',
      '24/7 guest communication across every channel, including direct enquiries',
      'Local search visibility for the property site so it can be found by name and by market',
      'Monthly reporting split by channel, so you can see exactly where the revenue came from',
      'A management rate quoted up front, in writing, before you sign — published, not hidden behind a proposal',
    ],

    sections: [
      {
        heading: 'What a direct-booking channel actually is — and what it is not',
        body: [
          'A direct booking is any reservation where the guest finds you, books with you and pays you without a marketplace sitting in the middle. In practice that means three pieces of infrastructure: a property website a guest can trust, a booking engine holding live availability so two people cannot claim the same week, and a payment path that feels as safe to the guest as tapping "reserve" on an app they already have. Everything else people call direct booking — an Instagram DM, a Google Form, a bank transfer arranged over text — is not a channel. It is an admin burden with a double-booking risk attached, and it is the reason most owners try direct once and quietly give up on it.',
          'What it is not is a replacement for the platforms. This is where most direct-booking advice goes wrong. Airbnb, Vrbo and Booking.com are not just payment processors — they are discovery engines with enormous reach and a built-in trust layer that a new listing cannot manufacture. Switching them off to "save the fees" is how a fully booked home becomes a quiet one. A marketplace listing is doing several jobs at once: putting your home in front of people who were not looking for it, vouching for you to a guest who has never heard of you, holding the money until check-in, and standing behind the transaction if something goes wrong. Removing all four to save a percentage is not a saving.',
          'The realistic goal is different and much more achievable: keep the platforms doing what they are genuinely good at — putting your home in front of strangers — and stop paying a discovery fee on guests who were never strangers. The family that stayed last October and wants the same week this year did not need to be discovered. Neither did the referral their neighbour sent you, or the corporate account that books your place four times a year.',
          'Done properly, direct becomes a growing share of your calendar over time rather than a switch you flip. It compounds, because every stay adds to the list of people who already know your home. That is the part owners underestimate. A platform listing resets its argument with every new guest; a direct channel accumulates. Three years of well-run stays produces a list of people who have already trusted you with a holiday, and that list does not care what any marketplace decides to charge next year.',
        ],
      },
      {
        heading: 'The fee math, with the platforms\' own published numbers',
        body: [
          'Start with what the platforms say themselves. Vrbo\'s booking fees, per Expedia Group, are a 3% payment processing fee plus a 5% commission fee — roughly 8% of the booking. Airbnb historically ran a split fee where "most hosts pay a 3% service fee" with a separate guest service fee added on top, and is now migrating hosts to a single fee where, in Airbnb\'s words, "the entire fee is deducted from the host\'s payout" and "most hosts pay 15.5%".',
          'For professionally managed properties that second structure is not optional. Airbnb states the single fee is mandatory for certain hosts, specifically including hosts who use property management software — and any managed listing runs on that software. So the honest framing for an owner is this: the host-side cost of an Airbnb booking is materially higher than the 3% many owners still have in their heads, and the price a guest sees is now the number your payout is calculated from. That last detail is the one that catches people out. Under the old split fee, an owner setting a nightly rate was setting the number they broadly expected to receive. Under a single fee, the same rate is the number the deduction comes out of, so a calendar that was priced by hand and never revisited silently earns less every night it sells.',
          'Apply Airbnb\'s own published rate and the arithmetic is easy to follow. At the 15.5% most hosts pay, a $250 night gives up $38.75 to the platform. The same $250 night on Vrbo\'s published 3% plus 5% gives up $20. Ten booked nights a month is a real number, every month, forever. A direct booking does not make that cost vanish — card processing still applies on any transaction — but it does put the structure in your hands instead of in a fee schedule that can be revised without your input.',
          'That last point is the one that matters most. Platform economics change, and 2026 is a live demonstration: Airbnb built a price adjustment tool inside its own app because so many hosts would otherwise have been quietly earning less per night after the migration. Owners with a direct channel and an owned guest list absorb changes like that. Owners with a single platform listing simply take them. This is not a prediction about any particular platform behaving badly — Airbnb, Vrbo and Booking.com are all legitimate businesses providing real reach and real services. It is a straightforward observation about concentration risk. Any business whose entire revenue arrives through one counterparty is a business whose margin is set by that counterparty, and short-term rental is not exempt from that rule just because the counterparty has a friendly app.',
        ],
      },
      {
        heading: 'One calendar. No double-bookings. This is the non-negotiable part.',
        body: [
          'The moment a home is live on more than one channel, availability becomes a synchronisation problem. Two guests can book the same Saturday within seconds of each other on two different sites, and the platforms do not talk to each other on your behalf. The result is a cancellation you have to make, a guest whose trip you just broke, and a penalty on your listing that hurts ranking long after the incident is forgotten.',
          'We run every managed property on a single availability source. Airbnb, Vrbo, Booking.com and your direct site all read from and write to the same calendar, so a booking on any one of them closes those dates on all the others in near real time. Rates and minimum stays push out from one place too, which is the only way to keep pricing coherent when the same home is quoted in four places at once.',
          'It also removes a class of quiet revenue leak that owners rarely spot: stale minimum stays and orphan gap nights. When channels drift apart, a two-night gap between bookings gets blocked on one platform and priced wrong on another, and it just never sells. Managed centrally, those gaps get priced to fill rather than left to expire. Atlanta punishes this particularly hard, because so much of the calendar is event-shaped. A convention at the Georgia World Congress Center, a stadium weekend, Dragon Con, Music Midtown, a graduation weekend in Athens or Masters week in Augusta all move demand sharply for a few days, and a channel that is out of sync for those days is not losing a small amount of money. It is missing the nights that pay for the quiet ones.',
          'You never touch any of this. You do not buy the software, configure it or maintain it. It is infrastructure, and infrastructure should be invisible right up until the moment somebody asks why you have never had a double-booking. It is worth saying plainly what a double-booking actually costs, because owners tend to price it as an inconvenience. It is a cancellation you have to make on a trip somebody has already planned, a guest who will say so publicly, a penalty applied to the listing that suppresses your ranking well after the incident is forgotten, and — if it lands on a peak weekend — a night you cannot resell at anything close to the rate you lost.',
        ],
      },
      {
        heading: 'Where direct bookings actually come from',
        body: [
          'The fantasy version of direct booking is a beautiful website that strangers find on Google and book cold. That happens, eventually, for some properties in some markets — but it is nobody\'s first direct booking and it is a bad reason to start. Owners who build the site first and wait for traffic usually conclude within a season that direct booking does not work. What did not work was the order of operations.',
          'Your first and best source is people who have already stayed. A guest who loved the house is warm inventory: they already trust it, they know the neighbourhood, and they are far more likely to repeat than a stranger is to convert. We handle post-stay follow-up inside platform messaging rules and build an owned guest list, so returning guests have an obvious, easy path back that does not route through a marketplace.',
          'Second is referral and word of mouth — the sister of last summer\'s guest, the wedding party that saw the house at a rehearsal dinner, the neighbour who needs somewhere for visiting family at Thanksgiving. These people are looking for your specific home, and if there is nowhere to send them they end up on a platform anyway, costing you a fee on a booking you had already earned. This is the quiet leak in most owners\' calendars. The booking was always coming; the only open question was whether it arrived through a channel that charged you for the introduction it did not make.',
          'Third is local and corporate demand that platforms handle badly: relocation stays, insurance displacement housing, film and production crews, medical travellers, sports tournament weekends, and the reunion or wedding block where one contact wants to book several homes at once. That demand wants a person, an invoice and a clear agreement. A property site with a real booking path plus a manager who answers the phone converts it. A marketplace listing frequently does not. Atlanta produces an unusual amount of this demand. It is a major film and television production market, a medical hub around Emory, Piedmont, Grady and Northside, a convention city, and a relocation destination for corporate moves — all of which generate stays that are longer than a weekend, booked by somebody who needs paperwork, and awkward to transact through a nightly marketplace built for holidays.',
        ],
      },
      {
        heading: 'A direct booking has to feel safer than a platform booking',
        body: [
          'Ask an owner why they do not push direct bookings and the honest answer is usually trust — theirs and the guest\'s. The guest is being asked to send several hundred or several thousand dollars to a website they have never heard of, giving up the dispute process they are used to. The owner is worried about chargebacks, damage and having no platform to escalate to. Both concerns are legitimate, and both are solvable with structure rather than optimism. It helps to be honest about what the platforms are actually selling here. A large part of their fee buys trust, not traffic: an escrowed payment, a dispute process, a review history a stranger can read, and somebody to complain to. Any direct channel that ignores that and simply asks a guest to wire money to a stranger is not undercutting the platforms. It is removing the product.',
          'On the guest side, the fixes are practical: real photography and a property site that looks like a business rather than a hobby, secure card payment through an established processor, a written cancellation and refund policy that is easy to find before checkout, an instant confirmation, and a named human with a phone number who replies quickly. Most of the trust gap closes right there. Reviews help too, and they are easy to move across: a page of verified guest quotes carried over from your platform listings gives a first-time direct guest the same reassurance they would have got from scrolling a marketplace profile.',
          'On the owner side, we set the terms before the first direct guest arrives — deposit or damage protection, a signed rental agreement, guest verification, house rules that are actually enforceable, and clear documentation at check-in and checkout so any incident is a paperwork exercise rather than an argument. Direct booking without those pieces is not a channel; it is an exposure.',
          'Cancellation policy deserves its own mention. Direct is where you can be more flexible than a platform allows, and used deliberately that is a conversion advantage rather than a risk. We set direct policies to be genuinely attractive to repeat guests while protecting your calendar from speculative holds. The same is true of rate strategy. Direct should be the best place for a returning guest to book — that is the whole point — but it should not quietly undercut your platform listings by so much that it trains guests to treat marketplace prices as a decoy. Getting that balance right is a pricing decision, made deliberately, rather than a discount picked at random.',
        ],
      },
      {
        heading: 'What we build, and what we run for you',
        body: [
          'The build is a branded website for your property or portfolio, with a booking engine holding live availability and secure card payment. It is written for the way guests actually search for a stay in your market, structured so search engines can read it, and set up so the home can be found by name and by neighbourhood rather than only by chance. It carries the same photography as your platform listings, real availability rather than a contact form, the house rules and cancellation terms in plain sight, and a local phone number that a human answers. Guests check. A property site that looks abandoned does more damage than no site at all, which is why maintaining it is part of the service rather than a one-off build.',
          'Around it we connect the channels: Airbnb, Vrbo and Booking.com listings, each optimised separately because each algorithm rewards different things, all reading from the same calendar as your direct site. Nightly dynamic pricing runs across the whole set, with rate and policy strategy tuned per channel so the direct route is genuinely the best deal for a guest who already knows you.',
          'Then it is operated. Enquiries answered around the clock wherever they land. Turnovers, restocking and maintenance handled by vetted local vendors. Reviews managed on the platforms and testimonials gathered for the property site. Post-stay follow-up that grows the guest list. Monthly reporting split by channel so you can see, in plain numbers, what direct is now worth to you. That split matters more than any single month\'s total. It is the only way to tell whether the direct channel is genuinely adding bookings or simply moving reservations that would have arrived anyway, and it is the number we would want to see if we were the owner rather than the manager.',
          'And the commercial terms are stated the same way the rest of this page is: your management rate is quoted up front, in writing, before you sign anything, and it is published rather than buried in a proposal. There is no separate charge for the website, no setup fee for the booking engine, and no line item for the channel manager sitting underneath it. It is one management relationship covering the whole stack, which is the only structure under which a manager has any real incentive to make the direct channel work.',
        ],
      },
      {
        heading: 'Honest limits — when direct booking is the wrong priority',
        body: [
          'If your listing is brand new with few or no reviews, direct booking is not your next move. Reach and social proof are, and the platforms supply both far faster than a new website can. Build the review base first, then start capturing the repeat demand it produces. Doing it in the other order is how owners end up with a lovely site and an empty calendar.',
          'If you own a single property in a market with thin repeat demand — a one-off business-travel condo, for instance — the ceiling on direct is genuinely lower, and we will say so rather than sell you a website you will not fill. Direct rewards homes people want to come back to: cabins, lake houses, beach houses, larger family homes, and anything with a distinctive character guests remember by name.',
          'And if you are not prepared to have somebody handle enquiries, payments, agreements and incidents properly, direct booking will cost you more than it saves. The platforms are charging for real services, not just discovery, and the moment you step outside them somebody has to do that work. That somebody is us, or it is you at 11pm. The fee you save is real, but it is not free money — it is payment for work that has moved rather than disappeared, and an owner who has not decided who is doing that work has not actually decided to run a direct channel.',
          'Where it does fit, it compounds quietly and permanently. Every stay adds a name to a list you own, and that list is the only asset in short-term rental that no platform can reprice on you. So the sequence we recommend is simple and unglamorous: get the listings excellent and the reviews deep first, run every platform that suits the property, put the direct channel underneath all of it, and let it fill from the guests those platforms already brought you. Two or three seasons in, it stops being an experiment and starts being the reason the calendar holds up when something changes.',
        ],
      },
    ],

    faqs: [
      {
        q: 'What is a direct booking for a short-term rental?',
        a: 'It is a reservation where the guest books and pays you directly rather than through Airbnb, Vrbo or Booking.com. In practice it needs three things: a property website the guest trusts, a booking engine holding live availability so dates cannot be double-sold, and a secure payment path. You keep the full nightly rate less card processing, and you own the guest relationship — but you also take on the agreement, the verification and any dispute the platform would otherwise absorb.',
      },
      {
        q: 'Should I stop listing on Airbnb and Vrbo if I have a direct booking site?',
        a: 'No. The platforms are discovery engines with reach and a trust layer that a standalone site cannot replicate quickly, and turning them off usually costs more in empty nights than it saves in fees. The strategy that works is to run the platforms for reach and capture repeat, referral and corporate guests directly. Direct then grows as a share of the calendar over time instead of being a risky switch you flip.',
      },
      {
        q: 'How much do Airbnb and Vrbo actually take from a booking?',
        a: 'Vrbo publishes booking fees of a 3% payment processing fee plus a 5% commission fee, so about 8% of the booking. Airbnb has historically run a split fee where most hosts pay a 3% service fee with a separate guest service fee added on top, and is migrating hosts to a single fee where the entire fee comes out of the host payout — Airbnb states most hosts pay 15.5% under that structure, and that it is mandatory for certain hosts including those using property management software.',
      },
      {
        q: 'How do you stop double-bookings across multiple platforms?',
        a: 'Every managed property runs on one availability source. Airbnb, Vrbo, Booking.com and your direct site all read from and write to the same calendar, so a booking on any channel closes those dates on the others in near real time. Rates and minimum stays are pushed from the same place, which also prevents the quieter problem of channels drifting apart and leaving gap nights mispriced or blocked.',
      },
      {
        q: 'How do I get my first direct bookings?',
        a: 'From guests who have already stayed. Post-stay follow-up within platform rules, an owned guest list and an obvious path back to book directly will produce your first direct reservations far faster than search traffic will. Referrals are next, then local and corporate demand — relocation, insurance displacement, production crews, medical travellers, tournaments and wedding blocks — which platforms handle poorly and a real website plus a responsive manager converts well.',
      },
      {
        q: 'Is direct booking safe? What about chargebacks and damage?',
        a: 'It is safe when it is structured. On the guest side that means secure card payment through an established processor, a clear written cancellation policy available before checkout, instant confirmation and a named contact who answers. On your side it means a signed rental agreement, guest verification, a deposit or damage protection, enforceable house rules, and documented condition at check-in and checkout. Direct booking without those pieces is not a channel, it is an exposure.',
      },
      {
        q: 'Who owns the website and the guest list?',
        a: 'You do. The property site is built for your home and your brand, and the guest list produced by your stays is yours. We build, host, maintain and operate it as part of management, but it is not a hostage. Any company that makes leaving mean losing your own guest data has told you something important about how it expects to keep your business.',
      },
      {
        q: 'Will a direct booking site help my property show up on Google?',
        a: 'It gives you something that can. A platform listing ranks for the platform; a property site can rank for your home by name, for your neighbourhood and market, and for the specific kind of stay you offer. We structure and write the site so search engines can read it and so it holds up for guests who look you up after seeing the home elsewhere. It is a long game rather than an overnight channel, which is exactly why it should run alongside the platforms rather than instead of them.',
      },
    ],

    sources: [
      {
        claim: 'Vrbo booking fees "consist of a 3% payment processing fee and a 5% commission fee", and there is no up-front cost to list.',
        publisher: 'Expedia Group — Vacation Rentals partner site',
        url: 'https://partner.expediagroup.com/en-us/industries/vacation-rentals',
        asOf: 'August 2026',
      },
      {
        claim: 'Under Airbnb\'s split-fee structure, "most hosts pay a 3% service fee". Under the single-fee structure, "the entire fee is deducted from the host\'s payout" and "most hosts pay 15.5%, remaining hosts typically pay 14%-16%".',
        publisher: 'Airbnb Help Centre — Airbnb service fees',
        url: 'https://www.airbnb.com/help/article/1857',
        asOf: 'August 2026',
      },
      {
        claim: 'Airbnb\'s single-fee structure "is mandatory for certain hosts, including… hosts who use property management software", and Airbnb built an in-app price adjustment tool to help hosts transitioning from the split fee re-price their listings.',
        publisher: 'Airbnb Help Centre — Airbnb service fees',
        url: 'https://www.airbnb.com/help/article/1857',
        asOf: 'August 2026',
      },
      {
        claim: 'Vrbo automatically enrols eligible listings in its Expanded Distribution Network at "no additional cost for reservations received", placing them on Expedia, Travelocity, Trivago, the Travel Agent Affiliate Program and partners including Delta and Revolut.',
        publisher: 'Vrbo Help Centre',
        url: 'https://help.vrbo.com/articles/What-is-the-Expanded-Distribution-Network',
        asOf: 'August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'sandy-springs', 'roswell', 'alpharetta', 'marietta', 'smyrna', 'decatur',
      'brookhaven', 'dunwoody', 'johns-creek', 'kennesaw', 'duluth', 'vinings', 'milton',
      'woodstock', 'canton', 'peachtree-city', 'newnan', 'savannah', 'tybee-island',
      'st-simons-island', 'blue-ridge', 'ellijay', 'helen', 'dahlonega', 'big-canoe',
      'lake-lanier', 'lake-oconee', 'buford', 'cumming', 'athens', 'columbus', 'augusta',
      'macon', 'gainesville',
    ],
    relatedResources: [
      'direct-booking-for-atlanta-hosts',
      'airbnb-channel-manager-guide',
      'airbnb-vs-vrbo-for-atlanta-hosts',
      'how-airbnb-search-ranking-works',
      'scaling-to-multiple-short-term-rentals',
    ],
    relatedServices: [
      'vrbo-management',
      'marriott-homes-villas',
      'mid-term-rental-management',
      'long-term-rental-management',
    ],

    heroImageKey: 'pricingDashboard',
    published: true,
    order: 2,
  },

  // ---------------------------------------------------------------------------
  // 3. HOMES & VILLAS BY MARRIOTT BONVOY
  // ---------------------------------------------------------------------------
  // COMPLIANCE: no partner claim, no approval claim, no programme commission
  // figure, no unverified portfolio minimum. Authority + guidance + lead capture
  // only. Everything factual below is quoted from Marriott's own public FAQ.
  {
    slug: 'marriott-homes-villas',
    name: 'Homes & Villas by Marriott Bonvoy Listing Management',
    category: 'platform',

    headlineKeyword: 'How to List Your Home on Homes & Villas by Marriott Bonvoy',
    eyebrow: 'Platform management',
    tagline: 'The one channel you cannot list on yourself — and what that means for your home.',

    seoTitle: 'How to List Your Home on Marriott Homes & Villas',
    seoDescription:
      'Marriott requires homeowners to list through a property management company. Here is how the programme works and what an Atlanta home needs to qualify.',
    intro:
      'Homes & Villas by Marriott Bonvoy does not accept listings from individual homeowners. Marriott says so itself: owners have to go through a property management company. This page explains how the programme actually works, what Marriott guarantees on every home listed, and how to work out whether your Georgia property is in that conversation at all.',

    forWhom: [
      'Owners of premium and luxury whole homes who have searched "how to list my home on Marriott" and hit a wall',
      'Second-home owners in Buckhead, Milton, Alpharetta, Blue Ridge, the lakes or the coast weighing the loyalty-travel audience',
      'Hosts already performing well on Airbnb and Vrbo who want to understand the tier above',
      'Owners who want a straight assessment of whether their home clears a premium bar — including when the answer is not yet',
      'Owners who would rather have the mechanics explained honestly than be sold a promise nobody can put in writing',
    ],

    included: [
      'A candid read on your home against premium and luxury expectations — layout, finish, amenities, location and condition',
      'A written readiness plan: what a home at this tier is expected to have, and what yours is missing today',
      'Professional photography and listing copy built to premium standards, not phone photos and a template',
      'Professional cleaning before and after every stay, with quality checks between guests',
      '24/7 local guest support from a real team in Georgia, not an overseas answering service',
      'Premium linens, towels and consumables restocked to a consistent standard on every turnover',
      'Kitchen, connectivity and comfort essentials audited and kept complete, stay after stay',
      'Smoke and carbon monoxide detector checks and a documented safety walkthrough',
      'Full multi-channel management on the channels we run today — Airbnb, Vrbo, Booking.com and direct — with one synced calendar',
      'Nightly dynamic pricing and minimum-stay strategy tuned to the premium end of your market',
      'Honest guidance on the Homes & Villas route, including where it does not apply to your property',
      'A management rate quoted up front, in writing, before you sign anything',
    ],

    sections: [
      {
        heading: 'You cannot list your home on Homes & Villas yourself. That is by design.',
        body: [
          'If you have gone looking for a "list your home" button on the Homes & Villas by Marriott Bonvoy site, you did not miss it. There isn\'t one for individual owners. Marriott answers the question directly in its own FAQ: "We would love to consider your home! Individual homeowners will need to sign up with one of our property management companies who understand the standards and requirements of our platform."',
          'That single sentence is why this page exists. Almost every other booking channel in the world is self-serve — you make an account, upload photos, publish, and you are live within an afternoon. Homes & Villas is not. Marriott sells its home rentals as an extension of its hotel brand, which means it will not accept inventory it cannot hold to a service standard. And you cannot hold a home to a service standard through a homeowner who is at work on Tuesday when the air conditioning fails.',
          'So the route runs through a management company, and the separate FAQ answer aimed at those companies is equally direct: "If you are a property management company interested in working with us, please contact us and tell us more about your portfolio." Marriott evaluates the operator, not just the house. That is a meaningful distinction, and it is the part most owners searching for this never see explained. It also reframes the question owners usually arrive with. "Can I get my house on Marriott?" is really two questions stacked on top of each other: is this home the kind of home the programme wants, and is there an operator running it that Marriott is willing to stand behind. Those are answered separately, and the second one is not something an owner can fix by buying better towels.',
          'What follows is what Marriott publishes, what it means in practice for a Georgia property, and where we fit — stated plainly, including the parts most companies would leave vague. Everything factual on this page is quoted from Marriott\'s own public FAQ so you can check it yourself in about two minutes, which is roughly two minutes more verification than the average page on this subject will offer you.',
        ],
      },
      {
        heading: 'What Homes & Villas by Marriott Bonvoy actually is',
        body: [
          'In Marriott\'s own description, Homes & Villas by Marriott Bonvoy is "a global home rental offering launched in 2019 by Marriott Bonvoy with a vision to bring Marriott\'s 90+ years of hospitality expertise to the home rental market." It is not a general marketplace competing with Airbnb on breadth. Marriott states that it has "a focus only on the premium and luxury tier of rental homes" and that it "works with select property management companies to ensure that every home listed can be serviced at a standard expected of Marriott Bonvoy."',
          'Marriott describes the model in two parts. First, a highly curated offering: "We only work with property management companies offering premium and luxury private home inventory and each home is evaluated – either in person or digitally – before being listed on our site." Your house does not simply appear because a manager uploaded it; Marriott looks at it. Second, professionally managed homes only: every listed property is "professionally managed by one of our trusted property managers, who provide guests a professionally cleaned home with 24/7 local support team for assistance while staying at the booked home or villa, high-speed Wi-Fi, premium linens and amenities, and family friendly conveniences upon request."',
          'Read those two paragraphs as an owner and the shape of the programme becomes clear. The inventory bar is about the home. The operating bar is about whoever runs it. Both have to clear at once, which is why the "how do I list my home" question has no self-serve answer. It is worth noticing what Marriott is protecting with that structure. A hotel guest who has a bad night complains to a brand that can fix it on the spot; a rental guest who has a bad night is usually alone with a lockbox and a phone number nobody answers. A curated, professionally managed supply is how a hotel company sells homes without importing that failure mode into its loyalty programme.',
          'It is also why the programme is a genuinely different proposition from adding another marketplace listing. This is closer to putting your home into a hospitality brand\'s supply chain than to publishing an ad on a booking site. The practical consequence for an owner is that the usual short-term-rental levers matter less here than they do elsewhere. You cannot out-price your way in, you cannot out-market your way in, and a strong review history on another platform is helpful context rather than a qualification. What travels is the standard of the home and the capability of whoever runs it, which is exactly the pair of things most owners have never been asked to evidence before.',
        ],
      },
      {
        heading: 'What every home on the platform is guaranteed to include',
        body: [
          'Marriott publishes a floor, and it is worth reading closely because it doubles as a very good specification for any premium short-term rental, whether or not this particular programme ever applies to you. Marriott states that "every home listed on our site is guaranteed to include: 24/7 support; High-speed Wi-Fi; Television; Kitchen essentials (cookware, utensils, microwave); Premium linens and towels; Bathroom amenities (toilet paper, shampoo, conditioner, soap start-up kit); Hair dryer; Smoke detectors and carbon monoxide detectors where fuel-burning appliances are present; Professional cleaning pre- and post- stay."',
          'None of those items is exotic. What is demanding is the word "guaranteed" — it has to be true on every single stay, not on a good week. Premium linens means a stock rotation and a replacement budget, not one nice set that greys out by August. Kitchen essentials means somebody counts them after every guest, because the pan that walked out in June is a one-star review in July. Professional cleaning before and after every stay means a vetted cleaner and an inspection process, not a friend with a key.',
          'Twenty-four-hour support is the item owners underestimate most. It means a guest who cannot get the lock to open at 1am on a Sunday reaches a person who can solve it, locally, immediately. That is a staffing commitment rather than a phone number, and it is the single clearest line between a well-run rental and a well-marketed one. It is also the item an individual owner realistically cannot promise. Not because owners do not care — most care enormously — but because one person cannot be reliably awake, in the state, and free to drive to the property at every hour of every night of the year. That is a rota, and a rota is a company.',
          'This is exactly the standard we build toward on the premium homes we manage in Georgia, because it is the right standard regardless of channel. A home that genuinely holds that bar every stay performs better everywhere it is listed. It is also a useful self-test. Read that list again as a checklist for your own property and ask honestly whether every item would be true on a random Tuesday in February with a guest you have never met, when the regular cleaner is ill and the Wi-Fi router has been resetting itself for a week. That is the standard, and it is a staffing and systems answer rather than a shopping list.',
        ],
      },
      {
        heading: 'The Bonvoy guest is a different guest',
        body: [
          'The reason owners ask about this programme is rarely the listing itself. It is the audience behind it — Marriott Bonvoy members, who book inside a loyalty ecosystem rather than by scrolling a marketplace. A traveller with a substantial points balance and a status tier they care about is not making the same decision as somebody comparing three listings on price. They are deciding where the night counts, and that is a materially different buying motive from anything else in short-term rental.',
          'Marriott publishes the earning mechanics. Members earn "5 points earned per qualifying $1 USD spent, excluding booking fees, taxes, cleaning fees and extra add-ons during stay." Elite members earn more on top of that base: a 10% bonus at Silver Elite, 25% at Gold, 50% at Platinum, and 75% at Titanium Elite and Ambassador. And, importantly for how members think about where to stay, "for each night that is stayed with Homes & Villas by Marriott Bonvoy, members will earn 1 Elite Night Credit."',
          'That last one is the quiet driver. Elite Night Credits are the currency of status, and a traveller chasing or defending a tier has a concrete reason to choose a qualifying home over an equivalent property on a marketplace where the night counts for nothing. It is a different purchasing motive from price comparison, and it tends to select for guests who travel frequently, treat property well and have a loyalty account they do not want to jeopardise.',
          'It is worth being clear-eyed too: loyalty demand is a channel, not a guarantee, and it does not exempt a home from having to be excellent. Marriott\'s own model handles guest issues through the property management company — damages, add-on fees and stay support all route to the manager. The brand supplies the audience and the standard. Somebody local still has to deliver the stay. For an owner that cuts both ways. The upside is a guest who is likely to be an experienced traveller with a loyalty account they would rather not put at risk. The obligation is that the home has to be worth a Marriott name being attached to it on the night the air conditioning fails in July, and no points balance has ever repaired a bad stay.',
        ],
      },
      {
        heading: 'Portfolio minimums: why nobody can give you a clean number',
        body: [
          'The second question every owner asks is some version of "how many properties does a company need before Marriott will work with them?" You will find confident answers online. Treat all of them carefully, because Marriott does not publish a threshold on its own site, and the numbers circulating come from third parties rather than from Marriott. You will see figures quoted with total confidence on forums, in blog posts and by management companies competing for your business, and they do not agree with each other. That disagreement is the tell.',
          'What Marriott does publish is the process: property management companies are asked to "contact us and tell us more about your portfolio." That phrasing is deliberate. It is an evaluation, not a form with a numeric gate — portfolio size, market, property quality, operating capability and where Marriott currently needs supply all sit in the same assessment, and the answer for a given market in a given year is not the answer for another.',
          'We are not going to invent a figure to make this page sound more authoritative. What we will tell you is what actually determines the outcome for a home like yours: whether the property genuinely sits in the premium or luxury tier, whether it is in a destination the programme is trying to serve, and whether the operator behind it can hold a hospitality standard on every stay. Those three are within your influence. The published-threshold question mostly is not.',
          'If you want a straight read on where your specific property sits against that bar, that is a conversation worth having before you invest in anything else. It is also the cheapest step available to you. A walk-through and an honest opinion costs you an hour; a speculative renovation aimed at a threshold nobody has published can cost a great deal more and still leave the actual question unanswered. And whatever the answer turns out to be, the work it points to is the same work that makes the home earn more on Airbnb, on Vrbo and on your own direct channel. Nothing spent on getting a property genuinely premium is wasted if the Marriott route never materialises.',
        ],
      },
      {
        heading: 'Where ATLStay fits — stated plainly',
        body: [
          'Here is the part we will not be vague about, because you deserve to know exactly what you are being offered. ATLStay is not claiming to be an approved, select or partnered Homes & Villas by Marriott Bonvoy property manager, and nothing on this page should be read that way. If a management company tells you it can put your home on Marriott, ask it to show you that relationship in writing before you sign anything. That request is reasonable, and how a company responds to it tells you a great deal.',
          'What we do is the work that sits underneath any premium channel. We manage whole homes across metro Atlanta, the North Georgia mountains, the lakes and the Georgia coast to a hospitality standard — professional photography, listing craft, nightly pricing, 24/7 local guest support, hotel-grade turnovers with checks between every stay, premium linen and consumable programmes, vendor management, and documented safety and maintenance routines. We distribute on the channels we actually run: Airbnb, Vrbo, Booking.com and a direct-booking channel, all on one synced calendar.',
          'We will also give you an honest assessment of the Homes & Villas route for your specific property, including when the honest answer is that it is not the right question yet — because the home needs a renovation, or because the finish level is mid-market rather than premium, or because your income goal is better served by mid-term corporate demand than by nightly luxury travel. Marriott itself tells owners to contact the programme to be connected with management companies relevant to their home\'s location, and you should absolutely do that alongside talking to us.',
          'That is the whole offer, without embroidery. Everything above about how the programme works is quoted from Marriott\'s own published FAQ, so you can go and read the source rather than taking our word for it. We would rather rank for this search by being the page that finally explains the mechanics accurately than by making a claim we cannot evidence. If that costs us an enquiry from an owner who wanted to hear something more exciting, we can live with it — and if it ever changes, it will change with documentation, not with a rewritten paragraph.',
        ],
      },
      {
        heading: 'Getting a Georgia home to a genuine premium standard',
        body: [
          'Whatever channel it ends up on, the work of moving a home from good to premium is the same, and it is more specific than "buy nicer furniture". It starts with the things guests photograph and reviewers mention: the arrival sequence, the lighting, the bed, the shower pressure, the kitchen you can actually cook a family dinner in, and the absence of the small broken thing that everybody notices and nobody fixes. Premium guests are not forgiving in the way ordinary guests are, because they are not comparing you to a bargain. A wobbling towel rail in a mid-market rental is a shrug. The same rail in a home charging a premium rate is evidence, and it turns up in the review as a sentence about attention to detail that costs you far more than the repair would have.',
          'In metro Atlanta the premium corridor runs through Buckhead, Sandy Springs, Milton, Alpharetta, Johns Creek, Brookhaven, Dunwoody and Vinings, where demand comes from executive travel, relocations, film and production stays, wedding parties and visiting families with real budgets. Those guests are comparing your home to a hotel suite, and they are entirely willing to pay for space and privacy — provided the execution is hotel-grade. Atlanta\'s film and television industry adds a second premium stream on top of that, with production companies housing talent and crew for weeks at a time in exactly those submarkets, on terms that reward operators who can handle a corporate booking properly.',
          'Outside the perimeter, the premium tier is a destination story. Blue Ridge, Big Canoe and Ellijay carry high-end mountain homes where the fall window prices like nowhere else in the state. Lake Oconee and Lake Lanier carry waterfront properties whose summer weekends behave like a luxury resort market. Savannah, St Simons, Jekyll and Tybee carry coastal homes with a genuine year-round draw. In every one of those markets the gap between a well-run premium home and an averagely-run one is measured in multiples, not percentages.',
          'The operational layer is what closes it: consistent premium linens, professional cleaning with inspection on every turnover, restocked consumables, proactive maintenance instead of reactive repairs, and a local team a guest can reach at any hour. That is the standard we build to. Whether or not a Marriott listing is ever part of your picture, it is the standard that makes the home worth more on every channel it is on.',
        ],
      },
    ],

    faqs: [
      {
        q: 'How do I list my home on Homes & Villas by Marriott Bonvoy?',
        a: 'You cannot do it yourself. Marriott states in its FAQ that "individual homeowners will need to sign up with one of our property management companies who understand the standards and requirements of our platform," and directs owners to contact Marriott to be connected with management companies relevant to their home\'s location. There is no self-serve listing path for an individual owner, which is why the search for a "list your home" button comes up empty.',
      },
      {
        q: 'Why does Marriott require a property management company?',
        a: 'Because the programme is sold on a service standard, not just on inventory. Marriott says it "only work[s] with property management companies offering premium and luxury private home inventory" and that every listed home is professionally managed, with professional cleaning and a 24/7 local support team. Those commitments have to hold on every stay, which is an operating capability rather than something an individual owner can reliably promise alongside a full-time job.',
      },
      {
        q: 'Is ATLStay an approved Homes & Villas by Marriott Bonvoy partner?',
        a: 'No, and we are not going to imply otherwise. This page is here because owners searching for how the programme works deserve an accurate explanation of it, and because the underlying premium operating standard is exactly what we deliver on the homes we manage. If any management company tells you it can list your home on Marriott, ask to see that relationship documented before you sign anything.',
      },
      {
        q: 'What does a home need to qualify for Homes & Villas?',
        a: 'Marriott publishes a guaranteed floor for every listed home: 24/7 support, high-speed Wi-Fi, a television, kitchen essentials including cookware, utensils and a microwave, premium linens and towels, bathroom amenities, a hair dryer, smoke and carbon monoxide detectors where fuel-burning appliances are present, and professional cleaning before and after every stay. Marriott also states each home is evaluated, either in person or digitally, before it is listed, and that its focus is only on the premium and luxury tier of rental homes.',
      },
      {
        q: 'How many properties does a management company need to work with Marriott?',
        a: 'Marriott does not publish a threshold on its site. It asks interested property management companies to make contact and describe their portfolio, which is an evaluation rather than a numeric gate — portfolio, market, property quality and operating capability all factor in, and requirements vary by market. Any specific number you see quoted online comes from a third party rather than from Marriott, so treat it accordingly.',
      },
      {
        q: 'Do guests earn Marriott Bonvoy points on a Homes & Villas stay?',
        a: 'Yes. Marriott states members earn 5 points per qualifying US dollar spent, excluding booking fees, taxes, cleaning fees and add-ons during the stay, plus Elite bonuses of 10% at Silver, 25% at Gold, 50% at Platinum and 75% at Titanium Elite and Ambassador. Members also earn 1 Elite Night Credit for each night stayed, which is often the strongest reason a loyalty traveller chooses a qualifying home over an equivalent marketplace listing.',
      },
      {
        q: 'Are there Homes & Villas rentals in Atlanta?',
        a: 'Homes & Villas by Marriott Bonvoy operates globally and lists whole-home rentals across US destinations, and Atlanta sits squarely in the profile the programme targets — a major metro with premium whole-home inventory, heavy corporate and event travel, and a large base of loyalty travellers. Availability in any given destination changes over time, so the current list on Marriott\'s own site is the authority. What is constant is the route: through a property management company, never directly from the owner.',
      },
      {
        q: 'What should I do if my home is not premium enough yet?',
        a: 'Find out specifically what is short, then decide whether closing that gap pays for itself. We will walk your property and give you a written readiness plan — furnishing, finish, amenities, safety and the operational standards a premium guest expects — with a realistic view of what each item is likely to return. Sometimes the right answer is a targeted refresh. Sometimes it is that your home earns better as a mid-term corporate or family rental than as a luxury nightly one, and we would rather tell you that than sell you a renovation.',
      },
    ],

    sources: [
      {
        claim: '"We would love to consider your home! Individual homeowners will need to sign up with one of our property management companies who understand the standards and requirements of our platform."',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: '"If you are a property management company interested in working with us, please contact us and tell us more about your portfolio." Marriott publishes no portfolio-size threshold on its own site.',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: 'Homes & Villas by Marriott Bonvoy is "a global home rental offering launched in 2019 by Marriott Bonvoy", with "a focus only on the premium and luxury tier of rental homes", working "with select property management companies to ensure that every home listed can be serviced at a standard expected of Marriott Bonvoy".',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: '"We only work with property management companies offering premium and luxury private home inventory and each home is evaluated – either in person or digitally – before being listed on our site."',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: '"Every home listed on our site is guaranteed to include: 24/7 support; High-speed Wi-Fi; Television; Kitchen essentials (cookware, utensils, microwave); Premium linens and towels; Bathroom amenities…; Hair dryer; Smoke detectors and carbon monoxide detectors where fuel-burning appliances are present; Professional cleaning pre- and post- stay."',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: 'Marriott Bonvoy members earn "5 points earned per qualifying $1 USD spent, excluding booking fees, taxes, cleaning fees and extra add-ons during stay", with Elite bonuses of 10% (Silver), 25% (Gold), 50% (Platinum) and 75% (Titanium Elite and Ambassador), and "for each night that is stayed with Homes & Villas by Marriott Bonvoy, members will earn 1 Elite Night Credit".',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
      {
        claim: 'Guest issues on a Homes & Villas stay route to the property management company: damages are reported to the management company, and ancillary fees or add-on charges "will be handled by the property management company after your reservation has been confirmed".',
        publisher: 'Homes & Villas by Marriott Bonvoy — About Us & FAQ',
        url: 'https://homes-and-villas.marriott.com/en/about-us-faq',
        asOf: 'August 2026',
      },
    ],

    marketCities: [
      'atlanta', 'sandy-springs', 'milton', 'alpharetta', 'roswell', 'johns-creek', 'brookhaven',
      'dunwoody', 'vinings', 'marietta', 'decatur', 'buford', 'cumming', 'blue-ridge', 'big-canoe',
      'ellijay', 'lake-oconee', 'lake-lanier', 'savannah', 'st-simons-island', 'jekyll-island',
      'tybee-island', 'peachtree-city',
    ],
    relatedResources: [
      'luxury-airbnb-management-atlanta',
      'airbnb-vs-vrbo-for-atlanta-hosts',
      'direct-booking-for-atlanta-hosts',
      'why-professional-airbnb-photos-matter',
      'scaling-to-multiple-short-term-rentals',
    ],
    relatedServices: ['vrbo-management', 'direct-booking', 'mid-term-rental-management'],

    heroImageKey: 'heroHome',
    published: true,
    order: 3,
  },
];
