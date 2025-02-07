"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0 mt-10 md:mt-16">
      <h1 className="text-xl lg:text-2xl font-medium text-center mb-6">
        {t("title")}
      </h1>
      <p className="text-sm md:text-base text-center mb-8">{t("question")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex flex-col justify-center">
          <form className="mt-4 md:mt-8 space-y-4">
            <Input
              type="text"
              placeholder={t("name")}
              className="w-full text-sm"
              required
            />
            <Input
              type="email"
              placeholder={t("email")}
              className="w-full text-sm"
              required
            />
            <Textarea
              placeholder={t("message")}
              className="w-full h-28 text-sm"
              required
            />
            <div className="flex justify-center">
              <Button className="w-full max-w-32 bg-[#38cb89] hover:bg-[#2da874] text-white font-medium py-2 px-4 rounded-lg transition">
                {t("button")}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#38cb89]" />
              <span className="text-sm">contact@e-shop.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#38cb89]" />
              <span className="text-sm">+995 599 999 999 </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#38cb89]" />
              <span className="text-sm">{t("address")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
