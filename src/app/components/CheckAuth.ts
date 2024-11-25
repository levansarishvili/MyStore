import { getSession } from "@auth0/nextjs-auth0";

export default async function CheckAuth() {
  const session = await getSession();
  const user = session?.user;

  let loginStatus = false;

  // Check if user is logged in
  if (user) {
    loginStatus = true;
  }

  return loginStatus;
}
