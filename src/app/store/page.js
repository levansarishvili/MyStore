"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import "./Store.css";

// Fetching product data
function ProductData() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://dummyjson.com/products/category/sports-accessories"
      );
      const data = await response.json();
      setProductData(data.products);
    }
    fetchData();
  }, []);

  // Handle loading state
  if (productData.length === 0) {
    return <div>Loading...</div>;
  }

  // Pass the fetched data to the Store component
  return <Store products={productData} />;
}

// Create Online Store component
function Store({ products }) {
  return (
    <main className="main">
      <section className="store-wrapper">
        <h1 className="section__header">ოფიციალური მაღაზია</h1>
        <div className="store">
          {products.map((product, index) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.title}
              imageSrc={product.thumbnail}
              color={product.brand}
              size={product.category}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Product card component
function Product({ id, name, imageSrc, color, size, price }) {
  return (
    <div className="product-card">
      <Link href={`/store/${id}`}>
        <img className="product__img" src={imageSrc} alt="Product"></img>
        <h2 className="product__title">{name}</h2>
        <div className="product__desc">
          <p className="product__color">{color}</p>
          <p className="product__size">{size}</p>
          <p className="product__price">{`${price} ₾`}</p>
        </div>
      </Link>
      {/* Link without <a> tag */}
      <Button className="btn" name="ADD TO CART" />
    </div>
  );
}

// Exporting Product component
export default ProductData;
