"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    // Prepare the form data to send to the API
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: formData.get("category"),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    // Send the POST request to the API route
    const response = await fetch("/api/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      router.refresh();
      setCreatedSuccessfully(() => true);
    } else {
      console.error(result.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {createdSuccessfully && (
        <p className="text-green-500 text-3xl font-medium">
          Product created successfully ✔ 🔥
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="product-form dark:bg-[#313131] flex flex-col items-center justify-center gap-6 bg-[#f1f3f5] p-8 rounded-2xl w-[36rem]"
      >
        <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
          <label
            className="product-add-form-label text-[1.6rem] font-semibold"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="product-add-input dark:bg-[#4a4a4a] w-full p-3 border border-gray-300 rounded-md text-xl outline-none transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
            type="text"
            id="name"
            name="name"
            data-cy="product-name-input"
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
            step="0.01"
            id="price"
            name="price"
            data-cy="product-price-input"
            required
          />
        </div>
        <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
          <label
            className="product-add-form-label text-[1.6rem] font-semibold"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
            type="text"
            id="description"
            name="description"
            data-cy="product-description-input"
            required
          />
        </div>
        <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
          <label
            className="product-add-form-label text-[1.6rem] font-semibold"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
            type="text"
            id="category"
            name="category"
            data-cy="product-category-input"
            required
          />
        </div>
        <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
          <label
            className="product-add-form-label text-[1.6rem] font-semibold"
            htmlFor="image"
          >
            Image url
          </label>
          <input
            className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
            type="text"
            id="image"
            name="image"
            data-cy="product-image-input"
            required
          />
        </div>

        <button
          type="submit"
          data-cy="add-product-button"
          className="product-add-form-btn flex items-center justify-center p-3 bg-[#ec5e2a] text-white border-none rounded-md cursor-pointer text-[1.4rem] font-medium w-48 transition-all duration-300 hover:bg-white hover:text-[#ec5e2a] hover:shadow-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
