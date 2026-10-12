"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Forme } from "@/components/ui/Forme";
import { Icone } from "@/components/ui/Icone";
import { Logo } from "@/components/ui/Logo";
import { contact, navigation } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

export function Navigation() {
  const [ouvert, setOuvert] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline>(null);
  const lenis = useLenis();

  // Rideau cobalt du menu mobile
  useGSAP(
    () => {
      animation.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { visibility: "visible" })
        .fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
        .from(".menu-lien", { yPercent: 110, duration: 0.7, stagger: 0.06, ease: "expo.out" }, "-=0.3")
        .from(".menu-forme", { scale: 0, rotation: -90, duration: 0.6, stagger: 0.08, ease: "back.out(2)" }, "-=0.6");
    },
    { scope: menu },
  );

  useEffect(() => {
    if (ouvert) {
      animation.current?.play();
      lenis?.stop();
    } else {
      animation.current?.reverse();
      lenis?.start();
    }
  }, [ouvert, lenis]);

  const allerA = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOuvert(false);
    lenis?.start();
    lenis?.scrollTo(href, { duration: 1.4 });
  };

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className="gouttiere fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-encre bg-creme py-3 md:py-3.5"
      >
        <a href="#accueil">
          <Logo taille="text-base md:text-lg" />
        </a>
        <ul className="hidden gap-7 text-sm font-medium md:flex">
          {navigation.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2 bg-encre transition-[rotate,border-radius,background-color] duration-500 ease-net group-hover:rotate-45 group-hover:rounded-full group-hover:bg-corail"
                />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5 md:gap-4">
          <a
            href={contact.whatsappLien}
            className="inline-flex h-10 items-center gap-2 bg-encre px-3.5 text-sm font-semibold text-creme transition-colors hover:bg-corail hover:text-encre md:h-auto md:px-[18px] md:py-3"
          >
            <Icone nom="bulle" className="size-4" />
            Réserver
          </a>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
            className="relative grid size-10 place-items-center border-2 border-encre md:hidden"
          >
            {/* Deux traits qui se croisent a l'ouverture */}
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-5 bg-encre transition-transform duration-500 ease-net ${ouvert ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-5 bg-encre transition-transform duration-500 ease-net ${ouvert ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        ref={menu}
        inert={!ouvert}
        className="invisible fixed inset-0 z-40 flex flex-col justify-end bg-cobalt px-4 pb-14 text-creme md:hidden"
      >
        <div aria-hidden="true" className="absolute right-4 top-24 flex gap-2">
          <Forme forme="rond" couleur="soleil" className="menu-forme w-12" />
          <Forme forme="tri" couleur="corail" className="menu-forme w-12" />
          <Forme forme="carre" couleur="rose" className="menu-forme w-12" />
        </div>
        <ul>
          {navigation.map((l) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={(e) => allerA(e, l.href)}
                className="menu-lien block font-display text-[9vw] font-semibold uppercase leading-[1.15] tracking-[-0.03em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-1 text-lg">
          <a href={contact.whatsappLien} className="menu-lien block font-semibold">
            WhatsApp · {contact.whatsappAffiche}
          </a>
          <a href={contact.telephoneLien} className="menu-lien block">
            Appel · {contact.telephoneAffiche}
          </a>
        </div>
      </div>
    </>
  );
}
