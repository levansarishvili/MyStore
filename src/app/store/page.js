"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Loading from "../components/loading";
import "./Store.css";

// Fetching product data
function ProductData() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      const response = await fetch(
        "https://dummyjson.com/products/category/sports-accessories"
      );
      const data = await response.json();
      setProductData(data.products);
    }
    fetchProductData();
  }, []);

  // Handle loading state
  if (productData.length === 0) {
    return <Loading />;
  }

  // Pass the fetched data to the Store component
  return <Store products={productData} />;
}

// Create Online Store component
function Store({ products }) {
  // Handle product sorting and searching
  const [sortBy, setSortBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  // Product sorting
  let sortedProducts;

  if (sortBy === "name") {
    sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "price") {
    sortedProducts = products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "stock") {
    sortedProducts = products.sort((a, b) => b.stock - a.stock);
  }

  // Product searching
  if (searchValue) {
    sortedProducts = products.filter((product) =>
      product.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }
  console.log(products);
  console.log(searchValue);

  return (
    <section className="product__list-wrapper">
      <h1 className="section__header">Products</h1>

      <div className="product__filter-wrapper">
        {/* Product Sort list */}
        <select
          className="product-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>

        {/* Product Search input */}
        <input
          className="product-search"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>

      {/* Creating product card list */}
      <div className="product__list">
        {sortedProducts.map((product, index) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.title}
            stock={product.stock}
            imageSrc={product.thumbnail}
            availabilityStatus={product.availabilityStatus}
            size={product.category}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

// Product card component
function Product({ id, name, imageSrc, availabilityStatus, stock, price }) {
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
      <Link href={`/store/${id}`}>
        <div className="product-card__content">
          <img className="product__img" src={imageSrc} alt="Product"></img>
          <h2 className="product__title">{name}</h2>
          <div className="product__desc">
            <div className="product__stock-wrapper">
              <p className={`product__availabilityStatus ${stockStatus}`}>
                {availabilityStatus}
              </p>
              <p className="product__stock">{stock}</p>
            </div>
            <p className="product__price">{`  ${price} $`}</p>
          </div>
        </div>
      </Link>

      <Button className="btn" name="Add to cart" />
    </div>
  );
}

// Exporting Product component
export default ProductData;
