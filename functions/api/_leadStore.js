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

/** Best-effort insert. Returns the new lead id, or '' on any failure. */
export async function storeLead(env, { formName, lead, meta, subject }) {
  try {
    if (!env || !env.DB) return ''; // not bound — nothing to do
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const pick = (obj, re) => {
      for (const [k, v] of Object.entries(obj || {})) {
        if (re.test(k) && String(v ?? '').trim()) return String(v).trim();
      }
      return '';
    };

    const page = pick(meta, /submitted from page/i);
    // SSMProperty posts here too — label by the page that submitted it.
    const brand = /ssmproperty\.com/i.test(page) ? 'SSMProperty' : 'ATLStay';

    await env.DB.prepare(
      `INSERT INTO leads
        (id, received_at, brand, form_name, service_interest,
         name, email, phone, address, page_url,
         raw_lead, raw_meta, status, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'new',?)`,
    )
      .bind(
        id,
        now,
        brand,
        formName || '',
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

    return id;
  } catch {
    return ''; // never surface a storage problem to the submitter
  }
}
