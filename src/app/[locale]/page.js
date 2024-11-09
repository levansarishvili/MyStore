import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="home-wrapper max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center justify-center gap-16 h-[35rem] text-center">
      <div className="flex flex-col gap-4">
        <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
      </div>

      <div>
        <h1 className="section-header">
          Welcome to&nbsp;
          <strong className="highlight text-[#ec5e2a] font-bold">E-shop</strong>
          &nbsp;ecommerce website 👋
        </h1>
        <p className="home-txt text-3xl">
          Hello,
          <strong className="highlight text-[#ec5e2a] font-bold"></strong>
          &nbsp;Explore the app and manage your products and blog posts.
        </p>
      </div>
    </div>
  );
}
