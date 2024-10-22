"use client";
// import Loading from "./loading";
import "./Blog.css";
import BlogFilter from "../components/BlogFilter";
import BlogItem from "./BlogItem";

import usePostsUrl from "../hooks/usePostUrl";
import useFetchPosts from "../hooks/useFetchPosts";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";

  const { postsUrl } = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);
  // const posts = [];

  console.log(posts);

  // Handle Delete
  function handleDelete(id) {
    localStorage.setItem(
      "posts",
      JSON.stringify(posts.filter((post) => post.id !== id))
    );
    setPosts((curPosts) => curPosts.filter((post) => post.id !== id));
  }

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
