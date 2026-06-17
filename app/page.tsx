"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { TextRevealByWord } from "./components/TextReveal";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";
import { TextRotate } from "./components/TextRotate";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ──────────────────────────────────────────────────── */
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  ["Desert Safari Dubai",  "Custom booking plugin — tiered pricing, admin approvals and payment integration.", "shape-a"],
  ["Embassy of Pakistan",  "Official government website with real-time passport tracking system.",             "shape-b"],
  ["Figma to WordPress",   "Pixel-perfect Elementor builds from designer files for agency clients.",           "thumbs"],
  ["WooCommerce Store",    "Full e-commerce setup for Dubai lighting company — products, orders, payments.",   "shape-c"],
  ["Booking Plugin",       "Tiered pricing, admin approvals, automated emails and WhatsApp fields.",           "shape-d"],
  ["Landing Pages",        "High-converting Elementor pages for UAE, UK and USA businesses.",                  "shape-a"],
  ["Website Rebuilds",     "Full redesigns turning outdated sites into fast, modern platforms.",               "shape-b"],
];

const stats = [
  ["3+",      "years",    "Hands-on WordPress, WooCommerce and Elementor Pro experience for international clients."],
  ["50+",     "projects", "Business, e-commerce, education and custom WordPress builds delivered."],
  ["20+",     "builds",   "Figma and PSD designs converted into responsive, pixel-perfect WordPress websites."],
  ["6s→1.8s", "speed",    "Load-time improvements through cache, image, plugin and Core Web Vitals optimisation."],
];

/* ZoomParallax items — use your real screenshot URLs here later */
const parallaxItems: ParallaxItem[] = [
  { label: "Desert Safari Dubai",  sub: "Custom Booking Plugin",      gradient: "linear-gradient(135deg,rgba(255,122,24,.96),rgba(255,214,74,.82))"   },
  { label: "Embassy of Pakistan",  sub: "Government Website",         gradient: "linear-gradient(135deg,rgba(168,85,247,.92),rgba(34,197,94,.50))"    },
  { label: "Figma → WordPress",    sub: "20+ Agency Builds",          gradient: "linear-gradient(135deg,rgba(34,197,94,.92),rgba(255,255,230,.88))"   },
  { label: "WooCommerce Store",    sub: "E-commerce Dubai",           gradient: "linear-gradient(135deg,rgba(255,122,24,.88),rgba(168,85,247,.60))"   },
  { label: "Booking Plugin",       sub: "Custom Plugin Dev",          gradient: "linear-gradient(135deg,rgba(11,11,11,.88),rgba(255,122,24,.48))"     },
  { label: "Landing Pages",        sub: "UAE · UK · USA Clients",     gradient: "linear-gradient(135deg,rgba(247,214,74,.92),rgba(255,122,24,.72))"   },
  { label: "6s → 1.8s Speed",     sub: "Core Web Vitals",            gradient: "linear-gradient(135deg,rgba(34,197,94,.86),rgba(11,11,11,.75))"      },
];

const contactServices = ["website", "WooCommerce store", "redesign", "custom plugin"];

