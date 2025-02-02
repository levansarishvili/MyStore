"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createClient } from "../../../utils/supabase/client";

export default function CreateProductForm() {
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function uploadImages(files: FileList) {
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        console.error("Image upload failed:", error);
        return null;
      }

      const { data: publicUrl } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);

      uploadedUrls.push(publicUrl.publicUrl);
    }

    return uploadedUrls;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    if (!images || images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const uploadedImageUrls = await uploadImages(images);
    if (!uploadedImageUrls) {
      alert("Failed to upload images. Please try again.");
      return;
    }

    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: formData.get("category"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      images: uploadedImageUrls,
    };

    const response = await fetch("/api/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      router.refresh();
      setCreatedSuccessfully(true);
    } else {
      console.error(result.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      {createdSuccessfully && (
        <p className="text-primary text-2xl font-medium">
          Product created successfully ✔ 🔥
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl w-full"
      >
        {["name", "description", "category", "brand", "price"].map((id) => (
          <div key={id} className="flex flex-col items-start gap-2 w-full">
            <label className="text-base" htmlFor={id}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 text-base border focus:outline-primary"
              type={id === "price" ? "number" : "text"}
              id={id}
              name={id}
              required
            />
          </div>
        ))}

        <div className="flex flex-col items-start gap-2 w-full">
          <label className="text-base" htmlFor="images">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full rounded-lg px-4 py-2 text-base border"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-40 hover:bg-[#2ca76e] transition-all duration-300"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
