"use client";

import { useRef, type CSSProperties } from "react";
import { Revele } from "@/components/motion/Revele";
import { Forme } from "@/components/ui/Forme";
import { confort } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

export function Confort() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        gsap.from(".puce", {
          rotation: -180,
          scale: 0,
          duration: 1,
          ease: "back.out(1.6)",
          stagger: 0.08,
          scrollTrigger: { trigger: ".liste-confort", start: "top 80%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="confort" className="gouttiere mx-auto max-w-[1480px] py-[clamp(96px,12vw,180px)]">
      <Revele>
        <p className="eyebrow text-corail">{confort.eyebrow}</p>
        <h2 className="titre-section mb-[clamp(36px,5vw,64px)] mt-3.5 max-w-[16ch] text-[clamp(30px,4.4vw,72px)]">{confort.titre}</h2>
      </Revele>

      <ul className="liste-confort border-t-2 border-encre">
        {confort.equipements.map((e) => (
          <li
            key={e.nom}
            style={{ "--c": `var(--color-${e.couleur})` } as CSSProperties}
            className={`group relative isolate grid grid-cols-[30px_1fr] items-center gap-x-[clamp(14px,2.4vw,32px)] gap-y-1 border-b-2 border-encre px-[clamp(8px,1.4vw,20px)] py-[clamp(16px,2vw,26px)] transition-colors delay-100 duration-300 before:absolute before:inset-0 before:-z-10 before:bg-(--c) before:transition-[clip-path] before:duration-800 before:ease-net before:[clip-path:circle(0%_at_4%_50%)] hover:before:[clip-path:circle(150%_at_4%_50%)] sm:grid-cols-[clamp(34px,4vw,56px)_1fr_auto] ${
              e.texteClair ? "hover:text-creme" : ""
            }`}
          >
            <span className="puce block">
              <Forme
                forme={e.forme}
                couleur={e.couleur}
                className={`transition-[rotate,scale,background-color] duration-800 ease-net group-hover:scale-60 group-hover:rotate-180 ${
                  e.texteClair ? "group-hover:bg-creme" : "group-hover:bg-encre"
                }`}
              />
            </span>
            <b className="font-display text-[clamp(22px,3.6vw,56px)] font-semibold uppercase leading-none tracking-[-0.03em]">{e.nom}</b>
            <small className="col-start-2 text-[15px] sm:col-start-auto sm:max-w-[240px] sm:text-right">{e.detail}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
