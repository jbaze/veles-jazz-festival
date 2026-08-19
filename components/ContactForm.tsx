"use client";

import { useActionState } from "react";
import { contactAction, type FormState } from "@/lib/actions";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

export default function ContactForm({
  locale,
  defaultSubject,
}: {
  locale: Locale;
  defaultSubject?: string;
}) {
  const t = getDict(locale);
  const [state, action, pending] = useActionState<FormState, FormData>(contactAction, {
    status: "idle",
  });

  const inputCls =
    "w-full rounded-[2px] border-2 border-prussian bg-ink px-4 py-2.5 text-paper placeholder:text-concrete focus:border-exposure focus:outline-none";

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="type-label mb-1.5 block text-concrete">
            {t.contact.formName}
          </label>
          <input id="cf-name" name="name" required maxLength={200} className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className="type-label mb-1.5 block text-concrete">
            {t.contact.formEmail}
          </label>
          <input id="cf-email" name="email" type="email" required className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="type-label mb-1.5 block text-concrete">
          {t.contact.formSubject}
        </label>
        <select id="cf-subject" name="subject" defaultValue={defaultSubject} className={inputCls}>
          <option>{t.contact.formSubjectGeneral}</option>
          <option>{t.contact.formSubjectPress}</option>
          <option>{t.contact.formSubjectPartnership}</option>
          <option>{t.contact.artistSubject}</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="type-label mb-1.5 block text-concrete">
          {t.contact.formMessage}
        </label>
        <textarea id="cf-message" name="message" required rows={6} maxLength={5000} className={inputCls} />
      </div>
      <button type="submit" disabled={pending} className="btn btn-sodium w-fit disabled:opacity-60">
        {t.contact.formSend}
      </button>
      <p aria-live="polite" className="min-h-5 text-sm">
        {state.status === "success" && <span className="text-exposure">{t.signup.success}</span>}
        {state.status === "error" && <span className="text-sodium">{t.signup.error}</span>}
        {state.status === "unconfigured" && (
          <span className="text-concrete">{t.signup.notConfigured}</span>
        )}
      </p>
    </form>
  );
}
