import { getSession } from "@auth0/nextjs-auth0";

export default async function HomePage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="home-wrapper max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center justify-center gap-16 h-[35rem] text-center">
      <h1 className="section-header">
        Welcome to&nbsp;
        <strong className="highlight text-[#ec5e2a] font-bold">E-shop</strong>
        &nbsp;ecommerce website 👋
      </h1>
      <p className="home-txt text-3xl">
        Hello,{" "}
        <strong className="highlight text-[#ec5e2a] font-bold">
          {user.name}
        </strong>
        !&nbsp;Explore the app and manage your products and blog posts.
      </p>
    </div>
  );
}
