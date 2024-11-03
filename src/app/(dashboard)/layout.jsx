import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../../src/global.css";
// import CheckAuth from "../components/CheckAuth";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <main className="main flex flex-col justify-center items-center gap-40 w-full max-w-[144rem] my-0 mx-auto px-16 py-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
