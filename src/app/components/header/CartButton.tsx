"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsType {
  cartQuantity: number | undefined;
}

export default function CartButton({ cartQuantity }: PropsType) {
  const [cartItemsQuantity, setCartItemsQuantity] = useState(cartQuantity || 0);

  // Update cartItemsQuantity when cartQuantity prop changes
  useEffect(() => setCartItemsQuantity(cartQuantity || 0), [cartQuantity]);

  return (
    <Link
      href="/cart"
      className="relative flex justify-center hover:text-primary hover:bg-muted items-center w-9 h-9 rounded-lg transition-all duration-300"
    >
      {/* Display quantity only if greater than 0 */}
      {cartItemsQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItemsQuantity}
        </span>
      )}
      <div className="flex gap-4 px-4 cursor-pointer text-sm rounded-lg ">
        <ShoppingCart className="size-5 sm:size-6" />
      </div>
    </Link>
  );
}
