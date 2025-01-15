import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function POST(req: Request) {
  const supabase = await createClient();

  // Get user ID
  const userData = await GetUserData();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    // Parse request body for product ID
    const { productId } = (await req.json()) as { productId: string };

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Retrieve product from Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: "Product not found or unauthorized" },
        { status: 404 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: data.stripe_price_id,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "origin"
      )}/donate-with-checkout/payment-result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        user_id: userId,
        product_id: productId,
        product_name: data?.name || ("Unknown Product" as string),
        stripe_price_id: data?.stripe_price_id || "N/A as string",
        stripe_product_id: data?.stripe_product_id || "N/A as string",
      },
    });

    return NextResponse.json(
      { success: true, sessionId: session.id, url: session.url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
