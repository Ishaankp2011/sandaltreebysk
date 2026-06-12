"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="section-padding" aria-labelledby="about-preview-heading">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1974&auto=format&fit=crop"
                alt="Elegantly decorated banquet hall interior at Sandal Tree by SK"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative frames */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 w-40 h-40 border border-primary/20 bg-background hidden lg:block"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -top-6 -left-6 w-24 h-24 bg-primary/8 hidden lg:block"
              aria-hidden
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-overline mb-4">Our Story</p>
            <h2 id="about-preview-heading" className="heading-section mb-6">
              A Space Born for
              <br />
              <span className="text-primary italic">Timeless Moments</span>
            </h2>
            <div className="w-12 h-px bg-primary mb-8" aria-hidden />

            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Sandal Tree by SK was born from a single vision — to create a venue
              where elegance meets warmth, and every celebration feels truly
              extraordinary.
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10">
              Nestled in a prime location, our banquet hall is designed to transform
              your most precious milestones into cinematic memories. From intimate
              family gatherings to grand wedding receptions, we craft experiences
              that endure long after the last dance.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-widest uppercase text-primary group"
            >
              Discover Our Story
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={14} aria-hidden />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
