import { useState } from "react";

export default function BlogForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [views, setViews] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new post object
    const newPost = {
      id: Date.now(),
      title,
      body: content,
      views,
    };

    setTitle("");
    setContent("");
    setViews(0);

    onAddPost(newPost);
  };

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="add-form-label" htmlFor="title">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="add-form-label" htmlFor="content">
          Post Content
        </label>
        <textarea
          className="add-form-textarea"
          id="content"
          name="content"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="add-form-label" htmlFor="views">
          Views
        </label>
        <input
          type="number"
          id="views"
          name="views"
          placeholder="Views"
          value={views}
          onChange={(e) => setViews(Number(e.target.value))}
          required
        />
      </div>

      <button className="new-post-form-btn" type="submit">
        Create Post
      </button>
    </form>
  );
}
