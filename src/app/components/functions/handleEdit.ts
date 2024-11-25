export function handleEdit<T extends { id: number }>(
  list: T[], // The list can be of any type that has an id field
  listName: string,
  id: number,
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentItem: React.Dispatch<React.SetStateAction<T | null>> // Accept T or null
) {
  // Retrieve the list from localStorage
  const storedList: T[] = JSON.parse(localStorage.getItem(listName) || "[]");

  // Find the current item by its id
  const currItem = storedList.find((single) => single.id === id);

  if (currItem) {
    setActive(true);
    // Set the current item
    setCurrentItem(currItem); // currItem is guaranteed to be of type T here
  } else {
    // Handle the case where the item is not found (optional)
    console.error(`Item with id ${id} not found in ${listName}`);
    setCurrentItem(null); // Set to null if the item is not found
  }
}
