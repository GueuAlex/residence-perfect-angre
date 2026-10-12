# Perfect Résidence : site vitrine

> Ce site fait partie de l'espace de travail `sites/`. Les règles globales sont dans `../README.md` et `../CLAUDE.md`.
> Ce fichier ne contient que ce qui est propre à ce site.

## Fiche
- Établissement : Perfect Résidence, appartements meublés (studio, chambre-salon, 3 pièces)
- Type, ville : résidence meublée, zone d'Angré (Cocody, Abidjan, Côte d'Ivoire)
- Statut : dev (piste A validée)
- Repo : https://github.com/GueuAlex/residence-perfect-angre
- Démo : https://residence-perfect-angre.vercel.app
- Brief : `brief/infos.md`

## Direction artistique
Trois pistes proposées dans `docs/maquettes/` (sommaire : `docs/maquettes/index.html`). Elles sont volontairement très différentes de la piste « Galerie de nuit » d'Assonvon, à la demande de l'utilisateur : plus modernes, plus attrayantes, avec des formes vectorielles et des illustrations.
- **A · Mosaïque** : graphique, façon Bauhaus. Mosaïque de formes et de photos qui se réorganise seule (GSAP Flip). Unbounded + Onest ; crème, or, corail, cobalt, rose.
- **B · Jour & nuit** (recommandée) : douce et illustrée. Fenêtre en arche sur Angré : le soleil se couche au scroll, la lune se lève, le prix passe de « la journée » à « 24 heures ». Instrument Serif + Figtree ; sable, miel, sauge, terracotta, nuit.
- **C · Stickers** : pop, au ton TikTok. Lettres qui rebondissent, polaroïds et stickers à attraper (Draggable), tickets de tarifs, pile de photos à faire glisser. Bricolage Grotesque condensée + Caveat ; jaune, noir, crème, rose, menthe.

**Validée : piste A · Mosaïque** (2026-10-12)
- Concept en une phrase : la résidence racontée comme une composition Bauhaus, « le confort, pièce par pièce ».
- Palette (tokens dans `src/app/globals.css`) :

  | Token | Couleur |
  |---|---|
  | `creme` | #F5EFE4 |
  | `papier` | #FFFBF4 |
  | `encre` | #151412 |
  | `soleil` | #EBB329 (l'or du logo) |
  | `corail` | #E04A2F |
  | `cobalt` | #2550C0 |
  | `rose` | #F3C5B5 |

- Typographies : Unbounded (titres, 650 à 700, capitales serrées) et Onest (textes).
- Vocabulaire graphique : formes pleines (rond, demi-lune, quart de cercle, triangle, carré, rayures, toit du logo), traits noirs de 2 px, aucun arrondi sur les boutons.
- Animation signature : la mosaïque de 9 tuiles du hero. Les tuiles apparaissent en tournant, puis deux tuiles échangent leur place toutes les 2,8 s (GSAP Flip sur la propriété CSS `order`). Une forme pivote d'un quart de tour à chaque échange et au survol.
- Autres effets :
  - « o » de « confort » remplacé par un soleil ;
  - ruban cobalt dont la vitesse suit le scroll ;
  - prix qui comptent jusqu'à leur valeur et formes qui pivotent dans les bandes de tarifs ;
  - appartements en affiches, en défilement horizontal épinglé ;
  - liste du confort qui se remplit de couleur au survol ;
  - toit du logo dessiné au trait (DrawSVG) dans le contact ;
  - boutons magnétiques sur ordinateur.

## Contraintes propres à ce site
- **Photos fournies de faible qualité** (720 px, compressées). Elles restent dans des cadres de taille moyenne (arches, cercles, polaroïds) et ne s'affichent jamais en plein écran.
  - `chambre-tete-de-lit-capitonnee.jpg` : forte dominante jaune, à désaturer.
  - `salon-tables-marbre.jpg` : objets personnels sur la table, à recadrer.
- **Logo** : seulement un JPG de 366 px sur fond noir. Le pictogramme du toit est redessiné en SVG dans les maquettes ; à faire valider, et demander l'original.
- **Tarifs** : n'afficher que la grille confirmée (15 000 F la journée, 20 000 F les 24 h, réduction long séjour avec wifi). D'autres prix circulent en ligne (voir le brief).
- **Numéros** : n'afficher que le 07 14 37 00 32 (WhatsApp) et le 07 09 78 13 06 (appels). Les autres numéros vus en ligne sont dans `brief/prive.md` et ne doivent pas apparaître.
- **Pas d'avis client** (un seul avis Google, sans texte).
- **Le chiffre TikTok** (« plus de 12 000 abonnés », piste C) est réel au 2026-10-12. À revérifier avant la mise en ligne.
- **Le site doit répondre aux questions des internautes** : où se trouvent les logements, les vrais prix, les longs séjours, le nombre de personnes accepté.

## Stack et commandes
- Stack : Next.js 16.4 (cacheComponents activé par défaut), Tailwind 4.3, GSAP 3.15 + @gsap/react (ScrollTrigger, Flip, DrawSVG), Lenis 1.3. Pas de WebGL.
- Polices du site par `next/font/google` ; celles de l'image de partage par `@fontsource` (fichiers .woff lus au build).
- Photos : `public/images/`. La dominante jaune de `chambre-tete-de-lit-capitonnee.jpg` y est déjà corrigée (l'original reste dans `brief/sources/`).
- Sans animation (`prefers-reduced-motion`), les appartements deviennent un carrousel horizontal natif.
- Maquettes : `preview_start` avec la config `perfect-maquettes` (port 4102) de `../.claude/launch.json`
- Dev : `preview_start` avec la config `perfect-dev` (port 3002)
- `pnpm dev` · `pnpm build` · `pnpm lint`

## Exceptions aux règles globales
<!-- Rien pour l'instant. -->

## Journal de session
> Entrée la plus récente en haut. Chaque entrée indique la date, le travail fait, les décisions et la **prochaine étape précise**.

### 2026-10-12
- Fait :
  - dossier créé, logo et 4 photos rangés dans `brief/sources/` ;
  - recherches en ligne : TikTok @peferctresi, fiche Google Maps, plateformes de location ;
  - brief rempli avec ses sources (`brief/infos.md`) ; numéros douteux mis dans `brief/prive.md` ;
  - 3 maquettes de direction artistique et leur sommaire dans `docs/maquettes/`, vérifiées en desktop et en mobile 375 px ;
  - config `perfect-maquettes` ajoutée à `../.claude/launch.json`.
- Décisions :
  - nom de dossier, de repo et de projet Vercel : `residence-perfect-angre` ;
  - nouvelle DA, sans rien reprendre d'Assonvon ;
  - piste B recommandée, car son animation signature raconte l'offre (journée / 24 h).
- Prochaine étape : obtenir la validation d'une piste (ou d'un mélange), puis initialiser Next.js (`git init`, repo GitHub, port 3002). En parallèle, l'utilisateur récupère les infos manquantes listées dans `brief/infos.md`, en priorité les zones d'Angré et la grille tarifaire complète.
