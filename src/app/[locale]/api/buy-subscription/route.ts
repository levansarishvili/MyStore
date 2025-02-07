import { NextResponse } from "next/server";
import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "../../../../config";
import { formatAmountForStripe } from "../../../../utils/stripe-helpers";
import { stripe } from "../../../../lib/stripe";
import { createClient } from "../../../../utils/supabase/server";

export async function POST(req: Request) {
  try {
    const ui_mode = "hosted";
    if (!ui_mode) {
      return NextResponse.json(
        { error: "uiMode is required." },
        { status: 400 }
      );
    }

    // Get authenticated user customer ID from Stripe
    const supabase = await createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.user) {
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const userData = user.user;
    const { data: customerId, error: customerError } = await supabase
      .from("user_profiles")
      .select("stripe_customer_id")
      .eq("email", userData.email)
      .single();

    if (customerError || !customerId?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Stripe customer ID not found." },
        { status: 400 }
      );
    }

    const origin: string = headers().get("origin") || "http://localhost:3000";

    // Create Stripe checkout session
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId.stripe_customer_id,
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
          success_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout/cancel`,
        }),
        ui_mode,
      });

    return NextResponse.json({
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
