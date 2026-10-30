import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { site, socials, type Social } from "@/data/site";

const icons: Record<Social["label"], IconType> = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  X: SiX,
  Instagram: SiInstagram,
};

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[var(--line)] px-4 py-10 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 120% 90% at 50% 115%, var(--footer-mist), transparent 70%), radial-gradient(ellipse 70% 80% at 12% 120%, var(--footer-accent), transparent 72%), radial-gradient(ellipse 70% 80% at 88% 120%, var(--footer-mist), transparent 72%)",
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 items-center gap-5 text-center md:grid-cols-3 md:gap-4">
        <p className="text-sm font-medium tracking-[-0.02em] text-[var(--fainter)] md:justify-self-start md:text-left">
          © {site.copyrightYear} {site.domain}. All rights reserved.
        </p>
        <ul className="flex items-center justify-center gap-2 md:justify-self-center">
          {socials.map(({ label, href }) => {
            const Icon = icons[label];
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] transition hover:bg-[var(--card-hover)]"
                >
                  <Icon aria-hidden className="size-4" />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="text-sm font-medium tracking-[-0.02em] text-[var(--faint)] md:justify-self-end md:text-right">
          Made with <span aria-label="love">❤️</span> by {site.name}
        </p>
      </div>
    </footer>
  );
}
