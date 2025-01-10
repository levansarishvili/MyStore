"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import { supabase } from "../../../../lib/supabaseClient";

// Login user
export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
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
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// Sign in with Github
export async function signInWithGithub() {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/en/auth/callback`;

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

// Sign in with Github
export async function signInWithGoogle() {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/en/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data, error);

  if (error) {
    console.error(error);
  }

  if (data.url) {
    redirect(data.url);
  }
}
