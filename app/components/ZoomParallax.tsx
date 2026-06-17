"use client";
import { motion, useReducedMotion } from "framer-motion";

export interface ParallaxItem {
  label: string;
  sub: string;
  gradient: string;
}

interface ZoomParallaxProps {
  items: ParallaxItem[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="zoom-showcase" aria-label="Project showcase">
      <div className="container zoom-showcase-inner">
        <div className="eyebrow zoom-eyebrow">50+ projects delivered</div>
        <div className="zoom-grid">
          {items.slice(0, 7).map(({ label, sub, gradient }, index) => (
            <motion.article
              className="zoom-card"
              key={`${label}-${index}`}
              style={{ background: gradient }}
              initial={reduceMotion ? false : { y: 22, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.045, 0.22) }}
            >
              <div className="zoom-card-shine" aria-hidden="true" />
              <p>{label}</p>
              <span>{sub}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
