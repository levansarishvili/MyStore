import "../global.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "/favicon.png",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head></head>
      <body
        className={`dark:bg-[#1f1f1f] dark:text-[#f8f9fa] ${montserrat.className}`}
      >
        <div className="wrapper min-h-screen">
          <>{children}</>
        </div>
      </body>
    </html>
  );
}
