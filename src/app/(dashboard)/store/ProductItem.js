import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/Button";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditButton from "../../components/buttons/EditButton";

// Product card component
export default function ProductItem({
  id,
  name,
  imageSrc,
  availabilityStatus,
  stock,
  price,
  onDelete,
  onEdit,
}) {
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
      <div className="buttons">
        <Button className="btn" name="Add to cart" />
        <EditButton onEdit={onEdit} id={id} />
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
}
