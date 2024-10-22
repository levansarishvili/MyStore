import "../../global.css";

export const metadata = {
  title: "e-shop",
  description: "Web site created with Next.js.",
  icons: {
    icon: "./favicon.png",
  },
};

export default function AuthLayout({ children }) {
  return <main className="main">{children}</main>;
}
