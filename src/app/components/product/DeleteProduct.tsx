"use client";

import { useRouter } from "next/navigation";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteProduct({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const router = useRouter();

  // Function to handle product deletion
  const handleDelete = async (productId: string) => {
    setLoading(() => true);
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
      setLoading(() => false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <button
      className={`p-1 bg-destructive text-white hover:text-destructive-foreground hover:bg-destructive transition-all duration-200 rounded-md ${
        loading ? "cursor-wait opacity-50" : ""
      }`}
      onClick={() => handleDelete(id)}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader className="size-4 animate-spin h-5 w-5" />
        </div>
      ) : (
        <Trash2 className="size-4" />
      )}
    </button>
  );
}
