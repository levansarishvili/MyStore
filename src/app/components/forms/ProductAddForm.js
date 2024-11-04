"use client";

import { useState } from "react";
import { handleAddProduct } from "../functions/handleAddProduct";

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
    <form
      className="product-form dark:bg-[#313131] flex flex-col items-center justify-center gap-6 bg-[#f1f3f5] p-8 rounded-2xl"
      onSubmit={handleSubmit}
    >
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="title"
        >
          Product Title
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] w-full p-3 border border-gray-300 rounded-md text-xl outline-none transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="availabilityStatus"
        >
          Availability Status
        </label>
        <select
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
          id="availabilityStatus"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="inStock"
        >
          Stock Quantity
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="number"
          id="inStock"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="product-add-form-btn flex items-center justify-center p-3 bg-[#ec5e2a] text-white border-none rounded-md cursor-pointer text-[1.4rem] font-medium w-48 transition-all duration-300 hover:bg-white hover:text-[#ec5e2a] hover:shadow-md"
      >
        Add Product
      </button>
    </form>
  );
}
