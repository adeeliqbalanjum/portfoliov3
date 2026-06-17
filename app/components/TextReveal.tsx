"use client";
import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

interface TextRevealByWordProps {
  text: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({ text }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const words = text.split(" ");

  return (
    <div ref={targetRef} style={{ position: "relative", height: "160vh", zIndex: 0 }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 22px",
        }}
      >
        <p
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            fontFamily: '"Satoshi", ui-sans-serif, system-ui, sans-serif',
            fontSize: "clamp(2rem, 4vw, 4rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.072em",
            fontWeight: 900,
            maxWidth: 720,
            textAlign: "center",
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <RevealWord key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </RevealWord>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span style={{ position: "relative", margin: "0 5px" }}>
      <span style={{ color: "rgba(7,7,7,0.10)", position: "absolute" }}>{children}</span>
      <motion.span style={{ opacity, color: "#070707" }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};
