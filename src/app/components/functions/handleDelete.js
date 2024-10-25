export const handleDelete = (list, listName, id, setList) => {
  const updatedList = list.filter((listItem) => listItem.id !== id);
  setList(updatedList);

  // update local storage
  const savedList = JSON.parse(localStorage.getItem(listName)) || [];
  const updatedSavedList = savedList.filter((listItem) => listItem.id !== id);
  localStorage.setItem(listName, JSON.stringify(updatedSavedList));
};
