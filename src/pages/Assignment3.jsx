import "./Assignment3.css";

const Assignment3 = () => {
  const obj = {
    id: "10002",
    name: "Eco-Friendly Water Bottle",
    description: "Stay hydrated with our durable, eco-friendly water bottle.",
    price: 14.99,
    currency: "USD",
    imageURL: "https://example.com/images/product-10002.jpg",
  };

  // Use reduce to generate the rows for the table
  const list = Object.keys(obj).reduce(
    (acc, key, index) => [
      ...acc,
      <tr key={index}>
        <td>{key}</td>
        <td>{obj[key]}</td>
        <td>{index}</td>
      </tr>,
    ],
    []
  );

  return (
    <main className="main">
      <table className="table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </main>
  );
};

export default Assignment3;
