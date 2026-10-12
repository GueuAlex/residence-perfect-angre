"use client";

import { useRef } from "react";
import { Magnetique } from "@/components/motion/Magnetique";
import { Bouton } from "@/components/ui/Bouton";
import { Forme } from "@/components/ui/Forme";
import { Icone } from "@/components/ui/Icone";
import { contact, reservation } from "@/content/site";
import { AVEC_ANIMATIONS, gsap, useGSAP } from "@/lib/gsap";

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(AVEC_ANIMATIONS, () => {
        // Le toit du logo se dessine en grand au fil du scroll
        gsap.from(".toit-trace path", {
          drawSVG: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "center 60%", scrub: true },
        });
        gsap.from(".contact-deco > *", {
          y: 60,
          rotation: 90,
          autoAlpha: 0,
          duration: 1,
          ease: "back.out(1.6)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-deco", start: "top 95%" },
        });
        gsap.from(".contact-apparition", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="contact"
      className="gouttiere relative overflow-hidden border-t-2 border-encre bg-cobalt pb-[clamp(80px,10vw,140px)] pt-[clamp(110px,14vw,200px)] text-creme"
    >
      <svg
        viewBox="0 0 120 56"
        aria-hidden="true"
        className="toit-trace pointer-events-none absolute bottom-4 left-1/2 w-[110vw] -translate-x-1/2 md:bottom-auto md:top-10 md:w-[min(1300px,150vw)] text-soleil opacity-70"
      >
        <path d="M7 50 L46 11 L80 45" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M62 48.5 H116" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      <div className="relative max-w-[1100px]">
        <p className="contact-apparition eyebrow text-soleil-clair">{reservation.eyebrow}</p>
        <h2 className="contact-apparition titre-section mb-6 mt-4 text-[clamp(40px,7.4vw,128px)] font-bold leading-[0.95] tracking-[-0.045em]">
          {reservation.titre[0]} <span className="text-soleil">{reservation.titre[1]}</span>
        </h2>
        <p className="contact-apparition max-w-[520px] text-[17px]">{reservation.texte}</p>
        <div className="contact-apparition mt-8 flex flex-wrap gap-3">
          <Magnetique>
            <Bouton href={contact.whatsappLien} variante="soleil">
              <Icone nom="bulle" />
              {reservation.ctaWhatsapp}
            </Bouton>
          </Magnetique>
          <Bouton href={contact.telephoneLien} variante="trait-clair">
            <Icone nom="tel" />
            {contact.telephoneAffiche}
          </Bouton>
        </div>
        <a href={contact.tiktok} className="contact-apparition mt-8 inline-flex items-center gap-2 underline-offset-4 hover:underline">
          <Icone nom="note" />
          {reservation.tiktok}
        </a>
      </div>

      <div className="contact-deco mt-10 flex gap-2.5 md:absolute md:bottom-[60px] md:right-[clamp(16px,4vw,56px)] md:mt-0">
        <Forme forme="rond" couleur="soleil" className="w-[clamp(40px,6vw,84px)]" />
        <Forme forme="tri" couleur="corail" className="w-[clamp(40px,6vw,84px)]" />
        <Forme forme="carre" couleur="rose" className="w-[clamp(40px,6vw,84px)]" />
      </div>
    </section>
  );
}
