'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props { isOpen: boolean; onClose: () => void }

const links = [
  { num: '01', label: 'Services',  href: '#services'  },
  { num: '02', label: 'Work',      href: '#work'      },
  { num: '03', label: 'About',     href: '#about'     },
  { num: '04', label: 'Process',   href: '#process'   },
  { num: '05', label: 'Contact',   href: '#contact'   },
]

export function MenuOverlay({ isOpen, onClose }: Props) {
  const ref  = useRef<HTMLDivElement>(null)
  const tl   = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const items = el.querySelectorAll('.mo-link')
    const meta  = el.querySelectorAll('.mo-meta')

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      tl.current = gsap.timeline()
        .set(el, { display: 'flex' })
        .fromTo(el,    { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' })
        .fromTo(items, { y: 70, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(meta,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    } else {
      document.body.style.overflow = ''
      tl.current = gsap.timeline({ onComplete: () => gsap.set(el, { display: 'none' }) })
        .to(items, { y: -30, opacity: 0, stagger: 0.03, duration: 0.3, ease: 'power3.in' })
        .to(el,    { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power4.inOut' }, '-=0.05')
    }
    return () => { tl.current?.kill() }
  }, [isOpen])

  const go = (href: string) => {
    onClose()
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 650)
  }

  return (
    <div ref={ref} style={{
      display: 'none', position: 'fixed', inset: 0, zIndex: 50,
      background: 'var(--paper)', flexDirection: 'column',
      clipPath: 'inset(0 0 100% 0)',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(1.2rem,2.5vw,1.8rem) clamp(1.5rem,5vw,4rem)' }}>
        <span className="font-display" style={{ fontWeight: 800, fontSize: '1.2rem',
          letterSpacing: '-0.03em', color: 'var(--ink)' }}>
          ADEEL<span style={{ color: 'var(--accent)' }}>.</span>
        </span>

        {/* Greeting — digitalists.at style */}
        <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.1em',
          color: 'var(--muted)', textTransform: 'uppercase' }}>
          Hello World. Welcome here.
        </span>

        <button onClick={onClose} style={{
          background: 'none', border: '1px solid var(--border)',
          borderRadius: '9999px', padding: '0.5rem 1.1rem',
          color: 'var(--muted)', cursor: 'none',
          fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.1em',
        }}>ESC</button>
      </div>

      <div className="hr" style={{ margin: '0 clamp(1.5rem,5vw,4rem)' }} />

      {/* Nav links */}
      <nav style={{ flex: 1, padding: 'clamp(1.5rem,5vw,4rem)' }}>
        {links.map(l => (
          <div key={l.href} className="mo-link" style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => go(l.href)} style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', padding: '1.4rem 0',
              background: 'none', border: 'none', cursor: 'none', textAlign: 'left',
            }}
            onMouseEnter={e => { const t = e.currentTarget.querySelector('.mo-title') as HTMLElement; if(t) t.style.color = 'var(--accent)' }}
            onMouseLeave={e => { const t = e.currentTarget.querySelector('.mo-title') as HTMLElement; if(t) t.style.color = 'var(--ink)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '0.65rem',
                  letterSpacing: '0.1em', color: 'var(--muted)' }}>{l.num}</span>
                <span className="mo-title font-display" style={{
                  fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)',
                  fontSize: 'clamp(2rem,6vw,5.5rem)',
                  transition: 'color 0.2s',
                }}>{l.label}</span>
              </div>
              <span style={{ color: 'var(--accent)', fontSize: '1.5rem', opacity: 0.6 }}>↗</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Footer meta */}
      <div style={{ padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,5vw,4rem)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: '1.5rem' }}>
        <div className="mo-meta">
          <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.1em',
            color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Connect</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Upwork','Fiverr','LinkedIn','GitHub'].map(s => (
              <span key={s} style={{ fontFamily: 'Inter', fontSize: '0.8rem',
                color: 'var(--muted)', cursor: 'none' }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="mo-meta" style={{ textAlign: 'right' }}>
          <a href="mailto:adeeliqbalanjum@gmail.com" style={{
            fontFamily: 'Syne,sans-serif', fontWeight: 700,
            fontSize: 'clamp(0.85rem,1.5vw,1.15rem)',
            color: 'var(--ink)', textDecoration: 'none',
          }}>adeeliqbalanjum@gmail.com</a>
          <p style={{ fontFamily: 'Inter', fontSize: '0.65rem',
            color: 'var(--muted)', marginTop: '0.3rem', letterSpacing: '0.08em' }}>
            Lahore, Pakistan · Available Worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
