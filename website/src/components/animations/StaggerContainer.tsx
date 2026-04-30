"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type StaggerContainerProps = {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
} & HTMLMotionProps<"div">;

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.2,
  ...rest
}: StaggerContainerProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Use as a child of StaggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
