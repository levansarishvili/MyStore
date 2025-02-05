import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import Image from "next/image";
import DeleteProduct from "../product/DeleteProduct";

export default async function MyProducts() {
  const supabase = await createClient();
  const userdata = await GetUserData();

  const { data: myProducts, error } = (await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .eq("user_id", userdata?.id)) as { data: ProductsType[]; error: any };

  return (
    <section className="flex flex-col gap-4">
      {myProducts?.map((product) => (
        <div
          key={product.id}
          className="flex gap-4 w-full justify-between border rounded-lg p-4"
        >
          <Image
            src={product.image_urls?.[0] || "/assets/placeholder.png"}
            alt={product.name}
            width={800}
            height={600}
            className="w-12 h-12"
          />
          <p>{product.name}</p>
          <span>
            {new Date(product.created_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
          </span>
          <p>${product.price / 100}</p>
          <p>{product.solded_quantity}</p>
          <DeleteProduct id={product.id} />
        </div>
      ))}
    </section>
  );
}
