"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function LanguageToggle() {
  const t = useTranslations("LanguageToggle");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [language, setLanguage] = useState("ka");

  // Sync with localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(() => savedLanguage);
    }
  }, []);

  // Function to handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(() => newLanguage);
    localStorage.setItem("language", newLanguage);

    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLanguage}`);
    router.push(
      `${newPath}${searchParams ? `?${searchParams.toString()}` : ""}`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none">
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 text-foreground focus-visible:ring-0 hover:text-primary rounded-lg"
        >
          <Languages className="size-5 sm:size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="flex flex-col rounded-lg px-2 py-2 min-w-[5rem]"
      >
        <DropdownMenuItem
          onClick={() => handleLanguageChange("ka")}
          className={`flex justify-center cursor-pointer text-xs md:text-sm rounded-lg w-full focus:text-primary ${
            language === "ka" ? "text-primary focus:text-primary" : ""
          }`}
        >
          <span>{t("ka")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex justify-center cursor-pointer text-sm rounded-lg w-full focus:text-primary ${
            language === "en" ? "text-primary focus:text-primary" : ""
          }`}
        >
          <span>{t("en")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
