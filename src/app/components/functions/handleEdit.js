export function handleEdit(
  list,
  listName,
  id,
  setlist,
  setActive,
  setCurrentItem
) {
  // Retrieve the list from localStorage
  const storedList = JSON.parse(localStorage.getItem(listName)) || [];

  // Find the current item (post or product) by its id
  const currItem = storedList.find((single) => single.id === id);

  if (currItem) {
    setActive(true);
    // Set the current item (post or product)
    setCurrentItem(() => currItem);
  }
}
