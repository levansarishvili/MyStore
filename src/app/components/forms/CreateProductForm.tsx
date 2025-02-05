"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createClient } from "../../../utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function CreateProductForm() {
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [category, setCategory] = useState("");
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
      // Remove images form Supabase Storage
      for (const imageUrl of uploadedImageUrls) {
        const fileName = imageUrl.split("/").pop() || "";
        await supabase.storage.from("product-images").remove([fileName]);
      }
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
        className="flex flex-col items-center justify-center gap-6 bg-muted sm:p-6 w-full"
      >
        {["name", "brand", "price"].map((id) => (
          <div key={id} className="flex flex-col w-full">
            <label
              className="text-sm font-medium text-muted-foreground mb-1"
              htmlFor={id}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
              <span className="text-destructive">*</span>
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 text-sm bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
              type={id === "price" ? "number" : "text"}
              id={id}
              name={id}
              required
            />
          </div>
        ))}

        {/* Product description */}
        <div className="flex flex-col w-full">
          <label
            className="text-sm font-medium text-muted-foreground mb-1"
            htmlFor="description"
          >
            Product Description
            <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            className="h-24 w-full rounded-lg px-4 py-2 text-sm bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Category selector */}
        <Select onValueChange={setCategory}>
          <div className="flex w-full flex-col gap-2">
            <label
              className="text-sm font-medium text-start text-muted-foreground w-full"
              htmlFor="category"
            >
              Product Category
              <span className="text-destructive">*</span>
            </label>
            <SelectTrigger
              id="category"
              name="category"
              className="w-full rounded-lg px-4 text-sm bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
          </div>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Smartphones">Smartphones</SelectItem>
              <SelectItem value="Tablets">Tablets</SelectItem>
              <SelectItem value="Laptops">Laptops</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Monitors">Monitors</SelectItem>
              <SelectItem value="Photo and video">Photo and video</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Hidden input to ensure category is included in formData */}
        <input type="hidden" name="category" value={category} />

        {/* File Upload */}
        <div className="flex flex-col w-full">
          <label
            className="text-sm font-medium text-muted-foreground mb-1"
            htmlFor="images"
          >
            Upload Images
            <span className="text-destructive">*</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full rounded-lg px-4 py-2 text-sm bg-background border border-muted focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 bg-primary text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#2ca76e]"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
