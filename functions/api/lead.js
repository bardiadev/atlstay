/**
 * Cloudflare Pages Function — POST /api/lead
 *
 * Receives a lead from the ATLStay site forms (src/lib/leads.ts) and:
 *   1. Sends a polished, ATLStay-branded HTML notification email to the owner
 *      via Resend.
 *   2. Sends the lead a branded "we got your request" confirmation email (only
 *      once a verified sending domain is configured, so test mode never errors).
 *   3. Falls back to Web3Forms if Resend isn't configured or fails — a lead is
 *      never lost.
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY   (secret, optional) Resend API key → enables branded email.
 *   LEAD_TO_EMAIL    (optional) Owner inbox. Default: hello@bardia.dev
 *   LEAD_FROM_EMAIL  (optional) Verified sender, e.g. "ATLStay <leads@atlstay.com>".
 *                    Default: "ATLStay Leads <onboarding@resend.dev>" (test mode —
 *                    delivers only to the Resend account owner until a domain is
 *                    verified; also gates the lead confirmation email).
 *   WEB3FORMS_KEY    (optional) Fallback access key. Default: site public key.
 *
 * No build step: Cloudflare Pages auto-deploys /functions as serverless routes.
 */

const DEFAULTS = {
  toEmail: 'hello@bardia.dev',
  fromEmail: 'ATLStay Leads <onboarding@resend.dev>',
  web3formsKey: '3b77cc25-dd1c-48f9-b8bd-c30905d66335',
  brand: 'ATLStay',
  domain: 'https://atlstay.com',
  phone: '(678) 938-6413',
  phoneHref: 'tel:+16789386413',
};

const C = {
  forest: '#14342b',
  brass: '#c9a24b',
  brassDeep: '#9a7422',
  cream: '#f7f4ec',
  paper: '#f1efe7',
  ink: '#1a2420',
  line: '#e2e0d6',
  muted: '#6b7770',
};

/* ── CORS ── Let the Silverstone/SSMProperty site post leads to this shared
 * endpoint so both sites fire the EXACT same email + Telegram pipeline. Only
 * our own origins are allowed; everything else gets no CORS header. */
