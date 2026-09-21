"use client";
import { createContext, useContext, useState } from "react";
import { useCurrency } from "./CurrencyContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { currency } = useCurrency();

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => (i.slug || i.id) === (product.slug || product.id));
      if (existing) {
        return prev.map((i) =>
          (i.slug || i.id) === (product.slug || product.id) ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((i) => (i.slug || i.id) !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => ((i.slug || i.id) === id ? { ...i, qty } : i)));
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  
  // Total harga otomatis dikalikan dengan rate currency aktif
  const baseTotalPrice = items.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);
  const totalPrice = baseTotalPrice * (currency?.rate || 1);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}