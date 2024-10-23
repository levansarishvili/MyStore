"use client";

import { useEffect, useState } from "react";

export default function useFetchProducts(productsUrl) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = localStorage.getItem("products");
      const savedProductsUrl = localStorage.getItem("productsUrl");

      if (savedProducts !== "undefined" && savedProductsUrl === productsUrl) {
        setProducts(JSON.parse(savedProducts));
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(productsUrl);
            const productsData = await response.json();
            localStorage.setItem(
              "products",
              JSON.stringify(productsData.products)
            );
            localStorage.setItem("productsUrl", productsUrl);
            setProducts(productsData.products);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        };
        fetchData();
      }
    }
  }, [productsUrl]);

  return { products, setProducts };
}
