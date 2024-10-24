export function handleAddProduct(
  list,
  listName,
  setList,
  id,
  title,
  price,
  availabilityStatus,
  inStock
) {
  if (!id || !title || !price || !availabilityStatus || !inStock) {
    alert("Please fill out all fields before adding the product.");
    return;
  }

  // create a new product object
  const newProduct = {
    id: parseInt(id, 10),
    title: title.trim(),
    price: parseFloat(price),
    availabilityStatus: availabilityStatus.trim(),
    stock: parseInt(inStock, 10),
  };

  // update localStorage
  localStorage.setItem(listName, JSON.stringify([newProduct, ...list]));

  // update the state
  setList((curList) => [newProduct, ...curList]);
}
