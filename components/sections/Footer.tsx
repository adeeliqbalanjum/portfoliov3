'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Code, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/adeeliqbalanjum', Icon: Code },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adeeliqbalanjum', Icon: Globe },
  { label: 'Upwork', href: 'https://upwork.com', Icon: ExternalLink },
]

// Marquee items
const marqueeItems = [
  'WordPress', '✦', 'WooCommerce', '✦', 'Performance', '✦',
  'Custom Plugins', '✦', 'Elementor', '✦', 'UAE', '✦',
  'UK', '✦', 'USA', '✦', 'Pakistan', '✦', 'Speed', '✦',
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text reveal on scroll
      gsap.from(bigTextRef.current, {
        opacity: 0, y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: bigTextRef.current, start: 'top 85%' },
      })

      gsap.from('.footer-link', {
        opacity: 0, y: 20,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-nav', start: 'top 90%' },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} style={{ borderTop: '1px solid var(--border)' }}>
      {/* Marquee band */}
      <div
        className="overflow-hidden py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-body text-xs tracking-widest px-4"
              style={{ color: 'var(--muted)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Big name block */}
      <div ref={bigTextRef} className="px-8 md:px-16 py-16 md:py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-body text-xs tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
          LAHORE, PAKISTAN · WORKING WORLDWIDE
        </p>
        <div
          className="font-display font-black leading-none select-none"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 12rem)',
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
          }}
        >
          ADEEL<span style={{ color: 'var(--orange)' }}>.</span>
        </div>
        <div
          className="font-display font-black leading-none select-none mt-2"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 5.5rem)',
            letterSpacing: '-0.04em',
            color: 'var(--muted)',
          }}
        >
          IQBAL ANJUM
        </div>
      </div>

      {/* Nav + socials row */}
      <div className="px-8 md:px-16 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          {/* Navigation */}
          <nav className="footer-nav flex flex-wrap gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                data-cursor="link"
                className="footer-link font-body text-xs tracking-widest transition-colors duration-200 hover:text-[var(--orange)]"
                style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'none', padding: 0 }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 hover:border-[var(--orange)] hover:text-[var(--orange)]"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-10 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-body text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Adeel Iqbal Anjum. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-xs" style={{ color: 'var(--muted)' }}>
              WordPress Performance & WooCommerce Specialist
            </span>
            <span
              className="font-body text-xs px-3 py-1 rounded-full"
              style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
            >
              v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
