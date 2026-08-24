/* Lead Desk API — /boroto/api
 *
 * Deliberately lives UNDER /boroto so it inherits the Basic Auth gate in
 * functions/_middleware.js. These responses contain customer names, phone
 * numbers and email addresses; they must never be reachable unauthenticated.
 * Do not move this to /api/.
 */

const STATUSES = ['new', 'proposal_sent', 'won', 'lost'];

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

    // ── list ──
    const status = url.searchParams.get('status') || '';
    const q = (url.searchParams.get('q') || '').trim();

    const counts = await env.DB.prepare(
      'SELECT status, COUNT(*) AS n FROM leads GROUP BY status',
    ).all();

    // "Gone quiet" = proposal sent, nothing since, more than 4 days ago.
    const quiet = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM leads
        WHERE status = 'proposal_sent'
          AND proposal_sent_at IS NOT NULL
          AND julianday('now') - julianday(proposal_sent_at) > 4`,
    ).first();

    let sql = `SELECT id, received_at, brand, service_interest, name, email, phone,
                      address, status, proposal_sent_at, first_viewed_at
                 FROM leads`;
    const binds = [];
    const where = [];
    if (status && STATUSES.includes(status)) { where.push('status = ?'); binds.push(status); }
    if (status === 'quiet') {
      where.push(`status = 'proposal_sent' AND julianday('now') - julianday(proposal_sent_at) > 4`);
    }
    if (q) {
      where.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR address LIKE ?)');
      const like = `%${q}%`;
      binds.push(like, like, like, like);
    }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' ORDER BY received_at DESC LIMIT 300';

    const rows = await env.DB.prepare(sql).bind(...binds).all();

    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0]));
    for (const r of counts.results || []) if (r.status in byStatus) byStatus[r.status] = r.n;

    return json({ counts: { ...byStatus, quiet: quiet?.n || 0 }, leads: rows.results || [] });
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
      await env.DB.prepare(
        `INSERT INTO leads (id, received_at, brand, form_name, service_interest,
                            name, email, phone, address, page_url, raw_lead, raw_meta,
                            status, notes, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,'',?,'{}','new',?,?)`,
      ).bind(
        id, body.received_at || now, body.brand || 'ATLStay', 'Added by hand',
        body.service_interest || '', body.name || '', body.email || '', body.phone || '',
        body.address || '', JSON.stringify(lead), body.notes || '', now,
      ).run();
      return json({ ok: true, id });
    }

    const id = body.id;
    if (!id) return json({ error: 'Missing id' }, 400);

    const sets = [];
    const binds = [];

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
