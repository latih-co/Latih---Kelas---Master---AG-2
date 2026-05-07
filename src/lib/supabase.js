import { createClient } from '@supabase/supabase-js';

// ⚠️ Ganti dengan URL dan anon key dari project Supabase kamu
// Settings → API → Project URL & Project API Keys → anon public
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  throw new Error('VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum diisi di file .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
