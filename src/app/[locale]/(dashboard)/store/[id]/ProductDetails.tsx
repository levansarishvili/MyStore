"use client";

import Image from "next/image";
import { ProductsType } from "../page";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "src/app/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import { type CarouselApi } from "../../../../components/ui/carousel";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useCart } from "src/app/context/CartContext";

interface Props {
  product: ProductsType;
  isInCart: boolean;
  locale: string;
}

export default function ProductDetails({ product, isInCart, locale }: Props) {
  const [inBag, setInBag] = useState(isInCart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartQuantity, setCartQuantity } = useCart();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const t = useTranslations("Products.ProductDetails");

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // Function to handle add to cart button click
  const handleAddToCart = async (productId: string) => {
    if (inBag) {
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
      // If the product is successfully added to the cart, update the state
      setInBag(() => true);
      setCartQuantity((prev) => prev + 1);

      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-xl md:text-2xl font-medium">{t("title")}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 rounded-2xl transition-all duration-300">
        {/* Product Details */}
        <div className="flex flex-col justify-center items-center w-full overflow-hidden h-auto transition-all duration-300 bg-card border rounded-xl shadow-md">
          <Carousel setApi={setCarouselApi} className="w-full max-w-xs">
            <CarouselContent className="">
              {product?.image_urls?.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center items-center"
                >
                  <div className="p-1 w-2/3 md:w-full">
                    <Image
                      className="object-contain"
                      src={image || "/assets/placeholder-img.png"}
                      alt={product?.name}
                      width={1200}
                      height={600}
                      quality={100}
                      priority={true}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden custom-lg:flex" />
            <CarouselNext className="hidden custom-lg:flex" />
          </Carousel>

          <div className="flex justify-center items-center w-full gap-2 pb-4">
            {product?.image_urls?.map((image, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`bg-background w-12 sm:w-16 rounded-lg border-2 cursor-pointer transition-all duration-300 
        ${
          currentSlide === index + 1
            ? "border-primary border-2 shadow-lg"
            : "opacity-70"
        }`}
              >
                <Image
                  src={image || "/assets/placeholder-img.png"}
                  alt={product?.name}
                  width={1200}
                  height={600}
                  quality={100}
                  priority={true}
                  className="object-contain w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Settings */}
        <div className="flex flex-col items-start justify-center gap-6 w-full p-4 md:p-8 bg-card border rounded-xl shadow-md">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 className="text-xl md:text-2xl font-medium">{product?.name}</h2>
            <p className="text-base md:text-lg text-primary font-medium">
              {product?.category}
            </p>
            <p className="text-sm md:text-base">{product?.description}</p>
          </div>
          <p className="text-sm md:text-base font-medium">
            {t("price")}: {product?.price / 100} $
          </p>
          <div className="flex">
            <Button
              variant={"default"}
              className="hover:bg-[#2ca76e] transition all duration-300 text-white text-sm w-[10rem]"
              onClick={() => handleAddToCart(product.id)}
            >
              <ShoppingCart className="size-4 fill-transparent stroke-white" />
              {`${inBag ? `${t("inCart")}` : `${t("addToCart")}`}`}
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
            <Link href={`/${locale}/cart`}>
              <Button className="text-xs md:text-sm text-white hover:bg-[#38CB89]/80 transition-all duration-300">
                {t("ModalMessage.button")}
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
