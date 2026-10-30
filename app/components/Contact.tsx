"use client";

import { useState, type FormEvent } from "react";

const TO = "hello@heyitsdhruv.com";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const from = email.trim();

    if (!isValidEmail(from)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(`From: ${from}\n\n${message.trim()}`);
    window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-24 px-4 pt-10 pb-20 text-left sm:px-6 sm:pt-12 sm:pb-24 lg:px-8">
      <h2 className="text-4xl font-bold tracking-[-0.03em] text-[var(--muted)] sm:text-5xl">
        Get in touch
      </h2>
      <p className="mt-3 text-lg font-light tracking-[-0.02em] text-[var(--soft)] sm:text-xl">
        Send a note to {TO}
      </p>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-12 max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6"
      >
        <label className="block text-[13px] font-medium tracking-[-0.02em] text-[var(--fainter)]" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          placeholder="you@email.com"
          className="mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-[15px] tracking-[-0.02em] text-[var(--ink)] outline-none transition placeholder:text-[var(--fainter)] focus:border-[var(--line-strong)]"
        />
        {error && (
          <p className="mt-2 text-sm font-medium tracking-[-0.02em] text-red-400" role="alert">
            {error}
          </p>
        )}

        <label className="mt-5 block text-[13px] font-medium tracking-[-0.02em] text-[var(--fainter)]" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What should we talk about?"
          className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 text-[15px] tracking-[-0.02em] text-[var(--ink)] outline-none transition placeholder:text-[var(--fainter)] focus:border-[var(--line-strong)]"
        />

        <button
          type="submit"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--button-bg)] px-5 text-sm font-medium tracking-[-0.02em] text-[var(--button-fg)] transition hover:opacity-90"
        >
          Send
        </button>
      </form>
    </section>
  );
}
