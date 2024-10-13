"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./ProductFilter.css";

function Filter() {
  const categories = [
    "all",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("category") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="product-filter-wrapper">
      <h2 className="filter-title">Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <CategoryButton
            btnName={category}
            key={category}
            clickHandler={() => handleFilter(category)}
            className={category === activeFilter ? "active-filter" : ""}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryButton({ btnName, clickHandler, className }) {
  return (
    <button className={`filter__btn ${className}`} onClick={clickHandler}>
      {btnName}
    </button>
  );
}

export default ProductFilter;
