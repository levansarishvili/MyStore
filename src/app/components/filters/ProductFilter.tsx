"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { FilterX } from "lucide-react";

function ProductFilter() {
  const t = useTranslations("ProductFilter");
  const sortOptions = [
    { label: `${t("sort.empty")}`, value: "empty" },
    { label: `${t("sort.title-asc")}`, value: "title-asc" },
    { label: `${t("sort.title-desc")}`, value: "title-desc" },
    { label: `${t("sort.price-asc")}`, value: "price-asc" },
    { label: `${t("sort.price-desc")}`, value: "price-desc" },
  ];
  const categories = [
    { label: `${t("category.item1")}`, value: "Audio" },
    { label: `${t("category.item2")}`, value: "Laptops" },
    { label: `${t("category.item3")}`, value: "Monitors" },
    { label: `${t("category.item4")}`, value: "Photo and video" },
    { label: `${t("category.item5")}`, value: "Smartphones" },
    { label: `${t("category.item6")}`, value: "Tablets" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sortBy") ?? "";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function handleSort(sortOption: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      params.set("search", e.target.value);
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    400
  );

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("sortBy");
    params.delete("search");
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="w-full flex flex-col lg:flex-row gap-6 max-h-[24rem]">
      {/* Sidebar for big screens */}
      <aside className="hidden lg:flex flex-col gap-4 w-64 p-4 bg-muted rounded-lg">
        {/* Search */}
        <Input
          placeholder={t("search")}
          onChange={handleSearch}
          className="rounded-lg bg-background border-none text-sm p-2"
        />

        {/* Sort Dropdown */}
        <Select value={activeSort} onValueChange={handleSort}>
          <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2">
            <SelectValue placeholder={t("sort.title")} />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-none text-sm p-1">
            <SelectGroup>
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

        {/* Scrollable Category List */}
        <ScrollArea className="h-48 rounded-lg bg-background p-2 border border-muted smooth-scrollbar">
          <ul className="flex flex-col gap-2 px-1 py-1 pr-4">
            {categories.map((category) => (
              <li
                key={category.value}
                className={`cursor-pointer px-2 py-1 text-sm rounded-md transition-all ${
                  activeCategory === category.value
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleFilter(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </ScrollArea>

        {/* Reset Filters Button */}
        <Button
          variant="outline"
          className="rounded-lg"
          onClick={handleClearFilters}
        >
          <FilterX className="size-5" /> {t("reset")}
        </Button>
      </aside>

      {/* Horizontal filter for small screens */}
      <div className="w-full flex max-sm:flex-col justify-center items-center gap-4 bg-muted rounded-lg px-1 sm:px-6 py-2 lg:hidden">
        <Input
          placeholder={t("search")}
          onChange={handleSearch}
          className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full"
        />

        <div className="flex gap-2 sm:gap-4 max-w-1/2 w-full">
          {/* Sort Dropdown */}
          <Select value={activeSort} onValueChange={handleSort}>
            <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full">
              <SelectValue placeholder={t("sort.title")} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-none text-sm p-1">
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-lg"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Category List */}
          <Select value={activeCategory} onValueChange={handleFilter}>
            <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2 border">
              <SelectValue placeholder={t("category.title")} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-none text-sm p-2">
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="rounded-lg cursor-pointer"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset Filters Button */}
          <Button
            variant="outline"
            className="rounded-lg lg:hidden p-2"
            onClick={handleClearFilters}
          >
            <FilterX className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductFilter;
