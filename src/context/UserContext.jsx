import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const UserContext = createContext();

// ─── Streak Helpers ────────────────────────────────────────────────
function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}
function diffDays(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}
function initStreakFromStorage() {
  const today      = getTodayStr();
  const lastActive = localStorage.getItem('latih_last_active') || '';
  const saved      = parseInt(localStorage.getItem('latih_streak') || '0');
  if (!lastActive) return 0;
  return diffDays(lastActive, today) <= 1 ? saved : 0;
}

// ─── Provider ─────────────────────────────────────────────────────
export function UserProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser]       = useState(null);   // profil dari tabel profiles
  const [xp, setXp]           = useState(0);
  const [streak, setStreak]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);

  // Sync streak ke localStorage
  useEffect(() => {
    localStorage.setItem('latih_streak', streak.toString());
  }, [streak]);

  // ── Load profil dari Supabase ────────────────────────────────
  const loadProfile = async (userId) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Profil belum ada (mungkin trigger gagal) — buat baru
      if (error && error.code === 'PGRST116') {
        const { data: authUser } = await supabase.auth.getUser();
        const fallbackName =
          authUser?.user?.user_metadata?.name ||
          authUser?.user?.email?.split('@')[0] ||
          'Pengguna';
        const authEmail = authUser?.user?.email || null;

        const { data: newProfile, error: createErr } = await supabase
          .from('profiles')
          .insert({ id: userId, name: fallbackName, email: authEmail })
          .select()
          .single();

        if (createErr) throw createErr;
        data = newProfile;
      } else if (error) {
        throw error;
      }

      if (data) {
        // Sync email dari auth ke profiles jika belum ada
        if (!data.email) {
          const { data: authUser } = await supabase.auth.getUser();
          const authEmail = authUser?.user?.email;
          if (authEmail) {
            await supabase.from('profiles').update({ email: authEmail }).eq('id', userId);
            data = { ...data, email: authEmail };
          }
        }
        setUser(data);
        setXp(data.xp || 0);
        setStreak(initStreakFromStorage());
        // Profil dianggap belum lengkap jika whatsapp atau job_role kosong
        setNeedsProfileCompletion(!data.whatsapp || !data.job_role);
      }
    } catch (err) {
      console.error('Gagal load profil:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Auth State Listener ──────────────────────────────────────
  useEffect(() => {
    // Cek session awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
      else setLoading(false);
    });

    // Dengarkan perubahan auth (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Jika email belum dikonfirmasi, abaikan session agar user tetap di halaman verifikasi
        if (session && !session.user.email_confirmed_at) {
          setLoading(false);
          return;
        }
        setSession(session);
        if (session) {
          loadProfile(session.user.id);
        } else {
          setUser(null);
          setXp(0);
          setStreak(0);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── markActiveToday ──────────────────────────────────────────
  const markActiveToday = () => {
    const today      = getTodayStr();
    const lastActive = localStorage.getItem('latih_last_active') || '';
    if (lastActive === today) return;

    const gap = lastActive ? diffDays(lastActive, today) : 999;
    setStreak(prev => {
      const next = gap === 1 ? prev + 1 : 1;
      localStorage.setItem('latih_streak', next.toString());
      // Sync streak ke Supabase juga
      if (session) {
        supabase.from('profiles').update({ streak: next }).eq('id', session.user.id);
      }
      return next;
    });
    localStorage.setItem('latih_last_active', today);
  };

  // ── addXp ────────────────────────────────────────────────────
  const addXp = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    markActiveToday();
    // Sync ke Supabase
    if (session) {
      supabase.from('profiles').update({ xp: newXp }).eq('id', session.user.id);
    }
  };

  // ── Auth Actions ─────────────────────────────────────────────
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const resendVerification = async (email) => {
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    return { error };
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}?reset_password=1`,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    return { error };
  };

  const signUp = async (email, password, name, jobRole, whatsapp) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }, // trigger auto-create profile pakai nama ini
    });
    if (!error && data.user) {
      // Update job_role, nama, dan whatsapp (opsional)
      try {
        const updates = { name, job_role: jobRole };
        if (whatsapp && whatsapp.trim()) updates.whatsapp = whatsapp.trim();
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', data.user.id);
      } catch (_) { /* abaikan — profile akan dibuat oleh trigger */ }
    }
    // needsVerification = true artinya email confirmation required (session null)
    const needsVerification = !error && !data?.session;
    return { data, error, needsVerification };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // Bersihkan localStorage
    localStorage.removeItem('industrilearn_page');
    localStorage.removeItem('iso9001_topicId');
    localStorage.removeItem('iso9001_subLessonId');
  };

  // ── Update profil ────────────────────────────────────────────
  const updateProfile = async (updates) => {
    if (!session) return { error: new Error('Tidak login') };
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single();
    if (!error && data) {
      setUser(data);
      // Re-cek apakah profil sudah lengkap setelah update
      setNeedsProfileCompletion(!data.whatsapp || !data.job_role);
    }
    return { data, error };
  };

  const value = {
    session,
    user,
    xp,
    streak,
    loading,
    needsProfileCompletion,
    addXp,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile,
    resendVerification,
    resetPassword,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser harus di dalam UserProvider');
  return ctx;
}
