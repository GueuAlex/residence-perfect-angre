"use client";

import { useRef, type ReactNode } from "react";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

type Props = {
  className?: string;
  children: ReactNode;
  // Decalage entre les enfants directs
  cascade?: number;
};

// Fait apparaitre les enfants directs en cascade a l'entree dans l'ecran
export function Revele({ className, children, cascade = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        gsap.from(ref.current!.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          stagger: cascade,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
