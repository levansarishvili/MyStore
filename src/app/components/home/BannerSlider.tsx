"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function BannerSlider() {
  return (
    <div className="w-full order-first md:order-last justify-center flex flex-col items-cente">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="">
          <CarouselItem className="flex justify-center items-center w-full">
            <div className="w-full">
              <Image
                src="/assets/hero-slider-1.png"
                alt="banner"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <div className="w-full">
              <Image
                src="/assets/hero-slider-2.png"
                alt="banner"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <div className="w-full">
              <Image
                src="/assets/hero-slider-3.png"
                alt="banner"
                width={1200}
                height={600}
                className="w-full"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </div>
  );
}
