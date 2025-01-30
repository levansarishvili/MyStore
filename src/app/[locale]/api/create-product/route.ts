import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function POST(req: Request) {
  const { name, price, category, description, images } = await req.json();

  if (
    !name ||
    !price ||
    !category ||
    !description ||
    !images ||
    images.length === 0
  ) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images,
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100),
      currency: "usd",
      product: stripeProduct.id,
    });

    const { error } = await supabase.from("products").insert({
      name,
      price: Math.round(price * 100),
      category,
      description,
      image_urls: images, // Store as an array
      user_id: userId,
      stripe_product_id: stripeProduct.id,
      stripe_price_id: stripePrice.id,
    });

    if (error) {
      console.error("Failed to create product:", error);
      return NextResponse.json(
        { success: false, message: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