const ALLOWED_ORIGINS = new Set([
  'https://ssmproperty.com',
  'https://www.ssmproperty.com',
  'https://atlstay.com',
  'https://www.atlstay.com',
]);
function corsHeaders(origin) {
  return origin && ALLOWED_ORIGINS.has(origin)
    ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
    : {};
}
export function onRequestOptions(context) {
  const origin = context.request.headers.get('Origin');
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/* ── Telegram lead notification (best-effort; never blocks or throws) ──
 * Pings the owner's personal notifier bot on every submission. Reads
 * TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID from env; no-ops silently if either is
 * unset (safe to deploy before the secrets exist). The token is never logged. */
function tgEscape(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function telegramText({ form, lead, meta }) {
  const L = lead || {};
  const M = meta || {};
  const get = (re) => {
    for (const [k, v] of Object.entries(L)) if (re.test(k) && String(v).trim()) return String(v);
    return '';
  };
  const isContact = /contact/i.test(form || '');
  const title = isContact ? 'New contact message' : 'New rental projection lead';
  const name = get(/name/i) || 'Someone';
  const phone = get(/phone/i);
  const email = get(/email/i);
  const addr = get(/address/i);
  const message = get(/message/i);
  const page = M['Submitted from page'] || '';
  const loc = M['Approx. location'] || '';

  const sep = '━━━━━━━━━━━━━━━━';
  // Label the source site so SSMProperty leads are distinguishable from ATLStay.
  const sourceBrand = /ssmproperty\.com/i.test(page) ? 'SSMProperty' : 'ATLStay';
  const lines = [`🏠 <b>${tgEscape(sourceBrand)}</b> · ${tgEscape(title)}`, `<b>${tgEscape(name)}</b>`];
  const contact = [];
  if (phone) contact.push(`📞 ${tgEscape(phone)}`);
  if (email) contact.push(`✉️ ${tgEscape(email)}`);
  if (contact.length) lines.push(contact.join('  ·  '));
  if (addr) lines.push(`📍 ${tgEscape(addr)}`);
  if (message) lines.push(`💬 ${tgEscape(message.length > 280 ? message.slice(0, 280) + '…' : message)}`);
  const ctx = [];
  if (page) ctx.push(tgEscape(page.replace(/^https?:\/\/[^/]+/, '') || page));
  if (loc) ctx.push(tgEscape(loc));
  if (ctx.length) lines.push(`<i>${ctx.join('  ·  ')}</i>`);
  lines.push(sep);
  return lines.join('\n');
}

async function sendTelegram(env, text) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // safe no-op until the secrets are set
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
  } catch {
    /* best-effort — never throw, never block the lead */
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = corsHeaders(request.headers.get('Origin'));

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON' }, 400, cors);
  }

  const subject = payload?.subject || 'New ATLStay lead';
  const formName = payload?.form || 'ATLStay';
  const replyto = payload?.replyto || '';
  const lead = payload?.lead || {};
  const meta = payload?.meta || {};

  // Notify the owner on Telegram for every submission — fire-and-forget so it
  // never blocks or breaks the lead, and fired here so it lands even if email
  // delivery later hiccups (the message carries the lead details itself).
  const notify = sendTelegram(env, telegramText({ form: formName, lead, meta }));
  if (typeof context.waitUntil === 'function') context.waitUntil(notify);

  const cfg = {
    resendKey: env.RESEND_API_KEY || '',
    toEmail: env.LEAD_TO_EMAIL || DEFAULTS.toEmail,
    fromEmail: env.LEAD_FROM_EMAIL || DEFAULTS.fromEmail,
    web3formsKey: env.WEB3FORMS_KEY || DEFAULTS.web3formsKey,
  };

  // ── Preferred: branded email via Resend ──
  if (cfg.resendKey) {
    try {
      const ownerRes = await sendResend(cfg.resendKey, {
        from: cfg.fromEmail,
        to: [cfg.toEmail],
        reply_to: replyto || undefined,
        subject,
        html: buildOwnerEmail({ formName, replyto, lead, meta }),
      });
      if (ownerRes.ok) {
        // Confirmation to the lead — only with a verified (non-sandbox) sender.
        const verified = cfg.fromEmail && !/resend\.dev/i.test(cfg.fromEmail);
        const leadEmail = pickEmail(lead);
        if (verified && leadEmail) {
          await sendResend(cfg.resendKey, {
            from: cfg.fromEmail,
            to: [leadEmail],
            subject: `We received your request — ${DEFAULTS.brand}`,
            html: buildLeadEmail({ lead }),
          }).catch(() => {});
        }
        return json({ success: true, via: 'resend' }, 200, cors);
      }
      // Resend returned non-2xx → fall through to Web3Forms.
    } catch {
      // network error → fall through
    }
  }

  // ── Fallback: Web3Forms (guarantees delivery) ──
  if (cfg.web3formsKey) {
    const ok = await sendWeb3forms(cfg.web3formsKey, { subject, formName, replyto, lead, meta });
    return json({ success: ok, via: 'web3forms' }, 200, cors);
  }

  return json({ success: false, error: 'No delivery method configured' }, 500, cors);
}

/* ───────────────────────── delivery ───────────────────────── */

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

function sendResend(key, body) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function sendWeb3forms(key, { subject, formName, replyto, lead, meta }) {
  try {
    const flat = { access_key: key, subject, from_name: formName };
    if (replyto) flat.replyto = replyto;
    Object.assign(flat, lead, meta);
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(flat),
    });
    const j = await res.json().catch(() => null);
    return Boolean((j && j.success) || res.ok);
  } catch {
    return false;
  }
}

/* ───────────────────────── helpers ───────────────────────── */

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pickField(obj, re) {
  for (const [k, v] of Object.entries(obj)) if (re.test(k) && String(v).trim()) return String(v);
  return '';
}
function keyOf(obj, re) {
  for (const k of Object.keys(obj)) if (re.test(k)) return k;
  return '';
}
function pickEmail(lead) {
  for (const [k, v] of Object.entries(lead)) {
    if (/email/i.test(k) && /@/.test(String(v))) return String(v).trim();
  }
  return '';
}

