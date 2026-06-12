"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

const fallbackImages: GalleryImage[] = [
  { id: "1", image_url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop", category: "Venue", featured: true, created_at: new Date().toISOString() },
  { id: "2", image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop", category: "Weddings", featured: true, created_at: new Date().toISOString() },
  { id: "3", image_url: "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=1200&auto=format&fit=crop", category: "Decor", featured: true, created_at: new Date().toISOString() },
  { id: "4", image_url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200&auto=format&fit=crop", category: "Receptions", featured: false, created_at: new Date().toISOString() },
  { id: "5", image_url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop", category: "Venue", featured: false, created_at: new Date().toISOString() },
];

interface GalleryPreviewProps {
  images?: GalleryImage[];
}

export function GalleryPreview({ images = [] }: GalleryPreviewProps) {
  const display = images.length > 0 ? images.slice(0, 5) : fallbackImages;

  return (
    <section className="section-padding" aria-labelledby="gallery-preview-heading">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 md:mb-12"
        >
          <div>
            <p className="text-overline mb-3">Our Gallery</p>
            <h2 id="gallery-preview-heading" className="heading-section">
              Moments Captured
              <br />
              <span className="text-primary italic">in Beauty</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-primary shrink-0 group"
          >
            View Full Gallery
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </motion.div>

        {/*
          Layout:
          Mobile (< lg): uniform 2-col grid, all square
          Desktop (lg+): 3-col grid, first image tall (row-span-2), rest 4:3
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {display.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={cn(
                "relative overflow-hidden group cursor-pointer",
                // On desktop, first image spans 2 rows
                i === 0 && "lg:row-span-2"
              )}
              style={{
                // Mobile: all 1:1 squares — large enough to see detail
                // Desktop: first image fills its 2 rows naturally (no fixed aspect-ratio)
                aspectRatio: i === 0 ? undefined : "4/3",
              }}
            >
              {/* First image on mobile needs explicit height since no aspect-ratio */}
              {i === 0 && (
                <div className="relative aspect-square lg:aspect-auto lg:absolute lg:inset-0">
                  <Image
                    src={img.image_url}
                    alt={`${img.category} at Sandal Tree by SK`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 md:bottom-3 md:left-3 font-sans text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-white/80">
                    {img.category}
                  </span>
                </div>
              )}

              {i !== 0 && (
                <>
                  <Image
                    src={img.image_url}
                    alt={`${img.category} at Sandal Tree by SK`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 md:bottom-3 md:left-3 font-sans text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-white/80">
                    {img.category}
                  </span>
                </>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
