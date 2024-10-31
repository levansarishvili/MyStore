"use client";
import { useState, useEffect } from "react";
import Loading from "../../loading";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // If no access token is found, show appropriate message or handle accordingly
    if (!accessToken) {
      console.warn("No access token found. User not authenticated.");
      setLoading(false); // Stop loading if there's no token
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data); // Set user data if response is successful
        } else {
          console.error("Error fetching user data");
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false); // Stop loading once fetching is done
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-wrapper max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center justify-center gap-16 h-[35rem] text-center">
      <h1 className="section-header">
        Welcome to{" "}
        <strong className="highlight text-[#ec5e2a] font-bold">E-shop</strong>
        ecommerce website 👋
      </h1>
      {user ? (
        <p className="home-txt text-3xl">
          Hello,{" "}
          <strong className="highlight text-[#ec5e2a] font-bold">
            {user.firstName}
          </strong>
          ! Explore the app and manage your products and blog posts.
        </p>
      ) : (
        <p className="home-txt">You are not logged in.</p>
      )}
    </div>
  );
}
