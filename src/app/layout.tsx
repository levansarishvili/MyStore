import "../global.css";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { Noto_Sans_Georgian } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";

export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "/favicon.svg",
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

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-georgian",
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
      <body className={`${poppins.className} ${notoSansGeorgian.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <>{children}</>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
