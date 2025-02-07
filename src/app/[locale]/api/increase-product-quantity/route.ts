import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function POST(req: Request) {
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
    const { productId } = (await req.json()) as { productId: number };

    const { data, error } = await supabase
      .from("cart")
      .select("quantity")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const newQuantity = data.quantity + 1;

    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity: newQuantity })
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (updateError) {
      return NextResponse.json(
        { success: false, message: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product quantity increased successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error increasing product quantity:", error);
    return NextResponse.json(
      { success: false, message: "Failed to increase product quantity" },
      { status: 500 }
    );
  }
}
