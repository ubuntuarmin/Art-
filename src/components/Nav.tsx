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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1C1C1C]/95 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold tracking-wide text-[#FAF7F2] select-none">
            Beyond the{' '}
            <span className="text-[#C4622D] italic">Canvas</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  pathname === href
                    ? 'text-[#D4A843]'
                    : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/classes"
              className="btn-terra text-sm px-5 py-2.5"
            >
              Book Now
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-[#FAF7F2]"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#1C1C1C] flex flex-col px-8 py-12 gap-2 md:hidden"
            >
              <p className="font-serif text-[#D4A843] text-lg mb-4">Menu</p>
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={href}
                    className={`block py-3 text-lg font-medium border-b border-white/10 ${
                      pathname === href ? 'text-[#D4A843]' : 'text-[#FAF7F2]/80'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Link href="/classes" className="btn-terra w-full justify-center text-center">
                  Book Now
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
