"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

type RevealTextProps = {
  text: string;
  type?: "words" | "chars";
  stagger?: number;
  className?: string;
  threshold?: number;
};

export function RevealText({
  text,
  type = "words",
  stagger = 0.05,
  className,
  threshold = 0.4,
}: RevealTextProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const tokens =
    type === "words" ? text.split(/(\s+)/) : Array.from(text);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      aria-label={text}
    >
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={i}>{token}</span>
        ) : (
          <motion.span
            key={i}
            variants={item}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {token}
          </motion.span>
        )
      )}
    </motion.span>
  );
}
