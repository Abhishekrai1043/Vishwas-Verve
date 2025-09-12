// src/services/authService.js
// NOTE: Demo-only. Replace with secure server-side auth in production.

const USERS_KEY = 'vv_users'
const AUTH_KEY = 'vv_auth_user'

function _loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function _saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list))
}

export function findUserByEmail(email) {
  const users = _loadUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function createUser({ name, email, password }) {
  const users = _loadUsers()
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already registered')
  }
  // demo "hash" (not secure) — replace with proper hashing on server
  const hashed = btoa(password)
  const user = { id: Date.now().toString(), name, email, password: hashed }
  users.push(user)
  _saveUsers(users)
  // return public user (no password)
  const { password: p, ...publicUser } = user
  return publicUser
}

export function verifyCredentials({ email, password }) {
  const user = findUserByEmail(email)
  if (!user) return null
  const hashed = btoa(password)
  if (user.password === hashed) {
    const { password: p, ...publicUser } = user
    return publicUser
  }
  return null
}

export function persistAuth(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY)
}

export function loadPersistedAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
