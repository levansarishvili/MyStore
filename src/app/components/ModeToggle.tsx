"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before accessing `theme`
  React.useEffect(() => {
    setMounted(() => true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-foreground focus-visible:ring-0 rounded-lg"
        >
          {/* Render fallback during SSR */}
          {mounted && (
            <>
              {theme === "light" ? (
                <SunIcon className="size-6 text-primary" />
              ) : resolvedTheme === "light" ? (
                <SunIcon className="size-6" />
              ) : theme === "dark" ? (
                <MoonIcon className="size-6 text-primary" />
              ) : (
                <MoonIcon className="size-6" />
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="rounded-lg px-2 py-2 min-w-36"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-lg"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "light" ? "text-primary" : ""
            }`}
          >
            <SunIcon className="size-5" />
            Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-lg"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "dark" ? "text-primary" : ""
            }`}
          >
            <MoonIcon className="size-5" />
            Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-lg"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "system" ? "text-primary" : ""
            }`}
          >
            <ComputerDesktopIcon className="size-5" />
            System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
