"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onHero = isHomePage && !isScrolled;

  return (
    <>
      {/* Outer wrapper — slides in on mount, handles top padding */}
      <motion.div
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 pointer-events-none"
        role="banner"
      >
        {/*
          The pill — we use Framer Motion `animate` so width / background
          transitions are properly spring-interpolated (not just CSS duration).
        */}
        <motion.nav
          animate={{
            maxWidth: onHero ? "1020px" : "820px",
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "pointer-events-auto w-full rounded-full",
            // background & blur done in CSS so they don't fight Framer
            "transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-in-out",
            onHero
              ? "bg-black/30 backdrop-blur-lg shadow-none"
              : "bg-background/80 dark:bg-neutral-900/80 backdrop-blur-2xl shadow-[0_6px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_6px_32px_rgba(0,0,0,0.45)]"
          )}
          aria-label="Main navigation"
        >
          {/*
            Three equal columns: [logo] [nav links] [cta]
            The outer px-6 gives equal left/right breathing room.
            Each column is flex-1 so they share width equally.
          */}
          <div className="grid grid-cols-3 items-center h-16 px-6 gap-4">

            {/* ── Col 1: Logo (left-aligned inside its column) ── */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                aria-label="Sandal Tree — Home"
                className="select-none hover:opacity-70 transition-opacity duration-200"
              >
                <span className={cn(
                  "font-serif font-bold tracking-[0.1em] uppercase whitespace-nowrap",
                  "text-[17px]",
                  onHero ? "text-white" : "text-foreground"
                )}>
                  Sandal Tree
                </span>
              </Link>
            </div>

            {/* ── Col 2: Nav links (centred inside its column) ── */}
            <ul className="hidden md:flex items-center justify-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase",
                      "transition-colors duration-200 whitespace-nowrap",
                      onHero
                        ? pathname === link.href
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                        : pathname === link.href
                          ? "text-primary"
                          : "text-foreground/55 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Col 3: Right side (right-aligned inside its column) ── */}
            <div className="flex items-center justify-end gap-3">
              <ThemeToggle
                className={cn(
                  "transition-colors duration-200",
                  onHero
                    ? "text-white/60 hover:text-white"
                    : "text-foreground/55 hover:text-foreground"
                )}
              />

              {/* CTA — desktop only */}
              <Link
                href="/contact"
                className={cn(
                  "hidden md:inline-flex items-center px-5 py-2 rounded-full",
                  "font-sans text-[10.5px] font-bold tracking-[0.18em] uppercase whitespace-nowrap",
                  "transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]",
                  onHero
                    ? "bg-white text-zinc-900 hover:bg-white/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                Book Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "md:hidden w-8 h-8 flex items-center justify-center rounded-full",
                  "transition-colors duration-200",
                  onHero
                    ? "text-white/80 hover:text-white"
                    : "text-foreground/70 hover:text-foreground"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </motion.nav>
      </motion.div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed top-[82px] left-5 right-5 z-50",
                "bg-background/96 dark:bg-neutral-900/96 backdrop-blur-2xl",
                "rounded-2xl shadow-2xl overflow-hidden"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="px-6 pt-5 pb-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.22 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 border-b border-border/40",
                        "font-serif text-2xl font-light transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="px-6 py-5 bg-secondary/30"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-full bg-primary text-primary-foreground font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
                >
                  Book an Event
                </Link>
                <p className="text-center font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground mt-3">
                  @sandaltreebysk
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
