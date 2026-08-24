// Verbatim copies of the middleware's session functions, tested in isolation.
function safeEqual(a, b) {
  const ab = new TextEncoder().encode(a); const bb = new TextEncoder().encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0; for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}
const SESSION_DAYS = 30;
async function hmac(secret, message) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function makeSession(secret) {
  const exp = Date.now() + SESSION_DAYS * 86400000;
  return `${exp}.${await hmac(secret, String(exp))}`;
}
async function sessionValid(secret, token) {
  if (!token) return false;
  const dot = token.lastIndexOf('.'); if (dot === -1) return false;
  const exp = token.slice(0, dot); const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(secret, exp));
}
function readCookie(cookieHeader, name) {
  for (const part of (cookieHeader || '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

const PASS = 'a-realistic-p@ssw0rd-with-symbols-!#$';
let fail = 0;
const t = (label, got, want) => { const ok = got === want; if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  (got ${got}, want ${want})`); };

const tok = await makeSession(PASS);
t('fresh token accepted',            await sessionValid(PASS, tok), true);
t('wrong password rejected',         await sessionValid('wrong', tok), false);
t('password CHANGED kills session',  await sessionValid(PASS + 'x', tok), false);
t('tampered signature rejected',     await sessionValid(PASS, tok.slice(0, -1) + (tok.slice(-1) === 'a' ? 'b' : 'a')), false);
t('tampered expiry rejected',        await sessionValid(PASS, '9' + tok), false);
t('expired token rejected',          await sessionValid(PASS, `${Date.now() - 1000}.${await hmac(PASS, String(Date.now() - 1000))}`), false);
t('empty token rejected',            await sessionValid(PASS, ''), false);
t('garbage rejected',                await sessionValid(PASS, 'lolno'), false);
t('no-dot rejected',                 await sessionValid(PASS, '12345'), false);
t('forged far-future rejected',      await sessionValid(PASS, `${Date.now() + 9e9}.deadbeef`), false);

// The real round trip: exactly what the browser sends back.
const cookieHeader = `foo=bar; boroto_session=${tok}; other=1`;
t('cookie parsed out of header',     readCookie(cookieHeader, 'boroto_session'), tok);
t('parsed cookie still validates',   await sessionValid(PASS, readCookie(cookieHeader, 'boroto_session')), true);
t('token has no cookie-unsafe chars', /^[0-9]+\.[0-9a-f]+$/.test(tok), true);

console.log(fail === 0 ? '\nALL PASS — cookie login is safe to rely on alone.' : `\n${fail} FAILED — do NOT remove Basic Auth.`);
process.exit(fail === 0 ? 0 : 1);
