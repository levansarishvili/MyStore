import Image from "next/image";
import Link from "next/link";
import HeroSlider from "src/app/components/HeroSlider";
import { createClient } from "src/utils/supabase/server";

import type { ProductsType } from "./store/page";
import ProductItem from "./store/ProductItem";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").limit(1);
  if (error) {
    console.error(error);
    return;
  }
  const products = data as ProductsType[];
  const isProMember = await CheckSubscriptionStatus();

  return (
    <>
      <section className="grid grid-cols-[3fr_1fr] gap-12">
        {/* Slider */}
        <HeroSlider />

        {/* Search Bar */}
        <div className="grid grid-rows-2 gap-6 ">
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
      <section className="flex flex-col gap-8 w-full">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>

        <div className="grid grid-cols-8 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={product.image_url}
              price={product.price}
              isProMember={isProMember}
              products={products}
              userId={product.user_id}
            />
          ))}
        </div>
      </section>
    </>
  );
}
