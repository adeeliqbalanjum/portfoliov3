'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { MagneticButton } from '../ui/MagneticButton'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const bgLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    const sub = subRef.current
    const stats = statsRef.current
    const scrollHint = scrollHintRef.current
    if (!heading || !sub || !stats || !scrollHint) return

    // Split heading into words
    const splitHeading = new SplitType(heading, { types: 'words' })
    const splitSub = new SplitType(sub, { types: 'lines' })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Initial states
      gsap.set([splitHeading.words, splitSub.lines, stats.children, scrollHint], {
        opacity: 0, y: 80,
      })
      gsap.set(bgLineRef.current, { scaleX: 0 })

      tl
        .to(splitHeading.words, {
          opacity: 1, y: 0,
          stagger: 0.06,
          duration: 1.1,
          delay: 0.6,
        })
        .to(splitSub.lines, {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.9,
        }, '-=0.6')
        .to(bgLineRef.current, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
        }, '-=0.8')
        .to(Array.from(stats.children), {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.8,
        }, '-=0.7')
        .to(scrollHint, {
          opacity: 1, y: 0,
          duration: 0.7,
        }, '-=0.4')

      // Scroll-triggered parallax on hero
      gsap.to(heading, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      splitHeading.revert()
      splitSub.revert()
    }
  }, [])

  const scrollDown = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingBottom: 'clamp(3rem, 6vw, 6rem)' }}
    >
      {/* Decorative corner tag */}
      <div className="absolute top-32 right-8 md:right-16 hidden md:block">
        <div className="flex flex-col items-end gap-2">
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            WORDPRESS SPECIALIST
          </span>
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            LAHORE · WORLDWIDE
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 md:px-16 relative z-10">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            PORTFOLIO 2025
          </span>
        </div>

        {/* Hero heading — massive editorial type */}
        <h1
          ref={headingRef}
          className="font-display font-black leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 11.5vw, 12rem)',
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
            maxWidth: '16ch',
          }}
        >
          Crafting Fast,{' '}
          <span style={{ color: 'var(--orange)' }}>Revenue-</span>Generating WordPress
        </h1>

        {/* Horizontal rule */}
        <div
          ref={bgLineRef}
          className="my-8 md:my-10"
          style={{
            height: '1px',
            background: 'var(--border)',
            transformOrigin: 'left center',
          }}
        />

        {/* Sub-row: descriptor + stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p
            ref={subRef}
            className="font-body font-light leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'var(--muted)',
              maxWidth: '38ch',
            }}
          >
            I build performant, beautifully coded WordPress and WooCommerce experiences
            for international clients — from Dubai to London and beyond.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex gap-10 md:gap-16 shrink-0">
            {[
              { n: '50+', l: 'Projects' },
              { n: '3+', l: 'Years' },
              { n: '4', l: 'Countries' },
            ].map((s) => (
              <div key={s.l}>
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: 'var(--ink)', letterSpacing: '-0.03em' }}
                >
                  {s.n}
                </p>
                <p className="font-body text-xs tracking-widest mt-1" style={{ color: 'var(--muted)' }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: CTA + scroll hint */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <MagneticButton
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-display font-bold text-sm tracking-wide transition-colors duration-300"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
              } as React.CSSProperties}
            >
              START A PROJECT
            </MagneticButton>

            <MagneticButton
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-display font-bold text-sm tracking-wide transition-colors duration-300"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--ink)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
              } as React.CSSProperties}
            >
              VIEW WORK
            </MagneticButton>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollHintRef}
            className="hidden md:flex flex-col items-center gap-3 cursor-pointer"
            onClick={scrollDown}
            data-cursor="link"
          >
            <div
              className="w-px overflow-hidden"
              style={{ height: '60px' }}
            >
              <div
                className="w-px h-full"
                style={{
                  background: 'var(--muted)',
                  animation: 'scrollLine 1.8s ease-in-out infinite',
                }}
              />
            </div>
            <ArrowDown size={14} strokeWidth={1.5} style={{ color: 'var(--muted)' }} />
          </div>
        </div>
      </div>

      {/* Large background text watermark */}
      <div
        className="absolute right-0 bottom-16 hidden xl:block font-display font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: '22vw',
          color: 'transparent',
          WebkitTextStroke: '1px var(--border)',
          letterSpacing: '-0.06em',
          opacity: 0.5,
        }}
      >
        DEV
      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
