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
import { marked } from "marked";

// Validation schema with Zod
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
});

export default function CreateBlogForm() {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
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
    console.log(publicUrl.publicUrl);

    return publicUrl.publicUrl;
  }

  // Submit function
  const onSubmit = async (data: any) => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const imageUrl = await uploadImage(image);

    if (!imageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const blogData = {
      title: data.title,
      body: data.body, // Convert Markdown to HTML before submission
      image_url: imageUrl,
    };

    const blogData_ka = {
      title_ka: data.title_ka,
      body_ka: data.body_ka, // Convert Markdown to HTML for Georgian content
      image_url: imageUrl,
    };

    console.log(blogData, blogData_ka);

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
        console.log("Blog created successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 items-center mb-12 p-8 rounded-lg w-full mt-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-md:flex-col flex gap-6">
        <div className="max-md:w-full w-1/2 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="title">
              Post Title
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
                  placeholder="Enter title in english"
                  className={`border ${errors.title ? "border-red-500" : ""}`}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="body">
              Post Content
            </label>
            <Controller
              control={control}
              name="body"
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="body"
                  placeholder="Write your content in markdown..."
                  className={`border ${errors.body ? "border-red-500" : ""}`}
                />
              )}
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>
        </div>

        <div className="max-md:w-full w-1/2 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="title_ka">
              Post Title (Georgian)
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
                  placeholder="Enter title in georgian"
                  className={`border ${
                    errors.title_ka ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.title_ka && (
              <p className="text-red-500">{errors.title_ka.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="body_ka">
              Post Content (Georgian)
            </label>
            <Controller
              control={control}
              name="body_ka"
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="body_ka"
                  placeholder="Write your content in markdown..."
                  className={`border ${errors.body_ka ? "border-red-500" : ""}`}
                />
              )}
            />
            {errors.body_ka && (
              <p className="text-red-500">{errors.body_ka.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        <label className="text-xl font-semibold" htmlFor="image">
          Upload Image
        </label>
        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files![0])}
          className={`border ${errors.image ? "border-red-500" : ""}`}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <Button
        variant={"default"}
        className="font-medium p-3 text-white rounded-lg text-sm cursor-pointer w-40 transition-all duration-300 hover:bg-[#2ca76e]"
        type="submit"
      >
        Add Post
      </Button>
    </form>
  );
}
