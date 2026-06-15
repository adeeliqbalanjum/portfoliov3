'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01', title: 'WordPress Performance',
    sub: 'Sub-2s load times. Guaranteed.',
    desc: 'Full Core Web Vitals audit, server-side caching, image pipelines, and CDN configuration. I turn 9-second loading dinosaurs into sub-2s revenue machines.',
    tags: ['GTmetrix A', 'WP Rocket', 'LCP / CLS / FID', 'Server Config'],
    visual: '#ff6600',
  },
  {
    num: '02', title: 'WooCommerce Development',
    sub: 'E-commerce that converts.',
    desc: 'Custom checkout flows, tiered pricing engines, complex product configurators, and payment gateway integrations that handle thousands of orders without breaking a sweat.',
    tags: ['Custom Checkout', 'Telr / Stripe', 'Inventory', 'B2B Portals'],
    visual: '#e65500',
  },
  {
    num: '03', title: 'Custom Plugin Development',
    sub: "When off-the-shelf isn\u2019t enough.",
    desc: 'Bespoke WordPress plugins: booking systems, admin dashboards, REST API bridges, multi-step forms, and complex data workflows — all with clean, documented PHP.',
    tags: ['PHP / OOP', 'REST API', 'Custom Admin UI', 'Hooks & Filters'],
    visual: '#cc4400',
  },
  {
    num: '04', title: 'Elementor & Theme Dev',
    sub: 'Pixel-perfect front-ends.',
    desc: 'Custom Elementor widgets, child themes, and Full Site Editing blocks. Clean, maintainable markup that your client can actually manage without breaking things.',
    tags: ['Elementor Pro', 'ACF', 'Custom Widgets', 'FSE / Gutenberg'],
    visual: '#b33300',
  },
  {
    num: '05', title: 'Speed & Vitals Audit',
    sub: 'Find every bottleneck.',
    desc: 'A comprehensive audit covering LCP, CLS, INP, TTFB, server response time, render-blocking resources, and everything in between — with a prioritized fix plan.',
    tags: ['Lighthouse', 'PageSpeed', 'WebPageTest', 'CDN Audit'],
    visual: '#993300',
  },
  {
    num: '06', title: 'Site Maintenance & Support',
    sub: 'Always on. Always secure.',
    desc: 'Monthly retainers for plugin updates, security hardening, uptime monitoring, performance checks, and priority bug fixes. Your site, always running perfectly.',
    tags: ['Monthly Retainer', 'Security', 'Uptime', 'Backups'],
    visual: '#7a2900',
  },
]

export function Services() {
  const [active, setActive] = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const rightRef    = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)

  // Scroll-triggered activation of each service row
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.svc-heading', {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-heading', start: 'top 82%' },
      })

      // Each row triggers active state
      SERVICES.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.svc-row-${i}`,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter:      () => setActive(i),
          onEnterBack:  () => setActive(i),
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Crossfade right panel when active changes
  useEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    )
  }, [active])

  const s = SERVICES[active]

  return (
    <section ref={sectionRef} id="services" style={{ background: 'var(--paper)' }}>
      {/* Section header */}
      <div style={{
        padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem) 3rem',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
            color: 'var(--muted)', textTransform: 'uppercase' }}>Leistungen</span>
        </div>
        <h2 className="svc-heading font-display" style={{
          fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95,
          fontSize: 'clamp(2.2rem,5.5vw,6rem)', color: 'var(--ink)',
        }}>
          What we do<br/>
          <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>is what we love</em>
        </h2>
      </div>

      {/* Two-column layout: left = scrollable list, right = sticky panel */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* LEFT: service list — each item has height so ScrollTrigger can detect it */}
        <div style={{ flex: 1, borderTop: '1px solid var(--border)' }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className={`svc-row-${i}`}
              onClick={() => setActive(i)}
              style={{
                borderBottom: '1px solid var(--border)',
                padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,5vw,4rem)',
                cursor: 'none', minHeight: '12vh',
                background: active === i ? 'var(--surface)' : 'transparent',
                transition: 'background 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <span style={{
                  fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.1em',
                  color: active === i ? 'var(--accent)' : 'var(--muted)',
                  minWidth: '2rem', paddingTop: '0.4rem',
                  transition: 'color 0.3s',
                }}>{svc.num}</span>

                <div style={{ flex: 1 }}>
                  <h3 className="font-display" style={{
                    fontWeight: 800,
                    fontSize: 'clamp(1.1rem,2.2vw,2rem)',
                    letterSpacing: '-0.025em',
                    color: active === i ? 'var(--ink)' : 'var(--muted)',
                    transition: 'color 0.3s', marginBottom: '0.3rem',
                  }}>{svc.title}</h3>
                  {active === i && (
                    <p style={{ fontFamily: 'Inter', fontSize: '0.8rem',
                      color: 'var(--muted)', letterSpacing: '0.02em' }}>{svc.sub}</p>
                  )}
                </div>

                {/* Arrow */}
                <span style={{
                  color: 'var(--accent)', fontSize: '1.1rem',
                  opacity: active === i ? 1 : 0, transition: 'opacity 0.3s',
                }}>↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: sticky detail panel */}
        <div ref={rightRef} className="hidden lg:flex" style={{
          width: '42%', position: 'sticky', top: 0,
          height: '100vh', flexDirection: 'column', justifyContent: 'center',
          padding: '3rem 4rem 3rem 3rem',
          borderLeft: '1px solid var(--border)',
        }}>
          <div ref={panelRef}>
            {/* Visual swatch */}
            <div style={{
              width: '100%', aspectRatio: '16/9', borderRadius: '1rem',
              background: s.visual,
              marginBottom: '2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Abstract decoration */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
              }} />
              <span className="font-display" style={{
                fontWeight: 800, fontSize: '5rem', color: 'rgba(255,255,255,0.1)',
                letterSpacing: '-0.05em',
              }}>{s.num}</span>
            </div>

            <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
              color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {s.sub}
            </p>
            <p style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '0.95rem',
              lineHeight: 1.7, color: 'var(--muted)', marginBottom: '1.5rem' }}>
              {s.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {s.tags.map(t => (
                <span key={t} style={{
                  fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.08em',
                  padding: '0.35rem 0.85rem', borderRadius: '9999px',
                  border: '1px solid var(--border)', color: 'var(--muted)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
