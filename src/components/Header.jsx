import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function initials(name) {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()
}

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)           // mobile panel
  const [menuOpen, setMenuOpen] = useState(false)   // avatar dropdown
  const wrapperRef = useRef(null)

  function handleLogout() {
    setMenuOpen(false)
    logout()
    navigate('/')
  }

  // Close dropdown on outside click or Escape
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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md">
            VV
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold text-slate-900 leading-tight">Vishwas Verve</div>
            <div className="text-xs text-slate-500 tracking-wide">Sustainable · Premium</div>
          </div>
        </Link>

        {/* Searchbar occupies remaining space between logo and right-group */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <form className="w-full max-w-2xl flex items-center gap-2 bg-white rounded-full shadow-sm border border-gray-200 px-2 py-1">
            <select className="bg-transparent text-sm text-gray-600 px-3 py-2 rounded-l-full border-r border-gray-100">
              <option>All</option>
              <option>Clothing</option>
              <option>Carrybags</option>
            </select>
            <input
              className="flex-1 outline-none px-3 py-2 text-sm"
              placeholder="Search for products, e.g. organic tee"
              aria-label="Search products"
            />
            <button className="btn-premium rounded-full px-4 py-2 hidden md:inline-flex">Search</button>
          </form>
        </div>

        {/* RIGHT GROUP: nav + cart + auth (always grouped together, aligned to right) */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" end className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>About</NavLink>
            <NavLink to="/collections" className={({isActive})=>isActive? 'text-slate-900 font-medium':'text-slate-500 hover:text-slate-900 transition'}>Collections</NavLink>
          </nav>

          {/* Cart */}
          <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="hidden md:inline text-sm">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">
                {count}
              </span>
            )}
          </Link>

          {/* Auth area: when not logged in show Sign in as part of this group.
              when logged in show avatar + dropdown (anchored to this group). */}
          {user ? (
            <div className="relative" ref={wrapperRef}>
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
                  <div className="text-sm text-slate-700 truncate max-w-[160px]">
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

              {/* Dropdown menu, anchored under avatar; small animation */}
              {/* Dropdown menu, anchored under avatar; small animation */}
<div
  role="menu"
  aria-label="User menu"
  className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 transform origin-top-right transition duration-180 ease-out
    ${menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-95 invisible'}`}
  style={{ top: 'calc(100% + 8px)' }}
>
  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Profile</Link>
  <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Orders</Link>

  {/* NEW: Wishlist link */}
  <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50" role="menuitem">Wishlist</Link>

  <div className="border-t my-1" />
  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">Logout</button>
</div>

            </div>
          ) : (
            <Link to="/login" className="text-sm text-slate-700 hover:text-slate-900 whitespace-nowrap">Sign in</Link>
          )}
        </div>

        {/* Mobile controls (kept separate so small screens stay compact) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            aria-label="Open search and menu"
            onClick={() => setOpen(prev => !prev)}
            className="p-2 rounded-md text-slate-700 hover:bg-gray-100"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link to="/cart" className="relative p-2 rounded-md text-slate-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l2 6M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {count > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs font-semibold bg-amber-500 text-white rounded-full w-5 h-5 shadow">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile panel (slide down) */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 transition-maxh duration-300 overflow-hidden ${open ? 'max-h-[1000px] py-4' : 'max-h-0'}`}
        aria-hidden={!open}
      >
        <div className="container mx-auto px-4">
          <form className="flex items-center gap-2 mb-3">
            <input
              className="flex-1 input-soft"
              placeholder="Search for products..."
              aria-label="Search products"
            />
            <button className="btn-premium px-4 py-2 rounded-full">Search</button>
          </form>

          <nav className="flex flex-col gap-2">
            <NavLink to="/" end onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'text-slate-900 font-medium px-3 py-2 rounded':'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>Home</NavLink>
            <NavLink to="/collections" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'text-slate-900 font-medium px-3 py-2 rounded':'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>Collections</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'text-slate-900 font-medium px-3 py-2 rounded':'text-slate-700 px-3 py-2 rounded hover:bg-gray-50'}>About</NavLink>
            <NavLink to="/sustainability" onClick={()=>setOpen(false)} className={({isActive})=>isActive? 'text-slate-900 font-medium px-3 py-2 rounded':'text-slate-700 px-3 py-2 rounded hover:bg_gray-50'}>Sustainability</NavLink>

            {user ? (
              <>
                <Link to="/profile" onClick={()=>setOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Account</Link>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="text-left px-3 py-2 rounded hover:bg-gray-50 text-slate-700">Logout</button>
              </>
            ) : (
              <NavLink to="/login" onClick={()=>setOpen(false)} className="text-slate-700 px-3 py-2 rounded hover:bg-gray-50">Sign in</NavLink>
            )}
          </nav>

          <div className="mt-4 flex gap-2">
            <Link to="/offers" onClick={()=>setOpen(false)} className="flex-1 px-4 py-2 rounded-md bg-amber-400 text-slate-900 text-center font-semibold">Offers</Link>
            <Link to="/store-locator" onClick={()=>setOpen(false)} className="flex-1 px-4 py-2 rounded-md border text-center">Store</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
