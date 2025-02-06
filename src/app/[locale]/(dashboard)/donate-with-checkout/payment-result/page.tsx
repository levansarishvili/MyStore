import type { Stripe } from "stripe";

import { stripe } from "../../../../../lib/stripe";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { Button } from "src/app/components/ui/button";
import { createTranslator } from "next-intl";

interface cardProductType {
  id: number;
  quantity: number;
}

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

  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent", "subscription"],
    });
  const orderData = checkoutSession;

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

    // Parse metadata.products from string to an array
    const products: cardProductType[] = JSON.parse(
      orderData.metadata?.products || "[]"
    );

    // Check if the order already exists
    const { data: existingOrderItem } = await supabase
      .from("order_items")
      .select("id")
      .eq("stripe_purchase_id", orderData.id)
      .single();

    if (existingOrderItem) {
      console.log("Order item already exists in Supabase");
    } else {
      // Loop through each product and insert it into the order_items table
      for (const product of products) {
        const { data, error } = await supabase.from("order_items").insert({
          stripe_purchase_id: orderData.id,
          product_id: product.id,
          quantity: product.quantity,
          total_price: orderData.amount_total,
          user_id: orderData.metadata?.user_id,
        });

        if (error) {
          console.error(error);
        }
      }

      if (error) {
        console.error("Error inserting order item:", error);
      }
    }
  }

  return (
    <section className="flex flex-col w-full min-h-screen items-center mt-12 lg:mt-20 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-12 bg-background">
      <div className="flex flex-col gap-8 lg:gap-12 bg-card rounded-lg p-8 justify-center items-center max-w-[30rem] text-center mx-auto shadow-md border">
        <h1 className="text-base md:text-xl lg:text-2xl font-semibold text-primary flex items-center gap-2">
          🎉 {t("SuccessPaymentMessage.title")}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-8">
          {t("SuccessPaymentMessage.message")}
        </p>
        <Link href="/">
          <Button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#38CB89]/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38CB89] focus:ring-opacity-50">
            {t("SuccessPaymentMessage.button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
