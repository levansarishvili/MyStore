"use client";

import { Check } from "lucide-react";
import { createCheckoutSession } from "../../../actions/stripe";
import CheckSubscriptionStatusClient from "../../../components/CheckSubscriptionStatusClient";
import Loading from "../../../loading";
import { useState } from "react";

interface Props {
  params: { locale: string };
}

export default function Pricing({ params }: Props) {
  // Check if the user is already a Pro member
  const { isProMember, loading } = CheckSubscriptionStatusClient();
  const [showMessage, setShowMessage] = useState(false);

  // Show a loading indicator while fetching the subscription status
  if (loading) {
    return <Loading />;
  }

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // If user already has a subscription show a message and don't create a new checkout session
    if (isProMember) {
      setShowMessage(() => true);
      return;
    }

    const formData = new FormData(event.currentTarget);

    try {
      const { url } = await createCheckoutSession(formData);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  }

  const locale = params.locale;

  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-[#f1f3f5] justify-center items-center max-w-[100rem] px-[4.8rem] py-[3.2rem] dark:bg-[#313131]">
      <h1 className="text-[2.2rem] font-semibold">Buy Subscription</h1>

      {showMessage && (
        <p className="text-green-600 font-medium">
          You are a pro member already! 👑
        </p>
      )}

      <div className="flex gap-36">
        {/* Free Plan */}
        <div className="flex flex-col gap-8 items-start justify-between w-[32rem] p-8 bg-white rounded-2xl dark:bg-[#313131] border dark:border-white text-[#202842] dark:text-white">
          <div className="flex flex-col">
            <h2 className="text-[2.2rem] font-semibold">Free Plan</h2>
          </div>
          <p className="text-[2.6rem] font-medium">$0</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">View and buy products</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className=" text-[1.4rem]">View blogs</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Responsive Website</p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button className="flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2">
              Register now
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col gap-8 items-start justify-between w-[32rem] p-8 bg-white rounded-2xl dark:bg-[#313131] border dark:border-white text-[#202842] dark:text-white">
          <div className="flex flex-col">
            <h2 className="text-[2.2rem] font-semibold">Pro Plan</h2>
          </div>
          <p className="text-[2.6rem] font-medium">$29</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">View and buy products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">View blogs</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Responsive Website</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Edit products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Add new products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Edit blogs</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[1.4rem]">Add new blogs</p>
            </div>
          </div>
          <div className="flex justify-center w-full flex-col items-center gap-6">
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2 hover:bg-slate-200 hover:text-[#ec5e2a] duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
