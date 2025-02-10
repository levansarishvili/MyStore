"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle product deletion
  const handleDelete = async (blogId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/delete-blog`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to delete blog:", data.message);
        setLoading(false);
        return;
      }

      console.log("Blog deleted successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      setLoading(false);
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
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0"
            ></path>
          </svg>
        </div>
      ) : (
        <Trash2 className="size-4" />
      )}
    </button>
  );
}
