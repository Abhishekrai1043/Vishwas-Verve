// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = authService.loadPersistedAuth()
    if (saved) setUser(saved)
    setLoading(false)
  }, [])

  async function login({ email, password }) {
    // synchronous demo service used
    const found = authService.verifyCredentials({ email, password })
    if (!found) {
      throw new Error('Invalid email or password')
    }
    setUser(found)
    authService.persistAuth(found)
    return found
  }

  async function register({ name, email, password }) {
    // synchronous create
    const created = authService.createUser({ name, email, password })
    setUser(created)
    authService.persistAuth(created)
    return created
  }

  function logout() {
    setUser(null)
    authService.clearAuth()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
