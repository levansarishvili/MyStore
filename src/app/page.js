import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(accessToken);

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
