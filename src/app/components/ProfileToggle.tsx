"use client";

import Link from "next/link";
import { logout } from "../../app/[locale]/(dashboard)/logout/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Sparkles, CreditCard, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
          className="w-8 h-8 rounded-full flex justify-center items-center text-2xl group"
          data-cy="user-button"
        >
          <Avatar className="w-10 h-10 flex items-center justify-center">
            <AvatarImage
              src={userImageUrl || "https://github.com/shadcn.png"}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <AvatarFallback className="bg-transparent">
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-lg px-2 py-2 flex flex-col justify-between gap-2 mt-1">
        <DropdownMenuLabel className="px-4 text-base font-medium">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuGroup className="py-2">
          <Link href="/profile">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <User className="min-w-4 min-h-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/cart">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <ShoppingCart className="min-w-4 min-h-4" />
              <span>Cart</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/orders">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <CreditCard className="min-w-4 min-h-4" />
              <span>Orders</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/pricing">
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <Sparkles className="min-w-4 min-h-4 fill-[#FFD700]" />
              <span>Become a Pro</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <form action={logout} className="flex justify-center cursor-pointer">
          <Button
            variant={"destructive"}
            className="w-24 p-0 font-medium rounded-lg text-xs"
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
