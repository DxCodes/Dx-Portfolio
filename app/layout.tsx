import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ThemeProvider from "@/app/components/ThemeProvider";
import { site, socials } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

// WebSite.name is what Google shows as the site name above the result heading.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: site.title, url: site.url },
    {
      "@type": "Person",
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.role,
      sameAs: socials.map((s) => s.href),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--button-bg)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--button-fg)]"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div className="relative mx-auto box-border flex min-h-screen w-full flex-col border-0 bg-[var(--frame)] p-2 md:w-[85%] md:border-x md:border-[var(--line)] lg:w-[70%]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
              }}
            />
            <div className="relative z-10 flex min-h-full flex-col">
              <Navbar />
              {children}
            </div>
          </div>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
