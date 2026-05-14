import { supabase } from '../lib/supabase';

// ── User: submit permintaan koreksi nama ─────────────────────────
export const submitNameChangeRequest = async (oldName, newName, reason) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: new Error('Tidak login') };

  const { data, error } = await supabase
    .from('name_change_requests')
    .insert({ user_id: user.id, old_name: oldName, new_name: newName, reason })
    .select()
    .single();
  return { data, error };
};

// ── User: ambil status request terakhir milik user ───────────────
export const getMyNameChangeRequest = async () => {
  const { data, error } = await supabase
    .from('name_change_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return { data, error };
};

// ── Admin: ambil semua request (pending dulu) ────────────────────
export const getAllNameChangeRequests = async () => {
  const { data, error } = await supabase
    .from('name_change_requests')
    .select(`
      *,
      profiles:user_id ( name, email )
    `)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
};

// ── Admin: approve → update nama profil + resolve request ────────
export const approveNameChange = async (requestId, userId, newName) => {
  // 1. Update nama di profiles
  const { error: profileErr } = await supabase
    .from('profiles')
    .update({ name: newName })
    .eq('id', userId);
  if (profileErr) return { error: profileErr };

  // 2. Resolve request
  const { error } = await supabase
    .from('name_change_requests')
    .update({ status: 'approved', resolved_at: new Date().toISOString() })
    .eq('id', requestId);
  return { error };
};

// ── Admin: reject request ────────────────────────────────────────
export const rejectNameChange = async (requestId, adminNote) => {
  const { error } = await supabase
    .from('name_change_requests')
    .update({ status: 'rejected', admin_note: adminNote, resolved_at: new Date().toISOString() })
    .eq('id', requestId);
  return { error };
};
