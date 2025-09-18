// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function initials(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false) // mobile panel
  const [menuOpen, setMenuOpen] = useState(false) // user dropdown
  const wrapperRef = useRef(null)

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate('/')
  }

  // close dropdown on outside click or escape
  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md ring-1 ring-slate-200 flex items-center justify-center bg-white">
            <img src="/Images/logo.jpg" alt="Visvas Verve" className="w-full h-full object-cover" />
          </div>

          <div className="hidden sm:block">
            <div className="text-lg font-semibold text-slate-900 leading-tight">Vishwas Verve</div>
            <div className="text-xs text-slate-500 tracking-wide">Sustainable · Premium</div>
          </div>
        </Link>

        {/* SEARCH (center on md+) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <form
            role="search"
            className="w-full max-w-2xl flex items-center gap-2 bg-white rounded-full shadow-sm border border-gray-200 px-2 py-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <select
              className="bg-transparent text-sm text-gray-600 px-3 py-2 rounded-l-full border-r border-gray-100"
              aria-hidden
            >
              <option>All</option>
              <option>Clothing</option>
              <option>Carrybags</option>
            </select>

            <input
              id="site-search"
              className="flex-1 outline-none px-3 py-2 text-sm"
              placeholder="Search for products, e.g. organic tee"
              aria-label="Search products"
            />

            <button
              type="submit"
              className="ml-2 hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 bg-amber-400 text-slate-900 font-medium shadow hover:brightness-95 transition"
              aria-label="Search"
            >
              Search
            </button>
          </form>
        </div>

        {/* RIGHT GROUP - always stays together on right */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Desktop nav (md+) */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900 transition')}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900 transition')}
            >
              About
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) => (isActive ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900 transition')}
            >
              Collections
            </NavLink>
          </nav>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700"
            aria-label="View cart"
            title="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="hidden md:inline text-sm">Cart</span>

            {count > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">
                {count}
              </span>
            )}
          </Link>

          {/* Auth area */}
          <div className="relative" ref={wrapperRef}>
            {user ? (
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                className="flex items-center gap-3 focus:outline-none"
                title={user.name}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 text-white font-medium text-sm shadow">
                  {initials(user.name)}
                </div>

                <div className="min-w-0 text-right hidden sm:block">
                  <div className="text-sm text-slate-700 truncate max-w-[140px]">
                    Hi, <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="text-xs text-slate-500 hover:text-slate-700">Account</div>
                </div>

                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <Link to="/login" className="text-sm text-slate-700 hover:text-slate-900 whitespace-nowrap">Sign in</Link>
            )}

            {/* Dropdown menu */}
            {user && (
              <div
                role="menu"
                aria-label="User menu"
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 transform origin-top-right transition duration-180 ease-out
                  ${menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-95 invisible'}`}
                style={{ top: 'calc(100% + 8px)' }}
              >
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Profile</Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Orders</Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Wishlist</Link>
                <div className="border-t my-1" />
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE: compact icons (visible on small screens) */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            aria-label="Open search and menu"
            onClick={() => setMobileOpen(prev => !prev)}
            className="p-2 rounded-md text-slate-700 hover:bg-gray-100"
          >
            {mobileOpen ? (
              // close
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // menu
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link to="/cart" className="relative p-2 rounded-md text-slate-700 hover:bg-gray-100" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {count > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">{count}</span>}
          </Link>
        </div>
      </div>

      {/* MOBILE PANEL (slide-down) */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 transition-[max-height] duration-300 overflow-hidden ${mobileOpen ? 'max-h-[900px] py-4' : 'max-h-0'}`}
        aria-hidden={!mobileOpen}
      >
        <div className="container mx-auto px-4">
          <form className="flex items-center gap-2 mb-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-1 input-soft rounded-md border px-3 py-2"
              placeholder="Search for products..."
              aria-label="Search products"
            />
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
