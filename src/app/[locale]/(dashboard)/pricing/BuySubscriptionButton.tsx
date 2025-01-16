"use client";

import { useState } from "react";

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
    <button
      onClick={handleSubmit}
      type="submit"
      className={`flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2 hover:bg-slate-200 hover:text-[#ec5e2a] duration-300 ${
        isProMember ? "cursor-not-allowed" : ""
      }`}
    >
      Subscribe
    </button>
  );
}
