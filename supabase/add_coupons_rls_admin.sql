-- ============================================================
-- PATCH: RLS policy admin untuk tabel coupons
-- Jalankan di Supabase Dashboard → SQL Editor
-- ============================================================

-- Admin bisa melakukan semua operasi (INSERT, UPDATE, DELETE, SELECT)
CREATE POLICY "coupons_admin_all"
  ON public.coupons FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service role (Edge Function) juga bisa update current_uses
-- Fungsi increment_coupon_uses sudah menggunakan SECURITY DEFINER
-- sehingga otomatis melewati RLS.

-- ✅ Selesai! Admin sekarang bisa tambah & nonaktifkan kupon dari dashboard.
