// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((prev) => {
      const next = [...prev, product];
      toast.success(`🛒 Added ${product.title} to cart`);
      return next;
    });
  }

  function removeItem(index) {
    let removed = null;
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      removed = prev[index];
      const next = prev.filter((_, i) => i !== index);
      return next;
    });

    if (removed) {
      // Show toast with UNDO action. Keep toast visible for 6s.
      const id = toast(
        (t) => (
          <div className="flex items-center gap-3">
            <div>❌ Removed <strong>{removed.title}</strong></div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => {
                  // Re-add the removed item
                  setItems((prev) => {
                    const next = [...prev, removed];
                    return next;
                  });
                  toast.dismiss(t.id);
                  toast.success(`↩️ Restored ${removed.title}`);
                }}
                className="px-3 py-1 rounded bg-gray-100 text-sm"
              >
                Undo
              </button>

              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded bg-gray-50 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 6000,
          position: "bottom-right",
        }
      );
      // id returned if you need to programmatically dismiss later
    }
  }

  function clearCart() {
    const snapshot = items.slice();
    setItems([]);
    const id = toast(
      (t) => (
        <div className="flex items-center gap-3">
          <div>🧹 Cart cleared</div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                setItems(snapshot);
                toast.dismiss(t.id);
                toast.success("↩️ Cart restored");
              }}
              className="px-3 py-1 rounded bg-gray-100 text-sm"
            >
              Undo
            </button>

            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 rounded bg-gray-50 text-sm">
              Close
            </button>
          </div>
        </div>
      ),
      { duration: 6000, position: "bottom-right" }
    );
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
