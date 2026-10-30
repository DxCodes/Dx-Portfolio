"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type HeroProps = {
  /* ---- content ---- */
  name?: string;
  intro?: string;
  role?: string;
  description?: string;
  greetings?: string[];
  emoji?: string;

  /** "Available" pill above the heading. Set to "" to hide. */
  badge?: string;
  /** Button with the accent dot. Set label to "" to hide. */
  secondaryCta?: { label: string; href: string };

  /* ---- right column ---- */
  /**
   * Anything you want on the right (image, illustration, 3D scene…).
   * If omitted and `image` is set, the lanyard ID-card is rendered.
   */
  visual?: ReactNode;
  /** Photo for the built-in lanyard card (used when `visual` is not given). */
  image?: string;
  imageAlt?: string;
  /** Swap sides: put the visual on the left. */
  reverse?: boolean;

  /* ---- motion ---- */
  interval?: number;
  transitionDuration?: number;
  wave?: boolean;
  /** Gentle swinging of the lanyard card. */
  swing?: boolean;

  /* ---- sizing (any CSS length / clamp()) ---- */
  titleSize?: string;
  roleSize?: string;
  descriptionSize?: string;
  descriptionWidth?: string;
  /** Max width of the bordered content column. */
  maxWidth?: string;
  /** Min height of the section. */
  minHeight?: string;
  /** Width of the lanyard card. */
  cardWidth?: string;
  /** Show dotted grid + vertical guide lines. */
  grid?: boolean;

  /* ---- colours (any CSS colour) ---- */
  background?: string;
  titleColor?: string;
  roleColor?: string;
  descriptionColor?: string;
  accent?: string;
  availableColor?: string;

  className?: string;
};

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                   */
/* -------------------------------------------------------------------------- */

