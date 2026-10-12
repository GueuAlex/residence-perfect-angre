import type { CSSProperties } from "react";
import type { Couleur, NomForme } from "@/content/site";
import { fonds } from "./couleurs";

const contours: Record<NomForme, string> = {
  rond: "aspect-square rounded-full",
  demi: "aspect-[2/1] rounded-t-full",
  quart: "aspect-square rounded-tr-full",
  tri: "aspect-square [clip-path:polygon(50%_0,100%_100%,0_100%)]",
  carre: "aspect-square",
};

type Props = {
  forme: NomForme;
  couleur: Couleur;
  className?: string;
  style?: CSSProperties;
};

// Forme geometrique pleine (vocabulaire Bauhaus de la piste A)
export function Forme({ forme, couleur, className = "", style }: Props) {
  return <span aria-hidden="true" style={style} className={`block ${contours[forme]} ${fonds[couleur]} ${className}`} />;
}
