/* The Telegram lead card.
 *
 * A PURE function: (lead + its events) → { text, reply_markup }. No network, no
 * database, no clock beyond what it is handed. Both directions of the sync call
 * this same function — a button tap in the group and a status change in the
 * dashboard both re-render from here — which is what makes it impossible for
 * the card and the Lead Desk to drift apart. It is also trivially testable.
 *
 * What the card deliberately does NOT carry: IP address, ISP, operating system,
 * browser, screen size, user agent, referrer. Partners need what lets them act
 * — a name, a number, an address, and who has already done what. The technical
 * context still goes to the notification email and the dashboard, where it is
 * occasionally useful. It was pure noise on a phone.
 *
 * There is also no "Open in Lead Desk" link: partners have no dashboard login,
 * so it was dead weight for everyone who sees this card.
 */
import { ACTIONS } from './_leadEvents.js';

/** Telegram's hard cap is 4096 characters for a message. */
const MAX_LEN = 4096;
/** How many events to show before collapsing the older ones into a count. */
const TRAIL_LIMIT = 8;

const RULE = '━━━━━━━━━';

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** "Aug 14, 7:31 PM EDT" — the owner's own working time, always. */
export function eastern(d, withZone = true) {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date)) return '';
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
      ...(withZone ? { timeZoneName: 'short' } : {}),
    }).formatToParts(date);
    const g = (t) => (parts.find((p) => p.type === t) || {}).value || '';
    const zone = withZone ? ` ${g('timeZoneName')}` : '';
    return `${g('month')} ${g('day')}, ${g('hour')}:${g('minute')} ${g('dayPeriod')}${zone}`;
  } catch {
    return date.toISOString();
  }
}

/** First value in `src` whose key matches `re` and isn't blank. */
function pick(src, re) {
  for (const [k, v] of Object.entries(src || {})) {
    if (re.test(k) && String(v ?? '').trim()) return String(v).trim();
  }
  return '';
}

const STATUS_LINE = {
  new:           '🆕 <b>NEW</b>',
  proposal_sent: '📤 <b>PROPOSAL SENT</b>',
  won:           '✅ <b>WON</b>',
  lost:          '❌ <b>LOST</b>',
};

/* Buttons. callback_data is capped at 64 bytes by Telegram; "act:won:<uuid>"
   is 44, so there is comfortable headroom. */
const LEAD_BUTTONS = [
  [['📞 Called', 'called'], ['💬 Texted', 'texted']],
  [['✉️ Emailed', 'emailed'], ['📤 Proposal', 'proposal']],
  [['✅ Won', 'won'], ['❌ Lost', 'lost']],
];
const MESSAGE_BUTTONS = [
  [['↩️ Replied', 'replied'], ['🚫 Not relevant', 'not_relevant']],
  [['📥 Move to Leads', 'moved']],
];

export function keyboardFor(kind, leadId) {
  // No stored lead means no record for a press to act on, so the card ships
  // without buttons rather than with ones that would silently do nothing.
  if (!leadId) return undefined;
  const rows = kind === 'message' ? MESSAGE_BUTTONS : LEAD_BUTTONS;
  return {
    inline_keyboard: rows.map((row) =>
      row.map(([label, action]) => ({ text: label, callback_data: `act:${action}:${leadId}` }))),
  };
}

/** Parse a button press back into { action, leadId }, or null if malformed. */
export function parseCallback(data) {
  const m = /^act:([a-z_]+):(.+)$/.exec(String(data || ''));
  return m ? { action: m[1], leadId: m[2] } : null;
}

/**
 * Render the card.
 *
 * @param {object} lead   normalised lead (see fromRow)
 * @param {Array}  events oldest-first activity, from eventsFor()
 */
