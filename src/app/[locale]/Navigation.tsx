import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <ul className="flex items-center gap-10 list-none h-16">
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-sm font-medium">
        <Link
          className="h-full flex items-center transition-all duration-300 hover:text-primary"
          href="/"
        >
          {t("home")}
        </Link>
      </li>

      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-sm font-medium">
        <Link
          className="h-full flex items-center transition-all duration-300 hover:text-primary"
          href="/store"
        >
          {t("products")}
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-sm font-medium">
        <Link
          className="h-full flex items-center transition-all duration-300 hover:text-primary"
          href="/blog"
        >
          {t("blogs")}
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-sm font-medium">
        <Link
          className="h-full flex items-center transition-all duration-300 hover:text-primary"
          href="/contact"
        >
          {t("contact")}
        </Link>
      </li>
    </ul>
  );
}
