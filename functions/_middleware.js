/**
 * Cloudflare Pages middleware — runs on every request before static assets and
 * other Functions.
 *
 *  1. Canonical host: 301 redirect www → apex (non-www), preserving path+query.
 *     (public/_redirects can't do this — it matches by path, not hostname.)
 *  2. Private dashboard gate: HTTP Basic Auth on /boroto. Credentials come from
 *     encrypted environment vars — BOROTO_USER (defaults to "admin") and
 *     BOROTO_PASS (a secret set with `wrangler pages secret put BOROTO_PASS`).
 *     Fails CLOSED: if no password is configured the page is never served.
 *     No credential is ever stored in this repo.
 */

function unauthorized() {
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ATLStay", charset="UTF-8"' },
  });
}

// Constant-time comparison — avoids leaking how much of the value matched via
// response timing. Returns false fast only on a length mismatch.
function safeEqual(a, b) {
  const ab = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. www → apex (301)
  if (url.hostname === 'www.atlstay.com') {
    url.hostname = 'atlstay.com';
    return Response.redirect(url.toString(), 301);
  }

  // 2. The dashboard moved from /dashboard to /boroto. Bounce any lingering
  //    links — and stale edge-cached copies of the old page — to the new,
  //    auth-gated location. Runs in the Function, ahead of asset serving.
  if (url.pathname === '/dashboard' || url.pathname.startsWith('/dashboard/')) {
    return Response.redirect(new URL('/boroto/', url.origin).toString(), 301);
  }

  // 3. Basic Auth gate for the private dashboard at /boroto
  if (url.pathname === '/boroto' || url.pathname.startsWith('/boroto/')) {
    const expectedPass = context.env.BOROTO_PASS;
    if (!expectedPass) return unauthorized(); // fail closed — never expose unprotected
    const expectedUser = context.env.BOROTO_USER || 'admin';

    const header = context.request.headers.get('Authorization') || '';
    const [scheme, encoded] = header.split(' ');
    if (scheme !== 'Basic' || !encoded) return unauthorized();

    let decoded;
    try {
      decoded = atob(encoded);
    } catch {
      return unauthorized();
    }
    const sep = decoded.indexOf(':');
    if (sep === -1) return unauthorized();
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);

    // Evaluate both comparisons before deciding (no short-circuit on user).
    const userOk = safeEqual(user, expectedUser);
    const passOk = safeEqual(pass, expectedPass);
    if (!userOk || !passOk) return unauthorized();
  }

  return context.next();
}
