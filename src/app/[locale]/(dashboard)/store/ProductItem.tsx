"use client";

import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { Trash, Trash2 } from "lucide-react";
import { ProductsType } from "./page";

interface Props {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  isProMember?: boolean;
  products?: ProductsType[];
  userId: string | undefined;
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
    <div className="bg-card group flex flex-col items-center justify-between gap-8 cursor-pointer text-center transition-all duration-300 w-64 h-[20rem] rounded-2xl hover:shadow-md border">
      <Link
        className="flex flex-col justify-center items-center gap-4 w-full"
        href={`/store/${id}`}
      >
        <div className="w-full h-36 flex justify-center items-center overflow-hidden">
          <Image
            className="object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
            src={imageSrc || "/assets/placeholder-img.png"}
            alt={name}
            width={100}
            height={100}
            quality={100}
          />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4 text-gray-600 text-xl"></div>
            <p className="text-2xl font-medium text-gray-600 dark:text-gray-100">{`${
              price / 100
            } $`}</p>
          </div>
        </div>
      </Link>
      <div className="flex gap-4">
        <Button className="" variant="default">
          Add to cart
        </Button>

        {/* Show Detele button if user is a Pro member and user is the creator of the product */}
        {isProMember && isAuthor && (
          <Button
            className=""
            onClick={() => handleDelete(id)}
            data-cy="delete-product-button"
            variant={"destructive"}
          >
            <Trash2 className="w-6 h-6" />
          </Button>
        )}

        <Button className="" onClick={() => handleBuyProduct(id)}>
          Buy now
        </Button>
      </div>
    </div>
  );
}
