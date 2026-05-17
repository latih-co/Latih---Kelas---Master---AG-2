import { supabase } from '../lib/supabase';

/**
 * Ambil semua kupon milik user yang sedang login.
 * Mencakup: kupon loyalty personal + kupon global yang pernah dipakai.
 */
export const getMyCoupons = async () => {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
};

/**
 * Ambil kupon aktif milik user (belum dipakai & belum kadaluarsa).
 */
export const getMyActiveCoupons = async () => {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_active', true)
    .or(`valid_until.is.null,valid_until.gt.${now}`)
    .order('created_at', { ascending: false });

  // Filter: current_uses < max_uses (atau max_uses null)
  const active = (data || []).filter(c =>
    c.max_uses === null || c.current_uses < c.max_uses
  );
  return { data: active, error };
};
