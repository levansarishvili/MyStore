import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");

  return (
    <ul className="max-md:hidden flex items-center gap-6 list-none h-16">
      <li className="cursor-pointer relative group">
        <Link
          className="flex items-center text-sm uppercase transition-all duration-300 hover:text-primary font-medium"
          href="/"
        >
          {t("home")}
        </Link>
        <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-[2px] bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
      </li>

      <li className="cursor-pointer relative group">
        <Link
          className="flex items-center text-sm uppercase transition-all duration-300 hover:text-primary font-medium"
          href="/store"
        >
          {t("products")}
        </Link>
        <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-[2px] bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
      </li>

      <li className="cursor-pointer relative group">
        <Link
          className="flex items-center text-sm uppercase transition-all duration-300 hover:text-primary font-medium"
          href="/blog"
        >
          {t("blogs")}
        </Link>
        <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-[2px] bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
      </li>

      <li className="cursor-pointer relative group">
        <Link
          className="flex items-center text-sm uppercase transition-all duration-300 hover:text-primary font-medium"
          href="/contact"
        >
          {t("contact")}
        </Link>
        <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-[2px] bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
      </li>
    </ul>
  );
}
