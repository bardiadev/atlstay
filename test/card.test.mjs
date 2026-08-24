/* The Telegram lead card — pure rendering, no network.
 *
 * This repository is PUBLIC. Every name, email, phone and address below is
 * invented. Never paste a real submission into a test.
 */
import { renderCard, fromRow, fromSubmission, parseCallback, keyboardFor } from '../functions/api/_card.js';
import { statusFor, isAction } from '../functions/api/_leadEvents.js';

let fail = 0;
const t = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

const LEAD = fromSubmission({
  id: 'lead-abc',
  kind: 'lead',
  receivedAt: '2026-08-14T23:31:14.827Z',
  lead: {
    Name: 'Sam Taylor', Email: 'sam@example.com', Phone: '17705550148',
    'Community Address': 'Example Ridge, Cumming, GA 30040',
    Doors: '48', 'Association Type': 'HOA',
    'Service Interest': 'HOA & Community Association Management',
  },
  meta: {
    'Submitted from page': 'https://atlstay.com/services/hoa-management/cumming/',
    Referrer: 'https://www.google.com/',
    'IP address': '203.0.113.7',
    'Network / ISP': 'Example Telecom',
    'Operating system': 'Windows 10/11',
    Browser: 'Chrome',
    Screen: '1920x1080',
    'User agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
});

console.log('── content ──');
const base = renderCard(LEAD, []);
t('lead heading',                base.text.startsWith('🏠 <b>ATLStay</b> — Lead'), true);
t('service shown first',         base.text.includes('🏷 <b>HOA &amp; Community Association Management</b>'), true);
t('name present',                base.text.includes('Sam Taylor'), true);
t('phone is a tap target',       base.text.includes('href="tel:17705550148"'), true);
t('email is a tap target',       base.text.includes('href="mailto:sam@example.com"'), true);
t('address present',             base.text.includes('Example Ridge, Cumming'), true);
t('their answers kept',          base.text.includes('<b>Doors:</b> 48'), true);
t('source page kept',            base.text.includes('/services/hoa-management/cumming/'), true);
t('time in Eastern',             /Aug 14, 7:31 PM EDT/.test(base.text), true);

console.log('\n── the noise Brandon asked to remove ──');
t('no IP address',               /203\.0\.113\.7/.test(base.text), false);
t('no ISP',                      /Example Telecom/.test(base.text), false);
t('no operating system',         /Windows 10/.test(base.text), false);
t('no browser',                  /Chrome/.test(base.text), false);
t('no screen size',              /1920x1080/.test(base.text), false);
t('no user agent',               /Mozilla/.test(base.text), false);
t('no referrer',                 /google\.com/.test(base.text), false);
t('no Open in Lead Desk link',   /boroto/.test(base.text), false);

console.log('\n── status + activity trail ──');
t('new lead shows NEW',          base.text.includes('🆕 <b>NEW</b>'), true);
t('says nobody has acted',       base.text.includes('Nobody has actioned this yet'), true);
t('invites a note reply',        base.text.includes('Reply to this card to add a note'), true);

const events = [
  { action: 'called',   actor: 'Bardia', created_at: '2026-08-14T23:45:00Z', source: 'telegram' },
  { action: 'note',     actor: 'Bardia', note: 'Wants to talk after the board meets', created_at: '2026-08-14T23:46:00Z', source: 'telegram' },
  { action: 'emailed',  actor: 'Alex',   created_at: '2026-08-15T00:10:00Z', source: 'telegram' },
  { action: 'proposal', actor: 'Brandon', created_at: '2026-08-15T13:02:00Z', source: 'dashboard' },
];
const active = renderCard({ ...LEAD, status: 'proposal_sent' }, events);
t('status reflects proposal',    active.text.includes('📤 <b>PROPOSAL SENT</b>'), true);
t('who called is named',         active.text.includes('<b>Bardia</b> called'), true);
t('note text shown',             active.text.includes('Wants to talk after the board meets'), true);
t('second partner named',        active.text.includes('<b>Alex</b> emailed'), true);
t('dashboard action in trail',   active.text.includes('<b>Brandon</b> sent the proposal'), true);
t('no longer says nobody acted', active.text.includes('Nobody has actioned'), false);

console.log('\n── trail collapsing ──');
const many = Array.from({ length: 14 }, (_, i) => ({
  action: 'called', actor: `P${i}`, created_at: `2026-08-15T${String(i).padStart(2, '0')}:00:00Z`, source: 'telegram',
}));
const long = renderCard(LEAD, many);
t('older entries collapse',      long.text.includes('+6 earlier'), true);
t('most recent kept',            long.text.includes('<b>P13</b> called'), true);
t('oldest dropped from view',    long.text.includes('<b>P0</b> called'), false);

console.log('\n── Telegram limits ──');
const huge = renderCard(
  fromSubmission({ id: 'x', kind: 'message', lead: { Name: 'A', Message: 'z'.repeat(5000) }, meta: {} }),
  many,
);
t('stays under 4096 chars',      huge.text.length <= 4096, true);

console.log('\n── buttons ──');
t('lead gets 5 actions',         base.reply_markup.inline_keyboard.flat().length, 5);
t('callback data is well-formed', base.reply_markup.inline_keyboard[0][0].callback_data, 'act:called:lead-abc');
t('callback within 64 bytes',    base.reply_markup.inline_keyboard[0][0].callback_data.length <= 64, true);
const msgCard = renderCard(fromSubmission({ id: 'm1', kind: 'message', lead: { Name: 'A' }, meta: {} }), []);
t('message heading',             msgCard.text.startsWith('✉️ <b>ATLStay</b> — Message'), true);
t('message gets 3 actions',      msgCard.reply_markup.inline_keyboard.flat().length, 3);
t('message can move to leads',   JSON.stringify(msgCard.reply_markup).includes('act:moved:m1'), true);
t('unstored lead has no buttons', keyboardFor('lead', ''), undefined);

console.log('\n── callback parsing ──');
t('parses a press',              JSON.stringify(parseCallback('act:won:abc-123')), '{"action":"won","leadId":"abc-123"}');
t('rejects junk',                parseCallback('nonsense'), null);
t('rejects empty',               parseCallback(''), null);

console.log('\n── action → status mapping ──');
t('called is a touch',           statusFor('called'), '');
t('emailed is a touch',          statusFor('emailed'), '');
t('note is a touch',             statusFor('note'), '');
t('proposal sets status',        statusFor('proposal'), 'proposal_sent');
t('won sets status',             statusFor('won'), 'won');
t('lost sets status',            statusFor('lost'), 'lost');
t('unknown action rejected',     isAction('drop_database'), false);

console.log('\n── D1 row round-trip ──');
const row = fromRow({
  id: 'r1', kind: 'message', brand: 'SSMProperty', status: 'won',
  received_at: '2026-08-24T16:18:21.862Z', page_url: 'https://ssmproperty.com/contact/',
  raw_lead: JSON.stringify({ Name: 'Jordan Lee', Message: 'Hello there' }),
});
const fromDb = renderCard(row, []);
t('brand carried from row',      fromDb.text.includes('<b>SSMProperty</b>'), true);
t('status carried from row',     fromDb.text.includes('✅ <b>WON</b>'), true);
t('JSON fields parsed',          fromDb.text.includes('Jordan Lee'), true);
t('message body rendered',       fromDb.text.includes('Hello there'), true);

console.log('\n── escaping ──');
const nasty = renderCard(fromSubmission({
  id: 'e1', kind: 'lead', lead: { Name: '<script>alert(1)</script>', Email: 'a&b@example.com' }, meta: {},
}), []);
t('tags escaped',                nasty.text.includes('&lt;script&gt;'), true);
t('raw tag absent',              nasty.text.includes('<script>'), false);
t('ampersand escaped',           nasty.text.includes('a&amp;b@example.com'), true);

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
