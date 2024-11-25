"use client";

import { useSearchParams } from "next/navigation";
import BlogItem from "./BlogItem";
import BlogFilter from "../../../components/filters/BlogFilter";
import usePostsUrl from "../../../hooks/usePostUrl";
import useFetchPosts from "../../../hooks/useFetchPosts";
import { handleDelete } from "../../../components/functions/handleDelete";
import { handleAddPost } from "../../../components/functions/handleAddPost";
import { handleEdit } from "../../../components/functions/handleEdit";
import { useState } from "react";
import BlogAddForm from "../../../components/forms/BlogAddForm";
import PostEditForm from "../../../components/forms/PostEditForm";
import type { Post } from "../../../hooks/useFetchPosts";

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
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  return (
    <section className="blog-wrapper flex flex-col items-center w-full gap-20 h-full text-center">
      {/* Conditionally render edit form */}
      {active && currentPost ? (
        <PostEditForm
          setActive={setActive}
          currentPost={currentPost}
          posts={posts}
          setPosts={setPosts}
        />
      ) : null}
      <h1 className="section-header text-4xl font-semibold">Blogs</h1>

      <div className="blog__page-content flex gap-32 items-start justify-between w-full">
        <div className="blog__form-wrapper max-w-[30rem]">
          <BlogAddForm
            onAddPost={(newPost) => handleAddPost(newPost, posts, setPosts)}
          />
          <BlogFilter />
        </div>

        <ul className="blog__list list-none grid grid-cols-2 gap-x-24 gap-y-24">
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
