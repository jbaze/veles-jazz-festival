"use client";

import { useActionState } from "react";
import { subscribeAction, type FormState } from "@/lib/actions";
import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";

/**
 * Newsletter signup. `card` is the in-page block (programme empty state);
 * `band` is the slim site-wide strip mounted above the footer in the
 * locale layout. Both post the same server action and stay honest about
 * the dormant state until the Resend env vars are set.
 */
export default function SignupForm({
  locale,
  variant = "card",
}: {
  locale: Locale;
  variant?: "card" | "band";
}) {
  const t = getDict(locale);
  const [state, action, pending] = useActionState<FormState, FormData>(subscribeAction, {
    status: "idle",
  });
  const fieldId = `signup-email-${variant}`;

  const form = (
    <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor={fieldId}>
        {t.contact.formEmail}
      </label>
      <input
        id={fieldId}
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
  );

  const status = (
    <p aria-live="polite" className="mt-3 min-h-5 text-sm">
      {state.status === "success" && <span className="text-exposure">{t.signup.success}</span>}
      {state.status === "error" && <span className="text-sodium">{t.signup.error}</span>}
      {state.status === "unconfigured" && (
        <span className="text-concrete">{t.signup.notConfigured}</span>
      )}
    </p>
  );

  if (variant === "band") {
    return (
      <section aria-label={t.signup.title} className="grain mt-32 border-t-2 border-prussian">
        <div className="mx-auto grid max-w-[1440px] items-center gap-x-14 gap-y-6 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,560px)] md:py-14">
          <div>
            <h2 className="type-display text-2xl text-paper md:text-3xl">{t.signup.title}</h2>
            <p className="mt-2 max-w-md text-sm text-concrete">{t.signup.body}</p>
          </div>
          <div>
            {form}
            {status}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="type-display text-xl text-paper">{t.signup.title}</h2>
      <p className="mt-2 text-sm text-concrete">{t.signup.body}</p>
      {form}
      {status}
    </div>
  );
}
