import { NextResponse } from "next/server";
import { createClient } from "src/utils/supabase/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const supabase = await createClient();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

  const {
    productId,
    name,
    description,
    images,
    newPrice,
  }: {
    productId: string;
    name: string;
    description: string;
    images: string[];
    newPrice: number;
  } = await request.json();

  // Fetch stripe_product_id and stripe_price_id from Supabase
  const { data: product, error } = (await supabase
    .from("products")
    .select("stripe_product_id, stripe_price_id,price")
    .eq("id", productId)
    .single()) as {
    data: { stripe_product_id: string; stripe_price_id: string; price: number };
    error: any;
  };

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  try {
    if (newPrice) {
      // Create a new price
      const newPriceObject = await stripe.prices.create({
        unit_amount: Number(newPrice),
        currency: "usd",
        product: product.stripe_product_id,
      });

      // Deactivate the old price
      await stripe.prices.update(product.stripe_price_id, {
        active: false,
      });

      // Update Supabase with the new Stripe price ID
      await supabase
        .from("products")
        .update({ stripe_price_id: newPriceObject.id })
        .eq("id", productId);
    }

    // Update product details on Stripe
    const updatedProduct = await stripe.products.update(
      product.stripe_product_id,
      {
        name,
        description,
        images,
      }
    );

    // Return the updated product details
    return NextResponse.json(
      { product: updatedProduct, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update product on Stripe", error: error.message },
      { status: 500 }
    );
  }
}
