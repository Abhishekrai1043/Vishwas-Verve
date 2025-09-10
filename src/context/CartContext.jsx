import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems(prev => {
      // if you want quantity handling, expand this structure later
      return [...prev, product];
    });
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    count: items.length,
    total: items.reduce((s, it) => s + (it.price || 0), 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
