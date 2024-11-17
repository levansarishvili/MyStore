"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostResponse {
  posts: Post[];
}

export default function useFetchPosts(postsUrl: string) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    const savedPostsUrl = localStorage.getItem("postsUrl");

    if (
      savedPosts &&
      savedPosts !== "undefined" &&
      savedPostsUrl === postsUrl
    ) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(postsUrl);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const postsData: PostResponse = await response.json();
          localStorage.setItem("posts", JSON.stringify(postsData.posts));
          localStorage.setItem("postsUrl", postsUrl);
          setPosts(postsData.posts);
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };

      fetchData();
    }
  }, [postsUrl]);

  return { posts, setPosts };
}
