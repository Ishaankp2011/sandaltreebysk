"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function LocationSection() {
  // Use the q= embed which searches for the place — no API key needed.
  // Replace with your own embed URL from Google Maps → Share → Embed a map
  // for the most precise pin. Until then this searches by the short URL.
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
          className="text-center mb-12"
        >
          <p className="text-overline mb-4">Find Us</p>
          <h2 id="location-heading" className="heading-section">
            Our Location
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" aria-hidden />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="card-luxury p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={20} className="text-primary shrink-0" aria-hidden />
                <h3 className="font-serif text-xl">Sandal Tree by SK</h3>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
                Our venue is conveniently located for guests arriving from all
                parts of the city. Ample parking is available on-site.
              </p>
              <div className="space-y-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-primary/90 justify-center"
                  aria-label="Open location in Google Maps"
                >
                  <ExternalLink size={13} aria-hidden />
                  Open in Google Maps
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-6 py-3 border border-border font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-secondary justify-center text-foreground"
                  aria-label="Get directions to Sandal Tree by SK"
                >
                  <Navigation size={13} aria-hidden />
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative w-full h-[400px] overflow-hidden border border-border">
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
