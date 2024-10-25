"use client";

import { useState } from "react";

export function useAuth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60 * 24 * 7,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password. Please try again.");
      }

      const data = await res.json();

      // If login is successful, store authentication status and navigate to home
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { checkAuth, loading, error, setError };
}
