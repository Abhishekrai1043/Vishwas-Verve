// src/pages/Wishlist.jsx
import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { items, removeItem, moveToCart, clearWishlist } = useWishlist()

  function handleMoveToCart(p) {
    const ok = moveToCart(p)
    if (ok) {
      toast.success('Moved to cart')
    } else {
      toast('Added to cart (fallback)', { icon: '🛒' })
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Wishlist</h1>
        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => { clearWishlist(); toast.success('Wishlist cleared') }}
              className="px-3 py-2 rounded border text-sm"
            >
              Clear
            </button>
            <Link to="/collections" className="px-3 py-2 rounded bg-amber-400 text-slate-900 font-medium">Continue shopping</Link>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-slate-600">
          Your wishlist is empty. <Link to="/collections" className="text-amber-500 underline">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <div key={p.id} className="relative">
              <ProductCard
                product={p}
                onAdd={() => handleMoveToCart(p)}
                onWishlist={() => removeItem(p.id)}
              />
              <div className="flex gap-2 mt-2 justify-between">
                <button onClick={() => handleMoveToCart(p)} className="px-3 py-2 rounded bg-emerald-500 text-white text-sm">Move to cart</button>
                <button onClick={() => { removeItem(p.id); toast.success('Removed from wishlist') }} className="px-3 py-2 rounded border text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
