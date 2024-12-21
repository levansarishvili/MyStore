import { supabase } from "../../lib/supabaseClient";

export default async function SignOut() {
  console.log("Signing out");
  const { error } = await supabase.auth.signOut();
}
