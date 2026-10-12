import type { Couleur } from "@/content/site";

// Classes Tailwind ecrites en entier pour etre detectees au build
export const fonds: Record<Couleur, string> = {
  soleil: "bg-soleil",
  corail: "bg-corail",
  cobalt: "bg-cobalt",
  rose: "bg-rose",
  encre: "bg-encre",
  papier: "bg-papier",
  creme: "bg-creme",
};
