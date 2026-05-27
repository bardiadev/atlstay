// Lead delivery — one place both the projection form (React island) and the
// contact form (vanilla script) route through. Prefers Web3Forms (emails the
// owner, no backend needed); falls back to a custom endpoint; degrades to a
// graceful no-op so the visitor always gets a clean success when nothing is
// wired yet. See `site.forms` in src/config/site.ts.
import { site } from '../config/site';

export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/** True once lead delivery is actually configured (key or custom endpoint). */
export function leadsEnabled(): boolean {
  return Boolean(site.forms.web3formsKey || site.forms.projectionEndpoint);
}

export interface LeadResult {
  ok: boolean;
  /** True when no destination is configured — submission was a graceful no-op. */
  skipped?: boolean;
}

type FieldValue = string | number | boolean | string[] | undefined | null;

/** Flatten for email: join arrays, drop empties, stringify scalars. */
function clean(fields: Record<string, FieldValue>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v == null) continue;
    const s = Array.isArray(v) ? v.filter(Boolean).join(', ') : String(v).trim();
    if (s) out[k] = s;
  }
  return out;
}

/**
 * Send a lead.
 * - Web3Forms key set → POST to Web3Forms (owner gets an email). Returns the
 *   provider's success flag.
 * - Else custom endpoint set → POST JSON there.
 * - Else → resolve { ok: true, skipped: true } (nothing sent; graceful).
 * Network/parse failures resolve { ok: false } so the caller can show a
 * "call us" fallback rather than swallowing the error.
 */
export async function sendLead(
  fields: Record<string, FieldValue>,
  opts: { subject: string; formName: string },
): Promise<LeadResult> {
  const key = site.forms.web3formsKey;
  const payload = clean(fields);

  try {
    if (key) {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: opts.subject,
          from_name: opts.formName,
          // Reply-To the lead's email when present so the owner can reply directly.
          ...(payload.email ? { replyto: payload.email } : {}),
          ...payload,
        }),
      });
      const json = await res.json().catch(() => null);
      return { ok: Boolean(json?.success ?? res.ok) };
    }

    if (site.forms.projectionEndpoint) {
      const res = await fetch(site.forms.projectionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      return { ok: res.ok };
    }

    return { ok: true, skipped: true };
  } catch {
    return { ok: false };
  }
}
