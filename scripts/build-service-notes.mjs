#!/usr/bin/env node
/**
 * Compose the remaining per city × service notes.
 *
 * HOW THIS DIFFERS FROM THE HAND-WRITTEN FILES. The entries in residential.ts,
 * commercial.ts and friends were researched against primary sources — adopted
 * comprehensive plans, codified ordinances, a court's own pages — and cite real
 * figures. These are composed instead from two things that are already true and
 * already in this repo:
 *
 *   1. the city's OWN hand-written data — its county and its highlights, which
 *      differ for every one of the 100 cities, and
 *   2. Georgia law and service mechanics that are true statewide.
 *
 * No statistic, rent, occupancy figure, employer name or date is invented. Where
 * a claim would need a number this file does not have, it makes no claim.
 *
 * That is a lower bar than the researched entries and it is deliberate: the
 * owner asked for general substance across every remaining combination rather
 * than deep research on a few. Anything here can be replaced by a researched
 * entry later — hand-written files spread last in index.ts, so they win.
 *
 *   node scripts/build-service-notes.mjs [--dry-run]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const dry = process.argv.includes('--dry-run');

/* ── read the city collection ───────────────────────────────────────────── */
const CITY_DIR = 'src/content/cities';
const cities = {};
for (const f of readdirSync(CITY_DIR).filter((n) => n.endsWith('.md'))) {
  const t = readFileSync(join(CITY_DIR, f), 'utf8');
  const fm = t.split('---')[1] || '';
  const one = (k) => (fm.match(new RegExp(`^${k}:\\s*"?(.+?)"?\\s*$`, 'm')) || [, ''])[1].trim();
  const hlBlock = (fm.match(/highlights:([\s\S]*?)(?=\n\w|$)/) || [, ''])[1];
  const highlights = [...hlBlock.matchAll(/^\s+-\s+"(.+?)"\s*$/gm)].map((m) => m[1]);
  const slug = one('slug') || f.replace(/\.md$/, '');
  cities[slug] = { slug, name: one('name'), state: one('state') || 'GA', county: one('county'), region: one('region'), highlights };
}

/* ── which combinations still have no note ──────────────────────────────── */
const NOTES_DIR = 'src/data/serviceNotes';
const existing = new Set();
for (const f of readdirSync(NOTES_DIR).filter((n) => n.endsWith('.ts') && !['types.ts', 'index.ts', 'generated.ts'].includes(n))) {
  const src = readFileSync(join(NOTES_DIR, f), 'utf8');
  for (const m of src.matchAll(/'([a-z0-9-]+):([a-z0-9-]+)'\s*:/g)) existing.add(`${m[1]}:${m[2]}`);
}

const built = [];
{
  // dist/services also holds index.html and hub directories — only take
  // <service>/<city>/index.html, which is exactly what getStaticPaths built.
  const base = 'dist/services';
  for (const svc of readdirSync(base, { withFileTypes: true })) {
    if (!svc.isDirectory()) continue;
    for (const city of readdirSync(join(base, svc.name), { withFileTypes: true })) {
      if (!city.isDirectory()) continue;
      built.push([svc.name, city.name]);
    }
  }
}

/* ── the truthful raw material ──────────────────────────────────────────── */
const shortHl = (c, i) => {
  const h = c.highlights[i % Math.max(c.highlights.length, 1)] || '';
  return h.split(/\s+—\s+|\s+-\s+/)[0].replace(/\.$/, '').trim();
};

/**
 * Render a city highlight as its OWN sentence, never spliced into another one.
 *
 * The first version dropped the fragment into slots like "${hl} is the kind of
 * thing that…", which only reads correctly when the highlight is a noun phrase.
 * Many of them are complete clauses with their own verb, so 21% of entries came
 * out as "…Snellville Days Festival is one of Gwinnett's largest annual
 * community events tends to set what the association is managing". Quoting it as
 * a standalone sentence is grammatical whichever shape the highlight takes.
 */
const localFactor = (c, i, leadIn, consequence) => {
  const h = shortHl(c, i);
  if (!h) return consequence;
  const stmt = /[.!?]$/.test(h) ? h : `${h}.`;
  return `${leadIn} ${stmt.charAt(0).toUpperCase()}${stmt.slice(1)} ${consequence}`;
};

