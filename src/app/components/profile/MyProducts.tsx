import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import Image from "next/image";
import DeleteProduct from "../product/DeleteProduct";
import { createTranslator } from "next-intl";
import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../ui/textarea";
import EditProductModal from "../forms/ProductEditForm";

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
        <div
          key={product.id}
          className="flex gap-4 max-custom-sm:flex-col w-full justify-between items-center border rounded-lg p-4"
        >
          <div className="flex gap-4 justify-start items-center w-full">
            <Image
              src={product.image_urls?.[0] || "/assets/placeholder.png"}
              alt={product.name}
              width={800}
              height={600}
              className="w-12 h-12"
            />
            <p className="line-clamp-2 text-xs md:text-sm">{product.name}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="text-xs md:text-sm">
              {new Date(product.created_at)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </span>
            <p className="text-xs md:text-sm">${product.price / 100}</p>
            <p className="text-xs md:text-sm">
              {t("Profile.MyProductsForm.sold")}: {product.solded_quantity}
            </p>
            <DeleteProduct id={product.id} />

            {/* Modal window for product edit  */}
            <EditProductModal product={product} />
          </div>
        </div>
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
