// src/components/Filters.jsx
import React from 'react'

const CATEGORIES = ['Men', 'Women', 'Kids', 'Bags']

export default function Filters({ selectedCategories = [], q = '', sort = 'popular', onChange }) {
  function toggleCategory(cat) {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter(c => c !== cat)
      : [...selectedCategories, cat]
    onChange({ categories: next, q, sort })
  }

  function onQ(e) {
    onChange({ categories: selectedCategories, q: e.target.value, sort })
  }

  function onSort(e) {
    onChange({ categories: selectedCategories, q, sort: e.target.value })
  }

  function clearAll() {
    onChange({ categories: [], q: '', sort: 'popular' })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => {
          const active = selectedCategories.includes(cat)
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${active ? 'bg-amber-500 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <div className="flex-1 md:max-w-md">
        <input
          value={q}
          onChange={onQ}
          placeholder="Search products..."
          className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <select value={sort} onChange={onSort} className="border rounded px-3 py-2 text-sm">
          <option value="popular">Sort: Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="new">Newest</option>
        </select>

        <button onClick={clearAll} className="text-sm text-slate-600 hover:underline">Clear</button>
      </div>
    </div>
  )
}
