"use client";

import Link from "next/link";
import Button from "../components/Button";
import ProductFilter from "../components/ProductFilter";
import Image from "next/image";
import "./Store.css";
import "../mediaQueries.css";
import useProductsUrl from "../hooks/useProductsUrl";
import useFetchProducts from "../hooks/useFetchProducts";
import DeleteButton from "../components/DeleteButton";
import { handleDelete } from "../components/handleDelete";

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
            <Product
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

// Product card component
function Product({
  id,
  name,
  imageSrc,
  availabilityStatus,
  stock,
  price,
  onDelete,
}) {
  let stockStatus = "";
  if (availabilityStatus === "In Stock") {
    stockStatus = "in-stock";
  } else if (availabilityStatus === "Low Stock") {
    stockStatus = "low-stock";
  } else {
    stockStatus = "out-of-stock";
  }

  return (
    <div className="product-card">
      <Link className="product__link" href={`/store/${id}`}>
        {/* <img className="product__img" src={imageSrc} alt="Product"></img> */}
        <div className="product__img-wrapper">
          <Image
            className="product__img"
            src={imageSrc}
            alt={name}
            width={100}
            height={100}
            quality={50}
            priority={true}
          />
        </div>

        <div className="product-card__content">
          <h2 className="product__title">{name}</h2>
          <div className="product__desc">
            <div className="product__stock-wrapper">
              <p className={`product__availabilityStatus ${stockStatus}`}>
                {availabilityStatus}:
              </p>
              <p className="product__stock">{stock}</p>
            </div>
            <p className="product__price">{`${price} $`}</p>
          </div>
        </div>
      </Link>
      <div className="buttons">
        <Button className="btn" name="Add to cart" />
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
}
