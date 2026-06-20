"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import { TextRevealByWord } from "./components/TextReveal";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";
import { TextRotate } from "./components/TextRotate";
import { ServicesSection } from "./components/Services";
import { TestimonialsSection } from "./components/Testimonials";
import { ProcessSection, SkillsSection, FAQSection } from "./components/Extra";

gsap.registerPlugin(ScrollTrigger);

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  ["Desert Safari Dubai",  "Custom booking plugin — tiered pricing, admin approvals & Telr gateway.", "shape-a"],
  ["Embassy of Pakistan",  "Official government website with real-time passport tracking system.",    "shape-b"],
  ["Figma to WordPress",   "Pixel-perfect Elementor builds from designer files for agency clients.",  "thumbs"],
  ["WooCommerce Store",    "Full e-commerce setup for a Dubai lighting company.",                      "shape-c"],
  ["Custom Plugin",        "Tiered pricing, admin approvals, automated emails & WhatsApp fields.",    "shape-d"],
  ["Landing Pages",        "High-converting Elementor pages for UAE, UK & USA clients.",              "shape-a"],
  ["Website Rebuilds",     "Full redesigns turning outdated sites into fast, modern platforms.",      "shape-b"],
];

const stats = [
  ["3+",      "years",    "Hands-on WordPress, WooCommerce & Elementor Pro for international clients."],
  ["50+",     "projects", "Business, e-commerce, education & custom WordPress builds delivered."],
  ["20+",     "builds",   "Figma & PSD designs converted into responsive, pixel-perfect WordPress sites."],
  ["6s→1.8s", "speed",    "Load-time cuts via cache, image optimisation, plugin auditing & Core Web Vitals."],
];

const parallaxItems: ParallaxItem[] = [
  { label:"Desert Safari Dubai",  sub:"Custom Booking Plugin",  gradient:"linear-gradient(135deg,rgba(255,122,24,.96),rgba(255,214,74,.82))" },
  { label:"Embassy of Pakistan",  sub:"Government Website",     gradient:"linear-gradient(135deg,rgba(168,85,247,.92),rgba(34,197,94,.50))" },
  { label:"Figma → WordPress",    sub:"20+ Agency Builds",      gradient:"linear-gradient(135deg,rgba(34,197,94,.92),rgba(230,255,230,.88))" },
  { label:"WooCommerce Store",    sub:"E-commerce Dubai",       gradient:"linear-gradient(135deg,rgba(255,122,24,.88),rgba(168,85,247,.60))" },
  { label:"Custom Plugins",       sub:"Plugin Development",     gradient:"linear-gradient(135deg,rgba(11,11,11,.88),rgba(255,122,24,.48))" },
  { label:"Landing Pages",        sub:"UAE · UK · USA Clients", gradient:"linear-gradient(135deg,rgba(247,214,74,.92),rgba(255,122,24,.72))" },
  { label:"6s → 1.8s Speed",     sub:"Core Web Vitals",        gradient:"linear-gradient(135deg,rgba(34,197,94,.86),rgba(11,11,11,.75))" },
];

const contactServices = ["website","WooCommerce store","redesign","custom plugin","speed fix","landing page"];

