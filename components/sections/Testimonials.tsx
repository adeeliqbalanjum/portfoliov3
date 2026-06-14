'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Adeel completely transformed our WooCommerce store. Load times dropped from 9 seconds to under 2, and our conversion rate jumped by 34% in the first month. Best investment we made.',
    author: 'Ahmed Al-Rashidi',
    role: 'Managing Director',
    company: 'EESNCO Lighting, Dubai',
    rating: 5,
  },
  {
    quote: 'The custom booking plugin Adeel built for our desert safari operation handles hundreds of bookings daily without a single issue. The admin approval workflow saved us hours every week.',
    author: 'Khalid Hassan',
    role: 'Operations Manager',
    company: 'Desert Safari Dubai, UAE',
    rating: 5,
  },
  {
    quote: 'Working across time zones, Adeel was always responsive and delivered ahead of schedule. The embassy portal looks professional, loads fast, and was built to strict security standards.',
    author: 'Tariq Mehmood',
    role: 'First Secretary',
    company: 'Embassy of Pakistan, Muscat',
    rating: 5,
  },
  {
    quote: 'Our LMS handles over 5,000 students and course enrollment has tripled since Adeel rebuilt the platform. Performance, design, and functionality — all exceeded expectations.',
    author: 'Sara Malik',
    role: 'CEO',
    company: 'Rozi Academy, Pakistan',
    rating: 5,
  },
]

const trustMarkers = [
  { label: '50+', sub: 'Projects Delivered' },
  { label: '100%', sub: 'Client Satisfaction' },
  { label: '4', sub: 'Countries Served' },
  { label: '<48h', sub: 'Response Time' },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const split = new SplitType(el, { types: 'words' })

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 50,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      })

      gsap.from('.trust-marker', {
        opacity: 0, y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-row', start: 'top 85%' },
      })
    }, sectionRef)

    return () => { ctx.revert(); split.revert() }
  }, [])

  // Animate quote change
  useEffect(() => {
    gsap.fromTo('.testimonial-quote',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }, [active])

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(i => (i + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      <div className="px-8 md:px-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            CLIENT WORDS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — heading */}
          <div>
            <h2
              ref={headingRef}
              className="font-display font-black leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
              }}
            >
              Trusted by teams across four continents
              <span style={{ color: 'var(--orange)' }}>.</span>
            </h2>

            {/* Trust markers */}
            <div className="trust-row grid grid-cols-2 gap-6 mt-14">
              {trustMarkers.map((m) => (
                <div
                  key={m.label}
                  className="trust-marker p-6 rounded-xl"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  <p
                    className="font-display font-black leading-none mb-2"
                    style={{
                      fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {m.label}
                  </p>
                  <p className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — testimonial carousel */}
          <div>
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--orange)" style={{ color: 'var(--orange)' }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="testimonial-quote font-display font-bold leading-snug mb-10"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.025em',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                {/* Author */}
                <div>
                  <p
                    className="font-display font-bold"
                    style={{ color: 'var(--ink)', fontSize: '0.95rem' }}
                  >
                    {t.author}
                  </p>
                  <p className="font-body text-xs mt-1 tracking-wide" style={{ color: 'var(--muted)' }}>
                    {t.role} · {t.company}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <MagneticButton
                    onClick={prev}
                    className="w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                      background: 'transparent',
                    } as React.CSSProperties}
                  >
                    <ChevronLeft size={16} />
                  </MagneticButton>
                  <MagneticButton
                    onClick={next}
                    className="w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[var(--orange)]"
                    style={{
                      background: 'var(--orange)',
                      color: '#fff',
                      border: 'none',
                    } as React.CSSProperties}
                  >
                    <ChevronRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex gap-2 mt-6 justify-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-cursor="btn"
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    background: i === active ? 'var(--orange)' : 'var(--border)',
                    border: 'none',
                    cursor: 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
