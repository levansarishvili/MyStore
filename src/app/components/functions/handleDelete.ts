// handleDelete.ts
export const handleDelete = <T extends { id: number }>(
  list: T[], // The list can now be of any type that has an id field
  listName: string,
  id: number,
  setList: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const updatedList = list.filter((item) => item.id !== id);
  setList(updatedList);

  const savedList = JSON.parse(localStorage.getItem(listName) || "[]");
  const updatedSavedList: T[] = savedList.filter(
    (item: { id: number }) => item.id !== id
  );
  localStorage.setItem(listName, JSON.stringify(updatedSavedList));
};
