"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { TextRevealByWord } from "./components/TextReveal";
import { TextRotate } from "./components/TextRotate";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";

const services = [
  ["01", "WordPress Development", "Custom WordPress builds, Elementor Pro layouts, ACF-powered content, and clean responsive implementation."],
  ["02", "WooCommerce Stores", "Product catalogues, checkout flows, payment setup, order workflows, and conversion-focused store pages."],
  ["03", "Custom Plugins", "Purpose-built PHP and JavaScript features for bookings, forms, dashboards, and business automations."],
];

const stats = [
  ["50+", "Projects", "Delivered across portfolio sites, business websites, e-commerce stores, and custom WordPress systems."],
  ["3+", "Years", "Hands-on development experience with international clients and agency workflows."],
  ["95+", "Speed", "Performance-focused optimization for Core Web Vitals, caching, images, and plugin audits."],
];

const projects = [
  ["Dubai Tourism", "Desert Safari Dubai", "Custom WordPress booking workflow with tour tabs, AED pricing, approval flow, and payment integration."],
  ["Government", "Embassy of Pakistan", "Official Elementor and ACF website with a PHP passport application tracking system."],
  ["E-commerce", "ESNCO Lighting Dubai", "WooCommerce store management, product updates, migration support, and uptime maintenance."],
  ["Optimization", "6s to 1.8s Load Time", "LiteSpeed Cache, image compression, plugin cleanup, and Core Web Vitals improvements."],
  ["Agency Builds", "20+ Figma to WordPress", "Pixel-perfect Elementor Pro builds from Figma and PSD designs."],
  ["Landing Pages", "US Supply Chain Corp", "Self-contained HTML partnership page with theming and scroll animations."],
];

const parallaxItems: ParallaxItem[] = [
  { label: "Booking Systems", sub: "Tour, service, and appointment flows", gradient: "linear-gradient(135deg, #ff7a18, #f97316)" },
  { label: "WooCommerce", sub: "Fast stores with clean UX", gradient: "linear-gradient(135deg, #a855f7, #6366f1)" },
  { label: "Elementor Pro", sub: "Pixel-perfect responsive pages", gradient: "linear-gradient(135deg, #22c55e, #14b8a6)" },
  { label: "Performance", sub: "Caching, images, and Core Web Vitals", gradient: "linear-gradient(135deg, #111827, #475569)" },
  { label: "Custom PHP", sub: "Dashboards, forms, and admin tools", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { label: "ACF Content", sub: "Flexible editing systems", gradient: "linear-gradient(135deg, #06b6d4, #2563eb)" },
  { label: "Maintenance", sub: "Ongoing updates and support", gradient: "linear-gradient(135deg, #0f172a, #7c3aed)" },
];

const rotatingServices = ["website", "redesign", "store", "plugin"];

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">WordPress Developer • WooCommerce Specialist</div>
            <h1>
              Building bold <span>WordPress</span> experiences.
            </h1>
            <p className="subline">
              I&apos;m Muhammad Adeel Iqbal. I design, build, redesign, and optimize WordPress and WooCommerce websites for clients in the UAE, UK, USA, and beyond.
            </p>
            <div className="actions">
              <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">Start a project</a>
              <a className="btn btn-ghost" href="#projects">View work</a>
            </div>
          </div>

          <div className="orb-card" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orb orb-three" />
            <div className="float-note">
              <strong>Fast, responsive, editable.</strong>
              <p>Elementor Pro, ACF, WooCommerce, custom plugins, and performance tuning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container projects-head">
          <div className="eyebrow">Services</div>
          <h2>What I build</h2>
          <p className="subline" style={{ margin: "0 auto" }}>
            Practical WordPress development for businesses that need polished design, stable code, and easy content management.
          </p>
          <div className="services-grid">
            {services.map(([number, title, text]) => (
              <article className="service-card" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section grey" id="about">
        <div className="container stats-layout">
          <aside className="about-card">
            <div>
              <div className="eyebrow">About</div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>
                A WordPress Developer specializing in business websites, WooCommerce stores, Elementor Pro builds, Figma-to-WordPress development, and custom plugin work.
              </p>
            </div>
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">Work with me</a>
          </aside>
          <div className="stats-grid">
            {stats.map(([value, label, text]) => (
              <div className="stat" key={value}>
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

      <ZoomParallax items={parallaxItems} />

      <section className="section" id="projects">
        <div className="container projects-head">
          <div className="eyebrow">Real work, real clients</div>
          <TextRevealByWord text="Projects I've built and delivered" />
          <div className="project-board">
            <div className="project-cards">
              {projects.map(([type, title, text]) => (
                <article className="project" key={title}>
                  <small>{type}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section grey" id="contact">
        <div className="container projects-head">
          <div className="eyebrow">Let&apos;s build together</div>
          <h2>
            Have a WordPress <span style={{ color: "var(--orange)" }}><TextRotate texts={rotatingServices} /></span> ready to build?
          </h2>
          <p className="subline" style={{ margin: "0 auto" }}>
            Send me a message and I&apos;ll help turn your idea, redesign, or WooCommerce requirement into a clean production-ready website.
          </p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">Email me</a>
            <a className="btn btn-ghost" href="https://linkedin.com/in/adeelatwork/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Muhammad Adeel Iqbal. WordPress Developer.</div>
      </footer>
    </main>
  );
}
