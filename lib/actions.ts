"use server";

import { z } from "zod";

/**
 * Server actions for the signup + contact forms (brief §10: server actions
 * + Resend). Email sending activates once RESEND_API_KEY and CONTACT_EMAIL
 * are set in the environment — until Art Generator's official address is
 * confirmed ([VERIFY] §14.7) the forms return an honest "not connected yet"
 * state instead of pretending to deliver.
 */

export type FormState = { status: "idle" | "success" | "error" | "unconfigured" };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

async function sendViaResend(subject: string, text: string): Promise<FormState> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM ?? "website@jazzveles.mk";
  if (!apiKey || !to) return { status: "unconfigured" };
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  return res.ok ? { status: "success" } : { status: "error" };
}

const signupSchema = z.object({ email: z.string().email() });

export async function subscribeAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = signupSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { status: "error" };
  return sendViaResend(
    "Нова пријава за известувања / New mailing-list signup",
    `Signup: ${parsed.data.email}`,
  );
}

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function contactAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { status: "error" };
  const { name, email, subject, message } = parsed.data;
  return sendViaResend(
    `[jazzveles.mk] ${subject}`,
    `From: ${name} <${email}>\n\n${message}`,
  );
}
