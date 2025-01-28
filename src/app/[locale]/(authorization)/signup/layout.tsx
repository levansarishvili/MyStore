import Header from "../../../components/Header";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <main className="mt-12 flex flex-col justify-center items-center w-full">
        {children}
      </main>
    </>
  );
}
