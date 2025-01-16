import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Get the authenticated user
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const userData = data.user;

  // Fetch subscription status
  const { data: subscription, error: subscriptionError } = await supabase
    .from("user_profiles")
    .select("subscription_status")
    .eq("email", userData.email)
    .single();

  if (subscriptionError) {
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }

  const subscriptionStatus = subscription?.subscription_status;
  const isProMember = subscriptionStatus === "active";

  return NextResponse.json({ isProMember });
}
