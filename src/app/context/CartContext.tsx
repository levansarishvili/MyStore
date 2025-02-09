"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  cartQuantity: number;
  setCartQuantity: Dispatch<SetStateAction<number>>;
}

// Context with an undefined default value
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
  cartQuantityServer?: number;
}

export const CartProvider = ({
  children,
  cartQuantityServer = 0,
}: CartProviderProps) => {
  const [cartQuantity, setCartQuantity] = useState<number>(cartQuantityServer);

  useEffect(() => {
    setCartQuantity(cartQuantityServer);
  }, [cartQuantityServer]);

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
