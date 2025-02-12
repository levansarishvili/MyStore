"use client";

import Image from "next/image";
import { ProductsType } from "../page";
import { Heart, Loader, ShoppingCart } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
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
        console.error("Failed to add product to cart:", data.message);
        setLoading(() => false);
        return;
      }
      // If the product is successfully added to the cart, update the state
      setInBag(() => true);
      setCartQuantity((prev) => prev + 1);

      console.log("Product added to cart successfully");
      setLoading(() => false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 md:gap-10 lg:gap-12">
      <h1 className="w-full text-center text-xl md:text-2xl font-medium">
        {t("title")}
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 rounded-2xl transition-all duration-300  bg-card border px-4 py-4 md:py-8 lg:py-10">
        {/* Product Details */}
        <div className="flex flex-col justify-center items-center w-full overflow-hidden h-auto transition-all duration-300">
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
                className={`bg-background px-4 w-full py-2 max-w-20 rounded-lg border cursor-pointer transition-all duration-300 
        ${
          currentSlide === index + 1 ? "border-primary shadow-lg" : "opacity-70"
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
        <div className="flex flex-col items-start justify-center gap-6 w-full p-4 md:p-8">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 className="text-base md:text-xl font-medium">
              {product?.name}
            </h2>
            <p className="text-sm md:text-lg text-primary font-medium">
              {product?.category}
            </p>
            <p className="text-sm md:text-sm">{product?.description}</p>
          </div>
          <p className="text-sm font-medium">
            {t("price")}: {product?.price / 100} $
          </p>
          <div className="flex">
            {/* Add to cart button */}
            <div className="w-full flex justify-center">
              <Button
                onClick={() => handleAddToCart(product.id)}
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
                    {inBag ? t("inCart") : t("addToCart")}
                  </>
                )}
              </Button>
            </div>
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
