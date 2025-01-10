import { createClient } from "../../utils/supabase/server";

export default async function GetUserData() {
  const supabase = await createClient();
  const userData = supabase.auth.getUser();
  return userData;
}
