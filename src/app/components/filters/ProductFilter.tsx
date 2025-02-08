"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { FilterX } from "lucide-react";

interface Props {
  categories: string[];
}

function ProductFilter({ categories }: Props) {
  const t = useTranslations("ProductFilter");
  const sortOptions = [
    { label: `${t("sort.empty")}`, value: "empty" },
    { label: `${t("sort.title-asc")}`, value: "title-asc" },
    { label: `${t("sort.title-desc")}`, value: "title-desc" },
    { label: `${t("sort.price-asc")}`, value: "price-asc" },
    { label: `${t("sort.price-desc")}`, value: "price-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sortBy") ?? "";

  // Handle filter by category
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle sorting
  function handleSort(sortOption: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle Product search with debounced callback
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Clear category filter when search input changes
      const params = new URLSearchParams(searchParams);
      params.delete("category");

      // Set the search term in URL
      params.set("search", e.target.value);
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    400
  );

  // Reset all filters
  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("sortBy");
    params.delete("search");
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="flex flex-wrap justify-center items-center gap-4 bg-muted rounded-lg px-1 sm:px-6 py-2">
      {/* Searching functionality */}
      <div className="max-sm:w-full">
        <Input
          placeholder={t("search")}
          onChange={handleSearch}
          className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full"
        />
      </div>

      <div className="flex justify-center gap-4">
        {/* Sorting functionality */}
        <div className="">
          <Select value={activeSort} onValueChange={handleSort}>
            <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full">
              <SelectValue placeholder={t("sort.title")} className="" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-none text-sm p-2 border max-sm:w-full">
              <SelectGroup className="">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-lg cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filtering functionality */}
        <div className="">
          <Select value={activeCategory} onValueChange={handleFilter}>
            <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full">
              <SelectValue placeholder={t("category.title")} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-none text-sm p-2 border max-sm:w-full">
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="rounded-lg cursor-pointer"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset filters*/}
      <Button
        variant={"destructive"}
        className="rounded-lg"
        onClick={handleClearFilters}
      >
        <FilterX className="size-5" />
        {t("reset")}
      </Button>
    </section>
  );
}

export default ProductFilter;
