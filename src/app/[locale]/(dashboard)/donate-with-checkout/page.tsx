import type { Metadata } from "next";

import CheckoutForm from "../../../components/CheckoutForm";

export const metadata: Metadata = {
  title: "Donate with hosted Checkout | Next.js + TypeScript Example",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="flex flex-col gap-2 border rounded-2xl bg-[#f1f3f5] justify-center items-center max-w-[100rem] px-[6rem] py-[6rem]">
      <h1 className="text-3xl font-semibold">Donate with hosted Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm uiMode="hosted" />
    </div>
  );
}
