import { onRequestPost } from '../functions/api/lead.js';

const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push(String(url));
  if (String(url).includes('api.telegram.org')) return { ok: true };
  if (String(url).includes('api.resend.com')) return { ok: true, json: async () => ({}) };
  if (String(url).includes('web3forms')) return { ok: true, json: async () => ({ success: true }) };
  return { ok: true, json: async () => ({}) };
};

const payload = {
  subject: 'New lead', form: 'ATLStay Rental Projection', replyto: 'dana@example.com',
  lead: { 'First Name': 'Dana', Email: 'dana@example.com', Phone: '(404) 555-0123',
          'Property Address': '1 Peachtree St NE, Atlanta, GA', 'Service Interest': 'HOA' },
  meta: { 'Submitted from page': 'https://atlstay.com/services/hoa-management/', 'Device': 'Mobile' },
};
const req = () => new Request('https://atlstay.com/api/lead', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://atlstay.com' },
  body: JSON.stringify(payload),
});

async function run(label, env) {
  calls.length = 0;
  const res = await onRequestPost({ request: req(), env, waitUntil: (p) => p });
  const body = await res.json().catch(() => ({}));
  const tg = calls.some((c) => c.includes('telegram'));
  const mail = calls.some((c) => c.includes('resend') || c.includes('web3forms'));
  console.log(`${label}\n   http=${res.status} success=${body.success} telegram=${tg} email=${mail}`);
  return { ok: res.status === 200 && body.success !== false, tg, mail };
}

const base = { TELEGRAM_BOT_TOKEN: 't', TELEGRAM_CHAT_ID: '-5357243661' };

console.log('=== FAIL-SOFT PROOF ===\n');
const a = await run('1. DB binding completely absent:', { ...base });
const b = await run('2. DB throws on prepare():', { ...base, DB: { prepare() { throw new Error('D1 down'); } } });
const c = await run('3. DB throws on run() (mid-write):', { ...base,
  DB: { prepare: () => ({ bind: () => ({ run: async () => { throw new Error('D1 write failed'); } }) }) } });
const d = await run('4. DB healthy:', { ...base,
  DB: { prepare: () => ({ bind: () => ({ run: async () => ({ success: true }) }) }) } });

const all = [a, b, c, d];
console.log('\n--- VERDICT ---');
console.log(all.every((r) => r.ok)   ? 'PASS — lead accepted in every case' : 'FAIL — a broken DB rejected a lead');
console.log(all.every((r) => r.tg)   ? 'PASS — Telegram fired in every case' : 'FAIL — Telegram lost');
console.log(all.every((r) => r.mail) ? 'PASS — email fired in every case'    : 'FAIL — email lost');
