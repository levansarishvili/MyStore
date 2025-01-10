import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

interface ParamsType {
  params: { locale: string };
}

export default async function PrivatePage({ params }: ParamsType) {
  const locale = params.locale;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  // Check if the user exists, otherwise redirect
  if (error || !data?.user) {
    // redirect(`/${locale}/login`);
    console.log(data);
  }

  return <p>Hello {data.user?.email}</p>;
}
