"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import { GalleryImage, GALLERY_CATEGORIES, GalleryCategory } from "@/lib/types";
import Link from "next/link";

interface GalleryClientProps {
  images: GalleryImage[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, prev, next]);

  // Clean up overflow on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <section className="pb-20 md:pb-32" aria-labelledby="gallery-filter-label">
      <div className="container-luxury">

        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 md:gap-3 mb-12"
          role="group"
          aria-labelledby="gallery-filter-label"
        >
          <span id="gallery-filter-label" className="sr-only">
            Filter gallery by category
          </span>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-5 py-2 font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-200 rounded-full ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:border-primary hover:text-primary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state — no images yet */}
        {images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-5">
              <Images size={28} className="text-muted-foreground" aria-hidden />
            </div>
            <h3 className="font-serif text-2xl font-light mb-3">
              Gallery Coming Soon
            </h3>
            <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed mb-8">
              We&apos;re curating our collection of beautiful celebrations.
              Check back soon, or follow us on Instagram for a preview.
            </p>
            <a
              href="https://instagram.com/sandaltreebysk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 border border-primary text-primary font-sans text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              @sandaltreebysk on Instagram
            </a>
            <div className="mt-8">
              <Link
                href="/contact"
                className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
              >
                Book an Event →
              </Link>
            </div>
          </div>
        )}

        {/* Masonry grid */}
        {filtered.length > 0 && (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4"
            aria-label="Gallery images"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${img.category} image ${i + 1} fullscreen`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(i);
                    }
                  }}
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={img.image_url}
                      alt={`${img.category} at Sandal Tree by SK`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-400 flex items-center justify-center">
                      <ZoomIn
                        size={22}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 drop-shadow-lg"
                        aria-hidden
                      />
                    </div>
                    {img.featured && (
                      <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 font-sans text-[9px] tracking-widest uppercase rounded-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No results for this category filter */}
        {images.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-muted-foreground text-sm">
              No images in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // Use fixed + inset-0 + z above navbar (z-[9999])
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
              aria-label="Close image viewer"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-6 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Image — takes up full screen minus small safe padding */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
              // Stop click-on-image from closing lightbox
              onClick={(e) => e.stopPropagation()}
              style={{
                // Responsive safe padding — smaller on mobile
                padding: "clamp(48px, 8vw, 72px) clamp(48px, 8vw, 80px) clamp(40px, 6vw, 56px)",
              }}
            >
              <Image
                src={filtered[lightboxIndex].image_url}
                alt={`${filtered[lightboxIndex].category} at Sandal Tree by SK`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Next button */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-6 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Counter + category */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
              <span className="font-sans text-[10px] text-white/40 tracking-widest uppercase">
                {filtered[lightboxIndex].category}
              </span>
              <span className="w-px h-3 bg-white/20" aria-hidden />
              <span className="font-sans text-[11px] text-white/50 tracking-widest">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
