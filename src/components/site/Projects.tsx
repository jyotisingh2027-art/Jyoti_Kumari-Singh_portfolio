import { ArrowUpRight, Trophy } from "lucide-react";

import { projectGroups, type ProjectPhoto } from "@/content/portfolio";

export function Projects() {
  return (
    <section id="projects" className="surface-ink py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow opacity-60">Selected work</p>
            <h2 className="display mt-4 text-5xl sm:text-7xl">Projects</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed opacity-70">
            Work from my post-graduation programme and my undergraduate academic years.
          </p>
        </div>

        {projectGroups.map((group) => (
          <div key={group.heading} className="mt-14">
            <h3 className="display text-2xl sm:text-3xl">
              <span className="text-gold">{group.heading.split("—")[0]}</span>
              {group.heading.includes("—") && (
                <span className="opacity-70">—{group.heading.split("—")[1]}</span>
              )}
            </h3>
            <div className="mt-6 border-t border-sidebar-border">
              {group.projects.map((project) => {
                const inner = (
                  <>
                    <span className="display text-2xl opacity-40">{project.index}</span>
                    <div>
                      {"award" in project && project.award && (
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold tracking-wide text-gold-foreground uppercase shadow-lift">
                          <Trophy className="size-4 shrink-0" />
                          {project.award}
                        </p>
                      )}
                      <h4 className="display text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                        {project.title}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed opacity-70">{project.blurb}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-sidebar-border px-3 py-1 text-xs font-semibold"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs tracking-widest uppercase opacity-60">
                        {project.category} · {project.year}
                      </span>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-sidebar-border transition-transform group-hover:-rotate-12">
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                  </>
                );

                const className =
                  "group grid gap-4 border-b border-sidebar-border py-8 transition-colors hover:bg-sidebar-accent md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-4";

                const gallery =
                  "gallery" in project && project.gallery ? (project.gallery as ProjectPhoto[]) : null;

                if (gallery) {
                  return (
                    <div key={project.index} className="border-b border-sidebar-border">
                      <div className={className.replace("border-b border-sidebar-border ", "")}>
                        {inner}
                      </div>
                      <ul className="grid grid-cols-2 gap-3 pb-10 md:grid-cols-4 md:px-4">
                        {gallery.map((photo) => (
                          <li key={photo.src}>
                            <a
                              href={photo.src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/photo block"
                            >
                              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-sidebar-border">
                                <img
                                  src={photo.src}
                                  alt={photo.alt}
                                  loading="lazy"
                                  className="size-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                                />
                              </div>
                              <p className="mt-2 text-xs leading-snug opacity-70">{photo.caption}</p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return "link" in project && project.link ? (
                  <a
                    key={project.index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    aria-label={`${project.title} — ${project.linkLabel}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={project.index} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
