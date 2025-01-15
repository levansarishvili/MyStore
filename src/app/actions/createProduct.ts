import Stripe from "stripe";
import { createClient } from "../../utils/supabase/server";
import GetUserData from "../components/GetUserData";

interface stripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default async function createProduct(FormData: FormData) {
  "use server";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

  const supabase = await createClient();

  // Get user ID
  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    console.log("User is not logged in");
    return { success: false };
  }

  const name = FormData.get("name") as string;
  const price = Number(FormData.get("price"));
  const category = FormData.get("category") as string;
  const description = FormData.get("description") as string;
  const imageUrl = FormData.get("image") as string;

  let stripeProduct;
  let stripePrice;

  try {
    // Create Stripe product
    stripeProduct = await stripe.products.create({
      name: name as string,
      description: description as string,
      images: [imageUrl as string],
    });

    // Create Stripe price
    stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100),
      currency: "usd",
      product: stripeProduct?.id,
    });

    // Create product on Supabase
    const { data, error } = await supabase.from("products").insert({
      name: name,
      price: Math.round(price * 100),
      category: category,
      description: description,
      image_url: imageUrl,
      user_id: userId,
      stripe_product_id: stripeProduct?.id,
      stripe_price_id: stripePrice?.id,
    });

    if (error) {
      console.log("Failed to create product on Supabase:", error);
      return { success: false };
    }

    console.log("Product added successfully ✔");
    return { success: true };
  } catch (err) {
    console.log("Error occurred:", err);
    return { success: false };
  }
}
