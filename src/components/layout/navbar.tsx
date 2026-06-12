"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
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

  // Close on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onHero = isHomePage && !isScrolled;

  return (
    <>
      {/* ── Desktop / pill nav ── */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
        role="banner"
      >
        <nav
          className={cn(
            "pointer-events-auto w-full rounded-full",
            "transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-in-out",
            onHero
              ? "bg-black/30 backdrop-blur-lg shadow-none"
              : "bg-background/85 dark:bg-neutral-900/85 backdrop-blur-2xl shadow-[0_6px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_6px_32px_rgba(0,0,0,0.45)]",
            /* max width: wider on hero, tighter when scrolled */
            onHero ? "max-w-5xl" : "max-w-3xl",
            "transition-[max-width] duration-500 ease-in-out"
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-14 md:h-16 px-5 md:px-6">

            {/* Logo */}
            <Link
              href="/"
              aria-label="Sandal Tree — Home"
              className="select-none hover:opacity-70 transition-opacity duration-200 shrink-0"
            >
              <span className={cn(
                "font-serif font-bold tracking-[0.1em] uppercase whitespace-nowrap text-base md:text-[17px]",
                onHero ? "text-white" : "text-foreground"
              )}>
                Sandal Tree
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase",
                      "transition-colors duration-200 whitespace-nowrap",
                      onHero
                        ? pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                        : pathname === link.href ? "text-primary" : "text-foreground/55 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: theme toggle + CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <ThemeToggle
                className={cn(
                  "transition-colors duration-200",
                  onHero ? "text-white/60 hover:text-white" : "text-foreground/55 hover:text-foreground"
                )}
              />

              {/* Desktop CTA */}
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
                  "md:hidden w-9 h-9 flex items-center justify-center rounded-full",
                  "transition-colors duration-200",
                  onHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/8"
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
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </nav>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-background dark:bg-neutral-950"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-border/40 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="select-none"
                aria-label="Sandal Tree — Home"
              >
                <span className="font-serif font-bold tracking-[0.1em] uppercase text-base text-foreground">
                  Sandal Tree
                </span>
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-primary font-medium ml-1.5">
                  by SK
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/8 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile navigation links">
              <ul role="list" className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 border-b border-border/30",
                        "font-serif text-3xl font-light transition-colors",
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="shrink-0 px-6 pb-10 pt-6 border-t border-border/30 space-y-3"
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-full bg-primary text-primary-foreground font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                Book an Event
              </Link>
              <a
                href="https://instagram.com/sandaltreebysk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/40 font-sans text-[11px] font-medium tracking-widest uppercase transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={13} aria-hidden />
                @sandaltreebysk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
