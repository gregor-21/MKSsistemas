"use client";
import { CartProvider } from "../components/CartContext";
import ShopPage from "../pages/ShopPage";


export default function Home() {
  return <CartProvider><ShopPage /></CartProvider>
}
