// cartContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/types';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const calculateSubtotal = (items: CartItem[]) => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = items.findIndex((item) => item.product.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity++;
      setItems(updatedItems);
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
    setSubtotal(prevSubtotal => prevSubtotal + Number(product.price));
  };

  const removeFromCart = (productId: number) => {
    const removedItemIndex = items.findIndex((item) => item.product.id === productId);
    if (removedItemIndex !== -1) {
      const updatedItems = [...items];
      if (updatedItems[removedItemIndex].quantity > 1) {
        updatedItems[removedItemIndex].quantity--;
      } else {
        updatedItems.splice(removedItemIndex, 1);
      }
      setItems(updatedItems);
      const removedItemPrice = items[removedItemIndex].product.price;
      setSubtotal(prevSubtotal => prevSubtotal - Number(removedItemPrice));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  };

  const cartState: CartState = {
    items,
    subtotal: calculateSubtotal(items),
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart,
  };

  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
