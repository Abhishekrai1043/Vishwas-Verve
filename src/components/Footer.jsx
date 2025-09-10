import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-900 font-bold shadow">
              VV
            </div>
            <span className="font-semibold text-lg text-white">Visvas Verve</span>
          </div>
          <p className="text-sm text-gray-400">
            Sustainable fashion and eco-friendly carrybags — style with a conscience.
          </p>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
            <li><Link to="/collections" className="hover:text-amber-400 transition">Collections</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link to="/cart" className="hover:text-amber-400 transition">Cart</Link></li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-amber-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-amber-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 4a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.52 17.52 2 12 2S2 6.52 2 12.07c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v6.99C18.34 21.19 22 17.06 22 12.07z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.35 8.53 8.53 0 01-2.7 1.03 4.22 4.22 0 00-7.24 3.85 12 12 0 01-8.7-4.41 4.22 4.22 0 001.3 5.63 4.18 4.18 0 01-1.91-.53v.05a4.22 4.22 0 003.38 4.13 4.2 4.2 0 01-1.9.07 4.22 4.22 0 003.94 2.92A8.48 8.48 0 012 19.54a12 12 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.3 8.3 0 0022.46 6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-slate-700 mt-8">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>© {new Date().getFullYear()} Visvas Verve. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition">Terms</a>
            <a href="#" className="hover:text-amber-400 transition">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
