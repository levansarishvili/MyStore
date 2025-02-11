"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "src/utils/supabase/client";
import { ProductsType } from "../../[locale]/(dashboard)/store/page";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../ui/textarea";
import { Loader, SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  images: z
    .instanceof(File, { message: "Invalid file format" })
    .array()
    .optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProductModal({
  product,
}: {
  product: ProductsType;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price / 100,
      brand: product.brand,
      description: product.description,
      category: product.category,
      images: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const t = useTranslations("Profile.editProductForm");

  // Function to handle image deletion
  const handleImageDelete = async (imageUrls: string[] | undefined) => {
    if (!imageUrls || imageUrls.length === 0) return;
    for (const imageUrl of imageUrls) {
      const filename = imageUrl.split("/").pop();
      if (filename) {
        await supabase.storage.from("product-images").remove([filename]);
      }
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);

    const uploadedUrls: string[] = [];
    if (data.images && data.images.length > 0) {
      for (const image of data.images) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error } = await supabase.storage
          .from("product-images")
          .upload(fileName, image);
        if (error) return;
        const { data: publicUrl } = supabase.storage
          .from("product-images")
          .getPublicUrl(uploadData.path);
        uploadedUrls.push(publicUrl.publicUrl);
      }
    }

    // Update product details on supabase
    const { error } = await supabase
      .from("products")
      .update({
        name: data.name,
        price: data.price * 100,
        brand: data.brand,
        description: data.description,
        category: data.category,
        image_urls: uploadedUrls.length ? uploadedUrls : product.image_urls,
      })
      .eq("id", product.id);

    if (error) console.error("Failed to update product:", error.message);

    // Update product on Stripe
    const stripeResponse = await fetch("/api/update-product-on-stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id as string,
        name: data.name,
        description: data.description,
        images: uploadedUrls.length ? uploadedUrls : product.image_urls,
        newPrice: data.price * 100 === product.price ? null : data.price * 100,
      }),
    });

    if (!stripeResponse.ok) {
      console.error("Failed to update product on Stripe:", stripeResponse);
      setLoading(false);
    }

    // If new images are uploaded, delete the old ones
    if (data.images && data.images.length > 0) {
      await handleImageDelete(product.image_urls);
    }

    setLoading(false);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-6 h-6 p-0 bg-primary rounded-md hover:border-primary hover:bg-primary-200 transition-all duration-200 ease-in-out">
          <SquarePen className="size-4 text-foreground text-white cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-h-[35rem] max-w-[90%] sm:max-w-[60%] h-[90%] overflow-y-scroll bg-muted rounded-lg">
        <DialogHeader className="text-base sm:text-xl">
          <DialogTitle className="text-center text-base sm:text-xl">
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label
              className="text-muted-foreground text-xs md:text-sm"
              htmlFor="name"
            >
              {t("name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="text-xs md:text-sm bg-background rounded-lg border-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              className="text-muted-foreground text-xs md:text-sm"
              htmlFor="price"
            >
              {t("price")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              className="text-xs md:text-sm bg-background rounded-lg border-none"
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              className="text-muted-foreground text-xs md:text-sm"
              htmlFor="brand"
            >
              {t("brand")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="brand"
              {...register("brand")}
              className="text-xs md:text-sm bg-background rounded-lg border-none"
            />
            {errors.brand && (
              <p className="text-red-500 text-xs">{errors.brand.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              className="text-muted-foreground text-xs md:text-sm"
              htmlFor="description"
            >
              {t("description")}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="h-[8rem] sm:h-[10rem] text-xs md:text-sm bg-background rounded-lg border-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              className="text-muted-foreground text-xs md:text-sm"
              htmlFor="category"
            >
              {t("category")}
            </Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue={product.category}
            >
              <SelectTrigger className="text-xs md:text-sm bg-background rounded-lg border-none">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-background rounded-lg border-none">
                <SelectItem
                  value="Smartphones"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item1")}
                </SelectItem>
                <SelectItem
                  value="Laptops"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item2")}
                </SelectItem>
                <SelectItem
                  value="Tablets"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item3")}
                </SelectItem>
                <SelectItem
                  value="Audio"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item4")}
                </SelectItem>
                <SelectItem
                  value="Monitors"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item5")}
                </SelectItem>
                <SelectItem
                  value="Photo+and+video"
                  className="text-xs md:text-sm rounded-lg"
                >
                  {t("categoryList.item6")}
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground text-xs md:text-sm">
              Images
            </Label>
            <Input
              className="text-xs md:text-sm bg-background rounded-lg border-none"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setValue("images", files as any, { shouldValidate: true });
              }}
            />
          </div>

          <DialogFooter>
            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className={`mt-4 bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
                  loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    {t("button")}
                    <Loader className="size-4 animate-spin h-5 w-5" />
                  </div>
                ) : (
                  t("button")
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
