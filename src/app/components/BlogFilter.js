"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import "./BlogFilter.css";

export default function PostFilter() {
  const sortOptions = [
    { label: "Name: A - Z", value: "title-asc" },
    { label: "Name: Z - A", value: "title-desc" },
    { label: "Views: Low to High", value: "views-asc" },
    { label: "Views: High to Low", value: "views-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeSort = searchParams.get("sortBy") ?? "title-asc";

  // Handle sorting
  function handleSort(sortOption) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle Product search with debounced callback
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="post-filter-wrapper">
      {/* Searching functionality */}
      <div className="post-search-wrapper">
        <label className="search-title" htmlFor="search">
          Search Product:
        </label>
        <input
          id="search"
          className="post-search"
          placeholder="Search post.."
          onChange={handleSearch}
        ></input>
      </div>

      {/* Sorting functionality */}
      <div className="post-sort-wrapper">
        <label className="sort-title" htmlFor="sort">
          Sort By:
        </label>
        <select
          id="sort"
          className="post-sort"
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
    </div>
  );
}
