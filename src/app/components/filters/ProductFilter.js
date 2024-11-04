"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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
    { label: "Sort is not applied", value: "" },
    { label: "Name: A - Z", value: "title-asc" },
    { label: "Name: Z - A", value: "title-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sortBy") ?? "";

  // Handle filter by category
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle sorting
  function handleSort(sortOption) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle Product search with debounced callback
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    console.log(params.toString());
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="product-filter-wrapper dark:bg-[#313131] flex flex-col gap-8 rounded-2xl p-8 h-[50rem] w-[30rem] bg-[#f1f3f5]">
      {/* Searching functionality */}
      <div className="search-wrapper text-xl flex flex-col gap-4">
        <h2 className="filter-title text-3xl font-semibold">Search Product</h2>
        <input
          className="product-search dark:bg-[#4a4a4a] border border-gray-300 px-4 py-3 rounded-lg cursor-pointer outline-none transition-all duration-300 focus:border-[#ec5e2a]"
          placeholder="Search product.."
          onChange={handleSearch}
        ></input>
      </div>

      {/* Sorting functionality */}
      <div className="sort-wrapper text-xl flex flex-col gap-4">
        <h2 className="filter-title text-3xl font-semibold">Sort By</h2>
        <select
          className="sort-dropdown dark:bg-[#4a4a4a] border border-gray-300 px-4 py-3 rounded-lg cursor-pointer outline-none transition-all duration-300 focus:border-[#ec5e2a]"
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
      <div className="filter-wrapper flex flex-col gap-4 h-96">
        <h2 className="filter-title text-3xl font-semibold">Categories</h2>
        <div className="category-list flex flex-col items-start justify-start gap-4 overflow-y-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`filter__btn dark:bg-[#4a4a4a] dark:text-white flex text-xl border-none px-4 py-2 w-72 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#ec5e2a] hover:text-white ${
                category === activeCategory
                  ? "bg-[#ec5e2a] text-white"
                  : "bg-white text-black hover:bg-[#ec5e2a] hover:text-white"
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
