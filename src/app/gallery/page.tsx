'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CATEGORIES = ['All', 'Oil Painting', 'Watercolor', 'Resin Art', 'Drawing', 'Fine Art']

type Category = typeof CATEGORIES[number]

interface GalleryItem {
  id: number
  title: string
  medium: Category
  bg: string
  size: 'normal' | 'wide' | 'tall'
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id:  1, title: 'Morning Light',         medium: 'Oil Painting', bg: 'radial-gradient(ellipse 65% 55% at 40% 40%,#C4622D99 0%,transparent 60%),radial-gradient(ellipse 50% 65% at 65% 55%,#D4A84388 0%,transparent 55%),linear-gradient(135deg,#2a1810,#3d2518,#1a1005)', size: 'wide' },
  { id:  2, title: 'Autumn Reflection',     medium: 'Oil Painting', bg: 'radial-gradient(ellipse 60% 70% at 45% 35%,#C4622D77 0%,transparent 60%),radial-gradient(ellipse 70% 50% at 60% 65%,#7A9E7E55 0%,transparent 55%),linear-gradient(160deg,#1a0e08,#2d1a10,#0f0805)', size: 'normal' },
  { id:  3, title: 'Ocean Dreams',          medium: 'Resin Art',    bg: 'radial-gradient(ellipse 80% 60% at 30% 50%,#1E6B8899 0%,transparent 55%),radial-gradient(ellipse 60% 80% at 70% 40%,#D4A84366 0%,transparent 50%),linear-gradient(180deg,#051822,#0d2d3d,#061520)', size: 'tall' },
  { id:  4, title: 'Still Waters',          medium: 'Watercolor',   bg: 'radial-gradient(ellipse 60% 80% at 50% 30%,#7A9E7E99 0%,transparent 55%),radial-gradient(ellipse 55% 50% at 30% 70%,#D4A84377 0%,transparent 50%),linear-gradient(160deg,#0e2018,#1a3020,#0a1a0f)', size: 'normal' },
  { id:  5, title: 'Figure Study',          medium: 'Drawing',      bg: 'radial-gradient(ellipse 60% 60% at 50% 50%,#2a2a2a 0%,#1a1a1a 100%),repeating-linear-gradient(45deg,rgba(212,168,67,0.06) 0px,rgba(212,168,67,0.06) 1px,transparent 1px,transparent 10px)', size: 'normal' },
  { id:  6, title: 'Persian Bloom',         medium: 'Fine Art',     bg: 'radial-gradient(ellipse 55% 70% at 45% 35%,#C4622D66 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 60% 65%,#D4A84388 0%,transparent 55%),linear-gradient(120deg,#1a0f08,#2d1a10,#150a05)', size: 'wide' },
  { id:  7, title: 'Geode Slice',           medium: 'Resin Art',    bg: 'radial-gradient(ellipse 55% 55% at 50% 50%,#9B5DE577 0%,transparent 50%),radial-gradient(ellipse 40% 60% at 70% 30%,#D4A84388 0%,transparent 50%),radial-gradient(ellipse 50% 40% at 25% 70%,#C4622D66 0%,transparent 50%),linear-gradient(135deg,#150d1f,#1f1030,#0d0818)', size: 'normal' },
  { id:  8, title: 'Cypress Grove',         medium: 'Oil Painting', bg: 'radial-gradient(ellipse 70% 60% at 20% 60%,#7A9E7E77 0%,transparent 55%),radial-gradient(ellipse 80% 50% at 75% 30%,#D4A84355 0%,transparent 55%),linear-gradient(90deg,#0d1f0f,#1a3a20,#0a1510)', size: 'normal' },
  { id:  9, title: 'Sunset on Canvas',      medium: 'Watercolor',   bg: 'radial-gradient(ellipse 80% 60% at 50% 40%,#D4A84355 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 20% 70%,#C4622D66 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 80% 60%,#7A9E7E55 0%,transparent 55%),linear-gradient(110deg,#1a100a,#2a1a10,#0f0f0f)', size: 'tall' },
  { id: 10, title: 'Portrait in Blue',      medium: 'Fine Art',     bg: 'radial-gradient(ellipse 65% 50% at 35% 45%,#1E4E8877 0%,transparent 55%),radial-gradient(ellipse 55% 65% at 65% 55%,#D4A84366 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 50% 20%,#7A9E7E44 0%,transparent 50%),linear-gradient(150deg,#0a0d1a,#0f1520,#080d15)', size: 'normal' },
  { id: 11, title: 'Abstract Motion',       medium: 'Fine Art',     bg: 'radial-gradient(ellipse 65% 50% at 35% 45%,#C4622D77 0%,transparent 55%),radial-gradient(ellipse 55% 65% at 65% 55%,#7A9E7E66 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 50% 20%,#D4A84355 0%,transparent 50%),linear-gradient(150deg,#1a0d0a,#200f15,#0d0d0d)', size: 'wide' },
  { id: 12, title: 'Sketches of Tehran',    medium: 'Drawing',      bg: 'radial-gradient(ellipse 60% 60% at 50% 50%,#222 0%,#111 100%),repeating-linear-gradient(135deg,rgba(250,247,242,0.04) 0px,rgba(250,247,242,0.04) 1px,transparent 1px,transparent 12px)', size: 'normal' },
  { id: 13, title: 'Tidal Flow',            medium: 'Resin Art',    bg: 'radial-gradient(ellipse 70% 60% at 40% 40%,#1E6B8899 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 65% 55%,#7A9E7E88 0%,transparent 55%),linear-gradient(135deg,#071820,#0d2d3d,#051018)', size: 'normal' },
  { id: 14, title: 'Poppies in Spring',     medium: 'Watercolor',   bg: 'radial-gradient(ellipse 60% 75% at 40% 35%,#C4622D66 0%,transparent 60%),radial-gradient(ellipse 70% 55% at 60% 60%,#7A9E7E55 0%,transparent 55%),linear-gradient(160deg,#1a0e08,#2d1a20,#0f0808)', size: 'normal' },
  { id: 15, title: 'Golden Hour',           medium: 'Oil Painting', bg: 'radial-gradient(ellipse 70% 60% at 45% 40%,#D4A84388 0%,transparent 55%),radial-gradient(ellipse 60% 70% at 60% 55%,#C4622D77 0%,transparent 60%),linear-gradient(135deg,#1a1005,#2d1a08,#100a03)', size: 'tall' },
  { id: 16, title: 'Zen Garden',            medium: 'Fine Art',     bg: 'radial-gradient(ellipse 55% 65% at 40% 45%,#7A9E7E77 0%,transparent 60%),radial-gradient(ellipse 65% 55% at 65% 55%,#D4A84355 0%,transparent 55%),linear-gradient(120deg,#0d1a10,#1a2d1a,#080f08)', size: 'normal' },
  { id: 17, title: 'Urban Texture',         medium: 'Drawing',      bg: 'radial-gradient(ellipse 60% 60% at 50% 50%,#1C1C1C 0%,#111 100%),repeating-linear-gradient(90deg,rgba(212,168,67,0.04) 0px,rgba(212,168,67,0.04) 1px,transparent 1px,transparent 20px)', size: 'wide' },
  { id: 18, title: 'La Vie en Rose',        medium: 'Oil Painting', bg: 'radial-gradient(ellipse 65% 55% at 42% 40%,#C4622D88 0%,transparent 55%),radial-gradient(ellipse 50% 70% at 62% 58%,#D4A84388 0%,transparent 55%),linear-gradient(150deg,#1f0d12,#2d1018,#150a0c)', size: 'normal' },
]

