import Image from "next/image";
import Link from "next/link";
import { createClient } from "src/utils/supabase/server";
import { ArrowRight, Mail } from "lucide-react";
import type { ProductsType } from "./store/page";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";
import NewProductsSlider from "src/app/components/NewProductsSlider";
import { Button } from "src/app/components/ui/button";

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").limit(8);
  if (error) {
    console.error(error);
    return;
  }
  const products = data as ProductsType[];
  const isProMember = await CheckSubscriptionStatus();

  return (
    <>
      {/* Hero Section */}
      <section className="flex max-sm:flex-col max-sm:justify-end max-sm:pb-16 w-full h-[38rem] sm:h-[40rem] md:h-[44rem] lg:h-[48rem] bg-cover bg-top items-center bg-[url('/assets/bg-img-small.png')] sm:bg-[url('/assets/bg-img.png')]">
        <div className="bg-black/20 w-full h-full flex justify-center items-center max-sm:items-end">
          <div className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
            <div className="flex flex-col max-sm:items-center max-sm:gap-6 gap-10 max-w-[32rem]">
              <div className="rounded-2xl flex flex-col gap-4">
                <h1 className="max-sm:text-center bg-text-gradient bg-clip-text max-w-[32rem] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[3rem] sm:leading-[3.5rem] md:leading-[4.5rem] lg:leading-[5rem] text-white">
                  More than just a game. It&apos;s a lifestyle.
                </h1>
                <p className="max-sm:text-center text-base sm:text-xl text-white font-sans">
                  Whether you&apos;re just starting out, have played your whole
                  life or you&apos;re a Tour pro, your swing is like a
                  fingerprint.
                </p>
              </div>
              <Link href="/store" className="w-1/2">
                <Button
                  className="text-sm sm:text-lg font-sans font-medium h-12 w-full hover:bg-[#38CB89]/80 transition-all duration-300"
                  variant="default"
                >
                  Shopping Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="w-full flex flex-col max-sm:items-center gap-12 overflow-hidden max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        <h2 className="text-2xl md:text-3xl font-medium">New Products</h2>
        <NewProductsSlider products={products} />
      </section>

      {/* Shop by Categories */}
      <section className="w-full flex flex-col max-sm:items-center gap-12 overflow-hidden max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        <h2 className="text-2xl md:text-3xl font-medium">Shop by Categories</h2>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-clubs.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Clubs"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Golf Clubs</p>
            </div>
          </Link>

          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-balls.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Balls"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Golf Balls</p>
            </div>
          </Link>

          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-bags.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Bags"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Golf Bags</p>
            </div>
          </Link>

          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-clothing.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Clothing"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Clothing & Rainwear</p>
            </div>
          </Link>

          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-footwear.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Footwear"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Footwear</p>
            </div>
          </Link>

          <Link href="/store">
            <div className="flex flex-col gap-6 items-center opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="bg-secondary">
                <Image
                  src="/assets/golf-accessories.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="Golf Accessories"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-medium">Accessories</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="w-full grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 bg-black">
        <Image
          src="/assets/offer-img.png"
          width={1200}
          height={600}
          quality={100}
          alt="Limited Time Offer"
          className=""
        />
        <div className="pl-6 md:pl-10 lg:pl-16 flex flex-col gap-8 justify-center items-start">
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-primary text-base font-semibold uppercase">
              Limited Edition
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-white">
              Hurry up! 30% OFF
            </h2>
            <p className="sm:text-sm md:text-base lg:text-xl text-white">
              Find clubs that are right for your game
            </p>
          </div>

          <div className="flex flex-col justify-start">
            <Link href="/store">
              <Button
                className="text-sm sm:text-base font-sans font-medium h-10 w-full hover:bg-[#38CB89]/80 transition-all duration-300"
                variant="default"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="w-full flex flex-col gap-12 max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        <div className="w-full flex justify-between gap-16">
          <h2 className="text-2xl md:text-433xl font-medium">
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="flex gap-2 items-center hover:text-primary transition-all duration-300"
          >
            <p className="text-sm sm:text-base font-medium">View More</p>
            <ArrowRight className="size-5" />
          </Link>
        </div>

        <div className="flex gap-8 flex-wrap justify-center">
          <div className="flex flex-col gap-4 items-start">
            <Image
              src="/assets/article-1.png"
              width={500}
              height={500}
              quality={100}
              alt="Latest Articles"
              className="w-full h-full object-cover"
            />
            <p className="text-base md:text-xl font-medium">
              Air Jordan x Travis Scott Event
            </p>
            <Link
              href="/blog"
              className="flex gap-2 items-center hover:text-primary transition-all duration-300"
            >
              <p className="text-sm md:text-base font-medium">Read More</p>
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 items-start">
            <Image
              src="/assets/article-2.png"
              width={500}
              height={500}
              quality={100}
              alt="Latest Articles"
              className="w-full h-full object-cover"
            />
            <p className="text-base md:text-xl font-medium">
              The timeless classics on the green
            </p>
            <Link
              href="/blog"
              className="flex gap-2 items-center hover:text-primary transition-all duration-300"
            >
              <p className="text-sm md:text-base font-medium">Read More</p>
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 items-start">
            <Image
              src="/assets/article-3.png"
              width={500}
              height={500}
              quality={100}
              alt="Latest Articles"
              className="w-full h-full object-cover"
            />
            <p className="text-base md:text-xl font-medium">
              The 2023 Ryder Cup
            </p>
            <Link
              href="/blog"
              className="flex gap-2 items-center hover:text-primary transition-all duration-300"
            >
              <p className="text-sm md:text-base font-medium">Read More</p>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
