"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "Weddings",
    description: "Your dream wedding, perfected in every detail.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    href: "/services#weddings",
  },
  {
    title: "Engagements",
    description: "Celebrate love's first promise in grand style.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    href: "/services#engagements",
  },
  {
    title: "Receptions",
    description: "A magnificent evening to welcome new beginnings.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    href: "/services#receptions",
  },
  {
    title: "Birthdays",
    description: "Mark milestones with unforgettable celebrations.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
    href: "/services#birthdays",
  },
  {
    title: "Corporate Events",
    description: "Professional spaces for impactful corporate moments.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    href: "/services#corporate",
  },
  {
    title: "Family Gatherings",
    description: "Bring everyone together in warmth and comfort.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    href: "/services#family",
  },
];

export function EventTypes() {
  return (
    <section
      className="section-padding bg-secondary/20"
      aria-labelledby="events-heading"
    >
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-overline mb-4">Celebrations We Host</p>
          <h2 id="events-heading" className="heading-section">
            Every Occasion, Elevated
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" aria-hidden />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={event.href}
                className="group block relative overflow-hidden aspect-[3/4]"
                aria-label={`Learn about our ${event.title} services`}
              >
                <Image
                  src={event.image}
                  alt={`${event.title} at Sandal Tree by SK`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl text-white font-light mb-2">
                    {event.title}
                  </h3>
                  <p className="font-sans text-sm text-white/70 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-xs text-primary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Learn More
                    <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
