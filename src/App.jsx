import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProtectedRoute from './components/ProtectedRoute'
import Collections from './pages/Collections'
import Contact from './pages/Contact'        // <-- added
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-subtle">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />           {/* <-- contact route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </main>
      <Footer />

      {/* Toast container (shows toasts app-wide) */}
      <Toaster position="top-center" />
    </div>
  )
}
