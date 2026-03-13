'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'
import SplineScrollytelling from '@/components/SplineScrollytelling'
import SplitTextReveal from '@/components/SplitTextReveal'
import TiltCard from '@/components/TiltCard'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MARQUEE_ITEMS = [
  'Oil Painting', 'Drawing & Sketching', 'Watercolor', 'Resin Art',
  'Fine Art', 'Art Camps', 'Birthday Parties', 'Private Events',
]

const SERVICES = [
  {
    icon: '🎉',
    title: 'Private Events & Classes',
    desc: 'Tailored one-on-one sessions and intimate group classes for all skill levels, from complete beginners to advanced artists.',
    detail: 'Book a personalized session',
    href: '/contact?subject=General+Inquiry',
  },
  {
    icon: '🎂',
    title: 'Special Party & Meeting',
    desc: 'Transform your celebration into an artistic experience. Birthday parties, corporate team-building, and milestone events.',
    detail: 'Plan your event',
    href: '/contact?subject=Birthday+Party',
  },
  {
    icon: '🖌️',
    title: 'Training Painting & Drawing',
    desc: 'Structured curriculum for oil, acrylic, watercolor, and drawing — from fundamental techniques to advanced composition.',
    detail: 'View class schedule',
    href: '/classes',
  },
  {
    icon: '✨',
    title: 'Resin Art & Craft Workshops',
    desc: 'Explore the stunning world of resin art: ocean pours, geode designs, custom jewelry, and decorative pieces.',
    detail: 'Join a workshop',
    href: `/contact?class=${encodeURIComponent('Resin Art & Craft')}&subject=${encodeURIComponent('Book a Class')}`,
  },
]

const GALLERY_SLOTS = [
  { id: 1, title: 'Oil on Canvas',       medium: 'Oil Painting',  span: 'lg:col-span-2 lg:row-span-2', bg: 'bg-slot-1' },
  { id: 2, title: 'Watercolor Series',   medium: 'Watercolor',    span: 'lg:row-span-2',               bg: 'bg-slot-2' },
  { id: 3, title: 'Resin Ocean Art',     medium: 'Resin Art',     span: 'lg:col-span-2',               bg: 'bg-slot-3' },
  { id: 4, title: 'Drawing & Sketching', medium: 'Drawing',       span: '',                            bg: 'bg-slot-4' },
  { id: 5, title: 'Fine Art Portrait',   medium: 'Fine Art',      span: '',                            bg: 'bg-slot-5' },
  { id: 6, title: 'Acrylic Landscape',   medium: 'Acrylic',       span: 'lg:col-span-2',               bg: 'bg-slot-6' },
  { id: 7, title: 'Resin Geode',         medium: 'Resin Art',     span: '',                            bg: 'bg-slot-7' },
  { id: 8, title: 'Mixed Media',         medium: 'Mixed Media',   span: '',                            bg: 'bg-slot-8' },
  { id: 9, title: 'Studio Collection',   medium: 'Various',       span: 'lg:col-span-2',               bg: 'bg-slot-9' },
]

const TESTIMONIALS = [
  {
    quote: 'Farnaz is an incredible teacher. Her patience and passion transformed my daughter from a shy beginner into a confident young artist. The studio is warm, welcoming, and truly inspiring.',
    name: 'Sarah M.',
    role: 'Parent',
    stars: 5,
  },
  {
    quote: "The studio atmosphere is magical. Farnaz's knowledge of color theory and technique is unmatched. I've learned more in 3 months than I did in years of self-teaching.",
    name: 'James K.',
    role: 'Adult Student',
    stars: 5,
  },
  {
    quote: 'My kids absolutely love the art camps here. They come home every day bursting with excitement to show us what they created.',
    name: 'Maria L.',
    role: 'Parent',
    stars: 5,
  },
]

