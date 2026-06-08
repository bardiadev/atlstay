/**
 * Cloudflare Pages middleware — runs on every request before static assets and
 * other Functions. Canonicalizes the host with a 301 redirect from www → apex
 * (non-www), preserving the full path and query string.
 *
 * Why this and not public/_redirects: Cloudflare Pages `_redirects` only matches
 * by PATH, not by hostname, so it cannot do a www→apex redirect. Middleware can.
 * Only www.atlstay.com is redirected — the apex and *.pages.dev preview
 * deployments pass straight through to normal routing.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.atlstay.com') {
    url.hostname = 'atlstay.com';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
