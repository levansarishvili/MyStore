import { createClient } from "src/utils/supabase/server";
import ProductCartList from "../../../components/product/ProductCartList";
import GetUserData from "src/app/components/GetUserData";

interface ProductType {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
}

export default async function ShoppingCartPage() {
  const supabase = await createClient();
  const userData = await GetUserData();
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userData?.id);
  const products = data as ProductType[];

  return (
    <section className="flex justify-start flex-col w-full min-h-screen items-center gap-10 mt-10 lg:mt-16 max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Cart</h1>

      <ProductCartList products={products} />
    </section>
  );
}
