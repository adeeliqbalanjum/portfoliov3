'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2, my = window.innerHeight / 2

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      gsap.to(dot,  { x: mx, y: my, duration: 0.08, overwrite: true })
      gsap.to(ring, { x: mx, y: my, duration: 0.22, overwrite: true })
    }

    const grow  = () => gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.25 })
    const shrink= () => gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.25 })
    const press = () => gsap.to([dot, ring], { scale: 0.75, duration: 0.1 })
    const lift  = () => gsap.to([dot, ring], { scale: 1,    duration: 0.15 })

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()
    const iv = setInterval(attach, 2000)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', press)
    window.addEventListener('mouseup',   lift)
    return () => {
      clearInterval(iv)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', press)
      window.removeEventListener('mouseup',   lift)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  style={{ position:'fixed', zIndex:9999, pointerEvents:'none' }} />
      <div ref={ringRef} className="cur-ring" style={{ position:'fixed', zIndex:9998, pointerEvents:'none' }} />
    </>
  )
}
