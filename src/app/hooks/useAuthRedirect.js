"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isAuth"));
    if (isLoggedIn) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
}
