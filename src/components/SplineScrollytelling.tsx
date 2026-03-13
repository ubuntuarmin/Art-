'use client'
import { useRef, useState, useCallback, useEffect, Component, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Application as SplineApp } from '@splinetool/runtime'

gsap.registerPlugin(ScrollTrigger)

// ── Error boundary ─────────────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false }
  static getDerivedStateFromError(): EBState { return { hasError: true } }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Surface the error in development; swap for a real logger (Sentry, etc.) in production
    console.error('[SplineErrorBoundary]', error, info.componentStack)
  }
  render() { return this.state.hasError ? this.props.fallback : this.props.children }
}

// ── CSS-3D fallback (shown while loading OR when Spline is unavailable) ────────
function Scene3DFallback({ step }: { step: number }) {
  const palette = ['#C4622D', '#D4A843', '#7A9E7E', '#C4622D']
  const accent = palette[step % palette.length]

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: 900 }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'spline3d-float 5s ease-in-out infinite',
        }}
      >
        {/* Outer ring */}
        <div
          className="w-64 h-64 rounded-full border-2 transition-colors duration-700"
          style={{
            borderColor: `${accent}55`,
            animation: 'spline3d-spin 10s linear infinite',
            transformStyle: 'preserve-3d',
          }}
        />
        {/* Middle ring — offset & reversed */}
        <div
          className="absolute inset-6 rounded-full border transition-colors duration-700"
          style={{
            borderColor: `${accent}88`,
            animation: 'spline3d-spin 6s linear infinite reverse',
            transform: 'rotateX(60deg)',
            transformStyle: 'preserve-3d',
          }}
        />
        {/* Inner sphere glow */}
        <div
          className="absolute inset-14 rounded-full transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${accent}99 0%, ${accent}22 60%, transparent 80%)`,
            boxShadow: `0 0 40px 10px ${accent}33`,
            animation: 'spline3d-pulse 3s ease-in-out infinite',
          }}
        />
        {/* Floating emoji icon */}
        <span
          className="absolute inset-0 flex items-center justify-center text-5xl select-none"
          style={{ textShadow: `0 0 20px ${accent}88` }}
        >
          🎨
        </span>
      </div>
    </div>
  )
}

// Dynamic import keeps the heavy WebGL bundle out of the initial load
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <Scene3DFallback step={0} />,
})

// ── Scroll step definitions ────────────────────────────────────────────────────
// splineTarget must match the exact object name in your Spline scene.
const STEPS = [
  {
    step: '01',
    tag: 'The Philosophy',
    heading: 'Art is a Way of Life',
    body: 'At Beyond the Canvas, we believe creativity lives in everyone. Our studio is a sanctuary where imagination meets technique — guided by master artist Farnaz Amin.',
    accent: '#C4622D',
    splineTarget: 'Shape1',   // rename to match your scene object
    tilt: { rotateX: 0, rotateY: -6 },
  },
  {
    step: '02',
    tag: 'The Mediums',
    heading: 'Master Every Medium',
    body: 'From the rich depth of oil on canvas to the fluid grace of watercolor, and the stunning dimension of resin art — explore mediums that speak to your soul.',
    accent: '#D4A843',
    splineTarget: 'Shape2',   // rename to match your scene object
    tilt: { rotateX: 4, rotateY: 6 },
  },
  {
    step: '03',
    tag: 'The Journey',
    heading: 'Every Brushstroke Counts',
    body: "Whether you're picking up a brush for the first time or refining a lifetime of technique, our curriculum meets you where you are and elevates you further.",
    accent: '#7A9E7E',
    splineTarget: 'Shape3',   // rename to match your scene object
    tilt: { rotateX: -4, rotateY: -4 },
  },
  {
    step: '04',
    tag: 'The Community',
    heading: 'Create Together',
    body: 'Join a family of artists who celebrate each other. From private classes to lively group workshops, the studio buzzes with shared creativity and inspiration.',
    accent: '#C4622D',
    splineTarget: 'Shape4',   // rename to match your scene object
    tilt: { rotateX: 2, rotateY: 8 },
  },
]

