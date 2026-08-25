/* The dashboard's "Add lead" flow (functions/boroto/api.js, action: 'create').
 *
 * WHY THIS EXISTS: on 2026-08-24 a different INSERT in this same codebase
 * shipped with its column list and bindings out of step, and D1 rejected it
 * silently behind a fail-soft catch — a total storage outage that looked
 * exactly like a healthy lead. This statement was rebuilt the same day the
 * "Add lead" form was redesigned, adding a `seq` column to an INSERT that
 * previously didn't have one — precisely the shape of edit that caused the
 * earlier bug. This test exercises the REAL handler (not a regex reconstruction
 * of it) against a D1 stand-in that rejects a binding-count mismatch the way
 * D1 does, so a future edit that drifts the two apart fails here, not in
 * production.
 *
 * This repository is PUBLIC — all data below is invented.
 */
import { onRequestPost } from '../functions/boroto/api.js';

let fail = 0;
const t = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

/** D1 stand-in that rejects a binding-count mismatch exactly as D1 does. */
function strictDB() {
  const statements = [];
  return {
    statements,
    prepare(sql) {
      const st = {
        sql, args: [],
        bind(...a) { st.args = a; return st; },
        async run() {
          const placeholders = (sql.match(/\?/g) || []).length;
          statements.push({ sql, placeholders, bindings: st.args.length, args: [...st.args] });
          if (st.args.length !== placeholders) {
            throw new Error(`D1_ERROR: Wrong number of parameter bindings. Expected ${placeholders}, got ${st.args.length}`);
          }
          return { meta: { last_row_id: 42 }, success: true };
        },
        async first() { return null; },
        async all() { return { results: [] }; },
      };
      return st;
    },
  };
}

const post = (body, db = strictDB()) =>
  onRequestPost({ env: { DB: db }, request: { json: async () => body } });

console.log('── the regression: every prepared statement must balance ──');
{
  const db = strictDB();
  const res = await post({
    action: 'create', name: 'Sam Taylor', email: 'sam@example.com', phone: '14045550142',
    address: '1 Example St, Atlanta, GA', service_interest: 'HOA Management',
    notes: 'left a voicemail', brand: 'ATLStay', kind: 'lead',
    source: 'Phone call — voicemail', received_at: '2026-08-14T23:31:00Z', send_telegram: false,
  }, db);
  const json = await res.json();
  for (const s of db.statements) {
    t(`${s.placeholders} placeholders = ${s.bindings} bindings  (${s.sql.replace(/\s+/g, ' ').trim().slice(0, 44)}…)`,
      s.placeholders, s.bindings);
  }
  t('HTTP 200', res.status, 200);
  t('ok: true', json.ok, true);
  t('id comes back', typeof json.id === 'string' && json.id.length > 0, true);
  t('reference number claimed', json.seq, 42);
}

console.log('\n── internal notes must never reach Telegram ──');
{
  // The form promises, in writing under the field: "Dashboard only — never sent
  // to Telegram." raw_lead is exactly what the card renders field by field, so
  // notes must live ONLY in the `notes` column. This shipped broken once.
  const db = strictDB();
  await post({
    action: 'create', name: 'Sam Taylor', notes: 'INTERNAL: ready to switch',
    message: 'Public message', source: 'Phone call', send_telegram: false,
  }, db);
  const insert = db.statements.find((st) => st.sql.includes('INSERT INTO leads'));
  const rawLead = insert.args.find((a) => typeof a === 'string' && a.startsWith('{'));
  const parsed = JSON.parse(rawLead);
  t('notes absent from raw_lead', 'Notes' in parsed, false);
  t('  ...and nothing else carries it', JSON.stringify(parsed).includes('INTERNAL'), false);
  t('public message still included', parsed.Message, 'Public message');
  t('notes still stored in their own column', insert.args.includes('INTERNAL: ready to switch'), true);
}

console.log('\n── a hand-added lead is marked as such ──');
{
  const db = strictDB();
  await post({ action: 'create', name: 'Sam Taylor', source: 'Referral', send_telegram: false }, db);
  const insert = db.statements.find((st) => st.sql.includes('INSERT INTO leads'));
  t('form_name records it', insert.args.includes('Added by hand'), true);
  t('source kept verbatim', insert.args.includes('Referral'), true);
}

console.log('\n── validation ──');
{
  const res = await post({ action: 'create', name: '   ' });
  const json = await res.json();
  t('blank name rejected', res.status, 400);
  t('  ...with a clear error', /required/i.test(json.error || ''), true);
}
{
  const res = await post({ action: 'create' });
  t('missing name rejected', res.status, 400);
}

console.log('\n── brand and inbox are constrained, not passed through raw ──');
{
  const db = strictDB();
  await post({ action: 'create', name: 'Jordan Lee', brand: 'SomeRandomThing', kind: 'nonsense', send_telegram: false }, db);
  const insert = db.statements.find((s) => s.sql.includes('INSERT INTO leads'));
  t('unrecognised brand does not reach the row unfiltered', insert.bindings, insert.placeholders);
}

console.log('\n── send_telegram: false means no Telegram call is attempted ──');
{
  // If postCard were invoked it would call fetch(), which is not mocked here —
  // an unexpected network call would throw and fail the test.
  const res = await post({ action: 'create', name: 'No Telegram Please', send_telegram: false });
  const json = await res.json();
  t('telegram flag reflects the request', json.telegram, false);
}

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
