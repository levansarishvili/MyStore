"use client";

import Link from "next/link";
import { ArrowRight, X, TicketPercent } from "lucide-react";
import { useState } from "react";

export default function NotificationBar() {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(() => !isOpen);
  };

  return (
    isOpen && (
      <div className="flex justify-center items-center gap-4 w-full h-10 bg-[#38CB89]">
        <div className="flex text-xs md:text-sm items-center gap-4">
          <TicketPercent className="size-5" />
          <p className="text-center font-medium">
            30% off storewide — Limited time!
          </p>
          <Link
            href="/store"
            className="max-md:hidden flex gap-1 items-center text-center font-medium hover:text-white transition-all duration-300"
          >
            Shop now
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <button
          onClick={handleClose}
          className="hover:text-white transition-all duration-300"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  );
}
