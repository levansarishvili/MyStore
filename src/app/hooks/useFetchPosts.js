"use client";

import { useEffect, useState } from "react";

export default function useFetchPosts(postsUrl) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPostsUrl = localStorage.getItem("postsUrl");
      const savedPosts = localStorage.getItem("posts");

      if (savedPosts && savedPostsUrl === postsUrl) {
        setPosts(JSON.parse(savedPosts));
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(postsUrl);
            const postsData = await response.json();
            localStorage.setItem("posts", JSON.stringify(postsData.posts));
            localStorage.setItem("postsUrl", postsUrl);
            setPosts(postsData.posts);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        };
        fetchData();
      }
    }
  }, [postsUrl]);

  return { posts, setPosts };
}
