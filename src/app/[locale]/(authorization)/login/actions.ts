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

// Login user
export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login");
  }

  // Add user into stripe if they don't exist yet
  AddUserOnStripe(data.email);

  revalidatePath("/", "layout");
  redirect("/profile");
}

// Sign in with Github
export async function signInWithGithub() {
  const supabase = await createClient();
  const locale = getLocale();
  const auth_callback_url = `${process.env.BASE_URL}/${locale}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.error(error);
  }

  if (data.url) {
    redirect(data.url);
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  const supabase = await createClient();
  const locale = getLocale();
  const auth_callback_url = `${process.env.BASE_URL}/${locale}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.error(error);
  }

  if (data.url) {
    redirect(data.url);
  }
}
