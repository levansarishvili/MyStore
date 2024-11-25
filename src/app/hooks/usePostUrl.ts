"use client";

import { useEffect, useState } from "react";

export default function usePostsUrl(searchQuery: string, sortOptions: string) {
  const [postsUrl, setPostsUrl] = useState("https://dummyjson.com/posts");

  useEffect(() => {
    let url = "https://dummyjson.com/posts";
    if (searchQuery) {
      url = `https://dummyjson.com/posts/search?q=${searchQuery}`;
      if (sortOptions) {
        const [sortByValue, orderValue] = sortOptions.split("-");
        url += `&sortBy=${sortByValue}&order=${orderValue}`;
      }
    } else if (sortOptions) {
      const [sortByValue, orderValue] = sortOptions.split("-");
      url = `https://dummyjson.com/posts?sortBy=${sortByValue}&order=${orderValue}`;
    }
    setPostsUrl(() => url);
  }, [searchQuery, sortOptions]);

  return postsUrl;
}
