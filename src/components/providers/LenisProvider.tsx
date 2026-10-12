"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Met a jour ScrollTrigger a chaque defilement Lenis
function SynchroScrollTrigger() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Lenis est pilote par le ticker GSAP : une seule boucle d'animation
    const tick = (temps: number) => lenisRef.current?.lenis?.raf(temps * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: true }}>
      <SynchroScrollTrigger />
      {children}
    </ReactLenis>
  );
}
