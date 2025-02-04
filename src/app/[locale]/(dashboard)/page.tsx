import Link from "next/link";
import { createClient } from "src/utils/supabase/server";
import type { ProductsType } from "./store/page";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";
import NewProductsSlider from "src/app/components/NewProductsSlider";
import { Button } from "src/app/components/ui/button";
import ShopByCategory from "src/app/components/ShopByCategory";
import MostPopularProducts from "src/app/components/MostPopularProducts";
import LatestArticles from "src/app/components/LatestArticles";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = await createClient();
  const locale = params.locale;

  // Get top 8 most popular products
  const { data: topProducts, error } = (await supabase
    .from("products")
    .select("*")
    .order("solded_quantity", { ascending: false })
    .limit(8)) as { data: ProductsType[]; error: any };

  if (error) {
    console.error(error);
    return;
  }

  // Get top 8 most new products
  const { data: newProducts, error: newProductsError } = (await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8)) as { data: ProductsType[]; error: any };

  if (newProductsError) {
    console.error(newProductsError);
    return;
  }

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
                  Power Your Life with the Best in Tech.
                </h1>
                <p className="max-sm:text-center text-base sm:text-xl text-white font-sans">
                  Whether you&apos;re just getting started, upgrading your
                  setup, or a tech pro, your device is as unique as you.
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
        <NewProductsSlider newProducts={newProducts} />
      </section>

      {/* Shop by Categories */}
      <ShopByCategory />
      {/* Most Popular Products */}
      <MostPopularProducts topProducts={topProducts} />

      {/* Latest Articles */}
      <LatestArticles locale={locale} />
    </>
  );
}
