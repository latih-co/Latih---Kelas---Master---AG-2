-- ── Lengkapi tabel certificates dengan kolom yang dibutuhkan ────
-- Jalankan di Supabase Dashboard → SQL Editor

-- Tambah kolom yang mungkin belum ada
ALTER TABLE certificates
  ADD COLUMN IF NOT EXISTS event_title     TEXT,
  ADD COLUMN IF NOT EXISTS verify_url      TEXT,
  ADD COLUMN IF NOT EXISTS registration_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS quiz_result_id  UUID;

-- Jika tabel certificates belum ada sama sekali, buat dari awal:
-- (Jalankan bagian ini HANYA jika ALTER TABLE di atas error "relation does not exist")
/*
CREATE TABLE IF NOT EXISTS public.certificates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,
  cert_number     TEXT NOT NULL UNIQUE,
  event_title     TEXT,
  issued_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  verify_url      TEXT,
  registration_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
  quiz_result_id  UUID,
  created_at      TIMESTAMPTZ DEFAULT now()
);
*/

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy: user bisa baca sertifikat sendiri
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='certificates' AND policyname='Users can read own certificates') THEN
    CREATE POLICY "Users can read own certificates"
    ON public.certificates FOR SELECT TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Policy: user bisa insert sertifikat sendiri
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='certificates' AND policyname='Users can insert own certificates') THEN
    CREATE POLICY "Users can insert own certificates"
    ON public.certificates FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Refresh schema cache PostgREST (penting setelah ALTER TABLE)
NOTIFY pgrst, 'reload schema';
