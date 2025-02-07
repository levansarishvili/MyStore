"use client";

import { useRouter } from "next/navigation";
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
    <button
      className="p-1 bg-background text-foreground hover:text-destructive-foreground hover:bg-destructive transition-all duration-200 rounded-md"
      onClick={() => handleDelete(id)}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
