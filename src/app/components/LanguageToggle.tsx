"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { cn } from "src/lib/utils";
import Image from "next/image";

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
          className="w-16 h-16 text-foreground focus-visible:ring-0 hover:text-primary rounded-lg"
        >
          <Languages className="size-9" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="flex flex-col rounded-lg px-0 py-2 font-medium min-w-[8rem]"
      >
        <DropdownMenuItem
          onClick={() => handleLanguageChange("ka")}
          className={`flex justify-center cursor-pointer text-lg rounded-none w-full ${
            language === "ka" ? "text-primary focus:text-primary" : ""
          }`}
        >
          <span>GEO</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex justify-center cursor-pointer text-lg rounded-none ${
            language === "en" ? "text-primary focus:text-primary" : ""
          }`}
        >
          <span>ENG</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
