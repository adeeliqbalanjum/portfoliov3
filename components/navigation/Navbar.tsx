'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MenuOverlay } from './MenuOverlay'

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const prevScroll = useRef(0)

  // Hide/show nav on scroll direction
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY
      if (cur < 100) { setHidden(false); prevScroll.current = cur; return }
      setHidden(cur > prevScroll.current)
      prevScroll.current = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.fromTo(nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 transition-transform duration-500"
        style={{
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div
          className="flex items-center justify-between px-8 md:px-16 py-6 md:py-8"
          style={{ backdropFilter: 'blur(12px)', background: 'transparent' }}
        >
          {/* Logo */}
          <a
            href="#"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{ textDecoration: 'none', cursor: 'none' }}
          >
            <span
              className="font-display font-bold text-xl tracking-tight"
              style={{ color: 'var(--ink)' }}
            >
              ADEEL<span style={{ color: 'var(--orange)' }}>.</span>
            </span>
          </a>

          {/* Right controls */}
          <div className="flex items-center gap-5">
            {/* Availability indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#22c55e' }}
              />
              <span
                className="font-body text-xs tracking-widest"
                style={{ color: 'var(--muted)' }}
              >
                AVAILABLE
              </span>
            </div>

            <ThemeToggle />

            {/* Menu toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="btn"
              className="flex items-center gap-3 px-5 py-2.5 rounded-full transition-colors duration-300"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--ink)',
                background: 'transparent',
                cursor: 'none',
              }}
            >
              <div className="flex flex-col gap-1.5 justify-center">
                <span className="block w-5 h-px" style={{ background: 'var(--ink)' }} />
                <span className="block w-3 h-px" style={{ background: 'var(--ink)' }} />
              </div>
              <span className="hidden md:block font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
                MENU
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
