import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  // Clear the cart for the user
  const { error } = await supabase.from("cart").delete().eq("user_id", userId);
  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Cart cleared." },
    { status: 200 }
  );
}
