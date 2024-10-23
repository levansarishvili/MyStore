"use client";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../../../src/global.css";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem("auth");
      if (!isAuthenticated) {
        redirect("/login");
      }
    };
    if (typeof window !== "undefined") {
      checkAuthentication();
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
