import React from 'react'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import { useCart } from '../context/CartContext'

const demoProducts = [
  {id:1, title:'Organic Cotton Tee', description:'Breathable, soft & ethically made', price:499, image:'https://via.placeholder.com/260x200?text=Tee'},
  {id:2, title:'Eco Carrybag - Small', description:'Handy bag made from recycled fabric', price:199, image:'https://via.placeholder.com/260x200?text=Bag'},
  {id:3, title:'Linen Shirt', description:'Lightweight linen for everyday comfort', price:899, image:'https://via.placeholder.com/260x200?text=Shirt'},
]

const demoSlides = [
  { id: 1, title: 'Sustainably Sourced', subtitle: 'Organic fabrics, fair trade', image: 'https://via.placeholder.com/1600x600?text=Sustainability' },
  { id: 2, title: 'Eco Carrybags', subtitle: 'Strong, stylish and reusable', image: 'https://via.placeholder.com/1600x600?text=Carrybags' },
  { id: 3, title: 'Limited Edition Tees', subtitle: 'New drop — low stock', image: 'https://via.placeholder.com/1600x600?text=Limited+Drop' },
]


export default function Home(){
  const { addItem } = useCart()

  function handleAdd(p){
    addItem(p)
    alert(`${p.title} added to cart.`)
  }

  return (
    <div>
      <Hero
        title="Visvas Verve"
        subtitle="Style that cares — sustainable clothes & eco carrybags"
        bgImage="https://via.placeholder.com/1600x600?text=Visvas+Verve+Banner"
      />

      <section className="mb-8">
        <Carousel slides={demoSlides} interval={3000} height="h-64 sm:h-80 md:h-96" />

      </section>

      <section id="products">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProducts.map(p=> (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </section>
    </div>
  )
}
