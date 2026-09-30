"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" fait suivre à toutes les animations framer-motion
// (whileInView, transitions d'entrée, etc.) la préférence système
// prefers-reduced-motion — sans avoir à le gérer composant par composant.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
