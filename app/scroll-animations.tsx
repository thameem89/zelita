"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealGroups = [
  {
    selector:
      ".industrial-hero-content, .detail-hero-content, .division-hero-copy, .company-copy, .contact-inner > div, .page-cta-inner, .division-cta-inner > div",
    variant: "up",
  },
  {
    selector:
      ".industrial-hero-image, .detail-hero-image, .division-hero-visual, .company-image, .division-brand-mark",
    variant: "scale",
  },
  {
    selector:
      ".capability-grid article, .division-panel, .service-showcase-card, .value-grid article, .service-detail-grid article, .process-grid article, .division-category-card, .division-product-card, .division-application-grid article, .division-benefit-list article, .footer-column, .footer-brand-column",
    variant: "up",
  },
  {
    selector:
      ".centered-heading, .division-section-head, .section-head, .story-grid > div, .contact-card, .quote-panel",
    variant: "up",
  },
];

const staggerParents = [
  ".capability-grid",
  ".division-showcase-grid",
  ".service-showcase-grid",
  ".value-grid",
  ".service-detail-grid",
  ".process-grid",
  ".division-category-grid",
  ".division-product-grid",
  ".division-application-grid",
  ".division-benefit-list",
  ".public-footer-main",
];

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (reduceMotion) {
      root.classList.remove("reveal-ready");
      return;
    }

    const revealed = new Set<Element>();

    for (const group of revealGroups) {
      document.querySelectorAll<HTMLElement>(group.selector).forEach((element) => {
        if (element.closest(".admin-shell")) return;
        element.dataset.reveal = group.variant;
        element.style.removeProperty("--reveal-delay");
        revealed.add(element);
      });
    }

    for (const parentSelector of staggerParents) {
      document.querySelectorAll(parentSelector).forEach((parent) => {
        Array.from(parent.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement) || !revealed.has(child)) return;
          child.style.setProperty("--reveal-delay", `${Math.min(index * 70, 360)}ms`);
        });
      });
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    revealed.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      revealed.forEach((element) => {
        element.classList.remove("reveal-in");
        if (element instanceof HTMLElement) {
          element.style.removeProperty("--reveal-delay");
        }
      });
      root.classList.remove("reveal-ready");
    };
  }, [pathname]);

  return null;
}
