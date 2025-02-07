import { stripe } from "src/lib/stripe";
import GetUserData from "./GetUserData";
import { createClient } from "src/utils/supabase/server";

export async function AddUserOnStripe(email: string) {
  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id as string;

  // Get user name and email
  const customerName = userData?.user_metadata.full_name ?? "test_user";

  // Check if the customer already exists in Stripe
  const existingCustomer = await stripe.customers.list({
    email: email,
  });

  if (existingCustomer.data.length > 0) {
    return existingCustomer.data[0];
  }

  // Create a new customer in Stripe
  const stripeCustomer = await stripe.customers.create({
    email: email,
    name: customerName,
  });

  const stripeCustomerId = stripeCustomer?.id;
  console.log("New Stripe Customer ID:", stripeCustomerId);

  // Add user to Supabase in the `user_profiles` table with the customer ID from Stripe
  const { error } = await supabase.from("user_profiles").insert([
    {
      user_id: userId,
      email: email,
      subscription_id: null,
      stripe_customer_id: stripeCustomerId,
      subscription_status: null,
    },
  ]);

  if (error) {
    console.error("Error inserting user into Supabase:", error.message);
    throw new Error("Failed to insert user into Supabase");
  }

  return stripeCustomer;
}
