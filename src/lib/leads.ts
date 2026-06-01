// Lead delivery — one place both the projection form (React island) and the
// contact form (vanilla script) route through. Prefers Web3Forms (emails the
// owner, no backend needed); falls back to a custom endpoint; degrades to a
// graceful no-op so the visitor always gets a clean success when nothing is
// wired yet. See `site.forms` in src/config/site.ts.
//
// Every lead is automatically enriched with a "lead intelligence" block —
// submission context (page, referrer, UTM, time), device/browser, and IP +
// approximate location — so the owner gets the fullest possible picture of who
// submitted. Enrichment is best-effort: it never blocks or fails the send.
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

/** snake_case / kebab-case → "Title Case" so email labels read cleanly. */
function humanizeKey(k: string): string {
  return k
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/^Utm /, 'UTM ')
    .trim();
}

function relabel(obj: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) out[humanizeKey(k)] = v;
  return out;
}

// ── Device / browser parsing (light, label-only) ──────────────────────────
function deviceType(ua: string): string {
  if (/\biPad\b|Tablet|Nexus 7|Nexus 10/i.test(ua)) return 'Tablet';
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(ua)) return 'Mobile';
  if (/Android/i.test(ua)) return 'Mobile';
  return 'Desktop';
}
function browserName(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\/|Opera/.test(ua)) return 'Opera';
  if (/SamsungBrowser/.test(ua)) return 'Samsung Internet';
  if (/CriOS/.test(ua)) return 'Chrome (iOS)';
  if (/FxiOS/.test(ua)) return 'Firefox (iOS)';
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Version\/.*Safari/.test(ua)) return 'Safari';
  return 'Other';
}
function osName(ua: string): string {
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Android ([\d.]+)/.test(ua)) return `Android ${RegExp.$1}`;
  if (/Android/.test(ua)) return 'Android';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Other';
}

/** fetch with an abort timeout so a slow geo API never hangs the submit. */
async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
  } finally {
    clearTimeout(t);
  }
}

/**
 * IP + approximate location. Primary: ipwho.is (free, no key, rich). Fallback:
 * Cloudflare same-origin /cdn-cgi/trace (always available on Pages — IP +
 * country). Returns {} on total failure; never throws.
 */
async function geoLookup(): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    const r = await fetchWithTimeout('https://ipwho.is/', 3000);
    const j: any = await r.json();
    if (j && j.success !== false && j.ip) {
      out['IP address'] = String(j.ip);
      const place = [j.city, j.region, j.country].filter(Boolean).join(', ');
      if (place) out['Approx. location'] = `${place} (IP-based)`;
      if (j.postal) out['Postal code (IP)'] = String(j.postal);
      if (j.latitude && j.longitude) out['Coordinates (approx)'] = `${j.latitude}, ${j.longitude}`;
      const net = j.connection?.isp || j.connection?.org || j.connection?.domain;
      if (net) out['Network / ISP'] = String(net);
      if (j.timezone?.id) out['IP timezone'] = String(j.timezone.id);
      return out;
    }
  } catch {
    /* fall through to Cloudflare trace */
  }
  try {
    const r = await fetchWithTimeout('/cdn-cgi/trace', 2000);
    const txt = await r.text();
    const map: Record<string, string> = {};
    for (const line of txt.trim().split('\n')) {
      const i = line.indexOf('=');
      if (i > 0) map[line.slice(0, i)] = line.slice(i + 1);
    }
    if (map.ip) out['IP address'] = map.ip;
    if (map.loc) out['Approx. location'] = `${map.loc} (country, IP-based)`;
  } catch {
    /* give up silently — lead still sends */
  }
  return out;
}

/**
 * Build the lead-intelligence block: submission context + device + location.
 * Browser-only; returns {} during SSR/build. Every section is independently
 * guarded so one failure never loses the rest.
 */
async function collectLeadIntel(): Promise<Record<string, string>> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return {};
  const out: Record<string, string> = {};

  // Submission context
  try {
    const now = new Date();
    out['Submitted (their local time)'] = now.toLocaleString('en-US', { timeZoneName: 'short' });
    out['Submitted (UTC)'] = now.toISOString();
    out['Submitted from page'] = window.location.href;
    if (document.referrer) out['Referrer'] = document.referrer;
    const params = new URLSearchParams(window.location.search);
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
      const v = params.get(k);
      if (v) out[humanizeKey(k)] = v;
    }
  } catch {
    /* ignore */
  }

  // Device / browser
  try {
    const ua = navigator.userAgent;
    out['Device'] = deviceType(ua);
    out['Browser'] = browserName(ua);
    out['Operating system'] = osName(ua);
    if (typeof screen !== 'undefined') {
      const dpr = window.devicePixelRatio && window.devicePixelRatio !== 1 ? ` @${window.devicePixelRatio}x` : '';
      out['Screen'] = `${screen.width}×${screen.height}${dpr}`;
    }
    out['Browser window'] = `${window.innerWidth}×${window.innerHeight}`;
    out['Language'] = navigator.language || navigator.languages?.[0] || '';
    try {
      out['Device timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      /* ignore */
    }
    out['User agent'] = ua;
  } catch {
    /* ignore */
  }

  // IP + approximate location (network)
  try {
    Object.assign(out, await geoLookup());
  } catch {
    /* ignore */
  }

  return clean(out);
}

/**
 * Send a lead.
 * - Web3Forms key set → POST to Web3Forms (owner gets an enriched email).
 * - Else custom endpoint set → POST JSON there (machine keys + nested meta).
 * - Else → resolve { ok: true, skipped: true } (nothing sent; graceful).
 * Network/parse failures resolve { ok: false } so the caller can show a
 * "call us" fallback rather than swallowing the error.
 */
export async function sendLead(
  fields: Record<string, FieldValue>,
  opts: { subject: string; formName: string },
): Promise<LeadResult> {
  const key = site.forms.web3formsKey;
  const cleaned = clean(fields);
  const email = cleaned.email; // capture before relabeling for reply-to
  const intel = await collectLeadIntel(); // best-effort; never throws

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
          ...(email ? { replyto: email } : {}),
          // Lead's own details first (pretty labels), then the intelligence block.
          ...relabel(cleaned),
          ...intel,
        }),
      });
      const json = await res.json().catch(() => null);
      return { ok: Boolean(json?.success ?? res.ok) };
    }

    if (site.forms.projectionEndpoint) {
      const res = await fetch(site.forms.projectionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // Custom endpoint gets machine keys + meta as a nested object.
        body: JSON.stringify({ ...cleaned, form: opts.formName, meta: intel }),
      });
      return { ok: res.ok };
    }

    return { ok: true, skipped: true };
  } catch {
    return { ok: false };
  }
}
