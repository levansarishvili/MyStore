"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem("auth");
      if (!isAuthenticated) {
        router.push("/login");
      }
    };
    if (typeof window !== "undefined") {
      checkAuthentication();
    }
  }, [router]);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
