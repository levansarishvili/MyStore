"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";

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
    <div className="">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-primary text-sm">{successMessage}</p>
      )}
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          variant={"destructive"}
          onClick={handleUserDelete}
          className={` text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
            isLoading ? "cursor-wait opacity-70" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              {t("deleteButton")}
              <Loader className="size-4 animate-spin h-5 w-5" />
            </div>
          ) : (
            t("deleteButton")
          )}
        </Button>
      </div>
    </div>
  );
}
