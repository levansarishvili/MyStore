import { createClient } from "../../utils/supabase/server";

export default async function GetUserData() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const userData = data?.user;
  return userData;
}
