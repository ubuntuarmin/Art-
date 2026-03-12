import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/about',       label: 'About Farnaz' },
  { href: '/classes',     label: 'Classes & Workshops' },
  { href: '/contact',     label: 'Contact Us' },
]

const SERVICES = [
  'Oil Painting Classes',
  'Watercolor Workshops',
  'Resin Art & Craft',
  'Private Events',
  'Art Camps',
  'Birthday Parties',
]

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-[#FAF7F2]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <h2 className="font-serif text-2xl font-bold mb-1">
            Beyond the <span className="text-[#C4622D] italic">Canvas</span>
          </h2>
          <p className="text-[#D4A843] text-sm font-medium mb-4">Art Studio by Farnaz Amin</p>
          <p className="text-[#FAF7F2]/60 text-sm leading-relaxed">
            A luxury creative space where all ages discover the joy of art — from oil painting
            to resin craft and beyond.
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-[#D4A843]/30 flex items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-[#1C1C1C] transition-all duration-300"
            >
              {/* Instagram icon SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-[#D4A843]/30 flex items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-[#1C1C1C] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {QUICK_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[#FAF7F2]/60 hover:text-[#FAF7F2] text-sm transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
            Our Services
          </h3>
          <ul className="space-y-3">
            {SERVICES.map(s => (
              <li key={s} className="text-[#FAF7F2]/60 text-sm">{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
            Contact Us
          </h3>
          <address className="not-italic space-y-3 text-sm text-[#FAF7F2]/60">
            <p>📍 Los Angeles, California</p>
            <p>
              📞{' '}
              <a href="tel:+13101234567" className="hover:text-[#FAF7F2] transition-colors">
                (310) 123‑4567
              </a>
            </p>
            <p>
              ✉️{' '}
              <a href="mailto:hello@beyondthecanvas.art" className="hover:text-[#FAF7F2] transition-colors">
                hello@beyondthecanvas.art
              </a>
            </p>
            <div className="pt-2 border-t border-white/10">
              <p className="font-medium text-[#FAF7F2]/80 mb-1">Studio Hours</p>
              <p>Mon – Fri: 10am – 7pm</p>
              <p>Sat – Sun: 10am – 5pm</p>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FAF7F2]/40">
          <span>© {new Date().getFullYear()} Beyond the Canvas Art Studio. All rights reserved.</span>
          <span>Designed with ♥ for art lovers everywhere</span>
        </div>
      </div>
    </footer>
  )
}
