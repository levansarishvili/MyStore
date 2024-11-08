"use client";

import { useSearchParams } from "next/navigation";
import ProductFilter from "../../../components/filters/ProductFilter";
import useProductsUrl from "../../../hooks/useProductsUrl";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { useState } from "react";
import { handleDelete } from "../../../components/functions/handleDelete";
import { handleEdit } from "../../../components/functions/handleEdit";
import ProductItem from "./ProductItem";
import ProductEditForm from "../../../components/forms/ProductEditForm";
import ProductAddForm from "../../../components/forms/ProductAddForm";

export default function Store() {
  // Access search params directly
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const filter = searchParams.get("category") ?? "all";
  const sortOptions = searchParams.get("sortBy") ?? "";

  // Create products URL and fetch products
  const productsUrl = useProductsUrl(searchQuery, sortOptions, filter);
  const { products, setProducts } = useFetchProducts(productsUrl);

  // For edit form
  const [currentProduct, setCurrentProduct] = useState({});
  const [active, setActive] = useState(false);

  return (
    <section className="product__page-wrapper flex flex-col items-center gap-20 w-full">
      {/* Conditional rendering of edit form */}
      {active ? (
        <ProductEditForm
          currentProduct={currentProduct}
          products={products}
          setProducts={setProducts}
          setActive={setActive}
        />
      ) : null}
      <h1 className="section__header text-5xl font-semibold">Products</h1>

      <div className="product__page-content flex items-start justify-between w-full gap-32">
        <div className="product__settings-wrapper flex flex-col gap-16">
          <ProductAddForm products={products} setProducts={setProducts} />
          <ProductFilter />
        </div>

        <div className="product__list flex gap-16 flex-wrap justify-center">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.title}
              imageSrc={product.thumbnail}
              availabilityStatus={product.availabilityStatus}
              stock={product.stock}
              price={product.price}
              onDelete={() =>
                handleDelete(products, "products", product.id, setProducts)
              }
              onEdit={() =>
                handleEdit(
                  products,
                  "products",
                  product.id,
                  setProducts,
                  setActive,
                  setCurrentProduct
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
