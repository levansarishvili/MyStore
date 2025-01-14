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
  } catch (err) {
    console.error(err);
    return <PageNotFound />;
  }
}
