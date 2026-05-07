-- Tambah kolom is_upgrade ke tabel payments
-- Jalankan di Supabase Dashboard → SQL Editor

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS is_upgrade BOOLEAN DEFAULT FALSE;

NOTIFY pgrst, 'reload schema';
