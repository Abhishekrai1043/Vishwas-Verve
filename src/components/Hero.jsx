import React from "react";

/**
 * Hero component
 * - bgImage: optional - either an imported image (e.g. banner) or a public path string ("/Images/banner.png")
 * - title, subtitle: text
 *
 * Notes:
 * - If you pass an image from `src/` import it in the page and pass as bgImage={banner}
 * - Or put image in public/Images and pass bgImage="/Images/banner.png"
 *
 * Styling uses Tailwind. Adjust color tokens (amber/green) to your theme if needed.
 */
export default function Hero({
  title = "Visvas Verve",
  subtitle = "Sustainable clothes & eco-carrybags",
  bgImage = null, // pass image here later
}) {
  const bgStyle = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: "#f6fbf6" }

  return (
    <section aria-label="Hero" className="mb-10">
      <div
        className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] rounded-lg overflow-hidden"
        style={bgStyle}
      >
        {/* blurred background layer - this makes the banner slightly blurred */}
        <div className="absolute inset-0">
          {/* use backdrop blur if supported; fallback vignette */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
        </div>

        {/* translucent left overlay card */}
        <div className="relative z-10 container mx-auto h-full px-4 flex items-center">
          <div className="w-full max-w-5xl flex">
            {/* LEFT CARD (content) */}
            <div className="w-full md:w-7/12 lg:w-6/12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/60">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    Eco collection
                  </span>
                  <span className="text-xs text-slate-600">Sustainably sourced • Quality assured</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {title}
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-lg">
                  {subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-md hover:brightness-95 transition"
                    aria-label="Shop now"
                  >
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 transition"
                    aria-label="Learn more"
                  >
                    Learn More
                  </a>

                  <div className="text-xs text-slate-600 ml-1">Free shipping over ₹999 • 30-day returns</div>
                </div>
              </div>
            </div>

            {/* right empty area - gives the card left alignment and visual breathing room */}
            <div className="hidden md:block md:w-5/12 lg:w-6/12" />
          </div>
        </div>

        {/* bottom subtle fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
