"use client";
// import Loading from "./loading";

import "./Blog.css";
import BlogItem from "./BlogItem";
import BlogFilter from "../../components/BlogFilter";

import usePostsUrl from "../../hooks/usePostUrl";
import useFetchPosts from "../../hooks/useFetchPosts";
import { handleDelete } from "../../components/handleDelete";
import { handleAddPost } from "../../components/handleAddPost"; 
import { useState, useEffect } from "react";
import BlogForm from "./BlogForm";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";

  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, [setPosts]);

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <BlogForm onAddPost={(newPost) => handleAddPost(newPost, posts, setPosts)} /> 
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
              onDelete={() => handleDelete(posts, "posts", post.id, setPosts)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
