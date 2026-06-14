'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  { label: 'Background', value: 'Superior University Lahore — B.IT 2024' },
  { label: 'Experience', value: 'Nuovo Studios · EESNCO · Embassy of Pakistan · Rozi Academy' },
  { label: 'Clients', value: 'UAE · United Kingdom · United States · Pakistan' },
  { label: 'Specialties', value: 'WordPress, WooCommerce, Custom Plugins, Performance' },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const credentialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = statementRef.current
    if (!el) return
    const split = new SplitType(el, { types: 'lines' })

    const ctx = gsap.context(() => {
      // Wrap lines in overflow:hidden divs for clean clip
      split.lines?.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      gsap.from(split.lines, {
        y: '105%',
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      // Credential rows stagger in
      if (credentialsRef.current) {
        const rows = credentialsRef.current.querySelectorAll('.cred-row')
        gsap.from(rows, {
          opacity: 0, y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: credentialsRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)

    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="px-8 md:px-16">
        {/* Section tag */}
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>ABOUT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — avatar placeholder */}
          <div>
            <div
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ background: 'var(--surface)', maxWidth: '440px' }}
            >
              {/* Portrait gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 60% 30%, #ff660044 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, #33333380 0%, transparent 60%)',
                }}
              />
              {/* Abstract initials */}
              <div
                className="absolute inset-0 flex items-center justify-center font-display font-black"
                style={{
                  fontSize: '8rem',
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--border)',
                  letterSpacing: '-0.05em',
                }}
              >
                AI
              </div>

              {/* Experience badge */}
              <div
                className="absolute bottom-6 right-6 px-5 py-4 rounded-xl backdrop-blur-sm"
                style={{ background: 'rgba(8,8,8,0.7)', border: '1px solid var(--border)' }}
              >
                <p className="font-display font-bold text-2xl leading-none" style={{ color: 'var(--ink)' }}>3+</p>
                <p className="font-body text-xs tracking-widest mt-1" style={{ color: 'var(--muted)' }}>YEARS EXP</p>
              </div>
            </div>
          </div>

          {/* Right — positioning */}
          <div className="flex flex-col justify-center">
            <h2
              ref={statementRef}
              className="font-display font-black leading-tight mb-12"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                letterSpacing: '-0.035em',
                color: 'var(--ink)',
              }}
            >
              I don&apos;t just build websites.
              I build systems that{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>perform</em>,
              {' '}convert, and scale — without the agency markup.
            </h2>

            <p
              className="font-body font-light leading-relaxed mb-12"
              style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '44ch' }}
            >
              With over 3 years of building WordPress experiences for clients in Dubai,
              London, and New York, I bring agency-level craft to every project —
              with direct communication, faster turnaround, and no middlemen.
            </p>

            {/* Credentials table */}
            <div ref={credentialsRef} style={{ borderTop: '1px solid var(--border)' }}>
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="cred-row flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span
                    className="font-body text-xs tracking-widest shrink-0"
                    style={{ color: 'var(--muted)', minWidth: '120px' }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="font-body text-sm leading-relaxed"
                    style={{ color: 'var(--ink)' }}
                  >
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
