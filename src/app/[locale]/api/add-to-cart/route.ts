import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";
import { ProductsType } from "../../(dashboard)/store/page";

export async function POST(req: Request) {
  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id;

  // Parse request body for product ID
  const { productId } = (await req.json()) as { productId: string };

  if (!productId) {
    return NextResponse.json(
      { success: false, message: "Product ID is required" },
      { status: 400 }
    );
  }

  //   Fetch product from Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);
  const product = data?.[0];

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    // Add product in cart
    const { data, error } = await supabase.from("cart").insert({
      user_id: userId,
      product_id: productId,
      name: product?.name,
      price: product?.price,
      image_url: product?.image_urls?.[0],
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
