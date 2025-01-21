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
import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="max-w-[60rem] flex justify-center rounded-2xl overflow-hidden">
      <Swiper
        className="overflow-hidden p-2 h-[28rem]"
        modules={[Navigation, Keyboard, Autoplay, Pagination, EffectFade]}
        spaceBetween={25}
        slidesPerView={2}
        keyboard={true}
        autoplay={{ delay: 4000 }}
        speed={1000}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="">
          <Image
            src="/assets/slider-1.jpg"
            width={400}
            height={400}
            alt="slider"
            className="w-full h-full rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <Image
            src="/assets/slider-2.jpg"
            width={400}
            height={400}
            alt="slider"
            className="w-full h-full rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <Image
            src="/assets/slider-3.jpg"
            width={400}
            height={400}
            alt="slider"
            className="w-full h-full rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <Image
            src="/assets/slider-4.png"
            width={400}
            height={400}
            alt="slider"
            className="w-full h-full rounded-2xl"
          />
        </SwiperSlide>
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
