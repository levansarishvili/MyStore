import { createClient } from "../../../../utils/supabase/server";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import CreateProductForm from "../../../components/forms/CreateProductForm";
import GetUserData from "../../../components/GetUserData";
import ProductItem from "./ProductItem";

export interface ProductsType {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
  created_at: string;
  user_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  sale: number;
}

export default async function Store() {
  // Get user data
  const userData = await GetUserData();
  const userId = userData?.id;

  // Fetch products
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  const products = data as ProductsType[];
  const sortedProducts = products.sort((a, b) => Number(b.id) - Number(a.id));
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="flex flex-col items-center gap-20 w-full">
      <h1 className="text-3xl font-semibold">Products</h1>

      <div className="flex gap-36 w-full">
        <div className="flex items-start">
          {/* Show create product form if user is a Pro member */}
          {isProMember && <CreateProductForm />}
        </div>
        <div className="flex flex-wrap gap-12">
          {products?.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={product.image_url}
              price={product.price}
              isProMember={isProMember}
              products={products}
              userId={userId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
