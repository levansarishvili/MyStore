"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createClient } from "../../../utils/supabase/client";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function CreateBlogForm() {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const supabase = createClient();

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
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    if (!image) {
      alert("Please upload an image");
      return;
    }
    const imageUrl = await uploadImage(image);

    if (!imageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }
    // Get data from form
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
      image_url: imageUrl,
    };

    const data_ka = {
      title_ka: formData.get("title_ka"),
      body_ka: formData.get("body_ka"),
      image_url: imageUrl,
    };
    console.log(data, data_ka);

    try {
      const response = await fetch("/api/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, data_ka }),
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
  }

  return (
    <form
      className="flex flex-col gap-6 items-center mb-12 p-8 rounded-lg w-full mt-1"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-md:flex-col flex gap-6">
        <div className="max-md:w-full w-1/2 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="title">
              Post Title
            </label>
            <Input
              name="title"
              type="text"
              id="title"
              placeholder="Enter title in english"
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="body">
              Post Content
            </label>
            <Textarea
              name="body"
              id="body"
              placeholder="Write your content in english..."
            />
          </div>
        </div>

        <div className="max-md:w-full w-1/2 flex flex-col gap-4">
          {/* For georgian */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="title_ka">
              Post Title
            </label>
            <Input
              name="title_ka"
              type="text"
              id="title_ka"
              placeholder="Enter title in georgian"
            />
          </div>

          {/* For georgian */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-xl font-semibold" htmlFor="body_ka">
              Post Content
            </label>
            <Textarea
              name="body_ka"
              id="body_ka"
              placeholder="Write your content in georgian..."
            />
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
        />
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
