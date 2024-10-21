import ProductDetails from "./ProductDetails";
import PageNotFound from "../../components/PageNotFound";
import React, { Suspense } from "react";

// Fetch product data from API according to product ID
export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  console.log(id);
  let product;
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      // Handle non-200 status codes
      return <PageNotFound />;
    }

    product = await response.json();
  } catch (err) {
    console.error(err);
  }

  // Pass the product data to the ProductDetails component
  return <ProductDetails product={product} />;
}
