import { supabase } from '../lib/supabase';

// ── Helper: kirim notifikasi email ke user ────────────────────────
const sendNameChangeEmail = async ({ email, user_name, old_name, new_name, status, admin_note }) => {
  try {
    await supabase.functions.invoke('send-name-change-email', {
      body: { email, user_name, old_name, new_name, status, admin_note },
    });
  } catch (e) {
    // Email gagal tidak boleh menghentikan alur utama
    console.warn('Email notifikasi gagal dikirim:', e.message);
  }
};

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

// ── Admin: approve → update nama profil + resolve request + kirim email ──
export const approveNameChange = async (requestId, userId, newName, userEmail, oldName, userName) => {
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

  // 3. Kirim email notifikasi (tidak block meski gagal)
  if (!error && userEmail) {
    await sendNameChangeEmail({
      email: userEmail,
      user_name: userName,
      old_name: oldName,
      new_name: newName,
      status: 'approved',
      admin_note: '',
    });
  }

  return { error };
};

// ── Admin: reject request + kirim email ──────────────────────────
export const rejectNameChange = async (requestId, adminNote, userEmail, oldName, newName, userName) => {
  const { error } = await supabase
    .from('name_change_requests')
    .update({ status: 'rejected', admin_note: adminNote, resolved_at: new Date().toISOString() })
    .eq('id', requestId);

  // Kirim email notifikasi (tidak block meski gagal)
  if (!error && userEmail) {
    await sendNameChangeEmail({
      email: userEmail,
      user_name: userName,
      old_name: oldName,
      new_name: newName,
      status: 'rejected',
      admin_note: adminNote,
    });
  }

  return { error };
};
