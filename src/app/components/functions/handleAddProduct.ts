import type { ProductsType } from "../../hooks/useFetchProducts";
import type { Post } from "../../hooks/useFetchPosts";

export function handleAddProduct(
  list: ProductsType[] | Post[],
  listName: string,
  setList: React.Dispatch<React.SetStateAction<ProductsType[]>>,
  title: string,
  price: string,
  availabilityStatus: string,
  inStock: string
) {
  if (!title || !price || !availabilityStatus || !inStock) {
    alert("Please fill out all fields before adding the product.");
    return;
  }

  // Calculate the next ID
  let nextId = 200;
  if (list.length > 0) {
    const highestId = Math.max(...list.map((product) => product.id));
    nextId = highestId + 1;
  }

  // Create a new product object
  const newProduct = {
    id: nextId,
    title: title.trim(),
    price: parseFloat(price),
    availabilityStatus: availabilityStatus.trim(),
    stock: parseInt(inStock),
  };

  // Update localStorage
  const updatedList = [newProduct, ...list] as ProductsType[];
  // Update the state
  setList(updatedList);
}
