"use client";
import { useEffect, useState } from "react";

const useLocal = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("posts");
      const savedProducts = localStorage.getItem("products");

      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }

      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    }
    const fetchData = async () => {
      try {
        const [postsResponse, productsResponse] = await Promise.all([
          fetch("https://dummyjson.com/posts"),
          fetch("https://dummyjson.com/products"),
        ]);

        const postsData = await postsResponse.json();
        const productsData = await productsResponse.json();

        localStorage.setItem("posts", JSON.stringify(postsData.posts));
        localStorage.setItem("products", JSON.stringify(productsData.products));

        setPosts(postsData.posts);
        setProducts(productsData.products);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (!posts.length || !products.length) {
      fetchData();
    }
  }, [posts.length, products.length]);

  return { posts, products };
};

export default useLocal;
