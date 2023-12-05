import { createClient } from "@supabase/supabase-js";

const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

async function removeAllMfaFactors() {
  const { data: factors, error } = await supabase.auth.mfa.listFactors();
  if (error) {
    throw error;
  }
  for (const factor of factors) {
    await supabase.auth.mfa.unenroll({ factorId: factor.id });
  }
}

export default async function handler(req, res) {
  try {
    await removeAllMfaFactors();
    const { user, error: updateError } = await supabase.auth.update({
      data: { app_metadata: { mfa_level: "aal1" } },
    });
    if (updateError) {
      throw updateError;
    }
    res
      .status(200)
      .json({ success: true, mfa_level: user.app_metadata.mfa_level });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
