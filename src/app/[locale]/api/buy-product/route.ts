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

  // Fetch products from cart
  const { data: cartItems, error: fetchError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (fetchError) {
    return NextResponse.json(
      { success: false, message: fetchError.message },
      { status: 500 }
    );
  }

  // If no items in cart, return an error
  if (cartItems.length === 0) {
    return NextResponse.json(
      { success: false, message: "No items in cart" },
      { status: 400 }
    );
  }

  try {
    // Create an array to hold line items for Stripe
    const lineItems = await Promise.all(
      cartItems.map(async (item) => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", item.product_id)
          .single();

        if (error || !data) {
          throw new Error("Product not found or unauthorized");
        }

        return {
          price: data.stripe_price_id,
          quantity: item.quantity,
        };
      })
    );

    // Create Stripe checkout session with multiple line items
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${req.headers.get(
        "origin"
      )}/donate-with-checkout/payment-result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        user_id: userId,
        products: JSON.stringify(
          cartItems.map((item) => ({
            id: item.product_id,
            quantity: item.quantity,
          }))
        ),
      },
    });

    // Increase solded quantity in products table for each product in cart
    await Promise.all(
      cartItems.map(async (item) => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", item.product_id)
          .single();

        if (error || !data) {
          throw new Error("Product not found or unauthorized");
        }

        const { error: updateError } = await supabase
          .from("products")
          .update({ solded_quantity: data.solded_quantity + item.quantity })
          .eq("id", item.product_id);

        if (updateError) {
          console.error("Error updating solded quantity:", updateError);
        }
      })
    );

    // Clean up cart items
    await Promise.all(
      cartItems.map(async (item) => {
        await supabase.from("cart").delete().eq("id", item.id);

        // Change in_cart status to false in products table for the deleted product
        const { error: updateError } = await supabase
          .from("products")
          .update({ in_cart: false })
          .eq("id", item.product_id);

        if (updateError) {
          console.error("Error updating in_cart status:", updateError);
        }
      })
    );

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
