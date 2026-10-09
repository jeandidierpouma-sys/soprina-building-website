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
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
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

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Champs requis manquants ou invalides." },
      { status: 400 }
    );
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
