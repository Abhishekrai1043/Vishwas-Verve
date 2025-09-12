// src/components/ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd, onWishlist }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Product image with wishlist */}
      <div className="relative h-56 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-0">
       <div className="relative h-56 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
  {/* Blurred background */}
  <img
    src={product.image}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-40"
  />

  {/* Main contained image */}
  <img
    src={product.image}
    alt={product.title}
    className="relative z-10 max-h-full max-w-full object-contain transition duration-500 group-hover:scale-125"
  />
</div>


          
        </Link>

        {/* Wishlist toggle - keep click separate */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist?.(product) }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-600 hover:text-red-500 hover:bg-white shadow transition focus:outline-none"
          aria-label="Add to wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Product details */}
      <div className="p-4 relative z-10">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-slate-800 line-clamp-1">{product.title}</h3>
        </Link>

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
