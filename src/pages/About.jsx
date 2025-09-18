// src/pages/About.jsx
import React from "react"
import { Link } from "react-router-dom"

const team = [
  { name: "Pranjal Singh", role: "Founder & CEO", image: "/Images/team/pranjal.jpg" },
  { name: "Arnav Tiwari", role: "Co-Founder", image: "/Images/team/arnav.jpg" },
  { name: "Harshal", role: "Operations Manager", image: "/Images/team/harshal.jpg" },
  { name: "Roshini", role: "Design & Engagement", image: "/Images/team/roshini.jpg" },
  { name: "Ananya", role: "Design & Engagement", image: "/Images/team/ananya.jpg" },
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Top intro */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            About <span className="text-amber-500">Vishwas Verve</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl">
            We design and craft premium, trend-forward clothing and eco carrybags using responsibly sourced fabrics.
            Our products are engineered to last — reducing single-use waste and offering a sustainable alternative to
            fast fashion without compromising on style.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/collections" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold shadow hover:scale-[1.01] transition">
              Shop Collection
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {/* big hero-style image - replace with an eco-fabric banner */}
            <img src="public/Images/banner_4.png" alt="Sustainable fabrics" className="w-full h-64 md:h-96 object-cover" />
          </div>

          {/* small badge */}
          <div className="absolute -top-3 left-3 bg-white/90 px-3 py-1 rounded-full shadow text-sm font-medium text-slate-800">
            Ethically sourced • Premium feel
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-amber-50 rounded-2xl p-6 shadow-sm transform hover:-translate-y-1 transition">
          <h3 className="font-semibold text-lg text-amber-700">Sustainable Materials</h3>
          <p className="text-slate-600 mt-2">Organic cotton, recycled polyester and low-water manufacturing for minimal environmental impact.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm transform hover:-translate-y-1 transition">
          <h3 className="font-semibold text-lg text-slate-900">Designed to Last</h3>
          <p className="text-slate-600 mt-2">Classic silhouettes + robust stitching ensure garments that survive seasons and trends.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm transform hover:-translate-y-1 transition">
          <h3 className="font-semibold text-lg text-slate-900">Fair & Transparent</h3>
          <p className="text-slate-600 mt-2">We partner with small-scale, audited makers and pay fair wages across our supply chain.</p>
        </div>
      </section>

      {/* Our Process / Timeline */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Our Process</h2>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* vertical line on large screens */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 bottom-0 w-px bg-slate-200" />

          {[
            { step: "1", title: "Sourcing", text: "We source certified organic & recycled textiles from trusted suppliers." },
            { step: "2", title: "Design", text: "Our design team creates timeless, comfortable silhouettes with reduced waste patterns." },
            { step: "3", title: "Production", text: "Small-batch production, quality control and fair labor practices at every step." },
            { step: "4", title: "Recycle & Return", text: "Repair, recycle or resell — programs to extend each product's life." },
          ].map((s, i) => (
            <div key={i} className="md:pr-8 md:pl-8">
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 font-bold shadow-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-slate-600 mt-1">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="bg-gradient-to-r from-white to-amber-50 rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold text-slate-900">Our Impact</h2>
            <p className="text-slate-600 mt-2">Numbers that reflect our commitment — and goals we keep improving every year.</p>
          </div>

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <div className="text-3xl font-extrabold text-amber-500">1.2K+</div>
              <div className="text-sm text-slate-600 mt-1">Products saved from landfill</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <div className="text-3xl font-extrabold text-amber-500">95%</div>
              <div className="text-sm text-slate-600 mt-1">Sustainably sourced materials</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <div className="text-3xl font-extrabold text-amber-500">30%</div>
              <div className="text-sm text-slate-600 mt-1">Lower water use vs conventional</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — larger cards, responsive */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8 text-slate-900">Meet the Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-shadow shadow-sm"
            >
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{m.role}</p>
              </div>

              <div className="mt-4 flex gap-3">
  <a
    href="#"
    aria-label={`${m.name} Instagram`}
    className="transition transform hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/Images/instagram.png"
      alt="Instagram"
      className="w-6 h-6 object-contain"
    />
  </a>

  <a
    href="#"
    aria-label={`${m.name} LinkedIn`}
    className="transition transform hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/Images/linkedin.png"
      alt="LinkedIn"
      className="w-6 h-6 object-contain"
    />
  </a>
</div>

            </div>
          ))}
        </div>
      </section>

      {/* Press & Partners (simple) */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-slate-900">Partners & Mentions</h3>
        <div className="flex flex-wrap items-center gap-6 bg-white rounded-2xl p-6 shadow-sm">
          <img src="/Images/partner1.png" alt="partner" className="h-10 object-contain" />
          <img src="/Images/partner2.png" alt="partner" className="h-10 object-contain" />
          <img src="/Images/partner3.png" alt="partner" className="h-10 object-contain" />
          <div className="text-slate-600 text-sm">Featured in sustainable fashion roundups and local press.</div>
        </div>
      </section>

      {/* Sellers CTA + Newsletter */}
      <section className="bg-slate-50 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Want to sell with us?</h3>
          <p className="text-slate-600 mt-2">We welcome responsible sellers of eco-friendly apparel and accessories. Join our curated marketplace to reach conscious customers.</p>

          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• Fair commission & transparent policies</li>
            <li>• Small-batch friendly onboarding</li>
            <li>• Marketing support & seasonal collaborations</li>
          </ul>

          <Link to="/contact" className="inline-block mt-4 px-5 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold shadow">Become a seller</Link>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Join our newsletter</h4>
          <p className="text-slate-600 text-sm mt-1">Get early access to drops, restocks and sustainability tips.</p>
          <form className="mt-4 flex gap-2">
            <input type="email" placeholder="you@example.com" className="flex-1 px-4 py-2 rounded-lg border focus:outline-none" />
            <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer small note */}
      <section className="text-center text-sm text-slate-500">
        <div>© {new Date().getFullYear()} Vishwas Verve — Style that cares.</div>
      </section>
    </div>
  )
}
