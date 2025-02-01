import type { Stripe } from "stripe";

import { stripe } from "../../../../../lib/stripe";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent", "subscription"],
    });
  const orderData = checkoutSession;
  console.log(orderData);

  const payment_intent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  // Add order in supabase after payment is successful if it doesn't exist
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_purchase_id", orderData.id)
    .single();

  if (existingOrder) {
    console.log("Order already exists in Supabase");
  } else {
    const { data, error } = await supabase.from("orders").insert({
      user_id: orderData.metadata?.user_id,
      total_price: orderData.amount_total,
      stripe_purchase_id: orderData.id,
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-16 bg-[#f1f3f5] rounded-3xl p-12 justify-center items-center max-w-[50rem] text-center mx-auto shadow-xl dark:bg-[#313131]">
      <h1 className="text-5xl font-semibold text-[#ec5e2a] flex items-center gap-2">
        🎉 Checkout Successful!
      </h1>
      <Link href="/">
        <button className="btn">Go to home</button>
      </Link>
    </div>
  );
}
