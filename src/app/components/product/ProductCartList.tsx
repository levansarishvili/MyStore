"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface ProductType {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
}

export default function ProductCartList({
  products,
}: {
  products: ProductType[];
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  // Calculate total price whenever products change
  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + (product.price / 100) * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [products]);

  // Handle product quantity increase
  const handleQuantityIncrease = async (productId: number) => {
    try {
      const res = await fetch(`/api/increase-product-quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        console.log("Product quantity increased successfully");
        router.refresh();
      } else {
        const data = await res.json();
        console.error("Failed to increase product quantity:", data.message);
      }
    } catch (error) {
      console.error("Error increasing product quantity:", error);
    }
  };

  // Handle product quantity decrease
  const handleQuantityDecrease = async (productId: number) => {
    try {
      const res = await fetch(`/api/decrease-product-quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        console.log("Product quantity decreased successfully");
        router.refresh();
      } else {
        const data = await res.json();
        console.error("Failed to decrease product quantity:", data.message);
      }
    } catch (error) {
      console.error("Error decreasing product quantity:", error);
    }
  };

  // Handle product deletion from cart
  const handleDeleteFromCart = async (productId: number) => {
    try {
      const res = await fetch(`/api/delete-product-from-cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        console.log("Product deleted successfully");
        router.refresh();
      } else {
        const data = await res.json();
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to handle buy product button click
  const handleBuyProduct = async () => {
    try {
      const res = await fetch(`/api/buy-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="flex flex-col justify-center gap-10 items-center w-full">
      {/* If cart is empty */}
      {products.length === 0 && (
        <div className="flex flex-col items-center gap-4 mt-16">
          <h2 className="text-xl lg:text-2xl font-medium">
            Your cart is empty
          </h2>

          <Link href="/store">
            <Button className="hover:bg-[#2ca76e] transition-all duration-300">
              Go to shop
            </Button>
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <Table className="w-full border rounded-lg overflow-hidden shadow">
          <TableCaption className="text-muted-foreground text-sm py-2">
            A list of all products in your cart
          </TableCaption>
          <TableHeader className="bg-primary max-md:text-[10px]">
            <TableRow className="hover:bg-primary">
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                Product
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                Price
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                Quantity
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                Action
              </TableHead>
              <TableHead className="text-right px-2 md:px-4 py-3 font-medium text-white">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-sm">
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex max-md:items-start items-center max-md:flex-col gap-2 pl-1 sm:pl-2">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    className="w-10 md:w-16 h-10 md:h-16 object-cover"
                    width={600}
                    height={400}
                  />
                  <h2 className="text-xs md:text-sm font-medium">
                    {product.name}
                  </h2>
                </TableCell>

                <TableCell>${product.price / 100}</TableCell>

                <TableCell>
                  <div className="flex justify-center items-center gap-1 md:gap-2 border rounded-lg px-1 md:px-2 py-1 max-w-20">
                    <button
                      className="p-1 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                      onClick={() => handleQuantityDecrease(product.product_id)}
                    >
                      <Minus className="size-2.5 sm:size-3.5 cursor-pointer" />
                    </button>
                    <p className="text-xs md:text-sm">{product.quantity}</p>
                    <button
                      className="p-1 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                      onClick={() => handleQuantityIncrease(product.product_id)}
                    >
                      <Plus className="size-2.5 sm:size-3.5 cursor-pointer" />
                    </button>
                  </div>
                </TableCell>

                <TableCell className="">
                  <button
                    className="p-1 rounded-lg bg-white hover:bg-destructive hover:text-white transition-all duration-200"
                    onClick={() => handleDeleteFromCart(product.product_id)}
                  >
                    <Trash2 className="size-3 md:size-4" />
                  </button>
                </TableCell>

                <TableCell className="text-right pr-1 sm:pr-4">
                  ${(product.price / 100) * product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="md:text-lg">
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">${totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Checkout button */}
      {products.length > 0 && (
        <div className="flex justify-center w-full">
          <Button
            className="hover:bg-[#2ca76e] transition-all duration-300 w-56"
            variant="default"
            onClick={handleBuyProduct}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
