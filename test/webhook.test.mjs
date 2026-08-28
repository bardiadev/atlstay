/* The Telegram webhook — the only inbound door in the system.
 *
 * It is a public URL guarding customer contact details, so these tests are
 * mostly about what it REFUSES to do. The rule being proven: a request that
 * fails either gate must touch nothing and reveal nothing.
 *
 * This repository is PUBLIC — all data below is invented.
 */
import { onRequestPost } from '../functions/api/telegram.js';

let fail = 0;
const t = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

const SECRET = 'test-webhook-secret';
const CHAT = '-1009999999999';

/** Minimal D1 stand-in that records every statement it is asked to run. */
function fakeDB(leadRow) {
  const log = [];
  return {
    log,
    prepare(sql) {
      const stmt = {
        sql, args: [],
        bind(...a) { stmt.args = a; return stmt; },
        async run() { log.push({ sql, args: stmt.args }); return { success: true }; },
        async first() { log.push({ sql, args: stmt.args }); return leadRow; },
        async all() {
          log.push({ sql, args: stmt.args });
          return { results: leadRow ? [leadRow] : [] };
        },
      };
      return stmt;
    },
  };
}

const LEAD_ROW = {
  id: 'lead-1', kind: 'lead', brand: 'ATLStay', status: 'new',
  received_at: '2026-08-14T23:31:14.827Z', page_url: 'https://atlstay.com/',
  raw_lead: JSON.stringify({ Name: 'Sam Taylor', Email: 'sam@example.com' }),
  tg_cards: JSON.stringify([{ chat: CHAT, mid: 555 }]),
};

/** Capture Telegram traffic instead of making it. */
let sent = [];
globalThis.fetch = async (url, opts) => {
  sent.push({ url: String(url), body: JSON.parse(opts?.body || '{}') });
  return { json: async () => ({ ok: true, result: { message_id: 999 } }) };
};

const post = (body, { secret = SECRET, db = fakeDB(LEAD_ROW) } = {}) => {
  sent = [];
  const env = {
    DB: db,
    TELEGRAM_WEBHOOK_SECRET: SECRET,
    TELEGRAM_LEAD_BOT_TOKEN: 'token',
    TELEGRAM_CHAT_ID: CHAT,
  };
  const request = new Request('https://atlstay.com/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': secret },
    body: JSON.stringify(body),
  });
  return { res: onRequestPost({ request, env }), db };
};

const buttonPress = (action, from = { id: 42, first_name: 'Bardia' }, chat = CHAT) => ({
  callback_query: {
    id: 'cb1', from, data: `act:${action}:lead-1`,
    message: { message_id: 555, chat: { id: chat } },
  },
});

const writes = (db) => db.log.filter((c) => /INSERT|UPDATE|DELETE/i.test(c.sql));

console.log('── gate 1: the secret only Telegram knows ──');
{
  const { res, db } = post(buttonPress('won'), { secret: 'wrong-secret' });
  t('wrong secret still answers 200', (await res).status, 200);
  t('  ...and writes nothing',        writes(db).length, 0);
  t('  ...and calls Telegram never',  sent.length, 0);
}
{
  const { res, db } = post(buttonPress('won'), { secret: '' });
  t('missing secret answers 200',     (await res).status, 200);
  t('  ...and writes nothing',        writes(db).length, 0);
}

console.log('\n── gate 2: only chats we configured ──');
{
  const { res, db } = post(buttonPress('won', { id: 7, first_name: 'Stranger' }, '-100123456'));
  t('foreign chat answers 200',       (await res).status, 200);
  t('  ...and writes nothing',        writes(db).length, 0);
  const leaked = JSON.stringify(sent);
  t('  ...and leaks no lead data',    /Sam Taylor|sam@example\.com/.test(leaked), false);
}

console.log('\n── malformed input is survived, not crashed on ──');
for (const [label, body] of [
  ['empty update',        {}],
  ['unknown action',      { callback_query: { id: 'c', from: { id: 1 }, data: 'act:drop_tables:lead-1', message: { message_id: 555, chat: { id: CHAT } } } }],
  ['garbage callback',    { callback_query: { id: 'c', from: { id: 1 }, data: 'nonsense', message: { message_id: 555, chat: { id: CHAT } } } }],
  ['no message on query', { callback_query: { id: 'c', from: { id: 1 }, data: 'act:won:lead-1' } }],
]) {
  const { res, db } = post(body);
  t(`${label} → 200`,                 (await res).status, 200);
  t(`  ...no writes`,                 writes(db).length, 0);
}

