import type { ProductsType } from "../../hooks/useFetchProducts";

export function handleAddProduct(
  list: ProductsType[],
  listName: string,
  setList: React.Dispatch<React.SetStateAction<ProductsType[]>>,
  title: string,
  price: string,
  availabilitystatus: string,
  inStock: string
) {
  if (!title || !price || !availabilitystatus || !inStock) {
    alert("Please fill out all fields before adding the product.");
    return;
  }

  // Calculate the next ID
  let nextId = 0;
  if (list.length > 0) {
    const highestId = Math.max(...list.map((product) => product.id));
    nextId = highestId + 1;
  }

  // Create a new product object
  const newProduct = {
    id: nextId,
    title: title.trim(),
    price: parseFloat(price),
    availabilitystatus: availabilitystatus.trim(),
    stock: parseInt(inStock),
  };

  // Update localStorage
  const updatedList = [newProduct, ...list] as ProductsType[];
  // Update the state
  setList(updatedList);

  // Also update localStorage with the new list
  localStorage.setItem(listName, JSON.stringify(updatedList));
}
