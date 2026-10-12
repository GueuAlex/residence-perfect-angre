"use client";

import { useRef } from "react";
import { Forme } from "@/components/ui/Forme";
import { ruban } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function Groupe() {
  return (
    <div className="flex items-center gap-[clamp(20px,3vw,44px)] pr-[clamp(20px,3vw,44px)]">
      {ruban.map((r) => (
        <span key={r.mot} className="flex items-center gap-[clamp(20px,3vw,44px)]">
          <span className="whitespace-nowrap font-display text-[clamp(24px,3.6vw,52px)] font-semibold uppercase tracking-[-0.02em]">
            {r.mot}
          </span>
          <Forme forme={r.forme} couleur={r.couleur} className="w-[clamp(20px,2.6vw,36px)] shrink-0" />
        </span>
      ))}
    </div>
  );
}

// Bandeau cobalt defilant ; sa vitesse suit celle du scroll
export function Ruban() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        const boucle = gsap.to(".ruban-piste", { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
        ScrollTrigger.create({
          onUpdate(self) {
            const v = self.getVelocity();
            gsap.to(boucle, {
              timeScale: (v < 0 ? -1 : 1) * (1 + Math.min(Math.abs(v) / 300, 5)),
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(boucle, { timeScale: 1, duration: 1.2 });
              },
            });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden border-y-2 border-encre bg-cobalt py-5 text-creme">
      <div className="ruban-piste flex w-max">
        <Groupe />
        <Groupe />
      </div>
    </div>
  );
}
