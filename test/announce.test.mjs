/* Milestone announcements from the DASHBOARD (functions/boroto/api.js).
 *
 * WHY THIS EXISTS: rewriting a Telegram card sends no notification — the group
 * updates in complete silence. That is right for every small action, but it
 * means the two moments worth knowing about, a proposal going out and a deal
 * closing, could pass with nobody's phone making a sound. Those two now post a
 * short message of their own.
 *
 * The risk this test guards is the opposite failure: announcing too much. A
 * ping for every touch, or a second ping for re-marking something already at
 * that status, is exactly how a group gets muted — and a muted group loses the
 * notifications that matter. So most of what follows asserts SILENCE.
 *
 * The Telegram side of the same behaviour lives in webhook.test.mjs.
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

const CHAT = '-1009999999999';

const ROW = {
  id: 'lead-1', kind: 'lead', brand: 'ATLStay', status: 'new', seq: 12,
  received_at: '2026-08-14T23:31:14.827Z', page_url: 'https://atlstay.com/',
  raw_lead: JSON.stringify({
    Name: 'Sam Taylor', Email: 'sam@example.com', Phone: '17705550148',
    'Service Interest': 'HOA Management',
  }),
  tg_cards: JSON.stringify([{ chat: CHAT, mid: 555 }]),
};

/** D1 stand-in returning one lead row, recording every statement. */
function fakeDB(row) {
  const log = [];
  return {
    log,
    prepare(sql) {
      const st = {
        sql, args: [],
        bind(...a) { st.args = a; return st; },
        async run() { log.push({ sql, args: st.args }); return { success: true, meta: {} }; },
        async first() { log.push({ sql, args: st.args }); return row; },
        async all() { log.push({ sql, args: st.args }); return { results: [] }; },
      };
      return st;
    },
  };
}

/** Capture Telegram traffic instead of making it. Nothing leaves this process. */
let sent = [];
globalThis.fetch = async (url, opts) => {
  sent.push({ url: String(url), body: JSON.parse(opts?.body || '{}') });
  return { json: async () => ({ ok: true, result: { message_id: 999 } }) };
};

const post = (body, row = ROW) => {
  sent = [];
  const db = fakeDB(row);
  const env = {
    DB: db, TELEGRAM_LEAD_BOT_TOKEN: 'token', TELEGRAM_CHAT_ID: CHAT,
  };
  return { res: onRequestPost({ env, request: { json: async () => body } }), db };
};

const notices = () => sent.filter((s) => /sendMessage/.test(s.url));
const edits = () => sent.filter((s) => /editMessageText/.test(s.url));

console.log('── marking a proposal sent from the Lead Desk ──');
{
  const { res } = post({ id: 'lead-1', status: 'proposal_sent', proposal_sent_to: 'dana@example.com' });
  t('request succeeds',              (await res).status, 200);
  const n = notices();
  t('the group is notified',         n.length, 1);
  t('  card updated too',            edits().length, 1);
  t('  headline is clear',           /📤 <b>Proposal sent<\/b>/.test(n[0].body.text), true);
  t('  names the lead',              n[0].body.text.includes('Sam Taylor'), true);
  t('  carries the reference',       n[0].body.text.includes('<code>#0012</code>'), true);
  t('  attributed to the owner',     n[0].body.text.includes('by Brandon'), true);
  t('  threaded under its card',     n[0].body.reply_parameters?.message_id, 555);
  t('  no contact details repeated', /sam@example\.com|7705550148/.test(n[0].body.text), false);
}

console.log('\n── marking it won ──');
{
  const { res } = post({ id: 'lead-1', status: 'won' }, { ...ROW, status: 'proposal_sent' });
  await res;
  const n = notices();
  t('the group is notified',         n.length, 1);
  t('  headline is clear',           /✅ <b>Deal won<\/b>/.test(n[0].body.text), true);
}

console.log('\n── the same milestone twice must not ping twice ──');
{
  const { res } = post({ id: 'lead-1', status: 'proposal_sent' }, { ...ROW, status: 'proposal_sent' });
  await res;
  t('already-sent announces nothing', notices().length, 0);
}
{
  const { res } = post({ id: 'lead-1', status: 'won' }, { ...ROW, status: 'won' });
  await res;
  t('already-won announces nothing',  notices().length, 0);
}
{
  const { res } = post({ action: 'log', id: 'lead-1', event: 'proposal' }, { ...ROW, status: 'proposal_sent' });
  await res;
  t('re-logging a proposal is quiet', notices().length, 0);
}

console.log('\n── logging an action from the Lead Desk ──');
{
  const { res } = post({ action: 'log', id: 'lead-1', event: 'proposal' });
  await res;
  t('a first proposal notifies',      notices().length, 1);
}
{
  const { res } = post({ action: 'log', id: 'lead-1', event: 'won' }, { ...ROW, status: 'proposal_sent' });
  await res;
  t('a first win notifies',           notices().length, 1);
}
for (const quiet of ['called', 'texted', 'emailed', 'lost']) {
  const { res } = post({ action: 'log', id: 'lead-1', event: quiet });
  await res;
  t(`"${quiet}" announces nothing`,   notices().length, 0);
  t(`  ...but still updates the card`, edits().length, 1);
}
{
  const { res } = post({ action: 'log', id: 'lead-1', event: 'note', note: 'Board meets Thursday' });
  await res;
  t('a note announces nothing',       notices().length, 0);
}

