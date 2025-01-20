import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../../global.css";

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

  // Fetch messages on the server-side
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </NextIntlClientProvider>
  );
}