export function renderCard(lead, events = []) {
  const L = lead || {};
  const fields = L.fields || {};
  const isMessage = L.kind === 'message';

  const name    = pick(fields, /name/i) || 'Someone';
  const phone   = pick(fields, /phone/i);
  const email   = pick(fields, /email/i);
  const addr    = pick(fields, /address/i);
  const message = pick(fields, /message|comment|how can we help/i);
  const service = pick(fields, /service interest/i);

  const out = [];
  // The reference number is permanent and never reused, so partners can say
  // "what happened with 0007?" and mean exactly one enquiry, forever.
  const ref = L.seq ? ` <code>#${String(L.seq).padStart(4, '0')}</code>` : '';
  out.push(`${isMessage ? '✉️' : '🏠'} <b>${esc(L.brand || 'ATLStay')}</b> — ${isMessage ? 'Message' : 'Lead'}${ref}`);
  out.push(RULE);

  // Category first: an HOA board and a homeowner need completely different replies.
  if (service) out.push(`🏷 <b>${esc(service)}</b>`);

  out.push('');
  out.push(`👤 <b>${esc(name)}</b>`);
  if (phone) out.push(`📞 <a href="tel:${esc(phone.replace(/[^0-9+]/g, ''))}">${esc(phone)}</a>`);
  if (email) out.push(`✉️ <a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (addr)  out.push(`📍 ${esc(addr)}`);

  if (message) {
    out.push('');
    out.push(`💬 ${esc(message.length > 1200 ? message.slice(0, 1200) + '…' : message)}`);
  }

  // Everything else they actually answered — bedrooms, doors, budget. A new
  // form field appears here automatically without touching this file.
  const shown = [/name/i, /phone/i, /email/i, /address/i, /message|comment|how can we help/i, /service interest/i];
  const details = Object.entries(fields)
    .filter(([k, v]) => String(v ?? '').trim() && !shown.some((re) => re.test(k)))
    .map(([k, v]) => {
      const val = String(v).trim();
      return `• <b>${esc(k)}:</b> ${esc(val.length > 160 ? val.slice(0, 160) + '…' : val)}`;
    });
  if (details.length) { out.push(''); out.push(...details); }

  /* Where it came from. The page a lead submitted from says a lot about intent
     — an HOA page in Cumming is a different conversation from the pricing page. A submitted lead carries the page URL it came from; a
     hand-added one carries free text ("Phone call", "Referral") and is marked
     as hand-added, so nobody in the group mistakes it for something the website
     captured. The link icon is only used when it is actually a link. */
  if (L.manual) {
    out.push('');
    out.push(`✍️ <i>Added by hand${L.pageUrl ? ` — ${esc(L.pageUrl)}` : ''}</i>`);
  } else if (L.pageUrl) {
    out.push('');
    out.push(`🔗 ${esc(L.pageUrl)}`);
  }
  if (L.receivedAt) out.push(`🕐 ${esc(eastern(L.receivedAt))}`);

  // ── current state ──
  out.push(RULE);

  /* A lead with no id was never stored. That used to be invisible: the card
     looked completely normal, just quietly missing its buttons, so a total
     storage outage could run for hours unnoticed (it did, on 2026-08-24 —
     see test/leadstore.test.mjs). Say it out loud instead. */
  if (!L.id) {
    out.push('⚠️ <b>NOT SAVED TO THE DASHBOARD</b>');
    out.push('<i>Storage failed, so this card has no buttons and this lead is');
    out.push('not in the Lead Desk. The details above are complete — copy them.</i>');
    out.push('');
  }

  /* Email is delivered by the visitor's browser, not this server (Web3Forms
     refuses server-side calls on the free plan). When neither path delivered,
     say so here rather than letting the owner discover it weeks later. */
  if (L.emailFailed) {
    out.push('⚠️ <b>NO EMAIL WAS SENT</b>');
    out.push('<i>This card is the only copy — everything you need is above.</i>');
    out.push('');
  }

  out.push(STATUS_LINE[L.status] || STATUS_LINE.new);

  const trail = renderTrail(events);
  if (trail.length) { out.push(''); out.push(...trail); }

  out.push(RULE);
  out.push('<i>↩️ Reply to this card to add a note</i>');

  let text = out.join('\n');
  if (text.length > MAX_LEN) text = text.slice(0, MAX_LEN - 20) + '\n…';

  return { text, reply_markup: keyboardFor(L.kind, L.id) };
}

/* ── milestone announcements ──────────────────────────────────────────────
 *
 * Editing a message sends NO notification: Telegram rewrites it in place and
 * nobody's phone makes a sound. That is exactly right for the running card —
 * it would be unbearable if every button tap pinged everyone — but it means
 * the two moments that actually matter can pass completely unnoticed.
 *
 * So those two, and only those two, also get a short message of their own.
 * Announcing every action would train the group to mute the chat, which would
 * cost the notifications that matter. Losses stay silent on purpose.
 *
 * This is NOT a second card: no buttons, no contact details, no duplication of
 * anything. It names what happened and points at the card, which remains the
 * single source of truth. */
const NOTICE = {
  proposal: { icon: '📤', headline: 'Proposal sent' },
  won:      { icon: '✅', headline: 'Deal won' },
};

/** Is this action worth interrupting the group for? */
export const isNotifiable = (action) =>
  Object.prototype.hasOwnProperty.call(NOTICE, action);

/**
 * Render the announcement. Pure, like renderCard — returns '' for any action
 * that is not a milestone, so callers can hand it anything.
 *
 * @param {object} lead   normalised lead (see fromRow)
 * @param {string} action 'proposal' | 'won'
 * @param {string} actor  who did it
 */
export function renderNotice(lead, action, actor) {
  const n = NOTICE[action];
  if (!n) return '';

  const L = lead || {};
  const fields = L.fields || {};
  const name = pick(fields, /name/i) || 'Someone';
  const service = pick(fields, /service interest/i);
  const ref = L.seq ? ` <code>#${String(L.seq).padStart(4, '0')}</code>` : '';

  const out = [`${n.icon} <b>${n.headline}</b> — ${esc(name)}${ref}`];

  // Second line only when there is something to put on it.
  const context = [
    actor ? `by ${actor}` : '',
    service.length > 60 ? `${service.slice(0, 60)}…` : service,
  ].filter(Boolean).join(' · ');
  if (context) out.push(`<i>${esc(context)}</i>`);

  return out.join('\n');
}

/** The activity trail, newest last, older entries collapsed to a count. */
function renderTrail(events) {
  const list = (events || []).filter((e) => ACTIONS[e.action] && e.action !== 'created');
  if (!list.length) return ['<i>Nobody has actioned this yet.</i>'];

  const lines = [];
  const hidden = list.length - TRAIL_LIMIT;
  if (hidden > 0) lines.push(`<i>+${hidden} earlier…</i>`);

  for (const e of list.slice(-TRAIL_LIMIT)) {
    const a = ACTIONS[e.action];
    const when = eastern(e.created_at, false);
    if (e.action === 'note') {
      lines.push(`📝 <b>${esc(e.actor)}</b> · ${esc(when)}`);
      lines.push(`   ↳ <i>${esc(e.note || '')}</i>`);
    } else {
      lines.push(`${a.icon} <b>${esc(e.actor)}</b> ${esc(a.verb)} · ${esc(when)}`);
    }
  }
  return lines;
}

/**
 * Normalise a D1 `leads` row (raw_lead/raw_meta already parsed, or still JSON)
 * into the shape renderCard expects.
 */
export function fromRow(row) {
  const parse = (v) => {
    if (!v) return {};
    if (typeof v === 'object') return v;
    try { return JSON.parse(v); } catch { return {}; }
  };
  return {
    id: row.id,
    kind: row.kind === 'message' ? 'message' : 'lead',
    brand: row.brand || 'ATLStay',
    status: row.status || 'new',
    seq: row.seq || null,
    emailFailed: row.email_ok === 0,
    // 'Added by hand' is what functions/boroto/api.js writes for a lead keyed
    // in from the dashboard rather than captured by a form.
    manual: row.form_name === 'Added by hand',
    receivedAt: row.received_at,
    pageUrl: row.page_url || '',
    fields: parse(row.raw_lead),
  };
}

/**
 * Normalise a fresh submission (the shape /api/lead receives) into the same
 * thing, so a brand-new card and a re-rendered one come from identical code.
 */
export function fromSubmission({ id, kind, lead, meta, status, receivedAt, seq }) {
  const page = pick(meta, /submitted from page/i);
  return {
    id,
    kind: kind === 'message' ? 'message' : 'lead',
    brand: /ssmproperty\.com/i.test(page) ? 'SSMProperty' : 'ATLStay',
    status: status || 'new',
    seq: seq || null,
    receivedAt: receivedAt || new Date().toISOString(),
    pageUrl: page,
    fields: lead || {},
  };
}
