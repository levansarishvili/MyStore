export const handleDelete = (posts, storageKey, postId, setPosts) => {
  const updatedPosts = posts.filter((post) => post.id !== postId);
  setPosts(updatedPosts);

  // update local storage
  const savedPosts = JSON.parse(localStorage.getItem(storageKey)) || [];
  const updatedSavedPosts = savedPosts.filter((post) => post.id !== postId);
  localStorage.setItem(storageKey, JSON.stringify(updatedSavedPosts));
};
