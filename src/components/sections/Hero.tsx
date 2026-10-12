import type { CSSProperties } from "react";
import { Magnetique } from "@/components/motion/Magnetique";
import { Mosaique } from "@/components/motion/Mosaique";
import { Bouton } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { contact, hero, mosaique } from "@/content/site";

// Premiere ligne du titre : le premier "o" devient un soleil
const [avantO, ...apresO] = hero.titre[0].split("o");

export function Hero() {
  return (
    <section
      id="accueil"
      className="gouttiere mx-auto grid min-h-svh max-w-[1480px] content-center items-center gap-5 pb-12 pt-[88px] md:grid-cols-2 md:gap-[clamp(24px,4vw,64px)] md:pt-[110px]"
    >
      <div>
        <p style={{ "--i": 0 } as CSSProperties} className="entree-fondu inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] md:text-[13px]">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-corail" />
          <span className="md:hidden">{hero.kickerCourt}</span>
          <span className="hidden md:inline">{hero.kicker}</span>
        </p>

        <h1 className="titre-section my-4 text-[clamp(32px,9.4vw,60px)] md:my-6 md:text-[clamp(38px,5.4vw,92px)]">
          <span style={{ "--i": 0 } as CSSProperties} className="entree-ligne block">
            {avantO}
            <span className="o-soleil">o</span>
            {apresO.join("o")}
          </span>
          <span style={{ "--i": 1 } as CSSProperties} className="entree-ligne block">{hero.titre[1]}</span>
          <span style={{ "--i": 2 } as CSSProperties} className="entree-ligne block text-corail">{hero.titre[2]}</span>
        </h1>

        <p style={{ "--i": 1 } as CSSProperties} className="entree-fondu max-w-[470px] text-base md:text-[clamp(16px,1.3vw,19px)]">{hero.sousTitre}</p>

        <div style={{ "--i": 2 } as CSSProperties} className="entree-fondu mt-6 flex flex-wrap gap-3 md:mt-8">
          <Magnetique>
            <Bouton href={contact.whatsappLien}>
              <Icone nom="bulle" />
              <span>
                {hero.ctaPrincipal.court}
                <span className="hidden sm:inline">{hero.ctaPrincipal.long}</span>
              </span>
            </Bouton>
          </Magnetique>
          <Bouton href={contact.telephoneLien} variante="trait">
            <Icone nom="tel" />
            {hero.ctaSecondaire}
          </Bouton>
        </div>

        <p style={{ "--i": 3 } as CSSProperties} className="entree-fondu mt-6 inline-flex items-center gap-2.5 text-sm">
          <span aria-hidden="true" className="h-[11px] w-[22px] rounded-t-full bg-soleil" />
          {hero.prix.avant} <b className="font-display font-semibold">{hero.prix.valeur}</b> {hero.prix.apres}
        </p>
      </div>

      <Mosaique tuiles={mosaique} className="order-first w-[min(100%,37svh)] justify-self-center md:order-none md:w-[min(100%,78svh,640px)]" />
    </section>
  );
}
