"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GalleryImage } from "@/lib/types";

const fallbackImages = [
  {
    id: "1",
    image_url:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    category: "Venue",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    image_url:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    category: "Weddings",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    image_url:
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=1974&auto=format&fit=crop",
    category: "Decor",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    image_url:
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop",
    category: "Receptions",
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    image_url:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop",
    category: "Venue",
    featured: false,
    created_at: new Date().toISOString(),
  },
];

interface GalleryPreviewProps {
  images?: GalleryImage[];
}

export function GalleryPreview({ images = [] }: GalleryPreviewProps) {
  const displayImages =
    images.length > 0 ? images.slice(0, 5) : fallbackImages;

  return (
    <section className="section-padding" aria-labelledby="gallery-preview-heading">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-overline mb-4">Our Gallery</p>
            <h2 id="gallery-preview-heading" className="heading-section">
              Moments Captured
              <br />
              <span className="text-primary italic">in Beauty</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-widest uppercase text-primary hover:gap-4 transition-all duration-300 group shrink-0"
          >
            View Full Gallery
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {displayImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative overflow-hidden group cursor-pointer ${
                i === 0 ? "row-span-2 col-span-1" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}
            >
              <Image
                src={img.image_url}
                alt={`${img.category} at Sandal Tree by SK`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <span className="font-sans text-xs font-medium tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/70 px-4 py-2">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
