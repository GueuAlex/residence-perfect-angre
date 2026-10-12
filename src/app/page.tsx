import { Navigation } from "@/components/layout/Navigation";
import { PiedDePage } from "@/components/layout/PiedDePage";
import { Appartements } from "@/components/sections/Appartements";
import { Confort } from "@/components/sections/Confort";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Ruban } from "@/components/sections/Ruban";
import { Tarifs } from "@/components/sections/Tarifs";

export default function Accueil() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Ruban />
        <Tarifs />
        <Appartements />
        <Confort />
        <Contact />
      </main>
      <PiedDePage />
    </>
  );
}
