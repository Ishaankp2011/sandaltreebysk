"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";

export interface InstagramPost {
  id: string;
  image_url: string;
  post_url: string;
  caption?: string | null;
  display_order: number;
}

interface InstagramSectionProps {
  posts: InstagramPost[];
}

export function InstagramSection({ posts }: InstagramSectionProps) {
  const hasPosts = posts.length > 0;

  return (
    <section
      className="section-padding bg-secondary/20"
      aria-labelledby="instagram-heading"
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram size={18} className="text-primary" aria-hidden />
            <p className="text-overline">Follow Our Story</p>
          </div>
          <h2 id="instagram-heading" className="heading-section">
            @sandaltreebysk
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-5 mb-5" aria-hidden />
          <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Stay inspired with our latest celebrations, venue glimpses, and
            behind-the-scenes moments.
          </p>
        </motion.div>

        {/* Posts grid */}
        {hasPosts ? (
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {posts.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.post_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative overflow-hidden block bg-secondary flex-shrink-0"
                style={{ width: "clamp(120px, 15vw, 180px)", aspectRatio: "1/1" }}
                aria-label={
                  post.caption
                    ? `View Instagram post: ${post.caption}`
                    : `View Instagram post ${i + 1} by @sandaltreebysk`
                }
              >
                <Image
                  src={post.image_url}
                  alt={post.caption || `Sandal Tree by SK Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="180px"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-400 flex items-center justify-center">
                  <Instagram
                    size={22}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 drop-shadow-lg"
                    aria-hidden
                  />
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* Empty state while posts haven't been added yet */
          <div className="flex flex-col items-center justify-center py-16 text-center mb-10">
            <Instagram size={32} className="text-muted-foreground mb-4" aria-hidden />
            <p className="font-sans text-sm text-muted-foreground max-w-xs leading-relaxed">
              Instagram posts will appear here once added via the admin panel.
            </p>
          </div>
        )}

        {/* Follow button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://instagram.com/sandaltreebysk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-sans text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-[1.02]"
          >
            <Instagram size={13} aria-hidden />
            Follow on Instagram
            <ExternalLink size={11} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
