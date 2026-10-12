// Contenu du site : toutes les donnees de la residence, separees de la presentation.
// Les elements marques "a confirmer" dans brief/infos.md doivent etre valides avec l'etablissement.

export type Couleur = "soleil" | "corail" | "cobalt" | "rose" | "encre" | "papier" | "creme";
export type NomForme = "rond" | "demi" | "quart" | "tri" | "carre";

export type Photo = {
  src: string;
  largeur: number;
  hauteur: number;
  alt: string;
  // Cadrage de la photo dans son cadre (object-position)
  cadrage?: string;
};

export const residence = {
  nom: "Perfect Résidence",
  nomCourt: "Perfect",
  slogan: "Votre confort, notre priorité",
  zone: "Angré",
  commune: "Cocody",
  ville: "Abidjan",
  description:
    "Appartements meublés dans toute la zone d'Angré, à Cocody : studios, chambres-salons et 3 pièces, avec Canal+, Netflix et wifi en option. 15 000 F la journée, 20 000 F les 24 heures.",
} as const;

const messageWhatsapp = "Bonjour Perfect Résidence, je souhaite réserver un appartement.";

export const contact = {
  whatsappAffiche: "07 14 37 00 32",
  whatsappLien: `https://wa.me/2250714370032?text=${encodeURIComponent(messageWhatsapp)}`,
  telephoneAffiche: "07 09 78 13 06",
  telephoneLien: "tel:+2250709781306",
  tiktok: "https://www.tiktok.com/@peferctresi",
  zone: "Toute la zone d'Angré · Cocody, Abidjan",
} as const;

export const navigation = [
  { label: "Tarifs", href: "#tarifs" },
  { label: "Appartements", href: "#appartements" },
  { label: "Confort", href: "#confort" },
  { label: "Contact", href: "#contact" },
] as const;

export const photos = {
  studio: {
    src: "/images/studio-lit-canape.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Studio meublé avec lit double, canapé blanc et tapis à motif de vagues",
  },
  plaid: {
    src: "/images/chambre-plaid-vert.jpg",
    largeur: 720,
    hauteur: 941,
    alt: "Chambre avec plaid vert, télévision murale et étagère en bois",
  },
  capitonnee: {
    src: "/images/chambre-tete-de-lit-capitonnee.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Chambre avec tête de lit capitonnée, coussins colorés et télévision",
  },
  salon: {
    src: "/images/salon-tables-marbre.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Coin salon avec panneau en bois, rideaux et tables effet marbre",
    cadrage: "70% 20%",
  },
} satisfies Record<string, Photo>;

export const hero = {
  kicker: "Appartements meublés · Angré, Cocody",
  kickerCourt: "Meublés · Angré, Cocody",
  // Le premier "o" de la premiere ligne devient un soleil
  titre: ["Le confort,", "pièce par", "pièce."],
  sousTitre:
    "Studios, chambres-salons et 3 pièces meublés dans toute la zone d'Angré. Canal+, Netflix, climatisation et sécurité garantie.",
  ctaPrincipal: { court: "Réserver", long: " sur WhatsApp" },
  ctaSecondaire: "Appeler",
  prix: { avant: "À partir de", valeur: "15 000 F", apres: "la journée" },
} as const;

// Les neuf tuiles de la mosaique, dans leur ordre de depart
export type Tuile =
  | { type: "forme"; fond: Couleur; forme: NomForme; couleur: Couleur }
  | { type: "photo"; fond: Couleur; cadre: "arche" | "rond" | "plein"; photo: Photo }
  | { type: "toit"; fond: Couleur }
  | { type: "rayures"; fond: Couleur }
  | { type: "prix"; fond: Couleur; label: string; valeur: string };

export const mosaique: Tuile[] = [
  { type: "forme", fond: "cobalt", forme: "rond", couleur: "soleil" },
  { type: "photo", fond: "rose", cadre: "arche", photo: photos.plaid },
  { type: "toit", fond: "soleil" },
  { type: "forme", fond: "rose", forme: "quart", couleur: "corail" },
  { type: "photo", fond: "corail", cadre: "rond", photo: photos.studio },
  { type: "rayures", fond: "papier" },
  { type: "prix", fond: "encre", label: "La journée", valeur: "15 000 F" },
  { type: "photo", fond: "papier", cadre: "plein", photo: photos.capitonnee },
  { type: "forme", fond: "soleil", forme: "demi", couleur: "cobalt" },
];

