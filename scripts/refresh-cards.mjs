#!/usr/bin/env node
/**
 * Redraw every Telegram lead card from current data, in place.
 *
 * Use this whenever the card FORMAT changes — a new button, a new field, a
 * layout fix — so cards already sitting in the group pick up the change instead
 * of being frozen in whatever shape they were posted in. It edits existing
 * messages and never posts new ones, so it cannot create duplicates.
 *
 * It changes no lead data and records no activity: purely a redraw.
 *
 *   LEAD_BOT_TOKEN=$(cat /secure/.lead_bot_token) node scripts/refresh-cards.mjs [--commit]
 *
 * Default is a dry run. A card whose message no longer exists (the group was
 * cleared) is reported, not recreated — re-posting is a separate, deliberate
 * act, because it would move the card to the bottom of the chat.
 */
import { execFileSync } from 'node:child_process';
import { renderCard, fromRow } from '../functions/api/_card.js';

const commit = process.argv.includes('--commit');
const TOKEN = process.env.LEAD_BOT_TOKEN || '';
const DB = 'atlstay-leads';

if (!TOKEN) { console.error('LEAD_BOT_TOKEN is not set.'); process.exit(1); }

const sql = (q) => JSON.parse(execFileSync('npx',
  ['wrangler', 'd1', 'execute', DB, '--remote', '--json', '--command', q],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 * 1024 * 1024 },
))[0].results;

const leads = sql('SELECT * FROM leads ORDER BY received_at ASC');
const allEvents = sql('SELECT lead_id, action, actor, note, source, created_at FROM lead_events ORDER BY created_at ASC');
const byLead = new Map();
for (const e of allEvents) { if (!byLead.has(e.lead_id)) byLead.set(e.lead_id, []); byLead.get(e.lead_id).push(e); }

console.log(`${leads.length} lead(s)${commit ? '' : '   [DRY RUN — pass --commit to apply]'}\n`);

let done = 0, same = 0, gone = 0, failed = 0;
for (const row of leads) {
  const cards = (() => { try { return JSON.parse(row.tg_cards || '[]'); } catch { return []; } })();
  const label = `#${String(row.seq || 0).padStart(4, '0')} ${row.name || '(unnamed)'}`.padEnd(30);
  if (!cards.length) { console.log(`  ${label} no card`); continue; }

  const { text, reply_markup } = renderCard(fromRow(row), byLead.get(row.id) || []);
  for (const c of cards) {
    if (!commit) { console.log(`  ${label} would redraw card #${c.mid}`); continue; }
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: c.chat, message_id: c.mid, text,
                             parse_mode: 'HTML', disable_web_page_preview: true, reply_markup }),
    });
    const b = await res.json().catch(() => ({}));
    if (b.ok) { done++; console.log(`  ${label} redrawn`); }
    else if (/not modified/i.test(b.description || '')) { same++; console.log(`  ${label} already current`); }
    else if (/not found/i.test(b.description || '')) { gone++; console.log(`  ${label} card no longer exists`); }
    else { failed++; console.log(`  ${label} FAILED — ${b.description}`); }
  }
}

if (commit) {
  console.log(`\n${done} redrawn, ${same} already current${gone ? `, ${gone} missing` : ''}${failed ? `, ${failed} failed` : ''}`);
  if (gone) console.log('Missing cards need a deliberate re-post (action:"repost", force:true) — that moves them to the bottom of the chat.');
} else {
  console.log('\nDry run complete — nothing changed.');
}
