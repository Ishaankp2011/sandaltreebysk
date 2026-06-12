"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Layers, Star, Heart } from "lucide-react";

const reasons = [
  { icon: Sparkles, title: "Premium Ambience", description: "Every corner thoughtfully designed to exude sophistication and luxury." },
  { icon: Layers, title: "Elegant Interiors", description: "Bespoke interiors with premium finishes, warm lighting, and timeless aesthetics." },
  { icon: Star, title: "Professional Service", description: "Our dedicated team of experienced professionals ensures flawless execution." },
  { icon: Heart, title: "Memorable Celebrations", description: "We turn your vision into reality, creating events that live on in your memories." },
];

export function WhyChooseUs() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-40px" });

  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby="why-choose-heading">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] dark:opacity-[0.025]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1964&auto=format&fit=crop')" }}
        aria-hidden
      />

      <div className="relative container-luxury">
        {/* On mobile: stacked. On lg: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-overline mb-3">Why We Stand Apart</p>
            <h2 id="why-choose-heading" className="heading-section mb-5">
              The Sandal Tree
              <br />
              <span className="text-primary italic">Difference</span>
            </h2>
            <div className="w-12 h-px bg-primary mb-6" aria-hidden />
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              We believe every celebration deserves nothing short of perfection.
              Our commitment to excellence is woven into every aspect of your
              experience — from the first enquiry to the final goodbye.
            </p>
          </motion.div>

          {/* Cards — 2 col grid on all sizes */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3 md:gap-5 w-full">
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="card-luxury p-4 md:p-6 group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 350 }} className="mb-3 w-fit">
                  <item.icon size={20} className="text-primary" aria-hidden />
                </motion.div>
                <h3 className="font-serif text-base md:text-lg font-medium mb-1.5">{item.title}</h3>
                <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