interface LightboxProps {
  item: GalleryItem
  onClose: () => void
}

function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="w-full aspect-[4/5]"
          style={{ background: item.bg }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="font-serif text-2xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-[#D4A843]">{item.medium}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.medium === activeCategory)

  useGSAP(() => {
    gsap.from('.gallery-item', {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-masonry', start: 'top 85%' },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#1C1C1C] pt-24">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(196,98,45,0.12) 0%,transparent 70%)' }} />
        <p className="text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Portfolio</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#FAF7F2] mb-5">
          The Gallery
        </h1>
        <p className="text-[#FAF7F2]/55 text-lg max-w-xl mx-auto">
          A curated collection of original artworks spanning oil painting, watercolor, resin art, and more.
        </p>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-[72px] z-30 bg-[#1C1C1C]/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="mx-auto max-w-7xl flex gap-2 overflow-x-auto scrollbar-hidden">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#C4622D] text-white'
                  : 'bg-white/5 text-[#FAF7F2]/60 hover:bg-white/10 hover:text-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry gallery */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <motion.div
            layout
            className="gallery-masonry columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
          >
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-item break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: item.size === 'wide' ? '16/9' : item.size === 'tall' ? '3/4' : '1' }}
                  onClick={() => setLightboxItem(item)}
                >
                  <div className="w-full h-full min-h-[200px]" style={{ background: item.bg }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-4">
                    <p className="text-white font-serif font-bold text-lg text-center">{item.title}</p>
                    <p className="text-[#D4A843] text-sm mt-1">{item.medium}</p>
                    <span className="mt-3 text-white/70 text-xs border border-white/30 rounded-full px-3 py-1">View</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <p className="text-center text-[#FAF7F2]/40 py-20">No works in this category yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-pad border-t border-white/10 text-center">
        <p className="text-[#D4A843] uppercase tracking-[0.25em] text-xs font-semibold mb-3">Commission a Piece</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#FAF7F2] mb-5">
          Own an Original Artwork
        </h2>
        <p className="text-[#FAF7F2]/55 max-w-lg mx-auto mb-8">
          Interested in commissioning a custom painting or purchasing an existing piece? Get in touch with us.
        </p>
        <Link href="/contact" className="btn-terra">Contact the Studio</Link>
      </section>
    </div>
  )
}
