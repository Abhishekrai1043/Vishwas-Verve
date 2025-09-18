// src/pages/SearchResults.jsx
import React, { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function SearchResults() {
  const q = useQuery().get('q') || ''
  const query = q.trim().toLowerCase()

  const results = useMemo(() => {
    if (!query) return []
    return products.filter(p =>
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.sku && p.sku.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query))
    )
  }, [query])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Search results</h1>
          <p className="text-sm text-slate-600 mt-1">Results for <strong>{q}</strong></p>
        </div>
        <div>
          <Link to="/collections" className="text-sm text-amber-500 underline">Browse all</Link>
        </div>
      </div>

      {query === '' ? (
        <div className="text-slate-600">Please enter a search query.</div>
      ) : results.length === 0 ? (
        <div className="text-slate-600">No products found. Try different keywords.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(p => (
            <ProductCard key={p.id} product={p} onAdd={() => { /* you can wire add-to-cart */ }} onWishlist={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}
