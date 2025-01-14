import { createClient } from "../../../../utils/supabase/server";
import CreateProductForm from "../../../components/forms/CreateProductForm";
import ProductItem from "./ProductItem";

export default async function Store() {
  // Fetch products
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  const products = data;
  // console.log(products);
  return (
    <section className="flex flex-col items-center gap-20 w-full">
      <h1 className="text-3xl font-semibold">Products</h1>
      <div className="flex gap-36 w-full">
        <div className="flex items-start">
          <CreateProductForm />
        </div>
        <div className="flex flex-wrap gap-12">
          {products?.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={product.image_url}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
