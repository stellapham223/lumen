-- Migration: add cd_indexing_log table for tracking URL submissions to
-- Google Indexing API and IndexNow.
-- Run once against production DB:
--   bun run lib/db/migrations/apply.ts lib/db/migrations/0002_add_indexing_log.sql
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS cd_indexing_log (
  id serial PRIMARY KEY,
  url text NOT NULL,
  provider text NOT NULL,           -- 'google' | 'indexnow'
  status text NOT NULL,             -- 'ok' | 'fail'
  response_status integer NOT NULL DEFAULT 0,
  error text,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cd_indexing_log_url_idx
  ON cd_indexing_log (url, provider, submitted_at DESC);

CREATE INDEX IF NOT EXISTS cd_indexing_log_recent_idx
  ON cd_indexing_log (submitted_at DESC);
