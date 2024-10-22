import "./Home.css";

export default async function HomePage() {
  // const user = await res.json();

  return (
    <div className="home-wrapper">
      <h1 className="section-header">
        Welcome to <strong className="highlight">E-shop</strong> ecommerce
        website 👋
      </h1>
      {/* {user && (
        <p className="home-txt">
          Hello, <strong className="highlight">{user.firstName}</strong> !
          Explore the app and manage your products and blog posts.
        </p>
      )} */}
    </div>
  );
}
