import Link from "next/link";
import Button from "../components/Button";
import "./Store.css";

// Fetching function to fetch product data from API
async function fetchProductData(category) {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  return data.products;
}

// Create Online Store component and fetch product data
export default async function Store() {
  // Fetching product data
  const products = await fetchProductData("sports-accessories");

  return (
    <section className="product__list-wrapper">
      <h1 className="section__header">Products</h1>

      {/* Creating product card list */}
      <div className="product__list">
        {products.map((product, index) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.title}
            stock={product.stock}
            imageSrc={product.thumbnail}
            availabilityStatus={product.availabilityStatus}
            size={product.category}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

// Product card component
function Product({ id, name, imageSrc, availabilityStatus, stock, price }) {
  let stockStatus = "";
  if (availabilityStatus === "In Stock") {
    stockStatus = "in-stock";
  } else if (availabilityStatus === "Low Stock") {
    stockStatus = "low-stock";
  } else {
    stockStatus = "out-of-stock";
  }

  return (
    <div className="product-card">
      <Link href={`/store/${id}`}>
        <div className="product-card__content">
          <img className="product__img" src={imageSrc} alt="Product"></img>
          <h2 className="product__title">{name}</h2>
          <div className="product__desc">
            <div className="product__stock-wrapper">
              <p className={`product__availabilityStatus ${stockStatus}`}>
                {availabilityStatus}
              </p>
              <p className="product__stock">{stock}</p>
            </div>
            <p className="product__price">{`  ${price} $`}</p>
          </div>
        </div>
      </Link>

      <Button className="btn" name="Add to cart" />
    </div>
  );
}
