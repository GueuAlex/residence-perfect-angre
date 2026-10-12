"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Forme } from "@/components/ui/Forme";
import { Icone } from "@/components/ui/Icone";
import { Toit } from "@/components/ui/Toit";
import { appartements, type Photo } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

const TAILLES = "(min-width: 768px) 320px, 50vw";

// Photo detouree dans un cadre geometrique au trait
function Cadre({ photo, className }: { photo: Photo; className: string }) {
  return (
    <div className={`absolute overflow-hidden border-2 border-encre ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={TAILLES}
        className="object-cover"
        style={photo.cadrage ? { objectPosition: photo.cadrage } : undefined}
      />
    </div>
  );
}

// Une affiche par format : fond, composition de formes et photos
const affiches: { fond: string; clair: boolean; composition: (photos: readonly Photo[]) => ReactNode }[] = [
  {
    fond: "bg-corail",
    clair: false,
    composition: ([photo]) => (
      <>
        <Forme forme="carre" couleur="soleil" className="tourne absolute right-[10%] top-[10%] w-[22%]" />
        <Cadre photo={photo} className="left-[21%] top-[12%] aspect-square w-[58%] rounded-full" />
        <Forme forme="rond" couleur="encre" className="absolute bottom-[12%] left-[10%] w-[9%]" />
      </>
    ),
  },
  {
    fond: "bg-cobalt",
    clair: true,
    composition: ([photo]) => (
      <>
        <Forme forme="demi" couleur="soleil" className="tourne absolute bottom-0 left-[15%] w-[70%]" />
        <Cadre photo={photo} className="left-[30%] top-[9%] h-[80%] w-[40%] rounded-t-full border-b-0" />
        <Forme forme="rond" couleur="rose" className="absolute right-[9%] top-[12%] w-[12%]" />
      </>
    ),
  },
  {
    fond: "bg-soleil",
    clair: false,
    composition: ([photoA, photoB]) => (
      <>
        <Cadre photo={photoA} className="left-[9%] top-[12%] aspect-square w-[38%]" />
        <Cadre photo={photoB} className="right-[9%] top-[12%] aspect-square w-[38%] rounded-t-full" />
        <div className="tourne absolute bottom-[8%] left-[31%] grid aspect-[2/1] w-[38%] place-items-center bg-encre text-soleil">
          <Toit className="w-[60%]" />
        </div>
      </>
    ),
  },
];

export function Appartements() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current!;
      const rail = section.querySelector<HTMLElement>(".appart-rail")!;

      // Sans animation, le rail reste un carrousel horizontal natif
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        section.dataset.epingle = "";
        const distance = () => rail.scrollWidth - innerWidth;
        const defile = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Les formes de chaque affiche pivotent pendant son passage
        gsap.utils.toArray<HTMLElement>(".tourne", section).forEach((forme) => {
          gsap.fromTo(
            forme,
            { rotation: -45 },
            {
              rotation: 45,
              ease: "none",
              scrollTrigger: { trigger: forme.closest(".affiche"), containerAnimation: defile, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        return () => {
          delete section.dataset.epingle;
        };
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="appartements"
      aria-labelledby="titre-appartements"
      className="overflow-x-auto [scrollbar-width:none] data-epingle:overflow-hidden"
    >
      <div className="appart-rail gouttiere flex h-svh min-h-[580px] w-max items-center gap-[clamp(16px,2vw,28px)] pb-8 pt-[84px]">
        <div className="w-[min(80vw,460px)] shrink-0">
          <p className="eyebrow text-brique">{appartements.eyebrow}</p>
          <h2 id="titre-appartements" className="titre-section mb-5 mt-3.5 text-[clamp(30px,4vw,60px)]">
            {appartements.titre}
          </h2>
          <p className="inline-flex items-center gap-3 font-semibold">
            <span aria-hidden="true" className="grid size-[46px] place-items-center rounded-full bg-soleil">
              <Icone nom="fleche" className="size-5" />
            </span>
            {appartements.aide}
          </p>
          <p className="mt-6 max-w-[320px] text-sm opacity-70">{appartements.note}</p>
        </div>

        {appartements.formats.map((format, i) => {
          const affiche = affiches[i];
          return (
            <article
              key={format.numero}
              className={`affiche relative grid h-[min(64svh,560px)] w-[min(82vw,540px)] md:h-[min(74svh,660px)] shrink-0 grid-rows-[1fr_auto] overflow-hidden border-2 border-encre ${affiche.fond} ${
                affiche.clair ? "text-creme" : ""
              }`}
            >
              <div className="relative overflow-hidden">{affiche.composition(format.photos)}</div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-t-2 border-encre px-6 pb-6 pt-5">
                <span className="font-display text-sm font-semibold">{format.numero}</span>
                <h3 className="titre-section text-[clamp(24px,3vw,42px)] tracking-[-0.03em]">{format.nom}</h3>
                <p className="col-start-2 max-w-[360px]">{format.texte}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
