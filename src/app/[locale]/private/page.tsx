import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

interface ParamsType {
  params: { locale: string };
}

export default async function PrivatePage({ params }: ParamsType) {
  const locale = params.locale;
  console.log(locale);
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect(`/${locale}/login`);
  }

  return <p>Hello {data.user.email}</p>;
}
