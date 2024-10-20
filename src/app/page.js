"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Homepage.css";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch("https://dummyjson.com/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            // credentials: "include",
          });

          const data = await response.json();
          if (response.ok) {
            setUser(data);
          } else {
            console.error("Error fetching user data");
            localStorage.removeItem("accessToken");
            router.push("/login");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          router.push("/login");
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      {user && (
        <p>
          Hello, {user.firstName}! Explore the app and manage your products and
          blog posts.
        </p>
      )}
    </div>
  );
}
