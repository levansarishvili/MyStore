import { useState } from "react";
import type { Post } from "../../hooks/useFetchPosts";

interface BlogFormProps {
  onAddPost: (post: Post) => void;
}

export default function BlogForm({ onAddPost }: BlogFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [views, setViews] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new post object
    const newPost: Post = {
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
    <form
      className="new-post-form dark:bg-[#313131] flex flex-col gap-8 items-center mb-12 p-8 rounded-2xl bg-[#f1f3f5] w-full mt-1"
      onSubmit={handleSubmit}
    >
      <div className="form-group flex flex-col items-start gap-4 w-full">
        <label
          className="add-form-label text-3xl font-semibold"
          htmlFor="title"
        >
          Post Title
        </label>
        <input
          className="p-3 border dark:bg-[#4a4a4a] rounded-lg text-[1.4rem] outline-none transition-all duration-300 w-full focus:border-[#ec5e2a]"
          type="text"
          id="title"
          name="title"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group flex flex-col items-start gap-4 w-full">
        <label
          className="add-form-label text-3xl font-semibold"
          htmlFor="content"
        >
          Post Content
        </label>
        <textarea
          className="add-form-textarea dark:bg-[#4a4a4a] p-3 border rounded-lg text-[1.4rem] outline-none transition-all duration-300 w-full focus:border-[#ec5e2a] h-40"
          id="content"
          name="content"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="form-group flex flex-col items-start gap-4 w-full">
        <label
          className="add-form-label text-3xl font-semibold"
          htmlFor="views"
        >
          Views
        </label>
        <input
          className="p-3 border dark:bg-[#4a4a4a] rounded-lg text-[1.4rem] outline-none transition-all duration-300 w-full focus:border-[#ec5e2a]"
          type="number"
          id="views"
          name="views"
          placeholder="Views"
          value={views}
          onChange={(e) => setViews(Number(e.target.value))}
          required
        />
      </div>

      <button
        className="new-post-form-btn font-medium p-3 bg-[#ec5e2a] text-white rounded-lg text-2xl cursor-pointer w-48 transition-all duration-300 hover:shadow-lg hover:bg-white hover:text-[#ec5e2a]"
        type="submit"
      >
        Create Post
      </button>
    </form>
  );
}
