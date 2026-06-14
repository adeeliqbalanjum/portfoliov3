'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'WordPress Performance',
    tagline: 'Sub-2s load times',
    desc: 'Core Web Vitals optimization, caching strategies, server-side tuning, and image pipelines that turn slow sites into revenue machines.',
    tags: ['GTmetrix A', 'Core Web Vitals', 'WP Rocket', 'Server Config'],
    accent: '#ff6600',
  },
  {
    num: '02',
    title: 'WooCommerce Development',
    tagline: 'E-commerce that converts',
    desc: 'Custom checkout flows, complex product configurators, payment gateway integration, and high-volume order management built to scale.',
    tags: ['Custom Plugins', 'Payments', 'Inventory', 'Analytics'],
    accent: '#ff6600',
  },
  {
    num: '03',
    title: 'Custom Plugin Dev',
    tagline: 'Bespoke functionality',
    desc: 'When off-the-shelf plugins fall short, I build custom WordPress plugins — booking systems, admin dashboards, API integrations.',
    tags: ['PHP / OOP', 'REST API', 'Admin UI', 'Hooks & Filters'],
    accent: '#ff6600',
  },
  {
    num: '04',
    title: 'Elementor & Theme Dev',
    tagline: 'Pixel-perfect builds',
    desc: 'Custom Elementor widgets, child themes, and full-site editors. Clean, maintainable code that your client can actually update.',
    tags: ['Elementor Pro', 'ACF', 'Custom CSS', 'FSE'],
    accent: '#ff6600',
  },
  {
    num: '05',
    title: 'Speed & Vitals Audit',
    tagline: 'Diagnose & fix',
    desc: 'A complete performance audit covering LCP, CLS, FID, server response, and everything in between — with a clear action plan.',
    tags: ['Lighthouse', 'PageSpeed', 'CDN', 'Image Opt'],
    accent: '#ff6600',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return
    const split = new SplitType(heading, { types: 'words' })

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 60,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 82%' },
      })

      // Animate service rows in
      gsap.from('.service-row', {
        opacity: 0, y: 40,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.service-list', start: 'top 78%' },
      })
    }, sectionRef)

    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section ref={sectionRef} id="services" className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="px-8 md:px-16 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>SERVICES</span>
        </div>
        <h2
          ref={headingRef}
          className="font-display font-black leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
            maxWidth: '14ch',
          }}
        >
          What I Build
          <span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
      </div>

      {/* Service list */}
      <div className="service-list" style={{ borderTop: '1px solid var(--border)' }}>
        {services.map((s, i) => (
          <div
            key={s.num}
            className="service-row group relative overflow-hidden"
            style={{ borderBottom: '1px solid var(--border)', cursor: 'none' }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            data-cursor="link"
          >
            {/* Hover bg sweep */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                background: 'var(--surface)',
                transform: activeIdx === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left center',
                willChange: 'transform',
              }}
            />

            <div className="relative z-10 px-8 md:px-16 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6">
              {/* Number */}
              <span
                className="font-body font-light shrink-0"
                style={{ color: 'var(--muted)', width: '3rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                {s.num}
              </span>

              {/* Title */}
              <div className="flex-1">
                <h3
                  className="font-display font-bold transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)',
                    letterSpacing: '-0.025em',
                    color: activeIdx === i ? 'var(--orange)' : 'var(--ink)',
                  }}
                >
                  {s.title}
                </h3>
              </div>

              {/* Desc — appears on hover */}
              <div
                className="md:w-80 transition-all duration-500"
                style={{
                  opacity: activeIdx === i ? 1 : 0,
                  transform: activeIdx === i ? 'translateX(0)' : 'translateX(16px)',
                }}
              >
                <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {s.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="hidden lg:flex gap-2 shrink-0 flex-wrap justify-end" style={{ maxWidth: '220px' }}>
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-body text-xs px-3 py-1 rounded-full"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <span
                className="font-display shrink-0 text-xl transition-all duration-300"
                style={{
                  color: 'var(--orange)',
                  opacity: activeIdx === i ? 1 : 0,
                  transform: activeIdx === i ? 'translateX(0) rotate(0deg)' : 'translateX(-8px) rotate(-45deg)',
                }}
              >
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
