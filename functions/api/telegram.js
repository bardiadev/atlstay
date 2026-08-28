/* Telegram webhook — the only inbound door in the system.
 *
 * SECURITY. This URL is necessarily public, and the data behind it is customer
 * contact details. Two independent checks guard it:
 *
 *   1. Telegram's secret header. setWebhook registers a random secret that
 *      Telegram echoes on every delivery as X-Telegram-Bot-Api-Secret-Token.
 *      Nobody who merely guesses the URL can produce it.
 *   2. The originating chat must be one we configured. Even a leaked secret
 *      cannot make the bot act on, or reveal, a lead from some other chat.
 *
 * Anything failing either check is dropped in silence with a 200. It is never
 * told why, and never sees lead data.
 *
 * ALWAYS 200. Telegram retries deliveries that fail, and a retry loop on a bug
 * would hammer the endpoint forever. Failures are swallowed here on purpose;
 * the event is already durable before the card is ever touched.
 */
import { parseCallback } from './_card.js';
import { addEvent, statusFor, isAction, ACTIONS } from './_leadEvents.js';
import { chatIdsFor, answerCallback } from './_telegram.js';
import { refreshCard, loadLead, leadByCard, announce } from './_board.js';

const ok = () => new Response('ok', { status: 200 });

/** Constant-time compare — no timing signal about how much of the secret matched. */
function timingSafeEqual(a, b) {
  const ab = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

/** A person's display name as Telegram gives it to us. */
function actorName(from) {
  const name = [from?.first_name, from?.last_name].filter(Boolean).join(' ').trim();
  return name || from?.username || 'Someone';
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── Gate 1: the secret only Telegram knows ──
  const secret = env.TELEGRAM_WEBHOOK_SECRET || '';
  const sent = request.headers.get('X-Telegram-Bot-Api-Secret-Token') || '';
  if (!secret || !timingSafeEqual(sent, secret)) return ok();

  let update;
  try { update = await request.json(); } catch { return ok(); }

  try {
    if (update.callback_query) await handleButton(env, update.callback_query);
    else if (update.message) await handleReply(env, update.message);
  } catch {
    /* never surface an error to Telegram — it would retry forever */
  }
  return ok();
}

/** Everything else Telegram might send (GET probes, browsers) gets nothing useful. */
export async function onRequestGet() {
  return new Response('Not found', { status: 404 });
}

/** A partner tapped a button. */
async function handleButton(env, cq) {
  const chatId = String(cq.message?.chat?.id || '');

  // ── Gate 2: only chats we configured ──
  if (!chatIdsFor(env).includes(chatId)) {
    await answerCallback(env, cq.id, '');
    return;
  }

  const parsed = parseCallback(cq.data);
  if (!parsed || !isAction(parsed.action)) {
    await answerCallback(env, cq.id, '');
    return;
  }
  const { action, leadId } = parsed;

  const row = await loadLead(env, leadId);
  if (!row) { await answerCallback(env, cq.id, 'That lead is gone.'); return; }

  const actor = actorName(cq.from);
  const wanted = statusFor(action);

  // Tapping a status the lead is already in shouldn't pollute the history.
  // Touches (called/emailed) always log, because calling twice is a real event.
  if (wanted && row.status === wanted) {
    await answerCallback(env, cq.id, `Already ${ACTIONS[action].verb.replace(/^marked it /, '')}.`);
    return;
  }

  await addEvent(env, {
    leadId, action, actor, actorTgId: cq.from?.id, source: 'telegram',
  });

  if (wanted) await applyStatus(env, leadId, wanted);
  if (action === 'moved') await moveToLeads(env, leadId);

  await refreshCard(env, leadId);
  // The rewrite above is silent — Telegram notifies nobody about an edit. A
  // milestone therefore gets its own short message so the group actually hears
  // it. Safe from repeats: the already-in-that-status check above returned.
  await announce(env, leadId, action, actor);
  await answerCallback(env, cq.id, `${ACTIONS[action].icon} ${actor} ${ACTIONS[action].verb}`);
}

/** Somebody replied to a card — treat the text as a note on that lead. */
async function handleReply(env, msg) {
  const chatId = String(msg.chat?.id || '');
  if (!chatIdsFor(env).includes(chatId)) return;

  const replyTo = msg.reply_to_message;
  const text = String(msg.text || msg.caption || '').trim();
  if (!replyTo || !text) return;

  const row = await leadByCard(env, chatId, replyTo.message_id);
  if (!row) return; // a reply to something that isn't a card — not our business

  await addEvent(env, {
    leadId: row.id, action: 'note', actor: actorName(msg.from),
    actorTgId: msg.from?.id, note: text, source: 'telegram',
  });
  await refreshCard(env, row.id);
}

async function applyStatus(env, leadId, status) {
  try {
    const now = new Date().toISOString();
    if (status === 'proposal_sent') {
      await env.DB.prepare(
        `UPDATE leads SET status = ?, proposal_sent_at = COALESCE(proposal_sent_at, ?), updated_at = ?
          WHERE id = ?`).bind(status, now, now, leadId).run();
    } else {
      await env.DB.prepare('UPDATE leads SET status = ?, updated_at = ? WHERE id = ?')
        .bind(status, now, leadId).run();
    }
  } catch { /* the event is already recorded; the status can be fixed by hand */ }
}

async function moveToLeads(env, leadId) {
  try {
    await env.DB.prepare("UPDATE leads SET kind = 'lead', updated_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), leadId).run();
  } catch { /* best effort */ }
}
