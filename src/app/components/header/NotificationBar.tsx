"use client";

import Link from "next/link";
import {
  ArrowRight,
  X,
  TicketPercent,
  Phone,
  Mail,
  Locate,
  MapPin,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function NotificationBar({ locale }: { locale: string }) {
  const t = useTranslations("NotificationBar");

  return (
    <div className="w-full h-10 bg-[#38CB89]">
      <div className="flex items-center justify-center lg:justify-between h-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
        <a
          href="tel:0322 11 22 33"
          className="max-lg:hidden flex gap-2 items-center text-xs font-medium"
        >
          <Phone className="size-3.5 fill-primary" />
          <span className="text-xs font-medium">0322 11 22 33</span>
        </a>

        <div className="flex gap-4">
          <div className="flex text-xs items-center gap-4">
            <TicketPercent className="size-5" />
            <p className="text-center font-medium">{t("discount")}</p>
            <Link
              href={`/${locale}/store`}
              className="max-md:hidden flex gap-1 items-center text-center font-medium hover:text-white transition-all duration-300"
            >
              {t("button")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="max-lg:hidden flex gap-12 items-center">
          <a href="mailto:contact@eshop.ge" className="flex gap-2 items-center">
            <Mail className="size-3.5 fill-primary" />
            <span className="text-xs font-medium">contact@eshop.ge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
