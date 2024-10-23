export const handleAddPost = (newPost, posts, setPosts) => {
  setPosts((prev) => [newPost, ...prev]);
  localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
};