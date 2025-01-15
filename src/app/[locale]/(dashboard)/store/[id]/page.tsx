import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { ProductsType } from "../page";

interface paramsType {
  id: string;
}

// Fetch product data from API according to product ID
export default async function ProductDetailsPage({
  params,
}: {
  params: paramsType;
}) {
  const { id } = params;
  let product: ProductsType | null = null;

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
  return <ProductDetails product={product} />;
}
