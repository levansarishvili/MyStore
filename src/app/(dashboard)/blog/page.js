"use client";
// import Loading from "./loading";

import "./Blog.css"; 
import BlogItem from "./BlogItem"; 
import BlogFilter from "../../components/BlogFilter"; 

import usePostsUrl from "../../hooks/usePostUrl"; 
import useFetchPosts from "../../hooks/useFetchPosts"; 
import { handleDelete } from "../../components/handleDelete"; 
import { useState, useEffect } from "react";

export default function BlogPage({ searchParams }) {
  const searchQuery = searchParams?.search ?? "";
  const sortOptions = searchParams?.sortBy ?? "";
  
  const postsUrl = usePostsUrl(searchQuery, sortOptions);
  const { posts, setPosts } = useFetchPosts(postsUrl);

  const [newPost, setNewPost] = useState({ title: '', content: '', views: 0 });

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, [setPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostWithId = {
      ...newPost,
      id: Date.now(), 
      body: newPost.content, 
    };
    setPosts((prev) => [newPostWithId, ...prev]);
    setNewPost({ title: "", content: "", views: 0 });
    // save to local storage
    localStorage.setItem("posts", JSON.stringify([newPostWithId, ...posts]));
  };

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={newPost.content}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="views"
          placeholder="Views"
          value={newPost.views}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Post</button>
      </form>
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
