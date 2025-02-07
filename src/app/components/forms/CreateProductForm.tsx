"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { createClient } from "../../../utils/supabase/client";
import Loading from "../../loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  brand: z.string().min(2, "Brand is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "At least one image is required"),
});
type FormData = z.infer<typeof formSchema>;
export default function CreateProductForm() {
  const t = useTranslations("Profile.AddProductForm");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  async function uploadImages(files: FileList) {
    const uploadedUrls: string[] = [];
    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);
      if (error) return null;
      const { data: publicUrl } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);
      uploadedUrls.push(publicUrl.publicUrl);
    }
    return uploadedUrls;
  }
  async function onSubmit(data: FormData) {
    setLoading(true);
    const uploadedImageUrls = await uploadImages(data.images);
    if (!uploadedImageUrls) {
      alert("Failed to upload images. Please try again.");
      return;
    }
    const response = await fetch("/api/create-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, images: uploadedImageUrls }),
    });
    if (response.ok) {
      setLoading(false);
      setCreatedSuccessfully(true);
      router.refresh();
    }
  }
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {createdSuccessfully && (
        <p className="text-primary text-base md:text-2xl font-medium">
          {t("addMessage")} ✔
        </p>
      )}
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-muted sm:p-6 w-full"
        >
          {/* Product Details */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* English Details */}
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-muted-foreground"
                  htmlFor="name"
                >
                  {t("name")}
                  <span className="text-destructive">*</span>
                </label>
                <input
                  {...register("name")}
                  className={`border ${
                    errors.name ? "border-destructive" : "border-muted"
                  } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  id="name"
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-muted-foreground"
                  htmlFor="brand"
                >
                  {t("brand")}
                  <span className="text-destructive">*</span>
                </label>
                <input
                  {...register("brand")}
                  className={`border ${
                    errors.brand ? "border-destructive" : "border-muted"
                  } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  id="brand"
                />
                {errors.brand && (
                  <p className="text-destructive text-xs">
                    {errors.brand.message}
                  </p>
                )}
              </div>
            </div>

            {/* Pricing and Description */}
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-muted-foreground"
                  htmlFor="price"
                >
                  {t("price")}
                  <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={`border ${
                    errors.price ? "border-destructive" : "border-muted"
                  } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  id="price"
                />
                {errors.price && (
                  <p className="text-destructive text-xs">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-muted-foreground"
                  htmlFor="description"
                >
                  {t("description")}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  {...register("description")}
                  className={`border ${
                    errors.description ? "border-destructive" : "border-muted"
                  } h-32 w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  id="description"
                />
                {errors.description && (
                  <p className="text-destructive text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category and Image Upload */}
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="category"
              >
                {t("category")}
                <span className="text-destructive">*</span>
              </label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("categoryLabel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Smartphones",
                      "Tablets",
                      "Laptops",
                      "Audio",
                      "Monitors",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="images"
              >
                {t("image")}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setValue("images", e.target.files!)}
                className={`border ${
                  errors.images ? "border-destructive" : "border-muted"
                } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
              />
              {errors.images && (
                <p className="text-destructive text-xs">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="max-w-36 mt-4 bg-primary text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#2ca76e]"
            >
              {t("button")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
