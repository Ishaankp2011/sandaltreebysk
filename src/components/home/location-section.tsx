"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function LocationSection() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2258800214368!2d77.32270977485058!3d28.65295458315419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb216fdc08b1%3A0xd2c1f28e7b10ee00!2sSandal%20Tree%20By%20SK!5e0!3m2!1sen!2sin!4v1781223802316!5m2!1sen!2sin";
  const mapsUrl = "https://maps.app.goo.gl/igwQWRRDBFBV8LFb6";

  return (
    <section className="section-padding" aria-labelledby="location-heading">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-overline mb-3">Find Us</p>
          <h2 id="location-heading" className="heading-section">Our Location</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-5" aria-hidden />
        </motion.div>

        {/* Stack on mobile, side-by-side on lg */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:col-span-1"
          >
            <div className="card-luxury p-5 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-primary shrink-0" aria-hidden />
                <h3 className="font-serif text-lg md:text-xl">Sandal Tree by SK</h3>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                Our venue is conveniently located for guests arriving from all
                parts of the city. Ample parking available on-site.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 px-5 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase transition-all hover:bg-primary/90 rounded-sm"
                  aria-label="Open location in Google Maps"
                >
                  <ExternalLink size={12} aria-hidden />
                  Google Maps
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 px-5 py-2.5 border border-border font-sans text-xs font-semibold tracking-widest uppercase transition-all hover:bg-secondary rounded-sm text-foreground"
                  aria-label="Get directions to Sandal Tree by SK"
                >
                  <Navigation size={12} aria-hidden />
                  Directions
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map — shorter on mobile, taller on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full lg:col-span-2"
          >
            <div className="relative w-full overflow-hidden border border-border"
              style={{ height: "clamp(240px, 50vw, 400px)" }}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sandal Tree by SK location on Google Maps"
                aria-label="Interactive map showing the location of Sandal Tree by SK"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
