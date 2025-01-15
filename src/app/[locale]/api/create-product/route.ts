import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../../../utils/supabase/server"; // adjust the path as necessary
import GetUserData from "../../../components/GetUserData"; // adjust the path as necessary

export async function POST(req: Request) {
  const { name, price, category, description, image } = await req.json();

  // Validate required fields
  if (!name || !price || !category || !description || !image) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

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

  let stripeProduct;
  let stripePrice;

  try {
    // Create Stripe product
    stripeProduct = await stripe.products.create({
      name,
      description,
      images: [image],
    });

    // Create Stripe price
    stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100),
      currency: "usd",
      product: stripeProduct.id,
    });

    // Create product in Supabase
    const { data, error } = await supabase.from("products").insert({
      name,
      price: Math.round(price * 100),
      category,
      description,
      image_url: image,
      user_id: userId,
      stripe_product_id: stripeProduct.id,
      stripe_price_id: stripePrice.id,
    });

    if (error) {
      console.log("Failed to create product on Supabase:", error);
      return NextResponse.json(
        { success: false, message: "Failed to create product" },
        { status: 500 }
      );
    }

    console.log("Product added successfully ✔");
    return NextResponse.json(
      { success: true, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
