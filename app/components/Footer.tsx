const socials = [
  { label: "X", href: "https://x.com/", icon: <XIcon /> },
  { label: "Instagram", href: "https://instagram.com/", icon: <InstagramIcon /> },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-[var(--line)] px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8">
      <p className="text-lg font-bold tracking-[-0.02em] text-[var(--faint)]">
        Made with <span className="text-[#e11d48]">❤️</span> by Dhruv
      </p>
      <div className="flex items-center gap-2">
        {socials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition hover:bg-[var(--card-hover)]"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M14.7 10.3 22.1 2h-1.8l-6.4 7.2L8.8 2H2.2l7.8 11.1L2.2 22h1.8l6.9-7.8L15.2 22h6.6l-7.1-11.7Zm-2.4 2.7-.8-1.1L4.6 3.3h2.7l5.1 7.2.8 1.1 6.6 9.1h-2.7l-5.4-7.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
