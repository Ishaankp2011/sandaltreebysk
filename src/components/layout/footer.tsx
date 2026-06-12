import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, ExternalLink, Shield } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#weddings", label: "Weddings" },
  { href: "/services#receptions", label: "Receptions" },
  { href: "/services#engagements", label: "Engagements" },
  { href: "/services#corporate", label: "Corporate Events" },
  { href: "/services#birthdays", label: "Birthdays" },
  { href: "/services#anniversaries", label: "Anniversaries" },
];

export function Footer() {
  return (
    <footer
      className="bg-charcoal-950 dark:bg-charcoal-950 text-white/80"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer */}
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex flex-col leading-none mb-6 hover:opacity-80 transition-opacity"
              aria-label="Sandal Tree by SK — Home"
            >
              <span className="font-serif text-2xl font-semibold tracking-wide text-white">
                Sandal Tree
              </span>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary font-medium mt-0.5">
                by SK
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-white/55 mb-6">
              A premier luxury banquet hall crafted for life's most cherished
              celebrations. Every event, an unforgettable experience.
            </p>
            <a
              href="https://instagram.com/sandaltreebysk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/55 hover:text-primary transition-colors text-sm font-sans"
              aria-label="Follow us on Instagram @sandaltreebysk"
            >
              <Instagram size={15} aria-hidden />
              @sandaltreebysk
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-6">
              Our Services
            </h3>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-start gap-3 font-sans text-sm text-white/55 hover:text-white transition-colors"
                  aria-label="Call us"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sandaltreebysk.com"
                  className="flex items-start gap-3 font-sans text-sm text-white/55 hover:text-white transition-colors"
                  aria-label="Email us"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  info@sandaltreebysk.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/igwQWRRDBFBV8LFb6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-sans text-sm text-white/55 hover:text-white transition-colors"
                  aria-label="Get directions on Google Maps"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span>
                    View on Google Maps
                    <ExternalLink size={10} className="inline ml-1 opacity-60" aria-hidden />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/35">
            © {new Date().getFullYear()} Sandal Tree by SK. All rights reserved.
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link
              href="/privacy-policy"
              className="font-sans text-xs text-white/35 hover:text-white/65 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-white/35 hover:text-white/65 transition-colors"
            >
              Terms & Conditions
            </Link>

            {/* Admin panel link — subtle, for owner use */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-sans text-xs text-white/25 hover:text-white/55 transition-colors group"
              aria-label="Admin panel"
            >
              <Shield
                size={11}
                className="group-hover:text-primary transition-colors"
                aria-hidden
              />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
