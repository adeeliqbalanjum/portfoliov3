'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { MagneticButton } from '../ui/MagneticButton'
import { Send, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  'WordPress Performance',
  'WooCommerce Development',
  'Custom Plugin',
  'Site Audit',
  'Full Rebuild',
  'Ongoing Support',
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const split = new SplitType(el, { types: 'words' })

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 80,
        stagger: 0.06,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      gsap.from('.contact-form', {
        opacity: 0, y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
      })

      gsap.from('.contact-info-item', {
        opacity: 0, x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 82%' },
      })
    }, sectionRef)

    return () => { ctx.revert(); split.revert() }
  }, [])

  const toggleService = (s: string) =>
    setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build mailto string
    const subject = `New Project Inquiry — ${selected.join(', ') || 'General'}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nServices: ${selected.join(', ')}\n\nMessage:\n${formData.message}`
    window.location.href = `mailto:adeeliqbalanjum@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="px-8 md:px-16">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="block w-8 h-px" style={{ background: 'var(--orange)' }} />
          <span className="font-body text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            GET IN TOUCH
          </span>
        </div>

        {/* Giant CTA heading */}
        <h2
          ref={headingRef}
          className="font-display font-black leading-none mb-16"
          style={{
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
          }}
        >
          Let&apos;s Build
          {' '}<span style={{ color: 'var(--orange)' }}>Something</span>
          {' '}Great.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact info — left column */}
          <div className="contact-info lg:col-span-2 space-y-10">
            {[
              {
                label: 'Email',
                value: 'adeeliqbalanjum@gmail.com',
                href: 'mailto:adeeliqbalanjum@gmail.com',
              },
              {
                label: 'WhatsApp',
                value: '+92 300 0000000',
                href: 'https://wa.me/923000000000',
              },
              {
                label: 'Location',
                value: 'Lahore, Pakistan\n(Available Worldwide)',
                href: null,
              },
              {
                label: 'Response',
                value: 'Within 24 hours',
                href: null,
              },
            ].map((item) => (
              <div key={item.label} className="contact-info-item">
                <p className="font-body text-xs tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="font-display font-bold transition-colors duration-200 hover:text-[var(--orange)]"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    className="font-display font-bold whitespace-pre-line"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.value}
                  </p>
                )}
              </div>
            ))}

            {/* Availability status */}
            <div
              className="contact-info-item inline-flex items-center gap-3 px-5 py-3 rounded-full"
              style={{ border: '1px solid var(--border)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
              <span className="font-body text-xs tracking-widest" style={{ color: 'var(--ink)' }}>
                ACCEPTING NEW PROJECTS
              </span>
            </div>
          </div>

          {/* Contact form — right columns */}
          <div className="contact-form lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-20">
                <CheckCircle size={48} style={{ color: 'var(--orange)' }} />
                <h3 className="font-display font-black text-3xl" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                  Message Sent!
                </h3>
                <p className="font-body font-light" style={{ color: 'var(--muted)' }}>
                  I&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">
                {/* Service picker */}
                <div className="mb-8">
                  <p className="font-body text-xs tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                    WHAT DO YOU NEED?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        data-cursor="btn"
                        className="px-4 py-2 rounded-full font-body text-xs tracking-wide transition-all duration-200"
                        style={{
                          border: `1px solid ${selected.includes(s) ? 'var(--orange)' : 'var(--border)'}`,
                          background: selected.includes(s) ? 'var(--orange)' : 'transparent',
                          color: selected.includes(s) ? '#fff' : 'var(--muted)',
                          cursor: 'none',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="py-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <label className="font-body text-xs tracking-widest block mb-3" style={{ color: 'var(--muted)' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="John Smith"
                    className="w-full bg-transparent font-display font-bold outline-none placeholder:opacity-20 transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.02em',
                      border: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div className="py-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <label className="font-body text-xs tracking-widest block mb-3" style={{ color: 'var(--muted)' }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="john@company.com"
                    className="w-full bg-transparent font-display font-bold outline-none placeholder:opacity-20"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.02em',
                      border: 'none',
                    }}
                  />
                </div>

                {/* Message */}
                <div className="py-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <label className="font-body text-xs tracking-widest block mb-3" style={{ color: 'var(--muted)' }}>
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent font-body font-light outline-none resize-none placeholder:opacity-25"
                    style={{
                      fontSize: '1rem',
                      color: 'var(--ink)',
                      border: 'none',
                      lineHeight: 1.7,
                    }}
                  />
                </div>

                {/* Submit */}
                <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <MagneticButton
                    className="group flex items-center gap-4 px-8 py-5 rounded-full font-display font-bold tracking-wide transition-all duration-300"
                    style={{
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                    } as React.CSSProperties}
                  >
                    SEND MESSAGE
                    <Send
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
