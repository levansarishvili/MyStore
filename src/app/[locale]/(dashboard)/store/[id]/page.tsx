import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { ProductsType } from "../page";
import ImageUpload from "src/app/components/ImageUpload";

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
  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <ProductDetails product={product} />
      <div>
        <h2>Upload Product Image</h2>
        <ImageUpload />
      </div>
    </section>
  );
}
