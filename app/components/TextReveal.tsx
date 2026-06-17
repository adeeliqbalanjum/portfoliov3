"use client";
import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TextRevealByWordProps {
  text: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({ text }) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <div className="text-reveal-simple">
      <p>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: Math.min(index * 0.055, 0.25) }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
};
