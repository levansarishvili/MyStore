import Footer from "../components/Footer";
import Header from "../components/Header";
import "../../global.css";

export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "./favicon.png",
  },
};

export default function AuthLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />

      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
