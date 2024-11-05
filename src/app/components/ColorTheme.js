"use client";

import { useState, useEffect } from "react";

function ColorTheme() {
  const [colorTheme, setColorTheme] = useState("system");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Apply class from local storage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("colorTheme") || "system";
    setColorTheme(savedTheme);
    updateClass(savedTheme);

    if (colorTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e) => {
        updateClass(e.matches ? "dark" : "light");
      };
      // Apply system theme on change
      mediaQuery.addEventListener("change", handleSystemThemeChange);

      // Clean up listener
      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [colorTheme]);

  // Toggle dropdown visibility
  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  // Update document classes based on theme
  function updateClass(theme) {
    document.documentElement.classList.remove("light", "dark");
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }

  // Change color theme and save to localStorage
  function changeColorTheme(theme) {
    setColorTheme(theme);
    setIsDropdownOpen(false);
    if (theme === "system") {
      localStorage.removeItem("colorTheme");
    } else {
      localStorage.setItem("colorTheme", theme);
    }
    updateClass(theme);
  }

  const colorThemes = [
    {
      name: "System",
      value: "system",
      icon: (
        <svg
          className="theme-icon w-10 h-10 cursor-pointer dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"></path>
        </svg>
      ),
    },
    {
      name: "Light",
      value: "light",
      icon: (
        <svg
          className="theme-icon w-10 h-10 cursor-pointer dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
        </svg>
      ),
    },
    {
      name: "Dark",
      value: "dark",
      icon: (
        <svg
          className="theme-icon w-10 h-10 cursor-pointer dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"></path>
        </svg>
      ),
    },
  ];

  const activeTheme =
    colorThemes.find((theme) => theme.value === colorTheme) || colorThemes[0];

  return (
    <div className="color-theme-wrapper flex items-center justify-center gap-4 relative">
      <div
        className="active-color-theme flex items-center gap-2 text-gray-900 font-medium text-xl cursor-pointer transition-all duration-300 hover:bg-[#dee2e6] px-4 py-2 rounded-md dark:hover:bg-[#1b1b1b]"
        onClick={toggleDropdown}
      >
        {activeTheme.icon}
      </div>

      {isDropdownOpen && (
        <div className="color-theme-options-wrapper absolute z-20 top-16 w-52 p-4 flex flex-col items-start gap-3 border shadow-lg bg-[#f1f3f5] rounded-xl dark:bg-[#313131]">
          {colorThemes.map((theme) => (
            <div
              key={theme.name}
              className="color-theme-option flex items-center justify-start gap-4 text-gray-900 text-xl cursor-pointer transition-all duration-300 hover:bg-[#dee2e6] w-full px-2 py-1 rounded-md dark:text-white dark:hover:bg-[#1b1b1b]"
              onClick={() => changeColorTheme(theme.value)}
            >
              {theme.icon}
              <p>{theme.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorTheme;
