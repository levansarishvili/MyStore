import Header from "../components/Header";
import Footer from "../components/Footer";
import { redirect } from "next/navigation";
import CheckAuth from "../components/CheckAuth";
import "../../../src/global.css";
import { type } from "@testing-library/user-event/dist/type";
import { replace } from "react-router-dom";

export default async function DashboardLayout({ children }) {
  const loginStatus = await CheckAuth();
  if (!loginStatus) {
    redirect("/api/auth/login");
  }

  return (
    <>
      <Header />
      <main className="main flex flex-col justify-center items-center gap-40 w-full max-w-[144rem] my-0 mx-auto px-16 py-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
