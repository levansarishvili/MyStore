"use client";

import Button from "../../../../components/buttons/Button";
import Image from "next/image";
import { ProductsType } from "../page";

export default function ProductDetails({ product }: { product: ProductsType }) {
  return (
    <div className="product-details__wrapper flex flex-col items-center gap-20">
      <h1 className="section-header text-4xl font-semibold">Product Details</h1>
      <div className="product-details__content flex justify-center items-center gap-32 rounded-2xl p-16 transition-all duration-300 hover:shadow-lg bg-[#f1f3f5] dark:bg-[#313131] dark:hover:shadow-md dark:hover:shadow-[#ec5e2a]">
        {/* Product Details */}

        <div className="product-img-wrapper flex justify-center items-center w-[35rem] overflow-hidden h-[30rem] transition-all duration-300">
          <Image
            className="product-details__img w-96 h-96 object-contain"
            src={product.image_url}
            alt={product.name}
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
              {product.name}
            </h2>
            <p className="product-details__category text-3xl text-[#ec5e2a] font-semibold">
              {product.category}
            </p>
            <p className="product-details__desc text-2xl">
              {product.description}
            </p>
          </div>
          <p className="product-details__price text-2xl font-medium">
            Price: {product.price / 100} $
          </p>
          <div className="btn-wrapper flex gap-12">
            <Button className="btn" name="&#10084; Wishlist" />
            <Button className="btn" name="Add to cart" />
          </div>
        </div>
      </div>
    </div>
  );
}
