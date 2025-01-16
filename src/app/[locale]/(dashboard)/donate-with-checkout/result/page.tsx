import type { Stripe } from "stripe";

import { stripe } from "../../../../../lib/stripe";
import { createClient } from "../../../../../utils/supabase/server";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent", "subscription"],
    });

  const subscription =
    checkoutSession.subscription as Stripe.Subscription | null;

  // Assuming `customer_email` was passed when creating the Stripe session
  const email = checkoutSession.customer_details?.email;

  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_profiles")
    .update([
      {
        subscription_id: subscription?.id,
        subscription_status: subscription?.status,
      },
    ])
    .eq("email", email);

  return (
    <div className="flex flex-col gap-8 bg-[#f1f3f5] rounded-3xl p-12 justify-center items-center max-w-[50rem] text-center mx-auto shadow-xl dark:bg-[#313131]">
      <h1 className="text-5xl font-extrabold text-[#ec5e2a] flex items-center gap-2">
        🎉 Checkout Successful!
      </h1>
      <p className="text-3xl mt-4">
        Congratulations &nbsp;
        <span className="font-semibold text-[#ec5e2a]">
          {user?.user?.email}
        </span>
        , you are now a &nbsp;
        <span className="text-yellow-400 font-bold">Pro Member</span>! 🚀
      </p>
      <p className="text-xl text-gray-600 mt-2 italic dark:text-white">
        As a Pro member, you now have access to exclusive content. You can add
        new products for sale and delete your own products! Soon, you’ll also be
        able to do the same with posts.⌛
      </p>
      <a
        href="/"
        className="inline-block px-8 py-4 bg-[#ec5e2a] rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-[#ec5e2a]/80 transition-all duration-300 ease-in-out text-white mt-6"
      >
        Go to Home
      </a>
    </div>
  );
}
