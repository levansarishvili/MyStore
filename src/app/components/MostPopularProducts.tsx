import { createClient } from "src/utils/supabase/server";
import { ProductsType } from "../[locale]/(dashboard)/store/page";
import ProductItem from "../[locale]/(dashboard)/store/ProductItem";

export default async function MostPopularProducts() {
  const supabase = await createClient();
  const { data: topProducts } = (await supabase
    .from("products")
    .select("*")
    .order("solded_quantity", { ascending: false })
    .limit(8)) as { data: ProductsType[] };

  if (!topProducts) {
    console.log("No products found");
    return;
  }

  return (
    <section className="flex flex-col gap-12 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h2 className="text-2xl md:text-3xl font-medium">
        Most Popular Products
      </h2>

      <div className="w-full grid grid-cols-1 min-[460px]:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 gap-6 justify-center">
        {topProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imageSrc={product.image_urls?.[1] || ""}
            price={product.price}
            products={topProducts}
            userId={product.user_id}
          />
        ))}
      </div>
    </section>
  );
}
