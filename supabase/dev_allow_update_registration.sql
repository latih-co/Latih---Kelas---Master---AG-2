-- ⚠️ DEV ONLY: Policy sementara agar user bisa simulasi upgrade
-- Jalankan di Supabase Dashboard → SQL Editor
-- HAPUS policy ini sebelum production launch

-- Izinkan user update registrasi sendiri (untuk simulasi upgrade dev)
CREATE POLICY "User bisa update registrasi sendiri (DEV)"
  ON public.registrations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verifikasi policy terpasang:
-- SELECT policyname FROM pg_policies WHERE tablename = 'registrations';
