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
