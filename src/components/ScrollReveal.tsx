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
  const inView = useInView(ref, { once, margin: '-10% 0px' })

  const offsets: Record<NonNullable<ScrollRevealProps['direction']>, { x: number; y: number }> = {
    up:    { x: 0,   y: 40  },
    down:  { x: 0,   y: -40 },
    left:  { x: -60, y: 0   },
    right: { x: 60,  y: 0   },
    none:  { x: 0,   y: 0   },
  }

  const { x, y } = offsets[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
