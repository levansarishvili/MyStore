"use client";

import Button from "../../../../components/buttons/Button";
import Image from "next/image";

export default function ProductDetails({ product }) {
  const reviews = product.reviews;

  return (
    <div className="product-details__wrapper flex flex-col items-center gap-20">
      <h1 className="section-header text-4xl font-semibold">Product Details</h1>
      <div className="product-details__content flex justify-center items-center gap-32 rounded-2xl p-16 transition-all duration-300 hover:shadow-lg bg-[#f1f3f5] dark:bg-[#313131] dark:hover:shadow-md dark:hover:shadow-[#ec5e2a]">
        {/* Product Details */}

        <div className="product-img-wrapper flex justify-center items-center w-[35rem] overflow-hidden h-[30rem] transition-all duration-300">
          <Image
            className="product-details__img w-96 h-96 object-contain"
            src={product.thumbnail}
            alt={product.title}
            width={250}
            height={250}
            quality={100}
            priority={true}
          />
        </div>

        {/* Product Settings */}
        <div className="product-details flex flex-col items-start justify-center gap-8 w-[40rem] h-full">
          <div className="product-desc-wrapper flex flex-col items-start justify-center gap-8">
            <h2 className="product-details__title text-4xl font-semibold text-gray-600">
              {product.title}
            </h2>
            <p className="product-details__category text-3xl text-[#ec5e2a] font-semibold">
              {product.category}
            </p>
            <p className="product-details__desc text-2xl">
              {product.description}
            </p>
          </div>

          <div className="stock-wrapper flex gap-4">
            <p
              className={`product-details__availability text-2xl font-semibold ${
                product.availabilityStatus === "In Stock"
                  ? "text-green-700"
                  : product.availabilityStatus === "Low Stock"
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
            >
              {product.availabilityStatus}:
            </p>
            <p className="product-details__stock text-2xl font-semibold">
              {product.stock}
            </p>
          </div>

          <p className="product-details__price text-2xl font-medium">
            Price: {product.price} $
          </p>

          <div className="btn-wrapper flex gap-12">
            <Button className="btn" name="&#10084; Wishlist" />
            <Button className="btn" name="Add to cart" />
          </div>
        </div>
      </div>
      {/* Product Reviews */}
      <div className="reviews-wrapper flex flex-col items-center justify-center gap-12">
        <h2 className="review-header text-3xl font-semibold">Reviews</h2>
        <div className="reviews-content flex gap-40 rounded-2xl transition-all duration-300 hover:shadow-lg bg-[#f1f3f5] dark:bg-[#313131] dark:hover:shadow-md dark:hover:shadow-[#ec5e2a]">
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
function Review({ reviewerName, reviewerComment, reviewRating }) {
  return (
    <div className="product-review flex flex-col gap-4 p-12">
      <p className="reviewer-name text-2xl font-medium">{reviewerName}</p>
      <p className="review-rating"> {"⭐".repeat(reviewRating)}</p>
      <p className="reviewer-comment text-xl">
        <em>{reviewerComment}</em>
      </p>
    </div>
  );
}
