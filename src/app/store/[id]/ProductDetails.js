"use client";

import "./ProductDetails.css";
import Button from "../../components/Button.js";

export default function ProductDetails({ product }) {
  return (
    <div className="product-details__wrapper">
      <h1 className="section-header">Product Details</h1>
      <div className="product-details__content">
        {/* Product Details */}

        <div className="product-img-wrapper">
          <img
            className="product-details__img"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Product Settings */}
        <div className="product-details">
          <div className="product-desc-wrapper">
            <h2 className="product-details__title">{product.title}</h2>
            <p className="product-details__category">{product.category}</p>
            <p className="product-details__desc">{product.description}</p>
          </div>

          <div className="stock-wrapper">
            <p
              className={`product-details__availability ${
                product.availabilityStatus === "In Stock"
                  ? "in-stock"
                  : product.availabilityStatus === "Low Stock"
                  ? "low-stock"
                  : "out-of-stock"
              }`}
            >
              {product.availabilityStatus}:
            </p>
            <p className="product-details__stock">{product.stock}</p>
          </div>

          <p className="product-details__price">Price: {product.price} $</p>

          <div className="btn-wrapper">
            <Button className="btn wishlist-btn" name="&#10084; Wishlist" />
            <Button className="btn" name="Add to cart" />
          </div>
        </div>
      </div>
    </div>
  );
}
