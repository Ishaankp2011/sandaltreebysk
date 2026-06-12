"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Layers, Star, Heart } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: "Premium Ambience",
    description:
      "Every corner thoughtfully designed to exude sophistication and luxury.",
  },
  {
    icon: Layers,
    title: "Elegant Interiors",
    description:
      "Bespoke interiors with premium finishes, warm lighting, and timeless aesthetics.",
  },
  {
    icon: Star,
    title: "Professional Service",
    description:
      "Our dedicated team of experienced professionals ensures flawless execution.",
  },
  {
    icon: Heart,
    title: "Memorable Celebrations",
    description:
      "We turn your vision into reality, creating events that live on in your memories.",
  },
];

export function WhyChooseUs() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Subtle texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1964&auto=format&fit=crop')",
        }}
        aria-hidden
      />

      <div className="relative container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-overline mb-4">Why We Stand Apart</p>
            <h2 id="why-choose-heading" className="heading-section mb-6">
              The Sandal Tree
              <br />
              <span className="text-primary italic">Difference</span>
            </h2>
            <div className="w-12 h-px bg-primary mb-8" aria-hidden />
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              We believe every celebration deserves nothing short of perfection.
              Our commitment to excellence is woven into every aspect of your
              experience — from the first enquiry to the final goodbye.
            </p>
          </motion.div>

          {/* Right: Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-luxury p-6 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 350 }}
                  className="mb-4 w-fit"
                >
                  <item.icon
                    size={24}
                    className="text-primary"
                    aria-hidden
                  />
                </motion.div>
                <h3 className="font-serif text-lg font-medium mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
