// src/components/ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, onAdd }) {
  const { items, toggleItem } = useWishlist()
  const inWishlist = items.some(p => p.id === product.id)

  // Choose correct image source
  const rawImg = (product.images && product.images[0]) || product.image || '/Images/fallback.png'
  const imgSrc = rawImg.startsWith('/') ? rawImg : `/${rawImg}`

  // Discount logic
  const hasDiscount = typeof product.discount === 'number' && product.discount > 0
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Image with wishlist */}
      <div className="relative h-56 sm:h-64 md:h-72 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-0">
          {/* blurred background */}
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-40"
          />
          {/* main image */}
          <img
            src={imgSrc}
            alt={product.title}
            className="relative z-10 max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 mx-auto"
          />
        </Link>

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleItem(product)
          }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow transition focus:outline-none ${
            inWishlist
              ? 'text-red-500'
              : 'text-slate-600 hover:text-red-500 hover:bg-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={inWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 
                 5.67l-1.06-1.06a5.5 
                 5.5 0 10-7.78 7.78L12 
                 21.23l8.84-8.84a5.5 
                 5.5 0 000-7.78z"
            />
          </svg>
        </button>

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 relative z-10 flex flex-col gap-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-slate-800 text-base sm:text-lg line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>

        {/* Price + Add button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold">₹{discountedPrice}</span>
                <span className="text-sm text-slate-500 line-through">₹{product.price}</span>
              </div>
            ) : (
              <span>₹{product.price}</span>
            )}
          </div>

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
