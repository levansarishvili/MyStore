"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createClient } from "../../../utils/supabase/client";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";

// Validation schema with Zod
const blogSchema = z.object({
  title: z
    .string()
    .min(1, "error")
    .max(100, "Title should be at most 100 characters"),
  body: z.string().min(10, "Content should be at least 10 characters"),
  title_ka: z
    .string()
    .min(1, "Title in Georgian is required")
    .max(100, "Title in Georgian should be at most 100 characters"),
  body_ka: z
    .string()
    .min(10, "Content in Georgian should be at least 10 characters"),
  image: z.custom<File>((file) => file instanceof File, "Image is required"),
});

export default function CreateBlogForm() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const t = useTranslations("Profile.AddBlogForm");

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      body: "",
      title_ka: "",
      body_ka: "",
      image: null,
    },
  });

  // Upload image to Supabase Storage
  async function uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload failed:", error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  }

  // Submit function
  const onSubmit = async (data: any) => {
    if (!image) {
      console.log("Please upload an image");
      return;
    }
    setIsLoading(() => true);

    const imageUrl = await uploadImage(image);

    if (!imageUrl) {
      console.log("Image upload failed. Please try again.");
      setIsLoading(() => false);

      return;
    }

    const blogData = {
      title: data.title,
      body: data.body,
      image_url: imageUrl,
    };

    const blogData_ka = {
      title_ka: data.title_ka,
      body_ka: data.body_ka,
      image_url: imageUrl,
    };

    try {
      const response = await fetch("/api/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: blogData, data_ka: blogData_ka }),
      });

      if (!response.ok) {
        console.error("Failed to create blog");
      }

      const result = await response.json();

      if (result.success) {
        setIsLoading(false);
        setCreatedSuccessfully(true);
        console.log("Blog created successfully");
        reset();
        router.refresh();
      }
    } catch (error) {
      // Delete image from Supabase Storage if blog creation fails
      if (imageUrl) {
        const { error: deleteError } = await supabase.storage
          .from("blog-images")
          .remove([imageUrl]);

        if (deleteError) {
          console.error("Error deleting image:", deleteError);
        }
      }
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {createdSuccessfully && (
        <p className="text-primary text-base md:text-2xl font-medium">
          {t("addMessage")} ✔
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-muted sm:p-6 w-full"
      >
        {/* Post Titles and Content */}
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* English Content */}
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="title"
              >
                {t("name")}
                <span className="text-destructive">*</span>
              </label>
              <Controller
                control={control}
                name="title"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="title"
                    placeholder={t("namePlaceholderlEng")}
                    className={`border ${
                      errors.title ? "border-destructive" : ""
                    } w-full rounded-lg px-4 py-2 text-sm bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all duration-300`}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="body"
              >
                {t("content")}
                <span className="text-destructive">*</span>
              </label>
              <Controller
                control={control}
                name="body"
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="body"
                    placeholder={t("contentPlaceholderlEng")}
                    className={`border ${
                      errors.body ? "border-destructive" : "border-muted"
                    } h-32 w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  />
                )}
              />
              {errors.body && (
                <p className="text-red-500 text-xs">{errors.body.message}</p>
              )}
            </div>
          </div>

          {/* Georgian Content */}
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="title_ka"
              >
                {t("name")}
                <span className="text-destructive">*</span>
              </label>
              <Controller
                control={control}
                name="title_ka"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="title_ka"
                    placeholder={t("namePlaceholderlGeo")}
                    className={`border ${
                      errors.title_ka ? "border-destructive" : "border-muted"
                    } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  />
                )}
              />
              {errors.title_ka && (
                <p className="text-red-500 text-xs">
                  {errors.title_ka.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="body_ka"
              >
                {t("content")}
                <span className="text-destructive">*</span>
              </label>
              <Controller
                control={control}
                name="body_ka"
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="body_ka"
                    placeholder={t("contentPlaceholderlGeo")}
                    className={`border ${
                      errors.body_ka ? "border-destructive" : "border-muted"
                    } h-32 w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
                  />
                )}
              />
              {errors.body_ka && (
                <p className="text-red-500 text-xs">{errors.body_ka.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-sm font-medium text-muted-foreground"
            htmlFor="image"
          >
            {t("image")}
            <span className="text-destructive">*</span>
          </label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file); // Update the image state
                    field.onChange(file); // Pass the file to react-hook-form
                  }
                }}
                className={`border ${
                  errors.image ? "border-destructive" : "border-muted"
                } w-full rounded-lg px-4 py-2 text-sm bg-background border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300`}
              />
            )}
          />
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className={`max-w-36 mt-4 bg-primary text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
              isLoading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                {t("button")}
                <Loader className="size-4 animate-spin h-5 w-5" />
              </div>
            ) : (
              t("button")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
