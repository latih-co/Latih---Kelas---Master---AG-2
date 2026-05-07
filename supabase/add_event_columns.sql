-- ============================================================
-- LATIH — Tambah kolom baru ke tabel events
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS image_url     TEXT,
  ADD COLUMN IF NOT EXISTS waktu         TEXT,          -- e.g. "09:00 – 11:00 WIB"
  ADD COLUMN IF NOT EXISTS wa_link       TEXT,          -- WhatsApp link
  ADD COLUMN IF NOT EXISTS is_featured   BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS benefits      TEXT,          -- newline-separated list
  ADD COLUMN IF NOT EXISTS silabus       TEXT,          -- newline-separated list
  ADD COLUMN IF NOT EXISTS output_list   TEXT,          -- newline-separated list
  ADD COLUMN IF NOT EXISTS reasons       TEXT,          -- newline-separated list
  ADD COLUMN IF NOT EXISTS target_peserta TEXT;         -- newline-separated list
