/* The Telegram lead card — pure rendering, no network.
 *
 * This repository is PUBLIC. Every name, email, phone and address below is
 * invented. Never paste a real submission into a test.
 */
import { renderCard, renderNotice, isNotifiable, fromRow, fromSubmission, parseCallback, keyboardFor } from '../functions/api/_card.js';
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

console.log('\n── long, multi-line notes ──');
/* A note is the one thing people write at length — a call summary, a text
   message pasted in whole. It is stored in full for the dashboard; the card
   shows the opening of it, keeping the writer's own line breaks. */
{
  const multi = renderCard(LEAD, [{
    action: 'note', actor: 'Brandon', created_at: '2026-08-31T18:00:00Z', source: 'dashboard',
    note: 'Spoke with her today, she is NOT allowed to do STR.\nShe texted after our call:\n\nLooking to rent long term.\nTime frame is Feb 2027.',
  }]);
  t('first line rendered',        multi.text.includes('<i>Spoke with her today, she is NOT allowed to do STR.</i>'), true);
  t('later lines kept separate',  multi.text.includes('<i>Time frame is Feb 2027.</i>'), true);
  t('blank line preserved',       multi.text.includes('\n<i></i>\n'), true);
  t('nothing run together',       /call:She texted|STR\.She/.test(multi.text), false);

  const long = renderCard(LEAD, [{
    action: 'note', actor: 'Brandon', created_at: '2026-08-31T18:00:00Z', source: 'dashboard',
    note: 'x'.repeat(2000),
  }]);
  t('a long note is previewed',   long.text.includes('…'), true);
  t('  ...not dumped whole',      long.text.includes('x'.repeat(700)), false);
  t('  ...and the card survives', long.text.length <= 4096, true);
  t('  ...still says who wrote it', long.text.includes('<b>Brandon</b>'), true);

  const short = renderCard(LEAD, [{
    action: 'note', actor: 'Alex', created_at: '2026-08-31T18:00:00Z', source: 'telegram',
    note: 'Call back Tuesday',
  }]);
  t('a short note is untouched',  short.text.includes('<i>Call back Tuesday</i>'), true);
  t('  ...with no ellipsis',      short.text.includes('Call back Tuesday…'), false);
}

console.log('\n── several notes must stay readable ──');
/* Interleaved with the taps, two or three notes ran together into a wall where
   you could not see whose words were whose. They get their own block now. */
{
  const mixed = renderCard(LEAD, [
    { action: 'called',  actor: 'Bardia',  created_at: '2026-08-31T14:00:00Z', source: 'telegram' },
    { action: 'note',    actor: 'Brandon', created_at: '2026-08-31T15:00:00Z', source: 'dashboard', note: 'First note.' },
    { action: 'emailed', actor: 'Alex',    created_at: '2026-08-31T16:00:00Z', source: 'telegram' },
    { action: 'note',    actor: 'Alex',    created_at: '2026-08-31T17:00:00Z', source: 'telegram', note: 'Second note.' },
    { action: 'note',    actor: 'Brandon', created_at: '2026-08-31T18:00:00Z', source: 'dashboard', note: 'Third note.' },
  ]);
  t('notes are counted',           mixed.text.includes('📝 <b>3 notes</b>'), true);
  t('taps stay above the notes',   mixed.text.indexOf('Bardia</b> called') < mixed.text.indexOf('📝 <b>3 notes</b>'), true);
  t('no tap after the notes head', mixed.text.indexOf('Alex</b> emailed') < mixed.text.indexOf('📝 <b>3 notes</b>'), true);
  t('each note is attributed',     (mixed.text.match(/<b>Brandon<\/b> · /g) || []).length, 2);
  t('all three bodies present',    ['First note.', 'Second note.', 'Third note.'].every((s) => mixed.text.includes(s)), true);
  t('blank line between notes',    mixed.text.includes('<i>First note.</i>\n\n<b>Alex</b>'), true);

  const one = renderCard(LEAD, [
    { action: 'note', actor: 'Brandon', created_at: '2026-08-31T18:00:00Z', source: 'dashboard', note: 'Only note.' },
  ]);
  t('singular reads correctly',    one.text.includes('📝 <b>1 note</b>'), true);
  t('  ...not "1 notes"',          one.text.includes('1 notes'), false);
}

