/* The board — one place that knows how to keep a lead's Telegram card true.
 *
 * Everything that changes a lead (a button tap in the group, a status change in
 * the dashboard, a note) ends by calling refreshCard(). It reloads the lead and
 * its full history, re-renders from the shared renderer, and rewrites the card.
 * Because there is exactly one path from data to card, the group and the Lead
 * Desk cannot disagree.
 *
 * Every function here is best-effort and never throws: the card is a view of
 * the data, and a broken view must never break the data.
 */
import { renderCard, fromRow } from './_card.js';
import { eventsFor } from './_leadEvents.js';
import { sendCard, editCards } from './_telegram.js';

const parseCards = (v) => {
  try { const a = JSON.parse(v || '[]'); return Array.isArray(a) ? a : []; }
  catch { return []; }
};

/** Load one lead row, or null. */
export async function loadLead(env, leadId) {
  try {
    if (!env?.DB || !leadId) return null;
    return await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(leadId).first();
  } catch {
    return null;
  }
}

/** Remember where a lead's cards live, so either side can rewrite them. */
async function saveCards(env, leadId, cards) {
  try {
    await env.DB.prepare('UPDATE leads SET tg_cards = ? WHERE id = ?')
      .bind(JSON.stringify(cards), leadId).run();
  } catch { /* the card still works this request; it just may re-heal later */ }
}

/**
 * Post a lead's card for the first time (new lead, or a re-post of history).
 * Returns the card addresses that succeeded.
 */
export async function postCard(env, row) {
  try {
    if (!row) return [];
    const events = await eventsFor(env, row.id);
    const { text, reply_markup } = renderCard(fromRow(row), events);
    const { cards } = await sendCard(env, { text, reply_markup });
    if (cards.length) await saveCards(env, row.id, cards);
    return cards;
  } catch {
    return [];
  }
}

/**
 * Re-render and rewrite a lead's card from current truth. Silent no-op if the
 * lead has no card yet (an older lead, or Telegram was down when it arrived).
 */
export async function refreshCard(env, leadId) {
  try {
    const row = await loadLead(env, leadId);
    if (!row) return false;

    const cards = parseCards(row.tg_cards);
    if (!cards.length) return false;

    const events = await eventsFor(env, leadId);
    const { text, reply_markup } = renderCard(fromRow(row), events);

    // editCards heals unreachable cards by posting replacements; when it does,
    // it hands back the new addresses to store.
    const healed = await editCards(env, cards, { text, reply_markup });
    if (healed) await saveCards(env, leadId, healed);
    return true;
  } catch {
    return false;
  }
}

/** Find the lead whose card is this (chat, message) pair — for note replies. */
export async function leadByCard(env, chatId, messageId) {
  try {
    if (!env?.DB) return null;
    // tg_cards is a small JSON array; LIKE on the message id narrows to a
    // handful of rows, then we confirm properly in JS.
    const r = await env.DB.prepare(
      `SELECT * FROM leads WHERE tg_cards LIKE ? ORDER BY received_at DESC LIMIT 25`,
    ).bind(`%"mid":${Number(messageId)}%`).all();

    for (const row of r.results || []) {
      const hit = parseCards(row.tg_cards)
        .some((c) => String(c.chat) === String(chatId) && Number(c.mid) === Number(messageId));
      if (hit) return row;
    }
    return null;
  } catch {
    return null;
  }
}
