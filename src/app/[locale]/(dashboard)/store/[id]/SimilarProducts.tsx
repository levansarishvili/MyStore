import { ProductsType } from "../page";
import ProductItem from "../ProductItem";
import { useTranslations } from "next-intl";

interface Props {
  products: ProductsType[];
  locale: string;
  cartProductIds: {
    product_id: number;
  }[];
  reviews: {
    rating: number;
    user_id: string;
    product_id: string;
  }[];
}

export default function SimilarProducts({
  products,
  locale,
  reviews,
  cartProductIds,
}: Props) {
  const t = useTranslations("Products.SimilarProducts");
  return (
    <section
      className={`${
        products?.length > 0
          ? "w-full flex flex-col mt-10 lg:mt-16 gap-10 lg:gap-14"
          : "hidden"
      }`}
    >
      <div className="w-full flex justify-center items-center">
        <h2 className="text-center text-xl md:text-2xl font-medium">
          {t("title")}
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 min-[460px]:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 gap-6 justify-center">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            imageSrc={product.image_urls?.[1] || "/assets/placeholder.png"}
            name={product.name}
            price={product.price}
            userId={product.user_id}
            in_cart={cartProductIds.some(
              (item) => item.product_id === Number(product.id)
            )}
            reviews={reviews.filter(
              (review) => review.product_id === product.id
            )}
          />
        ))}
      </div>
    </section>
  );
}
