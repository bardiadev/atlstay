#!/usr/bin/env node
/**
 * Replay historical leads into the Lead Desk.
 *
 * Posts each record to the live /api/lead endpoint using the LEAD_IMPORT_KEY
 * secret, which is the only thing that unlocks two behaviours: backdating the
 * row to when the lead really arrived, and suppressing the notification email
 * (the owner already has those in their inbox — re-sending them would be spam).
 * Storage and the Telegram alert run normally, which is the point.
 *
 * Records are sent strictly oldest-first and one at a time, waiting for each to
 * complete, so the replayed history reads in chronological order in the chat.
 *
 * The records file is NEVER committed: it holds real customer names, emails,
 * phone numbers and IP addresses, and this repository is public. Keep it
 * outside the working tree.
 *
 *   LEAD_IMPORT_KEY=$(cat /secure/path/.import_key) \
 *     node scripts/import-leads.mjs /secure/path/backlog.json [--dry-run]
 *
 * Each record: { form, subject, receivedAt (ISO), lead: {...}, meta: {...} }
 */
import { readFileSync } from 'node:fs';

const ENDPOINT = process.env.LEAD_ENDPOINT || 'https://atlstay.com/api/lead';
const KEY = process.env.LEAD_IMPORT_KEY || '';
const file = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!file) { console.error('usage: node scripts/import-leads.mjs <records.json> [--dry-run]'); process.exit(1); }
if (!KEY && !dryRun) { console.error('LEAD_IMPORT_KEY is not set — refusing to run.'); process.exit(1); }

const records = JSON.parse(readFileSync(file, 'utf8'));
if (!Array.isArray(records) || !records.length) { console.error('No records found.'); process.exit(1); }

// Oldest first, so the chat reads like the leads actually arrived.
records.sort((a, b) => new Date(a.receivedAt) - new Date(b.receivedAt));

const est = (iso) => new Date(iso).toLocaleString('en-US', {
  timeZone: 'America/New_York', month: 'short', day: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true,
});

console.log(`${records.length} record(s), oldest first${dryRun ? '  [DRY RUN — nothing sent]' : ''}\n`);

let sent = 0, failed = 0;
for (const [i, r] of records.entries()) {
  const who = r.lead?.Name || r.lead?.name || 'unknown';
  const when = est(r.receivedAt);
  const label = `${String(i + 1).padStart(2)}. ${when.padEnd(20)} ${who.padEnd(18)}`;

  if (!Number.isFinite(new Date(r.receivedAt).getTime())) {
    console.log(`${label} SKIPPED — unparseable receivedAt "${r.receivedAt}"`); failed++; continue;
  }
  if (dryRun) { console.log(`${label} would send (${r.form})`); continue; }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        importKey: KEY,
        receivedAt: r.receivedAt,
        subject: r.subject || `Imported lead — ${who}`,
        form: r.form,
        replyto: r.lead?.Email || '',
        lead: r.lead || {},
        meta: r.meta || {},
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && body.success && body.via === 'import') {
      console.log(`${label} OK   id=${body.id || '(not stored)'}`);
      if (!body.id) console.log('     ^ warning: Telegram sent but the row was NOT stored');
      sent++;
    } else {
      console.log(`${label} FAIL http=${res.status} ${JSON.stringify(body).slice(0, 160)}`);
      failed++;
    }
  } catch (err) {
    console.log(`${label} ERROR ${err.message}`);
    failed++;
  }
}

console.log(`\nsent ${sent}, failed ${failed}`);
process.exit(failed ? 1 : 0);