console.log('\n── a real button press ──');
{
  const { res, db } = post(buttonPress('called'));
  await res;
  const w = writes(db);
  const event = w.find((c) => /INSERT INTO lead_events/i.test(c.sql));
  t('event recorded',                 Boolean(event), true);
  t('  action is "called"',           event.args[2], 'called');
  t('  actor is the presser',         event.args[3], 'Bardia');
  t('  their Telegram id kept',       event.args[4], '42');
  t('  source is telegram',           event.args[6], 'telegram');
  t('touch does NOT change status',   w.some((c) => /UPDATE leads SET status/i.test(c.sql)), false);
  t('card was rewritten',             sent.some((s) => /editMessageText/.test(s.url)), true);
  t('button was answered',            sent.some((s) => /answerCallbackQuery/.test(s.url)), true);
}
{
  const { res, db } = post(buttonPress('proposal'));
  await res;
  const w = writes(db);
  t('milestone records an event',     w.some((c) => /INSERT INTO lead_events/i.test(c.sql)), true);
  t('milestone DOES set status',      w.some((c) => /UPDATE leads SET status/i.test(c.sql)), true);
  t('  and stamps proposal_sent_at',  w.some((c) => /proposal_sent_at/i.test(c.sql)), true);
}

console.log('\n── repeat taps do not pollute the history ──');
{
  const { res, db } = post(buttonPress('won'), { db: fakeDB({ ...LEAD_ROW, status: 'won' }) });
  await res;
  t('already-won tap writes nothing', writes(db).length, 0);
  t('  ...but still answers the tap', sent.some((s) => /answerCallbackQuery/.test(s.url)), true);
  // The point of the guard: nobody's phone buzzes twice for the same win.
  t('  ...and announces nothing',     sent.some((s) => /sendMessage/.test(s.url)), false);
}

console.log('\n── milestones announce; everything else stays silent ──');
/* An edit sends NO Telegram notification, so without a message of its own a
   proposal or a win would land in the group completely unnoticed. Only those
   two get one — a ping per button tap is how a group ends up muted. */
const notices = () => sent.filter((s) => /sendMessage/.test(s.url));
{
  const { res } = post(buttonPress('proposal'));
  await res;
  const n = notices();
  t('proposal posts a new message',   n.length, 1);
  t('  card was edited as well',      sent.some((s) => /editMessageText/.test(s.url)), true);
  t('  headline is clear',            /📤 <b>Proposal sent<\/b>/.test(n[0].body.text), true);
  t('  credits the presser',          n[0].body.text.includes('by Bardia'), true);
  t('  threaded under its card',      n[0].body.reply_parameters?.message_id, 555);
  t('  survives a deleted card',      n[0].body.reply_parameters?.allow_sending_without_reply, true);
  t('  goes to the configured chat',  n[0].body.chat_id, CHAT);
  t('  carries no buttons',           'reply_markup' in n[0].body, false);
}
{
  const { res } = post(buttonPress('won', { id: 9, first_name: 'Alex' }));
  await res;
  const n = notices();
  t('a win posts a new message',      n.length, 1);
  t('  headline is clear',            /✅ <b>Deal won<\/b>/.test(n[0].body.text), true);
  t('  credits the presser',          n[0].body.text.includes('by Alex'), true);
}
for (const quiet of ['called', 'texted', 'emailed', 'lost']) {
  const { res } = post(buttonPress(quiet));
  await res;
  t(`"${quiet}" announces nothing`,   notices().length, 0);
  t(`  ...but still edits the card`,  sent.some((s) => /editMessageText/.test(s.url)), true);
}
{
  // A note replied into the group is already visible to everyone there.
  const { res } = post({
    message: {
      message_id: 903, chat: { id: CHAT }, from: { id: 8, first_name: 'Alex' },
      text: 'Board meets Thursday', reply_to_message: { message_id: 555 },
    },
  });
  await res;
  t('a note announces nothing',       notices().length, 0);
}

console.log('\n── notes by replying to a card ──');
{
  const { res, db } = post({
    message: {
      message_id: 900, chat: { id: CHAT }, from: { id: 8, first_name: 'Alex' },
      text: 'Left a voicemail, trying again Tuesday',
      reply_to_message: { message_id: 555 },
    },
  });
  await res;
  const event = writes(db).find((c) => /INSERT INTO lead_events/i.test(c.sql));
  t('note recorded',                  Boolean(event), true);
  t('  action is "note"',             event.args[2], 'note');
  t('  credited to the replier',      event.args[3], 'Alex');
  t('  text captured',                event.args[5], 'Left a voicemail, trying again Tuesday');
}
{
  const { res, db } = post({
    message: { message_id: 901, chat: { id: CHAT }, from: { id: 8, first_name: 'Alex' }, text: 'just chatting' },
  });
  await res;
  t('ordinary chatter ignored',       writes(db).length, 0);
}
{
  const { res, db } = post({
    message: {
      message_id: 902, chat: { id: CHAT }, from: { id: 8, first_name: 'Alex' },
      text: 'reply to something else', reply_to_message: { message_id: 12345 },
    },
  }, { db: fakeDB(null) });
  await res;
  t('reply to a non-card ignored',    writes(db).length, 0);
}

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
