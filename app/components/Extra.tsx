"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════ */
const steps = [
  { num:"01", icon:"💬", title:"Discovery", desc:"We discuss your project requirements, goals, target audience, and timeline. I ask the right questions so nothing is missed before a single line of code is written." },
  { num:"02", icon:"📋", title:"Planning",  desc:"I scope the work, set clear milestones, agree on delivery dates, and send a detailed brief. You know exactly what you are getting before we start." },
  { num:"03", icon:"⚙️", title:"Build",     desc:"I build your project with progress updates at every milestone. You can review at each stage so there are absolutely no surprises at the end." },
  { num:"04", icon:"🚀", title:"Launch",    desc:"Full testing across devices and browsers, your revision rounds, final approval, and go-live. A post-launch check-in is included with every project." },
];

export function ProcessSection() {
  return (
    <section className="proc-section" id="process">
      <div className="proc-container">
        <div className="proc-header">
          <motion.div
            className="eyebrow"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.5 }}
          >
            How I work
          </motion.div>
          <motion.h2
            className="proc-heading"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
          >
            A clear process,<br /><span className="soft">every single time</span>
          </motion.h2>
          <motion.p
            className="subline" style={{ maxWidth:480, margin:"14px auto 0" }}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ delay:.2 }}
          >
            No surprises, no scope creep. Every project follows the same four-step process.
          </motion.p>
        </div>

        <div className="proc-grid">
          {steps.map((s,i) => (
            <motion.div
              key={s.num}
              className="proc-card"
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }}
              transition={{ duration:.6, delay:i*.12, type:"spring", stiffness:220, damping:22 }}
            >
              {/* Step number — large gradient */}
              <div className="proc-num-bg">{s.num}</div>
              <div className="proc-icon">{s.icon}</div>
              <h3 className="proc-title">{s.title}</h3>
              <p className="proc-desc">{s.desc}</p>
              {/* Connector */}
              {i < steps.length-1 && <div className="proc-connector" aria-hidden="true">→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SKILLS — infinite marquee rows
═══════════════════════════════════════════════════ */
const skillRows = [
  { speed:"28s", dir:"left",  pills:[
    { label:"WordPress",        color:"#ff7a18" },
    { label:"Elementor Pro",    color:"#ff7a18" },
    { label:"ACF",              color:"#ff7a18" },
    { label:"WPBakery",         color:"#ff7a18" },
    { label:"Divi",             color:"#ff7a18" },
    { label:"Oxygen Builder",   color:"#ff7a18" },
    { label:"Astra Theme",      color:"#ff7a18" },
    { label:"GeneratePress",    color:"#ff7a18" },
  ]},
  { speed:"36s", dir:"right", pills:[
    { label:"WooCommerce",           color:"#a855f7" },
    { label:"Checkout Optimisation", color:"#a855f7" },
    { label:"Payment Gateways",      color:"#a855f7" },
    { label:"Telr",                  color:"#a855f7" },
    { label:"Stripe",                color:"#a855f7" },
    { label:"Product Management",    color:"#a855f7" },
    { label:"Order Management",      color:"#a855f7" },
  ]},
  { speed:"32s", dir:"left",  pills:[
    { label:"PHP",              color:"#22c55e" },
    { label:"Custom Plugins",   color:"#22c55e" },
    { label:"Custom Post Types",color:"#22c55e" },
    { label:"HTML",             color:"#22c55e" },
    { label:"CSS",              color:"#22c55e" },
    { label:"JavaScript",       color:"#22c55e" },
    { label:"Bootstrap",        color:"#22c55e" },
    { label:"REST API",         color:"#22c55e" },
  ]},
  { speed:"40s", dir:"right", pills:[
    { label:"WP Rocket",          color:"#0ea5e9" },
    { label:"LiteSpeed Cache",    color:"#0ea5e9" },
    { label:"Cloudflare",         color:"#0ea5e9" },
    { label:"Core Web Vitals",    color:"#0ea5e9" },
    { label:"Image Optimisation", color:"#0ea5e9" },
    { label:"Plugin Auditing",    color:"#0ea5e9" },
    { label:"GTmetrix",           color:"#0ea5e9" },
  ]},
  { speed:"30s", dir:"left",  pills:[
    { label:"Figma to WordPress", color:"#ec4899" },
    { label:"PSD to WordPress",   color:"#ec4899" },
    { label:"cPanel",             color:"#ec4899" },
    { label:"Git",                color:"#ec4899" },
    { label:"MySQL",              color:"#ec4899" },
    { label:"Yoast SEO",          color:"#ec4899" },
    { label:"WPForms",            color:"#ec4899" },
    { label:"SMTP",               color:"#ec4899" },
  ]},
];

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header-wrap">
        <motion.div
          className="eyebrow"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.5 }}
        >
          Tech stack
        </motion.div>
        <motion.h2
          className="skills-heading"
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
        >
          Tools I use<br /><span className="soft">every day</span>
        </motion.h2>
      </div>

      {/* Marquee rows */}
      <div className="skills-marquee-wrap">
        {skillRows.map((row,ri) => (
          <div key={ri} className="skills-row">
            <div
              className="skills-track"
              style={{
                animationDuration: row.speed,
                animationDirection: row.dir === "right" ? "reverse" : "normal",
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...row.pills, ...row.pills].map((p,pi) => (
                <span
                  key={pi}
                  className="skills-pill"
                  style={{
                    borderColor: p.color+"44",
                    color: p.color,
                    background: p.color+"0e",
                  }}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════ */
const faqs = [
  { q:"How long does a WordPress website take?",        a:"A standard 5-page site typically takes 5–8 business days. Larger projects with custom features — WooCommerce stores, booking plugins, or multi-page builds — take 2–4 weeks. I provide a specific timeline in the project brief before we start." },
  { q:"What is your rate?",                             a:"My Upwork rate is $18/hr. For most projects I prefer fixed-price quotes so you know the exact cost upfront. Send me your requirements and I'll respond with a detailed quote within a few hours." },
  { q:"Do you offer revisions?",                        a:"Every project includes 2–3 rounds of revisions. I work iteratively so you review at each milestone — by the final delivery very few changes are typically needed." },
  { q:"What timezone do you work in?",                  a:"I'm based in Lahore, Pakistan (PKT, UTC+5). I overlap comfortably with UAE business hours and am available for early calls with UK and US clients. Messages are answered within a few hours." },
  { q:"Do you work with page builders or write code?",  a:"Both. I work extensively with Elementor Pro and WPBakery for standard builds, and write custom PHP, HTML, CSS, and JavaScript when a project needs functionality beyond what a builder provides." },
  { q:"Will I own the site and all files?",             a:"Yes. You get full ownership of the WordPress install, all files, the database, hosting, and domain. I hand over everything cleanly with a walkthrough video if needed." },
  { q:"Do you provide maintenance after launch?",       a:"Yes. I offer ongoing maintenance retainers covering plugin updates, backups, security monitoring, and content updates. Ask me for details when we discuss your project." },
  { q:"Can you work with my existing WordPress site?",  a:"Absolutely. Most of my work involves improving, fixing, or redesigning existing WordPress sites. Share your site and I'll do a free review before we begin." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <motion.div
            className="eyebrow"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.5 }}
          >
            Common questions
          </motion.div>
          <motion.h2
            className="faq-heading"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
          >
            Everything you need to know<br /><span className="soft">before hiring</span>
          </motion.h2>
        </div>

        <div className="faq-list">
          {faqs.map((f,i) => (
            <motion.div
              key={i}
              className={`faq-item${open===i?" faq-item--open":""}`}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-20px" }}
              transition={{ delay:i*.05 }}
            >
              <button
                className="faq-q"
                onClick={() => setOpen(open===i ? null : i)}
                aria-expanded={open===i}
              >
                <span className="faq-q-num">0{i+1}</span>
                <span className="faq-q-text">{f.q}</span>
                <motion.span
                  className="faq-chevron"
                  animate={{ rotate: open===i ? 45 : 0 }}
                  transition={{ duration:.25, ease:"easeInOut" }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div
                    key="content"
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:"auto", opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:.3, ease:[.4,0,.2,1] }}
                    style={{ overflow:"hidden" }}
                  >
                    <p className="faq-a">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="faq-cta"
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.2 }}
        >
          <p>Have a question not listed here?</p>
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">Ask me directly</a>
        </motion.div>
      </div>
    </section>
  );
}