console.log('\n── many long notes cannot blow the card ──');
{
  const many = renderCard(LEAD, Array.from({ length: 9 }, (_, i) => ({
    action: 'note', actor: `P${i}`, created_at: `2026-08-31T${String(10 + i).padStart(2, '0')}:00:00Z`,
    source: 'dashboard', note: `note ${i} `.padEnd(900, 'y'),
  })));
  t('within Telegram\'s limit',    many.text.length <= 4096, true);
  t('total counted honestly',      many.text.includes('📝 <b>9 notes</b>'), true);
  t('  ...and says it trimmed',    many.text.includes('newest 5'), true);
  t('newest note is kept',         many.text.includes('<b>P8</b>'), true);
  t('oldest is dropped',           many.text.includes('<b>P0</b> ·'), false);
  t('each is shortened',           (many.text.match(/…/g) || []).length >= 5, true);
}

console.log('\n── an edited note says so ──');
{
  const edited = renderCard(LEAD, [{
    action: 'note', actor: 'Brandon', created_at: '2026-08-31T18:00:00Z',
    edited_at: '2026-08-31T19:30:00Z', source: 'dashboard', note: 'Corrected wording.',
  }]);
  t('marked as edited',            edited.text.includes('· <i>edited</i>'), true);
  t('author unchanged',            edited.text.includes('<b>Brandon</b>'), true);
  t('original time unchanged',     edited.text.includes('Aug 31, 2:00 PM'), true);
  const plain = renderCard(LEAD, [{
    action: 'note', actor: 'Brandon', created_at: '2026-08-31T18:00:00Z', source: 'dashboard', note: 'Untouched.',
  }]);
  t('unedited note stays quiet',   plain.text.includes('edited'), false);
}

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
t('lead gets 6 actions',         base.reply_markup.inline_keyboard.flat().length, 6);
t('texted is one of them',       JSON.stringify(base.reply_markup).includes('act:texted:lead-abc'), true);
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

console.log('\n── a storage failure must be loud, not silent ──');
const unsaved = renderCard(fromSubmission({ id: '', kind: 'lead', lead: { Name: 'Sam Taylor' }, meta: {} }), []);
t('card says it was not saved',  unsaved.text.includes('NOT SAVED TO THE DASHBOARD'), true);
t('  ...and explains why',       unsaved.text.includes('no buttons'), true);
t('  ...and has no buttons',     unsaved.reply_markup, undefined);
t('  ...but still shows details', unsaved.text.includes('Sam Taylor'), true);
t('a healthy card stays quiet',  base.text.includes('NOT SAVED'), false);

console.log('\n── an email failure must be loud too ──');
const noMail = renderCard(fromRow({
  id: 'x1', kind: 'lead', brand: 'ATLStay', status: 'new', email_ok: 0,
  received_at: '2026-08-24T21:23:00Z', raw_lead: JSON.stringify({ Name: 'Sam Taylor' }),
}), []);
t('card says no email was sent', noMail.text.includes('NO EMAIL WAS SENT'), true);
const mailedOk = renderCard(fromRow({
  id: 'x2', kind: 'lead', brand: 'ATLStay', status: 'new', email_ok: 1,
  received_at: '2026-08-24T21:23:00Z', raw_lead: JSON.stringify({ Name: 'Sam Taylor' }),
}), []);
t('delivered email stays quiet',  mailedOk.text.includes('NO EMAIL'), false);
const unknownMail = renderCard(fromRow({
  id: 'x3', kind: 'lead', brand: 'ATLStay', status: 'new',
  received_at: '2026-08-24T21:23:00Z', raw_lead: JSON.stringify({ Name: 'Sam Taylor' }),
}), []);
t('unknown state stays quiet',    unknownMail.text.includes('NO EMAIL'), false);

console.log('\n── reference numbers ──');
const numbered = renderCard({ ...LEAD, seq: 7 }, []);
t('ref shown, zero-padded',      numbered.text.includes('<code>#0007</code>'), true);
t('no ref when unnumbered',      base.text.includes('<code>#'), false);
const big = renderCard({ ...LEAD, seq: 12345 }, []);
t('long refs are not truncated', big.text.includes('<code>#12345</code>'), true);

