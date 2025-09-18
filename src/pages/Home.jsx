// src/pages/Home.jsx
import React from 'react'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import banner from '../Images/banner_1.png'

const demoSlides = [
  { id: 1, title: 'Sustainably Sourced', subtitle: 'Organic fabrics, fair trade', image: '/Images/banner_3.jpg' },
  { id: 2, title: 'Eco Carrybags', subtitle: 'Strong, stylish and reusable', image: '/Images/banner_2.jpg' },
  { id: 3, title: 'Limited Edition Tees', subtitle: 'New drop — low stock', image: '/Images/banner_1.png' },
]

export default function Home() {
  const { addItem } = useCart()

  function handleAdd(p) {
    addItem(p)
    // replace alerts with toasts if using react-hot-toast
    alert(`${p.title} added to cart.`)
  }

  const saleProducts = products.filter(p => typeof p.discount === 'number' && p.discount > 0)
  const featured = products.slice(0, 6)

  return (
    <div className="w-full">
      <Hero
        title="Vishwas Verve"
        subtitle="Style that cares — sustainable clothes & eco carrybags"
        bgImage={banner.startsWith('/') ? banner : `/${banner}`}
      />

      <section className="mb-10 container mx-auto px-4">
        <Carousel slides={demoSlides} interval={3000} height="h-56 sm:h-72 md:h-96" />
      </section>

      {/* On Sale */}
      {saleProducts.length > 0 && (
        <section className="mb-12 container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">On Sale ✨</h2>
            <a href="/collections" className="text-amber-500 hover:underline text-sm">View all</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map(p => (
              <div key={p.id} className="relative">
                <ProductCard product={p} onAdd={handleAdd} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      <section id="products" className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Products</h2>
          <a href="/collections" className="text-amber-500 hover:underline text-sm">View all</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </section>
    </div>
  )
}
