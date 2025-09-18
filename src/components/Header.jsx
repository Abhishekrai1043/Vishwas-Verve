// src/components/Header.jsx
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import products from '../data/products'

function initials(name) {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const HISTORY_KEY = 'vv_search_history_v1'
const MAX_HISTORY = 8

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // search state
  const [query, setQuery] = useState('')
  const [openSuggestions, setOpenSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const inputRef = useRef(null)
  const wrapperRef = useRef(null) // for account menu
  const searchRef = useRef(null)  // for search dropdown

  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenSuggestions(false)
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setOpenSuggestions(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate('/')
  }

  // debounce search
  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setSuggestions([])
      return
    }
    const q = query.trim().toLowerCase()
    const timer = setTimeout(() => {
      const found = products.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      ).slice(0, 6)
      setSuggestions(found)
      setOpenSuggestions(true)
    }, 180)
    return () => clearTimeout(timer)
  }, [query])

  function pushToHistory(term) {
    if (!term || !term.trim()) return
    const t = term.trim()
    setHistory(prev => {
      const existing = prev.filter(h => h !== t)
      const next = [t, ...existing].slice(0, MAX_HISTORY)
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  function handleSubmit(e) {
    e?.preventDefault()
    const q = query.trim()
    if (!q) return
    pushToHistory(q)
    setOpenSuggestions(false)
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  function handleClickSuggestion(pOrTerm) {
    if (typeof pOrTerm === 'string') {
      pushToHistory(pOrTerm)
      setOpenSuggestions(false)
      navigate(`/search?q=${encodeURIComponent(pOrTerm)}`)
    } else {
      pushToHistory(pOrTerm.title)
      setOpenSuggestions(false)
      navigate(`/product/${pOrTerm.id}`)
    }
  }

  function handleClearHistory() {
    setHistory([])
    try { localStorage.removeItem(HISTORY_KEY) } catch {}
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md ring-1 ring-slate-200 flex items-center justify-center bg-white">
            <img src="/Images/logo.jpg" alt="Visvas Verve" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold text-slate-900 leading-tight">Vishwas Verve</div>
            <div className="text-xs text-slate-500 tracking-wide">Sustainable · Premium</div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 px-4 hidden md:block" ref={searchRef}>
          <form onSubmit={handleSubmit} className="relative" role="search" aria-label="Site search">
            <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden">
              <select className="bg-transparent text-sm text-gray-600 px-3 py-2 border-r border-gray-100" aria-hidden>
                <option>All</option>
                <option>Clothing</option>
                <option>Carrybags</option>
              </select>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setOpenSuggestions(true)}
                placeholder="Search products, e.g. organic tee"
                className="flex-1 px-3 py-2 text-sm outline-none"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 text-slate-900 font-medium rounded-r-full hover:brightness-95 transition hidden md:inline-flex items-center gap-2"
              >
                Search
              </button>
            </div>

            {/* Suggestions */}
            <div className={`absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-50 overflow-hidden transition-transform ${openSuggestions ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0 pointer-events-none'}`}>
              <div className="px-4 py-2 text-xs text-slate-500 flex items-center justify-between">
                <div>{query ? 'Recommendations' : 'Recent Searches'}</div>
                {history.length > 0 && (
                  <button onClick={handleClearHistory} className="text-xs text-amber-500 hover:underline">Clear</button>
                )}
              </div>
              {query && suggestions.length === 0 && (
                <div className="px-4 py-2 text-sm text-slate-600">No matches — press enter to search</div>
              )}
              {query && suggestions.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleClickSuggestion(p)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex gap-3 items-center"
                >
                  <img src={p.images?.[0] || '/Images/fallback.png'} alt={p.title} className="w-12 h-12 object-contain rounded" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">{p.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.category} • ₹{p.price}</div>
                  </div>
                </button>
              ))}
              {!query && history.length > 0 && (
                <div className="px-3 py-2 grid gap-2">
                  {history.map((h, i) => (
                    <button key={i} onClick={() => handleClickSuggestion(h)} className="text-left text-sm px-3 py-2 rounded hover:bg-gray-50">{h}</button>
                  ))}
                </div>
              )}
              {!query && suggestions.length === 0 && (
                <div className="px-4 py-3 grid grid-cols-3 gap-3">
                  {products.slice(0, 6).map(p => (
                    <button key={p.id} onClick={() => handleClickSuggestion(p)} className="text-left">
                      <img src={p.images?.[0] || '/Images/fallback.png'} className="w-full h-20 object-contain rounded bg-gray-50 p-2" alt={p.title} />
                      <div className="text-xs text-slate-700 mt-1">{p.title}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right group */}
        <div className="flex items-center gap-4 shrink-0">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" end className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>About</NavLink>
            <NavLink to="/collections" className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>Collections</NavLink>
          </nav>
          <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
            <span className="hidden md:inline text-sm">Cart</span>
            {count > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">{count}</span>}
          </Link>
          <div className="relative" ref={wrapperRef}>
            {user ? (
              <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-3 focus:outline-none" title={user.name}>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 text-white font-medium text-sm shadow">{initials(user.name)}</div>
                <div className="hidden sm:block text-sm text-slate-700 truncate max-w-[140px]">Hi, <span className="font-medium">{user.name}</span></div>
              </button>
            ) : (
              <Link to="/login" className="text-sm text-slate-700 hover:text-slate-900 whitespace-nowrap">Sign in</Link>
            )}
            {user && (
              <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 transform origin-top-right transition duration-180 ease-out ${menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-95 invisible'}`} style={{ top: 'calc(100% + 8px)' }}>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Profile</Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Orders</Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Wishlist</Link>
                <div className="border-t my-1" />
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile compact */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)} className="p-2 rounded-md text-slate-700 hover:bg-gray-100">
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
          <Link to="/cart" className="relative p-2 rounded-md text-slate-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
            {count > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden bg-white border-t border-gray-100 transition-[max-height] duration-300 overflow-hidden ${mobileOpen ? 'max-h-[900px] py-4' : 'max-h-0'}`} aria-hidden={!mobileOpen}>
        <div className="container mx-auto px-4">
          <form onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(query)}`); pushToHistory(query); setMobileOpen(false); }} className="flex items-center gap-2 mb-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} className="flex-1 input-soft rounded-md border px-3 py-2" placeholder="Search for products..." aria-label="Search products" />
            <button className="btn-premium px-4 py-2 rounded-full bg-amber-400 text-slate-900">Search</button>
          </form>
          <nav className="flex flex-col gap-2 mb-3">
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'text-slate-900 font-medium px-3 py-2 rounded' : 'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>Home</NavLink>
            <NavLink to="/collections" onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'text-slate-900 font-medium px-3 py-2 rounded' : 'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>Collections</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'text-slate-900 font-medium px-3 py-2 rounded' : 'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>About</NavLink>
            <NavLink to="/sustainability" onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'text-slate-900 font-medium px-3 py-2 rounded' : 'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>Sustainability</NavLink>
          </nav>
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Account</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Orders</Link>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Wishlist</Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="text-left px-3 py-2 rounded hover:bg-gray-50 text-red-600">Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Sign in</NavLink>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Link to="/offers" onClick={() => setMobileOpen(false)} className="flex-1 px-4 py-2 rounded-md bg-amber-400 text-slate-900 text-center font-semibold">Offers</Link>
            <Link to="/store-locator" onClick={() => setMobileOpen(false)} className="flex-1 px-4 py-2 rounded-md border text-center">Store</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
