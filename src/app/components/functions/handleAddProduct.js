export function handleAddProduct(
  list,
  listName,
  setList,
  title,
  price,
  availabilityStatus,
  inStock
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
  const updatedList = [newProduct, ...list];
  localStorage.setItem(listName, JSON.stringify(updatedList));

  // Update the state
  setList(updatedList);
}
