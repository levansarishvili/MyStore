"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface Post {
  id: number;
  title: string;
  body: string;
  views: number;
  likes?: number;
  dislikes?: number;
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
          const { data, error } = await supabase.from("posts").select("*");

          if (error) {
            console.error(error);
            return;
          }

          const postsData: Post[] = data;
          localStorage.setItem("posts", JSON.stringify(postsData));
          localStorage.setItem("postsUrl", postsUrl);
          setPosts(postsData);
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };

      fetchData();
    }
  }, [postsUrl]);

  return { posts, setPosts };
}
