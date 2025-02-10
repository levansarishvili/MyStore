import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import Image from "next/image";
import DeleteProduct from "../product/DeleteProduct";
import { createTranslator } from "next-intl";
import EditProductModal from "../forms/ProductEditForm";
import { Card, CardContent } from "../ui/card";

export default async function MyProducts({ locale }: { locale: string }) {
  const supabase = await createClient();
  const userdata = await GetUserData();

  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  const { data: myProducts, error } = (await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .eq("user_id", userdata?.id)) as { data: ProductsType[]; error: any };

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      {myProducts?.map((product) => (
        <Card
          key={product.id}
          className="w-full rounded-xl border border-muted bg-muted"
        >
          <CardContent className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Image & Name */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-1/4">
              <Image
                src={product.image_urls?.[0] || "/assets/placeholder.png"}
                alt={product.name}
                width={800}
                height={600}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="line-clamp-2 text-sm font-medium text-center">
                {product.name}
              </p>
            </div>

            {/* Product Info */}
            <div className="flex flex-col items-center gap-2 sm:w-2/4">
              <span className="text-xs text-muted-foreground">
                {new Date(product.created_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </span>
              <p className="text-sm font-semibold">
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("Profile.MyProductsForm.sold")}: {product.solded_quantity}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 sm:w-1/4  justify-center sm:justify-end">
              <EditProductModal product={product} />
              <DeleteProduct id={product.id} />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* If no blog is found */}
      {!myProducts?.length && (
        <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg bg-muted">
          <p className="text-sm md:text-base text-muted-foreground">
            {t("Profile.MyProductsForm.emptyMessage")}
          </p>
        </div>
      )}
    </section>
  );
}
