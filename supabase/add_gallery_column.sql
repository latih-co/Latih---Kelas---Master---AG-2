-- Tambah kolom gallery_images ke tabel events
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS gallery_images TEXT; -- newline-separated URLs
