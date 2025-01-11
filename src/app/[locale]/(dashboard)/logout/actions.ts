"use server";

import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logout() {
  const locale = cookies().get("NEXT_LOCALE")?.value || "en"; // Default to 'en' if not found
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");

  // Redirect to login page with the locale, ensuring it's not doubled
  redirect(`/${locale}/login`);
}
