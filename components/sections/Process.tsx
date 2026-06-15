'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n:'01', phase:'Discovery', title:'Audit & Define',    dur:'1–2 days',  desc:'Deep dive into your goals, stack, and gaps. Full audit before a single line is written.' },
  { n:'02', phase:'Strategy',  title:'Plan & Architect',  dur:'1–3 days',  desc:'Technical blueprint: plugin architecture, database schema, caching layers, integrations.' },
  { n:'03', phase:'Build',     title:'Develop & Iterate', dur:'1–4 weeks', desc:'Clean, documented code in milestone phases with staging previews. You see progress continuously.' },
  { n:'04', phase:'QA',        title:'Test & Harden',     dur:'2–4 days',  desc:'Cross-browser, load-tested, security-hardened, Core Web Vitals benchmarked before handoff.' },
  { n:'05', phase:'Launch',    title:'Deploy & Support',  dur:'Ongoing',   desc:'Zero-downtime deployment with rollback plan. Post-launch monitoring and support retainers available.' },
]

export function Process() {
  const secRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-heading', { opacity:0, y:50, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger:'.proc-heading', start:'top 82%' } })
      gsap.from('.proc-card', { opacity:0, y:50, stagger:0.1, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger:'.proc-grid', start:'top 78%' } })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} id="process" style={{
      borderTop:'1px solid var(--border)',
      padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
    }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'2rem', marginBottom:'clamp(3rem,6vw,5rem)' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
            <span style={{ display:'block', width:28, height:1, background:'var(--accent)' }} />
            <span style={{ fontFamily:'Inter', fontSize:'0.65rem', letterSpacing:'0.12em', color:'var(--muted)', textTransform:'uppercase' }}>Process</span>
          </div>
          <h2 className="proc-heading font-display" style={{ fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.95,
            fontSize:'clamp(2.2rem,5.5vw,6rem)', color:'var(--ink)' }}>
            How We Work<span style={{ color:'var(--accent)' }}>.</span>
          </h2>
        </div>
        <p style={{ fontFamily:'Inter', fontWeight:300, fontSize:'0.9rem', color:'var(--muted)',
          maxWidth:'32ch', lineHeight:1.7 }}>
          Structured. Transparent. No last-minute surprises.
        </p>
      </div>

      <div className="proc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1px', background:'var(--border)' }}>
        {STEPS.map(s => (
          <div key={s.n} className="proc-card" style={{ background:'var(--surface)', padding:'2rem 1.8rem',
            transition:'background 0.3s' }}
            onMouseEnter={e=>(e.currentTarget.style.background='var(--card)')}
            onMouseLeave={e=>(e.currentTarget.style.background='var(--surface)')}>
            <div style={{ marginBottom:'1.5rem' }}>
              <span className="font-display" style={{ fontWeight:800, fontSize:'3.5rem',
                letterSpacing:'-0.04em', color:'var(--border)', WebkitTextStroke:'1px var(--border)' }}>{s.n}</span>
            </div>
            <p style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.1em',
              color:'var(--accent)', textTransform:'uppercase', marginBottom:'0.4rem' }}>{s.phase}</p>
            <h3 className="font-display" style={{ fontWeight:700, fontSize:'1.1rem',
              letterSpacing:'-0.02em', color:'var(--ink)', marginBottom:'0.75rem' }}>{s.title}</h3>
            <p style={{ fontFamily:'Inter', fontWeight:300, fontSize:'0.8rem',
              color:'var(--muted)', lineHeight:1.65, marginBottom:'1.2rem' }}>{s.desc}</p>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem',
              paddingTop:'1rem', borderTop:'1px solid var(--border)' }}>
              <span style={{ display:'block', width:16, height:1, background:'var(--accent)' }} />
              <span style={{ fontFamily:'Inter', fontSize:'0.62rem', letterSpacing:'0.08em', color:'var(--muted)' }}>{s.dur}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
