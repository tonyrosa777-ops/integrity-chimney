"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type ScaleInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  from?: number;
} & HTMLMotionProps<"div">;

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  from = 0.92,
  ...rest
}: ScaleInProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
