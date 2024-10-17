import Link from "next/link";
import Button from "../components/Button";
import ProductFilter from "../components/ProductFilter";
import Image from "next/image";
import "./Store.css";
import "../mediaQueries.css";

// Create Online Store component and fetch product data
export default async function Store({ searchParams }) {
  // Extracting search query from searchParams
  const searchQuery = searchParams?.search ?? "";

  // Extracting category filter query from searchParams
  const filter = searchParams?.category ?? "all";

  // Extracting sort query from searchParams
  const sortOptions = searchParams?.sortBy ?? "title-asc";
  const [sortByValue, orderValue] = sortOptions.split("-");

  // URL for fetching product data
  let productsUrl = "https://dummyjson.com/product";

  if (searchQuery) {
    productsUrl = `https://dummyjson.com/product/search?q=${searchQuery}`;
    if (sortOptions) {
      productsUrl += `&sortBy=${sortByValue}&order=${orderValue}`;
    }
  } else if (sortOptions !== "title-asc") {
    productsUrl = `https://dummyjson.com/product?sortBy=${sortByValue}&order=${orderValue}`;
  } else if (filter !== "all") {
    productsUrl = `https://dummyjson.com/product/category/${filter}`;
  }

  // Fetching function to fetch product data from API
  async function FetchProductData() {
    const response = await fetch(`${productsUrl}`);
    const data = await response.json();
    return data.products;
  }

  const products = await FetchProductData();

  const reviews = products.map((product) => product.reviews);

  return (
    <section className="product__page-wrapper">
      <h1 className="section__header">Products</h1>
      <div className="product__page-content">
        <ProductFilter />
        <ProductList products={products} />
      </div>
    </section>
  );
}

// Product list component
function ProductList({ products }) {
  return (
    <div className="product__list">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.title}
          imageSrc={product.thumbnail}
          availabilityStatus={product.availabilityStatus}
          stock={product.stock}
          price={product.price}
        />
      ))}
    </div>
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
            quality={50}
            priority={true}
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
