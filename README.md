# Perfect Résidence · site vitrine

Proposition de site pour **Perfect Résidence**, appartements meublés (studio, chambre-salon, 3 pièces) dans la zone d'Angré, à Cocody (Abidjan).

- **Démo** : https://residence-perfect-angre.vercel.app (non indexée par les moteurs de recherche)
- **Direction artistique** : piste A « Mosaïque », graphique et inspirée du Bauhaus. Une mosaïque de formes et de photos se réorganise en continu : « le confort, pièce par pièce ». Les maquettes sont dans `docs/maquettes/`.
- Proposition de site réalisée par **Digifaz**.

## Stack
Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, Flip, DrawSVG) · Lenis

## Commandes
```bash
pnpm install
pnpm dev --port 3002
pnpm lint
pnpm build
```

## Organisation
- `src/content/site.ts` : **tout le contenu** (textes, tarifs, équipements, contact, tuiles de la mosaïque). C'est le seul fichier à modifier pour changer une information.
- `src/components/sections/` : une section de la page par fichier.
- `src/components/motion/` : animations réutilisables (mosaïque, compteur, bouton magnétique, révélation).
- `src/components/ui/` : briques visuelles (formes géométriques, toit du logo, boutons, icônes).
- `src/app/globals.css` : tokens du thème (couleurs, polices, courbes d'animation).
- `brief/infos.md` : brief de la résidence et sources ; infos manquantes à faire confirmer.
