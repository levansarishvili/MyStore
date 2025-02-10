import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import ProductItem from "../../[locale]/(dashboard)/store/ProductItem";
import { createTranslator } from "next-intl";
interface Props {
  topProducts: ProductsType[];
  inCartArrTop: boolean[];
  locale: string;
}

export default async function MostPopularProducts({
  topProducts,
  inCartArrTop,
  locale,
}: Props) {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  return (
    <section className="flex flex-col gap-6 md:gap-8 lg:gap-12 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h2 className="w-full text-center sm:text-start text-xl sm:text:2xl md:text-3xl font-medium">
        {t("PopularProducts.title")}
      </h2>

      <div className="w-full grid grid-cols-1 min-[460px]:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 gap-6 justify-center">
        {topProducts.map((product, index) => (
          <>
            {/* <div className="absolute top-4 left-6 bg-background text-foreground font-medium text-xs px-3 py-1 rounded-lg">
              TOP
            </div> */}
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={product.image_urls?.[1] || "/assets/placeholder.png"}
              price={product.price}
              products={topProducts}
              userId={product.user_id}
              in_cart={inCartArrTop[index]}
            />
          </>
        ))}
      </div>
    </section>
  );
}
