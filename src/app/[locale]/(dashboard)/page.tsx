import Link from "next/link";
import { createClient } from "src/utils/supabase/server";
import type { ProductsType } from "./store/page";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";
import NewProductsSlider from "../../components/home/NewProductsSlider";
import { Button } from "src/app/components/ui/button";
import ShopByCategory from "src/app/components/home/ShopByCategory";
import MostPopularProducts from "../../components/home/MostPopularProducts";
import LatestArticles from "../../components/home/LatestArticles";
import GetUserData from "src/app/components/GetUserData";
import Image from "next/image";
import { createTranslator } from "next-intl";

interface cartItemsType {
  product_id: string;
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  const supabase = await createClient();
  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    console.error("User ID not found");
    return;
  }

  // fetch products from cart
  const { data: cartItems, error: fetchError } = (await supabase
    .from("cart")
    .select("product_id")
    .eq("user_id", userId)) as { data: cartItemsType[]; error: any };

  if (fetchError) {
    console.error(fetchError);
    return;
  }

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

  // Check if any popular product is in cart
  const cartTopProductIds = new Set(cartItems?.map((item) => item.product_id));
  const inCartArrTop = topProducts.map((product) =>
    cartTopProductIds.has(product.id)
  );

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

  // Check if any popular product is in cart
  const cartNewProductIds = new Set(cartItems?.map((item) => item.product_id));
  const inCartArrNew = newProducts.map((product) =>
    cartNewProductIds.has(product.id)
  );

  const isProMember = await CheckSubscriptionStatus();

  return (
    <>
      {/* Hero Section */}
      <section className="flex max-sm:flex-col max-sm:justify-end max-sm:pb-16 w-full h-[38rem] sm:h-[40rem] md:h-[44rem] lg:h-[48rem] bg-cover bg-top items-center bg-[url('/assets/bg-img.png')]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
          <div className="order-last md:order-first">
            <div className="flex flex-col max-md:items-center max-sm:gap-6 gap-10">
              <div className="rounded-2xl flex flex-col gap-4">
                <h1 className="max-md:text-center bg-text-gradient bg-clip-text text-2xl md:text-3xl lg:text-4xl font-medium lg:leading-[3rem] text-white">
                  {t("Hero.title")}
                </h1>
                <p className="max-sm:text-center text-sm md:text-base text-white font-sans">
                  {t("Hero.description")}.
                </p>
              </div>
              <Link href={`/${locale}/store`} className="">
                <Button
                  className="text-sm sm:text-base text-white font-sans font-medium h-12 hover:bg-[#2ca76e] transition-all duration-300"
                  variant="default"
                >
                  {t("Hero.button")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="order-first md:order-last justify-center flex flex-col items-center">
            <Image
              src="/assets/banner-img.png"
              alt="baner"
              width={1200}
              height={600}
              className="w-2/3 md:w-auto"
            />
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="w-full flex flex-col max-sm:items-center gap-12 overflow-hidden max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        <h2 className="text-2xl md:text-3xl font-medium">
          {t("NewProducts.title")}
        </h2>
        <NewProductsSlider
          locale={locale}
          newProducts={newProducts}
          inCartArrNew={inCartArrNew}
        />
      </section>

      {/* Shop by Categories */}
      <ShopByCategory locale={locale} />
      {/* Most Popular Products */}
      <MostPopularProducts
        topProducts={topProducts}
        inCartArrTop={inCartArrTop}
        locale={locale}
      />

      {/* Latest Articles */}
      <LatestArticles locale={locale} />
    </>
  );
}
