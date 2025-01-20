"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "../../app/[locale]/(dashboard)/logout/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function ProfileToggle({
  userImageUrl,
}: {
  userImageUrl: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-16 h-16 rounded-full flex justify-center items-center text-2xl group"
          data-cy="user-button"
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={userImageUrl} alt="user" />
            <AvatarFallback className="bg-transparent">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-lg px-0 py-4 flex flex-col justify-between">
        <DropdownMenuLabel className="px-4 text-xl">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="px-6 cursor-pointer focus:text-primary text-lg">
              <User className="size-9" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/orders">
            <DropdownMenuItem className="px-6 cursor-pointer focus:text-primary text-lg">
              <CreditCard />
              <span>Billing</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="px-6 cursor-pointer focus:text-primary text-lg">
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <form action={logout} className="flex justify-center cursor-pointer">
          <Button
            variant={"destructive"}
            className="w-28"
            type="submit"
            data-cy="sign-out-button"
          >
            <LogOut size="10" />
            <span>Log out</span>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
