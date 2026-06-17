"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export interface ParallaxItem {
  label: string;
  sub: string;
  gradient: string;
}

interface ZoomParallaxProps {
  items: ParallaxItem[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 7]),
  ];

  return (
    <section ref={container} className="zoom-parallax" aria-label="Animated project showcase">
      <div className="zoom-sticky">
        <div className="zoom-label">
          <span>50+ projects delivered</span>
          <strong>Scroll to explore</strong>
        </div>

        {items.slice(0, 7).map((item, index) => (
          <motion.article
            className={`zoom-card zoom-card-${index + 1}`}
            style={{ scale: scales[index % scales.length], background: item.gradient }}
            key={item.label}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.label}</h3>
            <p>{item.sub}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
