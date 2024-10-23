"use client";

import "./ProductDetails.css";
import Button from "../../../components/Button";
import Image from "next/image";

export default function ProductDetails({ product }) {
  const reviews = product.reviews;

  return (
    <div className="product-details__wrapper">
      <h1 className="section-header">Product Details</h1>
      <div className="product-details__content">
        {/* Product Details */}

        <div className="product-img-wrapper">
          {/* <img
            className="product-details__img"
            src={product.thumbnail}
            alt={product.title}
          /> */}
          <Image
            className="product-details__img"
            src={product.thumbnail}
            alt={product.title}
            width={250}
            height={250}
            quality={100}
            priority={true}
          />
        </div>

        {/* Product Settings */}
        <div className="product-details">
          <div className="product-desc-wrapper">
            <h2 className="product-details__title">{product.title}</h2>
            <p className="product-details__category">{product.category}</p>
            <p className="product-details__desc">{product.description}</p>
          </div>

          <div className="stock-wrapper">
            <p
              className={`product-details__availability ${
                product.availabilityStatus === "In Stock"
                  ? "in-stock"
                  : product.availabilityStatus === "Low Stock"
                  ? "low-stock"
                  : "out-of-stock"
              }`}
            >
              {product.availabilityStatus}:
            </p>
            <p className="product-details__stock">{product.stock}</p>
          </div>

          <p className="product-details__price">Price: {product.price} $</p>

          <div className="btn-wrapper">
            <Button className="btn wishlist-btn" name="&#10084; Wishlist" />
            <Button className="btn" name="Add to cart" />
          </div>
        </div>
      </div>
      {/* Product Reviews */}
      <div className="reviews-wrapper">
        <h2 className="review-header">Reviews</h2>
        <div className="reviews-content">
          {reviews.map((review, index) => (
            <Review
              key={index}
              reviewerName={review.reviewerName}
              reviewRating={review.rating}
              reviewerComment={review.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Review component
function Review({ reviewerName, reviewerComment, reviewDate, reviewRating }) {
  return (
    <div className="product-review">
      <p className="reviewer-name">{reviewerName}</p>
      <p className="review-rating"> {"⭐".repeat(reviewRating)}</p>
      <p className="reviewer-comment">
        <em>{reviewerComment}</em>
      </p>
    </div>
  );
}
