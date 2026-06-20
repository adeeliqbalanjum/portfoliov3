"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  { quote:"Adeel proved to be an exceptional WordPress developer with strong expertise in custom theme development, plugin integration, and performance optimisation. Delivered a scalable, SEO-friendly site with clean code architecture and flawless responsiveness. Highly professional.", name:"Aseel G.", role:"Project Manager", company:"Verified Upwork Client", flag:"🇺🇸", accent:"#ff7a18" },
  { quote:"Adeel built us a custom booking plugin that completely transformed how we take reservations. Before him, every booking was manual via WhatsApp. Now everything is automated — customers book, pay, and get confirmation instantly. He understood our UAE pricing requirements and delivered exactly what we needed.", name:"Ahmed R.", role:"Operations Manager", company:"Desert Safari Dubai, UAE", flag:"🇦🇪", accent:"#a855f7" },
  { quote:"Our telehealth site needed to load fast and build patient trust immediately. Adeel understood exactly what healthcare sites require — quick performance, clear provider info, and a booking flow that doesn't confuse people. Professional platform we're genuinely proud of.", name:"Dr. Michael R.", role:"Founder", company:"GetCareMD, USA", flag:"🇺🇸", accent:"#22c55e" },
  { quote:"We needed our HR services site rebuilt to actually convert visitors into consultation bookings. Adeel restructured our service pages, added proper CTAs throughout, and improved site speed significantly. Clear communicator, delivered on schedule. Would hire again without hesitation.", name:"Sarah B.", role:"Director", company:"Griffin Resources, USA", flag:"🇺🇸", accent:"#0ea5e9" },
  { quote:"Adeel redesigned our travel website from scratch — modern, fast, and mobile-first. He understood the tourism industry and built exactly what our customers needed to feel confident booking with us. Great communication throughout the entire project.", name:"Khalid M.", role:"CEO", company:"Al Emirates Tours, UAE", flag:"🇦🇪", accent:"#f7d64a" },
  { quote:"Our old roofing site was invisible on Google and wasn't converting visitors. Adeel rebuilt it with local SEO structure and got the phone CTA above the fold. Clean work, fast delivery, and he clearly understood what a local service business needs from its website.", name:"James T.", role:"Owner", company:"Hercules Roof System, Texas", flag:"🇺🇸", accent:"#ec4899" },
];

/* Duplicate for seamless loop */
const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice(3), ...testimonials.slice(0,3), ...testimonials.slice(3), ...testimonials.slice(0,3)];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="tst-card">
      <div className="tst-stars">
        {[1,2,3,4,5].map(i => <span key={i} style={{ color:t.accent }}>★</span>)}
      </div>
      <p className="tst-quote">"{t.quote}"</p>
      <div className="tst-meta">
        <div className="tst-avatar" style={{ background:t.accent+"22", color:t.accent }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="tst-name">{t.flag} {t.name}</div>
          <div className="tst-role">{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="tst-section" id="testimonials">
      <div className="tst-container">
        {/* Header */}
        <div className="tst-header">
          <motion.div
            className="eyebrow"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.5 }}
          >
            Client feedback
          </motion.div>
          <motion.h2
            className="tst-heading"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
          >
            What clients say<br/>
            <span className="soft">after working together</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee rows — full width */}
      <div className="tst-marquee-wrap">
        {/* Row 1 — left */}
        <div className="tst-marquee-row">
          <div className="tst-track tst-track--left">
            {row1.map((t,i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
        {/* Row 2 — right */}
        <div className="tst-marquee-row">
          <div className="tst-track tst-track--right">
            {row2.map((t,i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>

      {/* Upwork badge */}
      <div className="tst-container">
        <motion.div
          className="tst-badge"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.2 }}
        >
          <span className="tst-badge-dot" />
          <span>Verified reviews from Upwork and direct clients</span>
          <a
            href="https://www.upwork.com/freelancers/~015c368d6586ba4860"
            target="_blank" rel="noopener noreferrer"
            className="tst-badge-link"
          >
            View Upwork profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
