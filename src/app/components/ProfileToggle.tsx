"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "../../app/[locale]/(dashboard)/logout/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Cloud,
  CreditCard,
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
  ShoppingCart,
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
          className="w-12 h-12 rounded-full flex justify-center items-center text-2xl group"
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

      <DropdownMenuContent className="w-56 rounded-lg px-0 py-2 flex flex-col justify-between">
        <DropdownMenuLabel className="px-4 text-lg font-medium">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="py-2">
          <Link href="/profile">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-base">
              <User className="min-w-5 min-h-5" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-base">
            <ShoppingCart className="min-w-5 min-h-5" />
            <span>Cart</span>
          </DropdownMenuItem>

          <Link href="/orders">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-base ">
              <CreditCard className="min-w-5 min-h-5" />
              <span>Orders</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-base">
            <Settings className="min-w-5 min-h-5" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <form action={logout} className="flex justify-center cursor-pointer">
          <Button
            variant={"destructive"}
            className="w-28 font-medium rounded-lg"
            type="submit"
            data-cy="sign-out-button"
          >
            <LogOut className="size-5" />
            <span>Log out</span>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
