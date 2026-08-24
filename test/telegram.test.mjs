import { telegramText } from '../functions/api/lead.js';
import { kindOf } from '../functions/api/_leadStore.js';

let fail = 0;
const t = (label, got, want) => { const ok = got === want; if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  (got ${JSON.stringify(got)}, want ${JSON.stringify(want)})`}`); };

t('contact form → message',        kindOf('ATLStay Contact Form'), 'message');
t('SSM contact form → message',    kindOf('SSMProperty Contact'), 'message');
t('projection form → lead',        kindOf('ATLStay Rental Projection'), 'lead');
t('HOA form → lead',               kindOf('ATLStay HOA Enquiry'), 'lead');
t('undefined → lead',              kindOf(undefined), 'lead');

// A long multi-paragraph body — modelled on a real vendor pitch, which is the
// shape that used to get cut off at 400 chars. Invented details only: this file
// is public, so no real sender's name, address or message ever goes in here.
const LONG = `Hi there!

I wanted to introduce myself and Example Landscape Supply. We work directly with commercial properties across the metro area providing mulch and pine straw installation without the usual middleman markup.
If you have any shopping centres or commercial properties coming up for a refresh, I would welcome the chance to quote.
We can handle the whole process, including measurements, pricing, delivery and installation.
If you already know your approximate coverage, along with the property address and scope, send it over and I can get pricing started. If not, no problem — we can visit and take the measurements for you.
Thank you!`;

const msg = telegramText({
  form: 'ATLStay Contact Form',
  lead: { Name: 'Alex Rivera', Email: 'sales@example.com', Phone: '14045550142', Message: LONG },
  meta: { 'Submitted from page': 'https://atlstay.com/contact/', Referrer: 'https://atlstay.com/about/', Device: 'Desktop' },
  leadId: 'abc-123',
  when: new Date('2026-08-24T16:18:21.862Z'),
  kind: 'message',
});

t('message header, not lead',      /New message/.test(msg), true);
t('envelope icon for a message',   msg.startsWith('✉️'), true);
t('FULL body present (not cut)',   msg.includes('take the measurements for you.'), true);
t('no truncation ellipsis',        msg.includes('…'), false);
t('original EST time shown',       /12:18 PM EDT/.test(msg), true);
t('NOT stamped with today',        /Aug 24, 2026 at 12:18 PM/.test(msg), true);
t('exact source page included',    msg.includes('https://atlstay.com/contact/'), true);
t('referrer included',             msg.includes('atlstay.com/about/'), true);
t('phone is a tap target',         msg.includes('href="tel:14045550142"'), true);
t('email is a tap target',         msg.includes('href="mailto:sales@example.com"'), true);
t('deep link to the record',       msg.includes('/boroto/leads/#abc-123'), true);
t('within Telegram 4096 limit',    msg.length < 4096, true);

// A real lead keeps the lead treatment.
const leadMsg = telegramText({
  form: 'ATLStay Rental Projection',
  lead: { Name: 'Sam Taylor', Email: 'sam@example.com', 'Service Interest': 'HOA & Community Association Management', Doors: '48' },
  meta: { 'Submitted from page': 'https://atlstay.com/services/hoa-management/cumming/' },
  leadId: 'x', when: new Date('2026-08-14T23:31:14.827Z'), kind: 'lead',
});
t('lead header',                   /New lead/.test(leadMsg), true);
t('house icon for a lead',         leadMsg.startsWith('🏠'), true);
t('service shown first',           leadMsg.includes('🏷 <b>HOA &amp; Community Association Management</b>'), true);
t('extra fields not dropped',      leadMsg.includes('Doors:</b> 48'), true);
t('original lead time in EST',     /Aug 14, 2026 at 7:31 PM EDT/.test(leadMsg), true);

console.log('\n' + (fail ? `${fail} FAILED` : 'ALL PASS'));
process.exit(fail ? 1 : 0);
