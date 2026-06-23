#!/usr/bin/env node
// =============================================================================
// IndexNow submitter for ATLStay.
//
// Instantly notifies the IndexNow network — Bing, Yandex, Seznam, Naver, Yep
// (NOT Google; Google doesn't use IndexNow — it relies on the sitemap + Search
// Console). One ping to api.indexnow.org fans out to all participating engines.
//
// Usage:  node scripts/indexnow.mjs            # submit every live sitemap URL
//         node scripts/indexnow.mjs <url> ...  # submit only the given URLs
//
// Re-run after any deploy that adds/changes pages. Key ownership is proven by
// the public file at https://atlstay.com/<KEY>.txt (committed in public/).
// =============================================================================

const HOST = 'atlstay.com';
const KEY = '9a9764fb528056e2be69fc3fe2411d80';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_INDEX = `https://${HOST}/sitemap-index.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function sitemapUrls() {
  const idx = await (await fetch(SITEMAP_INDEX)).text();
  const childMaps = locs(idx).filter((u) => u.endsWith('.xml'));
  const maps = childMaps.length ? childMaps : [SITEMAP_INDEX];
  const all = [];
  for (const m of maps) all.push(...locs(await (await fetch(m)).text()));
  return all;
}

const argv = process.argv.slice(2);
let urlList = argv.length ? argv : await sitemapUrls();

// Safety: only our own host, and never expose the private dashboard.
urlList = [...new Set(urlList)].filter(
  (u) => u.startsWith(`https://${HOST}/`) && !u.includes('/boroto'),
);

if (!urlList.length) {
  console.error('No URLs to submit.');
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow (${ENDPOINT})…`);
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
const text = await res.text().catch(() => '');
console.log(`Response: ${res.status} ${res.statusText}${text ? ` — ${text}` : ''}`);
// 200 = accepted; 202 = accepted, key validation pending.
process.exit(res.ok ? 0 : 1);
