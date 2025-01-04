import { getSupabase } from "../../../../lib/supabaseAuth";
import { NextRequest } from "next/server";
import { User, Error } from "@supabase/supabase-js"; // Import Supabase types

export async function GET(req: NextRequest): Promise<Response> {
  const supabase = getSupabase();

  // Correctly typing the response
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error || !user) {
    return new Response("Error signing in with GitHub", { status: 400 });
  }

  // Handle the GitHub OAuth flow, replace with actual callback URL
  return new Response("Redirecting to GitHub...", {
    status: 302,
    headers: {
      Location: "/some-github-callback-url", // Replace with actual redirect URL after GitHub authentication
    },
  });
}
