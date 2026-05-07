-- ============================================================
-- FIX: Hapus semua policy yang menyebabkan infinite recursion
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Hapus policy bermasalah di profiles (admin check = recursion)
DROP POLICY IF EXISTS "Admin bisa baca semua profil"            ON public.profiles;
DROP POLICY IF EXISTS "User bisa baca profil sendiri"           ON public.profiles;
DROP POLICY IF EXISTS "User bisa update profil sendiri"         ON public.profiles;

-- 2. Buat ulang policy profiles yang BENAR (tanpa recursion)
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. Hapus policy admin yang recursif di tabel lain
DROP POLICY IF EXISTS "Admin bisa kelola event"              ON public.events;
DROP POLICY IF EXISTS "Admin bisa kelola semua registrasi"   ON public.registrations;
DROP POLICY IF EXISTS "Admin bisa kelola semua payment"      ON public.payments;
DROP POLICY IF EXISTS "Admin bisa baca semua profil"         ON public.profiles;

-- 4. Buat policy admin yang BENAR menggunakan subquery ke tabel profil
--    dengan fungsi SECURITY DEFINER untuk menghindari recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 5. Tambah policy admin ke events menggunakan fungsi is_admin()
CREATE POLICY "events_admin_all"
  ON public.events FOR ALL
  USING (public.is_admin());

-- 6. Tambah policy admin ke registrations
CREATE POLICY "registrations_admin_all"
  ON public.registrations FOR ALL
  USING (public.is_admin());

-- 7. Tambah policy admin ke payments
CREATE POLICY "payments_admin_all"
  ON public.payments FOR ALL
  USING (public.is_admin());

-- 8. Tambah policy admin ke profiles (bisa baca semua)
CREATE POLICY "profiles_admin_select_all"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- ✅ Selesai! Coba login kembali di aplikasi.
