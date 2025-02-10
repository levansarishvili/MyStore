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
      <DialogContent className="w-full max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="body">Content</Label>
            <Textarea id="body" {...register("body")} />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="title_ka">Title (Georgian)</Label>
            <Input id="title_ka" {...register("title_ka")} />
            {errors.title_ka && (
              <p className="text-red-500">{errors.title_ka.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="body_ka">Content (Georgian)</Label>
            <Textarea id="body_ka" {...register("body_ka")} />
            {errors.body_ka && (
              <p className="text-red-500">{errors.body_ka.message}</p>
            )}
          </div>

          <div>
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                setValue("image", file, { shouldValidate: true });
              }}
            />
          </div>

          <DialogFooter>
            <Button
              className="hover:bg-[#38CB89]/80 transition-all duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
