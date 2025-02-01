import Image from "next/image";
import { createClient } from "src/utils/supabase/server";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "src/app/components/ui/button";
import ProductCartList from "src/app/components/ProductCartList";

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
  const { data: products, error } = (await supabase
    .from("cart")
    .select("*")) as {
    data: ProductType[];
    error: any;
  };
  console.log(products);

  return (
    <section className="flex justify-center flex-col w-full items-center gap-10 mt-10 lg:mt-16 max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Cart</h1>

      <ProductCartList products={products} />
    </section>
  );
}
