"use client";

import Image from "next/image";
import { ProductsType } from "../page";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "src/app/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export default function ProductDetails({ product }: { product: ProductsType }) {
  return (
    <div className="flex flex-col items-center gap-12 mt-10 lg:mt-16">
      <h1 className="text-2xl lg:text-3xl font-medium">Product Details</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 rounded-2xl transition-all duration-300">
        {/* Product Details */}
        <div className="flex justify-center items-center w-full overflow-hidden h-auto transition-all duration-300">
          <Carousel className="w-full max-w-xs">
            <CarouselContent className="">
              {product?.image_urls?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      className="object-contain"
                      src={image || "/assets/placeholder-img.png"}
                      alt={product?.name}
                      width={1200}
                      height={600}
                      quality={100}
                      priority={true}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>

        {/* Product Settings */}
        <div className="flex flex-col items-start justify-center gap-6 max-w-[40rem] p-4">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 className="text-xl md:text-2xl font-medium">{product?.name}</h2>
            <p className="text-base md:text-lg text-primary font-medium">
              {product?.category}
            </p>
            <p className="text-sm md:text-base">{product?.description}</p>
          </div>
          <p className="text-sm md:text-base font-medium">
            Price: {product?.price / 100} $
          </p>
          <div className="flex">
            <Button
              variant={"default"}
              className="hover:bg-[#38cb89]/80 transition all duration-300 text-white text-sm"
            >
              <ShoppingCart className="size-4 fill-primary stroke-white" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
