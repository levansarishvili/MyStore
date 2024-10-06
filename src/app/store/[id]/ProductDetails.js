"use client";

import "./ProductDetails.css";

export default function ProductDetails({ product }) {
  return (
    <main className="main">
      <div className="product-details__wrapper">
        <h1 className="product-details__title">{product.title}</h1>
        <img
          className="product-details__img"
          src={product.thumbnail}
          alt={product.title}
        />
        <p className="product-details__desc">{product.description}</p>
        <p className="product-details__price">{product.price} ₾</p>
      </div>
    </main>
  );
}
