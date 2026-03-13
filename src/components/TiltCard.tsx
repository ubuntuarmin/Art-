'use client'
import { useRef, useCallback, useEffect } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt angle in degrees (default 5) */
  maxTilt?: number
  /** Transition speed for the tilt reset */
  resetSpeed?: number
  /** Scale on hover (default 1.02) */
  hoverScale?: number
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 5,
  resetSpeed = 600,
  hoverScale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  // Use refs for touch/reduced-motion detection to avoid re-renders
  const isTouchRef = useRef(false)
  const prefersReducedRef = useRef(false)

  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchRef.current || prefersReducedRef.current) return
      const card = cardRef.current
      if (!card) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Calculate tilt: mouse position relative to center, mapped to maxTilt degrees
        const rotateX = ((y - centerY) / centerY) * -maxTilt
        const rotateY = ((x - centerX) / centerX) * maxTilt

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${hoverScale}, ${hoverScale}, ${hoverScale})`
      })
    },
    [maxTilt, hoverScale],
  )

  const handleMouseLeave = useCallback(() => {
    if (isTouchRef.current || prefersReducedRef.current) return
    const card = cardRef.current
    if (!card) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: `transform ${resetSpeed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
