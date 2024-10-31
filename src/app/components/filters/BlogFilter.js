"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function PostFilter() {
  const sortOptions = [
    { label: "Sort is not applied", value: "" },
    { label: "Name: A - Z", value: "title-asc" },
    { label: "Name: Z - A", value: "title-desc" },
    { label: "Views: Low to High", value: "views-asc" },
    { label: "Views: High to Low", value: "views-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeSort = searchParams.get("sortBy") ?? "";

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
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="post-filter-wrapper flex flex-col gap-8 rounded-2xl w-[30rem] p-8 border bg-[#f1f3f5]">
      {/* Searching functionality */}
      <div className="post-search-wrapper flex flex-col items-start gap-4 w-full">
        <label
          className="search-title text-3xl font-semibold cursor-pointer"
          htmlFor="search"
        >
          Search Product:
        </label>
        <input
          id="search"
          className="post-search border px-4 py-3 rounded-lg cursor-pointer outline-none text-[1.4rem] w-full border-gray-300 transition-all duration-300 focus:border-[#ec5e2a]"
          placeholder="Search post.."
          onChange={handleSearch}
        ></input>
      </div>

      {/* Sorting functionality */}
      <div className="post-sort-wrapper flex flex-col items-start gap-4 w-full">
        <label
          className="sort-title text-3xl font-semibold cursor-pointer"
          htmlFor="sort"
        >
          Sort By:
        </label>
        <select
          id="sort"
          className="post-sort border px-4 py-3 rounded-lg cursor-pointer outline-none text-[1.4rem] w-full border-gray-300 transition-all duration-300 focus:border-[#ec5e2a]"
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
