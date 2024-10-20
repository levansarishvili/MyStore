"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
