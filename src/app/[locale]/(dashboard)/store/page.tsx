import { createClient } from "../../../../utils/supabase/server";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import GetUserData from "../../../components/GetUserData";
import ProductItem from "./ProductItem";

export interface ProductsType {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_urls?: string[];
  created_at: string;
  user_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  sale: number;
  sale_price: number;
}

export default async function Store() {
  // Get user data
  const userData = await GetUserData();
  const userId = userData?.id;

  // Fetch products
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  const products = data as ProductsType[];
  console.log(products);
  const sortedProducts = products.sort((a, b) => Number(b.id) - Number(a.id));
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Products</h1>

      <div className="flex flex-wrap justify-center gap-20 w-full">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imageSrc={product.image_urls?.[1] || "/assets/placeholder-img.png"}
            price={product.price}
            isProMember={isProMember}
            products={products}
            userId={userId}
          />
        ))}
      </div>
    </section>
  );
}