const slotStyles = `
  .bg-slot-1{background:radial-gradient(ellipse 70% 60% at 40% 40%,#C4622D88 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 65% 55%,#D4A84377 0%,transparent 55%),linear-gradient(135deg,#2a1810,#3d2518,#1a1005);}
  .bg-slot-2{background:radial-gradient(ellipse 60% 80% at 50% 30%,#7A9E7E88 0%,transparent 55%),radial-gradient(ellipse 55% 50% at 30% 70%,#D4A84366 0%,transparent 50%),linear-gradient(160deg,#0e2018,#1a3020,#0a1a0f);}
  .bg-slot-3{background:radial-gradient(ellipse 80% 60% at 30% 50%,#1E6B8888 0%,transparent 55%),radial-gradient(ellipse 60% 80% at 70% 40%,#D4A84355 0%,transparent 50%),linear-gradient(180deg,#051822,#0d2d3d,#061520);}
  .bg-slot-4{background:radial-gradient(ellipse 60% 60% at 50% 50%,#2a2a2a 0%,#1a1a1a 100%),repeating-linear-gradient(45deg,rgba(212,168,67,0.05) 0px,rgba(212,168,67,0.05) 1px,transparent 1px,transparent 8px);}
  .bg-slot-5{background:radial-gradient(ellipse 50% 70% at 45% 35%,#C4622D55 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 60% 65%,#FAF7F222 0%,transparent 55%),linear-gradient(120deg,#1a0f08,#2d1a10,#150a05);}
  .bg-slot-6{background:radial-gradient(ellipse 70% 60% at 20% 60%,#7A9E7E66 0%,transparent 55%),radial-gradient(ellipse 80% 50% at 75% 30%,#D4A84344 0%,transparent 55%),linear-gradient(90deg,#0d1f0f,#1a3a20,#0a1510);}
  .bg-slot-7{background:radial-gradient(ellipse 55% 55% at 50% 50%,#9B5DE566 0%,transparent 50%),radial-gradient(ellipse 40% 60% at 70% 30%,#D4A84377 0%,transparent 50%),radial-gradient(ellipse 50% 40% at 25% 70%,#C4622D55 0%,transparent 50%),linear-gradient(135deg,#150d1f,#1f1030,#0d0818);}
  .bg-slot-8{background:radial-gradient(ellipse 65% 50% at 35% 45%,#C4622D66 0%,transparent 55%),radial-gradient(ellipse 55% 65% at 65% 55%,#7A9E7E55 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 50% 20%,#D4A84344 0%,transparent 50%),linear-gradient(150deg,#1a0d0a,#200f15,#0d0d0d);}
  .bg-slot-9{background:radial-gradient(ellipse 80% 60% at 50% 40%,#D4A84344 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 20% 70%,#C4622D55 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 80% 60%,#7A9E7E44 0%,transparent 55%),linear-gradient(110deg,#1a100a,#2a1a10,#0f0f0f);}
`

function TestimonialCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [])

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) setActive(a => (a + 1) % TESTIMONIALS.length)
    if (info.offset.x > 50)  setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex gap-1 mb-5">
            {Array.from({ length: TESTIMONIALS[active].stars }).map((_, i) => (
              <span key={i} className="text-[#D4A843] text-lg">★</span>
            ))}
          </div>
          <blockquote className="text-[#FAF7F2]/85 text-lg leading-relaxed italic mb-6">
            &ldquo;{TESTIMONIALS[active].quote}&rdquo;
          </blockquote>
          <p className="text-[#D4A843] font-semibold">{TESTIMONIALS[active].name}</p>
          <p className="text-[#FAF7F2]/50 text-sm">{TESTIMONIALS[active].role}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-[#D4A843] w-6' : 'bg-white/30 w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const aboutRef    = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const galleryRef  = useRef<HTMLDivElement>(null)
  const farnazRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero stagger with a subtle 3-D lift: elements start rotated on X then settle flat
    // Uses Power4.out for fast-start, heavy-deceleration feel
    if (heroRef.current) {
      gsap.set(heroRef.current, { perspective: 1200 })
      gsap.from(heroRef.current.querySelectorAll('.hero-stagger'), {
        y: 60, opacity: 0, rotateX: 12, duration: 1.2, stagger: 0.15,
        ease: 'power4.out', transformOrigin: 'center bottom',
      })
    }

    // About section — image slides in with a 3-D tilt that resolves on arrival
    if (aboutRef.current) {
      gsap.from(aboutRef.current.querySelectorAll('.about-img'), {
        x: -80, opacity: 0, rotateY: -15, duration: 1.1, ease: 'power4.out',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 75%' },
      })
      gsap.from(aboutRef.current.querySelectorAll('.about-text > *'), {
        x: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 70%' },
      })
    }

    // Scroll-driven image scaling: images subtly scale 1.0 → 1.05 as user scrolls past
    document.querySelectorAll<HTMLElement>('.scroll-scale-img').forEach(img => {
      gsap.fromTo(img,
        { scale: 1 },
        {
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      )
    })

    // Farnaz portrait — two independent animations on different CSS properties:
    //   • ScrollTrigger scrubs `y` (vertical parallax)
    //   • Repeating tween animates `rotateY`/`rotateX` (3-D sway)
    //   They target distinct transform components so they do not conflict.
    if (farnazRef.current) {
      gsap.to(farnazRef.current.querySelectorAll('.farnaz-portrait'), {
        y: -40, ease: 'none',
        scrollTrigger: {
          trigger: farnazRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5,
        },
      })
      gsap.to(farnazRef.current.querySelectorAll('.farnaz-portrait'), {
        rotateY: 5, rotateX: -3, duration: 4, ease: 'sine.inOut',
        repeat: -1, yoyo: true, transformOrigin: 'center center',
      })
    }
  })

  return (
    <>
      <style>{slotStyles}</style>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen bg-[#1C1C1C] flex items-center overflow-hidden pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="float-slow absolute top-10 left-[8%] w-64 h-64 rounded-full opacity-20"
               style={{ background: 'radial-gradient(circle, #C4622D, transparent 70%)' }} />
          <div className="float-medium absolute bottom-20 left-[15%] w-48 h-48 rounded-full opacity-15"
               style={{ background: 'radial-gradient(circle, #D4A843, transparent 70%)' }} />
          <div className="float-slow absolute top-1/3 right-[5%] w-72 h-72 rounded-full opacity-10"
               style={{ background: 'radial-gradient(circle, #7A9E7E, transparent 70%)', animationDelay: '-3s' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <p className="hero-stagger text-[#D4A843] uppercase tracking-[0.3em] text-xs font-semibold mb-4">Los Angeles Art Studio</p>
            <SplitTextReveal
              as="h1"
              className="hero-stagger font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-[#FAF7F2] leading-[1.08] mb-6"
              scrollTrigger={false}
              stagger={0.07}
              duration={1.2}
              delay={0.2}
            >
              Beyond the Canvas
            </SplitTextReveal>
            <p className="hero-stagger text-[#FAF7F2]/65 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              A luxury creative space where passion meets technique. Join award-winning artist Farnaz Amin for transformative art experiences for all ages.
            </p>
            <div className="hero-stagger flex flex-wrap gap-4">
              <Link href="/classes" className="btn-terra">Book a Class</Link>
              <Link href="/gallery" className="btn-outline-gold">View Portfolio</Link>
            </div>
            <div className="hero-stagger grid grid-cols-3 gap-2 sm:gap-4 mt-12">
              {[
                { num: '25+', label: 'Years Teaching' },
                { num: '∞',   label: 'All Ages Welcome' },
                { num: '🏆',  label: 'Award Winning' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm">
                  <p className="text-[#D4A843] text-2xl font-bold font-serif">{num}</p>
                  <p className="text-[#FAF7F2]/60 text-[10px] sm:text-xs mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-stagger relative">
            {/* 📷 PHOTO PLACEHOLDER — Replace with <Image> of hero artwork. Aspect ratio 4:5, min 1200px wide. */}
            <div data-art-type="hero-canvas"
                 className="parallax-container art-canvas-hero relative w-full aspect-[4/5] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
              <div className="parallax-inner-auto scroll-scale-img absolute inset-0">
                <div className="absolute inset-3 border border-[#C5B358]/20 rounded-xl pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30">
                  <span className="text-5xl">🎨</span>
                  <p className="text-[#FAF9F6] text-sm font-medium tracking-widest uppercase">Add Hero Photo Here</p>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#C5B358]/60 rounded-tl" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#C5B358]/60 rounded-tr" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#C5B358]/60 rounded-bl" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#C5B358]/60 rounded-br" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#C4622D] text-white rounded-xl px-5 py-3 shadow-xl">
              <p className="text-xs font-medium opacity-80">Since 1999</p>
              <p className="font-serif font-bold">Farnaz Amin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <section className="bg-[#C5B358] py-4 overflow-hidden" aria-label="Services ticker">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-[#1A1A1A] font-semibold text-sm uppercase tracking-widest mx-6 shrink-0">
              {item}<span className="mx-6 opacity-40">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* 3-D Scrollytelling — Spline scene + GSAP scroll steps */}
      <SplineScrollytelling />

      {/* About the Studio */}
      <section ref={aboutRef} className="about-section section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-img relative">
            {/* 📷 PHOTO PLACEHOLDER — Replace with studio/artwork image (3:4 ratio). */}
            <div data-art-type="about-studio"
                 className="parallax-container art-canvas-hero relative w-full aspect-[3/4] rounded-2xl shadow-xl overflow-hidden">
              <div className="parallax-inner-auto scroll-scale-img absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-25">
                <span className="text-4xl">🖼️</span>
                <p className="text-[#FAF9F6] text-xs tracking-widest uppercase">Add Studio Photo</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#C4622D] rounded-full flex flex-col items-center justify-center text-white shadow-lg">
              <span className="font-serif font-bold text-2xl leading-none">25+</span>
              <span className="text-xs leading-tight text-center opacity-90">Years<br/>Teaching</span>
            </div>
          </div>
          <div className="about-text">
            <p className="text-[#C4622D] uppercase tracking-[0.25em] text-xs font-semibold mb-3">About the Studio</p>
            <SplitTextReveal
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-6"
              stagger={0.05}
              duration={1.0}
            >
              A Creative Space for All Ages to Explore and Grow Through Art
            </SplitTextReveal>
            <p className="text-[#1C1C1C]/65 text-lg leading-relaxed mb-5">
              Beyond the Canvas is more than an art studio — it&apos;s a sanctuary for creativity.
              Founded by Iranian-American artist Farnaz Amin, our studio offers a warm, inclusive
              environment where students of every age and background can discover their artistic voice.
            </p>
            <p className="text-[#1C1C1C]/65 leading-relaxed mb-8">
              From children taking their first brush strokes to adults mastering advanced oil painting
              techniques, we celebrate every stage of the creative journey. Our curriculum blends
              classical training with contemporary approaches.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-terra">Meet Farnaz</Link>
              <Link href="/classes" className="btn-outline-gold border-[#C4622D] text-[#C4622D] hover:bg-[#C4622D] hover:text-white">View Classes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="section-pad bg-[#1C1C1C]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-14" depth>
            <p className="text-[#D4A843] uppercase tracking-[0.25em] text-xs font-semibold mb-3">What We Offer</p>
            <SplitTextReveal
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-[#FAF7F2]"
              stagger={0.06}
              duration={1.0}
            >
              Our Services
            </SplitTextReveal>
          </ScrollReveal>
          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon, title, desc, detail, href }, i) => (
              <ScrollReveal key={title} delay={i * 0.12} direction="up" depth>
                <TiltCard maxTilt={5} hoverScale={1.02}>
                  <Link href={href} className="service-card group h-full bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#D4A843]/50 transition-all duration-300 block">
                    <span className="text-4xl mb-5 block">{icon}</span>
                    <h3 className="font-serif text-xl font-bold text-[#FAF7F2] mb-3">{title}</h3>
                    <p className="text-[#FAF7F2]/55 text-sm leading-relaxed mb-5">{desc}</p>
                    <p className="text-[#D4A843] text-sm font-medium group-hover:underline">{detail} →</p>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section ref={galleryRef} className="section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-12" depth>
            <p className="text-[#C4622D] uppercase tracking-[0.25em] text-xs font-semibold mb-3">Portfolio</p>
            <SplitTextReveal
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1C]"
              stagger={0.06}
              duration={1.0}
            >
              Gallery Preview
            </SplitTextReveal>
          </ScrollReveal>
          <div className="gallery-grid grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px] lg:auto-rows-[200px]">
            {GALLERY_SLOTS.map(({ id, title, medium, span, bg }, i) => (
              <ScrollReveal key={id} delay={i * 0.07} direction="up" className={`gallery-tile ${span}`}>
                <Link href="/gallery"
                      data-art-type={medium.toLowerCase().replace(/\s/g, '-')}
                      className={`group relative overflow-hidden rounded-xl h-full block ${bg}`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <span className="text-2xl">📷</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <p className="text-white font-serif font-bold text-lg text-center leading-tight">{title}</p>
                    <p className="text-[#D4A843] text-sm mt-1">{medium}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent group-hover:translate-y-full transition-transform duration-300">
                    <p className="text-white text-xs font-medium truncate">{title}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link href="/gallery" className="btn-terra mx-auto">View Full Gallery →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Meet Farnaz Amin */}
      <section ref={farnazRef} className="farnaz-section section-pad bg-[#1C1C1C]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="farnaz-portrait relative mx-auto lg:mx-0 max-w-md w-full">
            {/* 📷 PHOTO PLACEHOLDER — Replace with Farnaz professional portrait (3:4 ratio). */}
            <div className="absolute inset-0 border-2 border-[#C5B358]/40 rounded-2xl transform translate-x-4 translate-y-4" />
            <div data-art-type="artist-portrait"
                 className="parallax-container art-canvas-portrait relative w-full aspect-[3/4] rounded-2xl border-2 border-[#C4622D]/30">
              <div className="parallax-inner-auto absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-25">
                <span className="text-5xl">👩‍🎨</span>
                <p className="text-[#FAF9F6] text-xs tracking-widest uppercase">Artist Portrait</p>
              </div>
            </div>
          </div>
          <div>
            <ScrollReveal>
              <p className="text-[#D4A843] uppercase tracking-[0.25em] text-xs font-semibold mb-3">The Artist</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#FAF7F2] mb-6">Meet Farnaz Amin</h2>
              <p className="text-[#FAF7F2]/65 leading-relaxed mb-5">
                Born in Los Angeles to an Iranian family, Farnaz Amin has been immersed in Art since childhood.
                Trained in multiple countries and a graduate of Art school, she has exhibited her work internationally
                and won several awards.
              </p>
              <p className="text-[#FAF7F2]/65 leading-relaxed mb-8">
                With over 25 years of teaching experience, Farnaz brings passion, creativity, and cultural depth to
                every class and canvas. Her work spans oil painting, watercolor, resin art, and mixed media.
              </p>
              <blockquote className="border-l-2 border-[#D4A843] pl-5 mb-8">
                <p className="font-serif text-xl italic text-[#FAF7F2]/85">
                  &ldquo;For her, Art isn&apos;t just a skill — it&apos;s a way of life.&rdquo;
                </p>
              </blockquote>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '25+', label: 'Years Teaching' },
                  { num: '🌍',  label: 'International Exhibitions' },
                  { num: '🏆',  label: 'Award Winning' },
                  { num: '∞',   label: 'All Ages Welcome' },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[#D4A843] text-2xl font-bold font-serif">{num}</p>
                    <p className="text-[#FAF7F2]/55 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="section-pad bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-12" depth>
            <p className="text-[#C4622D] uppercase tracking-[0.25em] text-xs font-semibold mb-3">What Students Say</p>
            <SplitTextReveal
              as="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-[#1C1C1C]"
              stagger={0.07}
              duration={1.0}
            >
              Testimonials
            </SplitTextReveal>
          </ScrollReveal>
          <div className="bg-[#1C1C1C] rounded-3xl py-14 px-6 md:px-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative section-pad bg-[#1C1C1C] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%,rgba(196,98,45,0.18) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 75% 45%,rgba(212,168,67,0.12) 0%,transparent 60%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal depth>
            <p className="text-[#D4A843] uppercase tracking-[0.25em] text-xs font-semibold mb-4">Begin Your Journey</p>
            <SplitTextReveal
              as="h2"
              className="font-serif text-4xl md:text-6xl font-bold text-[#FAF7F2] mb-6 leading-tight"
              stagger={0.06}
              duration={1.1}
            >
              Ready to Create Something Beautiful?
            </SplitTextReveal>
            <p className="text-[#FAF7F2]/60 text-lg mb-10 max-w-lg mx-auto">
              Join our studio family and discover the artist within you. All skill levels, all ages, all welcome.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/classes" className="btn-terra">Enroll in a Class</Link>
              <Link href="/contact" className="btn-outline-gold">Plan a Private Event</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

