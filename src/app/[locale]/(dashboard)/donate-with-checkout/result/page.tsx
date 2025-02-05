import type { Stripe } from "stripe";

import { stripe } from "../../../../../lib/stripe";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { Button } from "src/app/components/ui/button";

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
    <section className="flex flex-col w-full min-h-screen items-center mt-12 lg:mt-20 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-12 bg-background">
      <div className="flex flex-col gap-2 md:gap-6 bg-card rounded-2xl p-4 lg:p-10 justify-center items-center max-w-[40rem] text-center mx-auto shadow-lg">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary flex items-center gap-2 sm:mb-4">
          🎉 Checkout Successful!
        </h1>

        {/* Success Message */}
        <p className="text-lg md:text-xl leading-relaxed">
          Congratulations, &nbsp;
          <span className="font-semibold text-primary">
            {user?.user?.email}
          </span>
          ! You are now a
          <span className="text-yellow-400 font-bold"> Pro Member</span>! 🚀
        </p>

        {/* Benefits Description */}
        <p className="text-sm md:text-base text-muted-foreground">
          Now you can access all the benefits of our Pro plan. Add products for
          sale and manage your inventory. You can also create and manage blog
          posts.
        </p>

        {/* CTA Button */}
        <Link href="/">
          <Button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50">
            Go to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}