console.log('\n── action → status mapping ──');
t('called is a touch',           statusFor('called'), '');
t('texted is a touch',           statusFor('texted'), '');
t('texted is a known action',    isAction('texted'), true);
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

console.log('\n── milestone announcements ──');
/* Editing a card notifies nobody, so a proposal going out and a deal closing
   also get a short message of their own. Only those two: a ping for every
   button tap is how a group ends up muted. */
{
  const L = { ...LEAD, seq: 7 };
  const prop = renderNotice(L, 'proposal', 'Bardia');
  t('proposal is announced',       prop.startsWith('📤 <b>Proposal sent</b>'), true);
  t('  names the lead',            prop.includes('Sam Taylor'), true);
  t('  carries the reference',     prop.includes('<code>#0007</code>'), true);
  t('  credits who did it',        prop.includes('by Bardia'), true);
  t('  gives the service',         prop.includes('HOA &amp; Community Association'), true);
  t('  stays two lines',           prop.split('\n').length, 2);
  t('  and short',                 prop.length < 220, true);

  const won = renderNotice(L, 'won', 'Alex');
  t('a win is announced',          won.startsWith('✅ <b>Deal won</b>'), true);
  t('  credits who did it',        won.includes('by Alex'), true);

  // It is an announcement, not a second card: the card holds the detail, and
  // duplicating contact details into extra messages spreads PII for nothing.
  t('no phone in the notice',      /7705550148/.test(prop), false);
  t('no email in the notice',      /sam@example\.com/.test(prop), false);
  t('no address in the notice',    /Example Ridge/.test(prop), false);
  t('no buttons (plain text)',     typeof prop, 'string');
}

console.log('\n── only the two milestones interrupt anyone ──');
t('proposal notifies',           isNotifiable('proposal'), true);
t('won notifies',                isNotifiable('won'), true);
t('lost stays silent',           isNotifiable('lost'), false);
t('called stays silent',         isNotifiable('called'), false);
t('texted stays silent',         isNotifiable('texted'), false);
t('emailed stays silent',        isNotifiable('emailed'), false);
t('a note stays silent',         isNotifiable('note'), false);
t('unknown stays silent',        isNotifiable('drop_database'), false);
for (const a of ['called', 'texted', 'emailed', 'note', 'lost', 'moved', 'nonsense']) {
  t(`"${a}" renders nothing`,    renderNotice(LEAD, a, 'Bardia'), '');
}

console.log('\n── announcement edge cases ──');
{
  const noRef = renderNotice(LEAD, 'won', 'Bardia');
  t('unnumbered lead omits the ref', noRef.includes('<code>#'), false);

  const bare = renderNotice(
    fromSubmission({ id: 'b1', kind: 'lead', lead: { Name: 'Jordan Lee' }, meta: {} }), 'won', '');
  t('no actor, no service → one line', bare.split('\n').length, 1);
  t('  still names the lead',       bare.includes('Jordan Lee'), true);

  const nameless = renderNotice(fromSubmission({ id: 'b2', kind: 'lead', lead: {}, meta: {} }), 'won', 'Alex');
  t('missing name degrades safely', nameless.includes('Someone'), true);

  const longSvc = renderNotice(fromSubmission({
    id: 'b3', kind: 'lead', lead: { Name: 'Jordan Lee', 'Service Interest': 'X'.repeat(200) }, meta: {},
  }), 'proposal', 'Alex');
  t('a long service is trimmed',    longSvc.length < 200, true);
  t('  ...with an ellipsis',        longSvc.includes('…'), true);

  const evil = renderNotice(fromSubmission({
    id: 'b4', kind: 'lead', lead: { Name: '<b>fake</b>' }, meta: {},
  }), 'won', '<script>x</script>');
  t('lead name escaped',            evil.includes('&lt;b&gt;fake&lt;/b&gt;'), true);
  t('actor name escaped',           evil.includes('&lt;script&gt;'), true);
  t('no raw tag survives',          /<script>/.test(evil), false);
}

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
