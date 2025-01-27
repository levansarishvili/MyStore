import Header from "src/app/components/Header";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "src/app/components/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center gap-28 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
