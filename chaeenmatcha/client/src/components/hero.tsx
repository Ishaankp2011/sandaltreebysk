import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from '@assets/generated_images/minimalist_matcha_powder_texture_banner.png';
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          <img 
            src={heroImage} 
            alt="Matcha Texture" 
            className="h-full w-full object-cover opacity-60"
          />
        </motion.div>
        {/* Softer vignette: darken edges, subtle bottom fade (no harsh white) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.05)_65%,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-transparent" />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 container text-white pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="h-16 w-[1px] bg-white/30 mb-8" />
          <span className="text-sm md:text-base uppercase tracking-[0.3em] font-light text-white/90 mb-6">
            Ceremonial Grade A
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium leading-[0.9] tracking-tight mb-6 md:mb-8"
        >
          The Art of <br/>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
            Stillness.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-sm sm:max-w-md lg:max-w-lg mb-8 md:mb-12 font-light leading-relaxed px-4 sm:px-0"
        >
          Sourced from the misty hills of Shizuoka. 
          A daily ritual for focus, calm, and clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative group mb-12"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
          <Link href="/shop">
            <Button variant="luxury" size="lg" className="luxury-cta relative px-8 sm:px-12 md:px-14 py-4 md:py-6 text-lg md:text-xl font-serif tracking-wide group overflow-hidden">
              <span className="relative z-10">Shop Collection</span>
              <span className="absolute inset-0 z-0 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-400 bg-gradient-to-r from-white/10 via-white/6 to-white/2" />
              <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/10" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>
    </div>
  );
}
