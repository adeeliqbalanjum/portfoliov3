'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { MagneticButton } from '../ui/MagneticButton'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Services', href: '#services', num: '01' },
  { label: 'About', href: '#about', num: '02' },
  { label: 'Work', href: '#work', num: '03' },
  { label: 'Process', href: '#process', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
]

const socials = [
  { label: 'Upwork', href: 'https://upwork.com' },
  { label: 'Fiverr', href: 'https://fiverr.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com/adeeliqbalanjum' },
]

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const linksContainer = linksRef.current
    if (!overlay || !linksContainer) return

    const links = linksContainer.querySelectorAll('.menu-link-wrapper')
    const meta = overlay.querySelectorAll('.menu-meta')

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      tlRef.current = gsap.timeline()
        .set(overlay, { display: 'flex' })
        .fromTo(overlay, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.7,
          ease: 'power4.inOut',
        })
        .fromTo(links, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: 'power3.out',
        }, '-=0.3')
        .fromTo(meta, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4')
    } else {
      document.body.style.overflow = ''
      tlRef.current = gsap.timeline({
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
        .to(links, {
          y: -40, opacity: 0,
          stagger: 0.04,
          duration: 0.35,
          ease: 'power3.in',
        })
        .to(overlay, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.55,
          ease: 'power4.inOut',
        }, '-=0.1')
    }

    return () => { tlRef.current?.kill() }
  }, [isOpen])

  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }, 700)
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 hidden flex-col justify-between"
      style={{ background: 'var(--paper)', clipPath: 'inset(0 0 100% 0)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-8">
        <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--ink)' }}>
          ADEEL<span style={{ color: 'var(--orange)' }}>.</span>
        </span>
        <MagneticButton
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full"
          style={{ border: '1px solid var(--border)', color: 'var(--ink)' } as React.CSSProperties}
        >
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>ESC</span>
        </MagneticButton>
      </div>

      {/* Nav links */}
      <nav ref={linksRef} className="px-8 md:px-16 py-8">
        {navLinks.map((link) => (
          <div key={link.href} className="menu-link-wrapper overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => handleLinkClick(link.href)}
              data-cursor="link"
              className="group flex items-center justify-between w-full py-6 md:py-8 text-left"
              style={{ background: 'transparent', border: 'none', cursor: 'none' }}
            >
              <div className="flex items-end gap-6">
                <span
                  className="font-body text-xs tracking-widest transition-colors duration-300"
                  style={{ color: 'var(--muted)' }}
                >
                  {link.num}
                </span>
                <span
                  className="font-display font-bold leading-none transition-colors duration-300 group-hover:text-orange-500"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                    color: 'var(--ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {link.label}
                </span>
              </div>
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-body text-xs tracking-widest"
                style={{ color: 'var(--orange)' }}
              >
                ↗
              </span>
            </button>
          </div>
        ))}
      </nav>

      {/* Bottom meta */}
      <div className="px-8 md:px-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="menu-meta">
          <p className="font-body text-xs tracking-widest mb-3" style={{ color: 'var(--muted)' }}>CONNECT</p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="font-body text-sm transition-colors duration-300 hover:text-orange-500"
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="menu-meta text-right">
          <p className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            Lahore, Pakistan · Available Worldwide
          </p>
          <a
            href="mailto:adeeliqbalanjum@gmail.com"
            data-cursor="link"
            className="font-display font-bold text-lg md:text-2xl"
            style={{ color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.02em' }}
          >
            adeeliqbalanjum@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
