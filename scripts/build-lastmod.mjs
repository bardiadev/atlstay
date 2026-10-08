#!/usr/bin/env node
/**
 * Precompute per-file last-modified dates into src/data/lastmod.json.
 *
 * WHY THIS IS A COMMITTED FILE AND NOT A BUILD-TIME GIT CALL. The first attempt
 * read `git log` inside astro.config.mjs. That worked locally and did nothing on
 * production: Cloudflare Pages builds from a SHALLOW clone, so `git log` sees a
 * single commit, every path resolves to that one date, and the whole sitemap
 * goes back to claiming everything changed today — which is the exact problem
 * the change was meant to fix. It was verified locally, shipped, and only caught
 * by checking the live sitemap afterwards.
 *
 * So the dates are computed HERE, where full history exists, and committed. The
 * build just reads JSON and needs no git at all.
 *
 * Run before committing whenever content or data files change:
 *   node scripts/build-lastmod.mjs
 *
 * If the file is missing or stale the sitemap degrades to the build timestamp,
 * which is what it did before — never a wrong date, just a less useful one.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';

const TRACKED = [
  'src/content/',
  'src/data/',
  'src/pages/',
  'src/layouts/',
  'src/components/',
  // src/config/site.ts carries the phone, fee, address and stats that render
  // into EVERY page. It was missing here, so when the phone number changed on
  // 2026-09-01 the sitemap told Google that pages like /services/hoa-management/
  // — the single biggest page on the site — had not changed since August. Google
  // duly left them uncrawled, and they kept serving the old number in search
  // results for over a month.
  'src/config/',
];

let out = '';
try {
  out = execSync('git log --pretty=format:%cI --name-only --no-merges', {
    encoding: 'utf8',
    maxBuffer: 128 * 1024 * 1024,
  });
} catch (err) {
  console.error('git log failed — is this a full checkout?', err?.message);
  process.exit(1);
}

/** @type {Record<string,string>} */
const map = {};
let current = '';
let commits = 0;
for (const line of out.split('\n')) {
  const t = line.trim();
  if (!t) continue;
  if (/^\d{4}-\d{2}-\d{2}T/.test(t)) { current = t; commits++; continue; }
  if (!current) continue;
  if (!TRACKED.some((p) => t.startsWith(p))) continue;
  // git logs newest first, so the first sighting of a path is its latest commit.
  if (!(t in map)) map[t] = current;
}

if (commits < 5) {
  console.error(`Only ${commits} commits visible — this looks like a shallow clone.`);
  console.error('Refusing to write a lastmod map that would date everything the same day.');
  process.exit(1);
}

/* WHEN DID THE BUSINESS FACTS LAST ACTUALLY CHANGE?
 *
 * src/config/site.ts renders into every page, so dating the whole site from
 * "the file changed" is useless: a tagline apostrophe would flag 723 URLs as
 * modified today, which is precisely how a sitemap teaches Google to ignore
 * lastmod. But the opposite — not watching it at all — is what let the
 * 2026-09-01 phone change go unannounced, leaving the biggest pages on the site
 * serving the old number in search results for over a month.
 *
 * So watch the facts, not the file. A reader acting on a stale page gets the
 * phone, email, address or price wrong; nobody is harmed by a stale tagline.
 * Walk this one file's history and take the date of the newest commit that
 * changed one of those values. Comments, copy and analytics ids are ignored.
 */
const FACT_KEYS = /^[+-]\s*(phone|phoneHref|email|streetAddress|addressLocality|addressRegion|postalCode|rate|rateFrom|rateHigh|rateBasis|homes|reviews|years|ratingValue|reviewCount)\s*:/;
let factsDate = null;
try {
  const hist = execSync('git log --format=%cI --patch --no-merges -- src/config/site.ts', {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  let when = '';
  for (const line of hist.split('\n')) {
    if (/^\d{4}-\d{2}-\d{2}T/.test(line.trim())) { when = line.trim(); continue; }
    if (!when) continue;
    if (line.startsWith('+++') || line.startsWith('---')) continue;
    if (FACT_KEYS.test(line)) { factsDate = when; break; } // newest first
  }
} catch { /* no history for the file — leave it unset */ }
if (factsDate) map['src/config/site.ts#facts'] = factsDate;

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
const json = JSON.stringify(sorted, null, 0) + '\n';

let prev = '';
try { prev = readFileSync('src/data/lastmod.json', 'utf8'); } catch { /* first run */ }

writeFileSync('src/data/lastmod.json', json);
console.log(`  commits walked : ${commits}`);
console.log(`  paths dated    : ${Object.keys(sorted).length}`);
console.log(`  distinct dates : ${new Set(Object.values(sorted).map((d) => d.slice(0, 10))).size}`);
console.log(prev === json ? '  unchanged' : `  wrote src/data/lastmod.json (${Math.round(json.length / 1024)} KB)`);
