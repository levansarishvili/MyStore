import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./Home.css";

export default async function HomePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return redirect("/login");
  }

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return <p>Failed to fetch user profile. Please try again.</p>;
  }

  const user = await res.json();

  return (
    <div className="home-wrapper">
      <h1 className="section-header">
        Welcome to <strong className="highlight">E-shop</strong> ecommerce
        website 👋
      </h1>
      {user && (
        <p className="home-txt">
          Hello, <strong className="highlight">{user.firstName}</strong> !
          Explore the app and manage your products and blog posts.
        </p>
      )}
    </div>
  );
}
