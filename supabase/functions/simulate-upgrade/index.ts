// @ts-nocheck
// Supabase Edge Function: simulate-upgrade
// ⚠️ DEV ONLY — Hapus sebelum production launch
// Langsung update registrasi ke premium + quiz_unlocked tanpa pembayaran

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { registration_id } = await req.json();
    if (!registration_id) throw new Error("registration_id diperlukan");

    // ── Gunakan service_role_key untuk bypass RLS ──────────────
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    // ── Verifikasi user yang memanggil (dari token auth) ────────
    const authHeader = req.headers.get("Authorization") || "";
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (authError || !user) throw new Error("Unauthorized");

    // ── Pastikan registrasi milik user ini ──────────────────────
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .select("id, user_id, package, status")
      .eq("id", registration_id)
      .eq("user_id", user.id)
      .single();

    if (regError || !reg) throw new Error("Registrasi tidak ditemukan atau bukan milikmu");
    if (reg.package === "premium") throw new Error("Registrasi sudah premium");

    // ── Update: free → premium + buka kuis ─────────────────────
    const { error: updateError } = await supabase
      .from("registrations")
      .update({ package: "premium", status: "quiz_unlocked" })
      .eq("id", registration_id);

    if (updateError) throw new Error("Gagal update registrasi: " + updateError.message);

    console.log(`[simulate-upgrade] reg ${registration_id} → premium + quiz_unlocked (user: ${user.id})`);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[simulate-upgrade] error:", err.message);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
