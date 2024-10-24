export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "./favicon.png",
  },
};

export default function AuthLayout({ children }) {
  return (
    <>
      <header className="login-header">
        <img
          className="login-header__logo"
          src="../assets/logo.svg"
          alt="Logo"
          style={{ marginLeft: "8rem", marginTop: "1rem" }}
        />
      </header>

      <main className="main">{children}</main>

      <footer className="login-page-footer">
        <p style={{ textAlign: "center" }} className="login-page-footer__txt">
          Georgia, Copyright &copy; 2024
        </p>
      </footer>
    </>
  );
}
