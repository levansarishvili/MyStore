import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function DELETE(req: Request) {
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

  try {
    // Parse request body for product ID
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Retrieve product from Supabase
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("user_id", userId)
      .single();

    if (error || !product) {
      console.log("Product not found or unauthorized:", error);
      return NextResponse.json(
        { success: false, message: "Product not found or unauthorized" },
        { status: 404 }
      );
    }

    try {
      // Deactivate the associated price on Stripe
      await stripe.prices.update(product.stripe_price_id, { active: false });
      console.log("Price deactivated successfully ✔");
    } catch (err) {
      console.log("Failed to deactivate price on Stripe:", err);
      return NextResponse.json(
        { success: false, message: "Failed to deactivate price on Stripe" },
        { status: 500 }
      );
    }

    try {
      // Deactivate the product on Stripe
      await stripe.products.update(product.stripe_product_id, {
        active: false,
      });
      console.log("Product deactivated successfully ✔");
    } catch (err) {
      console.log("Failed to deactivate product on Stripe:", err);
      return NextResponse.json(
        { success: false, message: "Failed to deactivate product on Stripe" },
        { status: 500 }
      );
    }

    // Delete all product images from Supabase storage
    const { data: productImages, error: imagesError } = await supabase
      .from("products")
      .select("image_urls")
      .eq("id", productId)
      .single();

    if (imagesError) {
      console.log("Failed to fetch product images from Supabase:", imagesError);
      return NextResponse.json(
        { success: false, message: "Failed to fetch product images" },
        { status: 500 }
      );
    }

    const imageUrls = productImages?.image_urls || [];

    const imageNames = imageUrls.map((url: string) => {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    });

    for (const imageName of imageNames) {
      try {
        await supabase.storage.from("product-images").remove([imageName]);
        console.log(`Image ${imageName} deleted successfully ✔`);
      } catch (err) {
        console.log(`Failed to delete image ${imageName} from Supabase:`, err);
        return NextResponse.json(
          { success: false, message: "Failed to delete image" },
          { status: 500 }
        );
      }
    }

    // Delete product from Supabase
    const { data, error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", productId as string)
      .eq("user_id", userId as string);

    if (deleteError) {
      console.log("Failed to delete product from Supabase:", deleteError);
      return NextResponse.json(
        { success: false, message: "Failed to delete product" },
        { status: 500 }
      );
    }

    console.log("Product deleted successfully ✔");
    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
