// src/pages/Contact.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Contact() {
  const { user } = useAuth ? useAuth() : { user: null }  // defensive
  const navigate = useNavigate()
  const location = useLocation()

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function promptLogin() {
    toast.error('Please sign in to send feedback.')
    navigate('/login', { state: { from: location }, replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return promptLogin()
    if (!message.trim()) return toast.error('Please enter your message.')
    setLoading(true)

    // fallback behavior: open mail client
    try {
      const mailSubject = encodeURIComponent(subject || 'Feedback from Visvas Verve')
      const mailBody = encodeURIComponent(
        `Name: ${user.name || ''}\nEmail: ${user.email || ''}\n\nMessage:\n${message}`
      )
      window.location.href = `mailto:hello@yourdomain.com?subject=${mailSubject}&body=${mailBody}`
      toast.success('Opening your mail client...')
      setSubject('')
      setMessage('')
    } catch (err) {
      console.error(err)
      toast.error('Could not open mail client.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="bg-emerald-50 p-4 rounded">
          <h2 className="font-semibold mb-2">Reach out</h2>
          <p className="text-sm text-slate-600 mb-3">Instagram: <a href="https://instagram.com/vishwasverve" target="_blank" rel="noreferrer" className="underline">@vishwasverve</a></p>
          <p className="text-sm text-slate-600 mb-3">WhatsApp: <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="underline">+91 99999 99999</a></p>
          <p className="text-sm text-slate-600">Email: <a href="mailto:hello@yourdomain.com" className="underline">hello@yourdomain.com</a></p>
        </aside>

        <div className="md:col-span-2 bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">Send feedback</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Subject (optional)"
            />
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={6}
              className="w-full border px-3 py-2 rounded"
              placeholder="Your message..."
              required
            />
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-500 text-white rounded">
                {loading ? 'Sending...' : 'Send message'}
              </button>
              <button type="button" onClick={() => { setSubject(''); setMessage('') }} className="px-3 py-2 border rounded">Clear</button>
              {!user && <button type="button" onClick={promptLogin} className="ml-auto text-sm underline">Sign in to send</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
