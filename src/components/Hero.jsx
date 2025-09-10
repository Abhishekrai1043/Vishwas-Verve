import React from 'react'

export default function Hero({
  title = "Visvas Verve",
  subtitle = "Sustainable clothes & eco-carrybags",
  bgImage
}) {
  const style = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#0f172a' }

  return (
    <section className="mb-10">
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-soft"
        style={style}
        role="img"
        aria-label={title}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl bg-white/5 backdrop-blur-sm rounded-xl p-8 sm:p-10 animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white relative">
              {title}
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-amber-400 rounded-full"></span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-xl">
              {subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 btn-premium shadow hover:brightness-95 transition"
              >
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white/90 hover:bg-white/5 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
}
