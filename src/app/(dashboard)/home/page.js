"use client";
import { useState, useEffect } from "react";
import Loading from "../../loading";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="home-wrapper max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center justify-center gap-16 h-[35rem] text-center">
      <h1 className="section-header">
        Welcome to{" "}
        <strong className="highlight text-[#ec5e2a] font-bold">E-shop</strong>
        ecommerce website 👋
      </h1>
      <p className="home-txt text-3xl">
        Hello, <strong className="highlight text-[#ec5e2a] font-bold"></strong>!
        Explore the app and manage your products and blog posts.
      </p>
    </div>
  );
}
