import Header from "../../../components/header/Header";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LoginlLayout({ children, params }: Props) {
  const locale = params.locale;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }
  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col justify-center items-center w-full">
        {children}
      </main>
    </>
  );
}
