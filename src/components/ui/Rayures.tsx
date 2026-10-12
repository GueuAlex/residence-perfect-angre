// Motif de rayures diagonales (carre 100 x 100)
export function Rayures({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="6">
        <path d="M-10 30 30 -10M-10 55 55 -10M-10 80 80 -10M-10 105 105 -10M15 110 110 15M40 110 110 40M65 110 110 65" />
      </g>
    </svg>
  );
}