const DEFAULT_GREETINGS = ["नमस्ते", "你好", "Ciao", "Hola", "Hello"];
const EASE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function Hero({
  name = "Dhruv",
  intro = "I am",
  role = "Software Developer & Fintech Builder",
  description = "I build web applications and SaaS products at the intersection of technology and finance. With a background in trading and a passion for building, I enjoy turning complex ideas and workflows into simple, useful software.",
  greetings = DEFAULT_GREETINGS,
  emoji = "👋",

  badge = "Available",
  secondaryCta = { label: "Let's connect", href: "#contact" },

  visual,
  image,
  imageAlt = "Portrait",
  reverse = false,

  interval = 2000,
  transitionDuration = 0.65,
  wave = true,
  swing = true,

  titleSize = "clamp(2.25rem, 5.6vw, 4.25rem)",
  roleSize = "clamp(1rem, 2.6vw, 2rem)",
  descriptionSize = "clamp(0.95rem, 1.15vw, 1.125rem)",
  descriptionWidth = "34rem",
  maxWidth = "100%",
  minHeight = "calc(100svh - 7rem)",
  cardWidth = "clamp(14rem, 20vw, 17rem)",
  grid = false,

  background = "transparent",
  titleColor = "var(--ink)",
  roleColor = "var(--muted)",
  descriptionColor = "var(--soft)",
  accent = "#ff5a0a",
  availableColor = "#22c55e",

  className = "",
}: HeroProps) {
  const [reduce, setReduce] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || greetings.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % greetings.length),
      interval + transitionDuration * 1000,
    );
    return () => clearInterval(id);
  }, [greetings.length, interval, transitionDuration, reduce]);

  const vars = {
    "--hero-bg": background,
    "--hero-title": titleColor,
    "--hero-role": roleColor,
    "--hero-desc": descriptionColor,
    "--hero-accent": accent,
    "--hero-available": availableColor,
    "--hero-title-size": titleSize,
    "--hero-role-size": roleSize,
    "--hero-desc-size": descriptionSize,
    "--hero-desc-width": descriptionWidth,
    "--hero-max-width": maxWidth,
    "--hero-min-height": minHeight,
    "--hero-card-width": cardWidth,
    fontFamily: "var(--font-hero, var(--font-sans, system-ui))",
  } as CSSProperties;

  const enter = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay: 0.1 * i, ease: EASE_OUT },
  });

  const rightSlot =
    visual ?? (image ? <LanyardCard src={image} alt={imageAlt} swing={swing && !reduce} /> : null);

  return (
    <section
      style={vars}
      className={`relative w-full overflow-hidden bg-[var(--hero-bg)] text-left md:min-h-[var(--hero-min-height)] ${className}`}
    >
      {/* dotted background */}
      {grid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
      )}

      <div
        className="relative mx-auto flex w-full max-w-[var(--hero-max-width)] items-start px-4 pt-[146px] pb-14 sm:px-6 md:min-h-[var(--hero-min-height)] md:pb-8 lg:px-8"
      >
        <div
          className={`grid w-full items-center gap-6 lg:gap-6 ${
            rightSlot ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" : ""
          }`}
        >
          {/* ============================ LEFT ============================ */}
          <div className={`flex flex-col items-start ${reverse ? "lg:order-2" : ""}`}>
            {badge && (
              <motion.span
                {...enter(0)}
                className="mb-6 inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[0.8rem] font-medium text-[var(--hero-available)]"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--hero-available)] opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[var(--hero-available)]" />
                </span>
                {badge}
              </motion.span>
            )}

            {/* Heading */}
            <motion.h1
              {...enter(1)}
              aria-label={`${greetings[index]} ${intro} ${name}`}
              className="flex flex-wrap items-center justify-start gap-x-[0.1em] text-left font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--hero-title)]"
              style={{ fontSize: "var(--hero-title-size)" }}
            >
              <span
                aria-hidden
                className="relative -my-[0.12em] inline-grid overflow-hidden py-[0.12em]"
              >
                {greetings.map((g) => (
                  <span key={g} className="invisible col-start-1 row-start-1 whitespace-nowrap">
                    {g}
                  </span>
                ))}
                <AnimatePresence initial={false} mode="sync">
                  <motion.span
                    key={greetings[index]}
                    className="col-start-1 row-start-1 whitespace-nowrap will-change-transform"
                    initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-110%", opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: transitionDuration, ease: EASE }}
                  >
                    {greetings[index]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span className="whitespace-nowrap">
                {intro} {name}
              </span>

              {emoji && (
                <motion.span
                  aria-hidden
                  className="ml-[0.1em] inline-block select-none"
                  style={{ transformOrigin: "70% 70%", fontSize: "0.9em", lineHeight: 1 }}
                  animate={wave && !reduce ? { rotate: [0, 16, -8, 16, -4, 10, 0, 0] } : undefined}
                  transition={{
                    duration: 2.2,
                    ease: "easeInOut",
                    times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.82, 1],
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  }}
                >
                  {emoji}
                </motion.span>
              )}
            </motion.h1>

            {/* Role */}
            <motion.p
              {...enter(2)}
              className="mt-3 font-medium leading-tight tracking-[-0.01em] text-[var(--hero-role)]"
              style={{ fontSize: "var(--hero-role-size)" }}
            >
              {role}
            </motion.p>

            {/* Description */}
            <motion.p
              {...enter(3)}
              className="mt-8 max-w-[var(--hero-desc-width)] leading-[1.65] text-[var(--hero-desc)]"
              style={{ fontSize: "var(--hero-desc-size)" }}
            >
              {description}
            </motion.p>

            {/* CTAs */}
            {secondaryCta.label && (
              <motion.div {...enter(4)} className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={secondaryCta.href}
                  className="group inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-6 py-3.5 text-[0.95rem] font-medium text-[var(--ink)] transition hover:bg-[var(--card-hover)]"
                >
                  <span className="size-2.5 rounded-full bg-[var(--hero-accent)] transition group-hover:scale-125" />
                  {secondaryCta.label}
                </a>
              </motion.div>
            )}
          </div>

          {/* ============================ RIGHT =========================== */}
          {rightSlot && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
              className={`flex justify-center lg:justify-end ${reverse ? "lg:order-1 lg:justify-start" : ""}`}
            >
              {rightSlot}
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lanyard ID-card (built-in right-side visual)                               */
/* -------------------------------------------------------------------------- */

function LanyardCard({ src, alt, swing }: { src: string; alt: string; swing: boolean }) {
  return (
    <div className="relative" style={{ width: "var(--hero-card-width)" }}>
      {/* strap – runs off the top of the section */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-[calc(100%-0.5rem)] h-[100vh] w-4 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.55))",
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
        }}
      />

      <motion.div
        style={{ transformOrigin: "50% -120%" }}
        animate={swing ? { rotate: [-1.8, 1.8, -1.8] } : undefined}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="relative"
      >
        {/* clip */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-10 h-10 w-5 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-lg"
        >
          <span className="absolute left-1/2 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-zinc-100" />
          <span className="absolute left-1/2 top-4.5 size-2.5 -translate-x-1/2 rounded-full bg-zinc-100" />
        </div>

        {/* card */}
        <div className="overflow-hidden rounded-2xl border-t-[6px] border-[var(--hero-accent)] bg-zinc-200 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="block aspect-[3/4] w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
