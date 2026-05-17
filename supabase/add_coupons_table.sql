-- ============================================================
-- MIGRATION: Sistem Kupon / Voucher Diskon
-- Jalankan di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Tabel kupon
CREATE TABLE IF NOT EXISTS coupons (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code           text UNIQUE NOT NULL,
  description    text,
  discount_type  text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  min_amount     numeric DEFAULT 0,
  max_discount   numeric,           -- batas maks diskon (untuk tipe persentase)
  max_uses       integer,           -- NULL = tidak terbatas
  current_uses   integer DEFAULT 0 NOT NULL,
  valid_from     timestamptz DEFAULT now(),
  valid_until    timestamptz,       -- NULL = tidak ada batas waktu
  is_active      boolean DEFAULT true NOT NULL,
  event_ids      uuid[],            -- NULL = berlaku untuk semua event
  created_at     timestamptz DEFAULT now()
);

-- RLS: siapa saja bisa baca kupon aktif (untuk validasi di frontend)
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON coupons FOR SELECT
  USING (is_active = true);

-- 2. Tambah kolom ke tabel payments (untuk audit diskon)
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS coupon_id       uuid REFERENCES coupons(id),
  ADD COLUMN IF NOT EXISTS discount_amount numeric DEFAULT 0;

-- 3. Stored procedure untuk atomic increment current_uses
CREATE OR REPLACE FUNCTION increment_coupon_uses(p_coupon_id uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE coupons SET current_uses = current_uses + 1 WHERE id = p_coupon_id;
$$;

-- 4. Contoh kupon untuk testing
INSERT INTO coupons (code, description, discount_type, discount_value, min_amount, max_uses, valid_until)
VALUES
  ('LATIH50', 'Diskon 50% untuk semua event', 'percentage', 50, 100000, 100, now() + interval '30 days'),
  ('HEMAT100K', 'Diskon Rp 100.000 flat', 'fixed', 100000, 200000, 50, now() + interval '30 days');
