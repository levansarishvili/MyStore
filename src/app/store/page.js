import Link from "next/link";
import Button from "../components/Button";
import ProductFilter from "../components/ProductFilter";
import "./Store.css";
import "../mediaQueries.css";

// Create Online Store component and fetch product data
export default async function Store({ searchParams }) {
  // Extracting filter, sort and search query from searchParams
  const filter = searchParams?.category ?? "all";
  const sort = searchParams?.sort ?? "price-asc";
  const searchQuery = searchParams?.search ?? "";

  // URL for fetching product data
  let productsUrl;
  if (filter === "all") {
    productsUrl = `https://dummyjson.com/products`;
  } else {
    productsUrl = `https://dummyjson.com/products/category/${filter}`;
  }

  // Fetching function to fetch product data from API
  async function FetchProductData() {
    const response = await fetch(`${productsUrl}`);
    const data = await response.json();
    return data.products;
  }

  let products = await FetchProductData();
  const reviews = products.map((product) => product.reviews);

  // Searching products based on search query
  if (searchQuery) {
    const searchTerm = searchQuery.toLowerCase();
    products = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // Sorting products based on sort query
  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "name-desc") {
    products.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <section className="product__page-wrapper">
      <h1 className="section__header">Products</h1>
      <div className="product__page-content">
        <ProductFilter />
        <div className="product__list">
          {products.map((product) => (
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
      <Link className="product__link" href={`/store/${id}`}>
        <img className="product__img" src={imageSrc} alt="Product"></img>
        <div className="product-card__content">
          <h2 className="product__title">{name}</h2>
          <div className="product__desc">
            <div className="product__stock-wrapper">
              <p className={`product__availabilityStatus ${stockStatus}`}>
                {availabilityStatus}:
              </p>
              <p className="product__stock">{stock}</p>
            </div>
            <p className="product__price">{`${price} $`}</p>
          </div>
        </div>
      </Link>

      <Button className="btn" name="Add to cart" />
    </div>
  );
}
