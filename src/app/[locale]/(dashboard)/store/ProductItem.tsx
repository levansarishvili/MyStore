"use client";

import { Link } from "../../../../i18n/routing";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { Star, Trash, Trash2, ShoppingCart } from "lucide-react";
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

  // Function to handle add to cart button click
  const handleAddToCart = async (productId: string) => {
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

      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="bg-card border rounded-xl group flex flex-col items-center justify-between hover:shadow-md gap-6 cursor-pointer text-center transition-all duration-300 w-64">
      <div className="w-full flex justify-center items-center overflow-hidden h-[12rem] rounded-xl">
        <Link href={`/store/${id}`}>
          <Image
            className="object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-95"
            src={imageSrc || ""}
            alt={name}
            width={200}
            height={200}
            quality={100}
          />
        </Link>

        {isNewProductSlider && (
          <div className="absolute top-4 left-6 bg-primary text-white font-medium text-xs px-3 py-1 rounded-lg">
            New
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4 w-full px-2 pb-6">
        <div className="flex flex-col gap-2 items-center w-full font-inter">
          <div className="flex gap-1">
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
            <Star className="size-3.5 fill-yellow-500 stroke-yellow-500" />
          </div>
          <h2 className="text-sm font-medium">{name}</h2>
          <p className="text-sm text-muted-foreground font-medium">{`${
            price / 100
          } $`}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center items-center">
          {/* Add to cart button */}
          <Button
            className="rounded-lg  px-2 py-5 text-white hover:bg-[#38CB89]/80 transition-all duration-300 w-[70%]"
            variant="default"
            onClick={() => handleAddToCart(id)}
          >
            <ShoppingCart className="size-4 fill-primary stroke-white" />
            Add to cart
          </Button>

          {/* Delete product */}
          {isProMember && isAuthor && (
            <div className="absolute top-4 right-4">
              <Button
                className="bg-red-700 text-white text-sm px-4 py-1 rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-gray-950 hover:shadow-lg"
                onClick={() => handleDelete(id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
