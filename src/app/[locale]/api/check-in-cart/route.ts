import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

// Check if product is in cart
export async function GET(req: Request) {
  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  // Extract productId from the request URL
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { success: false, message: "Product ID is required" },
      { status: 400 }
    );
  }

  // Query Supabase to check if the product is in the cart
  const { data, error } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, inCart: !!data }, { status: 200 });
}
