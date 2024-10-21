"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuth");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