/*
 * ── Configuration (update both constants when connecting a real Spline scene) ──
 *
 * SPLINE_SCENE  — "Public link → scene.splinecode" URL from Spline editor
 *                 (File → Export → Public link)
 *
 * splineTarget  — name of the Spline object to animate at each step.
 *                 In your Spline scene, name each interactive object
 *                 (e.g. "Palette", "Brush", "Canvas", "Studio") and set that
 *                 name here.  The component calls emitEvent('mouseDown', target)
 *                 which triggers any mouseDown-bound State Machine on that object.
 *                 If the object name doesn't exist the call is silently ignored.
 */
const SPLINE_SCENE = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'

// ── Mobile step cards (shown instead of the sticky scrollytelling on small screens) ──
function MobileSteps() {
  return (
    <section className="lg:hidden bg-[#1C1C1C] py-20 px-6" aria-label="Studio story">
      <div className="mx-auto max-w-xl space-y-12">
        {STEPS.map((s, i) => (
          <div key={s.step} className="relative pl-10 border-l-2" style={{ borderColor: `${s.accent}44` }}>
            {/* Step marker */}
            <div
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#1C1C1C]"
              style={{ background: s.accent }}
            />

            {/* Tag line */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase" style={{ color: s.accent }}>
                {s.step}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2]/40">{s.tag}</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl font-bold text-[#FAF7F2] leading-tight mb-3">
              {s.heading.split(' ').map((word, wi, arr) =>
                wi === arr.length - 1 ? (
                  <span key={`${word}-${wi}`} className="italic" style={{ color: s.accent }}>
                    {word}
                  </span>
                ) : (
                  word + ' '
                ),
              )}
            </h2>

            {/* Body */}
            <p className="text-[#FAF7F2]/60 text-base leading-relaxed">{s.body}</p>

            {/* Visual accent — small CSS3D decoration */}
            {i === 0 && (
              <div className="mt-6 w-full h-32 rounded-xl overflow-hidden" style={{ boxShadow: `0 4px 20px ${s.accent}22` }}>
                <Scene3DFallback step={i} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function SplineScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinnerRef  = useRef<HTMLDivElement>(null)
  const viewerRef  = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)
  const stepEls    = useRef<(HTMLDivElement | null)[]>([])
  const splineApp  = useRef<SplineApp | null>(null)
  const [activeStep,    setActiveStep]    = useState(0)
  const [splineLoaded,  setSplineLoaded]  = useState(false)
  const [isDesktop,     setIsDesktop]     = useState(false)

  // Detect desktop breakpoint (lg = 1024px) for GSAP activation
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    let timer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(timer); timer = setTimeout(check, 150) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer) }
  }, [])

  // Called once the Spline runtime finishes initialising the scene
  const onSplineLoad = useCallback((app: SplineApp) => {
    splineApp.current = app
    setSplineLoaded(true)
  }, [])

  useGSAP(() => {
    // Only initialise the scrollytelling on large screens where the layout fits
    if (!isDesktop) return
    if (!sectionRef.current || !viewerRef.current || !stepsRef.current) return

    const totalSteps = STEPS.length

    const ctx = gsap.context(() => {
      // ── Timeline drives the pin + step transitions ─────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          pin: pinnerRef.current,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalSteps - 1),
            duration: { min: 0.3, max: 0.8 },
            ease: 'power2.inOut',
          },
          onUpdate(self) {
            const idx = Math.min(
              Math.floor(self.progress * totalSteps),
              totalSteps - 1,
            )
            setActiveStep(idx)

            // Ask Spline to animate named objects in the scene when present
            if (splineApp.current) {
              splineApp.current.emitEvent('mouseDown', STEPS[idx].splineTarget)
            }

            // Apply per-step 3-D tilt to the viewer container
            gsap.to(viewerRef.current, {
              rotateX: STEPS[idx].tilt.rotateX,
              rotateY: STEPS[idx].tilt.rotateY,
              duration: 0.7,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          },
        },
      })

      // Stagger each step's text in / out across the timeline
      stepEls.current.forEach((el, i) => {
        if (!el) return
        const progress = i / (totalSteps - 1)
        tl.to(el, { opacity: 1, y: 0, duration: 0.25 }, progress - 0.12)
        if (i < totalSteps - 1) {
          tl.to(el, { opacity: 0, y: -24, duration: 0.2 }, progress + 0.12)
        }
      })

      // Slow breathe animation on the viewer (independent of scroll)
      gsap.to(viewerRef.current, {
        y: -14,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [splineLoaded, isDesktop])

  return (
    <>
      {/* ── Mobile layout: simple step cards without Spline/sticky scroll ─── */}
      <MobileSteps />

      {/* ── Desktop layout: full sticky scrollytelling with 3-D viewer ──────── */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative bg-[#1C1C1C]"
        style={{ height: `${STEPS.length * 100}vh` }}
        aria-label="Studio story"
      >
        {/* ── Sticky panel ──────────────────────────────────────────────────────── */}
        <div
          ref={pinnerRef}
          className="sticky top-0 h-screen flex items-center overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 65% 45%, rgba(196,98,45,0.12) 0%, transparent 65%),' +
                'radial-gradient(ellipse 40% 60% at 20% 60%, rgba(212,168,67,0.08) 0%, transparent 60%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* ── Step text (left on desktop) ──────────────────────────────────── */}
            <div ref={stepsRef} className="relative min-h-[260px] order-2 lg:order-1">
              {STEPS.map((s, i) => (
                <div
                  key={s.step}
                  ref={el => { stepEls.current[i] = el }}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity:   i === 0 ? 1 : 0,
                    transform: i === 0 ? 'translateY(0)' : 'translateY(24px)',
                  }}
                  aria-hidden={i !== activeStep}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-mono font-semibold tracking-[0.25em] uppercase"
                      style={{ color: s.accent }}
                    >
                      {s.step}
                    </span>
                    <span className="w-8 h-px opacity-40" style={{ background: s.accent }} />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2]/50">
                      {s.tag}
                    </span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-[#FAF7F2] leading-[1.08] mb-5">
                    {s.heading.split(' ').map((word, wi, arr) =>
                      wi === arr.length - 1 ? (
                        <span key={`${word}-${wi}`} className="italic" style={{ color: s.accent }}>
                          {word}
                        </span>
                      ) : (
                        word + ' '
                      ),
                    )}
                  </h2>

                  <p className="text-[#FAF7F2]/60 text-lg leading-relaxed max-w-md">{s.body}</p>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-8">
                    {STEPS.map((_, di) => (
                      <span
                        key={di}
                        className="block h-1 rounded-full transition-all duration-500"
                        style={{
                          width:      di === activeStep ? '2rem' : '0.5rem',
                          background: di === activeStep ? s.accent : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── 3-D Viewer (right on desktop) ────────────────────────────────── */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div
                ref={viewerRef}
                className="relative w-full max-w-[520px] aspect-square rounded-3xl overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                  boxShadow:
                    '0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                {/*
                 * SplineErrorBoundary catches any runtime error thrown by the
                 * WebGL scene (e.g. failed network fetch) and shows the CSS
                 * fallback instead — so the page never crashes.
                 */}
                <SplineErrorBoundary fallback={<Scene3DFallback step={activeStep} />}>
                  <Spline scene={SPLINE_SCENE} onLoad={onSplineLoad} />
                </SplineErrorBoundary>

                {/* Vignette overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(28,28,28,0.5) 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: activeStep === 0 ? 1 : 0 }}
            aria-hidden="true"
          >
            <span className="text-[#FAF7F2]/30 text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#D4A843]/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>
    </>
  )
}

