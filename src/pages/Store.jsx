import productData from "../data/productData.js";
import "./Store.css";
import "./CustomScrollbar.css";

// Create Online Store component
function Store() {
  return (
    <main className="main">
      {" "}
      <section className="store-wrapper">
        <h1 className="section__header">GFF OFFICIAL FANSHOP</h1>
        <div className="store">
          {productData.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              imageSrc={product.image}
              color={product.color}
              size={product.size}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Product card component
function Product({ name, imageSrc, color, size, price }) {
  return (
    <div className="product-card">
      <img className="product__img" src={imageSrc} alt="Product"></img>
      <h2 className="product__title">{name}</h2>
      <div className="product__desc">
        <p className="product__color">{color}</p>
        <p className="product__size">{size}</p>
        <p className="product__price">{`${price}.00 ₾`}</p>
      </div>
      <Button />
    </div>
  );
}

// Create Button component
function Button() {
  return <button className="btn">ADD TO CART</button>;
}

// Exporting Product component
export default Store;
