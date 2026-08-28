#!/usr/bin/env node
/**
 * Wait until a commit is genuinely SERVING on Cloudflare Pages.
 *
 * WHY THIS EXISTS. On 2026-08-28 a change was pushed, `wrangler pages
 * deployment list` was read, it showed the new commit with status "Active", and
 * the owner was told it was live. It was not: that listing labels the newest
 * production deployment "Active" from the moment the record is created, while
 * the build is still running. The owner tested 15 seconds later, hit the OLD
 * code, and reported a working feature as broken.
 *
 * The only trustworthy signal is the deployment's own stages. A deployment is
 * live when its LATEST stage is `deploy` with status `success` — anything else
 * (queued, initialize, clone_repo, build, or deploy still in progress) means
 * the site is still serving the previous version.
 *
 *   node scripts/wait-deploy.mjs            # waits for HEAD
 *   node scripts/wait-deploy.mjs <sha>      # waits for a specific commit
 *
 * Exits 0 once that commit is serving, 1 on build failure or timeout. Uses the
 * Cloudflare credentials wrangler already holds — nothing to configure, and no
 * token is ever printed.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';

const PROJECT = 'atlstay';
const POLL_MS = 10_000;
const CAP_MS = 12 * 60 * 1000; // hard cap — never poll forever

const want = (process.argv[2] || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' })).trim();
const short = want.slice(0, 7);

/* wrangler's own OAuth token. Read, never printed. */
function token() {
  const paths = [
    `${homedir()}/Library/Preferences/.wrangler/config/default.toml`,
    `${homedir()}/.config/.wrangler/config/default.toml`,
    `${homedir()}/.wrangler/config/default.toml`,
  ];
  for (const p of paths) {
    try {
      const m = readFileSync(p, 'utf8').match(/oauth_token\s*=\s*"([^"]+)"/);
      if (m) return m[1];
    } catch { /* try the next location */ }
  }
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  console.error('No Cloudflare credentials found. Run `npx wrangler whoami` first.');
  process.exit(1);
}

const TOKEN = token();
const api = async (path) => {
  const r = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return r.json();
};

/* The account id is not kept in this repo — the repository is public, and there
   is no reason to publish an identifier that can simply be looked up. */
async function accountId() {
  if (process.env.CLOUDFLARE_ACCOUNT_ID) return process.env.CLOUDFLARE_ACCOUNT_ID;
  const list = await api('/accounts');
  if (!list.success) {
    console.error('Cloudflare rejected the stored credentials. Run `npx wrangler whoami` to refresh.');
    process.exit(1);
  }
  for (const acc of list.result || []) {
    const p = await api(`/accounts/${acc.id}/pages/projects/${PROJECT}`);
    if (p.success) return acc.id;
  }
  console.error(`No Cloudflare account of yours holds a Pages project called "${PROJECT}".`);
  process.exit(1);
}

const ACC = await accountId();
const started = Date.now();
let lastReported = '';

console.log(`Waiting for ${short} to serve on ${PROJECT}.com …`);

while (Date.now() - started < CAP_MS) {
  const j = await api(`/accounts/${ACC}/pages/projects/${PROJECT}/deployments?per_page=10`);
  const d = (j.result || []).find(
    (x) => (x.deployment_trigger?.metadata?.commit_hash || '').startsWith(short),
  );

  if (!d) {
    if (lastReported !== 'pending') { console.log('  … Cloudflare has not picked up the push yet'); lastReported = 'pending'; }
  } else {
    const stage = d.latest_stage || {};
    const where = `${stage.name}:${stage.status}`;
    if (where !== lastReported) { console.log(`  … ${where}`); lastReported = where; }

    if (stage.name === 'deploy' && stage.status === 'success') {
      // Production only: a preview deployment succeeding says nothing about
      // what the live domain is serving.
      if (d.environment !== 'production') {
        console.error(`\n${short} deployed to ${d.environment}, not production — the live site is unchanged.`);
        process.exit(1);
      }
      console.log(`\nLIVE: ${short} is serving (deployed ${stage.ended_on}).`);
      process.exit(0);
    }
    if (stage.status === 'failure' || stage.status === 'canceled') {
      console.error(`\nDEPLOY ${stage.status.toUpperCase()} at stage "${stage.name}" — the site still serves the previous version.`);
      console.error(`  Build log: https://dash.cloudflare.com/${ACC}/pages/view/${PROJECT}/${d.id}`);
      process.exit(1);
    }
  }
  await new Promise((r) => setTimeout(r, POLL_MS));
}

console.error(`\nGave up after ${CAP_MS / 60000} minutes. ${short} is NOT confirmed live — check the Cloudflare dashboard.`);
process.exit(1);
