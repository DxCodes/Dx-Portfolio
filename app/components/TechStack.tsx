import type { IconType } from "react-icons";
import { RiGrokAiFill, RiOpenaiFill } from "react-icons/ri";
import {
  SiClaude,
  SiCursor,
  SiGithub,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const logos: { name: string; Icon: IconType }[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Supabase", Icon: SiSupabase },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Claude", Icon: SiClaude },
  { name: "Grok", Icon: RiGrokAiFill },
  { name: "Cursor", Icon: SiCursor },
  { name: "ChatGPT", Icon: RiOpenaiFill },
  { name: "Vercel", Icon: SiVercel },
  { name: "GitHub", Icon: SiGithub },
];

export default function TechStack() {
  return (
    <section id="stack" aria-label="Tools and technologies" className="relative scroll-mt-24">
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
              {logos.map(({ name, Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap text-[var(--faint)]"
                >
                  <Icon aria-hidden className="size-5 text-[var(--ink)]" />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
