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
    <div className="w-full order-first md:order-last justify-center flex flex-col items-center">
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
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-1.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full max-custom-xs:hidden"
                priority
              />
              {/* For small screens */}
              <Image
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-small-1.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full custom-xs:hidden"
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <div className="w-full">
              <Image
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-2.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full max-custom-xs:hidden"
                priority
              />
              {/* For small screens */}
              <Image
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-small-2.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full custom-xs:hidden"
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center">
            <div className="w-full">
              <Image
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-3.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full max-custom-xs:hidden"
                priority
              />
              {/* For small screens */}
              <Image
                src="https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//hero-slider-small-3.webp"
                alt="banner"
                width={1200}
                height={600}
                className="w-full h-full custom-xs:hidden"
                priority
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
