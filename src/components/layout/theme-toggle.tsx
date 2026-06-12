"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // Don't render the icon until we know the actual theme on the client.
  // This prevents server/client mismatch (hydration error).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
        className
      )}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      suppressHydrationWarning
    >
      {/* Render a placeholder until mounted so SSR and client match */}
      {!mounted ? (
        <Sun size={16} aria-hidden />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.22 }}
              className="block"
            >
              <Moon size={16} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 45, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -45, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.22 }}
              className="block"
            >
              <Sun size={16} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </button>
  );
}
