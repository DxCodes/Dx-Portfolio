"use client"
import  { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { PiPersonSimpleRunLight } from "react-icons/pi";

// Icons from lucide-react, commonly used with shadcn/ui
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigation links data
  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#", label: "About" },
  ];

  const isDark = !mounted || resolvedTheme !== "light";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b font-sans tracking-[-0.02em] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || isMenuOpen
          ? "border-[var(--line)] bg-[var(--nav)] shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="#" className="group flex items-center gap-2">
              <PiPersonSimpleRunLight
                aria-hidden
                className="size-7 text-[var(--ink)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
              />
              <span className="text-lg font-semibold text-[var(--ink)]">Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
         

          {/* CTA Button, Theme Toggle and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="font-sans text-[15px] font-medium tracking-[-0.02em] text-[var(--faint)] transition-colors duration-300 hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
             <a href="#contact" className="hidden h-10 items-center justify-center rounded-full bg-[var(--button-bg)] px-4 text-sm font-medium tracking-[-0.02em] text-[var(--button-fg)] transition-colors duration-300 hover:opacity-90 sm:inline-flex">
                Contact me
             </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative grid size-9 place-items-center rounded-md text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--card-hover)]"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <SunIcon
                className={`col-start-1 row-start-1 h-5 w-5 transition-all duration-300 ${
                  isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-75 opacity-0"
                }`}
              />
              <MoonIcon
                className={`col-start-1 row-start-1 h-5 w-5 transition-all duration-300 ${
                  isDark ? "-rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--card-hover)]"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-t border-[var(--line)] bg-[var(--nav)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
        >
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-left font-sans text-[15px] font-medium tracking-[-0.02em] text-[var(--faint)] transition-colors duration-300 hover:bg-[var(--card-hover)] hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
             <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-2 block h-10 rounded-full bg-[var(--button-bg)] px-4 text-center text-sm font-medium leading-10 tracking-[-0.02em] text-[var(--button-fg)] transition-colors duration-300 hover:opacity-90">
                Contact me
             </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;