export default function Home() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const mainRef     = useRef<HTMLElement>(null);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ lerp:0.1, smoothWheel:true });
    const rafCb = (t: number) => lenis.raf(t * 1000);
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(rafCb); lenis.destroy(); };
  }, []);

  /* GSAP: hero + stagger animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults:{ ease:"power3.out" } })
        .from(".ha-pill",    { y:-20, opacity:0, duration:.55 })
        .from(".ha-h1",      { y:48,  opacity:0, duration:.80 }, "-=.30")
        .from(".ha-sub",     { y:28,  opacity:0, duration:.70 }, "-=.52")
        .from(".ha-proof",   { y:16,  opacity:0, duration:.55 }, "-=.40")
        .from(".ha-actions", { y:20,  opacity:0, duration:.60 }, "-=.44")
        .from(".ha-hire",    { y:14,  opacity:0, duration:.50 }, "-=.40")
        .from(".ha-showcase",{ y:36,  opacity:0, duration:.80, scale:.98 }, "-=.48");

      /* FlowArt rotation */
      document.querySelectorAll<HTMLElement>(".flow-section:not(.hero) .flow-inner")
        .forEach(inner => {
          gsap.fromTo(inner,
            { rotationZ:4, rotationX:1.5, opacity:.55, transformOrigin:"bottom left" },
            { rotationZ:0, rotationX:0, opacity:1, ease:"power2.out",
              scrollTrigger:{ trigger:inner.parentElement, start:"top 88%", end:"top 22%", scrub:.7 } }
          );
        });

      /* Project cards stagger */
      gsap.from(".project", {
        y:52, opacity:0, duration:.70, stagger:.09, ease:"power3.out",
        scrollTrigger:{ trigger:".project-cards", start:"top 80%" }
      });

      /* Stats */
      gsap.from(".stat", {
        y:36, opacity:0, duration:.65, stagger:.10, ease:"power3.out",
        scrollTrigger:{ trigger:".stats-grid", start:"top 80%" }
      });

      /* Contact */
      gsap.from(".contact-anim", {
        y:28, opacity:0, duration:.70, stagger:.12, ease:"power3.out",
        scrollTrigger:{ trigger:"#contact", start:"top 78%" }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* Scroll-reveal IO */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold:.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Pointer glow + portrait tilt */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth)  * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gradientRef.current?.style.setProperty("--mx", `${x}%`);
      gradientRef.current?.style.setProperty("--my", `${y}%`);
      if (portraitRef.current) {
        const r  = portraitRef.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - .5;
        const py = (e.clientY - r.top)  / r.height - .5;
        if (e.clientY < window.innerHeight * .9) {
          portraitRef.current.style.setProperty("--ry", `${(px*8).toFixed(2)}deg`);
          portraitRef.current.style.setProperty("--rx", `${(-py*8).toFixed(2)}deg`);
        }
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <main ref={mainRef}>
      <div className="noise" />

      {/* NAV */}
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#home">AI</a>
        <a href="/portfolio">Portfolio</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#contact" className="nav-cta">Hire Me</a>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero flow-section" id="home">
        <div className="gradient-stage" ref={gradientRef} aria-hidden="true">
          <div className="gblob orange" />
          <div className="gblob purple" />
          <div className="gblob green" />
          <div className="pointer-glow" />
        </div>

        <div className="hero-inner flow-inner">
          <div className="status-pill ha-pill">
            <strong>Available</strong> for new projects — UAE · UK · USA
          </div>

          <h1 className="ha-h1">
            <span className="soft">WordPress developer</span>{" "}
            building fast, high&#8209;impact websites
          </h1>

          <p className="subline ha-sub">
            I build and redesign WordPress &amp; WooCommerce websites for businesses in the UAE, UK,
            and USA — from Figma to pixel-perfect, conversion-ready sites.
          </p>

          {/* Social proof */}
          <div className="hero-proof ha-proof">
            <span className="proof-stars">★★★★★</span>
            <span className="proof-text">50+ projects · 3+ years · UAE, UK &amp; USA clients</span>
          </div>

          {/* Primary CTAs */}
          <div className="actions ha-actions">
            <a className="btn btn-dark" href="#contact">✦ Hire me now</a>
            <a className="btn btn-ghost" href="/portfolio">See my work →</a>
          </div>

          {/* Quick hire links */}
          <div className="hire-links ha-hire">
            <a
              href="https://www.upwork.com/freelancers/~015c368d6586ba4860"
              target="_blank" rel="noopener noreferrer"
              className="hire-link hire-link--upwork"
            >
              <span>↗</span> Hire on Upwork
            </a>
            <a
              href="https://wa.me/923054829714?text=Hi%20Adeel%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20WordPress%20project."
              target="_blank" rel="noopener noreferrer"
              className="hire-link hire-link--whatsapp"
            >
              <span>💬</span> WhatsApp me
            </a>
          </div>

          {/* Showcase */}
          <div className="showcase ha-showcase" aria-label="Portfolio preview">
            <div className="showcase-haze" />
            <div className="strip" aria-hidden="true">
              {cards.map(([title, desc, shape]) => (
                <article className="site-card" key={title as string}>
                  <div className="browser"><i /><i /><i /></div>
                  <div className="site-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    {shape === "thumbs"
                      ? <div className="thumb-row"><span /><span /><span /></div>
                      : <div className={`site-shape ${shape}`} />}
                  </div>
                </article>
              ))}
            </div>
            <div className="portrait-card" ref={portraitRef}>
              <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" className="portrait-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <ServicesSection />

      {/* ══ ABOUT ══ */}
      <section className="section grey flow-section" id="about">
        <div className="container stats-layout flow-inner">
          <aside className="about-card">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>
                A WordPress Developer based in Lahore, Pakistan — specialising in building, redesigning, and
                improving websites for international clients in UAE, UK, and USA. Elementor Pro, WooCommerce,
                custom plugins, and Figma-to-WordPress builds, always delivered on time.
              </p>
              <p style={{ marginTop:12, color:"rgba(255,255,255,.5)", fontSize:13, fontWeight:700 }}>
                🕐 PKT (UTC+5) · Responds within 2–4 hours
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:24 }}>
              <a href="mailto:adeeliqbalajum@gmail.com" className="about-button">
                Work with me{" "}
                <span className="mini-avatar"><img src={portraitDataUrl} alt="Adeel" /></span>
              </a>
              <div style={{ display:"flex", gap:8 }}>
                <a href="https://www.upwork.com/freelancers/~015c368d6586ba4860" target="_blank" rel="noopener noreferrer" className="about-social-btn">Upwork ↗</a>
                <a href="https://linkedin.com/in/adeelatwork/" target="_blank" rel="noopener noreferrer" className="about-social-btn">LinkedIn ↗</a>
                <a href="https://wa.me/923054829714" target="_blank" rel="noopener noreferrer" className="about-social-btn about-social-btn--wa">WhatsApp 💬</a>
              </div>
            </div>
          </aside>

          <div className="stats-grid">
            {stats.map(([value, label, text]) => (
              <div className="stat" key={value as string}>
                <div className="stat-top">
                  <strong>{value}</strong><span>{label}</span>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <ProcessSection />

      {/* ══ ZOOM PARALLAX ══ */}
      <ZoomParallax items={parallaxItems} />

      {/* ══ PROJECTS ══ */}
      <section className="section flow-section" id="projects">
        <div className="flow-inner">
          <div className="projects-head">
            <div className="eyebrow scroll-reveal">Real work, real clients</div>
          </div>
          <TextRevealByWord text="Projects I've built and delivered" />
          <div className="container projects-head" style={{ paddingTop:0 }}>
            <div className="project-board">
              <div className="project-cards">
                {[
                  { num:"01", cat:"Dubai Tourism",  title:"Desert Safari Dubai",  slug:"desert-safari-dubai",  desc:"Custom booking plugin — tiered AED pricing, admin approvals, WhatsApp fields, and Telr payment gateway." },
                  { num:"02", cat:"Healthcare USA", title:"GetCareMD",            slug:"getcaremd",            desc:"24/7 telehealth platform with provider credentials, service pages, and a conversion-focused booking flow." },
                  { num:"03", cat:"Legal",          title:"Pacific Valor Law",    slug:"pacific-valor-law",    desc:"VA disability attorney site for overseas veterans — free case review CTA and VA-accredited credentials." },
                  { num:"04", cat:"Education",      title:"7 Sky Consultant",     slug:"7sky-consultant",      desc:"Study abroad agency showcasing a 98% visa success rate and 94% scholarship placement record." },
                  { num:"05", cat:"Finance USA",    title:"Seva Wealth",          slug:"seva-wealth",          desc:"Wealth management site with Calendly integration, philosophy-driven design, and trust-heavy credentials." },
                  { num:"06", cat:"Services USA",   title:"Hercules Roof System", slug:"hercules-roof-system", desc:"Local SEO-focused roofing site for DFW Texas — phone CTA above fold, insurance page, before/after gallery." },
                ].map(({ num, cat, title, slug, desc }) => (
                  <a key={num} href={`/portfolio/${slug}`} className="project project--linked">
                    <small>{num} — {cat}</small>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <span className="project-arrow">View case study →</span>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ textAlign:"center", marginTop:36 }}>
              <a href="/portfolio" className="btn btn-dark" style={{ display:"inline-flex" }}>
                View all 19 projects →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <TestimonialsSection />

      {/* ══ SKILLS ══ */}
      <SkillsSection />

      {/* ══ FAQ ══ */}
      <FAQSection />

      {/* ══ CONTACT ══ */}
      <section className="section grey flow-section" id="contact">
        <div className="container projects-head flow-inner">
          <div className="eyebrow contact-anim">Let&apos;s build together</div>

          <h2 className="contact-anim contact-h2">
            Have a WordPress{" "}
            <span className="contact-rotate">
              <TextRotate texts={contactServices} interval={2200} />
            </span>{" "}
            ready to build?
          </h2>

          <p className="subline contact-anim" style={{ maxWidth:520, margin:"16px auto 0" }}>
            Send a message and I&apos;ll respond within a few hours — usually much faster.
            Based in Lahore (UTC+5), available for UAE, UK, and US clients.
          </p>

          {/* Hire buttons */}
          <div className="contact-hire-row contact-anim">
            <a
              href="https://www.upwork.com/freelancers/~015c368d6586ba4860"
              target="_blank" rel="noopener noreferrer"
              className="hire-btn hire-btn--upwork"
            >
              <span className="hire-btn-icon">🔗</span>
              <span><strong>Hire on Upwork</strong><br />View full profile &amp; reviews</span>
            </a>
            <a
              href="https://wa.me/923054829714?text=Hi%20Adeel%2C%20I%27d%20like%20to%20discuss%20a%20WordPress%20project."
              target="_blank" rel="noopener noreferrer"
              className="hire-btn hire-btn--wa"
            >
              <span className="hire-btn-icon">💬</span>
              <span><strong>WhatsApp me</strong><br />+92 305 4829714</span>
            </a>
            <a
              href="mailto:adeeliqbalajum@gmail.com"
              className="hire-btn hire-btn--email"
            >
              <span className="hire-btn-icon">✉️</span>
              <span><strong>Email directly</strong><br />adeeliqbalajum@gmail.com</span>
            </a>
          </div>

          {/* Availability */}
          <div className="contact-avail contact-anim">
            <span className="avail-dot" />
            <span>Available for new projects · Response time: under 4 hours</span>
          </div>

          {/* Socials */}
          <div className="contact-socials contact-anim">
            <a href="https://linkedin.com/in/adeelatwork/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>·</span>
            <a href="https://www.upwork.com/freelancers/~015c368d6586ba4860" target="_blank" rel="noopener noreferrer">Upwork</a>
            <span>·</span>
            <a href="https://github.com/adeeliqbalanjum" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>·</span>
            <a href="https://wa.me/923054829714" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
