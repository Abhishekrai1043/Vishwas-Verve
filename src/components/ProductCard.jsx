import React, { useState, useEffect } from 'react'

/**
 * ProductCard
 * Props:
 * - product: { id, title, description, price, image }
 * - onAdd(product): add to cart handler
 * - onWishlist(product, wished): optional callback when wishlist toggles
 * - initialWished: optional boolean to set initial wishlist state
 */
export default function ProductCard({ product, onAdd, onWishlist, initialWished = false }) {
  const [wished, setWished] = useState(!!initialWished)

  useEffect(() => {
    // keep local state if prop changes externally
    setWished(!!initialWished)
  }, [initialWished])

  function toggleWishlist(e) {
    // prevent click bubbling to image/card
    e.stopPropagation?.()
    e.preventDefault?.()
    const next = !wished
    setWished(next)
    if (onWishlist) onWishlist(product, next)
  }

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
      role="article"
      aria-label={product.title}
    >
      {/* Product image with wishlist */}
      <div className="relative h-56 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
          draggable="false"
        />

        {/* Wishlist toggle */}
        <button
          onClick={toggleWishlist}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-600 hover:text-red-500 hover:bg-white shadow transition focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          {wished ? (
            // filled heart
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                       4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
                       2.09C13.09 3.81 14.76 3 16.5 3 
                       19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                       6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // outline heart
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
          )}
        </button>
      </div>

      {/* Product details */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">₹{product.price}</div>
          <button
            onClick={() => onAdd?.(product)}
            className="px-3 py-1.5 text-sm rounded-md bg-amber-500 text-slate-900 font-medium shadow hover:bg-amber-400 transition"
            aria-label={`Add ${product.title} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  )
}
