"use client";
// import Loading from "./loading";
import "./Blog.css";
import BlogFilter from "../components/BlogFilter";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";
  const [sortByValue, orderValue] = sortOptions.split("-");
  let url = "https://dummyjson.com/posts";

  const [postsUrl, setPostUrl] = useState(url);
  const [posts, setPosts] = useState([]);

  function handleDelete(id) {
    localStorage.setItem(
      "posts",
      JSON.stringify(posts.filter((post) => post.id !== id))
    );
    setPosts(JSON.parse(localStorage.getItem("posts")));
  }

  useEffect(() => {
    if (searchQuery) {
      url = `https://dummyjson.com/posts/search?q=${searchQuery}`;
      if (sortOptions) {
        url += `&sortBy=${sortByValue}&order=${orderValue}`;
      }
    } else if (sortOptions) {
      url = `https://dummyjson.com/posts?sortBy=${sortByValue}&order=${orderValue}`;
    }

    setPostUrl(url);
  }, [searchQuery, sortOptions, sortByValue, orderValue]);

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
            setPosts(postsData.posts);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        };

        fetchData();
      }
    }
  }, [postsUrl]);

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <div className="blog__page-content">
        <BlogFilter />
        <ul className="blog__list">
          {posts.map((post) => (
            <BlogItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.body}
              views={post.views}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
