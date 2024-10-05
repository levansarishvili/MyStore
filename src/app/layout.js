import "../App.css";
import Navigation from "./components/Navigation.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

export const metadata = {
  title: "Next App",
  description: "Web site created with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="%PUBLIC_URL%/favicon.svg" />
        <link
          href="https://free.bboxtype.com/embedfonts/?family=FiraGO:400"
          rel="stylesheet"
        /> */}
        {/* <meta name="theme-color" content="#000000" /> */}
        <title>ეროვნული ნაკრები</title>
        <meta
          name="description"
          content="Web site created using create-next-app"
        />
        {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
      </head>
      <body>
        <Header />
        <Navigation />
        <main>{children}</main>
        <Footer />
        {/* <div id="root">{children}</div> */}
      </body>
    </html>
  );
}
