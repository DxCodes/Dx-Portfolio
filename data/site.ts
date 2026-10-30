// Single source of truth for everything the site says about you.
// Edit this file to update copy, projects and links — components read from here.

export const site = {
  name: "Dhruv",
  domain: "heyitsdhruv.com",
  url: "https://heyitsdhruv.com",
  email: "hello@heyitsdhruv.com",
  title: "Dhruv — Software Developer & Fintech Builder",
  role: "Software Developer & Fintech Builder",
  description:
    "I build web applications and SaaS products at the intersection of technology and finance. With a background in trading and a passion for building, I enjoy turning complex ideas and workflows into simple, useful software.",
  greetings: ["नमस्ते", "你好", "Ciao", "Hola", "Hello"],
  badge: "Available",
  /** Path to a portrait in /public (e.g. "/portrait.jpg"). Shows the lanyard card when set. */
  portrait: null as string | null,
  copyrightYear: 2026,
};

export type Social = { label: "GitHub" | "LinkedIn" | "X" | "Instagram"; href: string };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/DxCodes" },
  // TODO: replace with your real profile URLs.
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
];

export type Project = {
  title: string;
  tag: string;
  summary: string;
  /** Live site. */
  href?: string;
  /** Source code. */
  repo?: string;
};

// TODO: replace these placeholders with your real projects.
export const projects: Project[] = [
  {
    title: "Project 1",
    tag: "Next.js",
    summary: "A quiet dashboard for tracking the work that actually ships.",
  },
  {
    title: "Project 2",
    tag: "Supabase",
    summary: "Shared notes that stay in sync without getting in the way.",
  },
  {
    title: "Project 3",
    tag: "AI",
    summary: "A small interface for talking to models and keeping the useful bits.",
  },
  {
    title: "Project 4",
    tag: "Product",
    summary: "A writing desk for engineers, built to stay out of the sentence.",
  },
];

export const navLinks = [
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
];
