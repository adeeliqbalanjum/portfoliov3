const services = [
  {
    icon: "⚡",
    title: "WordPress Website",
    sub: "Build from scratch",
    desc: "Full WordPress site built with Elementor Pro — from Figma/PSD or starting fresh. Mobile-responsive, SEO-ready, and fast.",
    includes: ["Up to 8 pages","Mobile responsive","Contact forms","Basic SEO setup","2 rounds of revisions"],
    from: "$150",
    accent: "#ff7a18",
  },
  {
    icon: "🛒",
    title: "WooCommerce Store",
    sub: "E-commerce setup",
    desc: "Full online store with product listings, checkout optimisation, payment gateway, and order management.",
    includes: ["Product setup","Payment gateway","Cart & checkout","Order emails","Mobile responsive"],
    from: "$200",
    accent: "#a855f7",
  },
  {
    icon: "🔌",
    title: "Custom Plugin",
    sub: "PHP development",
    desc: "Bespoke WordPress functionality — booking systems, custom post types, admin dashboards, or any feature no plugin covers.",
    includes: ["Custom PHP code","Admin panel","Email notifications","WordPress integration","Clean & documented"],
    from: "$300",
    accent: "#22c55e",
  },
  {
    icon: "🚀",
    title: "Speed Optimisation",
    sub: "Core Web Vitals fix",
    desc: "Cut your load time from 6–8 seconds to under 2. Cache config, image optimisation, plugin audit, and Cloudflare setup.",
    includes: ["Cache configuration","Image compression","Plugin audit","Cloudflare setup","PageSpeed report"],
    from: "$99",
    accent: "#f7d64a",
  },
  {
    icon: "🔧",
    title: "Bug Fix & Maintenance",
    sub: "Fast turnaround",
    desc: "WordPress broken, plugins conflicting, site down? I diagnose and fix fast — most bugs resolved within 24 hours.",
    includes: ["Issue diagnosis","Plugin conflict fix","Elementor issues","WooCommerce bugs","Post-fix report"],
    from: "$75",
    accent: "#0ea5e9",
  },
  {
    icon: "🎨",
    title: "Elementor Pro Builds",
    sub: "Page & template work",
    desc: "Landing pages, popups, headers, footers, and full page templates built precisely to your design in Elementor Pro.",
    includes: ["Pixel-perfect build","Custom widgets","Popups & forms","Mobile optimised","Revision included"],
    from: "$120",
    accent: "#ec4899",
  },
];

export function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow scroll-reveal">What I offer</div>
          <h2 className="section-h2 scroll-reveal">
            Services built around<br /><span className="soft">your business goals</span>
          </h2>
          <p className="subline scroll-reveal" style={{ maxWidth: 500, margin: "14px auto 0" }}>
            Every engagement includes clear scope, regular updates, and clean work that lasts.
          </p>
        </div>

        <div className="svc-grid">
          {services.map((s) => (
            <div className="svc-card scroll-reveal" key={s.title}>
              <div className="svc-top">
                <div className="svc-icon" style={{ background: s.accent + "18" }}>
                  <span>{s.icon}</span>
                </div>
                <div>
                  <p className="svc-from">From <strong style={{ color: s.accent }}>{s.from}</strong></p>
                </div>
              </div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-sub">{s.sub}</p>
              <p className="svc-desc">{s.desc}</p>
              <ul className="svc-list">
                {s.includes.map((item) => (
                  <li key={item}>
                    <span style={{ color: s.accent }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="svc-cta" style={{ borderColor: s.accent + "44", color: s.accent }}>
                Get a quote →
              </a>
            </div>
          ))}
        </div>

        <div className="svc-note scroll-reveal">
          <span>🔒</span>
          <p>All projects include a clear brief, milestone updates, and a post-launch check-in. No hidden fees.</p>
        </div>
      </div>
    </section>
  );
}
