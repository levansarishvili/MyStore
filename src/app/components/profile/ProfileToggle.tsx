"use client";

import Link from "next/link";
import { logout } from "../../../app/[locale]/(dashboard)/logout/actions";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Sparkles, CreditCard, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProfileToggleProps {
  userImageUrl: string;
  locale: string;
}

export default function ProfileToggle({
  userImageUrl,
  locale,
}: ProfileToggleProps) {
  const t = useTranslations("ProfileToggle");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-8 h-8 rounded-full flex justify-center items-center text-2xl group focus-visible:ring-0"
          data-cy="user-button"
        >
          <Avatar className="w-10 h-10 flex items-center justify-center">
            <AvatarImage
              src={userImageUrl || "/assets/user.svg"}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <AvatarFallback className="bg-transparent">
              <Image
                src="/assets/user.svg"
                width={200}
                height={200}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-lg px-2 py-2 flex flex-col justify-between gap-2 mt-1">
        <DropdownMenuLabel className="px-4 text-base font-medium">
          {t("title")}
        </DropdownMenuLabel>

        <DropdownMenuGroup className="py-2">
          <Link href={`/${locale}/profile`}>
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <User className="min-w-4 min-h-4" />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
          </Link>

          <Link href={`/${locale}/cart`}>
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <ShoppingCart className="min-w-4 min-h-4" />
              <span>{t("cart")}</span>
            </DropdownMenuItem>
          </Link>

          <Link href={`/${locale}/orders`}>
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <CreditCard className="min-w-4 min-h-4" />
              <span>{t("orders")}</span>
            </DropdownMenuItem>
          </Link>

          <Link href={`/${locale}/pricing`}>
            <DropdownMenuItem className="flex gap-4 px-4 cursor-pointer focus:text-primary text-sm rounded-lg">
              <Sparkles className="min-w-4 min-h-4 fill-[#FFD700]" />
              <span>{t("pro")}</span>
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
            <span>{t("logout")}</span>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
