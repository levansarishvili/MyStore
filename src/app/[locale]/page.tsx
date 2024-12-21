import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="home-wrapper max-w-[144rem] mx-auto my-0 px-16 py-0 flex flex-col items-center justify-center gap-24 h-[35rem] text-center">
      <h1 className="section-header">
        {t("title-part1")}&nbsp;
        <strong className="highlight text-[#ec5e2a] font-bold">E-shop</strong>
        &nbsp;{t("title-part2")} 👋
      </h1>
      <p className="home-txt text-3xl">{t("description")}</p>
    </div>
  );
}
