import React from 'react'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import { useCart } from '../context/CartContext'
import banner from '../Images/banner_1.png'

const demoProducts = [
  {id:1, title:'Organic Cotton Tee', description:'Breathable, soft & ethically made', price:499, image:'Images/Shirt_1.jpg'},
  {id:2, title:'Eco Carrybag - Small', description:'Handy bag made from recycled fabric', price:199, image:'Images/Bag_1.jpg'},
  {id:3, title:'Linen Shirt', description:'Lightweight linen for everyday comfort', price:899, image:'Images/Shirt_2.jpg'},
]

const demoSlides = [
  { id: 1, title: 'Sustainably Sourced', subtitle: 'Organic fabrics, fair trade', image: 'public/Images/banner_3.jpg' },
  { id: 2, title: 'Eco Carrybags', subtitle: 'Strong, stylish and reusable', image: 'public/Images/banner_2.jpg' },
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
        title="Vishwas Verve"
        subtitle="Style that cares — sustainable clothes & eco carrybags"
        bgImage={banner}
      />

      <section className="mb-8">
        <Carousel slides={demoSlides} interval={3000} height="h-60 sm:h-80 md:h-96" />

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
