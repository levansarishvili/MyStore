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

export async function checkAuthStatus() {
  // Fetch the user session or authenticated user
  const { data: sessionData, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error.message);
    return null;
  }

  const user = sessionData?.session?.user;
  console.log(user);
  if (user) {
    console.log("User is authenticated:", user);
    return user; // Return user data for further processing
  } else {
    console.log("No authenticated user found.");
    return null;
  }
}
