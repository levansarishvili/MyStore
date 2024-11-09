"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the language from the URL and use it as the initial language
  const currentLang = pathname.split("/")[1] || "en";
  const [language, setLanguage] = useState(currentLang);

  useEffect(() => {
    // Update the language state whenever the URL path changes
    setLanguage(currentLang);
  }, [pathname]);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    router.push(`/${selectedLang}${pathname.slice(3)}`);

    // Save the selected language to localStorage
    localStorage.setItem("selectedLanguage", selectedLang);
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="bg-[#f1f3f5] dark:bg-[#313131] hover:bg-[#e5e7eb] dark:hover:bg-[#1c1c1c] dark:text-white  p-2 rounded-lg outline-none"
    >
      <option value="en">en</option>
      <option value="ka">ka</option>
    </select>
  );
}

export default LanguageToggle;
