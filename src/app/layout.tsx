import "../global.css";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";

export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "/favicon.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  fallback: ["sans-serif"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
        className={`dark:bg-[#1f1f1f] dark:text-[#f8f9fa] ${poppins.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-rows-[5rem_auto_10rem] gap-10 min-h-screen">
            <>{children}</>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
