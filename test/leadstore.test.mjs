/* Lead storage — the write path behind the dashboard and the card buttons.
 *
 * WHY THIS EXISTS: on 2026-08-24 a live lead reached Telegram but never reached
 * the dashboard, and its card had no buttons. The cause was an INSERT whose
 * column list and bindings had drifted out of step — 14 placeholders, 15
 * bindings — which D1 rejects. storeLead's fail-soft catch swallowed it, so a
 * total storage outage looked exactly like a normal lead.
 *
 * The fake D1 below enforces the SAME binding-count rule the real D1 does, so a
 * mismatch fails here loudly instead of in production silently.
 *
 * This repository is PUBLIC — all data below is invented.
 */
import { storeLead, kindOf } from '../functions/api/_leadStore.js';

let fail = 0;
const t = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

/** D1 stand-in that rejects a binding-count mismatch exactly as D1 does. */
function strictDB({ failOn = null } = {}) {
  const statements = [];
  return {
    statements,
    prepare(sql) {
      const st = {
        sql, args: [],
        bind(...a) { st.args = a; return st; },
        async run() {
          const placeholders = (sql.match(/\?/g) || []).length;
          statements.push({ sql, placeholders, bindings: st.args.length });
          if (st.args.length !== placeholders) {
            throw new Error(`D1_ERROR: Wrong number of parameter bindings. Expected ${placeholders}, got ${st.args.length}`);
          }
          if (failOn && sql.includes(failOn)) throw new Error('simulated failure');
          return { meta: { last_row_id: 42 }, success: true };
        },
      };
      return st;
    },
  };
}

const SUBMISSION = {
  formName: 'ATLStay Rental Projection',
  lead: {
    Name: 'Sam Taylor', Email: 'sam@example.com', Phone: '14045550142',
    'Property Address': '1 Example Street, Atlanta GA', Bedrooms: '2',
  },
  meta: { 'Submitted from page': 'https://atlstay.com/' },
  subject: 'New lead',
};

console.log('── the regression: every statement must balance ──');
{
  const db = strictDB();
  const res = await storeLead({ DB: db }, SUBMISSION);
  for (const s of db.statements) {
    t(`${s.placeholders} placeholders = ${s.bindings} bindings  (${s.sql.replace(/\s+/g, ' ').trim().slice(0, 44)}…)`,
      s.placeholders, s.bindings);
  }
  t('a lead id comes back',        typeof res?.id === 'string' && res.id.length > 0, true);
  t('a reference number comes back', res?.seq, 42);
}

console.log('\n── the card needs both id and number ──');
{
  // Without these the card ships with no buttons and no reference, which is
  // precisely how the outage showed up in Telegram.
  const res = await storeLead({ DB: strictDB() }, SUBMISSION);
  t('id present for buttons',      Boolean(res.id), true);
  t('seq present for the ref',     Boolean(res.seq), true);
}

console.log('\n── fail-soft still holds (a lead is never lost) ──');
{
  const res = await storeLead({}, SUBMISSION);
  t('no DB binding → empty id',    res.id, '');
  t('  ...and never throws',       typeof res, 'object');
}
{
  const res = await storeLead({ DB: strictDB({ failOn: 'INSERT INTO leads' }) }, SUBMISSION);
  t('write failure → empty id',    res.id, '');
}
{
  const broken = { DB: { prepare() { throw new Error('boom'); } } };
  const res = await storeLead(broken, SUBMISSION);
  t('prepare() throwing survived', res.id, '');
}

console.log('\n── a failed sequence claim must not sink the lead ──');
{
  // The counter is a nicety; the lead itself is not.
  const db = strictDB({ failOn: 'lead_seq' });
  const res = await storeLead({ DB: db }, SUBMISSION);
  t('lead still stored',           Boolean(res.id), true);
  t('  ...just without a number',  res.seq, null);
}

console.log('\n── classification ──');
t('contact form → message',        kindOf('ATLStay Contact Form'), 'message');
t('projection form → lead',        kindOf('ATLStay Rental Projection'), 'lead');

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
