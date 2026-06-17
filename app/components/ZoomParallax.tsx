"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export interface ParallaxItem {
  label: string;
  sub: string;
  gradient: string;
}

interface ZoomParallaxProps {
  items: ParallaxItem[];
}

/* Each item's position offset from center — matches the original ZoomParallax layout */
const offsets: React.CSSProperties[] = [
  {},
  { top: "-30vh", left: "5vw",    height: "30vh", width: "35vw" },
  { top: "-10vh", left: "-25vw",  height: "45vh", width: "20vw" },
  { left: "27.5vw",               height: "25vh", width: "25vw" },
  { top: "27.5vh", left: "5vw",   height: "25vh", width: "20vw" },
  { top: "27.5vh", left: "-22.5vw", height: "25vh", width: "30vw" },
  { top: "22.5vh", left: "25vw",  height: "15vh", width: "15vw" },
];

export function ZoomParallax({ items }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div
      ref={container}
      style={{ position: "relative", height: "300vh" }}
      aria-label="Project showcase"
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Centered label */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: '"Satoshi", ui-sans-serif, system-ui, sans-serif',
              fontSize: "clamp(.85rem,1.1vw,1rem)",
              fontWeight: 900,
              letterSpacing: "-.025em",
              color: "rgba(7,7,7,.44)",
              background: "rgba(255,255,255,.72)",
              border: "1px solid rgba(0,0,0,.065)",
              borderRadius: 999,
              padding: "7px 13px",
            }}
          >
            50+ projects delivered
          </p>
        </div>

        {items.slice(0, 7).map(({ label, sub, gradient }, index) => {
          const scale = scales[index % scales.length];
          const pos = offsets[index] ?? {};

          return (
            <motion.div
              key={index}
              style={{
                scale,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "25vw",
                  height: "25vh",
                  minWidth: 160,
                  minHeight: 120,
                  borderRadius: 24,
                  overflow: "hidden",
                  background: gradient,
                  boxShadow:
                    "0 34px 92px rgba(0,0,0,.20), 0 8px 20px rgba(0,0,0,.10)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "18px 22px",
                  ...pos,
                }}
              >
                {/* subtle inner shine */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(150deg, rgba(255,255,255,.22) 0%, transparent 55%)",
                    borderRadius: "inherit",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    position: "relative",
                    margin: 0,
                    color: "#fff",
                    fontFamily: '"Satoshi", sans-serif',
                    fontWeight: 900,
                    fontSize: 17,
                    lineHeight: 1,
                    letterSpacing: "-0.055em",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    position: "relative",
                    margin: "5px 0 0",
                    color: "rgba(255,255,255,.72)",
                    fontFamily: '"Satoshi", sans-serif',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {sub}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
