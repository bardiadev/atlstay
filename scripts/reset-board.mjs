#!/usr/bin/env node
/**
 * Reset the lead board to a pristine state, for handing a clean group to new
 * partners after a round of testing.
 *
 * Pristine means: every lead back to New, nothing opened, no notes, no proposal
 * stamps, no activity history, and every Telegram card redrawn to match. Leads
 * deleted during testing are restored; leads created during testing are removed.
 *
 * The leads' own content (name, contact details, what they submitted, when they
 * arrived, which card is theirs) is taken from a snapshot file and never
 * invented. That snapshot holds real customer data and lives OUTSIDE the repo —
 * this repository is public.
 *
 *   LEAD_BOT_TOKEN=$(cat /secure/.lead_bot_token) \
 *     node scripts/reset-board.mjs /secure/board-snapshot [--dry-run]
 *
 * Default is --dry-run; pass --commit to actually change anything.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const dir = process.argv[2];
const commit = process.argv.includes('--commit');
const TOKEN = process.env.LEAD_BOT_TOKEN || '';
const DB = 'atlstay-leads';

if (!dir) { console.error('usage: node scripts/reset-board.mjs <snapshot-dir> [--commit]'); process.exit(1); }

/** Mutable fields are forced to these — the snapshot's own values may already
 *  contain test activity, so they are deliberately not copied. */
const PRISTINE = {
  status: 'new', notes: '', first_viewed_at: null,
  proposal_sent_at: null, proposal_sent_to: '',
};

const sql = (q) => {
  const out = execFileSync('npx', ['wrangler', 'd1', 'execute', DB, '--remote', '--json', '--command', q],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 * 1024 * 1024 });
  return JSON.parse(out)[0].results;
};
const run = (q) => {
  if (!commit) { console.log(`    [dry-run] ${q.replace(/\s+/g, ' ').slice(0, 110)}…`); return; }
  execFileSync('npx', ['wrangler', 'd1', 'execute', DB, '--remote', '--command', q],
    { encoding: 'utf8', stdio: ['ignore', 'ignore', 'ignore'], maxBuffer: 32 * 1024 * 1024 });
};
const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);

const snapshot = JSON.parse(readFileSync(`${dir}/leads.json`, 'utf8'))[0].results;
const byId = new Map(snapshot.map((r) => [r.id, r]));

console.log(`Snapshot holds ${snapshot.length} leads.${commit ? '' : '  [DRY RUN — pass --commit to apply]'}\n`);

const live = sql('SELECT * FROM leads');
const liveIds = new Set(live.map((r) => r.id));
const events = sql('SELECT COUNT(*) n FROM lead_events')[0].n;

// ── 1. leads created during testing ──
const extra = live.filter((r) => !byId.has(r.id));
console.log(`1. Remove leads created during testing: ${extra.length}`);
for (const r of extra) {
  console.log(`     - ${r.name || r.id}`);
  run(`DELETE FROM lead_events WHERE lead_id = ${q(r.id)}`);
  run(`DELETE FROM leads WHERE id = ${q(r.id)}`);
}

// ── 2. leads deleted during testing ──
const missing = snapshot.filter((r) => !liveIds.has(r.id));
console.log(`\n2. Restore leads deleted during testing: ${missing.length}`);
for (const r of missing) {
  console.log(`     + ${r.name}`);
  const cols = ['id','received_at','brand','form_name','kind','service_interest','name','email',
                'phone','address','page_url','raw_lead','raw_meta','status','notes',
                'proposal_sent_at','proposal_sent_to','first_viewed_at','updated_at','tg_cards'];
  const vals = cols.map((c) => (c in PRISTINE ? q(PRISTINE[c])
    : c === 'updated_at' ? q(new Date().toISOString()) : q(r[c])));
  run(`INSERT INTO leads (${cols.join(',')}) VALUES (${vals.join(',')})`);
}

// ── 3. wipe test activity ──
console.log(`\n3. Clear activity history: ${events} event(s)`);
run('DELETE FROM lead_events');

// ── 4. every surviving lead back to pristine ──
console.log(`\n4. Reset every lead to New / unopened / no notes`);
for (const r of snapshot) {
  run(`UPDATE leads SET status='new', notes='', first_viewed_at=NULL,
        proposal_sent_at=NULL, proposal_sent_to='', kind=${q(r.kind)},
        updated_at=${q(new Date().toISOString())} WHERE id=${q(r.id)}`);
}
console.log(`     ${snapshot.length} lead(s) reset`);

// ── 5. redraw every Telegram card ──
console.log(`\n5. Redraw Telegram cards`);
if (!TOKEN) {
  console.log('     SKIPPED — LEAD_BOT_TOKEN not set, so cards still show test activity');
} else {
  const { renderCard, fromRow } = await import('../functions/api/_card.js');
  let redrawn = 0, failed = 0;
  for (const r of snapshot) {
    const cards = (() => { try { return JSON.parse(r.tg_cards || '[]'); } catch { return []; } })();
    const { text, reply_markup } = renderCard(fromRow({ ...r, ...PRISTINE }), []);
    for (const c of cards) {
      if (!commit) { console.log(`    [dry-run] would redraw ${r.name} → card #${c.mid}`); continue; }
      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: c.chat, message_id: c.mid, text,
                               parse_mode: 'HTML', disable_web_page_preview: true, reply_markup }),
      });
      const b = await res.json().catch(() => ({}));
      // "not modified" means it was already pristine — that counts as success.
      if (b.ok || /not modified/i.test(b.description || '')) { redrawn++; }
      else { failed++; console.log(`     ! ${r.name} card #${c.mid}: ${b.description}`); }
    }
  }
  if (commit) console.log(`     ${redrawn} card(s) redrawn${failed ? `, ${failed} failed` : ''}`);
}

console.log(commit ? '\nBoard reset. Ready for partners.' : '\nDry run complete — nothing changed.');
