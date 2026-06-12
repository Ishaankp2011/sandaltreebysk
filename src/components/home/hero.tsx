"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// Split a string into individually animated letter spans
function AnimatedWord({
  text,
  className,
  delayStart = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  stagger?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delayStart + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "50% 100%", perspective: "600px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Ornamental divider: ── ◆ ── 
function OrnamentalDivider({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-3 my-4 origin-center"
      aria-hidden
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.15 }}
        className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-primary/70 origin-right"
      />
      <motion.svg
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        animate={{ opacity: 1, scale: 1, rotate: 45 }}
        transition={{ duration: 0.5, delay: delay + 0.3, ease: "backOut" }}
        width="8" height="8" viewBox="0 0 8 8"
        className="text-primary shrink-0"
      >
        <rect width="8" height="8" fill="currentColor" />
      </motion.svg>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.15 }}
        className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-primary/70 origin-left"
      />
    </motion.div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const contentY = useTransform(scrollY, [0, 380], ["0%", "6%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')",
          y: bgY,
        }}
        role="img"
        aria-label="Elegant banquet hall interior"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center text-white w-full px-6"
      >

        {/* Eyebrow — letter-spacing expands in */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 1.6, delay: 0.1, ease: "easeOut" }}
          className="font-sans text-[10px] md:text-[11px] uppercase text-white/50 mb-5 tracking-[0.32em]"
        >
          Welcome to
        </motion.p>

        {/* ── SANDAL TREE — per-letter stagger ── */}
        <h1
          className="font-serif font-semibold leading-[1.0] text-white
                     text-[clamp(2.6rem,6vw,5.2rem)]
                     drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]
                     mb-0"
        >
          <AnimatedWord text="Sandal Tree" delayStart={0.3} stagger={0.05} />
        </h1>

        {/* ── Ornamental divider ── */}
        <OrnamentalDivider delay={1.05} />

        {/* ── by SK — shimmer reveal ── */}
        <div className="relative inline-block mb-10 md:mb-12 overflow-hidden">
          {/* Base gold text, fades up */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic font-medium text-primary
                       text-[clamp(1.6rem,3.8vw,3.2rem)]
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]
                       leading-none tracking-wide"
          >
            by SK
          </motion.p>

          {/* Shimmer sweep over the gold text */}
          <motion.span
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 1.1, delay: 1.3, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
            aria-hidden
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="font-sans text-sm md:text-base lg:text-lg font-light text-white/65
                     max-w-xl mx-auto mb-12 leading-relaxed tracking-wide"
        >
          Where every celebration becomes a timeless memory. A luxury banquet
          hall designed for life's most extraordinary moments.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-primary text-primary-foreground
                       font-sans text-[11px] font-semibold tracking-widest uppercase rounded-full
                       transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03]
                       hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
          >
            Book an Event
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={13} aria-hidden />
            </motion.span>
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center px-10 py-3.5 border border-white/40 text-white
                       font-sans text-[11px] font-semibold tracking-widest uppercase rounded-full
                       transition-all duration-300 hover:bg-white/10 hover:border-white/65
                       hover:scale-[1.03] active:scale-[0.97] backdrop-blur-sm"
          >
            Explore Gallery
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0], opacity: [0.3, 0.75, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ChevronDown size={18} />
        </motion.div>
        <motion.span
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
