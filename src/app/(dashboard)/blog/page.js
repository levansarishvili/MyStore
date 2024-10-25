"use client";

import { useSearchParams } from "next/navigation";
import "./Blog.css";
import BlogItem from "./BlogItem";
import BlogFilter from "../../components/filters/BlogFilter";
import usePostsUrl from "../../hooks/usePostUrl";
import useFetchPosts from "../../hooks/useFetchPosts";
import { handleDelete } from "../../components/functions/handleDelete";
import { handleAddPost } from "../../components/functions/handleAddPost";
import { handleEdit } from "../../components/functions/handleEdit";
import { useState } from "react";
import BlogForm from "../../components/forms/BlogAddForm";
import PostEditForm from "../../components/forms/PostEditForm";

export default function BlogPage() {
  // Access search params directly
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const sortOptions = searchParams.get("sortBy") ?? "";

  // Create posts URL and fetch posts
  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);

  // For edit form
  const [active, setActive] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

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

      <div className="blog__page-content">
        <div className="blog__form-wrapper">
          <BlogForm
            onAddPost={(newPost) => handleAddPost(newPost, posts, setPosts)}
          />
          <BlogFilter />
        </div>

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
