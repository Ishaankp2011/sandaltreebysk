"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Car, UtensilsCrossed, Flower2, Thermometer, MapPin } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Large Capacity",
    description: "Accommodate up to 1000+ guests with ease in our expansive halls.",
  },
  {
    icon: Car,
    title: "Ample Parking",
    description: "Dedicated parking space for hundreds of vehicles, stress-free.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering Support",
    description: "In-house and external caterers welcome for every cuisine.",
  },
  {
    icon: Flower2,
    title: "Decoration Support",
    description: "Tie-up with premium decorators for stunning setups.",
  },
  {
    icon: Thermometer,
    title: "Air Conditioned",
    description: "Fully climate-controlled interiors for year-round comfort.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Easily accessible, located in the heart of the city.",
  },
];

export function VenueHighlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-secondary/30" aria-labelledby="highlights-heading">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-overline mb-4">The Venue</p>
          <h2 id="highlights-heading" className="heading-section">
            Built for Grand Celebrations
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" aria-hidden />
        </motion.div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group card-luxury p-5 md:p-8 cursor-default"
            >
              <div className="flex items-start gap-5">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="shrink-0 w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/5 group-hover:bg-primary group-hover:border-primary transition-all duration-500"
                >
                  <item.icon
                    size={20}
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-500"
                    aria-hidden
                  />
                </motion.div>
                <div>
                  <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
