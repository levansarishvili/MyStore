"use client";

import { useState } from "react";
import { handleAddProduct } from "../functions/handleAddProduct";
import "./ProductAddForm.css";

export default function ProductForm({ products, setProducts }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("In Stock");
  const [inStock, setInStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(
      products,
      "products",
      setProducts,
      title,
      price,
      availabilityStatus,
      inStock
    );

    setTitle("");
    setPrice("");
    setAvailabilityStatus("");
    setInStock("");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="product-add-form-label" htmlFor="title">
          Product Title:
        </label>
        <input
          className="product-add-input"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="product-add-form-label" htmlFor="price">
          Price:
        </label>
        <input
          className="product-add-input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="product-add-form-label" htmlFor="availabilityStatus">
          Availability Status:
        </label>
        <select
          className="product-add-input"
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
          id="availabilityStatus"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
      <div className="form-group">
        <label className="product-add-form-label" htmlFor="inStock">
          Stock Quantity:
        </label>
        <input
          className="product-add-input"
          type="number"
          id="inStock"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="product-add-form-btn">
        Add Product
      </button>
    </form>
  );
}
