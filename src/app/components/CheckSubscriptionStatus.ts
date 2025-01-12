import { createClient } from "../../utils/supabase/server";

export default async function CheckSubscriptionStatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const userData = data?.user;

  // Get subscription status
  const subscription = await supabase
    .from("user_profiles")
    .select("subscription_status")
    .eq("email", userData?.email)
    .single();
  const subscriptionStatus = subscription.data?.subscription_status;
  const isProMember = subscriptionStatus === "active";

  return isProMember;
}
