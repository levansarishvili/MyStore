import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";

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
  // let product: ProductsType | null = null;

  try {
    const { data, error } = await supabase
      .from("products_old")
      .select("*")
      .eq("id", id)
      .single();

    product = data;
  } catch (err) {
    console.error(err);
    return <PageNotFound />;
  }

  // Ensure product is not null before passing it to ProductDetails
  if (!product) {
    return <PageNotFound />;
  }

  // Pass the product data to the ProductDetails component
  return <ProductDetails product={product} />;
}
