import { createClient } from "src/utils/supabase/server";
import ProductCartList from "../../../components/product/ProductCartList";
import GetUserData from "src/app/components/GetUserData";
import { createTranslator } from "next-intl";

interface ProductType {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
}

interface paramsType {
  params: { locale: string };
}

export default async function ShoppingCartPage({ params }: paramsType) {
  const locale = params.locale;

  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  const supabase = await createClient();
  const userData = await GetUserData();
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userData?.id);
  const products = data as ProductType[];

  return (
    <section className="flex justify-start flex-col w-full min-h-screen items-center gap-10 mt-10 lg:mt-16 max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl font-medium">{t("Cart.title")}</h1>

      <ProductCartList products={products} />
    </section>
  );
}
