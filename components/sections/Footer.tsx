'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLS = [
  {
    heading: 'Development',
    links: ['WordPress Performance','WooCommerce Dev','Custom Plugins','Elementor & Themes','Speed Audits'],
  },
  {
    heading: 'Solutions',
    links: ['E-Commerce Builds','Booking Systems','LMS Platforms','Government Portals','Site Rebuilds'],
  },
  {
    heading: 'Quick Links',
    links: ['About','Work','Process','Contact','GitHub'],
  },
]

const MARQUEE = ['WordPress','✦','WooCommerce','✦','Performance','✦','Custom Plugins','✦','Elementor','✦','UAE','✦','UK','✦','USA','✦','Pakistan','✦','Speed','✦']

export function Footer() {
  const secRef = useRef<HTMLElement>(null)
  const bigRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigRef.current, { opacity:0, y:80, duration:1.1, ease:'power3.out',
        scrollTrigger:{ trigger:bigRef.current, start:'top 88%' } })
      gsap.from('.ft-col', { opacity:0, y:30, stagger:0.08, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger:'.ft-cols', start:'top 88%' } })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={secRef} style={{ borderTop:'1px solid var(--border)', background:'var(--paper)' }}>

      {/* Marquee band */}
      <div style={{ overflow:'hidden', borderBottom:'1px solid var(--border)', padding:'1rem 0' }}>
        <div className="marquee-inner">
          {[...MARQUEE,...MARQUEE].map((item,i) => (
            <span key={i} style={{ fontFamily:'Inter', fontSize:'0.62rem', letterSpacing:'0.14em',
              color:'var(--muted)', padding:'0 1.2rem', textTransform:'uppercase' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Giant name */}
      <div ref={bigRef} style={{
        padding:'clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,4rem)',
        borderBottom:'1px solid var(--border)',
      }}>
        <p style={{ fontFamily:'Inter', fontSize:'0.62rem', letterSpacing:'0.12em',
          color:'var(--muted)', textTransform:'uppercase', marginBottom:'1rem' }}>
          Lahore, Pakistan · Working Worldwide
        </p>
        <div className="font-display" style={{
          fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.88,
          fontSize:'clamp(3.5rem,12vw,13rem)', color:'var(--ink)',
          userSelect:'none',
        }}>
          ADEEL<span style={{ color:'var(--accent)' }}>.</span>
        </div>
        <div className="font-display" style={{
          fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.88, marginTop:'0.15em',
          fontSize:'clamp(1.5rem,5vw,5.5rem)', color:'var(--muted)',
          userSelect:'none',
        }}>
          IQBAL ANJUM
        </div>
      </div>

      {/* Link columns */}
      <div className="ft-cols" style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',
        gap:'3rem', padding:'3rem clamp(1.5rem,5vw,4rem)',
        borderBottom:'1px solid var(--border)',
      }}>
        {COLS.map(col => (
          <div key={col.heading} className="ft-col">
            <p style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.12em',
              color:'var(--muted)', textTransform:'uppercase', marginBottom:'1rem' }}>
              {col.heading}
            </p>
            <ul style={{ listStyle:'none' }}>
              {col.links.map(l => (
                <li key={l} style={{ marginBottom:'0.55rem' }}>
                  <a href="#" style={{ fontFamily:'Inter', fontWeight:300, fontSize:'0.82rem',
                    color:'var(--muted)', textDecoration:'none', cursor:'none',
                    transition:'color 0.2s' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='var(--ink)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter / CTA */}
        <div className="ft-col">
          <p style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.12em',
            color:'var(--muted)', textTransform:'uppercase', marginBottom:'1rem' }}>
            Start a Project
          </p>
          <a href="mailto:adeeliqbalanjum@gmail.com" style={{
            fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.82rem',
            color:'var(--ink)', textDecoration:'none', display:'block',
            marginBottom:'0.5rem', cursor:'none',
            transition:'color 0.2s',
          }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--ink)')}>
            adeeliqbalanjum@gmail.com
          </a>
          <a href="https://upwork.com" target="_blank" rel="noreferrer" style={{
            fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.82rem',
            color:'var(--accent)', textDecoration:'none', cursor:'none',
          }}>
            Upwork → Hire Me
          </a>
        </div>
      </div>

      {/* Bottom bar — "The scroll goes on not.done.yet" */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem',
        padding:'1.5rem clamp(1.5rem,5vw,4rem)',
      }}>
        <p style={{ fontFamily:'Inter', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.04em' }}>
          © {new Date().getFullYear()} Adeel Iqbal Anjum
        </p>

        {/* digitalists.at signature line */}
        <p className="font-display" style={{
          fontWeight:700, fontSize:'0.7rem', letterSpacing:'0.1em',
          color:'var(--muted)', textTransform:'uppercase',
        }}>
          The scroll goes on&nbsp;&nbsp;
          <span style={{ color:'var(--accent)' }}>not.done.yet</span>
        </p>

        <div style={{ display:'flex', gap:'1.5rem' }}>
          {['Privacy','Terms','Sitemap'].map(l => (
            <a key={l} href="#" style={{ fontFamily:'Inter', fontSize:'0.62rem',
              color:'var(--muted)', textDecoration:'none', cursor:'none',
              transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--ink)')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
