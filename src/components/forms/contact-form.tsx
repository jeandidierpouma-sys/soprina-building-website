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

const TEXT = {
  fr: {
    errName: "Merci d'indiquer votre nom.",
    errEmail: "Merci d'indiquer votre e-mail.",
    errEmailFormat: "Format d'e-mail invalide.",
    errMessage: "Décrivez brièvement votre projet.",
    mailBody: (v: FormState) =>
      [
        `Nom : ${v.name}`,
        `E-mail : ${v.email}`,
        v.phone ? `Téléphone : ${v.phone}` : null,
        "",
        v.message,
      ],
    mailSubject: "Demande de devis — site web",
    sentApiTitle: "Votre message a bien été envoyé.",
    sentMailtoTitle: "Votre client mail s'est ouvert avec votre message pré-rempli.",
    sentApiBody:
      "Nous revenons vers vous rapidement. Vous pouvez aussi nous joindre directement par téléphone.",
    sentMailtoBody:
      "Il ne reste qu'à cliquer sur envoyer. Vous pouvez aussi nous joindre directement par téléphone.",
    sendAnother: "Envoyer un autre message",
    nameLabel: "Nom complet *",
    namePlaceholder: "Votre nom",
    emailLabel: "E-mail *",
    emailPlaceholder: "vous@exemple.com",
    phoneLabel: "Téléphone",
    phonePlaceholder: "+237 6XX XXX XXX",
    subjectLabel: "Sujet",
    subjectPlaceholder: "Ex. Devis construction",
    messageLabel: "Votre projet *",
    messagePlaceholder: "Décrivez votre projet : type de travaux, localisation, échéance...",
    requiredNote: "Les champs marqués * sont obligatoires.",
    sending: "Préparation...",
    send: "Envoyer ma demande",
  },
  en: {
    errName: "Please enter your name.",
    errEmail: "Please enter your e-mail address.",
    errEmailFormat: "Invalid e-mail format.",
    errMessage: "Briefly describe your project.",
    mailBody: (v: FormState) =>
      [
        `Name: ${v.name}`,
        `E-mail: ${v.email}`,
        v.phone ? `Phone: ${v.phone}` : null,
        "",
        v.message,
      ],
    mailSubject: "Quote request — website",
    sentApiTitle: "Your message has been sent.",
    sentMailtoTitle: "Your mail client opened with your message pre-filled.",
    sentApiBody:
      "We'll get back to you shortly. You can also reach us directly by phone.",
    sentMailtoBody:
      "All that's left is to click send. You can also reach us directly by phone.",
    sendAnother: "Send another message",
    nameLabel: "Full name *",
    namePlaceholder: "Your name",
    emailLabel: "E-mail *",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+237 6XX XXX XXX",
    subjectLabel: "Subject",
    subjectPlaceholder: "E.g. Construction quote",
    messageLabel: "Your project *",
    messagePlaceholder: "Describe your project: type of work, location, timeline...",
    requiredNote: "Fields marked * are required.",
    sending: "Preparing...",
    send: "Send my request",
  },
} as const;

// NOTE D'IMPLÉMENTATION (statut : IMPLEMENTED, envoi réel CONTRACT_ONLY
// tant que RESEND_API_KEY n'est pas configurée côté serveur — corrige
// point 08 de l'audit post-mise en ligne du 2026-10-09)
// Ce formulaire tente d'abord un envoi silencieux via la route serveur
// /api/contact (Resend). Si cette route répond une erreur — notamment
// 503 quand RESEND_API_KEY est absente côté serveur, ou en cas de panne
// réseau — le formulaire bascule automatiquement sur l'ancien
// comportement mailto: (ouverture du client mail du visiteur), qui reste
// donc le filet de sécurité, jamais un chemin mort. `locale` ne change que
// les textes affichés/validation/mailto ; le comportement d'envoi (API →
// fallback mailto) est strictement identique dans les deux langues.
export function ContactForm({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const t = TEXT[locale];
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [sentVia, setSentVia] = useState<"api" | "mailto">("mailto");

  function validate(v: FormState) {
    const next: Partial<FormState> = {};
    if (!v.name.trim()) next.name = t.errName;
    if (!v.email.trim()) {
      next.email = t.errEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      next.email = t.errEmailFormat;
    }
    if (!v.message.trim()) next.message = t.errMessage;
    return next;
  }

  function openMailtoFallback() {
    const body = t.mailBody(values).filter(Boolean).join("\n");

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      values.subject || t.mailSubject
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
          {sentVia === "api" ? t.sentApiTitle : t.sentMailtoTitle}
        </p>
        <p className="max-w-sm text-sm text-sb-body">
          {sentVia === "api" ? t.sentApiBody : t.sentMailtoBody}
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            setStatus("idle");
            setValues(EMPTY);
          }}
        >
          {t.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t.nameLabel}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t.namePlaceholder}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">{t.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t.emailPlaceholder}
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
          <Label htmlFor="phone">{t.phoneLabel}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t.phonePlaceholder}
          />
        </div>
        <div>
          <Label htmlFor="subject">{t.subjectLabel}</Label>
          <Input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder={t.subjectPlaceholder}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t.messageLabel}</Label>
        <Textarea
          id="message"
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t.messagePlaceholder}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        )}
        <p className="mt-1.5 text-xs text-sb-body/70">{t.requiredNote}</p>
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            {t.send}
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
