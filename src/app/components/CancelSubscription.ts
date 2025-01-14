import { stripe } from "../../lib/stripe";
import { createClient } from "../../utils/supabase/server";
import CheckSubscriptionStatus from "./CheckSubscriptionStatus";
import GetUserData from "./GetUserData";

export default async function CancelSubscription() {
  const supabase = await createClient();

  // Get user data
  const userData = await GetUserData();

  // Get subscription status
  const isProMember = await CheckSubscriptionStatus();

  //   Get subscription ID
  const subscription = await supabase
    .from("user_profiles")
    .select("subscription_id")
    .eq("email", userData?.email)
    .single();
  const subscriptionId = subscription.data?.subscription_id;

  // Cancel subscription
  if (isProMember) {
    await supabase
      .from("user_profiles")
      .update({ subscription_status: "canceled", subscription_id: null })
      .eq("email", userData?.email);

    //   Cancel subscription on Stripe
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }
}
