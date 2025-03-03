import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Create Footer component
function Footer({ locale }: { locale: string }) {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background w-full mt-24 border-t py-10">
      <div className="md:border-b pb-8 max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between max-sm:flex-col gap-8 px-6 md:px-12 lg:px-20 py-0">
        <div className="flex flex-col gap-8">
          <div className="flex gap-2">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={400}
              height={400}
              className="w-10"
            />
            <p className="max-sm:hidden text-lg md:text-xl font-semibold">
              MyStore
            </p>
          </div>
          <p className="text-base font-normal md:font-medium md:text-xl max-w-[16.5rem]">
            {t("title")}
          </p>
          <div className="flex gap-6 ">
            <div className="p-1 hover:bg-muted transition-all duration-300 rounded-md">
              <Facebook className="text-primary cursor-pointer size-6" />
            </div>
            <div className="p-1 hover:bg-muted transition-all duration-300 rounded-md">
              <Linkedin className="text-primary cursor-pointer size-6" />
            </div>
            <div className="p-1 hover:bg-muted transition-all duration-300 rounded-md">
              <Instagram className="text-primary cursor-pointer size-6" />
            </div>
          </div>
        </div>

        {/* Accordion for smaller screens */}
        <Accordion type="single" collapsible className="w-full sm:hidden">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              {t("page.title")}
            </AccordionTrigger>
            <AccordionContent>
              <Link
                href={`/${locale}`}
                className="hover:text-primary transition-all duration-300"
              >
                {t("page.home")}
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href={`/${locale}/store`}
                className="hover:text-primary transition-all duration-300"
              >
                {t("page.products")}
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href={`/${locale}/blog`}
                className="hover:text-primary transition-all duration-300"
              >
                {t("page.blogs")}
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href={`/${locale}/contact`}
                className="hover:text-primary transition-all duration-300"
              >
                {t("page.contact")}
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              {t("info.title")}
            </AccordionTrigger>
            <AccordionContent>{t("info.shipping")}</AccordionContent>
            <AccordionContent>{t("info.return")}</AccordionContent>
            <AccordionContent>{t("info.support")}</AccordionContent>
            <AccordionContent>{t("info.faq")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              {t("office.title")}
            </AccordionTrigger>
            <AccordionContent>{t("office.address")}</AccordionContent>
            <AccordionContent>{t("office.city")}</AccordionContent>
            <AccordionContent>{t("office.country")}</AccordionContent>
            <AccordionContent>0322 11 22 33</AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* =============================================== */}
        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <p className="text-base font-medium">{t("page.title")}</p>
          <ul className="flex flex-col gap-6">
            <Link
              href={`/${locale}`}
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">{t("page.home")}</li>
            </Link>
            <Link
              href={`/${locale}/store`}
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">{t("page.products")}</li>
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">{t("page.blogs")}</li>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">{t("page.contact")}</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <div className="flex items- justify-between gap-2 cursor-pointer">
            <p className="text-base font-medium">{t("info.title")}</p>
            <ChevronDown className="hidden max-sm:flex" />
          </div>
          <ul className="flex flex-col gap-6">
            <li className="text-sm">{t("info.shipping")}</li>
            <li className="text-sm">{t("info.return")}</li>
            <li className="text-sm">{t("info.support")}</li>
            <li className="text-sm">{t("info.faq")}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <p className="text-base font-medium">{t("office.title")}</p>
          <ul className="flex flex-col gap-6">
            <li className="text-sm">{t("office.address")}</li>
            <li className="text-sm">{t("office.city")}</li>
            <li className="text-sm">{t("office.country")}</li>
            <li className="text-sm">0322 11 22 33</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between max-sm:flex-col gap-8 px-6 md:px-12 lg:px-20 pt-8">
        <p className="text-xs">{t("copyright")}</p>

        <div className="flex gap-4">
          <Image
            src="/assets/stripe.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/visa.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/mastercard.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/apple-pay.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
        </div>
      </div>
    </footer>
  );
}

// Exporting Footer component
export default Footer;
