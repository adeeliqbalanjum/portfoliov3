"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { icon:"⚡", title:"WordPress Website", sub:"From scratch or redesign", desc:"Full WordPress site built with Elementor Pro — from Figma/PSD or fresh design. Mobile-responsive, fast, and SEO-ready from day one.", includes:["Up to 8 pages","Mobile responsive","Contact forms","On-page SEO","2 revision rounds"], from:"$150", accent:"#ff7a18", glow:"rgba(255,122,24,.18)" },
  { icon:"🛒", title:"WooCommerce Store", sub:"Full e-commerce setup", desc:"Complete online store with product setup, optimised checkout, payment gateway integration, and order management configured.", includes:["Product setup","Payment gateway","Cart optimisation","Order emails","Mobile responsive"], from:"$200", accent:"#a855f7", glow:"rgba(168,85,247,.18)" },
  { icon:"🔌", title:"Custom Plugin", sub:"PHP & WordPress dev", desc:"Bespoke WordPress functionality — booking systems, custom post types, admin dashboards, or anything no existing plugin covers.", includes:["Custom PHP code","Admin panel","Email notifications","WP integration","Documented code"], from:"$300", accent:"#22c55e", glow:"rgba(34,197,94,.18)" },
  { icon:"🚀", title:"Speed Optimisation", sub:"Core Web Vitals fix", desc:"Cut your load time from 6–8 seconds to under 2. Cache config, image optimisation, plugin audit, Cloudflare setup, and PageSpeed report.", includes:["Cache configuration","Image compression","Plugin audit","Cloudflare setup","PageSpeed report"], from:"$99", accent:"#f7d64a", glow:"rgba(247,214,74,.22)" },
  { icon:"🔧", title:"Bug Fix & Maintenance", sub:"Fast turnaround", desc:"WordPress broken, plugins conflicting, site down? I diagnose and fix fast — most issues resolved within 24 hours with a clear report.", includes:["Issue diagnosis","Plugin conflicts","Elementor fixes","WooCommerce bugs","Post-fix report"], from:"$75", accent:"#0ea5e9", glow:"rgba(14,165,233,.18)" },
  { icon:"🎨", title:"Elementor Pro Builds", sub:"Pages & templates", desc:"Landing pages, popups, headers, footers, and full Elementor templates built precisely to your design — pixel-perfect on every device.", includes:["Pixel-perfect build","Custom widgets","Popups & forms","Mobile optimised","Revision included"], from:"$120", accent:"#ec4899", glow:"rgba(236,72,153,.18)" },
];

const container = { hidden:{}, show:{ transition:{ staggerChildren:.08 } } };
const item      = { hidden:{ y:32, opacity:0 }, show:{ y:0, opacity:1, transition:{ type:"spring", stiffness:260, damping:24 } } };

export function ServicesSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section className="svc-section" id="services">
      {/* Background accent */}
      <div className="svc-bg-blob" aria-hidden="true" />

      <div className="svc-container">
        {/* Header */}
        <div className="svc-header">
          <motion.div
            className="eyebrow"
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.5 }}
          >
            What I offer
          </motion.div>
          <motion.h2
            className="svc-heading"
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.6, delay:.1 }}
          >
            Services built around<br />
            <span className="svc-heading-soft">your business goals</span>
          </motion.h2>
          <motion.p
            className="subline"
            style={{ maxWidth:480, margin:"16px auto 0" }}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ duration:.6, delay:.2 }}
          >
            Every project includes clear scope, regular updates, and clean code that lasts.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="svc-grid"
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {services.map((s) => (
            <motion.div className="svc-card" key={s.title} variants={item}>
              {/* Glow on hover */}
              <div className="svc-card-inner">
                {/* Top accent bar */}
                <div className="svc-accent-bar" style={{ background:s.accent }} />

                <div className="svc-card-body">
                  {/* Icon + price row */}
                  <div className="svc-top-row">
                    <div className="svc-icon-wrap" style={{ background:s.glow }}>
                      <span className="svc-icon">{s.icon}</span>
                    </div>
                    <div className="svc-price-badge" style={{ color:s.accent, background:s.glow }}>
                      from <strong>{s.from}</strong>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-sub">{s.sub}</p>
                  <p className="svc-desc">{s.desc}</p>

                  {/* Includes */}
                  <ul className="svc-includes">
                    {s.includes.map(i => (
                      <li key={i}>
                        <span style={{ color:s.accent }}>✓</span>
                        {i}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="svc-cta-btn"
                    style={{
                      borderColor: s.accent + "55",
                      color: s.accent,
                      background: s.glow,
                    }}
                  >
                    Get a quote →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="svc-note"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:.3 }}
        >
          <span>🔒</span>
          <span>All projects include a clear brief, milestone updates, and a post-launch check-in. No hidden fees.</span>
        </motion.div>
      </div>
    </section>
  );
}
