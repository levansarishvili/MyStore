"use client";

import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../../../src/global.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading.js";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = JSON.parse(localStorage.getItem("isAuth"));
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      checkAuthentication();
    }
  }, []);

  // Render loading state until authentication check is done
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
