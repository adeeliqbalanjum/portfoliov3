'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Words that reveal one-by-one as you scroll — just like digitalists.at
const WORDS = [
  { text: 'I',            accent: false },
  { text: 'craft',        accent: false },
  { text: 'fast,',        accent: false },
  { text: 'revenue—',     accent: true  },
  { text: 'generating',   accent: false },
  { text: 'WordPress',    accent: true  },
  { text: 'experiences',  accent: false },
  { text: 'for',          accent: false },
  { text: 'global',       accent: false },
  { text: 'clients.',     accent: false },
]

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const taglineRef  = useRef<HTMLDivElement>(null)
  const counterRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section  = sectionRef.current
    const wordEls  = gsap.utils.toArray<HTMLElement>('.hero-word')
    const tagline  = taglineRef.current
    const counter  = counterRef.current
    if (!section || !wordEls.length) return

    // All words start invisible
    gsap.set(wordEls, { opacity: 0, y: 44 })
    if (tagline)  gsap.set(tagline,  { opacity: 0 })
    if (counter)  gsap.set(counter,  { opacity: 0 })

    // Entrance: first word pops in on load
    gsap.to(wordEls[0], { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.6 })

    // Pin the section; reveal remaining words as you scroll
    const pinEnd = `+=${wordEls.length * 180}`

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.9,
        start: 'top top',
        end: pinEnd,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          gsap.to([tagline, counter], { opacity: 1, duration: 0.4 })
        },
        onEnterBack: () => {
          gsap.to([tagline, counter], { opacity: 0, duration: 0.2 })
        },
      },
    })

    // Reveal words 1..N over the scroll timeline
    wordEls.slice(1).forEach((w, i) => {
      tl.to(w, { opacity: 1, y: 0, ease: 'none', duration: 1 / (wordEls.length - 1) }, i / (wordEls.length - 1))
    })

    // Tagline + counter fade in after words done
    tl.to([tagline, counter], { opacity: 1, duration: 0.3, ease: 'none' }, '>')

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} id="hero" style={{
      minHeight: '100vh', background: 'var(--paper)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,8vw,8rem) clamp(1.5rem,5vw,4rem) clamp(2rem,4vw,3.5rem)',
    }}>
      {/* Top‐right badge */}
      <div style={{
        position: 'absolute', top: 'clamp(5rem,9vw,8rem)', right: 'clamp(1.5rem,5vw,4rem)',
        textAlign: 'right',
      }}>
        <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
          color: 'var(--muted)', textTransform: 'uppercase', lineHeight: 1.8 }}>
          WordPress Specialist<br/>Lahore, Pakistan
        </p>
      </div>

      {/* Top‐left: section label */}
      <div style={{ position: 'absolute', top: 'clamp(5rem,9vw,8rem)', left: 'clamp(1.5rem,5vw,4rem)',
        display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em',
          color: 'var(--muted)', textTransform: 'uppercase' }}>Portfolio 2025</span>
      </div>

      {/* WORD STACK — the hero */}
      <div style={{ marginBottom: '2rem' }}>
        {WORDS.map((w, i) => (
          <span
            key={i}
            className={`hero-word${w.accent ? ' accent' : ''}`}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Tagline */}
        <div ref={taglineRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          <span className="font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.18em',
            color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            fast.clean.revenue
          </span>
        </div>

        {/* Stats */}
        <div ref={counterRef} style={{ display: 'flex', gap: '2.5rem' }}>
          {[['50+','Projects'],['3+','Years'],['4','Countries']].map(([n,l]) => (
            <div key={l} style={{ textAlign: 'right' }}>
              <p className="font-display" style={{ fontWeight: 800,
                fontSize: 'clamp(1.5rem,2.5vw,2.4rem)', letterSpacing: '-0.04em',
                color: 'var(--ink)', lineHeight: 1 }}>{n}</p>
              <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.1em',
                color: 'var(--muted)', marginTop: '0.25rem', textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint line */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 1, height: 48, background: 'var(--border)', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0, background: 'var(--accent)',
            animation: 'scrollHint 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollHint {
          0%   { transform: translateY(-100%) }
          50%  { transform: translateY(0) }
          100% { transform: translateY(100%) }
        }
      `}</style>
    </section>
  )
}
