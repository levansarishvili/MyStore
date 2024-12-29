import { supabase } from "../../lib/supabaseClient";

export default async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://trsiucvoloylukdbsoaf.supabase.co/auth/v1/callback",
    },
  });

  if (error) {
    console.error("Error during sign-in:", error.message);
    return null;
  }

  if (data.url) {
    // Redirect to GitHub sign-in page
    window.location.assign(data.url);
  }
}
