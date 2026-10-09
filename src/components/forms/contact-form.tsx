"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT } from "@/lib/content";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

// NOTE D'IMPLÉMENTATION (statut : IMPLEMENTED, envoi réel CONTRACT_ONLY
// tant que RESEND_API_KEY n'est pas configurée côté serveur — corrige
// point 08 de l'audit post-mise en ligne du 2026-10-09)
// Ce formulaire tente d'abord un envoi silencieux via la route serveur
// /api/contact (Resend). Si cette route répond une erreur — notamment
// 503 quand RESEND_API_KEY est absente côté serveur, ou en cas de panne
// réseau — le formulaire bascule automatiquement sur l'ancien
// comportement mailto: (ouverture du client mail du visiteur), qui reste
// donc le filet de sécurité, jamais un chemin mort.
export function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [sentVia, setSentVia] = useState<"api" | "mailto">("mailto");

  function validate(v: FormState) {
    const next: Partial<FormState> = {};
    if (!v.name.trim()) next.name = "Merci d'indiquer votre nom.";
    if (!v.email.trim()) {
      next.email = "Merci d'indiquer votre e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      next.email = "Format d'e-mail invalide.";
    }
    if (!v.message.trim()) next.message = "Décrivez brièvement votre projet.";
    return next;
  }

  function openMailtoFallback() {
    const body = [
      `Nom : ${values.name}`,
      `E-mail : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      values.subject || "Demande de devis — site web"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSentVia("mailto");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("api-error");

      setSentVia("api");
      setStatus("sent");
    } catch {
      // Route non configurée (503) ou panne réseau : on ne bloque jamais
      // le visiteur — bascule immédiate sur mailto:.
      openMailtoFallback();
      window.setTimeout(() => setStatus("sent"), 600);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-sb-grayline bg-muted p-10 text-center">
        <CheckCircle2 className="size-10 text-sb-gold" />
        <p className="text-lg font-semibold text-sb-navy">
          {sentVia === "api"
            ? "Votre message a bien été envoyé."
            : "Votre client mail s'est ouvert avec votre message pré-rempli."}
        </p>
        <p className="max-w-sm text-sm text-sb-body">
          {sentVia === "api"
            ? "Nous revenons vers vous rapidement. Vous pouvez aussi nous joindre directement par téléphone."
            : "Il ne reste qu'à cliquer sur envoyer. Vous pouvez aussi nous joindre directement par téléphone."}
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            setStatus("idle");
            setValues(EMPTY);
          }}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Votre nom"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="vous@exemple.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+237 6XX XXX XXX"
          />
        </div>
        <div>
          <Label htmlFor="subject">Sujet</Label>
          <Input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder="Ex. Devis construction"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Votre projet *</Label>
        <Textarea
          id="message"
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Décrivez votre projet : type de travaux, localisation, échéance..."
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        )}
        <p className="mt-1.5 text-xs text-sb-body/70">
          Les champs marqués * sont obligatoires.
        </p>
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Préparation...
          </>
        ) : (
          <>
            Envoyer ma demande
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
