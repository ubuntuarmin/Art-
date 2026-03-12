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

    const targets = document.querySelectorAll('a, button, [role="button"]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}