export const ruban: { mot: string; forme: NomForme; couleur: Couleur }[] = [
  { mot: "Studio", forme: "rond", couleur: "soleil" },
  { mot: "Chambre-salon", forme: "tri", couleur: "corail" },
  { mot: "3 pièces", forme: "carre", couleur: "rose" },
  { mot: "Canal+", forme: "demi", couleur: "soleil" },
  { mot: "Netflix", forme: "rond", couleur: "corail" },
  { mot: "Wifi en option", forme: "tri", couleur: "soleil" },
];

export const tarifs = {
  eyebrow: "Tarifs",
  titre: "Deux formules, zéro calcul.",
  intro: "Des prix clairs, affichés d'avance. Pour un long séjour, demandez votre tarif.",
  devise: "F CFA",
  formules: [
    {
      label: "La journée",
      prix: 15000,
      texte: "Une pause, une sieste ou une journée à deux, en toute tranquillité.",
    },
    {
      label: "24 heures",
      prix: 20000,
      texte: "Une nuit complète, à votre rythme.",
    },
  ],
  longSejour: { avant: "Long séjour : ", gras: "tarif réduit avec wifi", apres: ", sur demande." },
} as const;

export const appartements = {
  eyebrow: "Les appartements",
  titre: "Trois formats, selon votre séjour.",
  aide: "Faites défiler",
  formats: [
    {
      numero: "01",
      nom: "Studio",
      texte: "Tout l'essentiel réuni dans une seule pièce. Idéal en solo ou à deux.",
      photos: [photos.studio],
    },
    {
      numero: "02",
      nom: "Chambre-salon",
      texte: "Une chambre au calme et un vrai salon pour recevoir.",
      photos: [photos.capitonnee],
    },
    {
      numero: "03",
      nom: "3 pièces",
      texte: "De la place pour la famille ou entre amis.",
      photos: [photos.salon, photos.plaid],
    },
  ],
  note: "Photos : aperçu des appartements de la résidence.",
} as const;

export const confort = {
  eyebrow: "Le confort",
  titre: "Toutes les commodités, sans exception.",
  // texteClair : texte en creme sur le fond colore au survol
  equipements: [
    { nom: "Canal+", detail: "Les matchs et vos chaînes préférées", forme: "rond", couleur: "soleil", texteClair: false },
    { nom: "Netflix", detail: "Vos soirées séries et cinéma", forme: "tri", couleur: "corail", texteClair: false },
    { nom: "Wifi", detail: "En option, selon votre séjour", forme: "carre", couleur: "cobalt", texteClair: true },
    { nom: "Climatisation", detail: "Pour des nuits au frais", forme: "demi", couleur: "rose", texteClair: false },
    { nom: "Sécurité", detail: "Garantie, pour un séjour serein", forme: "quart", couleur: "encre", texteClair: true },
    { nom: "Accès facile", detail: "Dans toute la zone d'Angré", forme: "rond", couleur: "soleil", texteClair: false },
  ] satisfies { nom: string; detail: string; forme: NomForme; couleur: Couleur; texteClair: boolean }[],
};

// Numeros sans retour a la ligne au milieu
const insecable = (texte: string) => texte.replace(/ /g, "\u00a0");

export const reservation = {
  eyebrow: "Réservation",
  titre: ["Il ne manque", "que vous."],
  texte: `Réservations sur WhatsApp au ${insecable(contact.whatsappAffiche)}, appels au ${insecable(contact.telephoneAffiche)}. Appartements dans toute la zone d'Angré, à Cocody.`,
  ctaWhatsapp: "Écrire sur WhatsApp",
  tiktok: "Suivez-nous sur TikTok",
} as const;

export const signature = "Proposition de site réalisée par Digifaz";
