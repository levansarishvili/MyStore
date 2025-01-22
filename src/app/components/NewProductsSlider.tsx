"use client";

import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { ProductsType } from "../[locale]/(dashboard)/store/page";
import ProductItem from "../[locale]/(dashboard)/store/ProductItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface SliderDataType {
  slidesPerView: number;
  spaceBetween: number;
  products: ProductsType[];
  speed?: number;
}

export default function NewProductsSlider({
  slidesPerView,
  spaceBetween,
  products,
  speed,
}: SliderDataType) {
  console.log(products);
  return (
    <div className="w-full mx-auto rounded-lg overflow-hidden">
      <Swiper
        className="overflow-hidden p-2 h-[28rem]"
        modules={[Navigation, Keyboard, Autoplay, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        autoplay={{ delay: 4000 }}
        speed={speed}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
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
