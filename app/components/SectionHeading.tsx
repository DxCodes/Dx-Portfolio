export default function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-sm font-light tracking-[-0.02em] text-[var(--muted)] sm:text-base">
        {subtitle}
      </p>
    </>
  );
}
