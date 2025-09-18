// src/pages/Product.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Carousel from '../components/Carousel'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => String(p.id) === String(id))

  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '')
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)

  // NEW: control carousel index + modal
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold mb-4">Product not found</h2>
        <Link to="/" className="text-amber-500 underline">Return to shop</Link>
      </div>
    )
  }

  function handleAdd() {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      size: selectedSize,
      qty
    }
    addItem(item)
    alert(`${product.title} (${selectedSize}) added to cart.`)
    navigate('/cart')
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: images / carousel */}
        <div className="relative">
          <Carousel
            slides={(product.images || []).map((img, i) => ({
              id: i,
              image: img.startsWith('/Images') ? img : `/Images/${img}`,
            }))}
            interval={4000}
            height="h-96"
            index={carouselIndex} // pass controlled index
            onIndexChange={setCarouselIndex}
          />

          {/* Magnifying glass button */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-slate-700 hover:text-amber-500 shadow"
            aria-label="View full image"
          >
            <img 
  src="/Images/magnifying-glass-plus-svgrepo-com.png" 
  alt="Zoom" 
  className="w-5 h-5"
/>

          </button>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-3">
            {(product.images || []).map((img, idx) => (
              <button
                key={idx}
                className={`w-20 h-20 rounded overflow-hidden border ${idx === carouselIndex ? 'border-amber-500' : 'border-gray-200'}`}
                onClick={() => setCarouselIndex(idx)}
              >
                <img
                  src={img.startsWith('/Images') ? img : `/Images/${img}`}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="bg-white p-6 rounded-xl shadow-soft">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
              <div className="text-sm text-slate-500 mt-1">{product.sku} • {product.color}</div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">₹{product.price}</div>
          </div>

          <p className="text-slate-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <div className="text-sm font-medium text-slate-700 mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-2 rounded border ${selectedSize === sz ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}
                >
                  {sz}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-500 mt-2">In stock: {product.stock}</div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
              <div className="px-4">{qty}</div>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2">+</button>
            </div>

            <button onClick={handleAdd} className="px-6 py-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold shadow">
              Add to cart
            </button>

            <button
              onClick={() => setWished(w => !w)}
              className={`px-3 py-2 rounded-md border ${wished ? 'bg-red-50 text-red-600' : 'text-slate-700'}`}
            >
              {wished ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>

          <div className="border-t pt-4 text-sm text-slate-600">
            <div><strong>Material:</strong> {product.material}</div>
            <div><strong>SKU:</strong> {product.sku}</div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>
          <img
            src={product.images[carouselIndex].startsWith('/Images') ? product.images[carouselIndex] : `/Images/${product.images[carouselIndex]}`}
            alt={`${product.title} full view`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
