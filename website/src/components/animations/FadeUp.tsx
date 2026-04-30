"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
} & HTMLMotionProps<"div">;

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  distance = 20,
  ...rest
}: FadeUpProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