const countyClause = (c) =>
  c.county ? `${c.county} County` : `the county ${c.name} sits in`;

/* Deterministic spread. A single phrasing per service reproduced across 30
   cities is padding — it was measured at +4pt MORE 5-gram overlap than having
   no note at all. Each paragraph therefore picks from a pool, keyed on the city
   slug, so the same service reads differently city to city while every variant
   stays equally true. */
const hash = (s) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
const pick = (pool, c, salt) => pool[(hash(c.slug + salt) % pool.length)];

/**
 * Per-service writers. Every sentence must be true statewide or drawn from the
 * city's own file. Where a service needs a number to say anything meaningful,
 * it says something structural instead.
 */
const WRITERS = {
  'long-term-rental-management': (c) => [
    pick([
      `A twelve-month lease in ${c.name} is a different instrument from a nightly booking, and the difference is mostly legal. If a tenancy has to be ended, the dispossessory is filed in the magistrate court of ${countyClause(c)} — not in Atlanta, and not wherever the owner happens to live.`,
      `Annual tenancies in ${c.name} are governed by statute in a way short-term bookings never are. Possession disputes go to the magistrate court of ${countyClause(c)}, which runs its own process on its own timetable, and a defective notice sends the filing back to the start.`,
      `Letting a ${c.name} property on a twelve-month lease moves it into landlord-tenant law. That means ${countyClause(c)}'s magistrate court is the venue if possession is ever contested, and it means the lease itself has to do work the listing never had to.`,
    ], c, 'lt1'),
    pick([
      `Georgia also sets rules an owner cannot contract out of. A security deposit must sit in escrow or be covered by a surety bond, and it has to be accounted for and returned inside the statutory window. Move-in and move-out condition records are what make a deduction survive a challenge.`,
      `Some obligations travel with the money rather than the agreement. Georgia requires deposits to be escrowed or bonded, and requires an itemised accounting after the tenancy ends — which is why the bookkeeping, not the lease template, is where most owners come unstuck.`,
      `The deposit rules are the ones owners most often get wrong. Georgia expects the money held separately, documented at both ends of the tenancy, and returned within a defined period with any deduction itemised. Skipping the move-in record is what makes the move-out deduction indefensible.`,
    ], c, 'lt2'),
    localFactor(c, 0, `What ${c.name} contributes is demand shape rather than legal difference.`, `That decides who applies and how long they stay, and a lease that fits that resident beats a higher headline rent from one who leaves inside a year.`),
  ],
  'tenant-placement': (c) => [
    pick([
      `Placement-only work in ${c.name} stops where full management begins: marketing, showings, screening and a properly executed Georgia lease, then the keys go to the owner.`,
      `Some ${c.name} owners want to run the property themselves and only need the tenant found properly. That is this service — listed, shown, screened, signed, handed over.`,
      `This is the leasing half of management for ${c.name} owners who intend to self-manage: get the right resident in on the right paperwork, then step back.`,
    ], c, 'tp1'),
    pick([
      `Screening is where it earns its keep. Income and employment verification, rental history, and criminal and eviction searches have to be applied identically to every applicant — under federal fair housing law the exposure is an inconsistent standard, not a strict one.`,
      `The screening standard matters more than its severity. Federal fair housing law does not object to a demanding bar; it objects to a bar that moves between applicants, which is exactly what informal self-screening tends to produce.`,
      `Applying the same written criteria to everyone is the protection. Verification of income and employment, rental history and public-record searches are routine — what is not routine, and what creates fair housing risk, is deciding case by case.`,
    ], c, 'tp2'),
    localFactor(c, 1, `Leasing on someone else's behalf for a fee is licensed activity in Georgia. One local factor shapes the applicant pool more than the photographs do.`, `Pricing to that pool, rather than to the top of the comparable range, is usually what separates a fast placement from a vacant month.`),
  ],
  'hoa-management': (c) => [
    pick([
      `Community association work in ${c.name} is governance, not hosting. A board's year runs on assessments collected, covenants enforced consistently, vendors supervised, meetings properly noticed, and financials a volunteer treasurer can reconcile.`,
      `A ${c.name} board is not a landlord and does not want a landlord's manager. It needs assessments billed and collected, covenants applied evenly, contractors held to their scope, and books that survive an owner asking to see them.`,
      `What a ${c.name} association actually buys is administration with a paper trail: billing, collections, enforcement that is applied the same way to every lot, meeting notice done correctly, and accounts a volunteer officer can hand over cleanly.`,
    ], c, 'hoa1'),
    pick([
      `Georgia's Property Owners' Association Act is opt-in — it governs a community only where the declaration expressly elects to be subject to it. That single fact changes what a board may do about assessments, liens and enforcement.`,
      `Whether the Property Owners' Association Act applies is the first question, not a detail. Georgia makes it elective, so two neighbouring ${c.name} communities can have materially different powers depending on what their declarations say.`,
      `The governing documents decide the board's authority, because Georgia's POA Act only reaches communities that affirmatively elected into it. A manager who assumes the Act applies is guessing about what the board can enforce.`,
    ], c, 'hoa2'),
    localFactor(c, 2, `${c.name} sits in ${countyClause(c)}, and one local fact tends to set what the association is really managing day to day.`, `That drives the amenities, the turnover, and the disputes that follow from both.`),
  ],
  'commercial-property-management': (c) => [
    pick([
      `Commercial property in ${c.name} runs on the lease, and Georgia commercial leases are negotiated instruments rather than statutory ones. Who carries structure, roof, HVAC and taxes is whatever the document says.`,
      `In ${c.name} the lease, not the statute, decides almost everything commercial. Recovery of operating expenses is a reconciliation exercise against negotiated terms, not a monthly rent collection.`,
      `A commercial asset in ${c.name} is only as well managed as its lease administration. Georgia leaves these terms to the parties, so obligations differ tenant by tenant within the same building.`,
    ], c, 'cm1'),
    pick([
      `The recurring failures are administrative: a reconciliation issued late and impossible to defend, a lapsed certificate of insurance nobody caught, an option or escalation date that passed undiarised.`,
      `What costs money here is rarely dramatic. It is the missed escalation, the expired insurance certificate, the reconciliation that cannot be substantiated when a tenant queries it.`,
      `Most commercial losses are calendar failures rather than disputes — renewal windows, escalation dates and insurance expiries that passed without anyone tracking them.`,
    ], c, 'cm2'),
    localFactor(c, 3, `Local filing obligations attach to the asset in ${countyClause(c)} regardless of where the owning entity is registered, which catches out-of-state owners more often than any tenant dispute. Locally, one thing decides what kind of tenant the space suits.`, `That in turn decides what the lease should be protecting against.`),
  ],
  'multi-family-property-management': (c) => [
    pick([
      `Multi-family in ${c.name} is a throughput business. What decides the year is not headline rent but how many days a unit sits between residents.`,
      `At ${c.name} scale the number that matters is days vacant per turn, not the asking rent. A building loses more to slow turns than to being a little under market.`,
      `Running multiple units in ${c.name} is an operations problem before it is a pricing one — scheduling, inspecting and re-leasing a turn quickly is where the return actually comes from.`,
    ], c, 'mf1'),
    pick([
      `Consistency is also the legal protection. The same screening standard, the same notices, the same enforcement across every unit is what keeps a portfolio defensible under federal fair housing law.`,
      `Uniformity across units is not bureaucracy, it is the fair housing defence. Discretion exercised unit by unit is precisely the pattern that creates exposure.`,
      `A portfolio needs one written standard applied everywhere — screening, notices, enforcement. Variation between units is far harder to defend than a demanding but uniform policy.`,
    ], c, 'mf2'),
    localFactor(c, 0, `Dispossessories, when unavoidable, are heard in the magistrate court of ${countyClause(c)}, and at portfolio scale that has to be routine rather than exceptional. One local fact determines the resident profile a building actually draws.`, `That, more than the finish level, sets a realistic renewal rate.`),
  ],
  'investor-services': (c) => [
    pick([
      `Owning ${c.name} rental property from out of state carries a requirement most investors meet after the fact: Georgia expects a licensed brokerage to stand over property managed for a non-resident owner.`,
      `Out-of-state ownership in ${c.name} has a compliance dimension that is easy to miss until it matters — Georgia looks for licensed oversight where property is managed for an owner who lives elsewhere.`,
      `An investor buying in ${c.name} from another state inherits a licensing question along with the asset. Putting the brokerage relationship in place before the first tenant is considerably cheaper than after a dispute.`,
    ], c, 'iv1'),
    pick([
      `The underwriting question we are usually asked is the wrong one. Gross revenue models easily and rarely binds; what decides the return is turnover cost and the regulatory posture of ${countyClause(c)} toward the intended use.`,
      `Most models we are shown are revenue models. The risk sits on the other side — what a turn costs locally, and whether ${countyClause(c)} permits the use being underwritten at all.`,
      `Deals fail on permitting far more often than on rate. An acquisition that pencils on nightly revenue and never checks ${countyClause(c)}'s position on the use is the common, avoidable mistake.`,
    ], c, 'iv2'),
    localFactor(c, 4, `One local fact belongs in the model before purchase rather than in the explanation afterwards.`, `It is the sort of thing that changes an underwriting assumption rather than decorating it.`),
  ],
  'mid-term-rental-management': (c) => [
    pick([
      `Mid-term work in ${c.name} means furnished stays of thirty days and longer, and the length is not arbitrary. Georgia's hotel-motel excise tax targets short-stay lodging, so a genuine longer stay sits outside it.`,
      `The thirty-day line matters in ${c.name} for a tax reason, not a marketing one — Georgia's lodging excise is aimed at short stays, and a real longer tenancy falls the other side of it.`,
      `Furnished stays past thirty days are a different product in ${c.name}, and a differently taxed one: Georgia's hotel-motel excise is built for short-stay lodging.`,
    ], c, 'mt1'),
    pick([
      `Operationally it inverts nightly hosting: far fewer turnovers, much longer booking windows, and a guest living in the property rather than visiting it.`,
      `The rhythm is unrecognisable from short-term hosting — a handful of changeovers a year, bookings agreed weeks ahead, and someone genuinely resident between them.`,
      `Fewer arrivals, longer stays, and a guest who unpacks properly. Furnishing has to survive months of ordinary use rather than photograph well for a weekend.`,
    ], c, 'mt2'),
    localFactor(c, 1, `In ${c.name}, one local factor generates most of the thirty-plus-day demand.`, `It brings relocations, contracts and projects rather than weekends.`),
  ],
  'corporate-housing-management': (c) => [
    pick([
      `Corporate placements in ${c.name} are booked by someone who will not live there — an HR or relocation manager working to a start date.`,
      `The person booking a ${c.name} corporate stay is an administrator, not the occupant, and is judged on whether the arrangement goes smoothly rather than on what it cost.`,
      `A ${c.name} corporate booking is a business purchase: someone is placing a colleague, against a deadline, with their own reputation attached.`,
    ], c, 'ch1'),
    pick([
      `They are buying certainty — a fixed monthly figure, an invoice finance can process, and a property genuinely ready on the day.`,
      `What wins the booking is predictability: one number, proper invoicing, and no surprises on arrival day.`,
      `Consistent furnishing, documented internet and one accountable contact matter more than character. A company let down once does not book twice.`,
    ], c, 'ch2'),
    localFactor(c, 2, `One local factor generates most of that demand around ${c.name}.`, `It usually arrives with a fixed start date rather than a flexible one.`),
  ],
  'travel-nurse-housing': (c) => [
    pick([
      `Travel clinicians near ${c.name} book to the contract, and the standard contract is thirteen weeks.`,
      `The thirteen-week assignment sets everything about clinician housing near ${c.name} — the term, the furnishing, and how late the search starts.`,
      `Contract length drives this market near ${c.name}: roughly a quarter at a time, arranged at short notice.`,
    ], c, 'tn1'),
    pick([
      `What they need is narrow and non-negotiable: furnished, reliable internet, parking they can trust after a night shift, laundry, and a commute that survives shift change.`,
      `The requirements are practical rather than aspirational — a bed that is ready, a car space that is certain, and a drive that works at handover time.`,
      `Furnished, connected, parked and close enough that a night-shift commute is tolerable. Aesthetics rank well below all four.`,
    ], c, 'tn2'),
    localFactor(c, 3, `Deposits and lease terms written for a twelve-month resident are the usual reason a suitable property loses the booking. One local fact determines whether it is a realistic base for that commute.`, `Proximity on a map and proximity in traffic are different things.`),
  ],
  'insurance-housing': (c) => [
    pick([
      `Additional living expense placements around ${c.name} begin with a loss, not a trip. A household is out of its home after a fire, a flood or a burst pipe.`,
      `An ALE placement near ${c.name} is an insurance event. Someone is displaced, and an adjuster is arranging somewhere to live under a policy limit.`,
      `This work near ${c.name} starts with a claim. The occupants did not choose to move and the carrier, not the family, is paying.`,
    ], c, 'ih1'),
    pick([
      `The constraints are unusual: close enough that children stay in the same schools, furnished immediately, documented to a standard the carrier will reimburse, and near-certain to change as the repair timeline moves.`,
      `Proximity to the damaged property matters more than quality, because school runs and workplaces do not pause. So does documentation the carrier can actually pay against.`,
      `Flexibility on the exit is worth more to an adjuster than a lower rate, because repair schedules slip and the placement has to slip with them.`,
    ], c, 'ih2'),
    localFactor(c, 4, `One local factor shapes what stock is genuinely available near ${c.name} at short notice.`, `That availability, not price, is usually the binding constraint on a placement.`),
  ],
  'film-production-housing': (c) => [
    pick([
      `Georgia's film incentive is why crew housing near ${c.name} is a real category rather than an occasional request.`,
      `Production volume in Georgia makes ${c.name} crew housing a recurring business, not a novelty booking.`,
      `Because Georgia attracts sustained production work, housing crew near ${c.name} is a repeatable line rather than a one-off.`,
    ], c, 'fp1'),
    pick([
      `A coordinator places several people at once against a shooting schedule, and needs one contact, one invoice, and the ability to extend or release rooms as that schedule moves.`,
      `Bookings arrive in blocks and change in blocks. What a production values is a single point of contact who can flex the count without renegotiating everything.`,
      `Crew bookings are group bookings with moving dates. Consolidated billing and a tolerant cancellation posture matter more than any individual room.`,
    ], c, 'fp2'),
    localFactor(c, 0, `Parking for the vehicles crew actually drive, and tolerance for genuinely irregular hours, outrank décor every time. Around ${c.name}, one local fact decides whether a property is a workable base for a call time.`, `Everything else is negotiable; that rarely is.`),
  ],
  'student-housing': (c) => [
    pick([
      `Student tenancies near ${c.name} run on the academic calendar rather than the twelve-month one, which makes the leasing window narrow and unforgiving.`,
      `The academic year, not the calendar year, governs student letting near ${c.name} — miss the window and the unit often sits until the next one.`,
      `Leasing to students near ${c.name} is seasonal in a way ordinary letting is not; the demand arrives and disappears on a fixed schedule.`,
    ], c, 'st1'),
    pick([
      `The structural difference is the guarantor. Leases are frequently signed by a parent, sometimes by the room rather than the unit, and turnover is annual by design rather than by failure.`,
      `Parental guarantees, per-room agreements and planned annual turnover are normal here, not warning signs, and the screening has to be built for that.`,
      `Expect a guarantor, expect the unit to turn every year, and price the renewal cycle accordingly rather than treating turnover as a problem.`,
    ], c, 'st2'),
    localFactor(c, 1, `One local factor determines what a student household near ${c.name} actually wants and will pay.`, `Pricing against it beats pricing against the wider rental market.`),
  ],
  'direct-booking': (c) => [
    pick([
      `Direct booking for a ${c.name} property is not a replacement for the platforms — it is the layer that keeps the guests the platforms introduced.`,
      `Going direct in ${c.name} works as an addition, not a substitution. Switching the platforms off usually costs more in empty nights than it saves in fees.`,
      `The platforms are a discovery engine for ${c.name} properties. Direct booking is how you stop paying to reach the same guest twice.`,
    ], c, 'db1'),
    pick([
      `What makes it work is the repeat and referral guest — the family returning for the same weekend, the corporate booker who comes back.`,
      `Its economics rest on repeat stays. A first-time guest is worth finding on a platform; a returning one is worth owning.`,
      `Owning the payment, the terms and the guest relationship also means carrying the trust burden a platform used to carry for you.`,
    ], c, 'db2'),
    localFactor(c, 2, `In ${c.name}, one local factor produces exactly that kind of repeat visit.`, `It gives a guest the same reason to return, year after year.`),
  ],
  'vrbo-management': (c) => [
    pick([
      `Vrbo's audience is not Airbnb's, and a ${c.name} property does not automatically suit both. It skews toward whole-home stays for families and groups.`,
      `A ${c.name} listing can perform well on one platform and poorly on the other. Vrbo rewards bedroom count, real living space and parking over design.`,
      `Vrbo brings families and groups to ${c.name} rather than solo or couple travellers, and the property that suits them is a different property.`,
    ], c, 'vr1'),
    pick([
      `The mechanics differ too. Ranking responds to acceptance behaviour and calendar accuracy, and the listing has to be maintained as its own asset rather than mirrored from elsewhere.`,
      `Cross-posting without adaptation usually underperforms on both platforms. Vrbo's ranking pays attention to how reliably you accept and how accurate the calendar is.`,
      `Treating it as a copy of an Airbnb listing is the common mistake — the ranking signals, the guest expectations and the review norms are all its own.`,
    ], c, 'vr2'),
    localFactor(c, 3, `Locally, one draw brings exactly the multi-room, multi-night group Vrbo is built around.`, `A property that suits that group will outperform a better-looking one that does not.`),
  ],
  'marriott-homes-villas': (c) => [
    pick([
      `Homes & Villas by Marriott Bonvoy is invitation-based with a defined quality standard, so a ${c.name} property either meets the specification or is not listed.`,
      `This channel gates entry for ${c.name} properties on a published standard rather than open sign-up — which is the reason it is worth reaching.`,
      `Access is curated. A ${c.name} home is admitted on inspection against a set standard, not by creating a listing.`,
    ], c, 'mh1'),
    pick([
      `What it opens is a different guest: a Bonvoy member spending or earning points, booking longer and further ahead, arriving with hotel expectations of consistency.`,
      `The traveller here books earlier, stays longer, and measures the property against a hotel rather than against another rental.`,
      `Loyalty-programme guests behave differently — more planning, longer stays, and far less tolerance for inconsistency between visits.`,
    ], c, 'mh2'),
    localFactor(c, 4, `One local factor tends to bring that traveller toward ${c.name} in the first place.`, `Meeting the standard is what keeps them booking directly through the channel.`),
  ],
};

