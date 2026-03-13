'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/about',       label: 'About' },
  { href: '/classes',     label: 'Classes' },
  { href: '/contact',     label: 'Contact' },
]

export default function Nav() {
  const pathname  = usePathname()
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  /* Prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1C1C1C]/95 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-[#1C1C1C]/60 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 sm:px-6 py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#FAF7F2] select-none">
            Beyond the{' '}
            <span className="text-[#C4622D] italic">Canvas</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
                  pathname === href
                    ? 'text-[#D4A843]'
                    : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                }`}
              >
                {label}
                {pathname === href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#D4A843] rounded-full" />
                )}
              </Link>
            ))}
            <Link
              href="/classes"
              className="btn-terra text-sm px-4 py-2 lg:px-5 lg:py-2.5"
            >
              Book Now
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-[#FAF7F2] rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(280px,85vw)] bg-[#1C1C1C] flex flex-col px-6 py-8 md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-8">
                <p className="font-serif text-[#D4A843] text-lg font-semibold">Menu</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:border-white/30 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="2" y1="2" x2="14" y2="14" />
                    <line x1="14" y1="2" x2="2" y2="14" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={href}
                      className={`flex items-center justify-between py-3.5 px-2 text-base font-medium border-b border-white/8 rounded-lg transition-colors ${
                        pathname === href
                          ? 'text-[#D4A843]'
                          : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/5'
                      }`}
                    >
                      {label}
                      {pathname === href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] shrink-0" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <Link href="/classes" className="btn-terra w-full justify-center text-center text-sm">
                  Book a Class
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
