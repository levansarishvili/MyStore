"use client";

// *** Server side solution ***
// export default async function ProductPage({ params }) {
//   const { id } = params;
//   const response = await fetch(`https://dummyjson.com/products/${id}`);
//   const product = await response.json();
//   // Pass the product data to the ProductDetails component

//   return <ProductDetails product={product} />;
// }

import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import Loading from "../../components/loading";
import PageNotFound from "../../components/PageNotFound";

export default function ProductPage({ params }) {
  const { id } = params;
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle page not found
  if (error) {
    return <PageNotFound />;
  }

  // Handle loading state
  if (productDetails.length === 0) {
    return <Loading />;
  }
  // Pass the product data to the ProductDetails component
  return <ProductDetails product={productDetails} />;
}
