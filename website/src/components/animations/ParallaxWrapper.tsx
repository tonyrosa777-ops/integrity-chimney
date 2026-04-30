"use client";

import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxWrapperProps = {
  children: ReactNode;
  /** Speed in px range for the parallax offset. Negative = scrolls slower than viewport. */
  offset?: number;
} & HTMLMotionProps<"div">;

export function ParallaxWrapper({
  children,
  offset = -60,
  ...rest
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(offset), offset]);

  return (
    <motion.div ref={ref} style={{ y }} {...rest}>
      {children}
    </motion.div>
  );
}
