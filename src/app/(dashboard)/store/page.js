"use client";

import ProductFilter from "../../components/filters/ProductFilter";
import "./Store.css";
import useProductsUrl from "../../hooks/useProductsUrl";
import useFetchProducts from "../../hooks/useFetchProducts";
import { useState } from "react";
import { handleDelete } from "../../components/functions/handleDelete";
import { handleEdit } from "../../components/functions/handleEdit";
import "../../mediaQueries.css";
import ProductItem from "./ProductItem";
import ProductEditForm from "../../components/forms/ProductEditForm";
import ProductForm from "../../components/forms/ProductForm";

export default function Store({ searchParams }) {
  // Extract query parameters
  const searchQuery = searchParams?.search ?? "";
  const filter = searchParams?.category ?? "all";
  const sortOptions = searchParams?.sortBy ?? "";

  // Create products URL and fetch products
  const productsUrl = useProductsUrl(searchQuery, sortOptions, filter);
  const { products, setProducts } = useFetchProducts(productsUrl);

  // For edit form
  const [currentProduct, setCurrentProduct] = useState({});
  const [active, setActive] = useState(false);

  return (
    <section className="product__page-wrapper">
      {/* Conditional rendering of edit form */}
      {active ? (
        <ProductEditForm
          currentProduct={currentProduct}
          products={products}
          setProducts={setProducts}
          setActive={setActive}
        />
      ) : null}
      <h1 className="section__header">Products</h1>

      <ProductForm products={products} setProducts={setProducts} />

      <div className="product__page-content">
        <ProductFilter />
        <div className="product__list">
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
