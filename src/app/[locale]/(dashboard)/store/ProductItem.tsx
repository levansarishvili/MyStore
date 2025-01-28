"use client";

import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { Star, Trash, Trash2 } from "lucide-react";
import { ProductsType } from "./page";

interface Props {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  isProMember?: boolean;
  products?: ProductsType[];
  userId: string | undefined;
  isNewProductSlider?: boolean;
  sale?: number;
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
  isNewProductSlider,
  sale,
}: Props) {
  const router = useRouter();

  // Check is user is author of the product
  const isAuthor =
    userId === products?.find((product) => product.id === id)?.user_id;

  // Function to handle product deletion
  const handleDelete = async (productId: string) => {
    try {
      const res = await fetch(`/api/delete-product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to delete product:", data.message);
        return;
      }

      console.log("Product deleted successfully");
      router.push("?deleted=true");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to handle buy product button click
  const handleBuyProduct = async (productId: string) => {
    try {
      const res = await fetch(`/api/buy-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to buy product:", data.message);
        return;
      }

      const data = await res.json();

      console.log("Product bought successfully");
      if (data.success && data.url) {
        // Redirect to Stripe checkout page
        router.push(data.url);
      }
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  return (
    <div className="group flex flex-col items-center justify-between gap-8 cursor-pointer text-center transition-all duration-300 w-64">
      <Link
        className="flex flex-col justify-center items-start gap-4 w-full"
        href={`/store/${id}`}
      >
        <div className="relative w-full flex justify-center items-center overflow-hidden bg-secondary h-[20rem]">
          <Image
            className="object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
            src={imageSrc || "/assets/placeholder-img.png"}
            alt={name}
            width={200}
            height={200}
            quality={100}
          />

          {/* Add to cart button */}
          <Button
            className="rounded-xl opacity-0 group-hover:opacity-100  px-2 py-6 absolute bottom-4 text-foreground hover:bg-[#38CB89]/80 transition-all duration-300 w-[80%]"
            variant="default"
          >
            Add to cart
          </Button>

          {isNewProductSlider && (
            <div className="absolute top-4 left-4 bg-background text-foreground font-semibold text-sm px-4 py-1 rounded-lg">
              HOT
            </div>
          )}

          {/* Sale badge */}
          {sale && (
            <div className="absolute top-12 left-4 bg-primary text-white font-semibold text-sm px-3 py-1 rounded-lg">
              -{sale * 100}%
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-start font-inter">
          <div className="flex gap-1">
            <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
          </div>
          <h2 className="text-basic font-semibold">{name}</h2>
          <p className="text-sm font-semibold">{`${price / 100} $`}</p>
        </div>
      </Link>
    </div>
  );
}
