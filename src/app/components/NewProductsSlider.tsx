"use client";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

// ============================

import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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
        className="min-w-full max-w-xs"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-10 -mr-6">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <ProductItem
                id={product.id}
                name={product.name}
                imageSrc={product.image_url}
                price={product.price}
                isProMember={true}
                userId={product.user_id}
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
