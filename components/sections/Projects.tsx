'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Desert Safari Booking',
    client: 'dasertsafaridubai.com',
    location: 'Dubai, UAE',
    year: '2024',
    tags: ['Custom Plugin', 'WooCommerce', 'Booking System', 'Telr Payments'],
    desc: 'End-to-end custom WordPress booking plugin with tiered group pricing, admin approval workflow, hotel pickup management, and UAE payment gateway integration.',
    color: '#ff6600',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #0a0a00 100%)',
    emoji: '🏜️',
  },
  {
    num: '02',
    title: 'EESNCO Lighting',
    client: 'eesnco.com',
    location: 'Dubai, UAE',
    year: '2023',
    tags: ['WooCommerce', 'Performance', 'B2B Portal', 'Elementor'],
    desc: 'High-performance WooCommerce store for a commercial lighting distributor serving architects and contractors across the UAE.',
    color: '#f0c040',
    gradient: 'linear-gradient(135deg, #0a0a00 0%, #1a1500 50%, #0a0800 100%)',
    emoji: '💡',
  },
  {
    num: '03',
    title: 'Embassy Portal',
    client: 'Embassy of Pakistan, Muscat',
    location: 'Muscat, Oman',
    year: '2023',
    tags: ['Government', 'WordPress', 'Security', 'Multilingual'],
    desc: 'Secure, accessible government website for the Pakistani Embassy in Oman — built to diplomatic standards with multilingual support and high-availability hosting.',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #000a02 0%, #001a05 50%, #000a02 100%)',
    emoji: '🏛️',
  },
  {
    num: '04',
    title: 'Rozi Academy LMS',
    client: 'Rozi Academy',
    location: 'Pakistan',
    year: '2023',
    tags: ['LearnDash', 'WooCommerce', 'Memberships', 'Performance'],
    desc: 'Learning management platform with subscription memberships, course gating, and a custom student dashboard — serving thousands of enrolled learners.',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #0a0015 0%, #150020 50%, #0a0010 100%)',
    emoji: '📚',
  },
  {
    num: '05',
    title: 'US Supply Chain',
    client: 'ussupplychaincorp.com',
    location: 'United States',
    year: '2024',
    tags: ['Partnership Page', 'HTML Widget', 'Dark/Light Mode', 'GSAP'],
    desc: 'Premium partnership & collaboration page with a self-contained animated widget — dark/light mode toggle, scroll animations, and zero external dependencies.',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #00020a 0%, #000515 50%, #00020a 100%)',
    emoji: '🔗',
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    if (heading) {
      const split = new SplitType(heading.querySelector('h2')!, { types: 'words' })
      gsap.from(split.words, {
        opacity: 0, y: 50,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 82%' },
      })
    }

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const cards = track.querySelectorAll('.project-card')
    const totalShift = track.scrollWidth - container.offsetWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalShift,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalShift + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Subtle parallax per card
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.card-inner'),
          { scale: 0.94 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${totalShift}`,
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" style={{ background: 'var(--paper)' }}>
      {/* Section header — above the pin */}
      <div ref={headingRef} className="px-8 md:px-16 pt-24 pb-12" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
              <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>SELECTED WORK</span>
            </div>
            <h2
              className="font-display font-black leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
              }}
            >
              Case Studies
            </h2>
          </div>
          <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: '30ch' }}>
            Scroll horizontally to explore recent projects — each one a unique challenge solved with clean, performant code.
          </p>
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div
        ref={containerRef}
        className="h-screen overflow-hidden"
        style={{ position: 'relative' }}
      >
        <div
          ref={trackRef}
          className="h-scroll-track h-full"
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingLeft: '8vw', paddingRight: '8vw', width: 'max-content' }}
        >
          {projects.map((p) => (
            <div
              key={p.num}
              className="project-card shrink-0"
              style={{ width: 'clamp(320px, 38vw, 560px)', height: '72vh' }}
            >
              <div
                className="card-inner w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between relative"
                style={{ background: p.gradient }}
              >
                {/* Emoji / visual */}
                <div
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                  style={{ fontSize: '10rem', opacity: 0.12 }}
                >
                  {p.emoji}
                </div>

                {/* Accent line */}
                <div className="absolute left-8 top-8" style={{ width: '32px', height: '2px', background: p.color }} />

                {/* Top meta */}
                <div className="relative z-10 p-8 flex items-start justify-between">
                  <div>
                    <span className="font-body text-xs tracking-widest block mb-2" style={{ color: 'rgba(240,236,228,0.4)' }}>
                      {p.num} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <span className="font-body text-xs tracking-widest block" style={{ color: 'rgba(240,236,228,0.4)' }}>
                      {p.location} · {p.year}
                    </span>
                  </div>
                  <ArrowUpRight size={20} style={{ color: p.color, opacity: 0.7 }} />
                </div>

                {/* Bottom content */}
                <div className="relative z-10 p-8">
                  <p className="font-body text-xs tracking-widest mb-3" style={{ color: 'rgba(240,236,228,0.4)' }}>
                    {p.client}
                  </p>
                  <h3
                    className="font-display font-bold leading-tight mb-4"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)',
                      color: '#f0ece4',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-body font-light text-sm leading-relaxed mb-6"
                    style={{ color: 'rgba(240,236,228,0.55)', maxWidth: '36ch' }}
                  >
                    {p.desc}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-body text-xs px-3 py-1.5 rounded-full"
                        style={{
                          border: `1px solid ${p.color}40`,
                          color: p.color,
                          background: `${p.color}0d`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll progress */}
        <div
          className="absolute bottom-8 left-8 md:left-16 flex items-center gap-4"
          style={{ zIndex: 10 }}
        >
          <div className="flex gap-1.5">
            {projects.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: '6px', height: '6px',
                  background: 'var(--border)',
                }}
              />
            ))}
          </div>
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            DRAG TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  )
}
