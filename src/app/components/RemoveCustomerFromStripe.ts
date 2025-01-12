import { stripe } from "../../lib/stripe";
import { createClient } from "../../utils/supabase/server";

export default async function RemoveCustomerFromStripe(email: string) {
  // If user no longer exists on supabase, remove them from Stripe as well
  try {
    const supabase = await createClient();
    // Check if the user with the given email exists in Supabase
    const users = await supabase
      .from("auth.users")
      .select("*")
      .eq("email", email);

    if (!users) {
      // Delete user on stripe
      await stripe.customers.del(email);
    }
  } catch (error) {}
}
