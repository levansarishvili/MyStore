import type { Post } from "../../hooks/useFetchPosts";

export const handleAddPost = (
  newPost: Post,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
) => {
  setPosts((prev) => [newPost, ...prev]);
  localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
};
