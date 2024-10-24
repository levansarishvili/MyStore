"use client";
// import Loading from "./loading";

import "./Blog.css";
import BlogItem from "./BlogItem";
import BlogFilter from "../../components/BlogFilter";

import usePostsUrl from "../../hooks/usePostUrl";
import useFetchPosts from "../../hooks/useFetchPosts";
import { handleDelete } from "../../components/handleDelete";
import { handleAddPost } from "../../components/handleAddPost";
import { handleEdit } from "../../components/handleEdit";
import { useState, useEffect } from "react";
import BlogForm from "./BlogForm";
import PostEditForm from "../../components/PostEditForm";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";

  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);

// for edit form

  const [active, setActive] = useState(false);
  const [currentPost, setCurrentPost] = useState({});


  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, [setPosts]);



  return (
    <section className="blog-wrapper">
      {/* Conditionally render edit form */}
      {active ? (
        <PostEditForm
          setActive={setActive}
          currentPost={currentPost}
          posts={posts}
          setPosts={setPosts}
        />
      ) : null}
      <h1 className="section-header">Blogs</h1>
      <BlogForm
        onAddPost={(newPost) => handleAddPost(newPost, posts, setPosts)}
      />
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
              onEdit={() =>
                handleEdit(
                  posts,
                  "posts",
                  post.id,
                  setPosts,
                  setActive,
                  setCurrentPost
                )
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
