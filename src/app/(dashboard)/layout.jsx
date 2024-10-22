import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../../../src/global.css";

export default async function DashboardLayout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
