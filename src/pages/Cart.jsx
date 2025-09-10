import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, removeItem, clearCart, total } = useCart()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-slate-900">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-slate-500 text-center py-20 bg-white rounded-lg shadow">
          <p className="mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 text-white font-medium shadow hover:brightness-110 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={it.image || 'https://via.placeholder.com/100'}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{it.title}</h3>
                  <p className="text-sm text-slate-500">₹{it.price}</p>
                </div>

                {/* Actions */}
                <button
                  onClick={() => removeItem(i)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-slate-500">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-900 border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 text-white font-medium shadow hover:brightness-110 transition">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-gray-50 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
