import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../global.css";
import { createClient } from "../../utils/supabase/server";
import AddCustomerOnStripe from "../components/AddCustomerOnStripe";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ka")) {
    notFound();
  }

  // Fetch the user
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const userData = data?.user;
  const userId = userData?.id;
  console.log(userData);

  // Get user name and email
  const email = userData?.email ?? "undefined";
  const name = userData?.user_metadata.full_name ?? "test_user";

  if (userData) {
    // After successful login/signup add user to Stripe if it doesn't exist
    const stripeCustomer = await AddCustomerOnStripe(email, name);
    const stripeCustomerId = stripeCustomer?.id;
    console.log(userId, email, stripeCustomerId);

    // Add user to supabase in user_profiles table with customer ID from Stripe
    await supabase.from("user_profiles").insert([
      {
        user_id: userId,
        email: email,
        subscription_id: null,
        stripe_customer_id: stripeCustomerId,
        subscription_status: null,
      },
    ]);
  }
  // Fetch messages on the server-side
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
