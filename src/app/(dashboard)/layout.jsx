import { redirect } from "next/navigation";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../../../src/global.css";

export default async function DashboardLayout({ children }) {
  // if (!accessToken) {
  //   return redirect("/login");
  // }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
