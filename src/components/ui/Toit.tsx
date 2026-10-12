type Props = {
  className?: string;
};

// Pictogramme du toit, redessine d'apres le logo (couleur = currentColor)
export function Toit({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 56" aria-hidden="true" className={className}>
      <path d="M7 50 L46 11 L80 45" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
      <path d="M62 48.5 H116" stroke="currentColor" strokeWidth="7" />
      <g fill="currentColor">
        <rect x="39" y="22" width="6" height="6" />
        <rect x="47" y="22" width="6" height="6" />
        <rect x="39" y="30" width="6" height="6" />
        <rect x="47" y="30" width="6" height="6" />
      </g>
    </svg>
  );
}
