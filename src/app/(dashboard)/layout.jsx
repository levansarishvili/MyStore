import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return redirect("/login");
  }

  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
    </>
  );
}
