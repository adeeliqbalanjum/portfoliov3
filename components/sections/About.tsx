'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const secRef = useRef<HTMLElement>(null)
  const h2Ref  = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!h2Ref.current) return
    const split = new SplitType(h2Ref.current, { types: 'lines' })
    split.lines?.forEach(line => {
      const wrap = document.createElement('div')
      wrap.style.overflow = 'hidden'
      line.parentNode?.insertBefore(wrap, line)
      wrap.appendChild(line)
    })
    const ctx = gsap.context(() => {
      gsap.from(split.lines, {
        y: '110%', stagger: 0.1, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: h2Ref.current, start: 'top 82%' },
      })
      gsap.from('.about-row', {
        opacity: 0, y: 25, stagger: 0.09, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-table', start: 'top 80%' },
      })
    }, secRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section ref={secRef} id="about" style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
          color: 'var(--muted)', textTransform: 'uppercase' }}>Über uns</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
        {/* Positioning statement */}
        <h2 ref={h2Ref} className="font-display" style={{
          fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
          fontSize: 'clamp(2rem,4.5vw,5rem)', color: 'var(--ink)', maxWidth: '22ch',
        }}>
          I don't build websites.
          I build systems that perform,
          convert, and{' '}
          <span style={{ color: 'var(--accent)' }}>scale</span>
          {' '}— without the agency markup.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Bio */}
          <div>
            <p style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: 'clamp(0.9rem,1.2vw,1.05rem)',
              lineHeight: 1.8, color: 'var(--muted)', marginBottom: '2rem' }}>
              With 3+ years building WordPress experiences for clients in Dubai, London, and New York,
              I bring agency-level craft to every project — with direct communication, faster turnaround,
              and no middlemen inflating the invoice.
            </p>
            <p style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '0.9rem',
              lineHeight: 1.8, color: 'var(--muted)' }}>
              I specialize in the intersection of performance and commerce: sites that load fast, look
              exceptional, and are engineered to convert visitors into customers.
            </p>
          </div>

          {/* Credentials table */}
          <div className="about-table" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { k: 'Background', v: 'B.IT — Superior University Lahore, 2024' },
              { k: 'Experience',  v: 'Nuovo Studios · EESNCO · Embassy of Pakistan · Rozi Academy' },
              { k: 'Clients',     v: 'UAE · UK · USA · Pakistan' },
              { k: 'Focus',       v: 'WordPress · WooCommerce · Performance · Plugins' },
              { k: 'Base',        v: 'Lahore, Pakistan — Available Worldwide' },
            ].map(row => (
              <div key={row.k} className="about-row" style={{
                display: 'flex', gap: '1.5rem', padding: '1.1rem 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.08em',
                  color: 'var(--muted)', textTransform: 'uppercase', minWidth: '90px', paddingTop: '0.1rem' }}>
                  {row.k}
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '0.82rem',
                  color: 'var(--ink)', lineHeight: 1.5 }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
