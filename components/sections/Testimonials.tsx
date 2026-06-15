'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const T = [
  { q:'Adeel completely transformed our WooCommerce store. Load times dropped from 9 seconds to under 2, and our conversion rate jumped 34% in the first month.', a:'Ahmed Al-Rashidi', r:'Managing Director', c:'EESNCO Lighting, Dubai', rating:5 },
  { q:'The custom booking plugin handles hundreds of desert safari bookings daily without a single issue. The admin approval workflow saved us hours every week.', a:'Khalid Hassan', r:'Operations Manager', c:'Desert Safari Dubai, UAE', rating:5 },
  { q:'Working across time zones, Adeel was always responsive and delivered ahead of schedule. The embassy portal looks professional and was built to strict security standards.', a:'Tariq Mehmood', r:'First Secretary', c:'Embassy of Pakistan, Muscat', rating:5 },
  { q:'Our LMS handles 5,000+ students and course enrollment tripled since Adeel rebuilt the platform. Performance, design, and functionality — all exceeded expectations.', a:'Sara Malik', r:'CEO', c:'Rozi Academy, Pakistan', rating:5 },
]

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const qRef = useRef<HTMLQuoteElement>(null)
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tst-heading', { opacity:0, y:50, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger:'.tst-heading', start:'top 82%' } })
      gsap.from('.tst-card', { opacity:0, y:60, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger:'.tst-card', start:'top 80%' } })
    }, secRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!qRef.current) return
    gsap.fromTo(qRef.current, { opacity:0, y:16 }, { opacity:1, y:0, duration:0.45, ease:'power2.out' })
  }, [idx])

  const prev = () => setIdx(i => (i - 1 + T.length) % T.length)
  const next = () => setIdx(i => (i + 1) % T.length)
  const t = T[idx]

  return (
    <section ref={secRef} style={{
      borderTop:'1px solid var(--border)', background:'var(--surface)',
      padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'3rem' }}>
        <span style={{ display:'block', width:28, height:1, background:'var(--accent)' }} />
        <span style={{ fontFamily:'Inter', fontSize:'0.65rem', letterSpacing:'0.12em',
          color:'var(--muted)', textTransform:'uppercase' }}>Client Words</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'3rem' }}>
        <h2 className="tst-heading font-display" style={{ fontWeight:800, letterSpacing:'-0.04em',
          lineHeight:0.95, fontSize:'clamp(2rem,4.5vw,5rem)', color:'var(--ink)', maxWidth:'18ch' }}>
          Trusted by teams across four continents<span style={{ color:'var(--accent)' }}>.</span>
        </h2>

        <div className="tst-card" style={{
          background:'var(--card)', borderRadius:'1.25rem',
          padding:'clamp(2rem,4vw,3.5rem)', border:'1px solid var(--border)',
        }}>
          <div style={{ display:'flex', gap:'4px', marginBottom:'2rem' }}>
            {Array.from({ length:t.rating }).map((_,i) => (
              <Star key={i} size={14} fill="var(--accent)" style={{ color:'var(--accent)' }} />
            ))}
          </div>

          <blockquote ref={qRef} className="font-display" style={{
            fontWeight:700, fontSize:'clamp(1.1rem,2vw,1.6rem)',
            letterSpacing:'-0.025em', color:'var(--ink)', lineHeight:1.35, marginBottom:'2rem',
          }}>
            &ldquo;{t.q}&rdquo;
          </blockquote>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <p className="font-display" style={{ fontWeight:700, fontSize:'0.95rem', color:'var(--ink)' }}>{t.a}</p>
              <p style={{ fontFamily:'Inter', fontSize:'0.7rem', color:'var(--muted)', marginTop:'0.2rem', letterSpacing:'0.04em' }}>
                {t.r} · {t.c}
              </p>
            </div>
            <div style={{ display:'flex', gap:'0.6rem' }}>
              {[prev, next].map((fn, i) => (
                <button key={i} onClick={fn} style={{
                  width:40, height:40, borderRadius:'50%', cursor:'none',
                  border:'1px solid var(--border)',
                  background: i===1 ? 'var(--accent)' : 'transparent',
                  color: i===1 ? '#fff' : 'var(--muted)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {i===0 ? <ChevronLeft size={15}/> : <ChevronRight size={15}/>}
                </button>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display:'flex', gap:'6px', marginTop:'1.5rem' }}>
            {T.map((_,i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                height:6, width: i===idx ? 22 : 6,
                borderRadius:9999, border:'none', cursor:'none',
                background: i===idx ? 'var(--accent)' : 'var(--border)',
                transition:'width 0.3s, background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
