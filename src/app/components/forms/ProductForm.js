"use client";

import { useState } from "react";
import { handleAddProduct } from "../functions/handleAddProduct";

export default function ProductForm({ products, setProducts }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [inStock, setInStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(
      products,
      "products",
      setProducts,
      id,
      title,
      price,
      availabilityStatus,
      inStock
    );
    setId("");
    setTitle("");
    setPrice("");
    setAvailabilityStatus("");
    setInStock("");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="id">Product ID:</label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Product Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availabilityStatus">Availability:</label>
        <input
          type="text"
          id="availabilityStatus"
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="inStock">Stock Quantity:</label>
        <input
          type="number"
          id="inStock"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>
  );
}
