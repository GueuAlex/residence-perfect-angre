"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { Forme } from "@/components/ui/Forme";
import { Rayures } from "@/components/ui/Rayures";
import { Toit } from "@/components/ui/Toit";
import { fonds } from "@/components/ui/couleurs";
import type { Tuile } from "@/content/site";
import { AVEC_ANIMATIONS, Flip, gsap, SURVOL, useGSAP } from "@/lib/gsap";

// Ordre d'apparition des tuiles (melange fixe pour un effet aleatoire)
const ORDRE_ENTREE = [3, 7, 0, 5, 2, 8, 1, 6, 4];

// Taille d'une tuile : un tiers de la mosaique
const TAILLES = "(min-width: 768px) 220px, 34vw";

// Placement des formes dans leur tuile
const placements = {
  rond: "w-[70%]",
  demi: "w-[84%] self-end",
  quart: "absolute bottom-0 left-0 w-[86%]",
  tri: "w-[70%]",
  carre: "w-[64%]",
} as const;

function ContenuTuile({ tuile }: { tuile: Tuile }) {
  switch (tuile.type) {
    case "forme":
      return <Forme forme={tuile.forme} couleur={tuile.couleur} className={`forme-tuile ${placements[tuile.forme]}`} />;
    case "toit":
      return <Toit className="forme-tuile w-[78%] text-encre" />;
    case "rayures":
      return <Rayures className="forme-tuile size-full text-encre" />;
    case "prix":
      return (
        <div className="grid gap-1 justify-self-start px-[14%] text-creme">
          <span className="text-[clamp(9px,1vw,12px)] font-semibold uppercase tracking-[0.16em] text-soleil">{tuile.label}</span>
          <b className="whitespace-nowrap font-display text-[clamp(14px,1.9vw,28px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {tuile.valeur}
          </b>
        </div>
      );
    case "photo": {
      const cadres = {
        arche: "absolute inset-x-[12%] top-[12%] bottom-0 rounded-t-full",
        rond: "absolute inset-[12%] rounded-full",
        plein: "absolute inset-0",
      };
      return (
        <div className={`overflow-hidden ${cadres[tuile.cadre]}`}>
          <Image
            src={tuile.photo.src}
            alt={tuile.photo.alt}
            fill
            sizes={TAILLES}
            loading="eager"
            fetchPriority={tuile.cadre === "plein" ? "high" : undefined}
            className="object-cover"
            style={tuile.photo.cadrage ? { objectPosition: tuile.photo.cadrage } : undefined}
          />
        </div>
      );
    }
  }
}

type Props = {
  tuiles: Tuile[];
  className?: string;
};

// Signature de la piste A : neuf tuiles qui echangent leur place en continu (GSAP Flip)
export function Mosaique({ tuiles, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_contexte, contextSafe) => {
      const grille = ref.current!;
      const elements = gsap.utils.toArray<HTMLElement>(".tuile", grille);
      // L'ordre CSS sert a melanger sans toucher au DOM gere par React
      elements.forEach((t, i) => (t.style.order = String(i)));

      const mm = gsap.matchMedia();

      mm.add(AVEC_ANIMATIONS, () => {
        let visible = true;
        const observateur = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        observateur.observe(grille);

        const melanger = contextSafe!(() => {
          if (!visible || document.hidden) return;
          const i = gsap.utils.random(0, elements.length - 1, 1);
          let j = gsap.utils.random(0, elements.length - 2, 1);
          if (j >= i) j++;
          const etat = Flip.getState(elements);
          const ordre = elements[i].style.order;
          elements[i].style.order = elements[j].style.order;
          elements[j].style.order = ordre;
          Flip.from(etat, { duration: 1, ease: "power3.inOut" });
          // Une forme au hasard pivote d'un quart de tour
          const formes = gsap.utils.toArray<HTMLElement>(".forme-tuile", grille);
          gsap.to(gsap.utils.random(formes), { rotation: "+=90", duration: 1, ease: "power3.inOut" });
        });

        let intervalle = 0;
        const depart = window.setTimeout(() => {
          intervalle = window.setInterval(melanger, 2800);
        }, 2200);

        return () => {
          window.clearTimeout(depart);
          window.clearInterval(intervalle);
          observateur.disconnect();
        };
      });

      // Au survol, la forme de la tuile pivote
      mm.add(`${AVEC_ANIMATIONS} and ${SURVOL}`, () => {
        const tourner = contextSafe!((e: PointerEvent) => {
          const forme = (e.currentTarget as HTMLElement).querySelector(".forme-tuile");
          if (forme) gsap.to(forme, { rotation: "+=90", duration: 0.9, ease: "power3.inOut" });
        });
        elements.forEach((t) => t.addEventListener("pointerenter", tourner));
        return () => elements.forEach((t) => t.removeEventListener("pointerenter", tourner));
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`mosaique grid aspect-square grid-cols-3 grid-rows-3 gap-1.5 md:gap-2.5 ${className}`}>
      {tuiles.map((tuile, i) => (
        <div
          key={i}
          style={{ "--i": ORDRE_ENTREE[i] } as CSSProperties}
          className={`tuile entree-tuile relative grid place-items-center overflow-hidden ${fonds[tuile.fond]}`}
        >
          <ContenuTuile tuile={tuile} />
        </div>
      ))}
    </div>
  );
}
