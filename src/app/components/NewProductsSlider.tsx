"use client";

import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
    <div className="flex justify-center rounded-2xl">
      <Swiper
        className="overflow-hidden p-2 w-full"
        key={swiperKey}
        modules={[Navigation, Keyboard, Autoplay, Pagination, EffectFade]}
        spaceBetween={20}
        slidesPerView={4}
        keyboard={true}
        autoplay={{ delay: 4000 }}
        speed={1000}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="">
            <ProductItem
              id={product.id}
              name={product.name}
              imageSrc={product.image_url}
              price={product.price}
              isProMember={true}
              userId={product.user_id}
            />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="custom-prev bg-muted w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hover:text-primary duration-300">
          <ChevronLeftIcon className="size-5" />
        </div>
        <div className="custom-next bg-muted w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hover:text-primary duration-300">
          <ChevronRightIcon className="size-5" />
        </div>
      </Swiper>
    </div>
  );
}
