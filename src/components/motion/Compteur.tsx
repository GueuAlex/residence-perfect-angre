"use client";

import { useRef } from "react";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

// Separateur de milliers insecable (l'espace fine n'existe pas dans toutes les polices)
export const formaterPrix = (valeur: number) => valeur.toLocaleString("fr-FR").replace(/\s/g, " ");

type Props = {
  valeur: number;
  // Pas d'arrondi pendant le comptage
  pas?: number;
  className?: string;
};

// Nombre qui compte jusqu'a sa valeur a l'entree dans l'ecran
export function Compteur({ valeur, pas = 500, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        const el = ref.current!;
        const etat = { v: 0 };
        gsap.to(etat, {
          v: valeur,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = formaterPrix(Math.round(etat.v / pas) * pas);
          },
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        return () => {
          el.textContent = formaterPrix(valeur);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {formaterPrix(valeur)}
    </span>
  );
}
