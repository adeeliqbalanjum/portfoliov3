'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Send, CheckCircle, Phone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = ['WordPress Performance','WooCommerce Dev','Custom Plugin','Speed Audit','Full Rebuild','Support Retainer']

export function Contact() {
  const secRef   = useRef<HTMLElement>(null)
  const h2Ref    = useRef<HTMLHeadingElement>(null)
  const [sel, setSel] = useState<string[]>([])
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!h2Ref.current) return
    const split = new SplitType(h2Ref.current, { types: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity:0, y:80, stagger:0.05, duration:1.1, ease:'power4.out',
        scrollTrigger:{ trigger:h2Ref.current, start:'top 80%' },
      })
      gsap.from('.cta-meta', { opacity:0, y:30, stagger:0.08, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger:'.cta-meta', start:'top 82%' } })
      gsap.from('.cta-form', { opacity:0, y:50, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger:'.cta-form', start:'top 82%' } })
    }, secRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  const toggle = (s:string) => setSel(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s])

  const submit = (e:React.FormEvent) => {
    e.preventDefault()
    const subj = `Project Inquiry — ${sel.join(', ') || 'General'}`
    const body  = `Name: ${form.name}\nEmail: ${form.email}\nServices: ${sel.join(', ')}\n\nMessage:\n${form.message}`
    window.location.href = `mailto:adeeliqbalanjum@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section ref={secRef} id="contact" style={{
      borderTop:'1px solid var(--border)',
      padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2.5rem' }}>
        <span style={{ display:'block', width:28, height:1, background:'var(--accent)' }} />
        <span style={{ fontFamily:'Inter', fontSize:'0.65rem', letterSpacing:'0.12em',
          color:'var(--muted)', textTransform:'uppercase' }}>Kontakt</span>
      </div>

      {/* ── "Let's work together! Adeel" — THE SIGNATURE ELEMENT ── */}
      <h2 ref={h2Ref} className="work-heading" style={{ color:'var(--ink)', marginBottom:'clamp(3rem,6vw,5rem)' }}>
        Let&apos;s work{' '}
        <br className="hidden md:block"/>
        together!{' '}
        {/* Inline avatar pill — like digitalists.at with Trudi's photo */}
        <span className="inline-pill" style={{
          width:'clamp(3.5rem,8vw,9rem)', height:'clamp(3.5rem,8vw,9rem)',
          background:'var(--accent)', verticalAlign:'middle',
          margin:'0 0.1em',
        }}>
          <span className="font-display" style={{ fontWeight:800,
            fontSize:'clamp(1rem,2.5vw,2.8rem)', color:'#fff', letterSpacing:'-0.04em' }}>AI</span>
        </span>
        {' '}
        <span style={{ color:'var(--accent)' }}>Adeel</span>
      </h2>

      {/* Two columns: info left, form right */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,6vw,6rem)', alignItems:'start' }}>

        {/* LEFT */}
        <div>
          <p className="cta-meta" style={{ fontFamily:'Inter', fontWeight:300,
            fontSize:'clamp(0.9rem,1.2vw,1.05rem)', color:'var(--muted)',
            lineHeight:1.75, marginBottom:'2.5rem', maxWidth:'38ch' }}>
            Ready to build something fast, beautiful, and conversion-focused?
            Book a free 30-minute consultation or drop a message below.
          </p>

          {/* Call CTA — "Ein 30-minütiges Beratungsgespräch" style */}
          <a href="tel:+923000000000" className="cta-meta" style={{
            display:'inline-flex', alignItems:'center', gap:'0.75rem',
            padding:'0.9rem 1.8rem', borderRadius:'9999px',
            background:'var(--accent)', color:'#fff', textDecoration:'none', cursor:'none',
            fontFamily:'Syne,sans-serif', fontWeight:700,
            fontSize:'0.78rem', letterSpacing:'0.08em', textTransform:'uppercase',
            marginBottom:'2.5rem',
          }}>
            <Phone size={14}/> Call Now — Free Consult
          </a>

          {/* Contact details */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            {[
              { l:'Email',    v:'adeeliqbalanjum@gmail.com', href:'mailto:adeeliqbalanjum@gmail.com' },
              { l:'WhatsApp', v:'+92 300 000 0000',          href:'https://wa.me/923000000000' },
              { l:'Location', v:'Lahore, Pakistan · Worldwide', href:null },
              { l:'Response', v:'Within 24 hours',            href:null },
            ].map(r => (
              <div key={r.l} className="cta-meta">
                <p style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.1em',
                  color:'var(--muted)', textTransform:'uppercase', marginBottom:'0.3rem' }}>{r.l}</p>
                {r.href
                  ? <a href={r.href} style={{ fontFamily:'Syne,sans-serif', fontWeight:700,
                      fontSize:'clamp(0.85rem,1.3vw,1.1rem)', color:'var(--ink)', textDecoration:'none',
                      letterSpacing:'-0.01em', cursor:'none',
                      transition:'color 0.2s' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='var(--ink)')}
                  >{r.v}</a>
                  : <p className="font-display" style={{ fontWeight:700,
                      fontSize:'clamp(0.85rem,1.3vw,1.1rem)', color:'var(--ink)', letterSpacing:'-0.01em' }}>{r.v}</p>
                }
              </div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="cta-meta" style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem',
            padding:'0.55rem 1.1rem', borderRadius:'9999px', border:'1px solid var(--border)', marginTop:'2rem' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e',
              animation:'pulse 2s infinite' }} />
            <span style={{ fontFamily:'Inter', fontSize:'0.62rem', letterSpacing:'0.1em',
              color:'var(--ink)', textTransform:'uppercase' }}>Accepting New Projects</span>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="cta-form">
          {sent ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
              gap:'1.5rem', padding:'4rem 0', textAlign:'center' }}>
              <CheckCircle size={48} style={{ color:'var(--accent)' }} />
              <h3 className="font-display" style={{ fontWeight:800, fontSize:'2rem',
                letterSpacing:'-0.03em', color:'var(--ink)' }}>Message Sent!</h3>
              <p style={{ fontFamily:'Inter', fontWeight:300, color:'var(--muted)' }}>
                I'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              {/* Service tags */}
              <div style={{ marginBottom:'2rem' }}>
                <p style={{ fontFamily:'Inter', fontSize:'0.62rem', letterSpacing:'0.1em',
                  color:'var(--muted)', textTransform:'uppercase', marginBottom:'0.75rem' }}>
                  What do you need?
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                  {SERVICES.map(s => (
                    <button key={s} type="button" onClick={() => toggle(s)} style={{
                      fontFamily:'Inter', fontSize:'0.65rem', letterSpacing:'0.06em',
                      padding:'0.4rem 1rem', borderRadius:'9999px', cursor:'none',
                      border:`1px solid ${sel.includes(s) ? 'var(--accent)' : 'var(--border)'}`,
                      background: sel.includes(s) ? 'var(--accent)' : 'transparent',
                      color: sel.includes(s) ? '#fff' : 'var(--muted)',
                      transition:'all 0.2s',
                    }}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              {[
                { id:'name',    label:'Your Name',    type:'text',  ph:'John Smith',          req:true  },
                { id:'email',   label:'Your Email',   type:'email', ph:'john@company.com',    req:true  },
              ].map(f => (
                <div key={f.id} style={{ padding:'1.2rem 0', borderTop:'1px solid var(--border)' }}>
                  <label style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.1em',
                    color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:'0.6rem' }}>
                    {f.label}
                  </label>
                  <input type={f.type} required={f.req} placeholder={f.ph}
                    value={(form as Record<string,string>)[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    style={{
                      width:'100%', background:'transparent', border:'none', outline:'none',
                      fontFamily:'Syne,sans-serif', fontWeight:700,
                      fontSize:'clamp(1.1rem,2.2vw,1.8rem)',
                      letterSpacing:'-0.02em', color:'var(--ink)', cursor:'none',
                    }} />
                </div>
              ))}

              <div style={{ padding:'1.2rem 0', borderTop:'1px solid var(--border)' }}>
                <label style={{ fontFamily:'Inter', fontSize:'0.6rem', letterSpacing:'0.1em',
                  color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:'0.6rem' }}>
                  Project Details
                </label>
                <textarea rows={3} placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                  style={{
                    width:'100%', background:'transparent', border:'none', outline:'none', resize:'none',
                    fontFamily:'Inter', fontWeight:300, fontSize:'0.95rem',
                    color:'var(--ink)', lineHeight:1.7, cursor:'none',
                  }} />
              </div>

              <div style={{ paddingTop:'1.5rem', borderTop:'1px solid var(--border)' }}>
                <button type="submit" style={{
                  display:'inline-flex', alignItems:'center', gap:'0.75rem',
                  padding:'1rem 2rem', borderRadius:'9999px', cursor:'none',
                  background:'var(--ink)', color:'var(--paper)', border:'none',
                  fontFamily:'Syne,sans-serif', fontWeight:700,
                  fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase',
                  transition:'opacity 0.2s',
                }}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
                onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                  Send Message <Send size={13} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  )
}
