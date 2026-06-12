"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function BookingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="absolute inset-[-12%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop')",
          y: bgY,
        }}
        role="img"
        aria-label="Beautifully lit event venue"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative container-luxury text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-overline text-primary/80 mb-3">Begin Your Journey</p>
          <h2 id="cta-heading" className="heading-section text-white mb-5">
            Your Dream Event
            <br />
            <span className="italic font-light">Awaits You</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-6" aria-hidden />
          <p className="font-sans text-sm md:text-base lg:text-lg text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
            Contact us today and let our team help you plan an event that is
            uniquely yours — flawlessly executed from start to finish.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase rounded-full transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Book an Event
              <ArrowRight size={13} aria-hidden />
            </Link>
            <a
              href="tel:+91XXXXXXXXXX"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white font-sans text-xs font-semibold tracking-widest uppercase rounded-full transition-all hover:bg-white/10 backdrop-blur-sm"
              aria-label="Call us now"
            >
              <Phone size={13} aria-hidden />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
