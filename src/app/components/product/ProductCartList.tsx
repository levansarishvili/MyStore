"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Loader, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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
import { useCart } from "src/app/context/CartContext";

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
  const { cartQuantity, setCartQuantity } = useCart();
  const [productsInCart, setProductsInCart] = useState(products);
  const [loading, setLoading] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);
  const t = useTranslations("Cart");

  // Calculate total price whenever products change
  useEffect(() => {
    const total = productsInCart.reduce(
      (acc, product) => acc + (product.price / 100) * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [productsInCart]);

  // Handle product quantity increase
  const handleQuantityIncrease = async (productId: number) => {
    try {
      const res = await fetch(`/api/increase-product-quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        // Update cart quantity and products in cart locally
        setCartQuantity((prev) => prev + 1);
        setProductsInCart((prev) =>
          prev.map((product) =>
            product.product_id === productId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        );
        console.log("Product quantity increased successfully");
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
    // If the quantity is 1 not allow to decrease
    if (
      productsInCart.find((product) => product.product_id === productId)
        ?.quantity === 1
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/decrease-product-quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        // Update cart quantity and products in cart locally
        setCartQuantity((prev) => prev - 1);
        setProductsInCart((prev) =>
          prev.map((product) =>
            product.product_id === productId
              ? { ...product, quantity: Math.max(1, product.quantity - 1) }
              : product
          )
        );
        console.log("Product quantity decreased successfully");
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
        // Update cart quantity and remove the deleted product from the cart
        setCartQuantity((prev) => prev - 1);
        setProductsInCart((prev) =>
          prev.filter((product) => product.product_id !== productId)
        );
        console.log("Product deleted successfully");
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
    setLoading(() => true);
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
      setLoading(() => false);
      if (data.success && data.url) {
        // Redirect to Stripe checkout page
        router.push(data.url);
      }
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  // Function to clear the cart
  const handleClearCart = async () => {
    setLoadingClear(() => true);
    try {
      const res = await fetch(`/api/clear-cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to clear cart:", data.message);
        return;
      }
      setCartQuantity(0);
      setProductsInCart([]);
      console.log("Cart cleared successfully");
      setLoadingClear(() => false);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 items-center w-full">
      {/* If cart is empty */}
      {productsInCart.length === 0 && (
        <div className="flex flex-col items-center gap-8 mt-16">
          <h2 className="text-base lg:text-xl font-medium">{t("empty")}</h2>
          <Image
            src="/assets/empty-img.svg"
            alt="empty"
            width={500}
            height={500}
            className="w-24 md:w-32"
          />
          <Link href="/store">
            <Button className="hover:bg-[#2ca76e] text-white transition-all duration-300">
              {t("emptyButton")}
            </Button>
          </Link>
        </div>
      )}

      {productsInCart.length > 0 && (
        <Table className="w-full border rounded-lg overflow-hidden shadow">
          <TableHeader className="bg-primary max-md:text-[10px]">
            <TableRow className="hover:bg-primary">
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                {t("table.product")}
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                {t("table.price")}
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white">
                {t("table.quantity")}
              </TableHead>
              <TableHead className="px-2 md:px-4 py-3 font-medium text-white"></TableHead>
              <TableHead className="text-right px-2 md:px-4 py-3 font-medium text-white">
                {t("table.subtotal")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-sm">
            {productsInCart.map((product) => (
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

                <TableCell>
                  <button
                    className="p-1 rounded-lg bg-muted hover:bg-destructive hover:text-white transition-all duration-200"
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
              <TableCell colSpan={4}>{t("table.total")}</TableCell>
              <TableCell className="text-primary text-right">
                ${totalPrice}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Checkout button */}
      {productsInCart.length > 0 && (
        <div className="flex justify-center items-center w-full gap-6">
          <Button
            onClick={handleBuyProduct}
            className={`max-w-36 bg-primary text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
              loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {t("button")}
                <Loader className="size-4 animate-spin" />
              </div>
            ) : (
              t("button")
            )}
          </Button>

          <Button
            onClick={handleClearCart}
            className={`max-w-36 bg-destructive hover:bg-destructive/80 text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
              loadingClear ? "cursor-wait opacity-70" : ""
            }`}
          >
            {loadingClear ? (
              <div className="flex items-center justify-center gap-2">
                {t("clearButton")}
                <Loader className="size-4 animate-spin" />
              </div>
            ) : (
              t("clearButton")
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
