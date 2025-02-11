"use client";

import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Star, Trash, Trash2, ShoppingCart, Loader } from "lucide-react";
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
  const [loading, setLoading] = useState(false);

  // Function to handle add to cart button click
  const handleAddToCart = async (productId: string) => {
    if (inCart) {
      setIsModalOpen(() => true);
      return;
    }
    setLoading(() => true);
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
          setLoading(() => false);
          return;
        }
        setLoading(() => false);
        console.error("Failed to add product to cart:", data.message);
        return;
      }
      setInCart(() => true);
      setCartQuantity((prev) => prev + 1);
      console.log("Product added to cart successfully");
      setLoading(() => false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div className="max-custom-xs-w-[10rem] p-2 sm:p-4 bg-card border rounded-xl group flex flex-col items-center justify-between hover:shadow-md gap-4 cursor-pointer text-center transition-all duration-300 min-w-52 md:min-w-56">
      <div className="max-sm:w-[30%] md:w-2/3 w-[40%] h-[6rem] md:h-[10rem] flex justify-center items-center overflow-hidden rounded-xl">
        <Link href={`/store/${id}`}>
          <Image
            className="object-coveropacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-95 w-full"
            src={imageSrc || ""}
            alt={name}
            width={200}
            height={200}
            quality={100}
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4 w-full px-2 pb-4 sm:pb-6">
        <div className="flex flex-col gap-2 items-center justify-between w-full font-inter">
          <div className="flex gap-1">
            {["a", "b", "c", "d", "e"].map((star, index) => (
              <Star
                key={index}
                className="size-3.5 fill-yellow-500 stroke-yellow-500"
              />
            ))}
          </div>
          <h2 className="text-xs sm:text-sm font-medium">{name}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">{`${
            price / 100
          } $`}</p>
        </div>

        <div className="flex w-full justify-center items-center">
          {/* Add to cart button */}
          <div className="w-full flex justify-center">
            <Button
              onClick={() => handleAddToCart(id)}
              className={`min-w-[10rem] bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  {t("addToCart")}
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4 fill-transparent stroke-white" />
                  {inCart ? t("inCart") : t("addToCart")}
                </>
              )}
            </Button>
          </div>
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
