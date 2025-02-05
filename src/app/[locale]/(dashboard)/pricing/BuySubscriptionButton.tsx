"use client";

import { Button } from "src/app/components/ui/button";

export default function BuySubscriptionButton({
  isProMember,
}: {
  isProMember: boolean;
}) {
  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If user already has a subscription show a message and don't create a new checkout session
    if (isProMember) {
      return;
    }

    const response = await fetch("/api/buy-subscription", {
      method: "POST",
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      console.error("Error creating checkout session:", data.error);
    }
  }
  return (
    <Button
      onClick={handleSubmit}
      type="submit"
      className={`flex justify-center text-base items-center rounded-lg text-white hover:bg-[#2ca76e] font-medium px-6 py-2  duration-300 ${
        isProMember ? "cursor-not-allowed" : ""
      }`}
    >
      Subscribe
    </Button>
  );
}
