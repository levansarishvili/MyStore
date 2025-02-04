import { AddUserOnStripe } from "src/app/components/AddUserOnStripe";
import { createClient } from "../../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || "/profile"; // Default redirect
  const origin = requestUrl.origin;

  const supabase = await createClient();

  // Step 1: Exchange the auth code for a session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/error`);
    }
  }

  // Step 2: Fetch authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const email = user?.email;
  console.log("Email:", email);

  if (email) {
    // Add user to Stripe
    await AddUserOnStripe(email);
  }

  if (userError || !user) {
    console.error("Failed to fetch user:", userError);
    return NextResponse.redirect(`${origin}/error`);
  }

  // Step 3: Redirect user to the intended destination
  return NextResponse.redirect(`${origin}${redirectTo}`);
}
