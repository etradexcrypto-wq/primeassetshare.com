import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollReveal() {
  const [location] = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const selector = ["main section:not(.prime-hero):not(.prime-motion-panels)", ".prime-goal-card", ".plan-card", ".certificate-card", ".image-rail", ".prime-research-image", ".featured-story-stage"].join(",");
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target as HTMLElement;
        node.classList.add("prime-reveal-visible");
        observer.unobserve(node);
      }), { threshold: .12, rootMargin: "0px 0px -8%" });
      nodes.forEach((node, index) => { node.classList.add("prime-reveal-ready"); node.style.setProperty("--reveal-order", String(index % 4)); observer.observe(node); });
      (window as Window & { __primeassetshareRevealObserver?: IntersectionObserver }).__primeassetshareRevealObserver = observer;
    });
    return () => { cancelAnimationFrame(frame); const target = window as Window & { __primeassetshareRevealObserver?: IntersectionObserver }; target.__primeassetshareRevealObserver?.disconnect(); delete target.__primeassetshareRevealObserver; };
  }, [location]);
  return null;
}
