/* Lead activity — the append-only history behind the Telegram cards.
 *
 * Every action anyone takes on a lead becomes one immutable row. Nothing here
 * ever updates or deletes an event, and that is deliberate: several partners
 * can tap buttons on the same card at the same moment, and an INSERT is atomic
 * where a read-modify-write on a JSON blob would silently lose whichever write
 * landed second.
 *
 * SAFETY CONTRACT (same as _leadStore.js): /api/lead serves two live revenue
 * sites. Recording activity is an ADDITION to that path, never a dependency of
 * it — every function swallows its own errors, a missing DB binding is a silent
 * no-op, and nothing here may ever throw into a lead submission.
 */

/** What each action does to the lead's pipeline status. */
const ACTION_STATUS = {
  proposal: 'proposal_sent',
  won: 'won',
  lost: 'lost',
};

/** Human labels + icons for the card's activity trail. */
export const ACTIONS = {
  created:      { icon: '✨', verb: 'came in',            kind: 'system' },
  called:       { icon: '📞', verb: 'called',             kind: 'touch' },
  texted:       { icon: '💬', verb: 'texted',             kind: 'touch' },
  emailed:      { icon: '✉️', verb: 'emailed',            kind: 'touch' },
  proposal:     { icon: '📤', verb: 'sent the proposal',  kind: 'milestone' },
  won:          { icon: '✅', verb: 'marked it won',      kind: 'milestone' },
  lost:         { icon: '❌', verb: 'marked it lost',     kind: 'milestone' },
  replied:      { icon: '↩️', verb: 'replied',            kind: 'touch' },
  not_relevant: { icon: '🚫', verb: 'marked it not relevant', kind: 'touch' },
  moved:        { icon: '📥', verb: 'moved it to Leads',  kind: 'touch' },
  note:         { icon: '📝', verb: 'noted',              kind: 'note' },
};

export const isAction = (a) => Object.prototype.hasOwnProperty.call(ACTIONS, a);

/** The status this action implies, or '' when it only logs. */
export function statusFor(action) {
  return ACTION_STATUS[action] || '';
}

/**
 * Append one event. Returns true on success, false on any failure — never
 * throws, so a broken history can't break a lead.
 */
export async function addEvent(env, { leadId, action, actor, actorTgId, note, source }) {
  try {
    if (!env || !env.DB || !leadId || !isAction(action)) return false;
    await env.DB.prepare(
      `INSERT INTO lead_events (id, lead_id, action, actor, actor_tg_id, note, source, created_at)
       VALUES (?,?,?,?,?,?,?,?)`,
    ).bind(
      crypto.randomUUID(),
      leadId,
      action,
      String(actor || 'Someone').slice(0, 80),
      actorTgId ? String(actorTgId) : null,
      // Notes are the one thing people write at length — a call summary, a
      // pasted text message. 500 was close enough to real notes to start
      // silently clipping them, so store the whole thing; the Telegram card
      // shows a preview and the dashboard shows all of it.
      note ? String(note).slice(0, 4000) : null,
      source || 'system',
      new Date().toISOString(),
    ).run();
    return true;
  } catch {
    return false;
  }
}

/** Events for one lead, oldest first. Returns [] on any failure. */
export async function eventsFor(env, leadId) {
  try {
    if (!env || !env.DB || !leadId) return [];
    const r = await env.DB.prepare(
      `SELECT id, action, actor, note, source, created_at, edited_at FROM lead_events
        WHERE lead_id = ? ORDER BY created_at ASC`,
    ).bind(leadId).all();
    return r.results || [];
  } catch {
    return [];
  }
}

/**
 * Correct the text of one note.
 *
 * The single exception to this table being append-only, and a deliberate one:
 * a note is prose somebody typed, and prose has typos. It is an UPDATE of one
 * row addressed by primary key, so none of the lost-update trouble that ruled
 * out a JSON blob applies. `lead_id` is in the WHERE clause as well as the id,
 * so a note can only ever be edited through the lead it belongs to, and
 * `action = 'note'` means a button press can never be rewritten into prose.
 *
 * Returns false if nothing matched, so a caller can tell a miss from a success.
 */
export async function editNote(env, { leadId, eventId, note }) {
  try {
    if (!env || !env.DB || !leadId || !eventId) return false;
    const r = await env.DB.prepare(
      `UPDATE lead_events SET note = ?, edited_at = ?
        WHERE id = ? AND lead_id = ? AND action = 'note'`,
    ).bind(String(note || '').slice(0, 4000), new Date().toISOString(), eventId, leadId).run();
    // D1 reports rows changed; if it ever stops, assume success rather than
    // telling the operator their saved edit failed.
    return (r?.meta?.changes ?? 1) > 0;
  } catch {
    return false;
  }
}

/**
 * Events for many leads at once, as { leadId: [events] }. One query rather than
 * N, because the dashboard loads the whole dataset in a single request.
 */
export async function eventsForAll(env) {
  try {
    if (!env || !env.DB) return {};
    const r = await env.DB.prepare(
      `SELECT id, lead_id, action, actor, note, source, created_at, edited_at FROM lead_events
        ORDER BY created_at ASC`,
    ).all();
    const out = {};
    for (const row of r.results || []) {
      (out[row.lead_id] = out[row.lead_id] || []).push(row);
    }
    return out;
  } catch {
    return {};
  }
}
