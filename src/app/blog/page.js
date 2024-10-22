"use client";
// import Loading from "./loading";
import "./Blog.css";
import BlogFilter from "../components/BlogFilter";
import BlogItem from "./BlogItem";

import usePostsUrl from "../hooks/usePostUrl";
import useFetchData from "../hooks/useFetchData";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";

  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { list, setList } = useFetchData("posts", postsUrl);

  // Handle Delete
  function handleDelete(id) {
    localStorage.setItem(
      "posts",
      JSON.stringify(list.filter((post) => post.id !== id))
    );
    setList((curPosts) => curPosts.filter((post) => post.id !== id));
  }

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <div className="blog__page-content">
        <BlogFilter />
        <ul className="blog__list">
          {list.map((post) => (
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
