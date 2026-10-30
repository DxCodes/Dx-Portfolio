const projects = [
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

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 pt-20 pb-10 text-left sm:px-6 sm:pt-24 sm:pb-12 lg:px-8">
      <h2 className="text-4xl font-bold tracking-[-0.03em] text-[var(--muted)] sm:text-5xl">
        Projects
      </h2>
      <p className="mt-3 text-sm font-light tracking-[-0.02em] text-[var(--soft)] sm:text-base">
        Things made by me
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.title}>
            <article className="group flex h-full min-h-52 flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 transition duration-300 hover:bg-[var(--card-hover)]">
              <div className="flex items-center justify-between text-[13px] font-medium tracking-[-0.02em] text-[var(--fainter)]">
                <span>{project.tag}</span>
                <span>0{index + 1}</span>
              </div>
              <div className="mt-14">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-[24ch] font-[0.25rem] font-light leading-relaxed text-[var(--faint)]">
                  {project.summary}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
