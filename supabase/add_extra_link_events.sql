-- Tambah kolom link fasilitas tambahan ke tabel events
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS extra_link       TEXT,
  ADD COLUMN IF NOT EXISTS extra_link_label TEXT;