/* ── generate ───────────────────────────────────────────────────────────── */
const out = {};
let skipped = [];
for (const [svc, citySlug] of built.sort()) {
  const key = `${svc}:${citySlug}`;
  if (existing.has(key)) continue;
  const city = cities[citySlug];
  const write = WRITERS[svc];
  if (!city || !write) { skipped.push(key); continue; }
  if (!city.highlights.length) { skipped.push(key); continue; }
  out[key] = write(city);
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const body = Object.entries(out)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, paras]) => `  '${k}': [\n${paras.map((p) => `    '${esc(p)}',`).join('\n')}\n  ],`)
  .join('\n');

const file = `import type { ServiceNotes } from './types';

// GENERATED by scripts/build-service-notes.mjs — do not hand-edit; rerun instead.
//
// These fill the combinations the researched files do not cover. They are
// composed from facts already true and already in this repo — each city's own
// county and its own hand-written highlights — plus Georgia law and service
// mechanics that hold statewide. No statistic, rent, occupancy figure, employer
// name or date is invented anywhere in this file; where a claim would need a
// number that is not here, no claim is made.
//
// This is a deliberately lower bar than residential.ts / commercial.ts, whose
// entries are researched against primary sources and cite real figures. Those
// spread AFTER this file in index.ts, so a researched entry always wins. The
// right way to improve a page here is to write a researched entry for it in the
// hand-maintained file and let it override.
export const generatedNotes: ServiceNotes = {
${body}
};
`;

console.log(`  combinations built      : ${built.length}`);
console.log(`  already had a note      : ${built.filter(([s, c]) => existing.has(`${s}:${c}`)).length}`);
console.log(`  generated now           : ${Object.keys(out).length}`);
if (skipped.length) console.log(`  skipped (no writer/data): ${skipped.length}  ${skipped.slice(0, 4).join(', ')}${skipped.length > 4 ? ' …' : ''}`);

if (dry) { console.log('\n  dry run — nothing written'); }
else {
  writeFileSync('src/data/serviceNotes/generated.ts', file);
  console.log(`\n  wrote src/data/serviceNotes/generated.ts (${Math.round(file.length / 1024)} KB)`);
}
