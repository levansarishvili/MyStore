import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import Loading from "../loading";

export default async function CheckAuth({ children }) {
  const session = await getSession();
  const user = session?.user;

  // Redirect to login if the user is not authenticated
  if (!user) {
    redirect("/api/auth/login");
    return null;
  }

  return children;
}
