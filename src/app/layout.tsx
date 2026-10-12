import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { residence } from "@/content/site";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://residence-perfect-angre.vercel.app"),
  title: `${residence.nom} · Appartements meublés à ${residence.zone}, ${residence.commune}`,
  description: residence.description,
  // Site de prospection : pas d'indexation avant la signature
  robots: { index: false, follow: false },
  openGraph: {
    title: `${residence.nom} · Le confort, pièce par pièce`,
    description: residence.description,
    siteName: residence.nom,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${onest.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
