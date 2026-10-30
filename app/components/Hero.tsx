"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const INTRO = "I am";
const EMOJI = "👋";
const ACCENT = "#ff5a0a";
const AVAILABLE = "#22c55e";
const INTERVAL_MS = 2000;
const SWAP_DURATION = 0.65;
const EASE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const enter = (i: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay: 0.1 * i, ease: EASE_OUT },
});

export default function Hero() {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const { greetings } = site;

  useEffect(() => {
    if (reduce || greetings.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % greetings.length),
      INTERVAL_MS + SWAP_DURATION * 1000,
    );
    return () => clearInterval(id);
  }, [greetings.length, reduce]);

  return (
    // reducedMotion="user" drops transform/blur animations for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <section
        style={{ "--hero-accent": ACCENT, "--hero-available": AVAILABLE } as CSSProperties}
        className="relative w-full overflow-hidden text-left md:min-h-[calc(100svh-7rem)]"
      >
        <div className="relative mx-auto flex w-full items-start px-4 pt-20 pb-14 sm:px-6 md:min-h-[calc(100svh-7rem)] md:pt-[164px] md:pb-8 lg:px-8">
          <div
            className={`grid w-full items-center gap-6 ${
              site.portrait ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" : ""
            }`}
          >
            <div className="flex flex-col items-start">
              {site.badge && (
                <motion.span
                  {...enter(0)}
                  className="mb-6 inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[0.8rem] font-medium text-[var(--hero-available)]"
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--hero-available)] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[var(--hero-available)]" />
                  </span>
                  {site.badge}
                </motion.span>
              )}

              <motion.h1
                {...enter(1)}
                className="flex flex-wrap items-center justify-start gap-x-[0.1em] text-left text-[clamp(2.25rem,5.6vw,4.25rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--ink)]"
              >
                {/* Screen readers and crawlers get a stable heading instead of the rotating greeting. */}
                <span className="sr-only">Hello, </span>
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
                      initial={{ y: "110%", opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: "-110%", opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: SWAP_DURATION, ease: EASE }}
                    >
                      {greetings[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>

                <span className="whitespace-nowrap">
                  {INTRO} {site.name}
                </span>

                <motion.span
                  aria-hidden
                  className="ml-[0.1em] inline-block select-none"
                  style={{ transformOrigin: "70% 70%", fontSize: "0.9em", lineHeight: 1 }}
                  animate={reduce ? undefined : { rotate: [0, 16, -8, 16, -4, 10, 0, 0] }}
                  transition={{
                    duration: 2.2,
                    ease: "easeInOut",
                    times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.82, 1],
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  }}
                >
                  {EMOJI}
                </motion.span>
              </motion.h1>

              <motion.p
                {...enter(2)}
                className="mt-3 text-[clamp(1rem,2.6vw,2rem)] leading-tight font-medium tracking-[-0.01em] text-[var(--muted)]"
              >
                {site.role}
              </motion.p>

              <motion.p
                {...enter(3)}
                className="mt-8 max-w-[34rem] text-[clamp(0.95rem,1.15vw,1.125rem)] leading-[1.65] text-[var(--soft)]"
              >
                {site.description}
              </motion.p>

              <motion.div {...enter(4)} className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--card-hover)]"
                >
                  <span className="size-2.5 rounded-full bg-[var(--hero-accent)] transition group-hover:scale-125" />
                  Let&apos;s connect
                </a>
              </motion.div>
            </div>

            {site.portrait && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
                className="flex justify-center lg:justify-end"
              >
                <LanyardCard src={site.portrait} alt={`Portrait of ${site.name}`} swing={!reduce} />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function LanyardCard({ src, alt, swing }: { src: string; alt: string; swing: boolean }) {
  return (
    <div className="relative w-[clamp(14rem,20vw,17rem)]">
      {/* strap – runs off the top of the section */}
      <div
        aria-hidden
        className="absolute bottom-[calc(100%-0.5rem)] left-1/2 h-[100vh] w-4 -translate-x-1/2 bg-[var(--strap)]"
        style={{
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
        <div
          aria-hidden
          className="absolute top-0 left-1/2 z-10 h-10 w-5 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-lg"
        >
          <span className="absolute top-1.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-zinc-100" />
          <span className="absolute top-4.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-zinc-100" />
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-t-[6px] border-[var(--hero-accent)] bg-zinc-200 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 17rem, 14rem"
            draggable={false}
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
