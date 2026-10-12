"use client";

import { useRef } from "react";
import { Compteur } from "@/components/motion/Compteur";
import { Revele } from "@/components/motion/Revele";
import { Forme } from "@/components/ui/Forme";
import { Rayures } from "@/components/ui/Rayures";
import { tarifs } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

// Composition geometrique de chaque bande de tarif
const compositions = [
  <Forme key="demi" forme="demi" couleur="cobalt" className="bande-forme w-[76%] self-end justify-self-center" />,
  <>
    <Forme forme="rond" couleur="soleil" className="bande-forme w-[52%] place-self-center" />
    <Forme forme="quart" couleur="corail" className="bande-forme absolute bottom-0 left-0 w-[30%]" />
  </>,
];

export function Tarifs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        // Les formes pivotent et grandissent a mesure que la bande entre
        gsap.utils.toArray<HTMLElement>(".bande").forEach((bande) => {
          gsap.fromTo(
            bande.querySelectorAll(".bande-forme"),
            { rotation: -90, scale: 0.6 },
            { rotation: 0, scale: 1, ease: "none", scrollTrigger: { trigger: bande, start: "top bottom", end: "center 55%", scrub: true } },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="tarifs" className="pt-[clamp(96px,12vw,180px)]">
      <div className="gouttiere mx-auto mb-[clamp(40px,5vw,72px)] flex max-w-[1480px] flex-wrap items-end justify-between gap-6">
        <Revele>
          <p className="eyebrow text-brique">{tarifs.eyebrow}</p>
          <h2 className="titre-section mt-3.5 max-w-[15ch] text-[clamp(30px,4.4vw,72px)]">{tarifs.titre}</h2>
        </Revele>
        <p className="max-w-[340px]">{tarifs.intro}</p>
      </div>

      {tarifs.formules.map((f, i) => (
        <div
          key={f.label}
          className={`bande grid overflow-hidden border-t-2 border-encre md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center ${
            i === 0 ? "bg-soleil" : "bg-cobalt text-creme"
          }`}
        >
          <div aria-hidden="true" className="relative grid h-[200px] overflow-hidden md:h-[clamp(220px,30vw,420px)]">
            {compositions[i]}
          </div>
          <div className="gouttiere py-10">
            <p className={`eyebrow ${i === 0 ? "" : "text-soleil-clair"}`}>{f.label}</p>
            <p className="titre-section my-3 whitespace-nowrap text-[clamp(52px,8.2vw,150px)] font-bold leading-[0.9] tracking-[-0.05em]">
              <Compteur valeur={f.prix} />
              <small className="ml-[0.4em] align-top text-[0.16em] font-semibold tracking-[0.04em]">{tarifs.devise}</small>
            </p>
            <p className="max-w-[380px] text-[17px]">{f.texte}</p>
          </div>
        </div>
      ))}

      <p className="gouttiere flex items-center gap-4 border-y-2 border-encre bg-rose py-6 text-[clamp(16px,1.6vw,22px)]">
        <Rayures className="w-[46px] shrink-0 text-encre" />
        <span>
          {tarifs.longSejour.avant}
          <b className="font-bold">{tarifs.longSejour.gras}</b>
          {tarifs.longSejour.apres}
        </span>
      </p>
    </section>
  );
}
