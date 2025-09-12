// src/pages/Contact.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const CONTACT_EMAIL = 'vishwasverve@gmail.com'   // <- replace with your email
const WHATSAPP_NUMBER = '916393423660'         // <- replace with country+number (no +)
const INSTAGRAM_HANDLE = 'https://www.instagram.com/vishwasverve?igsh=MTdzNDloeW1rYTNrNQ=='          // <- replace with your Instagram handle

export default function Contact() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // If you have a server endpoint to accept contact messages (recommended),
  // set REACT_APP_CONTACT_API in your .env to something like:
  // REACT_APP_CONTACT_API=https://api.yoursite.com/contact
  // The code below will POST to that endpoint when present.
  const CONTACT_API = process.env.REACT_APP_CONTACT_API || ''

  function promptLogin() {
    toast.error('Please sign in to send feedback.')
    navigate('/login', { state: { from: location }, replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return promptLogin()
    if (!message.trim()) return toast.error('Please enter your message.')

    setLoading(true)

    try {
      if (CONTACT_API) {
        // POST to backend API (recommended). Backend should send email (via SendGrid/Mailgun/nodemailer).
        const payload = {
          name: user.name || '',
          email: user.email || '',
          subject: subject || 'Feedback from website',
          message,
          meta: {
            userId: user.id || null,
            path: location.pathname
          }
        }

        const res = await fetch(CONTACT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const data = await res.json().catch(()=>({}))
          throw new Error(data.message || 'Failed to send message')
        }

        toast.success('Thanks — your message was sent!')
        setSubject('')
        setMessage('')
      } else {
        // Fallback: open user's email client with prefilled body (mailto).
        // Note: mailto depends on client and doesn't actually send automatically.
        const mailSubject = encodeURIComponent(subject || 'Feedback from Visvas Verve')
        const mailBody = encodeURIComponent(
          `Name: ${user.name || ''}\nEmail: ${user.email || ''}\n\nMessage:\n${message}`
        )
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
        toast.success('Opening your mail client...')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Could not send message — try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: contact details */}
        <aside className="bg-gradient-to-b from-emerald-50 to-white rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold mb-2">Get in touch</h2>
          <p className="text-sm text-slate-600 mb-4">We love hearing from you — whether it's feedback, a partnership or a question about our eco products.</p>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-500">Email</div>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-emerald-700 hover:underline">{CONTACT_EMAIL}</a>
            </div>

            <div>
              <div className="text-xs text-slate-500">WhatsApp</div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-700 hover:underline"
              >
                +{WHATSAPP_NUMBER}
              </a>
            </div>

            <div>
              <div className="text-xs text-slate-500">Instagram</div>
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-700 hover:underline"
              >
                @{INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Or write to us using the form — you must be signed in to send feedback directly to our email.
          </div>
        </aside>

        {/* Right column (form) */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-soft border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send feedback</h3>
              <div className="text-sm text-slate-500">
                Signed in as: <span className="font-medium">{user ? user.email || user.name : 'Guest'}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Subject (optional)</label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-300"
                  placeholder="Short subject (e.g. Product feedback)"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">Your message</label>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={6}
                  className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-300"
                  placeholder="Tell us what you liked, what we can improve, or any questions you have..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-white font-medium shadow hover:brightness-95 transition"
                >
                  {loading ? 'Sending...' : 'Send message'}
                </button>

                <button
                  type="button"
                  onClick={() => { setSubject(''); setMessage(''); }}
                  className="px-3 py-2 rounded-md border text-sm"
                >
                  Clear
                </button>

                {!user && (
                  <button
                    type="button"
                    onClick={() => navigate('/login', { state: { from: location } })}
                    className="ml-auto text-sm text-emerald-700 underline"
                  >
                    Sign in to send
                  </button>
                )}
              </div>
            </form>

            <div className="mt-4 text-xs text-slate-500">
              Note: For production email delivery, add a backend endpoint that sends email (SendGrid, Mailgun, or SMTP).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
