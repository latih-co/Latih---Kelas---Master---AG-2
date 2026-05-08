-- ============================================================
-- LATIH+ LMS — Supabase Database Schema
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. PROFILES (extend dari auth.users bawaan Supabase)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'Pengguna Baru',
  job_role    TEXT,
  email       TEXT,  -- disimpan dari auth.users untuk keperluan admin
  xp          INT  NOT NULL DEFAULT 0,
  streak      INT  NOT NULL DEFAULT 0,
  last_active DATE,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile saat user register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS (Row Level Security) untuk profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User bisa baca profil sendiri"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User bisa update profil sendiri"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin bisa baca semua profil"
  ON public.profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  ));


-- 2. EVENTS (Training & Webinar)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL CHECK (type IN ('training', 'webinar_reguler', 'webinar_advanced')),
  title           TEXT NOT NULL,
  description     TEXT,
  trainer         TEXT,
  sektor          TEXT,
  event_date      TIMESTAMPTZ,
  zoom_link       TEXT,
  price_regular   INT  NOT NULL DEFAULT 0,
  price_premium   INT  NOT NULL DEFAULT 0,
  image_url       TEXT,
  quiz_id         UUID,  -- FK ke quizzes (ditambah setelah tabel quizzes dibuat)
  max_participants INT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Semua user bisa baca event aktif"
  ON public.events FOR SELECT USING (is_active = true);

CREATE POLICY "Admin bisa kelola event"
  ON public.events FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- 3. REGISTRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id      UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  package       TEXT NOT NULL DEFAULT 'free' CHECK (package IN ('free', 'premium')),
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','verified','paid','attended','quiz_unlocked','completed')),
  -- Untuk Webinar Reguler (social media verification)
  ig_username   TEXT,
  verify_code   TEXT UNIQUE,
  ig_verified   BOOLEAN DEFAULT false,
  verified_at   TIMESTAMPTZ,
  -- Untuk semua jenis
  zoom_sent     BOOLEAN DEFAULT false,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User bisa baca registrasi sendiri"
  ON public.registrations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User bisa insert registrasi"
  ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin bisa kelola semua registrasi"
  ON public.registrations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- 4. PAYMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id     UUID NOT NULL REFERENCES public.registrations(id),
  user_id             UUID NOT NULL REFERENCES auth.users(id),
  tripay_reference    TEXT UNIQUE,
  tripay_merchant_ref TEXT UNIQUE,
  amount              INT  NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','paid','failed','expired','refunded')),
  payment_method      TEXT,
  paid_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User bisa baca payment sendiri"
  ON public.payments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin bisa kelola semua payment"
  ON public.payments FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- 5. QUIZZES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quizzes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID REFERENCES public.events(id) ON DELETE SET NULL,
  topic_id      TEXT,  -- untuk Sertifikat Modul (referensi ke courses.js)
  title         TEXT NOT NULL,
  description   TEXT,
  passing_score INT  NOT NULL DEFAULT 70,  -- persentase minimum lulus
  slides        JSONB NOT NULL DEFAULT '[]',  -- sama format dengan courses.js slides
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User terdaftar bisa baca kuis event mereka"
  ON public.quizzes FOR SELECT
  USING (
    -- Quiz event: harus punya registrasi dengan status quiz_unlocked/completed
    EXISTS (
      SELECT 1 FROM public.registrations r
      WHERE r.user_id = auth.uid()
        AND r.event_id = quizzes.event_id
        AND r.status IN ('quiz_unlocked', 'completed')
    )
    OR topic_id IS NOT NULL  -- Quiz modul: semua user bisa akses
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 6. QUIZ RESULTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  quiz_id         UUID NOT NULL REFERENCES public.quizzes(id),
  registration_id UUID REFERENCES public.registrations(id),
  score           INT  NOT NULL,
  max_score       INT  NOT NULL,
  passed          BOOLEAN NOT NULL,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User bisa baca hasil kuis sendiri"
  ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User bisa submit hasil kuis"
  ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 7. CERTIFICATES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID  NOT NULL REFERENCES auth.users(id),
  type        TEXT  NOT NULL CHECK (type IN ('modul','training','webinar_reguler','webinar_advanced')),
  event_id    UUID  REFERENCES public.events(id),
  topic_id    TEXT,  -- untuk Sertifikat Modul
  quiz_result_id UUID REFERENCES public.quiz_results(id),
  cert_number TEXT  NOT NULL UNIQUE,  -- format: LTC-2026-XXXXX
  pdf_url     TEXT,  -- Supabase Storage URL
  verify_url  TEXT,  -- URL publik verifikasi
  issued_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User bisa baca sertifikat sendiri"
  ON public.certificates FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Publik bisa verifikasi sertifikat via cert_number"
  ON public.certificates FOR SELECT USING (true);  -- halaman verifikasi publik


-- 8. Tambah FK quizzes ke events (setelah tabel quizzes dibuat)
-- ============================================================
ALTER TABLE public.events
  ADD CONSTRAINT fk_events_quiz
  FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE SET NULL;


-- 9. Supabase Storage buckets
-- ============================================================
-- Jalankan ini di Supabase Dashboard → Storage → New Bucket:
-- Bucket name: 'certificates', public: true
-- Bucket name: 'cert-templates', public: true
-- (atau jalankan via SQL jika menggunakan supabase CLI)
