"use client";
// import Loading from "./loading";
import "./Blog.css";
import Button from "../components/Button";
import BlogFilter from "../components/BlogFilter";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      const savedPosts = localStorage.getItem("posts");

      if (savedPosts) {
        setPosts(JSON.parse(savedPosts)); // Use posts from localStorage if available
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

// Blog item component
function BlogItem({ id, title, content, views, onDelete }) {
  return (
    <li className="blog__list__item">
      <div className="blog__content">
        <h2 className="blog__title">{title}</h2>
        <p className="blog__txt">{content}</p>
        <div className="blog__views-wrapper">
          <svg
            className="post-icon blog-page"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
          </svg>
          <span className="blog__views">{views}</span>
        </div>
        <div className="buttons">
          <Link className="blog__link" href={`/blog/${id}`}>
            <Button className="btn blog-btn" name="Read more" />
          </Link>
          <button className="btn" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
