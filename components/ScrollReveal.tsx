"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observes every element marked with `data-reveal` and adds the
 * `is-visible` class when it enters the viewport (fade-up on scroll).
 * Also handles dynamically added elements and re-observation on route changes.
 */
export default function ScrollReveal() {
  const [initialized, setInitialized] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            observerRef.current?.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [initialized]);

  // Observe newly added elements on re-render (SPA navigation)
  useEffect(() => {
    const handleMutation = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
      );
      elements.forEach((el) => observerRef.current?.observe(el));
    };

    // Run once after mount
    handleMutation();

    // Re-observe when content changes (simple MutationObserver for demo)
    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [initialized]);

  return null;
}
