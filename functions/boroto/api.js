/* Lead Desk API — /boroto/api
 *
 * Deliberately lives UNDER /boroto so it inherits the signed-session gate in
 * functions/_middleware.js. These responses contain customer names, phone
 * numbers and email addresses; they must never be reachable unauthenticated.
 * Do not move this to /api/.
 */

import { addEvent, editNote, eventsForAll, isAction, statusFor } from '../api/_leadEvents.js';
import { refreshCard, postCard, announce } from '../api/_board.js';

const STATUSES = ['new', 'proposal_sent', 'won', 'lost'];
const KINDS = ['lead', 'message'];

/* Dashboard actions are attributed to the owner. Partners act from Telegram,
   where their own name comes with the button press. */
const OWNER = 'Brandon';

/* Which activity event a dashboard status change corresponds to, so the group's
   card reads the same whether the change came from Telegram or the Lead Desk. */
const STATUS_EVENT = { proposal_sent: 'proposal', won: 'won', lost: 'lost' };

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export async function onRequestGet(context) {
  const { env, request } = context;
  if (!env.DB) return json({ error: 'Database not bound' }, 503);
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'list';

  try {
    if (action === 'get') {
      const id = url.searchParams.get('id') || '';
      const row = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first();
      if (!row) return json({ error: 'Not found' }, 404);

      // Stamp first_viewed_at once, so the timeline can show when it was seen.
      if (!row.first_viewed_at) {
        const now = new Date().toISOString();
        await env.DB.prepare('UPDATE leads SET first_viewed_at = ? WHERE id = ?').bind(now, id).run();
        row.first_viewed_at = now;
      }

      // Duplicates: same person, earlier or later submission.
      const dupes = await env.DB.prepare(
        `SELECT id, received_at, service_interest FROM leads
          WHERE id != ? AND ((email != '' AND email = ?) OR (phone != '' AND phone = ?))
          ORDER BY received_at DESC LIMIT 10`,
      )
        .bind(id, row.email || '', row.phone || '')
        .all();

      return json({ lead: hydrate(row), duplicates: dupes.results || [] });
    }

    // ── all ──
    // Everything in ONE request, full payloads included. At this volume the
    // whole dataset is a few hundred KB, and holding it in memory means
    // filtering, searching and opening a lead are instant — the previous
    // design re-queried the database on every click, which is what made the
    // panel feel laggy.
    const rows = await env.DB.prepare(
      `SELECT * FROM leads ORDER BY received_at DESC LIMIT 1000`,
    ).all();

    // One extra query for the whole activity history rather than N per lead —
    // the panel holds the entire dataset in memory and filters locally.
    const events = await eventsForAll(env);
    return json({
      leads: (rows.results || []).map((r) => ({ ...hydrate(r), events: events[r.id] || [] })),
    });
  } catch (err) {
    return json({ error: String(err?.message || err) }, 500);
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  if (!env.DB) return json({ error: 'Database not bound' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const now = new Date().toISOString();

  try {
    // Manual entry — for keying in the backlog that only exists in email, a
    // phone call, or a referral. Built to match a real submission in every way
    // that matters: it claims a permanent reference number the same way
    // storeLead() does, and — unless explicitly told not to — posts a Telegram
    // card the same way /api/lead does, so a hand-entered lead is not a
    // second-class citizen next to one the website captured itself.
    if (body.action === 'create') {
      const name = String(body.name || '').trim();
      if (!name) return json({ error: 'Name is required' }, 400);

      const id = crypto.randomUUID();
      const brand = body.brand === 'SSMProperty' ? 'SSMProperty' : 'ATLStay';
      const kind = KINDS.includes(body.kind) ? body.kind : 'lead';
      // "Where it came from" — free text (phone call, referral, another site's
      // contact page, an old email) — reuses page_url, the same field an
      // organic submission's source page lands in, so it renders identically
      // on the card and in the dashboard.
      const source = String(body.source || '').trim();
      const receivedAt = body.received_at || now;

      const lead = {
        Name: name, Email: body.email || '', Phone: body.phone || '',
        'Property Address': body.address || '', 'Service Interest': body.service_interest || '',
      };
      if (body.message) lead.Message = body.message;
      /* Internal notes deliberately DO NOT go into raw_lead. raw_lead is what
         the Telegram card renders field-by-field, and the form promises in
         writing that notes are "Dashboard only — never sent to Telegram". They
         live only in the `notes` column, which the card never reads. */

      // Best-effort reference number — same counter storeLead() uses. A failed
      // claim must never block the lead itself from being saved.
      let seq = null;
      try {
        const r = await env.DB.prepare('INSERT INTO lead_seq DEFAULT VALUES').run();
        seq = r?.meta?.last_row_id ?? null;
      } catch { /* keep going without a number */ }

      await env.DB.prepare(
        `INSERT INTO leads (id, received_at, brand, form_name, kind, seq, service_interest,
                            name, email, phone, address, page_url, raw_lead, raw_meta,
                            status, notes, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'{}','new',?,?)`,
      ).bind(
        id, receivedAt, brand, 'Added by hand', kind, seq,
        body.service_interest || '', name, body.email || '', body.phone || '',
        body.address || '', source, JSON.stringify(lead), body.notes || '', now,
      ).run();

      let posted = false;
      if (body.send_telegram !== false) {
        const cards = await postCard(env, {
          id, kind, brand, status: 'new', seq, email_ok: null,
          received_at: receivedAt, page_url: source, raw_lead: lead,
        });
        posted = cards.length > 0;
      }

      return json({ ok: true, id, seq, telegram: posted });
    }

    const id = body.id;
    if (!id) return json({ error: 'Missing id' }, 400);

    // Delete. Real deletion rather than a soft flag: this table is the owner's
    // own workspace, the only rows removed are ones he explicitly chooses, and
    // a hidden-but-present lead would undermine the counts he works from.
    if (body.action === 'delete') {
      await env.DB.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();
      return json({ ok: true, deleted: id });
    }

    /* Log an action from the dashboard. Until now the dashboard could only
     * change status, so "I called them" had to be done from Telegram. Both
     * surfaces can now record the same things, into the same history. */
    if (body.action === 'log') {
      const ev = String(body.event || '');
      if (!isAction(ev)) return json({ error: 'Bad action' }, 400);
      const wanted = statusFor(ev);
      // Read the status BEFORE writing it: re-marking a lead that is already
      // won is not news, and announcing it would ping the whole group twice.
      const before = wanted ? await currentStatus(env, id) : '';
      await addEvent(env, {
        leadId: id, action: ev, actor: OWNER, source: 'dashboard',
        note: ev === 'note' ? String(body.note || '') : '',
      });
      // A milestone logged here moves the pipeline too, exactly as it would
      // from a button press in the group.
      if (wanted) {
        await env.DB.prepare(
          `UPDATE leads SET status = ?, updated_at = ?,
             proposal_sent_at = CASE WHEN ? = 'proposal_sent'
               THEN COALESCE(proposal_sent_at, ?) ELSE proposal_sent_at END
            WHERE id = ?`,
        ).bind(wanted, now, wanted, now, id).run();
      }
      await refreshCard(env, id);
      // Editing the card notifies nobody, so a milestone gets its own message.
      if (wanted && before !== wanted) await announce(env, id, ev, OWNER);
      return json({ ok: true, status: wanted || undefined });
    }

    /* Correct the wording of a note already written. Only the text changes —
       the author, the time it was written and its place in the history all
       stand, and the card is redrawn so the group sees the correction. There
       is no announcement: fixing a sentence is not a milestone. */
    if (body.action === 'edit_note') {
      const eventId = String(body.event_id || '');
      const note = String(body.note || '').trim();
      if (!eventId) return json({ error: 'Missing event_id' }, 400);
      // Emptying a note would erase what somebody wrote while leaving a hollow
      // entry in the history. Deleting a note is a different act, not this one.
      if (!note) return json({ error: 'A note cannot be emptied' }, 400);

      const done = await editNote(env, { leadId: id, eventId, note });
      if (!done) return json({ error: 'That note no longer exists' }, 404);
      await refreshCard(env, id);
      return json({ ok: true });
    }

    // Move between the two inboxes. Contact-page submissions land in Messages;
    // when one turns out to be a genuine enquiry it becomes a lead (and the
    // reverse, so neither inbox is a dead end).
    if (body.action === 'move') {
      if (!KINDS.includes(body.kind)) return json({ error: 'Bad kind' }, 400);
      await env.DB.prepare('UPDATE leads SET kind = ?, updated_at = ? WHERE id = ?')
        .bind(body.kind, now, id).run();
      // The two inboxes carry different buttons, so the card has to be redrawn.
      await refreshCard(env, id);
      return json({ ok: true, kind: body.kind });
    }

    const sets = [];
    const binds = [];

    // The client stamps first-view optimistically and tells us once.
    if (body.viewed) { sets.push('first_viewed_at = COALESCE(first_viewed_at, ?)'); binds.push(now); }

    if (body.status) {
      if (!STATUSES.includes(body.status)) return json({ error: 'Bad status' }, 400);
      sets.push('status = ?'); binds.push(body.status);
      // Stamp when the proposal went out, the first time it's marked sent.
      if (body.status === 'proposal_sent') {
        sets.push('proposal_sent_at = COALESCE(proposal_sent_at, ?)'); binds.push(now);
      }
    }
    if (typeof body.notes === 'string') { sets.push('notes = ?'); binds.push(body.notes); }
    if (typeof body.proposal_sent_to === 'string') {
      sets.push('proposal_sent_to = ?'); binds.push(body.proposal_sent_to);
    }
    if (!sets.length) return json({ error: 'Nothing to update' }, 400);

    sets.push('updated_at = ?'); binds.push(now);
    binds.push(id);

    // Same reason as the 'log' path: what the status was before decides whether
    // this is news worth announcing, so it has to be read before the write.
    const before = body.status ? await currentStatus(env, id) : '';

    await env.DB.prepare(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`).bind(...binds).run();

    /* A status change here is the same kind of fact as a button press in the
       group, so it goes into the same history and rewrites the same card.
       Merely opening a lead or editing a note is not activity worth announcing.

       EVERY status change redraws the card, not only the milestones. Correcting
       one back to New used to update the database and leave the group's card
       still reading PROPOSAL SENT — the two surfaces disagreeing, which is the
       exact failure this whole design exists to prevent. */
    if (body.status) {
      if (STATUS_EVENT[body.status]) {
        await addEvent(env, {
          leadId: id, action: STATUS_EVENT[body.status], actor: OWNER, source: 'dashboard',
        });
      }
      // Editing a Telegram message sends no notification, so the group updates
      // silently. Awaited so the card is true before the panel re-reads.
      await refreshCard(env, id);
      // ...which is exactly why a milestone also gets its own short message.
      if (STATUS_EVENT[body.status] && before !== body.status) {
        await announce(env, id, STATUS_EVENT[body.status], OWNER);
      }
    }
    return json({ ok: true });
  } catch (err) {
    return json({ error: String(err?.message || err) }, 500);
  }
}

/**
 * The lead's status right now, for deciding whether a change is actually news.
 *
 * Returns '' if it cannot be read, which reads as "different from whatever we
 * are about to set" — erring towards announcing once too often rather than
 * swallowing a real milestone. Never throws: this must not be able to fail a
 * status update.
 */
async function currentStatus(env, id) {
  try {
    const r = await env.DB.prepare('SELECT status FROM leads WHERE id = ?').bind(id).first();
    return r?.status || '';
  } catch {
    return '';
  }
}

/** Parse the stored JSON blobs so the client gets real objects. */
function hydrate(row) {
  const safe = (s) => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
  return { ...row, raw_lead: safe(row.raw_lead), raw_meta: safe(row.raw_meta) };
}
