import React, { useEffect, useRef, useState } from 'react'

/**
 * Carousel with reliable autoplay (default 3s).
 * Props:
 *  - slides: array of { id, title?, subtitle?, image }
 *  - interval: number (ms) between auto slides (default 3000)
 *  - height: tailwind height classes or inline style (optional)
 */
export default function Carousel({ slides = [], interval = 3000, height = 'h-52 sm:h-64 md:h-72' }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)
  const containerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchDeltaX = useRef(0)

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // start autoplay (clear previous then set)
  function startAutoplay() {
    stopAutoplay()
    if (reducedMotion) return
    if (!slides || slides.length <= 1) return
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, Math.max(300, interval))
  }

  function stopAutoplay() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function pauseAutoplay() {
    pausedRef.current = true
    stopAutoplay()
  }

  function resumeAutoplay() {
    pausedRef.current = false
    // restart only if tab visible
    if (!document.hidden) startAutoplay()
  }

  // ensure autoplay starts on mount and when slides/interval change
  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
    // deliberately depend on slides and interval
  }, [slides, interval, reducedMotion])

  // pause when tab hidden, resume when visible (if not paused by hover)
  useEffect(() => {
    function onVisibility() {
      if (document.hidden) stopAutoplay()
      else if (!pausedRef.current) startAutoplay()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [slides, interval, reducedMotion])

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') {
        pauseAutoplay()
        setIndex(prev => (prev - 1 + slides.length) % slides.length)
      } else if (e.key === 'ArrowRight') {
        pauseAutoplay()
        setIndex(prev => (prev + 1) % slides.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length])

  // navigation helpers
  function goTo(i) {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }
  function prev() { goTo(index - 1) }
  function next() { goTo(index + 1) }

  // touch handlers for mobile swipe
  function handleTouchStart(e) {
    pauseAutoplay()
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
    touchDeltaX.current = 0
  }
  function handleTouchMove(e) {
    if (touchStartX.current == null) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    touchDeltaX.current = x - touchStartX.current
  }
  function handleTouchEnd() {
    const delta = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0
    const threshold = 50
    if (delta > threshold) prev()
    else if (delta < -threshold) next()
    // resume after small delay
    setTimeout(() => resumeAutoplay(), 300)
  }

  if (!slides || slides.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-white shadow-soft ${height}`}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage carousel"
    >
      {/* Slides */}
      <div className="absolute inset-0 flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={s.id ?? i} className="w-full flex-shrink-0 flex items-center justify-center" aria-hidden={i !== index}>
            <div className="w-full h-full bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url(${s.image})` }}>
              <div className="bg-white/40 backdrop-blur-sm rounded p-4 m-6 max-w-xl text-center">
                {s.title && <h3 className="text-xl font-semibold">{s.title}</h3>}
                {s.subtitle && <p className="text-sm text-muted mt-1">{s.subtitle}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center shadow focus:outline-none"
            onClick={() => { pauseAutoplay(); prev(); }}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center shadow focus:outline-none"
            onClick={() => { pauseAutoplay(); next(); }}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full focus:outline-none ${i === index ? 'bg-accent' : 'bg-white/80 border'}`}
                onClick={() => { pauseAutoplay(); goTo(i); }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}

      {/* Screen reader announce */}
      <div className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${slides.length}${slides[index]?.title ? `: ${slides[index].title}` : ''}`}
      </div>
    </div>
  )
}
