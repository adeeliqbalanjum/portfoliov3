'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(dot, {
        x: mouseX, y: mouseY,
        duration: 0.1,
        ease: 'power1.out',
        overwrite: true,
      })
      gsap.to(ring, {
        x: mouseX, y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }
    const onMouseEnterBtn = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.3, duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.8, duration: 0.1 })
    }
    const onMouseUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.15 })
    }

    // Attach to all interactive elements
    const updateListeners = () => {
      document.querySelectorAll('a, [data-cursor="link"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
      document.querySelectorAll('button, [data-cursor="btn"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterBtn)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    // Re-scan periodically for dynamic elements
    updateListeners()
    const interval = setInterval(updateListeners, 2000)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}
      >
        <div className="cursor-dot-inner" />
      </div>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
      >
        <div className="cursor-dot-outer" />
      </div>
    </>
  )
}
