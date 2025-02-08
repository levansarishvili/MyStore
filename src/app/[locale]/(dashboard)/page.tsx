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
import { createTranslator } from "next-intl";
import BannerSlider from "src/app/components/home/BannerSlider";
import Image from "next/image";

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
      <section className="mt-10 flex max-sm:justify-end w-full mx-auto px-6 md:px-12 lg:px-20 py-0">
        <div className="grid grid-cols-1 custom-lg:grid-cols-[3fr_1fr] gap-6 md:gap-8 w-full">
          {/* Hero Slider */}
          <div className="relative bg-muted rounded-2xl overflow-hidden shadow-md">
            <BannerSlider />

            <div className="rounded-2xl p-2 md:p-4 absolute z-2 left-0 md:left-6 bottom-0 md:bottom-8 flex flex-col items-start text-center gap-2 md:gap-4 w-full max-w-[14rem] sm:max-w-[20rem] md:max-w-[26rem]">
              <h1 className="bg-muted/25 text-foreground p-2 rounded-lg text-start tracking-wide text-sm sm:text-xl md:text-2xl lg:text-4xl font-semibold leading-snug sm:leading-tight uppercase">
                {t("Hero.title")}
              </h1>
              <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 p-2 items-start">
                <p className="max-sm:hidden text-start text-xs sm:text-sm md:text-base text-muted-foreground font-sans leading-relaxed sm:leading-normal">
                  {t("Hero.description")}
                </p>
                <Link href={`/${locale}/store`}>
                  <Button
                    className="text-sm md:px-8 font-medium bg-primary  hover:bg-[#2ca76e] transition-all duration-300 rounded-lg shadow-md uppercase"
                    variant="default"
                  >
                    {t("Hero.button")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex custom-lg:flex-col items-center gap-6 w-full h-full">
            <div className="overflow-hidden w-full h-full rounded-2xl bg-muted flex items-center justify-center text-white font-medium shadow-md">
              <Image
                src="/assets/small-banner-2.png"
                width={600}
                height={400}
                alt="banner"
              />
            </div>
            <div className="overflow-hidden w-full h-full rounded-2xl bg-muted flex items-center justify-center text-white font-medium shadow-md">
              <Image
                src="/assets/small-banner-1.png"
                width={600}
                height={400}
                alt="banner"
              />
            </div>
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
