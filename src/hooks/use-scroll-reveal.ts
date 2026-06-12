"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the `in-view` class to elements with `.reveal-up` when they enter
 * the viewport, triggering the CSS transition defined in globals.css.
 */
export function useScrollReveal(rootMargin = "0px 0px -60px 0px") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal-up");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
