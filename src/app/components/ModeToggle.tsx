"use client";

import * as React from "react";
import { Monitor, Moon, Sun, SunDim } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../components/ui/button";
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
          className="w-12 h-12 text-foreground focus-visible:ring-0 rounded-lg"
        >
          {/* Render fallback during SSR */}
          {mounted && (
            <>
              {theme === "light" ? (
                <Sun className="size-6 text-primary" />
              ) : resolvedTheme === "light" ? (
                <Sun className="size-6" />
              ) : theme === "dark" ? (
                <Moon className="size-6 text-primary" />
              ) : (
                <Moon className="size-6" />
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="rounded-lg px-0 py-2 font-medium min-w-36"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "light" ? "text-primary" : ""
            }`}
          >
            <Sun className="size-5" />
            Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "dark" ? "text-primary" : ""
            }`}
          >
            <Moon className="size-5" />
            Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-3 cursor-pointer text-sm px-2 w-full hover:text-primary duration-200 ${
              theme === "system" ? "text-primary" : ""
            }`}
          >
            <Monitor className="size-5" />
            System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
