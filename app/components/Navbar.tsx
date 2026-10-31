"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { LuMenu, LuMoon, LuSun, LuX } from "react-icons/lu";
import { PiPersonSimpleRunLight } from "react-icons/pi";
import { navLinks, site } from "@/data/site";

const subscribeNoop = () => () => {};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR/hydration, true afterwards — avoids a theme-icon hydration mismatch.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: focus the first link, close on Escape or outside click.
  useEffect(() => {
    if (!isMenuOpen) return;
    menuRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuOpen]);

  const isDark = !mounted || resolvedTheme !== "light";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b font-sans tracking-[-0.02em] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || isMenuOpen
          ? "border-[var(--line)] bg-[var(--nav)] shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_0_var(--line)] backdrop-blur-3xl backdrop-saturate-200"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#main" className="group flex flex-shrink-0 items-center gap-2">
            <PiPersonSimpleRunLight
              aria-hidden
              className="size-7 text-[var(--ink)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
            />
            <span className="text-lg font-semibold text-[var(--ink)]">{site.name}</span>
          </a>

          <div className="flex items-center gap-4">
            <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[15px] font-medium tracking-[-0.02em] text-[var(--faint)] transition-colors duration-300 hover:text-[var(--ink)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="hidden h-10 items-center justify-center rounded-full bg-[var(--button-bg)] px-4 text-sm font-medium tracking-[-0.02em] text-[var(--button-fg)] transition-colors duration-300 hover:opacity-90 sm:inline-flex"
            >
              Contact me
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="relative grid size-9 place-items-center rounded-md text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--card-hover)]"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <LuSun
                aria-hidden
                className={`col-start-1 row-start-1 size-5 transition-all duration-300 ${
                  isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-90 opacity-0"
                }`}
              />
              <LuMoon
                aria-hidden
                className={`col-start-1 row-start-1 size-5 transition-all duration-300 ${
                  isDark ? "scale-75 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                }`}
              />
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--card-hover)] md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <LuX aria-hidden className="size-6" />
              ) : (
                <LuMenu aria-hidden className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="absolute inset-x-0 top-full z-50 border-t border-[var(--line)] bg-[var(--nav)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-3xl backdrop-saturate-200 md:hidden"
        >
          <nav aria-label="Mobile" className="space-y-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-left font-sans text-[15px] font-medium tracking-[-0.02em] text-[var(--faint)] transition-colors duration-300 hover:bg-[var(--card-hover)] hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block h-10 rounded-full bg-[var(--button-bg)] px-4 text-center text-sm leading-10 font-medium tracking-[-0.02em] text-[var(--button-fg)] transition-colors duration-300 hover:opacity-90"
            >
              Contact me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
