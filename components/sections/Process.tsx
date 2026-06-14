'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    phase: 'Discovery',
    title: 'Audit & Define',
    desc: 'We start with a deep dive into your current stack, goals, and gaps. I audit your existing site (performance, code quality, UX) and map a clear scope before a single line is written.',
    duration: '1–2 days',
  },
  {
    num: '02',
    phase: 'Strategy',
    title: 'Plan & Architect',
    desc: 'A technical blueprint tailored to your business — plugin architecture, database schema, caching layers, third-party integrations. No surprises down the line.',
    duration: '1–3 days',
  },
  {
    num: '03',
    phase: 'Build',
    title: 'Develop & Iterate',
    desc: 'Clean, documented code shipped in milestone phases with staging previews. You see progress continuously — not just at the finish line.',
    duration: '1–4 weeks',
  },
  {
    num: '04',
    phase: 'QA',
    title: 'Test & Harden',
    desc: 'Cross-browser, cross-device, load-tested, and security-hardened. Core Web Vitals benchmarked before handoff. Nothing ships with red flags.',
    duration: '2–4 days',
  },
  {
    num: '05',
    phase: 'Launch',
    title: 'Deploy & Support',
    desc: 'Zero-downtime deployment with rollback plan. Post-launch monitoring, documentation, and ongoing support packages available.',
    duration: 'Ongoing',
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

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

      // Each step card animates in
      gsap.from('.process-step', {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 75%',
        },
      })

      // Progress line draws in
      gsap.from('.process-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="px-8 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
              <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
                PROCESS
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-display font-black leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
              }}
            >
              How We Work
              <span style={{ color: 'var(--orange)' }}>.</span>
            </h2>
          </div>
          <p
            className="font-body font-light text-sm leading-relaxed"
            style={{ color: 'var(--muted)', maxWidth: '32ch' }}
          >
            A structured, transparent process that keeps projects on time, on budget,
            and free of last-minute surprises.
          </p>
        </div>

        {/* Progress connector line — desktop only */}
        <div className="process-line hidden lg:block h-px mb-16" style={{ background: 'var(--border)' }} />

        {/* Steps grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px" style={{ border: '1px solid var(--border)' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step group p-8 relative overflow-hidden transition-colors duration-300 hover:bg-[var(--surface)]"
              style={{ background: 'var(--card-bg)' }}
            >
              {/* Hover accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background: 'var(--orange)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left center',
                }}
              />

              <span
                className="font-display font-black block mb-6 leading-none"
                style={{
                  fontSize: '3rem',
                  color: 'var(--surface)',
                  letterSpacing: '-0.04em',
                  WebkitTextStroke: '1px var(--border)',
                }}
              >
                {step.num}
              </span>

              <div className="mb-2">
                <span
                  className="font-body text-xs tracking-widest"
                  style={{ color: 'var(--orange)' }}
                >
                  {step.phase}
                </span>
              </div>

              <h3
                className="font-display font-bold mb-4 transition-colors duration-300 group-hover:text-[var(--orange)]"
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {step.title}
              </h3>

              <p
                className="font-body font-light text-sm leading-relaxed mb-6"
                style={{ color: 'var(--muted)' }}
              >
                {step.desc}
              </p>

              <div
                className="flex items-center gap-2 pt-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span className="block w-4 h-px" style={{ background: 'var(--orange)' }} />
                <span
                  className="font-body text-xs tracking-widest"
                  style={{ color: 'var(--muted)' }}
                >
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
