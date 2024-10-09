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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <div className="wrapper">
          <Header />

          <main>{children}</main>
          <Footer />
        </div>

        {/* <div id="root">{children}</div> */}
      </body>
    </html>
  );
}
