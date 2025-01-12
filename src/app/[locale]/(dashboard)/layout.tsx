import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import AddCustomerOnStripe from "../../components/AddCustomerOnStripe";

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
    <main className="main flex flex-col justify-center items-center gap-40 w-full max-w-[144rem] my-0 mx-auto px-16 py-0">
      {children}
    </main>
  );
}
