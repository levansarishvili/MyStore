import Header from "src/app/components/header/Header";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "src/app/components/Footer";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function DashboardLayout({ children, params }: Props) {
  const locale = params.locale;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col justify-center items-center gap-12 md:gap-20 lg:gap-24 w-full">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
