'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
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

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal-item ${className}`}
      initial={{ opacity: 0, x, y, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x, y, scale: 0.97 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], /* spring cubic-bezier */
      }}
    >
      {children}
    </motion.div>
  )
}
