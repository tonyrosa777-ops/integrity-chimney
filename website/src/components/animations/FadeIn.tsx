"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
} & HTMLMotionProps<"div">;

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  ...rest
}: FadeInProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
