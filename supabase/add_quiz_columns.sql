-- ── Tambah kolom kuis ke tabel events ───────────────────────────
-- Jalankan di Supabase Dashboard → SQL Editor

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS quiz_questions     JSONB   DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS quiz_passing_score INTEGER DEFAULT 80;

-- Tambah kolom pelacak percobaan kuis ke tabel registrations
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS quiz_attempts INTEGER DEFAULT 0;

-- Format quiz_questions:
-- [
--   {
--     "id": 1,
--     "question": "Apa yang dimaksud dengan GMP?",
--     "options": ["Good Manufacturing Practice", "Good Marketing Practice", "General Manufacturing Process", "Good Management Practice"],
--     "correct": 0
--   }
-- ]
