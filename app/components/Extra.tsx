"use client";
import { useState } from "react";

/* ── PROCESS ────────────────────────────────────────────── */
const steps = [
  { num: "01", title: "Discovery", icon: "💬", desc: "We discuss your project requirements, goals, target audience, and timeline. I ask the right questions so nothing is missed before a line of code is written." },
  { num: "02", title: "Planning", icon: "📋", desc: "I scope the work, set clear milestones, agree on delivery dates, and send a detailed brief. You know exactly what you're getting before we start." },
  { num: "03", title: "Build", icon: "⚙️", desc: "I build your project with progress updates at every milestone. You can review at each stage so there are no surprises at the end." },
  { num: "04", title: "Launch", icon: "🚀", desc: "Full testing across devices and browsers, your revision rounds, final approval, and go-live. Post-launch check-in included with every project." },
];

export function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow scroll-reveal">How I work</div>
          <h2 className="section-h2 scroll-reveal">
            A clear process,<br /><span className="soft">every time</span>
          </h2>
          <p className="subline scroll-reveal" style={{ maxWidth: 480, margin: "14px auto 0" }}>
            No surprises, no scope creep. Every project follows the same clear four-step process.
          </p>
        </div>

        <div className="proc-grid">
          {steps.map((s, i) => (
            <div className="proc-card scroll-reveal" key={s.num}>
              <div className="proc-num">{s.num}</div>
              <div className="proc-icon">{s.icon}</div>
              <h3 className="proc-title">{s.title}</h3>
              <p className="proc-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="proc-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ─────────────────────────────────────────────── */
const skillGroups = [
  {
    label: "WordPress & Builders",
    color: "#ff7a18",
    skills: ["WordPress","Elementor Pro","ACF","WPBakery","Divi","Oxygen","Astra"],
  },
  {
    label: "E-commerce",
    color: "#a855f7",
    skills: ["WooCommerce","Checkout Optimisation","Payment Gateways","Telr","Stripe","Product Management"],
  },
  {
    label: "Custom Development",
    color: "#22c55e",
    skills: ["PHP","Custom Plugins","Custom Post Types","HTML","CSS","JavaScript","Bootstrap"],
  },
  {
    label: "Performance",
    color: "#0ea5e9",
    skills: ["WP Rocket","LiteSpeed Cache","Cloudflare","Core Web Vitals","Image Optimisation","Plugin Auditing"],
  },
  {
    label: "Workflow & Tools",
    color: "#f7d64a",
    skills: ["Figma to WordPress","PSD to WordPress","cPanel","Git","MySQL","Yoast SEO","WPForms"],
  },
];

export function SkillsSection() {
  return (
    <section className="section grey" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow scroll-reveal">Tech stack</div>
          <h2 className="section-h2 scroll-reveal">
            Tools I work with<br /><span className="soft">every day</span>
          </h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-group scroll-reveal" key={g.label}>
              <div className="skill-group-label" style={{ color: g.color }}>{g.label}</div>
              <div className="skill-pills">
                {g.skills.map((s) => (
                  <span key={s} className="skill-pill" style={{ borderColor: g.color + "44", color: g.color, background: g.color + "0e" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────── */
const faqs = [
  { q: "How long does a WordPress website take?", a: "A standard 5-page site typically takes 5–8 business days. Larger projects with custom features — WooCommerce stores, booking plugins, or multi-page builds — take 2–4 weeks depending on scope. I'll give you a specific timeline in the project brief." },
  { q: "What is your hourly rate?", a: "My Upwork rate is $18/hr. For most projects I prefer fixed-price quotes so you know the exact cost upfront. Send me your requirements and I'll send a detailed quote within a few hours." },
  { q: "Do you offer revisions?", a: "Every project includes 2–3 rounds of revisions. I work iteratively so you review at each milestone — by the final delivery there are usually very few changes needed." },
  { q: "What timezone do you work in?", a: "I'm based in Lahore, Pakistan (PKT, UTC+5). I overlap comfortably with UAE business hours, and I'm available for early morning calls with UK and US clients. I respond to messages within a few hours." },
  { q: "Do you work with page builders only, or custom code too?", a: "Both. I work extensively with Elementor Pro and WPBakery for standard builds, and write custom PHP, HTML, CSS, and JavaScript when a project requires functionality beyond what a builder or plugin can provide." },
  { q: "Will I own the site and all files after delivery?", a: "Yes — you get full ownership of the WordPress install, all files, the database, hosting, and domain. I hand over everything cleanly with a walkthrough video if needed." },
  { q: "Do you provide maintenance after launch?", a: "Yes. I offer ongoing maintenance retainers for plugin updates, backups, security monitoring, and content updates. Ask me for details when we discuss your project." },
  { q: "Can you work with my existing WordPress site?", a: "Absolutely. Most of my projects involve improving, fixing, or redesigning existing WordPress sites. Send me access to your site and I'll do a free review before we start." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow scroll-reveal">Common questions</div>
          <h2 className="section-h2 scroll-reveal">
            Everything you need<br /><span className="soft">to know before hiring</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? " faq-item--open" : ""}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-chevron">{open === i ? "−" : "+"}</span>
              </div>
              {open === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>

        <div className="faq-cta scroll-reveal">
          <p>Have a question not listed here?</p>
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">Ask me directly</a>
        </div>
      </div>
    </section>
  );
}
