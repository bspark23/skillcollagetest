"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapInit() {
  useEffect(() => {
    // Animate all sections on scroll
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true,
        },
      });
    });

    // Stagger cards in grids
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
      const children = Array.from(grid.children);
      if (children.length > 1) {
        gsap.from(children, {
          y: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
