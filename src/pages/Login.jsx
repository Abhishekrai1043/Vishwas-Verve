// src/pages/Login.jsx
import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login({ email, password })
      // success toast
      toast.success(`🎉 Welcome back${user?.name ? `, ${user.name}` : ''}!`)
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err?.message || 'Login failed'
      setError(msg)
      toast.error(`❌ ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white font-bold text-xl shadow-md">VV</div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Sign in</h2>
          <p className="text-sm text-slate-500">Enter your credentials to continue</p>
        </div>

        {error && <div className="text-sm text-red-500 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-amber-500 focus:ring-amber-400" />
              Remember me
            </label>
            <Link to="/forgot" className="text-amber-600 hover:underline">Forgot?</Link>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 text-white font-medium shadow hover:brightness-110 transition">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account? <Link to="/register" className="text-amber-600 hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  )
}
