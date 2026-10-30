import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { projects } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 px-4 pt-20 pb-10 text-left sm:px-6 sm:pt-24 sm:pb-12 lg:px-8"
    >
      <SectionHeading title="Projects" subtitle="Things made by me" />

      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.title}>
            <article className="group flex h-full min-h-52 flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 transition duration-300 hover:bg-[var(--card-hover)]">
              <div className="flex items-center justify-between text-[13px] font-medium tracking-[-0.02em] text-[var(--fainter)]">
                <span>{project.tag}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-14">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed font-light text-[var(--faint)] sm:text-base">
                  {project.summary}
                </p>
                {(project.href || project.repo) && (
                  <div className="mt-4 flex items-center gap-4 text-sm font-medium text-[var(--ink)]">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        Live <LuArrowUpRight aria-hidden className="size-4" />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <LuGithub aria-hidden className="size-4" /> Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
