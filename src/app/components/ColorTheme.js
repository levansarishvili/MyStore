"use client";

import { useState, useEffect } from "react";

function ColorTheme() {
  const [colorTheme, setColorTheme] = useState("OS Default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  // Function to update class
  function updateClass(theme) {
    document.documentElement.classList.remove("light", "dark", "system");
    document.documentElement.classList.add(theme);
  }

  // Function to change color theme
  function changeColorTheme(theme) {
    setColorTheme(theme);
    setIsDropdownOpen(false);

    // Save theme in local storage
    localStorage.setItem("colorTheme", JSON.stringify(theme));
    updateClass(theme);
  }

  const colorThemes = [
    {
      name: "OS Default",
      value: "system",
      icon: (
        <svg
          className="theme-icon w-8 h-8 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40,128a88.1,88.1,0,0,1,88-88V216A88.1,88.1,0,0,1,40,128Z"></path>
        </svg>
      ),
    },
    {
      name: "Light",
      value: "light",
      icon: (
        <svg
          className="theme-icon w-8 h-8 cursor-pointer"
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
          className="theme-icon w-8 h-8 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
        </svg>
      ),
    },
  ];

  // Apply class from local storage on initial render
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("colorTheme"));
    const currTheme = savedTheme || "system";
    setColorTheme(currTheme);
    updateClass(currTheme);
  }, []);

  // Find out which theme is active
  const activeTheme =
    colorThemes.find((theme) => theme.value === colorTheme) || colorThemes[0];

  return (
    <div className="color-theme-wrapper flex items-center justify-center gap-4 relative">
      <div
        className="active-color-theme flex items-center gap-2 text-gray-900 font-medium text-xl cursor-pointer transition-all duration-300 hover:bg-[#e9ecef] w-40 px-4 py-2 rounded-md"
        onClick={toggleDropdown}
      >
        {activeTheme.icon}
        <p>Theme</p>
      </div>

      {/* Color Theme Options */}
      {isDropdownOpen && (
        <div className="color-theme-options-wrapper absolute z-20 top-16 w-52 p-4 flex flex-col items-start gap-3 border shadow-lg bg-[#f1f3f5] rounded-xl">
          {colorThemes.map((theme) => (
            <div
              key={theme.name}
              className="color-theme-option flex items-center justify-start gap-3 text-gray-900 text-xl cursor-pointer transition-all duration-300 hover:bg-[#e9ecef] w-full px-2 py-1 rounded-md"
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
