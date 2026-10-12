import type { ComponentPropsWithoutRef } from "react";

type Variante = "encre" | "trait" | "soleil" | "trait-clair";

const styles: Record<Variante, string> = {
  encre: "border-encre bg-encre text-creme hover:border-corail hover:bg-corail hover:text-encre",
  trait: "border-encre hover:bg-encre hover:text-creme",
  soleil: "border-soleil bg-soleil text-encre hover:border-creme hover:bg-creme",
  "trait-clair": "border-creme text-creme hover:bg-creme hover:text-cobalt",
};

type Props = ComponentPropsWithoutRef<"a"> & { variante?: Variante };

// Lien d'action (WhatsApp, appel, ancre) au trait franc de la piste A
export function Bouton({ variante = "encre", className = "", ...props }: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2.5 border-2 px-5 py-3.5 text-[15px] font-semibold transition-colors duration-300 md:px-6 md:py-4 ${styles[variante]} ${className}`}
      {...props}
    />
  );
}
