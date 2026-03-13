'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  /** Stagger delay between each word in seconds */
  stagger?: number
  /** Total animation duration per word */
  duration?: number
  /** Delay before the entire animation starts */
  delay?: number
  /** Trigger on scroll (true) or on mount (false) */
  scrollTrigger?: boolean
  /** ScrollTrigger start position */
  triggerStart?: string
}

export default function SplitTextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.06,
  duration = 1.0,
  delay = 0,
  scrollTrigger = true,
  triggerStart = 'top 80%',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Just show immediately
      el.querySelectorAll<HTMLElement>('.split-word').forEach(w => {
        w.style.transform = 'none'
        w.style.opacity = '1'
      })
      return
    }

    const words = el.querySelectorAll<HTMLElement>('.split-word')

    // Set initial state
    gsap.set(words, {
      y: 40,
      opacity: 0,
      rotateX: 8,
      willChange: 'transform, opacity',
    })

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }

    if (scrollTrigger) {
      animConfig.scrollTrigger = {
        trigger: el,
        start: triggerStart,
        once: true,
      }
    }

    const tween = gsap.to(words, animConfig)

    return () => {
      tween.kill()
    }
  }, [children, stagger, duration, delay, scrollTrigger, triggerStart])

  // Split text into words, preserving spaces. Filter out empty results.
  const words = children.split(/(\s+)/).filter(Boolean)

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLHeadingElement>}
      className={className}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          // Preserve whitespace
          <span key={`space-${i}`}>{word}</span>
        ) : (
          <span
            key={`word-${i}`}
            className="split-word"
            style={{
              display: 'inline-block',
              transformOrigin: 'center bottom',
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </span>
        ),
      )}
    </Tag>
  )
}
