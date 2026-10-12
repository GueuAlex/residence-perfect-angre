"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Enregistrement unique des plugins GSAP, avant tout useGSAP
gsap.registerPlugin(ScrollTrigger, Flip, DrawSVGPlugin, useGSAP);

// Requetes media partagees par les animations
export const AVEC_ANIMATIONS = "(prefers-reduced-motion: no-preference)";
export const SURVOL = "(hover: hover) and (pointer: fine)";

export { gsap, Flip, ScrollTrigger, useGSAP };