function renderValue(k, v) {
  const s = String(v);
  // Multi-line values (e.g. several listing links) → render each line.
  if (s.includes('\n')) {
    return s
      .split(/\r?\n/)
      .map((ln) => ln.trim())
      .filter(Boolean)
      .map((ln) => renderLine(k, ln))
      .join('<br>');
  }
  return renderLine(k, s);
}

function renderLine(k, s) {
  if (/coordinates/i.test(k)) {
    const q = encodeURIComponent(s.replace(/[^0-9.,\- ]/g, '').trim());
    return `${esc(s)} &nbsp;<a href="https://www.google.com/maps?q=${q}" style="color:${C.brassDeep};text-decoration:none;">View on map &#8599;</a>`;
  }
  if (/email/i.test(k) && /@/.test(s)) return `<a href="mailto:${esc(s)}" style="color:${C.brassDeep};">${esc(s)}</a>`;
  if (/phone/i.test(k)) return `<a href="tel:${esc(s.replace(/[^0-9+]/g, ''))}" style="color:${C.brassDeep};">${esc(s)}</a>`;
  if (/^https?:\/\//i.test(s)) return `<a href="${esc(s)}" style="color:${C.brassDeep};word-break:break-all;">${esc(s)}</a>`;
  if (/user agent/i.test(k)) return `<span style="font:12px/1.5 monospace;color:${C.muted};word-break:break-word;">${esc(s)}</span>`;
  return esc(s);
}

function tableRows(obj, skip) {
  const skipKeys = skip || [];
  let i = 0;
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (skipKeys.includes(k)) continue;
    if (v == null || String(v).trim() === '') continue;
    const bg = i % 2 === 0 ? '#ffffff' : '#faf9f5';
    out.push(
      `<tr>` +
        `<td style="padding:10px 14px;background:${bg};border-bottom:1px solid ${C.line};font:600 13px/1.4 Arial,Helvetica,sans-serif;color:${C.muted};vertical-align:top;width:42%;">${esc(k)}</td>` +
        `<td style="padding:10px 14px;background:${bg};border-bottom:1px solid ${C.line};font:14px/1.5 Arial,Helvetica,sans-serif;color:${C.ink};vertical-align:top;">${renderValue(k, v)}</td>` +
        `</tr>`,
    );
    i++;
  }
  return out.join('');
}

function btn(href, label, primary) {
  const bg = primary ? C.brass : '#ffffff';
  const border = primary ? C.brass : C.line;
  return `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:11px 20px;background:${bg};color:${C.forest};border:1px solid ${border};border-radius:999px;font:700 13px/1 Arial,Helvetica,sans-serif;text-decoration:none;">${label}</a>`;
}

function header(label) {
  return (
    `<tr><td style="background:${C.forest};padding:22px 28px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td style="font:700 22px/1 Georgia,'Times New Roman',serif;color:${C.cream};letter-spacing:-0.5px;">ATL<span style="color:${C.brass};">Stay</span></td>` +
    `<td align="right" style="font:700 11px/1 Arial,Helvetica,sans-serif;color:${C.brass};letter-spacing:2px;text-transform:uppercase;">${esc(label)}</td>` +
    `</tr></table></td></tr>` +
    `<tr><td style="height:4px;background:${C.brass};font-size:0;line-height:0;">&nbsp;</td></tr>`
  );
}

function section(title, rowsHtml, subtle) {
  if (!rowsHtml) return '';
  return (
    `<tr><td style="padding:16px 28px 6px;font:700 13px/1 Arial,Helvetica,sans-serif;color:${C.forest};letter-spacing:0.3px;">${title}</td></tr>` +
    `<tr><td style="padding:6px 28px 18px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:10px;overflow:hidden;${subtle ? `background:${C.cream};` : ''}">${rowsHtml}</table>` +
    `</td></tr>`
  );
}

