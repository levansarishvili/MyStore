"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import "./ProductFilter.css";
import { act } from "react";

function ProductFilter() {
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

  const sortOptions = [
    { label: "Name: A-Z", value: "title-asc" },
    { label: "Name: Z-A", value: "title-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "title-asc";

  // Handle filter by category
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle sorting
  function handleSort(sortOption) {
    console.log(sortOption);
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortOption);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle Product search with debounced callback
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="product-filter-wrapper">
      {/* Searching functionality */}
      <div className="search-wrapper">
        <h2 className="filter-title">Search Product</h2>
        <input
          className="product-search"
          placeholder="Search product.."
          onChange={handleSearch}
        ></input>
      </div>

      {/* Sorting functionality */}
      <div className="sort-wrapper">
        <h2 className="filter-title">Sort By</h2>
        <select
          className="sort-dropdown"
          value={activeSort}
          onChange={(e) => handleSort(e.target.value)}
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtering functionality */}
      <div className="filter-wrapper">
        <h2 className="filter-title">Categories</h2>
        <div className="category-list">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`filter__btn ${
                category === activeCategory ? "active-filter" : ""
              }`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