console.log('\n── correcting a status back still redraws the card ──');
{
  /* This used to be a silent drift: the database went back to New while the
     group's card carried on saying PROPOSAL SENT. The two surfaces disagreeing
     is the exact failure the shared renderer exists to prevent. */
  const { res } = post({ id: 'lead-1', status: 'new' }, { ...ROW, status: 'proposal_sent' });
  t('request succeeds',               (await res).status, 200);
  t('the card is redrawn',            edits().length, 1);
  t('  ...and nothing is announced',  notices().length, 0);
}
{
  const { res } = post({ id: 'lead-1', status: 'lost' }, { ...ROW, status: 'proposal_sent' });
  await res;
  t('a loss redraws the card',        edits().length, 1);
  t('  ...but stays silent',          notices().length, 0);
}

console.log('\n── ordinary edits stay silent ──');
{
  const { res } = post({ id: 'lead-1', notes: 'internal thoughts' });
  await res;
  t('editing notes announces nothing', notices().length, 0);
  t('  ...and does not touch the card', edits().length, 0);
}
{
  const { res } = post({ id: 'lead-1', viewed: true });
  await res;
  t('opening a lead announces nothing', notices().length, 0);
}
{
  const { res } = post({ action: 'move', id: 'lead-1', kind: 'lead' });
  await res;
  t('moving inbox announces nothing',  notices().length, 0);
}

console.log('\n── editing a note ──');
{
  const { res, db } = post({ action: 'edit_note', id: 'lead-1', event_id: 'ev-9', note: 'Corrected wording.' });
  t('request succeeds',               (await res).status, 200);
  const upd = db.log.find((c) => /UPDATE lead_events/i.test(c.sql));
  t('the note row is updated',        Boolean(upd), true);
  t('  new text bound',               upd.args[0], 'Corrected wording.');
  t('  edited_at stamped',            /^\d{4}-\d{2}-\d{2}T/.test(upd.args[1]), true);
  t('  addressed by event id',        upd.args[2], 'ev-9');
  /* The lead id is in the WHERE clause too, so a guessed event id cannot reach
     a note belonging to a different lead — these responses are customer data. */
  t('  ...and scoped to the lead',    upd.args[3], 'lead-1');
  t('  only notes are editable',      /action = 'note'/.test(upd.sql), true);
  t('the card is redrawn',            edits().length, 1);
  // Fixing a typo is not a milestone; nobody should get a push for it.
  t('nothing is announced',           notices().length, 0);
  t('no event is appended',           db.log.some((c) => /INSERT INTO lead_events/i.test(c.sql)), false);
}
{
  const { res } = post({ action: 'edit_note', id: 'lead-1', note: 'no id given' });
  t('missing event_id rejected',      (await res).status, 400);
}
{
  const res = await (post({ action: 'edit_note', id: 'lead-1', event_id: 'ev-9', note: '   ' })).res;
  const json = await res.json();
  t('an empty note is refused',       res.status, 400);
  t('  ...with a clear reason',       /cannot be emptied/i.test(json.error || ''), true);
}
{
  // D1 reporting zero rows changed means the note is gone — say so, do not
  // report a success the operator would believe.
  sent = [];
  const db = fakeDB(ROW);
  const orig = db.prepare.bind(db);
  db.prepare = (sql) => {
    const st = orig(sql);
    if (/UPDATE lead_events/i.test(sql)) st.run = async () => ({ meta: { changes: 0 } });
    return st;
  };
  const res = await onRequestPost({
    env: { DB: db, TELEGRAM_LEAD_BOT_TOKEN: 'token', TELEGRAM_CHAT_ID: CHAT },
    request: { json: async () => ({ action: 'edit_note', id: 'lead-1', event_id: 'gone', note: 'x' }) },
  });
  t('a vanished note reports 404',    res.status, 404);
  t('  ...and redraws nothing',       sent.length, 0);
}

console.log('\n── an announcement can never break the thing that caused it ──');
{
  // No bot token configured: the status change must still succeed.
  sent = [];
  const db = fakeDB(ROW);
  const res = await onRequestPost({
    env: { DB: db, TELEGRAM_CHAT_ID: CHAT },
    request: { json: async () => ({ id: 'lead-1', status: 'won' }) },
  });
  t('still succeeds without a token', res.status, 200);
  t('  status was still written',     db.log.some((c) => /UPDATE leads SET status/i.test(c.sql)), true);
  t('  and nothing was sent',         sent.length, 0);
}
{
  // Telegram itself failing must not fail the request either.
  const saved = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('network down'); };
  const db = fakeDB(ROW);
  const res = await onRequestPost({
    env: { DB: db, TELEGRAM_LEAD_BOT_TOKEN: 'token', TELEGRAM_CHAT_ID: CHAT },
    request: { json: async () => ({ id: 'lead-1', status: 'proposal_sent' }) },
  });
  t('survives Telegram being down',   res.status, 200);
  t('  status was still written',     db.log.some((c) => /UPDATE leads SET status/i.test(c.sql)), true);
  globalThis.fetch = saved;
}

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