function footer(replyto, when) {
  return (
    `<tr><td style="background:${C.forest};padding:18px 28px;font:12px/1.6 Arial,Helvetica,sans-serif;color:rgba(247,244,236,0.7);">` +
    (replyto
      ? `Reply directly to this email to reach <a href="mailto:${esc(replyto)}" style="color:${C.brass};">${esc(replyto)}</a>.<br>`
      : '') +
    `Captured at <a href="${DEFAULTS.domain}" style="color:${C.brass};text-decoration:none;">atlstay.com</a>${when ? ` &middot; ${esc(when)}` : ''}` +
    `</td></tr>`
  );
}

function shell(preheader, inner) {
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only">` +
    `</head><body style="margin:0;padding:0;background:${C.paper};">` +
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.paper};">${esc(preheader)}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper};padding:24px 12px;">` +
    `<tr><td align="center">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.line};">` +
    inner +
    `</table></td></tr></table></body></html>`
  );
}

/* ───────────────────────── templates ───────────────────────── */

function buildOwnerEmail({ formName, replyto, lead, meta }) {
  const name = pickField(lead, /name/i) || 'New lead';
  const email = pickEmail(lead);
  const phone = pickField(lead, /phone/i);
  const topDetail = pickField(lead, /address/i) || pickField(lead, /message/i) || '';

  let actions = '';
  if (email)
    actions += btn(`mailto:${email}?subject=${encodeURIComponent('Re: your ' + formName + ' request')}`, 'Reply by email', true);
  if (phone) actions += btn(`tel:${phone.replace(/[^0-9+]/g, '')}`, `Call ${esc(phone)}`, false);

  const skip = [keyOf(lead, /name/i), keyOf(lead, /email/i), keyOf(lead, /phone/i)].filter(Boolean);
  const when = meta['Submitted (their local time)'] || meta['Submitted (UTC)'] || '';

  const hero =
    `<tr><td style="padding:18px 28px 6px;font:700 11px/1 Arial,Helvetica,sans-serif;color:${C.brassDeep};letter-spacing:1.5px;text-transform:uppercase;">${esc(formName)}</td></tr>` +
    `<tr><td style="padding:4px 28px 14px;">` +
    `<div style="font:700 26px/1.2 Georgia,'Times New Roman',serif;color:${C.forest};margin:4px 0 ${topDetail ? '6px' : '14px'};">${esc(name)}</div>` +
    (topDetail ? `<div style="font:15px/1.5 Arial,Helvetica,sans-serif;color:${C.muted};margin:0 0 14px;">${esc(topDetail)}</div>` : '') +
    (actions ? `<div>${actions}</div>` : '') +
    `</td></tr>`;

  return shell(
    `New ${formName} lead — ${name}${topDetail ? ' · ' + topDetail : ''}`,
    header('New Lead') +
      hero +
      section('Lead details', tableRows(lead, skip)) +
      section('Where &amp; how they submitted', tableRows(meta), true) +
      footer(replyto, when),
  );
}

function buildLeadEmail({ lead }) {
  const first = (pickField(lead, /name/i) || '').split(' ')[0] || 'there';
  return shell(
    `Thanks ${first} — we received your request`,
    header('Request received') +
      `<tr><td style="padding:20px 28px 6px;">` +
      `<div style="font:700 24px/1.3 Georgia,'Times New Roman',serif;color:${C.forest};margin:6px 0 12px;">Thanks, ${esc(first)} — we've got it.</div>` +
      `<p style="font:15px/1.6 Arial,Helvetica,sans-serif;color:${C.ink};margin:0 0 14px;">Your request just landed with our Atlanta team. We'll review the details and follow up — typically within one business day. No sales pitch, just honest local numbers.</p>` +
      `<p style="font:15px/1.6 Arial,Helvetica,sans-serif;color:${C.ink};margin:0 0 18px;">In the meantime, here's how we work and what we charge:</p>` +
      `<div>${btn(DEFAULTS.domain + '/how-it-works/', 'How it works', true)}${btn(DEFAULTS.domain + '/pricing/', 'See pricing', false)}</div>` +
      `</td></tr>` +
      `<tr><td style="padding:14px 28px 24px;font:13px/1.6 Arial,Helvetica,sans-serif;color:${C.muted};">Questions now? Call <a href="${DEFAULTS.phoneHref}" style="color:${C.brassDeep};">${DEFAULTS.phone}</a>.</td></tr>` +
      footer('', ''),
  );
}
