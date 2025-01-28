"use client";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { ProductsType } from "../[locale]/(dashboard)/store/page";
import ProductItem from "../[locale]/(dashboard)/store/ProductItem";
import { useEffect, useState } from "react";

export default function HeroSlider({ products }: { products: ProductsType[] }) {
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
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="min-w-full max-w-xs"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex gap-4 ">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className=" basis-auto flex justify-center"
            >
              <ProductItem
                id={product.id}
                name={product.name}
                imageSrc={product.image_url}
                price={product.price}
                isProMember={true}
                userId={product.user_id}
                isNewProductSlider={true}
                sale={0.5}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
