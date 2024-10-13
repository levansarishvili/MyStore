"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import "./ProductFilter.css";

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
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A-Z", value: "name-asc" },
    { label: "Name: Z-A", value: "name-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "price-asc";
  const searchQuery = searchParams.get("search") ?? "";

  // Handle filter by category
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle sorting
  function handleSort(sortOption) {
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
      {/* Search bar */}
      <div className="search-wrapper">
        <h2 className="filter-title">Search Product</h2>
        <input
          className="product-search"
          placeholder="Search product.."
          onChange={handleSearch}
        ></input>
      </div>

      <div className="filter-wrapper">
        <h2 className="filter-title">Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
            <CategoryButton
              btnName={category}
              key={category}
              clickHandler={() => handleFilter(category)}
              className={category === activeCategory ? "active-filter" : ""}
            />
          ))}
        </div>
      </div>

      <div className="sort-wrapper">
        <h2 className="filter-title">Sort By</h2>
        <select
          className="sort-dropdown"
          value={activeSort}
          onChange={(e) => handleSort(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
