"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import ProductItem from "../../[locale]/(dashboard)/store/ProductItem";
import { useEffect, useState } from "react";
import type { reviewsType } from "../../[locale]/(dashboard)/page";

interface Props {
  newProducts: ProductsType[];
  inCartArrNew: boolean[];
  locale: string;
  reviews: reviewsType[];
}

export default function NewProductsSlider({
  newProducts,
  inCartArrNew,
  locale,
  reviews,
}: Props) {
  const [swiperKey, setSwiperKey] = useState(0);

  // Handle Swiper reinitialization on resize
  useEffect(() => {
    const handleResize = () => {
      setSwiperKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center rounded-2xl w-full">
      <Carousel
        className="min-w-full max-w-xs"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex gap-3.5 py-4">
          {newProducts.map((product, index) => (
            <CarouselItem
              key={product.id}
              className=" basis-auto flex justify-center relative"
            >
              <div className="absolute top-4 left-6 bg-primary text-white font-medium text-xs px-3 py-1 rounded-lg">
                New
              </div>
              <ProductItem
                id={product.id}
                name={product.name}
                imageSrc={
                  product.image_urls?.[0] || "/assets/placeholder-img.png"
                }
                price={product.price}
                isProMember={true}
                userId={product.user_id}
                in_cart={inCartArrNew[index]}
                reviews={reviews.filter(
                  (review) => review.product_id === product.id
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 max-md:hidden" />
        <CarouselNext className="right-0 max-md:hidden" />
      </Carousel>
    </div>
  );
}
