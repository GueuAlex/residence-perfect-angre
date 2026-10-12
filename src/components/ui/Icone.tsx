import type { ReactNode } from "react";

type Nom = "bulle" | "tel" | "fleche" | "note";

const traces: Record<Nom, ReactNode> = {
  bulle: (
    <>
      <path d="M4 18.5 5.2 15A8 8 0 1 1 8.6 18.6Z" strokeLinejoin="round" />
      <path d="M9 10.5c.5 1.8 2 3.3 3.8 3.9" strokeLinecap="round" />
    </>
  ),
  tel: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />,
  fleche: <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />,
  note: <path d="M14 3v11.5a3.5 3.5 0 1 1-2-3.2V3h2Zm0 0c.5 2.5 2.5 4 5 4" strokeLinecap="round" strokeLinejoin="round" />,
};

// Icones au trait (24 x 24)
export function Icone({ nom, className = "size-[18px]" }: { nom: Nom; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" className={`shrink-0 ${className}`}>
      {traces[nom]}
    </svg>
  );
}
