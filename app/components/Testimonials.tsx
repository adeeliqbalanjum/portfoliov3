const testimonials = [
  {
    quote: "Adeel proved to be an exceptional WordPress developer with strong expertise in custom theme development, plugin integration, and performance optimisation. Delivered a scalable, SEO-friendly site with clean code architecture and flawless responsiveness. Highly professional and efficient in translating complex requirements into robust solutions.",
    name: "Aseel G.",
    role: "Project Manager",
    company: "Verified Upwork Client",
    flag: "🇺🇸",
    rating: 5,
    accent: "#ff7a18",
  },
  {
    quote: "Adeel built us a custom booking plugin that completely transformed how we take reservations. Before him, every booking was manual via WhatsApp. Now everything is automated — customers book, pay, and get confirmation instantly. He understood our specific UAE pricing requirements and delivered exactly what we needed.",
    name: "Ahmed R.",
    role: "Operations Manager",
    company: "Desert Safari Dubai, UAE",
    flag: "🇦🇪",
    rating: 5,
    accent: "#a855f7",
  },
  {
    quote: "Our telehealth site needed to load fast and build patient trust immediately. Adeel understood exactly what healthcare sites require — quick performance, clear provider info, and a booking flow that doesn't confuse people. He delivered a professional platform we're genuinely proud of. Communication throughout was excellent.",
    name: "Dr. Michael R.",
    role: "Founder",
    company: "GetCareMD, USA",
    flag: "🇺🇸",
    rating: 5,
    accent: "#22c55e",
  },
  {
    quote: "We needed our HR services site rebuilt to actually convert visitors into consultation bookings. Adeel restructured our service pages, added proper CTAs throughout, and improved site speed significantly. Clear communicator, delivered on schedule, and the work was clean and professional. Would absolutely hire again.",
    name: "Sarah B.",
    role: "Director",
    company: "Griffin Resources, USA",
    flag: "🇺🇸",
    rating: 5,
    accent: "#0ea5e9",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section grey" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow scroll-reveal">Client feedback</div>
          <h2 className="section-h2 scroll-reveal">
            What clients say<br /><span className="soft">after working together</span>
          </h2>
        </div>

        <div className="tst-grid">
          {testimonials.map((t, i) => (
            <div className="tst-card scroll-reveal" key={i}>
              {/* Stars */}
              <div className="tst-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: t.accent }}>★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="tst-quote">&ldquo;{t.quote}&rdquo;</p>
              {/* Attribution */}
              <div className="tst-meta">
                <div className="tst-avatar" style={{ background: t.accent + "22", color: t.accent }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="tst-name">{t.flag} {t.name}</div>
                  <div className="tst-role">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upwork badge */}
        <div className="tst-badge scroll-reveal">
          <span className="tst-badge-dot" />
          <span>Verified reviews from Upwork and direct clients</span>
          <a href="https://www.upwork.com/freelancers/~015c368d6586ba4860" target="_blank" rel="noopener noreferrer" className="tst-badge-link">
            View Upwork profile →
          </a>
        </div>
      </div>
    </section>
  );
}
