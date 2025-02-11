"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "../../../utils/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { SquarePen, Loader } from "lucide-react";
import { useTranslations } from "next-intl";

interface TranslatedBlogType {
  id: number;
  image_url?: string;
  created_at?: string;
  translated_title?: string | null;
  translated_body?: string | null;
  language_code?: string;
  blog_id?: string;
}

const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title should be at most 100 characters"),
  body: z.string().min(10, "Content should be at least 10 characters"),
  title_ka: z
    .string()
    .min(1, "Title in Georgian is required")
    .max(100, "Title in Georgian should be at most 100 characters"),
  body_ka: z
    .string()
    .min(10, "Content in Georgian should be at least 10 characters"),
  image: z.instanceof(File, { message: "Invalid file format" }).optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlogModal({
  blog,
  allMyBlogs,
  locale,
}: {
  blog: TranslatedBlogType;
} & { allMyBlogs: TranslatedBlogType[] } & { locale: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Profile.editBlogForm");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title:
        allMyBlogs.find((b) => b.language_code === "en")?.translated_title ||
        "",
      body:
        allMyBlogs.find((b) => b.language_code === "en")?.translated_body || "",
      title_ka:
        allMyBlogs.find((b) => b.language_code === "ka")?.translated_title ||
        "",
      body_ka:
        allMyBlogs.find((b) => b.language_code === "ka")?.translated_body || "",
      image: undefined,
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    let imageUrl = blog.image_url;

    if (data.image) {
      const fileName = `${Date.now()}-${data.image.name}`;
      const { data: uploadData, error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, data.image);
      if (error) return;
      const { data: publicUrl } = supabase.storage
        .from("blog-images")
        .getPublicUrl(uploadData.path);
      imageUrl = publicUrl.publicUrl;
    }

    // Update posts table
    const { error } = await supabase
      .from("posts")
      .update({
        title: data.title,
        body: data.body,
        image_url: imageUrl,
      })
      .eq("id", blog.blog_id);

    if (error) {
      console.error("Failed to update blog:", error.message);
      setLoading(false);
    }

    // Update post_translations table - English
    const { error: translateEnError } = await supabase
      .from("post_translations")
      .update({
        translated_title: data.title,
        translated_body: data.body,
        image_url: imageUrl,
      })
      .eq("language_code", "en")
      .eq("blog_id", blog.blog_id);
    if (translateEnError) {
      console.error("Failed to update blog:", translateEnError.message);
      setLoading(false);
    }

    // Update post_translations table - Georgian
    const { error: translateGeoError } = await supabase
      .from("post_translations")
      .update({
        translated_title: data.title_ka,
        translated_body: data.body_ka,
        image_url: imageUrl,
      })
      .eq("language_code", "ka")
      .eq("blog_id", blog.blog_id);
    if (translateGeoError) {
      console.error("Failed to update blog:", translateGeoError.message);
      setLoading(false);
    }

    // If image uploaded delete old image from storage
    if (data.image) {
      const { error: deleteImageError } = await supabase.storage
        .from("blog-images")
        .remove([blog.image_url?.split("/").pop() || ""]);
      if (deleteImageError) {
        console.error("Failed to delete old image:", deleteImageError.message);
        setLoading(false);
      }
    }
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-6 h-6 p-0 bg-primary rounded-md hover:border-primary hover:bg-primary-200 transition-all duration-200 ease-in-out">
          <SquarePen className="size-4 text-foreground text-white cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90%] sm:max-w-[80%] h-[90%] overflow-y-scroll bg-muted rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-base md:text-xl">
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* In english */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-muted-foreground text-xs md:text-sm"
                  htmlFor="body"
                >
                  {t("contentEn")}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  className="h-[8rem] sm:h-[12rem] text-xs md:text-sm bg-background rounded-lg border-none"
                  id="body"
                  {...register("body")}
                />
                {errors.body && (
                  <p className="text-red-500 text-xs">{errors.body.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="title"
                  className="text-muted-foreground text-xs md:text-sm"
                >
                  {t("nameEn")}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  className="text-xs md:text-sm bg-background rounded-lg border-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
            </div>

            {/* In Georgian */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-muted-foreground text-xs md:text-sm"
                  htmlFor="body_ka"
                >
                  {t("contentKa")}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  className="h-[8rem] sm:h-[12rem] text-xs md:text-sm bg-background rounded-lg border-none"
                  id="body_ka"
                  {...register("body_ka")}
                />
                {errors.body_ka && (
                  <p className="text-red-500 text-xs">
                    {errors.body_ka.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  className="text-muted-foreground text-xs md:text-sm"
                  htmlFor="title_ka"
                >
                  {t("nameKa")}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title_ka"
                  {...register("title_ka")}
                  className="text-xs md:text-sm bg-background rounded-lg border-none"
                />
                {errors.title_ka && (
                  <p className="text-red-500 text-xs">
                    {errors.title_ka.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground text-xs md:text-sm">
              {t("image")}
            </Label>
            <Input
              className="text-xs md:text-sm bg-background rounded-lg border-none"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                setValue("image", file, { shouldValidate: true });
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
