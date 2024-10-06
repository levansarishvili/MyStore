// This file is a server component by default in Next.js
import ProductDetails from "./ProductDetails";

// Define the `generateStaticParams` function
export async function generateStaticParams() {
  const response = await fetch(
    "https://dummyjson.com/products/category/sports-accessories"
  );
  const data = await response.json();

  // Return the params for each product (based on the product IDs)
  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Fetch the product data on the server side
export default async function ProductPage({ params }) {
  const { id } = params;

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  // Pass the product data to the client component
  return <ProductDetails product={product} />;
}
