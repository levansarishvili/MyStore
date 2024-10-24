import { useState } from "react";

export default function BlogForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [views, setViews] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ჩreate a new post object
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
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        name="content"
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="number"
        name="views"
        placeholder="Views"
        value={views}
        onChange={(e) => setViews(Number(e.target.value))}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
