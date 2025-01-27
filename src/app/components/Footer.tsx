import { useTranslations } from "next-intl";
import Navigation from "../[locale]/Navigation";
import { Store, Facebook, Instagram, Linkedin } from "lucide-react";

// Create Footer component
function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="flex items-center text-sm bg-background border-t">
      <div className="max-w-[90rem] mx-auto my-0 w-full h-full flex justify-between items-center px-6 md:px-12 lg:px-20 py-0">
        <div className="flex justify-between items-center gap-16 w-full">
          {/* Footer logo */}
          <Store className="w-10 h-10" />
          <p className="max-w-[20rem] text-center">{t("copyright")}</p>
          {/* Social icons */}
          <div className="flex justify-end gap-4">
            <Facebook className="w-6 h-6 hover:text-primary transition duration-300 stroke-[1.5px]" />
            <Instagram className="w-6 h-6 hover:text-primary transition duration-300 stroke-[1.5px]" />
            <Linkedin className="w-6 h-6 hover:text-primary transition duration-300 stroke-[1.5px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Exporting Footer component
export default Footer;
