"use client";


import ProductFilter from "../../components/ProductFilter";

import "./Store.css";
import useProductsUrl from "../../hooks/useProductsUrl";
import useFetchProducts from "../../hooks/useFetchProducts";

import { handleDelete } from "../../components/handleDelete";
import "../../mediaQueries.css";
import ProductItem from "./ProductItem"

export default function Store({ searchParams }) {
  // Extracting search query from searchParams
  const searchQuery = searchParams?.search ?? "";

  // Extracting category filter query from searchParams
  const filter = searchParams?.category ?? "all";

  // Extracting sort query from searchParams
  const sortOptions = searchParams?.sortBy ?? "";

  const productsUrl = useProductsUrl(searchQuery, sortOptions, filter);

  const { products, setProducts } = useFetchProducts(productsUrl);

  return (
    <section className="product__page-wrapper">
      <h1 className="section__header">Products</h1>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}


