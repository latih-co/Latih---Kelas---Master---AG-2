-- ============================================================
-- MIGRATION: Kupon Loyalty Otomatis
-- Jalankan di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Tambah kolom user_id ke tabel coupons (NULL = kupon global/admin)
ALTER TABLE public.coupons
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS event_type_restriction text[];
-- event_type_restriction: array tipe event yang boleh pakai kupon ini
-- NULL = semua tipe event, ['training','webinar_advanced'] = dibatasi

-- 2. Index untuk query kupon per user
CREATE INDEX IF NOT EXISTS idx_coupons_user_id ON public.coupons(user_id);

-- 3. Update RLS: user bisa baca kupon miliknya sendiri (personal coupon)
--    Policy lama "Anyone can read active coupons" hanya baca kupon global (user_id IS NULL)
--    Tambah policy baru untuk kupon personal

DROP POLICY IF EXISTS "User bisa baca kupon sendiri" ON public.coupons;
CREATE POLICY "User bisa baca kupon sendiri"
  ON public.coupons FOR SELECT
  USING (user_id = auth.uid());

-- 4. Stored procedure: generate kupon loyalty setelah pembayaran berhasil
--    Dipanggil dari tripay-webhook (service role, bypass RLS)
CREATE OR REPLACE FUNCTION public.generate_loyalty_coupon(
  p_user_id      uuid,
  p_source_event_id uuid  -- event yang baru dibayar (untuk catatan)
)
RETURNS text   -- kode kupon yang dibuat
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_code      text;
  v_chars     text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  -- hapus karakter mirip (0/O, 1/I)
  v_rand      text := '';
  v_i         int;
  v_existing  int;
BEGIN

  -- Generate kode unik 5 karakter
  LOOP
    v_rand := '';
    FOR v_i IN 1..5 LOOP
      v_rand := v_rand || substr(v_chars, floor(random() * length(v_chars) + 1)::int, 1);
    END LOOP;
    v_code := 'LATIH-' || v_rand;

    -- Pastikan kode belum ada
    SELECT COUNT(*) INTO v_existing FROM public.coupons WHERE code = v_code;
    EXIT WHEN v_existing = 0;
  END LOOP;

  -- Insert kupon personal
  INSERT INTO public.coupons (
    code,
    description,
    discount_type,
    discount_value,
    max_discount,
    min_amount,
    max_uses,
    current_uses,
    valid_until,
    is_active,
    user_id,
    event_type_restriction
  ) VALUES (
    v_code,
    'Kupon loyalty — hadiah dari event yang telah kamu selesaikan',
    'percentage',
    10,           -- 10% diskon
    100000,       -- maksimal Rp 100.000
    100000,       -- min transaksi Rp 100.000
    1,            -- 1x pakai
    0,
    NULL,         -- berlaku selamanya (tidak ada batas waktu)
    true,
    p_user_id,
    ARRAY['training', 'webinar_advanced']
  );

  RETURN v_code;
END;
$$;

-- 5. Grant execute ke service_role (Edge Functions pakai ini)
GRANT EXECUTE ON FUNCTION public.generate_loyalty_coupon(uuid, uuid) TO service_role;
