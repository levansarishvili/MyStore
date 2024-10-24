"use client";
 
import { useState } from "react";
import "./PostEditForm.css";
 
// Post edit form
export default function PostEditForm({
  setActive,
  currentPost,
  posts,
  setPosts,
}) {
  const [title, setFormTitle] = useState(currentPost.title);
  const [content, setFormContent] = useState(currentPost.body);
  const [views, setFormViews] = useState(currentPost.views);
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Update the current post in the posts list
    const updatedPosts = posts.map((post) =>
      post.id === currentPost.id
        ? { ...post, title: title, body: content, views: views }
        : post
    );
 
    // Update the posts state
    setPosts(updatedPosts);
 
    // Update localStorage with the updated posts list
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
 
    // Close the form
    setActive(false);
  };
 
  // Handle close form
  const handleCloseForm = (e) => {
    e.preventDefault();
    setActive(false);
  };
 
  return (
    <form className="post-edit-form" onSubmit={handleSubmit}>
      <button className="edit-form-close-btn" onClick={handleCloseForm}>
        X
      </button>
 
      <div className="edit-input-wrapper">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setFormTitle(e.target.value)}
          className="edit-form-input"
          type="text"
          id="title"
          name="title"
        />
      </div>
 
      <div className="edit-input-wrapper">
        <label className="label" htmlFor="content">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setFormContent(e.target.value)}
          className="edit-form-input edit-form-content"
          id="content"
          name="content"
        />
      </div>
 
      <div className="edit-input-wrapper">
        <label className="label" htmlFor="views">
          Views
        </label>
        <input
          value={views}
          onChange={(e) => setFormViews(e.target.value)}
          className="edit-form-input"
          type="number"
          id="views"
          name="views"
        />
      </div>
 
      <button className="btn edit-form-btn" type="submit">
        Save Changes
      </button>
    </form>
  );
}