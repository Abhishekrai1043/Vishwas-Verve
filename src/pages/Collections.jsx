// src/pages/Collections.jsx
import React, { useMemo, useState } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import { useCart } from '../context/CartContext'

export default function Collections() {
  const [filters, setFilters] = useState({ categories: [], q: '', sort: 'popular' })
  const { addItem } = useCart()

  function handleFilterChange(next) {
    setFilters(prev => ({ ...prev, ...next }))
  }

  const filtered = useMemo(() => {
    const qLower = filters.q.trim().toLowerCase()
    return products
      .filter(p => {
        // category filter (if any)
        if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false
        // search filter
        if (qLower) {
          const hay = `${p.title} ${p.description} ${p.sku} ${p.color}`.toLowerCase()
          return hay.includes(qLower)
        }
        return true
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc': return a.price - b.price
          case 'price-desc': return b.price - a.price
          case 'new': return parseInt(b.id, 10) - parseInt(a.id, 10)
          default: return 0
        }
      })
  }, [filters])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Collections</h1>
        <p className="text-sm text-slate-500">Browse all products. Filter by category and search for items.</p>
      </div>

      <Filters
        selectedCategories={filters.categories}
        q={filters.q}
        sort={filters.sort}
        onChange={({ categories, q, sort }) => handleFilterChange({ categories, q, sort })}
      />

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="text-muted col-span-full">No products found for selected filters.</div>
          ) : (
            filtered.map(p => (
              <ProductCard
                key={p.id}
                product={{ ...p, image: p.images?.[0] }}
                onAdd={(prod) => addItem({ id: prod.id, title: prod.title, price: prod.price, image: prod.images?.[0] })}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
