export function handleDelete(list, listName, id, setlist) {
  // Update localStorage
  localStorage.setItem(
    listName,
    JSON.stringify(list.filter((single) => single.id !== id))
  );

  // Update the state
  setlist((curList) => curList.filter((single) => single.id !== id));
}
