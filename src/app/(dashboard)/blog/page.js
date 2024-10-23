"use client";
// import Loading from "./loading";
import "./Blog.css";
import BlogItem from "./BlogItem";
import BlogForm from "./BlogForm";
import BlogFilter from "../../components/BlogFilter";

import usePostsUrl from "../../hooks/usePostUrl";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useState, useEffect } from "react";
import { handleDelete } from "../../components/handleDelete";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";

  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);

  // fetch posts from local storage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (savedPosts.length) {
      setPosts((prevPosts) => [...prevPosts, ...savedPosts]);
    }
  }, [setPosts]);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);

    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));
  };

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <div className="blog__page-content">
        <BlogFilter />
        <div>
          <BlogForm onAddPost={handleAddPost} />
          <ul className="blog__list">
            {posts.map((post) => (
              <BlogItem
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.body}
                views={post.views}
                onDelete={() => handleDelete(posts, "posts", post.id, setPosts)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
