"use client";

import { Button } from "src/app/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function BuySubscriptionButton({
  isProMember,
}: {
  isProMember: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Pricing");
  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If user already has a subscription show a message and don't create a new checkout session
    if (isProMember) {
      return;
    }
    setLoading(() => true);

    const response = await fetch("/api/buy-subscription", {
      method: "POST",
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error creating checkout session:", data.error);
      setLoading(() => false);
      return;
    }

    const data = await response.json();
    setLoading(() => false);
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      console.error("Error creating checkout session:", data.error);
      setLoading(() => false);
    }
  }
  return (
    <div className="w-full flex justify-center">
      <Button
        onClick={handleSubmit}
        className={`${
          isProMember && "hidden"
        }min-w-[10rem] bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 ${
          loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="size-4 animate-spin" />
            {t("button")}
          </>
        ) : (
          <>{t("button")}</>
        )}
      </Button>
    </div>
  );
}
