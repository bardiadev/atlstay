/* Telegram transport. Knows how to talk to the Bot API and nothing else —
 * no rendering, no business rules, no database.
 *
 * WHICH BOT: lead cards go out via TELEGRAM_LEAD_BOT_TOKEN (@SSM_Lead_bot),
 * a bot dedicated to this site. It has to be dedicated, because receiving
 * button presses requires setWebhook, and that setting is GLOBAL to a bot —
 * pointing the owner's universal notification bot at this site would hijack
 * updates belonging to his unrelated projects. TELEGRAM_BOT_TOKEN remains as a
 * fallback purely so the cutover cannot cost a notification.
 */

const API = 'https://api.telegram.org';

export function tokenFor(env) {
  return env.TELEGRAM_LEAD_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN || '';
}

export function chatIdsFor(env) {
  return String(env.TELEGRAM_CHAT_ID || '')
    .split(',').map((c) => c.trim()).filter(Boolean);
}

async function call(token, method, body) {
  try {
    const r = await fetch(`${API}/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await r.json().catch(() => ({ ok: false, description: 'unparseable response' }));
  } catch (e) {
    return { ok: false, description: String((e && e.message) || e) };
  }
}

/**
 * Post a card to every configured chat. Returns the card addresses that
 * succeeded: [{ chat, mid }]. Never throws — a lead is never lost because
 * Telegram was unhappy.
 */
export async function sendCard(env, { text, reply_markup }) {
  const token = tokenFor(env);
  if (!token) return { cards: [], results: [] };

  const cards = [];
  const results = [];

  for (const chat_id of chatIdsFor(env)) {
    let body = await call(token, 'sendMessage', {
      chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup,
    });

    // Telegram silently reassigns a group's id when it is upgraded to a
    // supergroup, reporting the replacement in parameters.migrate_to_chat_id.
    // Follow it so an upgrade never costs a notification.
    const migrated = body?.parameters?.migrate_to_chat_id;
    if (!body.ok && migrated) {
      body = await call(token, 'sendMessage', {
        chat_id: migrated, text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup,
      });
      if (body.ok) {
        cards.push({ chat: String(migrated), mid: body.result.message_id });
        results.push({ chat: chat_id, ok: true, migrated_to: String(migrated) });
        continue;
      }
    }

    if (body.ok) {
      cards.push({ chat: String(chat_id), mid: body.result.message_id });
      results.push({ chat: chat_id, ok: true });
    } else {
      results.push({ chat: chat_id, ok: false, err: body.description || 'unknown' });
    }
  }
  return { cards, results };
}

/**
 * Rewrite existing cards in place, and HEAL any that can no longer be edited.
 *
 * Editing a bot's own message has no 48-hour limit, but this deliberately does
 * not depend on that being true. If an edit fails for any reason — message
 * deleted, bot removed and re-added, a limit we did not predict — a replacement
 * card is posted and the returned addresses point at it. Note that deleteMessage
 * is NOT used to tidy up the stale card: deletion *does* carry a 48-hour limit
 * and would fail on exactly the old cards that need healing. The stale card is
 * simply left behind, superseded.
 *
 * Returns the new set of card addresses, or null when nothing changed.
 */
export async function editCards(env, cards, { text, reply_markup }) {
  const token = tokenFor(env);
  if (!token || !Array.isArray(cards) || !cards.length) return null;

  const next = [];
  let changed = false;

  for (const card of cards) {
    const body = await call(token, 'editMessageText', {
      chat_id: card.chat, message_id: card.mid,
      text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup,
    });

    if (body.ok) { next.push(card); continue; }

    // Identical content is not a failure — Telegram just declines to rewrite.
    if (/message is not modified/i.test(body.description || '')) { next.push(card); continue; }

    // Anything else: the card is unreachable. Post a fresh one and move on.
    const replacement = await call(token, 'sendMessage', {
      chat_id: card.chat, text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup,
    });
    if (replacement.ok) {
      next.push({ chat: card.chat, mid: replacement.result.message_id });
      changed = true;
    } else {
      next.push(card); // keep the address; try again next time rather than forget it
    }
  }
  return changed ? next : null;
}

/** Stop the button spinning, with a short toast. Best-effort. */
export async function answerCallback(env, id, text) {
  const token = tokenFor(env);
  if (!token || !id) return;
  await call(token, 'answerCallbackQuery', {
    callback_query_id: id, text: text || '', show_alert: false,
  });
}

/** Register the webhook. Used by the one-off setup endpoint, not at runtime. */
export async function setWebhook(env, url, secret) {
  return call(tokenFor(env), 'setWebhook', {
    url,
    secret_token: secret,
    // Only what the board needs. Fewer update types means less to validate and
    // less traffic hitting the endpoint.
    allowed_updates: ['callback_query', 'message'],
    drop_pending_updates: true,
  });
}

export async function getMe(env) {
  return call(tokenFor(env), 'getMe', {});
}
