/* Lead Desk API — /boroto/api
 *
 * Deliberately lives UNDER /boroto so it inherits the signed-session gate in
 * functions/_middleware.js. These responses contain customer names, phone
 * numbers and email addresses; they must never be reachable unauthenticated.
 * Do not move this to /api/.
 */

const STATUSES = ['new', 'proposal_sent', 'won', 'lost'];
const KINDS = ['lead', 'message'];

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

    return json({ leads: (rows.results || []).map(hydrate) });
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
    // Manual entry — for keying in the backlog that only exists in email.
    if (body.action === 'create') {
      const id = crypto.randomUUID();
      const lead = {
        'First Name': body.name || '', Email: body.email || '', Phone: body.phone || '',
        'Property Address': body.address || '', 'Service Interest': body.service_interest || '',
        Notes: body.notes || '',
      };
      const kind = KINDS.includes(body.kind) ? body.kind : 'lead';
      if (body.message) lead.Message = body.message;
      await env.DB.prepare(
        `INSERT INTO leads (id, received_at, brand, form_name, kind, service_interest,
                            name, email, phone, address, page_url, raw_lead, raw_meta,
                            status, notes, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,'',?,'{}','new',?,?)`,
      ).bind(
        id, body.received_at || now, body.brand || 'ATLStay', 'Added by hand', kind,
        body.service_interest || '', body.name || '', body.email || '', body.phone || '',
        body.address || '', JSON.stringify(lead), body.notes || '', now,
      ).run();
      return json({ ok: true, id });
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

    // Move between the two inboxes. Contact-page submissions land in Messages;
    // when one turns out to be a genuine enquiry it becomes a lead (and the
    // reverse, so neither inbox is a dead end).
    if (body.action === 'move') {
      if (!KINDS.includes(body.kind)) return json({ error: 'Bad kind' }, 400);
      await env.DB.prepare('UPDATE leads SET kind = ?, updated_at = ? WHERE id = ?')
        .bind(body.kind, now, id).run();
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

    await env.DB.prepare(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`).bind(...binds).run();
    return json({ ok: true });
  } catch (err) {
    return json({ error: String(err?.message || err) }, 500);
  }
}

/** Parse the stored JSON blobs so the client gets real objects. */
function hydrate(row) {
  const safe = (s) => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
  return { ...row, raw_lead: safe(row.raw_lead), raw_meta: safe(row.raw_meta) };
}
