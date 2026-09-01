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

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
const json = JSON.stringify(sorted, null, 0) + '\n';

let prev = '';
try { prev = readFileSync('src/data/lastmod.json', 'utf8'); } catch { /* first run */ }

writeFileSync('src/data/lastmod.json', json);
console.log(`  commits walked : ${commits}`);
console.log(`  paths dated    : ${Object.keys(sorted).length}`);
console.log(`  distinct dates : ${new Set(Object.values(sorted).map((d) => d.slice(0, 10))).size}`);
console.log(prev === json ? '  unchanged' : `  wrote src/data/lastmod.json (${Math.round(json.length / 1024)} KB)`);
