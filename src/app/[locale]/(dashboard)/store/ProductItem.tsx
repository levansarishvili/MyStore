"use client";

import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Star, Trash, Trash2, ShoppingCart } from "lucide-react";
import { ProductsType } from "./page";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useCart } from "src/app/context/CartContext";

interface Props {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  isProMember?: boolean;
  products?: ProductsType[];
  userId: string | undefined;
  in_cart?: boolean;
}

// Product card component
export default function ProductItem({
  id,
  name,
  imageSrc,
  price,
  isProMember,
  products,
  userId,
  in_cart,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inCart, setInCart] = useState(in_cart);
  const { cartQuantity, setCartQuantity } = useCart();
  const t = useTranslations("Products.ProductItem");

  // Function to handle add to cart button click
  const handleAddToCart = async (productId: string) => {
    if (inCart) {
      setIsModalOpen(() => true);
      return;
    }
    try {
      const res = await fetch(`/api/add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.message === "Product already in cart") {
          console.log("Product already in cart");
          return;
        }
        console.error("Failed to add product to cart:", data.message);
        return;
      }
      setInCart(() => true);
      setCartQuantity((prev) => prev + 1);
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="pt-6 bg-card border rounded-xl group flex flex-col items-center justify-between hover:shadow-md gap-4 cursor-pointer text-center transition-all duration-300 min-w-52 md:min-w-56">
      <div className="max-sm:w-[30%] md:w-2/3 w-[40%] h-[6rem] md:h-[10rem] flex justify-center items-center overflow-hidden rounded-xl">
        <Link href={`/store/${id}`}>
          <Image
            className="object-coveropacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-95"
            src={imageSrc || ""}
            alt={name}
            width={200}
            height={200}
            quality={100}
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4 w-full px-2 pb-6">
        <div className="flex flex-col gap-2 items-center justify-between w-full font-inter">
          <div className="flex gap-1">
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
          </div>
          <h2 className="text-xs sm:text-sm font-medium">{name}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">{`${
            price / 100
          } $`}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center items-center">
          {/* Add to cart button */}
          <Button
            className="flex gap-4 justify-center items-center rounded-lg text-xs md:text-sm  px-2 py-4 text-white hover:bg-[#2ca76e] transition-all duration-300 w-36"
            variant="default"
            onClick={() => handleAddToCart(id)}
          >
            <ShoppingCart className="size-4 fill-transparent stroke-white" />
            {`${inCart ? `${t("inCart")}` : `${t("addToCart")}`}`}
          </Button>
        </div>
      </div>

      {/* Modal window for product is already in cart */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-sm:w-[16rem] max-w-[24rem] rounded-lg">
          <DialogHeader className="text-center flex flex-col gap-4">
            <DialogTitle className="text-sm md:text-base font-medium">
              {t("ModalMessage.title")}
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm">
              {t("ModalMessage.desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href="/cart">
              <Button className="text-xs md:text-sm text-white hover:bg-[#2ca76e] transition-all duration-300">
                {t("ModalMessage.button")}
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
