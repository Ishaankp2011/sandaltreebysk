import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <nav 
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-full ${
          scrolled 
            ? "glass-panel shadow-[0_12px_40px_rgba(6,10,10,0.12)] w-full max-w-3xl sm:max-w-4xl" 
            : "bg-black/20 backdrop-blur-md border border-white/10 w-full max-w-4xl sm:max-w-5xl"
        }`}
      >
        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={scrolled ? "text-foreground" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-10">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-primary">CHAEEN</Link>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (text) */}
        <Link href="/" className={`text-xl sm:text-2xl font-serif font-bold tracking-tight transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
          CHAEEN
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors uppercase relative group ${
                scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-primary' : 'bg-white'}`} />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
           <Link href="/shop">
            <Button 
              size="sm" 
              className={`rounded-full px-4 lg:px-6 py-2 font-medium transition-all text-sm ${
                scrolled 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Shop Now
            </Button>
          </Link>
        </div>
        
        {/* Spacer for mobile layout balance */}
        <div className="w-6 md:hidden" />
      </nav>
    </motion.div>
  );
}
