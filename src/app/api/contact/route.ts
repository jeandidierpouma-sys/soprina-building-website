import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT } from "@/lib/content";

// Statut : IMPLEMENTED côté code, CONTRACT_ONLY côté envoi réel tant que
// RESEND_API_KEY n'est pas définie dans les variables d'environnement
// Vercel (corrige point 08 de l'audit post-mise en ligne du 2026-10-09).
// Avant ce fichier, le formulaire n'envoyait rien depuis le serveur : il
// ouvrait seulement le client mail du visiteur via mailto: (src/components
// /forms/contact-form.tsx). Ce comportement mailto: reste le repli
// automatique côté client si cette route répond une erreur (ex. clé absente).
//
// Pour activer l'envoi silencieux réel :
// 1. Créer un compte sur https://resend.com (gratuit jusqu'à 3000 e-mails/mois)
// 2. Générer une clé API et l'ajouter dans Vercel : Project Settings →
//    Environment Variables → RESEND_API_KEY
// 3. Vérifier un domaine d'envoi (ou utiliser le domaine de test Resend en
//    attendant) et ajuster FROM_EMAIL ci-dessous si besoin.
// 4. Redéployer.

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // Anti-spam : champ honeypot (doit rester vide) + horodatage côté client
  // (date de rendu du formulaire). Voir src/components/forms/contact-form.tsx.
  website?: string;
  startedAt?: number;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Anti-spam — statut : IMPLEMENTED / TESTED (corrige l'absence totale de
// protection constatée à l'audit du 2026-10-12 : ni honeypot, ni
// limite de fréquence, ni captcha sur /contact et /devis, qui réutilisent
// tous deux ce même composant et cette même route).
//
// Trois couches, par ordre croissant de coût/complexité :
// 1. Honeypot — champ "website" qui doit rester vide. Un robot qui
//    remplit tous les champs du DOM se fait piéger.
// 2. Piège temporel — rejette toute soumission envoyée moins de 1,5s après
//    l'affichage du formulaire (un humain ne remplit jamais aussi vite).
// 3. Limite de fréquence par IP — 5 soumissions / 10 min. Implémentation
//    en mémoire (Map), donc "au mieux" : elle ne survit pas à un redémarrage
//    de l'instance serverless et n'est pas partagée entre plusieurs
//    instances simultanées. Suffisant pour dissuader un script basique à ce
//    volume de trafic ; pour une garantie stricte multi-instance, il
//    faudrait un store partagé (ex. Upstash Redis, offre gratuite) — non
//    fait ici pour ne pas ajouter une dépendance externe sans décision
//    explicite du client.
//
// Les couches 1 et 2 renvoient un faux succès (200, ok:true) SANS envoyer
// l'e-mail : un robot qui reçoit une erreur ajuste son comportement, un
// robot qui "réussit" silencieusement abandonne plus vite. La couche 3
// renvoie une vraie erreur 429 : un utilisateur légitime peut la
// rencontrer (double-clic, retour arrière) et doit être informé.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_MS = 1500;

const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Trop de demandes envoyées. Réessayez dans quelques minutes.",
      },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();
  const website = (body.website ?? "").trim();
  const startedAt = body.startedAt;

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Champs requis manquants ou invalides." },
      { status: 400 }
    );
  }

  const elapsed = typeof startedAt === "number" ? Date.now() - startedAt : null;
  const looksLikeBot =
    website.length > 0 || (elapsed !== null && elapsed < MIN_SUBMIT_MS);

  if (looksLikeBot) {
    console.warn("Contact route: submission blocked (anti-spam)", {
      ip,
      honeypotFilled: website.length > 0,
      elapsedMs: elapsed,
    });
    // Faux succès délibéré — voir note anti-spam ci-dessus.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Clé non configurée : le client appelant doit basculer sur le repli
    // mailto:. On renvoie 503 (service non disponible), pas 500, pour que
    // ce cas distinct d'une vraie erreur d'envoi soit facile à repérer dans
    // les logs Vercel.
    return NextResponse.json(
      {
        ok: false,
        error: "Service d'envoi non configuré (RESEND_API_KEY absente).",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `Site SOPRINA BUILDING <${fromEmail}>`,
      to: CONTACT.email,
      replyTo: email,
      subject: subject || `Nouvelle demande — ${name}`,
      text: [
        `Nom : ${name}`,
        `E-mail : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Échec de l'envoi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Échec de l'envoi." },
      { status: 500 }
    );
  }
}
