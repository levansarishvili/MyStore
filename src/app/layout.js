import "../global.css";
import Navigation from "./components/Navigation.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

export const metadata = {
  title: "ეროვნული ნაკრები",
  description: "Web site created with Next.js.",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Header />

        <main>{children}</main>
        <Footer />
        {/* <div id="root">{children}</div> */}
      </body>
    </html>
  );
}
