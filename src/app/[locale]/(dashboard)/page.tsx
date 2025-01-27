import Image from "next/image";
import Link from "next/link";
import HeroSlider from "src/app/components/HeroSlider";
import { createClient } from "src/utils/supabase/server";
import {
  Smartphone,
  Tablet,
  Tv,
  Laptop,
  Headphones,
  Camera,
} from "lucide-react";
import type { ProductsType } from "./store/page";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";
import NewProductsSlider from "src/app/components/NewProductsSlider";

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
      <section className="grid grid-cols-[3fr_1fr] max-md:grid-cols-1 gap-12 overflow-hidden">
        {/* Slider */}
        <HeroSlider />

        {/* Search Bar */}
        <div className="grid grid-rows-2 max-md:grid-rows-1 max-md:grid-cols-2 gap-6 ">
          <div className="border bg-card rounded-2xl shadow-md">
            <Image
              src="/assets/slider-1.png"
              width={1200}
              height={600}
              alt="offer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="border bg-card rounded-2xl shadow-md">
            <Image
              src="/assets/slider-1.png"
              width={1200}
              height={600}
              alt="offer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="w-full grid grid-cols-1 gap-12 overflow-hidden">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>

        <NewProductsSlider products={products} />
      </section>

      {/* Featured Categories */}
      <section className="flex flex-col gap-12 w-full">
        <h2 className="text-2xl font-semibold">Shop by Categories</h2>

        <div className="flex flex-wrap gap-12 w-full justify-center">
          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Smartphone className="size-8" />
            <p>Smartphones</p>
          </div>

          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Tablet className="size-8" />
            <p>Tablets</p>
          </div>
          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Laptop className="size-8" />
            <p>Laptops</p>
          </div>
          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Tv className="size-8" />
            <p>TV</p>
          </div>
          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Headphones className="size-8" />
            <p>Headphones</p>
          </div>
          <div className="flex flex-col w-28 h-28 text-sm items-center justify-center gap-2 rounded-2xl border  hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
            <Camera className="size-8" />
            <p>Photo | Video</p>
          </div>
        </div>
      </section>
    </>
  );
}
