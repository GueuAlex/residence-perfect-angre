import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { photos, residence } from "@/content/site";

// Image d'apercu des partages (WhatsApp, Facebook...)
export const alt = `${residence.nom} · Appartements meublés à ${residence.zone}, ${residence.commune}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  creme: "#f5efe4",
  papier: "#fffbf4",
  encre: "#151412",
  soleil: "#ebb329",
  corail: "#e04a2f",
  cobalt: "#2550c0",
  rose: "#f3c5b5",
};

// Lus au build : l'image est generee une seule fois, statiquement
const racine = process.cwd();
const lirePhoto = async (src: string) =>
  `data:image/jpeg;base64,${(await readFile(join(racine, "public", src))).toString("base64")}`;
const [unbounded, onest, plaid, studio, capitonnee] = await Promise.all([
  readFile(join(racine, "node_modules/@fontsource/unbounded/files/unbounded-latin-700-normal.woff")),
  readFile(join(racine, "node_modules/@fontsource/onest/files/onest-latin-500-normal.woff")),
  lirePhoto(photos.plaid.src),
  lirePhoto(photos.studio.src),
  lirePhoto(photos.capitonnee.src),
]);

const svg = (contenu: string, vb: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${contenu}</svg>`)}`;
const toit = (couleur: string) =>
  svg(
    `<path d="M7 50 L46 11 L80 45" fill="none" stroke="${couleur}" stroke-width="7" stroke-linecap="square"/><path d="M62 48.5 H116" stroke="${couleur}" stroke-width="7"/><g fill="${couleur}"><rect x="39" y="22" width="6" height="6"/><rect x="47" y="22" width="6" height="6"/><rect x="39" y="30" width="6" height="6"/><rect x="47" y="30" width="6" height="6"/></g>`,
    "0 0 120 56",
  );
const rayures = svg(
  `<g stroke="${C.encre}" stroke-width="6"><path d="M-10 30 30 -10M-10 55 55 -10M-10 80 80 -10M-10 105 105 -10M15 110 110 15M40 110 110 40M65 110 110 65"/></g>`,
  "0 0 100 100",
);

const T = 150;

function Tuile({ fond, children }: { fond: string; children?: ReactNode }) {
  return (
    <div style={{ width: T, height: T, background: fond, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: C.creme, padding: "0 64px", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <img src={toit(C.soleil)} width={120} height={56} alt="" />
          <div style={{ fontFamily: "Unbounded", fontSize: 92, color: C.encre, letterSpacing: -3, marginTop: 22, lineHeight: 1 }}>PERFECT</div>
          <div style={{ fontFamily: "Onest", fontSize: 26, color: C.encre, letterSpacing: 12, marginTop: 10 }}>RÉSIDENCE</div>
          <div style={{ fontFamily: "Onest", fontSize: 30, color: C.encre, marginTop: 40, lineHeight: 1.3 }}>
            Appartements meublés à Angré, Cocody
          </div>
          <div style={{ display: "flex", marginTop: 26 }}>
            <div style={{ fontFamily: "Unbounded", fontSize: 24, background: C.encre, color: C.creme, padding: "14px 22px" }}>
              Dès 15 000 F la journée
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: T * 3 + 20, gap: 10 }}>
          <Tuile fond={C.cobalt}>
            <div style={{ width: 104, height: 104, borderRadius: 999, background: C.soleil }} />
          </Tuile>
          <Tuile fond={C.rose}>
            <img src={plaid} width={114} height={132} alt="" style={{ position: "absolute", left: 18, top: 18, objectFit: "cover", borderTopLeftRadius: 57, borderTopRightRadius: 57 }} />
          </Tuile>
          <Tuile fond={C.soleil}>
            <img src={toit(C.encre)} width={116} height={54} alt="" />
          </Tuile>
          <Tuile fond={C.rose}>
            <div style={{ position: "absolute", left: 0, bottom: 0, width: 130, height: 130, background: C.corail, borderTopRightRadius: 130 }} />
          </Tuile>
          <Tuile fond={C.corail}>
            <img src={studio} width={114} height={114} alt="" style={{ objectFit: "cover", borderRadius: 999 }} />
          </Tuile>
          <Tuile fond={C.papier}>
            <img src={rayures} width={T} height={T} alt="" />
          </Tuile>
          <Tuile fond={C.encre}>
            <div style={{ display: "flex", flexDirection: "column", padding: "0 20px", width: "100%" }}>
              <div style={{ fontFamily: "Onest", fontSize: 13, color: C.soleil, letterSpacing: 2 }}>LA JOURNÉE</div>
              <div style={{ fontFamily: "Unbounded", fontSize: 19, color: C.creme, marginTop: 6 }}>{"15\u00a0000\u00a0F"}</div>
            </div>
          </Tuile>
          <Tuile fond={C.papier}>
            <img src={capitonnee} width={T} height={T} alt="" style={{ objectFit: "cover" }} />
          </Tuile>
          <Tuile fond={C.soleil}>
            <div style={{ position: "absolute", bottom: 0, left: 12, width: 126, height: 63, background: C.cobalt, borderTopLeftRadius: 63, borderTopRightRadius: 63 }} />
          </Tuile>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unbounded, style: "normal", weight: 700 },
        { name: "Onest", data: onest, style: "normal", weight: 500 },
      ],
    },
  );
}
