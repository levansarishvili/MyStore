import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (data?.user) {
    redirect("/");
    console.log(data);
  }
  return <div className="">{children}</div>;
}
