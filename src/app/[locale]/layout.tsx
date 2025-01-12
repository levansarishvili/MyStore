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

  // Get user name and email
  const email = userData?.email ?? "undefined";
  const name = userData?.user_metadata.full_name ?? "undefined";

  if (userData) {
    // After successful login/signup add user to Stripe if it doesn't exist
    AddCustomerOnStripe(email, name);
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
