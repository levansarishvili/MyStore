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
          className="w-16 h-16 text-foreground focus-visible:ring-0 rounded-lg"
        >
          {/* Render fallback during SSR */}
          {mounted && (
            <>
              {theme === "light" ? (
                <Sun className="size-9 text-primary" />
              ) : resolvedTheme === "light" ? (
                <Sun className="size-9" />
              ) : theme === "dark" ? (
                <Moon className="size-9 text-primary" />
              ) : (
                <Moon className="size-9" />
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="rounded-lg px-0 py-2 font-medium min-w-48"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-4 cursor-pointer text-lg px-4 w-full ${
              theme === "light" ? "text-primary" : ""
            }`}
          >
            <Sun className="size-8" />
            Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-4 cursor-pointer text-lg px-4 w-full ${
              theme === "dark" ? "text-primary" : ""
            }`}
          >
            <Moon className="size-8" />
            Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-none"
        >
          <div
            className={`flex items-center gap-4 cursor-pointer text-lg px-4 w-full ${
              theme === "system" ? "text-primary" : ""
            }`}
          >
            <Monitor className="size-8" />
            System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
