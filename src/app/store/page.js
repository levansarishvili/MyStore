import Link from "next/link";
import Button from "../components/Button";
import ProductFilter from "../components/ProductFilter";
import Image from "next/image";
import "./Store.css";
import "../mediaQueries.css";

// Create Online Store component and fetch product data
export default async function Store({ searchParams }) {
  // Extracting filter, sort and search query from searchParams

  // Extracting search query from searchParams
  const searchQuery = searchParams?.search ?? "";
  console.log(searchQuery);

  // Extracting category filter query from searchParams
  const filter = searchParams?.category ?? "all";
  console.log(filter);

  // Extracting sort query from searchParams
  const sortOptions = searchParams?.sort ?? "title-asc";
  const [sortByValue, orderValue] = sortOptions.split("-");
  console.log(sortByValue, orderValue);
  console.log(sortOptions);

  // URL for fetching product data
  let productsUrl = "https://dummyjson.com/products";

  if (searchQuery) {
    productsUrl = `https://dummyjson.com/products/search?q=${searchQuery}`;
  } else if (sortOptions !== "title-asc") {
    productsUrl = `https://dummyjson.com/products?sortBy=${sortByValue}&order=${orderValue}`;
  } else if (filter !== "all") {
    productsUrl = `https://dummyjson.com/products/category/${filter}`;
  }

  // Fetching function to fetch product data from API
  async function FetchProductData() {
    const response = await fetch(`${productsUrl}`);
    const data = await response.json();
    return data.products;
  }

  const products = await FetchProductData();
  console.log(products);
  const reviews = products.map((product) => product.reviews);

  // Searching products based on search query
  // if (searchQuery) {
  //   const searchTerm = searchQuery.toLowerCase();
  //   products = products.filter((product) =>
  //     product.title.toLowerCase().includes(searchTerm)
  //   );
  // }

  // Sorting products based on sort query
  // if (sortOptions === "price-asc") {
  //   products.sort((a, b) => a.price - b.price);
  // } else if (sort === "price-desc") {
  //   products.sort((a, b) => b.price - a.price);
  // } else if (sort === "name-asc") {
  //   products.sort((a, b) => a.title.localeCompare(b.title));
  // } else if (sort === "name-desc") {
  //   products.sort((a, b) => b.title.localeCompare(a.title));
  // }

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
              imageSrc={product.images[0]}
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
        {/* <img className="product__img" src={imageSrc} alt="Product"></img> */}
        <div className="product__img-wrapper">
          <Image
            className="product__img"
            src={imageSrc}
            alt={name}
            width={100}
            height={100}
          />
        </div>

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
