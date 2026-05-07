"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Use layout effect on client, regular effect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fade up animation on scroll
 */
export function useFadeUp(deps: any[] = []) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, deps);

  return ref;
}

/**
 * Stagger reveal for children
 */
export function useStaggerReveal(deps: any[] = []) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, deps);

  return ref;
}

/**
 * Scale in animation
 */
export function useScaleIn(deps: any[] = []) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, deps);

  return ref;
}

/**
 * Hero animation sequence
 */
export function useHeroAnimation(deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.5 })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .from(".hero-text", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-image", { scale: 0.98, opacity: 0, duration: 0.8 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
}

/**
 * Navbar animation
 */
export function useNavbarAnimation() {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}