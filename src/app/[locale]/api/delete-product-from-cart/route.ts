import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function DELETE(req: Request) {
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

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product removed from cart." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to remove product from cart." },
      { status: 500 }
    );
  }
}
