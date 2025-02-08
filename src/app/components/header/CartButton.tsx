"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "src/app/context/CartContext";

interface PropsType {
  locale: string;
}

export default function CartButton({ locale }: PropsType) {
  const { cartQuantity } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative flex justify-center hover:text-primary hover:bg-muted items-center w-9 h-9 rounded-lg transition-all duration-300"
    >
      {/* Display quantity only if greater than 0 */}
      {cartQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
          {cartQuantity}
        </span>
      )}
      <div className="flex gap-4 px-4 cursor-pointer text-sm rounded-lg ">
        <ShoppingCart className="size-5 sm:size-6" />
      </div>
    </Link>
  );
}
