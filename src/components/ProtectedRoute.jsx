// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

/**
 * Module-level set to remember which locations we've already shown
 * a "please login" toast for. Module state persists across StrictMode
 * remounts (so it prevents duplicates in dev).
 */
const notifiedPaths = new Set()

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // only show when auth finished loading and user is not present
    if (!loading && !user) {
      const key = location.pathname || location.key || window.location.pathname
      if (!notifiedPaths.has(key)) {
        toast.error('⚠️ Please login to view your cart.')
        notifiedPaths.add(key)
      }
    }
    // we intentionally do NOT clear the set here so repeated navigations
    // to the same protected route in a session won't spam the user.
  }, [user, loading, location])

  if (loading) return null // or spinner

  if (!user) {
    // redirect to login; login page can read location.state.from and return
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
