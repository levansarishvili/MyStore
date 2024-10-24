"use client";
 
import { useState } from "react";
import "./ProductEditForm.css";
 
// Product edit form
export default function ProductEditForm({
  setActive,
  currentProduct,
  products,
  setProducts,
}) {
  const [title, setFormTitle] = useState(currentProduct.title);
  const [price, setFormPrice] = useState(currentProduct.price);
  const [availabilityStatus, setFormAvailabilityStatus] = useState(
    currentProduct.availabilityStatus
  );
  const [stock, setFormStock] = useState(currentProduct.stock);
  console.log(currentProduct);
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Update the current product in the products list
    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id
        ? {
            ...product,
            title: title,
            price: price,
            availabilityStatus: availabilityStatus,
            stock: stock,
          }
        : product
    );
 
    // Update the products state
    setProducts(updatedProducts);
 
    // Update localStorage with the updated products list
    localStorage.setItem("products", JSON.stringify(updatedProducts));
 
    // Close the form
    setActive(false);
  };
 
  // Handle close form
  const handleCloseForm = (e) => {
    e.preventDefault();
    setActive(false);
  };
 
  return (
    <form className="product-edit-form" onSubmit={handleSubmit}>
      <button className="product-edit-form-close-btn" onClick={handleCloseForm}>
        X
      </button>
 
      <div className="product-edit-input-wrapper">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setFormTitle(e.target.value)}
          className="product-edit-form-input"
          type="text"
          id="title"
          name="title"
        />
      </div>
 
      <div className="product-edit-input-wrapper">
        <label className="label" htmlFor="stockStatus">
          Availability Status
        </label>
        <select
          value={availabilityStatus}
          onChange={(e) => setFormAvailabilityStatus(e.target.value)}
          className="product-edit-form-input"
        >
          <option>Low Stock</option>
          <option> In Stock</option>
          <option> Out of Stock</option>
        </select>
      </div>
 
      <div className="product-edit-input-wrapper">
        <label className="label" htmlFor="stock">
          Stock
        </label>
        <input
          value={stock}
          onChange={(e) => setFormStock(e.target.value)}
          className="product-edit-form-input"
          type="number"
          id="stock"
        />
      </div>
 
      <div className="product-edit-input-wrapper">
        <label className="label" htmlFor="price">
          Price
        </label>
        <input
          value={price}
          onChange={(e) => setFormPrice(e.target.value)}
          className="product-edit-form-input"
          type="number"
          id="price"
        />
      </div>
 
      <button className="btn product-edit-form-btn" type="submit">
        Save Changes
      </button>
    </form>
  );
}
 