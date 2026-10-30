"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-[15px] tracking-[-0.02em] text-[var(--ink)] outline-none transition placeholder:text-[var(--fainter)] focus:border-[var(--line-strong)]";
const labelClass = "block text-[13px] font-medium tracking-[-0.02em] text-[var(--fainter)]";

export default function Contact() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });

  return (
    <section
      id="contact"
      className="scroll-mt-24 px-4 pt-10 pb-20 text-left sm:px-6 sm:pt-12 sm:pb-24 lg:px-8"
    >
      <SectionHeading
        title="Get in touch"
        subtitle={`Send a note, or email ${site.email} directly`}
      />

      {state.status === "success" ? (
        <p
          role="status"
          className="mt-12 max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-[15px] text-[var(--ink)]"
        >
          Thanks — your message is on its way. I&apos;ll get back to you soon.
        </p>
      ) : (
        <form
          action={formAction}
          className="relative mt-12 max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6"
        >
          {/* Honeypot for bots — hidden from people and assistive tech. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className={labelClass} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            className={fieldClass}
          />

          <label className={`mt-5 ${labelClass}`} htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            placeholder="What should we talk about?"
            className={`resize-y ${fieldClass}`}
          />

          {state.status === "error" && (
            <p className="mt-3 text-sm font-medium tracking-[-0.02em] text-red-500" role="alert">
              {state.message}{" "}
              {state.fallback && (
                <a href={`mailto:${site.email}`} className="underline">
                  Open email app
                </a>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--button-bg)] px-5 text-sm font-medium tracking-[-0.02em] text-[var(--button-fg)] transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </section>
  );
}
