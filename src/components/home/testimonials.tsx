"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya & Rohan Sharma",
    rating: 5,
    review:
      "Sandal Tree by SK made our wedding day absolutely magical. The decor, the ambience, and the service were all beyond our expectations. Every guest was left in awe.",
    event_type: "Wedding",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Ananya Mehta",
    rating: 5,
    review:
      "We hosted our company's annual event here and it was a seamless experience. Professional staff, beautiful venue, and flawless execution from start to finish.",
    event_type: "Corporate Event",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "The Kapoor Family",
    rating: 5,
    review:
      "From the moment we walked in for our son's engagement ceremony, we knew this was the right choice. The hall was breathtaking and the team was incredibly attentive.",
    event_type: "Engagement",
    created_at: new Date().toISOString(),
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials = fallbackTestimonials }: TestimonialsProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section
      className="section-padding bg-charcoal-950 dark:bg-charcoal-950"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-overline mb-4 text-primary/80">Testimonials</p>
          <h2 id="testimonials-heading" className="heading-section text-white">
            Words From Our Guests
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" aria-hidden />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 relative group hover:bg-white/8 transition-colors duration-500"
            >
              <Quote
                size={32}
                className="text-primary/20 mb-6 transition-colors duration-300 group-hover:text-primary/40"
                aria-hidden
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className={
                      idx < item.rating
                        ? "fill-primary text-primary"
                        : "text-white/20"
                    }
                    aria-hidden
                  />
                ))}
              </div>

              <p className="font-serif text-lg text-white/80 leading-relaxed mb-6 italic">
                &ldquo;{item.review}&rdquo;
              </p>

              <div>
                <p className="font-sans text-sm font-medium text-white">
                  {item.name}
                </p>
                <p className="font-sans text-xs text-primary/70 mt-1 tracking-wider uppercase">
                  {item.event_type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
