"use client";

import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../../../src/global.css";
import Loading from "../loading.js";
import { useAuthCheck } from "../hooks/useAuthCheck.js";

export default function DashboardLayout({ children }) {
  const isLoading = useAuthCheck();

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
