import { residence } from "@/content/site";
import { Toit } from "./Toit";

type Props = {
  className?: string;
  // Taille du mot "Perfect" (classes Tailwind)
  taille?: string;
};

// Logo : toit dore et nom de la residence
export function Logo({ className = "", taille = "text-lg" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Toit className="w-[2.4em] shrink-0 text-soleil" />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold uppercase tracking-[0.02em] ${taille}`}>{residence.nomCourt}</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.38em]">Résidence</span>
      </span>
    </span>
  );
}
