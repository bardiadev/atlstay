/**
 * Cloudflare Pages middleware — runs on every request before static assets and
 * other Functions.
 *
 *  1. Canonical host: 301 redirect www → apex (non-www), preserving path+query.
 *     (public/_redirects can't do this — it matches by path, not hostname.)
 *  2. Private dashboard gate: a signed session cookie on /boroto, issued by a
 *     branded login form. Credentials come from
 *     encrypted environment vars — BOROTO_USER (defaults to "admin") and
 *     BOROTO_PASS (a secret set with `wrangler pages secret put BOROTO_PASS`).
 *     Fails CLOSED: if no password is configured the page is never served.
 *     No credential is ever stored in this repo.
 */

// 401 for the JSON API only. Deliberately WITHOUT a WWW-Authenticate header:
// sending one makes the browser throw up its native credential dialog, which is
// the ugly prompt the login page exists to replace. The panel watches for this
// status and redirects to the login page itself.
function unauthorized() {
  return new Response(JSON.stringify({ error: 'Session expired', signedOut: true }), {
    status: 401,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
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


/* ── Session cookie ───────────────────────────────────────────────────────────
 * The browser's Basic Auth prompt cannot be styled and cannot be signed out of.
 * A signed cookie replaces it with a real login page while keeping the same
 * fail-closed guarantee: no BOROTO_PASS, no access, no exceptions.
 * The cookie holds an expiry and an HMAC of it keyed on BOROTO_PASS — so it
 * cannot be forged without the secret, and changing the password invalidates
 * every existing session automatically. */
const SESSION_COOKIE = 'boroto_session';
const SESSION_DAYS = 30;

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function makeSession(secret) {
  const exp = Date.now() + SESSION_DAYS * 86400000;
  return `${exp}.${await hmac(secret, String(exp))}`;
}

async function sessionValid(secret, token) {
  if (!token) return false;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(secret, exp));
}

function readCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

function loginPage({ error = '', next = '/boroto/' } = {}) {
  return new Response(LOGIN_HTML.replace('{{ERROR}}',
      error ? `<p class="err" role="alert">${error}</p>` : '')
    .replace('{{NEXT}}', next.replace(/"/g, '&quot;')), {
    status: error ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

const LOGIN_HTML = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Sign in — ATLStay</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
 :root{--forest:#14342b;--brass:#c9a24b;--cream:#f7f4ec;--ink:#1a2420;--line:#e2e0d6;--muted:#6b7770}
 *{box-sizing:border-box}
 body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:24px;
      background:var(--forest);color:var(--ink);
      font:16px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
 .card{width:100%;max-width:400px;background:#fff;border-radius:16px;padding:40px 32px;
       box-shadow:0 18px 50px rgba(0,0,0,.28)}
 .mark{display:flex;align-items:center;gap:10px;margin-bottom:28px}
 .mark svg{width:28px;height:28px;flex:none}
 .mark b{font:600 20px/1 Georgia,'Times New Roman',serif;letter-spacing:-.01em;color:var(--forest)}
 h1{margin:0 0 6px;font:500 24px/1.2 Georgia,'Times New Roman',serif;color:var(--forest)}
 p.sub{margin:0 0 26px;color:var(--muted);font-size:14px}
 label{display:block;margin-bottom:6px;font-size:12px;font-weight:600;letter-spacing:.06em;
       text-transform:uppercase;color:var(--muted)}
 input{width:100%;padding:12px 14px;font-size:16px;color:var(--ink);
       border:1px solid var(--line);border-radius:10px;background:#fff;margin-bottom:18px}
 input:focus{outline:2px solid var(--brass);outline-offset:1px;border-color:var(--brass)}
 button{width:100%;padding:13px;font-size:15px;font-weight:600;color:var(--forest);
        background:var(--brass);border:0;border-radius:999px;cursor:pointer;
        transition:filter .2s ease}
 button:hover{filter:brightness(1.06)}
 button:focus-visible{outline:2px solid var(--forest);outline-offset:2px}
 .err{margin:0 0 18px;padding:10px 12px;border-radius:8px;font-size:14px;
      background:#fdeceb;color:#a3231b;border:1px solid #f5c6c2}
 .foot{margin-top:22px;text-align:center;font-size:12px;color:var(--muted)}
</style></head><body>
 <main class="card">
  <div class="mark">
   <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 3 4 27h6l6-12 6 12h6L16 3Z" fill="#14342b"/>
    <circle cx="16" cy="21" r="2.6" fill="#c9a24b"/></svg>
   <b>ATLStay</b>
  </div>
  <h1>Sign in</h1>
  <p class="sub">Private workspace. Leads and site tools.</p>
  {{ERROR}}
  <form method="POST" action="/boroto/login">
   <input type="hidden" name="next" value="{{NEXT}}">
   <label for="u">Username</label>
   <input id="u" name="username" autocomplete="username" autocapitalize="none" autofocus required>
   <label for="p">Password</label>
   <input id="p" name="password" type="password" autocomplete="current-password" required>
   <button type="submit">Sign in</button>
  </form>
  <p class="foot">Silverstone Management LLC</p>
 </main>
</body></html>`;

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

  // 3. Auth gate for the private dashboard at /boroto
  if (url.pathname === '/boroto' || url.pathname.startsWith('/boroto/')) {
    const expectedPass = context.env.BOROTO_PASS;
    if (!expectedPass) return unauthorized(); // fail closed — never expose unprotected
    const expectedUser = context.env.BOROTO_USER || 'admin';

    // Login form submission.
    if (url.pathname === '/boroto/login' && context.request.method === 'POST') {
      const form = await context.request.formData().catch(() => null);
      const user = String(form?.get('username') || '');
      const pass = String(form?.get('password') || '');
      const next = String(form?.get('next') || '/boroto/');
      // Evaluate both before deciding (no short-circuit on username).
      const ok = safeEqual(user, expectedUser) & safeEqual(pass, expectedPass);
      if (!ok) return loginPage({ error: 'Wrong username or password.', next });
      const token = await makeSession(expectedPass);
      const safeNext = next.startsWith('/boroto/') ? next : '/boroto/';
      return new Response(null, {
        status: 303,
        headers: {
          Location: safeNext,
          'Set-Cookie': `${SESSION_COOKIE}=${token}; Path=/boroto; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Sign out.
    if (url.pathname === '/boroto/logout') {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/boroto/login',
          'Set-Cookie': `${SESSION_COOKIE}=; Path=/boroto; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Already signed in?
    if (await sessionValid(expectedPass, readCookie(context.request, SESSION_COOKIE))) {
      if (url.pathname === '/boroto/login') {
        return new Response(null, { status: 303, headers: { Location: '/boroto/' } });
      }
      return context.next();
    }

    // NOTE: HTTP Basic Auth is deliberately NOT accepted here any more.
    // Browsers cache Basic credentials for the whole browser session and resend
    // them automatically on every request. While that fallback existed, signing
    // out cleared the session cookie but the very next request re-authenticated
    // via the cached header — so "Sign out" appeared to do nothing. The signed
    // cookie is now the only way in, which makes sign-out actually sign you out.
    // The API answers with 401 (a fetch cannot render a login page); pages get
    // the form so the owner never sees the browser's built-in prompt again.
    if (url.pathname.startsWith('/boroto/api')) return unauthorized();
    return loginPage({ next: url.pathname + url.search });
  }

  return context.next();
}
