'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
  /** Enable Z-axis depth: element starts blurred & pushed back, transitions into focus */
  depth?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  depth = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-8% 0px' })

  const offsets: Record<NonNullable<ScrollRevealProps['direction']>, { x: number; y: number }> = {
    up:    { x: 0,   y: 48  },
    down:  { x: 0,   y: -48 },
    left:  { x: -64, y: 0   },
    right: { x: 64,  y: 0   },
    none:  { x: 0,   y: 0   },
  }

  const { x, y } = offsets[direction]

  // Z-axis depth: start pushed back with blur, arrive at z=0 with no blur
  const initialZ = depth ? -60 : 0
  const initialFilter = depth ? 'blur(6px)' : 'blur(0px)'
  const animateFilter = 'blur(0px)'

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal-item ${className}`}
      initial={{ opacity: 0, x, y, z: initialZ, scale: 0.97, filter: initialFilter }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, z: 0, scale: 1, filter: animateFilter }
          : { opacity: 0, x, y, z: initialZ, scale: 0.97, filter: initialFilter }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1], /* spring cubic-bezier */
      }}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  )
}
