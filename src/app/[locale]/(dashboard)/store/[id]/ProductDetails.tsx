"use client";

import Image from "next/image";
import { ProductsType } from "../page";
import { Button } from "src/app/components/ui/button";

export default function ProductDetails({ product }: { product: ProductsType }) {
  return (
    <div className="flex flex-col items-center gap-20 mt:10 lg:mt-16">
      <h1 className="text-3xl lg:text-4xl font-medium">Product Details</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 rounded-2xl p-10 transition-all duration-300 border shadow-lg">
        {/* Product Details */}

        <div className="flex justify-center items-center w-full overflow-hidden h-[30rem] transition-all duration-300">
          <Image
            className="w-96 h-96 object-contain"
            src={product?.image_urls?.[1] || "/assets/placeholder-img.png"}
            alt={product?.name}
            width={250}
            height={250}
            quality={100}
            priority={true}
          />
        </div>

        {/* Product Settings */}
        <div className="flex flex-col items-start justify-center gap-8 max-w-[40rem] p-6">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 className="text-2xl font-medium">{product?.name}</h2>
            <p className="text-lg text-primary font-medium">
              {product?.category}
            </p>
            <p className="text-base">{product?.description}</p>
          </div>
          <p className="text-base font-medium">
            Price: {product?.price / 100} $
          </p>
          <div className="flex gap-12">
            <Button
              variant={"default"}
              className="hover:bg-[#38cb89]/80 transition all duration-300 text-foreground"
            >
              Wishlist
            </Button>
            <Button
              variant={"default"}
              className="hover:bg-[#38cb89]/80 transition all duration-300 text-foreground"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
