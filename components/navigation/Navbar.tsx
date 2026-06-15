'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MenuOverlay } from './MenuOverlay'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const prev = useRef(0)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
    const onScroll = () => {
      const cur = window.scrollY
      if (navRef.current) {
        navRef.current.style.transform =
          cur > 100 && cur > prev.current && !open
            ? 'translateY(-100%)' : 'translateY(0)'
      }
      prev.current = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          transition: 'transform 0.45s cubic-bezier(0.76,0,0.24,1)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(1.2rem,2.5vw,1.8rem) clamp(1.5rem,5vw,4rem)',
        }}>
          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ textDecoration: 'none', cursor: 'none' }}>
            <span className="font-display" style={{
              fontWeight: 800, fontSize: 'clamp(1rem,1.8vw,1.3rem)',
              letterSpacing: '-0.03em', color: 'var(--ink)',
            }}>
              ADEEL<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </a>

          {/* Center links – desktop */}
          <div style={{ display: 'flex', gap: '2.5rem' }} className="hidden md:flex">
            {['#services','#work','#about','#contact'].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'Inter,sans-serif', fontSize: '0.72rem',
                  letterSpacing: '0.12em', color: 'var(--muted)',
                  textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {id.replace('#', '')}
              </button>
            ))}
          </div>

          {/* Right: theme + CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <button onClick={() => scrollTo('#contact')}
              className="hidden md:flex"
              style={{
                cursor: 'none', border: '1px solid var(--accent)',
                borderRadius: '9999px', padding: '0.55rem 1.4rem',
                fontFamily: 'Syne,sans-serif', fontWeight: 700,
                fontSize: '0.72rem', letterSpacing: '0.08em',
                color: 'var(--accent)', background: 'transparent',
                textTransform: 'uppercase', transition: 'background 0.25s,color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}>
              Start Project
            </button>

            {/* Hamburger */}
            <button onClick={() => setOpen(true)} style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '9999px', padding: '0.6rem 1rem',
              cursor: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ display: 'block', width: '18px', height: '1px', background: 'var(--ink)' }} />
                <span style={{ display: 'block', width: '12px', height: '1px', background: 'var(--ink)' }} />
              </div>
              <span className="hidden md:block font-display"
                style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                Menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MenuOverlay isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
