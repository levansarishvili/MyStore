"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import { cookies } from "next/headers";
import { AddUserOnStripe } from "src/app/components/AddUserOnStripe";

// Get locale
function getLocale() {
  const locale = cookies().get("NEXT_LOCALE")?.value;
  return locale;
}

// Signup user
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login");
  }

  // Add user into stripe if they don't exist yet
  AddUserOnStripe(data.email);

  revalidatePath("/", "layout");
  redirect("/");
}
