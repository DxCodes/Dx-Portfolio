"use server";

import { site } from "@/data/site";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fallback?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Sends the contact form through Resend's REST API.
 * Needs RESEND_API_KEY (and optionally CONTACT_TO / CONTACT_FROM) — see .env.example.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!EMAIL_RE.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (message.length < 10) return { status: "error", message: "Write a slightly longer message." };
  if (message.length > 5000) return { status: "error", message: "That message is too long." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The form isn't connected yet — email me directly at ${site.email}.`,
      fallback: true,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: email,
      subject: `Portfolio inquiry from ${email}`,
      text: message,
    }),
  });

  if (!res.ok) {
    return {
      status: "error",
      message: `Something went wrong — email me directly at ${site.email}.`,
      fallback: true,
    };
  }
  return { status: "success" };
}
