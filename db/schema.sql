-- Lead Desk — system of record for atlstay.com + ssmproperty.com enquiries.
--
-- Design notes:
--  * raw_lead / raw_meta hold the COMPLETE submitted payloads as JSON. The form
--    grows new fields per service variant, and the email + Telegram renderers are
--    already field-agnostic; keeping the raw blobs means a new question never
--    needs a migration to be captured.
--  * The flattened columns exist only for listing, sorting and duplicate
--    detection. They are a convenience index over raw_lead, never the source of
--    truth.
--  * Operator columns (status, notes, proposal_*) are the only mutable ones.

CREATE TABLE IF NOT EXISTS leads (
  id                TEXT PRIMARY KEY,          -- uuid
  received_at       TEXT NOT NULL,             -- ISO 8601 UTC
  brand             TEXT NOT NULL DEFAULT 'ATLStay',  -- ATLStay | SSMProperty
  form_name         TEXT,                      -- e.g. "ATLStay Rental Projection"
  kind              TEXT NOT NULL DEFAULT 'lead',  -- lead | message (contact-page enquiries)
  tg_cards          TEXT,                      -- JSON [{chat,mid}] — where this lead's Telegram cards live
  seq               INTEGER,                   -- permanent reference number, never reused (see lead_seq)
  email_ok          INTEGER,                   -- 1 delivered, 0 refused, NULL not attempted
  email_debug       TEXT,                      -- what Web3Forms actually said, for diagnosis
  service_interest  TEXT,                      -- the category: HOA, long-term, etc.

  -- flattened for listing / search / dupe detection
  name              TEXT,
  email             TEXT,
  phone             TEXT,
  address           TEXT,
  page_url          TEXT,

  -- complete payloads, verbatim
  raw_lead          TEXT NOT NULL,             -- JSON
  raw_meta          TEXT,                      -- JSON

  -- operator-owned
  status            TEXT NOT NULL DEFAULT 'new',  -- new | proposal_sent | won | lost
  notes             TEXT,
  proposal_sent_at  TEXT,
  proposal_sent_to  TEXT,
  first_viewed_at   TEXT,
  updated_at        TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_received  ON leads (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status    ON leads (status, received_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_kind      ON leads (kind, received_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email     ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_phone     ON leads (phone);


-- ── Reference numbers ─────────────────────────────────────────────────────────
-- A counter table purely so AUTOINCREMENT guarantees a number is never reused,
-- even after leads are deleted. "#0007" therefore always means the same
-- enquiry, forever — which is the point when partners refer to leads by number.
CREATE TABLE IF NOT EXISTS lead_seq (n INTEGER PRIMARY KEY AUTOINCREMENT);

-- ── Activity ─────────────────────────────────────────────────────────────────
-- Append-only. Every action anyone takes on a lead is one row: a button press
-- in the Telegram group, or a status change in the Lead Desk. Chosen over a
-- JSON blob on the lead row because several partners can act on the same card
-- simultaneously — an INSERT is atomic, where read-modify-write on a blob
-- silently loses whichever write lands second.
--
-- ONE EXCEPTION: a note's own text can be corrected in place (see edited_at).
-- A note is prose somebody typed, and prose has typos; fixing one is finishing
-- a sentence, not rewriting history. It is an UPDATE of a single row addressed
-- by primary key, so it has none of the lost-update problem above. Nothing
-- else here is ever mutated, and no row is ever deleted.
CREATE TABLE IF NOT EXISTS lead_events (
  id          TEXT PRIMARY KEY,
  lead_id     TEXT NOT NULL,
  action      TEXT NOT NULL,   -- called | emailed | proposal | won | lost
                               -- replied | not_relevant | moved | note | created
  actor       TEXT NOT NULL,   -- display name, e.g. the Telegram user's name
  actor_tg_id TEXT,            -- Telegram user id; NULL for dashboard actions
  note        TEXT,            -- free text, for action='note'
  source      TEXT NOT NULL,   -- telegram | dashboard | system
  created_at  TEXT NOT NULL,
  edited_at   TEXT             -- set when a note's text was corrected; NULL otherwise
);
CREATE INDEX IF NOT EXISTS idx_lead_events_lead  ON lead_events (lead_id, created_at);
CREATE INDEX IF NOT EXISTS idx_lead_events_actor ON lead_events (actor, created_at);
