'use client'
import { useEffect, useRef } from 'react'

/**
 * CustomCursor — luxury magnetic cursor with spring-physics lerp.
 *
 * Behaviour:
 *  • Follows the pointer via requestAnimationFrame lerp (smooth, spring-like)
 *  • Enlarges when hovering any interactive element
 *  • Magnetic pull: when within MAGNETIC_RADIUS px of a primary CTA,
 *    the cursor snaps toward the element's centre (20 px attraction radius)
 */

const LERP_FACTOR      = 0.14   // spring smoothing (lower = more lag)
const MAGNETIC_RADIUS  = 80     // px — start attracting within this distance
const MAGNETIC_PULL    = 0.28   // fraction of distance to pull per frame
const CTA_SELECTORS    = '.btn-terra, .btn-outline-gold, [data-magnetic]'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Raw mouse position (updated on every mousemove)
    let rawX = -100, rawY = -100
    // Rendered position (lerped toward target each frame)
    let rendX = -100, rendY = -100
    // Current lerp target (may be shifted by magnetic pull)
    let targetX = -100, targetY = -100

    let rafId: number | undefined
    let isMagnetic = false

    /* ── Mouse tracking ────────────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      rawX = e.clientX
      rawY = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    /* ── Hover state management ─────────────────────────────────────────── */
    const attached = new Set<Element>()

    const enter = () => cursor.classList.add('hovering')
    const leave = () => cursor.classList.remove('hovering')

    const attachToEl = (el: Element) => {
      if (attached.has(el)) return
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      attached.add(el)
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(attachToEl)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(attachToEl)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    /* ── Animation loop with magnetic pull ─────────────────────────────── */
    const animate = () => {
      // Calculate magnetic attraction from nearest CTA
      let mx = rawX, my = rawY
      isMagnetic = false

      document.querySelectorAll<HTMLElement>(CTA_SELECTORS).forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width  / 2
        const cy = rect.top  + rect.height / 2
        const dx = rawX - cx
        const dy = rawY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAGNETIC_RADIUS) {
          // Pull cursor toward element centre proportionally to proximity
          const strength = 1 - dist / MAGNETIC_RADIUS
          mx -= dx * strength * MAGNETIC_PULL
          my -= dy * strength * MAGNETIC_PULL
          isMagnetic = true
        }
      })

      targetX = mx
      targetY = my

      // Lerp toward target
      rendX += (targetX - rendX) * LERP_FACTOR
      rendY += (targetY - rendY) * LERP_FACTOR

      cursor.style.transform = `translate(${rendX - cursor.offsetWidth / 2}px, ${rendY - cursor.offsetHeight / 2}px)`

      // Toggle magnetic class for CSS size change
      cursor.classList.toggle('magnetic', isMagnetic)

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId !== undefined) cancelAnimationFrame(rafId)
      observer.disconnect()
      attached.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      attached.clear()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}