/* ─── component ─────────────────────────────────────────────── */
export default function Home() {
  const gradientRef  = useRef<HTMLDivElement>(null);
  const portraitRef  = useRef<HTMLDivElement>(null);
  const mainRef      = useRef<HTMLElement>(null);

  /* Lenis smooth scroll ──────────────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove((t) => lenis.raf(t * 1000));
    };
  }, []);

  /* GSAP hero entrance ───────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".ha-pill",     { y: -18, opacity: 0, duration: 0.55 })
        .from(".ha-h1",       { y: 44,  opacity: 0, duration: 0.80 }, "-=0.28")
        .from(".ha-sub",      { y: 26,  opacity: 0, duration: 0.70 }, "-=0.50")
        .from(".ha-actions",  { y: 18,  opacity: 0, duration: 0.60 }, "-=0.42")
        .from(".ha-showcase", { y: 34,  opacity: 0, duration: 0.80, scale: 0.98 }, "-=0.46");
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* FlowArt — rotation entrance per section ──────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll<HTMLElement>(".flow-section");
      sections.forEach((section, i) => {
        if (i === 0) return; // hero is already animated
        const inner = section.querySelector<HTMLElement>(".flow-inner");
        if (!inner) return;

        gsap.set(inner, { rotationZ: 5, rotationX: 2, transformOrigin: "bottom left", opacity: 0.6 });
        gsap.to(inner, {
          rotationZ: 0,
          rotationX: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 20%",
            scrub: 0.6,
          },
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* GSAP project cards stagger ───────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project", {
        y: 56,
        opacity: 0,
        duration: 0.72,
        stagger: 0.10,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-cards",
          start: "top 78%",
        },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* GSAP stat counter animation ──────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat", {
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* Pointer glow + portrait tilt (existing) ──────────────────── */
  useEffect(() => {
    const items = document.querySelectorAll(".scroll-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    items.forEach((item) => io.observe(item));

    const onPointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gradientRef.current?.style.setProperty("--mx", `${x}%`);
      gradientRef.current?.style.setProperty("--my", `${y}%`);
      if (portraitRef.current) {
        const rect = portraitRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        if (e.clientY < window.innerHeight * 0.9) {
          portraitRef.current.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
          portraitRef.current.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  /* ─── JSX ──────────────────────────────────────────────────── */
  return (
    <main ref={mainRef}>
      <div className="noise" />

      {/* ── nav ── */}
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#home" aria-label="Muhammad Adeel Iqbal home">AI</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact" className="nav-cta">Hire Me</a>
      </nav>

      {/* ── hero ── (flow-section #0 — GSAP entrance via ha-* classes) */}
      <section className="hero flow-section" id="home">
        <div className="gradient-stage" ref={gradientRef} aria-hidden="true">
          <div className="gblob orange" />
          <div className="gblob purple" />
          <div className="gblob green" />
          <div className="pointer-glow" />
        </div>

        <div className="hero-inner">
          {/* pill */}
          <div className="status-pill ha-pill">
            <strong>Available</strong> for new projects — UAE · UK · USA
          </div>

          {/* headline */}
          <h1 className="ha-h1">
            <span className="soft">WordPress developer</span> building fast,
            high&#8209;impact websites
          </h1>

          {/* subline */}
          <p className="subline ha-sub">
            I build and redesign WordPress &amp; WooCommerce websites for businesses
            in the UAE, UK, and USA — from Figma designs to pixel-perfect,
            conversion-ready sites.
          </p>

          {/* cta buttons */}
          <div className="actions ha-actions">
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">
              ✦ Let&apos;s talk
            </a>
            <a className="btn btn-ghost" href="#projects">Browse work</a>
          </div>

          {/* card strip */}
          <div className="showcase ha-showcase" aria-label="Portfolio preview carousel">
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
              <img
                src={portraitDataUrl}
                alt="Muhammad Adeel Iqbal portrait"
                className="portrait-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── about ── (flow-section #1) */}
      <section className="section grey flow-section" id="about">
        <div className="flow-inner container stats-layout">
          <aside className="about-card scroll-reveal">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>
                A WordPress Developer specialising in building, redesigning, and improving
                websites for international clients. From Figma to pixel-perfect Elementor
                builds, WooCommerce stores to custom plugins — I deliver on time, every time.
              </p>
            </div>
            <a href="mailto:adeeliqbalajum@gmail.com" className="about-button">
              Work with me{" "}
              <span className="mini-avatar">
                <img src={portraitDataUrl} alt="Adeel" />
              </span>
            </a>
          </aside>

          <div className="stats-grid">
            {stats.map(([value, label, text]) => (
              <div className="stat" key={value as string}>
                <div className="stat-top">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── zoom parallax showcase (between about and projects) ── */}
      <ZoomParallax items={parallaxItems} />

      {/* ── projects ── (flow-section #2) */}
      <section className="section flow-section" id="projects">
        <div className="flow-inner">
          {/* eyebrow above the text reveal */}
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <div className="eyebrow scroll-reveal">Real work, real clients</div>
          </div>

          {/* word-by-word scroll reveal for the heading */}
          <TextRevealByWord text="Projects I've built and delivered" />

          {/* project board rendered after the reveal scroll area */}
          <div className="container projects-head" style={{ paddingTop: 0 }}>
            <div className="project-board">
              <div className="project-cards">
                <article className="project">
                  <small>01 — Dubai Tourism</small>
                  <h3>Desert Safari Dubai</h3>
                  <p>
                    Custom WordPress booking plugin with Private/Sharing tour tabs,
                    tiered AED pricing, WhatsApp fields, admin approval workflow,
                    and Telr payment integration.
                  </p>
                </article>
                <article className="project">
                  <small>02 — Government</small>
                  <h3>Embassy of Pakistan</h3>
                  <p>
                    Official government website for the Embassy of Pakistan in Muscat,
                    Oman — built with Elementor and ACF, plus a custom PHP passport
                    application tracking system.
                  </p>
                </article>
                <article className="project">
                  <small>03 — E-commerce</small>
                  <h3>ESNCO Lighting Dubai</h3>
                  <p>
                    WooCommerce store management for a Dubai-based lighting company —
                    products, orders, content updates, migration, and consistent
                    uptime maintenance.
                  </p>
                </article>
                <article className="project">
                  <small>04 — Performance</small>
                  <h3>6s to 1.8s load time</h3>
                  <p>
                    Speed-focused WordPress optimisation achieving 95+ PageSpeed score —
                    LiteSpeed Cache, image optimisation, plugin auditing, and Core Web
                    Vitals improvement.
                  </p>
                </article>
                <article className="project">
                  <small>05 — Agency Builds</small>
                  <h3>20+ Figma to WordPress</h3>
                  <p>
                    Pixel-perfect Figma and PSD to WordPress conversions for agency
                    clients — Elementor Pro, mobile-responsive, clean code,
                    delivered on time.
                  </p>
                </article>
                <article className="project">
                  <small>06 — Partnership Page</small>
                  <h3>US Supply Chain Corp</h3>
                  <p>
                    Self-contained HTML partnership page with dark/light theming,
                    IntersectionObserver scroll animations, and zero dependencies —
                    built for an Elementor HTML widget.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── contact ── (flow-section #3) */}
      <section className="section grey flow-section" id="contact">
        <div className="flow-inner container projects-head">
          <div className="eyebrow scroll-reveal">Let&apos;s build together</div>

          {/* TextRotate cycles through service types in the headline */}
          <h2 className="scroll-reveal" style={{ overflow: "hidden" }}>
            Have a WordPress{" "}
            <span
              style={{
                color: "var(--orange)",
                display: "inline-block",
                minWidth: "16ch",
                textAlign: "left",
              }}
            >
              <TextRotate texts={contactServices} interval={2400} />
            </span>{" "}
            ready to build?
          </h2>

          <p
            className="subline scroll-reveal"
            style={{ maxWidth: 520, margin: "16px auto 0" }}
          >
            Whether you need a new website, a redesign, a WooCommerce store, or a
            custom plugin — send me a message and I&apos;ll respond within a few hours.
          </p>

          <div className="actions scroll-reveal" style={{ marginTop: 28 }}>
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">
              Email me
            </a>
            <a
              className="btn btn-ghost"
              href="https://linkedin.com/in/adeelatwork/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
