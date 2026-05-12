-- Tambah kolom whatsapp ke tabel profiles (opsional, nullable)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS whatsapp TEXT;
