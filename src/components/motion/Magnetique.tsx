"use client";

import { useRef, type ReactNode } from "react";
import { AVEC_ANIMATIONS, gsap, SURVOL, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  // Intensite de l'attraction (0 a 1)
  force?: number;
};

// L'enfant est attire par le curseur (ordinateur uniquement)
export function Magnetique({ children, className = "", force = 0.3 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(`${AVEC_ANIMATIONS} and ${SURVOL}`, () => {
        const el = ref.current!;
        const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const bouger = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          qx((e.clientX - r.left - r.width / 2) * force);
          qy((e.clientY - r.top - r.height / 2) * force * 1.3);
        };
        const lacher = () => {
          qx(0);
          qy(0);
        };
        el.addEventListener("pointermove", bouger);
        el.addEventListener("pointerleave", lacher);
        return () => {
          el.removeEventListener("pointermove", bouger);
          el.removeEventListener("pointerleave", lacher);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
