"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function LanguageToggle() {
  const router = useRouter();
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
    router.push(`/${newLanguage}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-foreground focus-visible:ring-0 hover:text-primary rounded-lg"
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
          <span>GEO</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex justify-center cursor-pointer text-sm rounded-lg w-full focus:text-primary ${
            language === "en" ? "text-primary focus:text-primary" : ""
          }`}
        >
          <span>ENG</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
