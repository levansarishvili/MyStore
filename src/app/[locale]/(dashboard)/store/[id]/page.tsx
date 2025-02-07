import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { ProductsType } from "../page";
import GetUserData from "src/app/components/GetUserData";

interface paramsType {
  params: {
    id: string;
    locale: string;
  };
}

// Fetch product data from API according to product ID
export default async function ProductDetailsPage({ params }: paramsType) {
  const { id } = params;
  let product: ProductsType | null = null;
  const locale = params.locale;

  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    console.error("User ID not found");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    product = data as ProductsType;
  } catch (err) {
    console.error(err);
    return <PageNotFound />;
  }

  // Check if product is in cart
  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", id)
    .eq("user_id", userId);

  if (cartError) {
    console.error("Error fetching cart:", cartError);
    return null;
  }

  let isInCart = false;

  if (cart?.length > 0) {
    isInCart = true;
  }

  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <ProductDetails product={product} isInCart={isInCart} locale={locale} />
    </section>
  );
}
