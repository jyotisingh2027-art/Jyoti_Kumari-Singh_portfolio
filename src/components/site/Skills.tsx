import { skills } from "@/content/portfolio";
import workspaceBg from "@/assets/skills-workspace.jpg";

const iconModules = import.meta.glob("@/assets/skill-icons/*.png", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const iconsFor = (prefix: string) =>
  Object.entries(iconModules)
    .filter(([path]) => path.split("/").pop()!.startsWith(prefix + "-"))
    .sort(([a], [b]) => Number(a.match(/-(\d+)\.png$/)![1]) - Number(b.match(/-(\d+)\.png$/)![1]))
    .map(([, url]) => url);

const ICONS: Record<string, string[]> = {
  "Business Skills": iconsFor("business"),
  "Technical Skills": iconsFor("tech"),
  "AI Skills": iconsFor("ai"),
};

/** Small scattered "sticker" positions so icons look hand-placed rather than in a grid. */
const SCATTER = [
  "-rotate-6 translate-y-1",
  "rotate-3 -translate-y-2",
  "rotate-6 translate-y-2",
  "-rotate-3 -translate-y-1",
  "rotate-2 translate-y-3",
  "-rotate-6 -translate-y-2",
  "rotate-6 translate-y-1",
  "-rotate-2 translate-y-2",
];

export function Skills() {
  return (
    <section id="skills" className="surface-paper relative overflow-hidden py-28">
      {/* Workspace illustration behind the section, same treatment as the Journey section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom md:bg-fixed"
        style={{ backgroundImage: `url(${workspaceBg})` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper/55" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">What I do</p>
        <h2 className="display mt-4 text-5xl sm:text-7xl">
          Skills &amp; <span className="text-outline-ink">Stack</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className="group relative flex flex-col rounded-3xl border border-paper-foreground/15 bg-paper/85 p-8 text-paper-foreground shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-background/95 hover:text-foreground"
            >
              {ICONS[skill.title]?.[0] && (
                <img
                  src={ICONS[skill.title][0]}
                  alt=""
                  aria-hidden="true"
                  className="absolute top-6 right-6 size-14 rotate-6 object-contain drop-shadow-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                />
              )}
              <h3 className="display pr-16 text-3xl">{skill.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{skill.blurb}</p>

              {"groups" in skill && skill.groups ? (
                <div className="mt-6 space-y-6">
                  {skill.groups.map((group) => (
                    <div key={group.heading}>
                      <h4 className="text-xs font-bold uppercase tracking-widest opacity-50">
                        {group.heading}
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-current/25 px-3 py-1 text-xs font-semibold"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-current/25 px-3 py-1 text-xs font-semibold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {ICONS[skill.title] && ICONS[skill.title].length > 1 && (
                <div aria-hidden="true" className="mt-auto flex flex-wrap items-end justify-center gap-x-4 gap-y-3 pt-8">
                  {ICONS[skill.title].slice(1).map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className={`size-10 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-125 sm:size-11 ${SCATTER[i % SCATTER.length]}`}
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
