import type { ReactNode } from "react";

const logos: { name: string; icon: ReactNode }[] = [
  { name: "Next.js", icon: <NextIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Tailwind CSS", icon: <TailwindIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
  { name: "Supabase", icon: <SupabaseIcon /> },
  { name: "PostgreSQL", icon: <PostgresIcon /> },
  { name: "Claude", icon: <ClaudeIcon /> },
  { name: "Grokbot", icon: <GrokIcon /> },
  { name: "Cursor", icon: <CursorIcon /> },
  { name: "ChatGPT", icon: <ChatGptIcon /> },
  { name: "Vercel", icon: <VercelIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
];

export default function TechStack() {
  return (
    <section aria-label="Tools and technologies" className="relative">
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-12"
          style={{ backgroundImage: "linear-gradient(to right, var(--fade), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-12"
          style={{ backgroundImage: "linear-gradient(to left, var(--fade), transparent)" }}
        />

        <div className="flex w-max animate-marquee py-5 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex items-center gap-14 pr-14">
              {logos.map((logo) => (
                <li
                  key={`${logo.name}-${copy}`}
                  className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap text-[var(--faint)]"
                >
                  <span className="text-[var(--ink)]">{logo.icon}</span>
                  {logo.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
      {children}
    </svg>
  );
}

function NextIcon() {
  return (
    <Icon>
      <path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8S6.6 21.8 12 21.8 21.8 17.4 21.8 12 17.4 2.2 12 2.2zm4.7 14.9h-1.6l-5.4-7.1v7.1H8.2V6.9h1.6l5.4 7.1V6.9h1.5v10.2z" />
    </Icon>
  );
}

function ReactIcon() {
  return (
    <Icon>
      <ellipse cx="12" cy="12" rx="2.1" ry="2.1" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </Icon>
  );
}

function TailwindIcon() {
  return (
    <Icon>
      <path d="M12 6.2c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 3-1.2.7.2 1.2.7 1.7 1.3.8.9 1.8 2 3.7 2 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-3 1.2-.7-.2-1.2-.7-1.7-1.3-.8-.9-1.8-2-3.7-2zM7.8 12c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 3-1.2.7.2 1.2.7 1.7 1.3.8.9 1.8 2 3.7 2 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-3 1.2-.7-.2-1.2-.7-1.7-1.3-.8-.9-1.8-2-3.7-2z" />
    </Icon>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <rect width="24" height="24" rx="3" fill="currentColor" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="#000"
        fontFamily="var(--font-sans), sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <Icon>
      <path d="M13.4 21.2c-.4.5-1.2.2-1.2-.4V14H6.4c-.7 0-1.1-.8-.7-1.4l7.9-9.8c.4-.5 1.2-.2 1.2.4V10h5.8c.7 0 1.1.8.7 1.4l-7.9 9.8z" />
    </Icon>
  );
}

function PostgresIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="12" cy="6.5" rx="6.2" ry="2.5" />
      <path d="M5.8 6.5v11c0 1.4 2.8 2.5 6.2 2.5s6.2-1.1 6.2-2.5v-11" />
      <path d="M5.8 12c0 1.4 2.8 2.5 6.2 2.5s6.2-1.1 6.2-2.5" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <Icon>
      <path d="M12 3.2 13.6 8l4.9.4-3.8 3.1 1.2 4.8L12 13.8 8.1 16.3l1.2-4.8L5.5 8.4 10.4 8 12 3.2z" />
    </Icon>
  );
}

function GrokIcon() {
  return (
    <Icon>
      <path d="M5 5.2h3.1l3.9 5.6 3.9-5.6H19L13.6 12 19 18.8h-3.1l-3.9-5.6-3.9 5.6H5L10.4 12 5 5.2z" />
    </Icon>
  );
}

function CursorIcon() {
  return (
    <Icon>
      <path d="M6.2 3.6 18.6 12l-6.2 1.2-2.4 6.1L6.2 3.6z" />
    </Icon>
  );
}

function ChatGptIcon() {
  return (
    <Icon>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 6.2a3.2 3.2 0 0 1 3 2 3.2 3.2 0 0 1 2.6 4.4 3.2 3.2 0 0 1-1.4 4.2 3.2 3.2 0 0 1-4.2 1.6 3.2 3.2 0 0 1-4.2-1.6 3.2 3.2 0 0 1-1.4-4.2A3.2 3.2 0 0 1 9 8.2a3.2 3.2 0 0 1 3-2z"
      />
      <circle cx="12" cy="12" r="1.3" />
    </Icon>
  );
}

function VercelIcon() {
  return (
    <Icon>
      <path d="M12 5.2 20.2 19H3.8L12 5.2z" />
    </Icon>
  );
}

function GitHubIcon() {
  return (
    <Icon>
      <path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1-2.9-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.3 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.2 8.2 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.8 8.8 0 0 0 12 3.2z" />
    </Icon>
  );
}
