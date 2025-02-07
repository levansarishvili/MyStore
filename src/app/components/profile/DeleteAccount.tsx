"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface DeleteAccountProps {
  userId: string;
}

export default function DeleteAccount({ userId }: DeleteAccountProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const t = useTranslations("Profile");

  const router = useRouter();

  const handleUserDelete = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to delete user");
      } else {
        setSuccessMessage(`${t("deleteMessage")}`);
      }
    } catch (error) {
      setError("An error occurred while deleting your account.");
      console.error(error);
    } finally {
      setIsLoading(false);
      router.push("/login");
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-primary text-sm">{successMessage}</p>
      )}
      <Button
        variant={"destructive"}
        onClick={handleUserDelete}
        disabled={isLoading}
        data-cy="delete-user-button"
        className={`rounded-lg px-4 py-2 transition-all font-medium duration-300 text-sm ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? `${t("deleting")}...` : `${t("deleteButton")}`}
      </Button>
    </div>
  );
}
