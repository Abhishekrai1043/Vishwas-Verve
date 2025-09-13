// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCart } from './CartContext' // we call this hook inside the provider

const WishlistContext = createContext()

export function useWishlist() {
  return useContext(WishlistContext)
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('vv_wishlist')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // call useCart hook — if a CartProvider wraps this provider above, this will be the cart API.
  // If no CartProvider is present, cart will be `undefined` and we gracefully fallback.
  const cart = useCart && typeof useCart === 'function' ? useCart() : null

  useEffect(() => {
    try {
      localStorage.setItem('vv_wishlist', JSON.stringify(items))
    } catch (e) {
      // ignore storage errors
      // console.warn('Could not persist wishlist', e)
    }
  }, [items])

  const isInWishlist = (id) => items.some(p => p && p.id === id)

  function addItem(product) {
    if (!product || product.id == null) return
    setItems(prev => {
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  function removeItem(productId) {
    setItems(prev => prev.filter(p => p.id !== productId))
  }

  function toggleItem(product) {
    if (!product || product.id == null) return
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.filter(p => p.id !== product.id)
      return [...prev, product]
    })
  }

  function clearWishlist() {
    setItems([])
  }

  function moveToCart(product) {
    // Add to cart via CartContext API if available, and remove from wishlist
    if (cart && typeof cart.addItem === 'function') {
      cart.addItem(product)
      removeItem(product.id)
      return true
    }
    // fallback: no cart API available
    return false
  }

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    moveToCart,
    count: items.length,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
