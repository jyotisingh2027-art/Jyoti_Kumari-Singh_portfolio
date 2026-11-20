import { ArrowUpRight, MapPin, Trophy } from "lucide-react";

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
                    <h4 className="display text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {project.title}
                    </h4>
                    <div>
                      <p className="text-sm leading-relaxed opacity-70">{project.blurb}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {("highlightTags" in project ? (project.highlightTags as string[]) : []).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground"
                          >
                            {tag}
                          </li>
                        ))}
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

                if (gallery && "awardPhoto" in project && project.awardPhoto) {
                  const awardPhoto = project.awardPhoto as ProjectPhoto;
                  const points = ("points" in project ? project.points : []) as {
                    heading: string;
                    items: string[];
                  }[];
                  return (
                    <article key={project.index} className="border-b border-sidebar-border py-10 md:px-4">
                      {/* Top: award details (left) + award photo (right) */}
                      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div>
                          <div className="rounded-3xl bg-gold p-6 text-gold-foreground shadow-lift sm:p-8">
                            <p className="flex items-start gap-3 text-sm font-bold tracking-wide uppercase sm:text-base">
                              <Trophy className="mt-0.5 size-5 shrink-0" />
                              <span>
                                {project.award} · {String("awardDate" in project ? project.awardDate : project.year)}
                              </span>
                            </p>
                            {"awardDetail" in project && project.awardDetail && (
                              <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                                <MapPin className="mt-0.5 size-5 shrink-0" />
                                <span>{String(project.awardDetail)}</span>
                              </p>
                            )}
                          </div>
                          <h4 className="display mt-8 text-3xl sm:text-4xl lg:text-5xl">{project.title}</h4>
                        </div>
                        <a
                          href={awardPhoto.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/photo block"
                        >
                          <div className="overflow-hidden rounded-2xl border border-sidebar-border">
                            <img
                              src={awardPhoto.src}
                              alt={awardPhoto.alt}
                              className="w-full transition-transform duration-500 group-hover/photo:scale-[1.03]"
                            />
                          </div>
                          <p className="mt-2 text-xs leading-snug opacity-70">{awardPhoto.caption}</p>
                        </a>
                      </div>

                      {/* Middle: product and project details */}
                      <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {points.map((block) => (
                          <div key={block.heading}>
                            <p className="eyebrow text-gold">{block.heading}</p>
                            <ul className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
                              {block.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-sidebar-border px-3 py-1 text-xs font-semibold"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      {/* Bottom: supporting photos */}
                      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
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
                                  className={`size-full object-cover transition-transform duration-500 group-hover/photo:scale-105 ${photo.anchorTop ? "object-top" : "object-center"}`}
                                />
                              </div>
                              <p className="mt-2 text-xs leading-snug opacity-70">{photo.caption}</p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                }

                const screens =
                  "screens" in project && project.screens ? (project.screens as ProjectPhoto[]) : null;

                if (screens && "link" in project && project.link) {
                  return (
                    <div key={project.index} className="border-b border-sidebar-border">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className.replace("border-b border-sidebar-border ", "")}
                        aria-label={`${project.title} — ${project.linkLabel}`}
                      >
                        {inner}
                      </a>
                      <ul className="grid grid-cols-2 gap-3 pb-10 sm:grid-cols-3 lg:grid-cols-5 md:px-4">
                        {screens.map((shot) => (
                          <li key={shot.src}>
                            <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group/photo block">
                              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-sidebar-border">
                                <img
                                  src={shot.src}
                                  alt={shot.alt}
                                  loading="lazy"
                                  className="size-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                                />
                              </div>
                              <p className="mt-2 text-xs leading-snug opacity-70">{shot.caption}</p>
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
