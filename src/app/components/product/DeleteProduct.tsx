"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteProduct({ id }: { id: string }) {
  const router = useRouter();

  // Function to handle product deletion
  const handleDelete = async (productId: string) => {
    try {
      const res = await fetch(`/api/delete-product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to delete product:", data.message);
        return;
      }

      console.log("Product deleted successfully");
      router.push("?deleted=true");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Button
      variant={"destructive"}
      className="text-white text-sm px-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
      onClick={() => handleDelete(id)}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
