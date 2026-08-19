"use client";

import { useActionState } from "react";
import { subscribeAction, type FormState } from "@/lib/actions";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

export default function SignupForm({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [state, action, pending] = useActionState<FormState, FormData>(subscribeAction, {
    status: "idle",
  });

  return (
    <div className="card p-6">
      <h2 className="type-display text-xl text-paper">{t.signup.title}</h2>
      <p className="mt-2 text-sm text-concrete">{t.signup.body}</p>
      <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="signup-email">
          {t.contact.formEmail}
        </label>
        <input
          id="signup-email"
          type="email"
          name="email"
          required
          placeholder={t.signup.placeholder}
          className="min-w-0 flex-1 rounded-[2px] border-2 border-prussian bg-ink px-4 py-2.5 text-paper placeholder:text-concrete focus:border-exposure focus:outline-none"
        />
        <button type="submit" disabled={pending} className="btn btn-sodium disabled:opacity-60">
          {t.signup.submit}
        </button>
      </form>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {state.status === "success" && <span className="text-exposure">{t.signup.success}</span>}
        {state.status === "error" && <span className="text-sodium">{t.signup.error}</span>}
        {state.status === "unconfigured" && (
          <span className="text-concrete">{t.signup.notConfigured}</span>
        )}
      </p>
    </div>
  );
}
