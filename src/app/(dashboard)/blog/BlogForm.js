import { useState } from "react";

export default function BlogForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new post object
    const newPost = {
      id: Date.now(),
      title,
      body: content,
      views: 0,
    };

    setTitle("");
    setContent("");

    onAddPost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}
