"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "../../config";
import { formatAmountForStripe } from "../../utils/stripe-helpers";
import { stripe } from "../../lib/stripe";
import { createClient } from "../../utils/supabase/server";

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = "hosted";

  if (!ui_mode) {
    throw new Error("uiMode is required.");
  }

  // Get authenticated user customer ID from stripe
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userData = user.data.user;

  if (!userData) {
    throw new Error("User is not authenticated.");
  }

  const customerId = await supabase
    .from("user_profiles")
    .select("stripe_customer_id")
    .eq("email", userData.email)
    .single();

  const origin: string = headers().get("origin") || "http://localhost:3000";

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId.data?.stripe_customer_id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Pro Subscription",
            },
            unit_amount: formatAmountForStripe(29, CURRENCY),
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/donate-with-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}`,
      }),

      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

// export async function createPaymentIntent(
//   data: FormData
// ): Promise<{ client_secret: string }> {
//   const paymentIntent: Stripe.PaymentIntent =
//     await stripe.paymentIntents.create({
//       amount: formatAmountForStripe(
//         Number(data.get("customDonation") as string),
//         CURRENCY
//       ),
//       automatic_payment_methods: { enabled: true },
//       currency: CURRENCY,
//     });

//   return { client_secret: paymentIntent.client_secret as string };
// }
