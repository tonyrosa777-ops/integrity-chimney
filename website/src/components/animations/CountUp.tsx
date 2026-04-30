"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type CountUpProps = {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({
  end,
  duration = 1.5,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const step = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = (timestamp - startTime.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(eased * end);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
