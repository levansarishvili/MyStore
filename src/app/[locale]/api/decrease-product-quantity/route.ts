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

    // Fetch the current quantity to check if we can decrement it
    const { data: cartItem, error: fetchError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { success: false, message: fetchError.message },
        { status: 500 }
      );
    }

    if (cartItem?.quantity <= 1) {
      return NextResponse.json(
        { success: false, message: "Quantity cannot be decreased further" },
        { status: 400 }
      );
    }

    // Decrease the quantity
    const { error } = await supabase
      .from("cart")
      .update({ quantity: cartItem.quantity - 1 })
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product quantity decreased successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
    return NextResponse.json(
      { success: false, message: "Failed to decrease product quantity" },
      { status: 500 }
    );
  }
}
