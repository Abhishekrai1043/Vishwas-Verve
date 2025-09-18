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
    if (!document.hidden) startAutoplay()
  }

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [slides, interval, reducedMotion])

  useEffect(() => {
    function onVisibility() {
      if (document.hidden) stopAutoplay()
      else if (!pausedRef.current) startAutoplay()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [slides, interval, reducedMotion])

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

  function goTo(i) {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }
  function prev() { goTo(index - 1) }
  function next() { goTo(index + 1) }

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
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={s.id ?? i} className="w-full flex-shrink-0 relative flex items-center justify-center" aria-hidden={i !== index}>
            {/* Blurred background */}
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              onError={(e) => { e.currentTarget.src = '/Images/fallback.png' }}
              className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-40"
            />
            {/* Foreground product image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={s.image}
                alt={s.title || `Slide ${i + 1}`}
                onError={(e) => { e.currentTarget.src = '/Images/fallback.png' }}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {/* Optional caption */}
            {(s.title || s.subtitle) && (
              <div className="absolute left-6 bottom-6 bg-white/70 backdrop-blur-sm rounded-lg p-4 max-w-md text-center">
                {s.title && <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>}
                {s.subtitle && <p className="text-sm text-slate-700 mt-1">{s.subtitle}</p>}
              </div>
            )}
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

      <div className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${slides.length}${slides[index]?.title ? `: ${slides[index].title}` : ''}`}
      </div>
    </div>
  )
}
