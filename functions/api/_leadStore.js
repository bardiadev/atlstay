/* Lead Desk — D1 persistence for /api/lead.
 *
 * SAFETY CONTRACT (do not weaken):
 * /api/lead is the ONLY lead path for two live revenue sites (atlstay.com and
 * ssmproperty.com, which posts here cross-origin). Storage is an ADDITION to
 * that path, never a dependency of it. Therefore:
 *   - every function here swallows its own errors and returns, never throws;
 *   - a missing DB binding is a silent no-op, not an error;
 *   - the caller must not await this before delivering email/Telegram.
 * If D1 is down, broken, or unbound, the owner must still get the lead.
 */

/**
 * Classify a submission. The Lead Desk keeps two inboxes: real enquiries about
 * managing a property, and general messages sent from the contact page (vendor
 * pitches, questions, recruiters). They need different handling, so they are
 * separated on arrival and can be moved between inboxes from the dashboard.
 */
export function kindOf(formName) {
  return /contact/i.test(String(formName || '')) ? 'message' : 'lead';
}

/**
 * Best-effort insert. Returns { id, seq } — the id is '' and seq null on any
 * failure, so a caller can always destructure safely. The card needs BOTH: the
 * id to attach working buttons, and seq to show the reference number.
 *
 * `receivedAt` backdates the row and is only ever supplied by the key-gated
 * import path in lead.js — a normal submission always stamps "now".
 *
 * NOTE: the INSERT below must keep its column list, its placeholders and its
 * bindings in lockstep. D1 rejects a mismatch, and the catch here turns that
 * into a silent total storage outage that looks exactly like a working lead.
 * test/leadstore.test.mjs enforces the balance — keep it passing.
 */
export async function storeLead(env, { formName, lead, meta, subject, receivedAt }) {
  try {
    if (!env || !env.DB) return { id: '', seq: null }; // not bound — nothing to do
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const stamp = receivedAt || now;

    const pick = (obj, re) => {
      for (const [k, v] of Object.entries(obj || {})) {
        if (re.test(k) && String(v ?? '').trim()) return String(v).trim();
      }
      return '';
    };

    /* A permanent reference number. AUTOINCREMENT on its own table guarantees
     * the number is never reused, even after leads are deleted — so "#0007"
     * always means the same enquiry, forever. Best-effort: a lead without a
     * number is still a lead, so failure here must not abort the insert. */
    let seq = null;
    try {
      const r = await env.DB.prepare('INSERT INTO lead_seq DEFAULT VALUES').run();
      seq = r?.meta?.last_row_id ?? null;
    } catch { /* keep going without a number */ }

    const page = pick(meta, /submitted from page/i);
    // SSMProperty posts here too — label by the page that submitted it.
    const brand = /ssmproperty\.com/i.test(page) ? 'SSMProperty' : 'ATLStay';

    await env.DB.prepare(
      `INSERT INTO leads
        (id, received_at, brand, form_name, kind, seq, service_interest,
         name, email, phone, address, page_url,
         raw_lead, raw_meta, status, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,'new',?)`,
    )
      .bind(
        id,
        stamp,
        brand,
        formName || '',
        kindOf(formName),
        seq,
        pick(lead, /service interest/i),
        pick(lead, /name/i),
        pick(lead, /email/i),
        pick(lead, /phone/i),
        pick(lead, /address/i),
        page,
        JSON.stringify(lead || {}),
        JSON.stringify(meta || {}),
        now,
      )
      .run();

    return { id, seq };
  } catch {
    // Never surface a storage problem to the submitter — but never pretend it
    // succeeded either: an empty id is what tells the caller to ship a card
    // without buttons rather than with dead ones.
    return { id: '', seq: null };
  }
}
