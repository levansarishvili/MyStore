"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Define the product type interface
export interface ProductsType {
  id: number;
  title: string;
  description: string;
  price: number;
  availabilitystatus: string;
  stock: number;
  category: string;
  thumbnail: string;
}

export default function useFetchProducts(productsUrl: string) {
  // Initialize the state with a type of ProductsType array
  const [products, setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedProductsUrl = localStorage.getItem("productsUrl");

    // If saved products and URL match, load from localStorage
    if (savedProducts !== null && savedProductsUrl === productsUrl) {
      setProducts(() => JSON.parse(savedProducts));
    } else {
      const fetchData = async () => {
        try {
          // Fetch data from supabase
          const { data, error } = await supabase
            .from("products_old")
            .select("*");

          if (error) {
            console.error(error);
            return;
          }

          // Set the data into state and localStorage
          const productsData = data as ProductsType[];
          localStorage.setItem("products", JSON.stringify(productsData));
          localStorage.setItem("productsUrl", productsUrl);

          setProducts(() => productsData);
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };
      fetchData();
    }
  }, [productsUrl]);

  return { products, setProducts };
}
