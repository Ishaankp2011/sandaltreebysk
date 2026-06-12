"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const springProgress = useSpring(0, { stiffness: 120, damping: 28, mass: 0.4 });
  const width = useTransform(springProgress, [0, 100], ["0%", "100%"]);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    // Kick off on route change
    setLoading(true);
    setProgress(0);
    springProgress.set(0);

    // Quickly jump to ~30% then trickle
    springProgress.set(30);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clear();
          return prev;
        }
        const increment = Math.random() * 8 + 2;
        const next = Math.min(prev + increment, 85);
        springProgress.set(next);
        return next;
      });
    }, 350);

    // Finish after page settles
    timerRef.current = setTimeout(() => {
      clear();
      setProgress(100);
      springProgress.set(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        springProgress.set(0);
      }, 500);
    }, 600);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
          aria-hidden="true"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          {/* Track */}
          <div className="absolute inset-0 bg-primary/15" />

          {/* Bar */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width }}
          />

          {/* Glowing tip */}
          <motion.div
            className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-primary/60 to-primary"
            style={{ right: 0 }}
          />

          {/* Shimmer pulse */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
