"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
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
import { FilterX } from "lucide-react";

export default function BlogFilter() {
  const t = useTranslations("BlogFilter");

  const sortOptions = [
    { label: `${t("sort.empty")}`, value: "empty" },
    { label: `${t("sort.title-asc")}`, value: "title-asc" },
    { label: `${t("sort.title-desc")}`, value: "title-desc" },
    { label: `${t("sort.date-asc")}`, value: "date-asc" },
    { label: `${t("sort.date-desc")}`, value: "date-desc" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeSort = searchParams.get("sortBy") ?? "";

  // Handle sorting
  function handleSort(sortOption: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Handle Blog search with debounced callback
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("search", e.target.value);
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    400
  );

  // Reset all filters
  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);
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

      {/* Sorting functionality */}
      <div className="flex justify-center gap-4">
        <Select value={activeSort} onValueChange={handleSort}>
          <SelectTrigger className="rounded-lg bg-background border-none text-sm p-2 border max-sm:w-full">
            <SelectValue placeholder={t("sort.title")} />
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
