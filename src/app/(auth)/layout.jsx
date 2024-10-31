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
          className="login-header__logo ml-32 mt-4 w-60"
          src="../assets/logo.svg"
          alt="Logo"
        />
      </header>

      <main className="main max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center">
        {children}
      </main>

      <footer className="login-page-footer">
        <p className="login-page-footer__txt text-center">
          Georgia, Copyright &copy; 2024
        </p>
      </footer>
    </>
  );
}
