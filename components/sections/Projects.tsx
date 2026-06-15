'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    cs: 'CS 001', title: 'Desert Safari Booking System',
    client: 'dasertsafaridubai.com', location: 'Dubai, UAE', year: '2024',
    tags: ['Custom Plugin', 'WooCommerce', 'Telr Payments', 'Admin Approval'],
    desc: 'End-to-end custom WordPress booking engine with tiered group pricing, hotel pickup management, manual admin approval workflow, and UAE Telr payment gateway.',
    color: '#ff6600',
    bg: 'linear-gradient(135deg,#140600 0%,#2a0d00 60%,#0a0a00 100%)',
    icon: '🏜️',
  },
  {
    cs: 'CS 002', title: 'EESNCO Lighting E-Commerce',
    client: 'eesnco.com', location: 'Dubai, UAE', year: '2023',
    tags: ['WooCommerce', 'Performance', 'B2B Portal', 'Elementor Pro'],
    desc: 'High-performance WooCommerce store for a commercial lighting distributor. GTmetrix A-grade, custom B2B pricing tiers, and a professional product catalogue.',
    color: '#f0c040',
    bg: 'linear-gradient(135deg,#0d0d00 0%,#1a1500 60%,#080800 100%)',
    icon: '💡',
  },
  {
    cs: 'CS 003', title: 'Embassy of Pakistan Portal',
    client: 'Embassy of Pakistan, Muscat', location: 'Oman', year: '2023',
    tags: ['Government', 'WordPress', 'Security Hardened', 'Multilingual'],
    desc: 'Secure, accessible government web portal built to diplomatic standards — multilingual support, strict security policies, and high-availability infrastructure.',
    color: '#22c55e',
    bg: 'linear-gradient(135deg,#000d02 0%,#001a05 60%,#000a00 100%)',
    icon: '🏛️',
  },
  {
    cs: 'CS 004', title: 'Rozi Academy LMS Platform',
    client: 'Rozi Academy', location: 'Pakistan', year: '2023',
    tags: ['LearnDash', 'Memberships', 'WooCommerce', 'Custom Dashboard'],
    desc: 'Learning management platform serving 5,000+ enrolled students. Custom student dashboard, subscription memberships, course gating, and performance optimization.',
    color: '#a855f7',
    bg: 'linear-gradient(135deg,#0a0015 0%,#150020 60%,#060010 100%)',
    icon: '📚',
  },
  {
    cs: 'CS 005', title: 'US Supply Chain Partnership Page',
    client: 'ussupplychaincorp.com', location: 'United States', year: '2024',
    tags: ['Self-Contained HTML', 'GSAP Animations', 'Dark/Light Mode', 'Elementor Widget'],
    desc: 'Premium animated partnership page with zero external dependencies — dark/light mode toggle, scroll animations, and self-contained deployment as an Elementor widget.',
    color: '#3b82f6',
    bg: 'linear-gradient(135deg,#00020d 0%,#000515 60%,#000208 100%)',
    icon: '🔗',
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.cases-header-el', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cases-header', start: 'top 82%' },
      })
      // Cards stagger in
      gsap.from('.case-card', {
        opacity: 0, y: 60, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.case-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" style={{
      borderTop: '1px solid var(--border)', background: 'var(--paper)',
      padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
    }}>
      {/* Header — "Case or did not happen" style */}
      <div className="cases-header" style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(3rem,6vw,5rem)',
      }}>
        <div>
          <div className="cases-header-el" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem',
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
              color: 'var(--muted)', textTransform: 'uppercase' }}>Referenzen</span>
          </div>
          <h2 className="cases-header-el font-display" style={{
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95,
            fontSize: 'clamp(2.2rem,5.5vw,6rem)', color: 'var(--ink)',
          }}>
            Case or did<br/>not happen
          </h2>
        </div>
        <div className="cases-header-el" style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.1em',
            color: 'var(--muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Creative Solutions
          </p>
          <a href="#contact" style={{
            fontFamily: 'Syne,sans-serif', fontWeight: 700,
            fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            cursor: 'none',
          }}>All Cases <ArrowUpRight size={14} /></a>
        </div>
      </div>

      {/* Case cards grid */}
      <div className="case-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5px' }}>
        {CASES.map((c, i) => (
          <div
            key={c.cs}
            className="case-card"
            style={{ background: 'var(--surface)', position: 'relative', cursor: 'none' }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { backgroundColor: 'var(--card)', duration: 0.3 }) }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { backgroundColor: 'var(--surface)', duration: 0.3 }) }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto auto',
              alignItems: 'center',
              gap: 'clamp(1rem,3vw,2.5rem)',
              padding: 'clamp(1.2rem,2.5vw,2rem) clamp(1.5rem,5vw,4rem)',
              borderBottom: '1px solid var(--border)',
            }}>
              {/* CS number */}
              <span className="font-display" style={{
                fontWeight: 800, fontSize: 'clamp(0.7rem,1.2vw,1rem)',
                letterSpacing: '0.04em', color: 'var(--muted)', minWidth: '5rem',
              }}>{c.cs}</span>

              {/* Title + tags */}
              <div>
                <h3 className="font-display" style={{
                  fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.8rem)',
                  letterSpacing: '-0.025em', color: 'var(--ink)',
                  marginBottom: '0.4rem', lineHeight: 1.1,
                }}>{c.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {c.tags.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.06em',
                      padding: '0.2rem 0.65rem', borderRadius: '9999px',
                      border: '1px solid var(--border)', color: 'var(--muted)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Location + year */}
              <div style={{ textAlign: 'right', display: 'none' }} className="hidden md:block">
                <p style={{ fontFamily: 'Inter', fontSize: '0.72rem',
                  color: 'var(--muted)', letterSpacing: '0.04em' }}>{c.location}</p>
                <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{c.year}</p>
              </div>

              {/* Thumbnail swatch */}
              <div style={{
                width: 'clamp(60px,8vw,100px)', aspectRatio: '16/9',
                borderRadius: '0.5rem', background: c.bg, overflow: 'hidden',
                position: 'relative', flexShrink: 0,
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                }}>
                  {c.icon}
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${c.color}22 0%, transparent 70%)`,
                }} />
              </div>
            </div>

            {/* Expanded description row — subtle */}
            <div style={{
              padding: '0 clamp(1.5rem,5vw,4rem) 0',
              maxHeight: 0, overflow: 'hidden',
              transition: 'max-height 0.4s ease, padding 0.4s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.maxHeight = '80px'; e.currentTarget.style.paddingBottom = '1rem'; e.currentTarget.style.paddingTop = '0.75rem' }}
            onMouseLeave={e => { e.currentTarget.style.maxHeight = '0'; e.currentTarget.style.paddingBottom = '0'; e.currentTarget.style.paddingTop = '0' }}>
              <p style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '0.82rem',
                color: 'var(--muted)', lineHeight: 1.6, paddingLeft: 'calc(5rem + clamp(1rem,3vw,2.5rem))' }}>
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
