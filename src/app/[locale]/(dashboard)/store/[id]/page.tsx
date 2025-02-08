import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { ProductsType } from "../page";
import GetUserData from "src/app/components/GetUserData";
import SimilarProducts from "./SimilarProducts";

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

  // Fetch max 4 similar products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category", product?.category)
    .not("id", "eq", product?.id)
    .limit(4);

  if (productsError) {
    console.error("Error fetching products:", productsError);
    return null;
  }

  // Check if product is in cart
  const { data: cartProductIds, error: cartError } = (await supabase
    .from("cart")
    .select("product_id")
    .eq("user_id", userId)) as { data: { product_id: number }[]; error: any };

  if (cartError) {
    console.error("Error fetching cart:", cartError);
    return null;
  }

  let isInCart = false;

  if (cartProductIds.find((item) => item.product_id === Number(product?.id))) {
    isInCart = true;
  }

  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <ProductDetails product={product} isInCart={isInCart} locale={locale} />
      <SimilarProducts
        products={products}
        locale={locale}
        cartProductIds={cartProductIds}
      />
    </section>
  );
}
