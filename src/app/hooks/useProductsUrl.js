"use client";

import { useEffect, useState } from "react";

export default function useProductsUrl(searchQuery, sortOptions, filter) {
  const [productsUrl, setProductsUrl] = useState(
    "https://dummyjson.com/product"
  );

  useEffect(() => {
    // URL for fetching product data
    let productsUrl = "https://dummyjson.com/product";
    const [sortByValue, orderValue] = sortOptions.split("-");

    if (searchQuery) {
      productsUrl = `https://dummyjson.com/product/search?q=${searchQuery}`;
      if (sortOptions) {
        productsUrl += `&sortBy=${sortByValue}&order=${orderValue}`;
      }
    } else if (sortOptions) {
      productsUrl = `https://dummyjson.com/product?sortBy=${sortByValue}&order=${orderValue}`;
    } else if (filter !== "all") {
      productsUrl = `https://dummyjson.com/product/category/${filter}`;
    }
    setProductsUrl(productsUrl);
  }, [searchQuery, sortOptions, filter]);

  return productsUrl;
}
