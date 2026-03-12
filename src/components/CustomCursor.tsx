'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top  = `${e.clientY}px`
    }

    const enter = () => cursor.classList.add('hovering')
    const leave = () => cursor.classList.remove('hovering')

    window.addEventListener('mousemove', move)

    const attached = new Set<Element>()

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

    return () => {
      window.removeEventListener('mousemove', move)
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
