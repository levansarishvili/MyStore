import type { Stripe } from "stripe";

import { stripe } from "../../../../../lib/stripe";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { Button } from "src/app/components/ui/button";
import { createTranslator } from "next-intl";

interface paramsType {
  searchParams: { session_id: string };
  params: {
    locale: string;
  };
}

export default async function ResultPage({
  searchParams,
  params,
}: paramsType): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const locale = params.locale;
  if (!locale) {
    console.error("Locale not found in params.");
  }

  const messages = (await import(`../../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

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
    <section className="flex flex-col w-full min-h-screen items-center max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-12 bg-background">
      <div className="border flex flex-col gap-6 md:gap-8 bg-card rounded-2xl p-4 lg:p-10 justify-center items-center max-w-[40rem] text-center mx-auto shadow-md">
        {/* Title */}
        <h1 className="text-base md:text-xl lg:text-2xl font-semibold text-primary flex items-center gap-2">
          🎉 {t("SuccessSubscriptionMessage.title")}
        </h1>

        {/* Success Message */}
        <p className="text-sm md:text-base text-muted-foreground">
          {t("SuccessSubscriptionMessage.congrats")} &nbsp;
          <span className="font-semibold text-primary">
            {user?.user?.email}&nbsp;
          </span>
          🚀
        </p>

        {/* Benefits Description */}
        <p className="text-xs md:text-base text-muted-foreground mb-4">
          {t("SuccessSubscriptionMessage.message")}
        </p>

        {/* CTA Button */}
        <Link href={`/${locale}`}>
          <Button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50">
            {t("SuccessSubscriptionMessage.button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
