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

/** Hand-placed spots in each card's empty space, as [top %, left %, tilt °]. Used on large screens. */
const SPOTS: Record<string, [number, number, number][]> = {
  "Business Skills": [
    [46, 10, -8], [44, 52, 6], [57, 30, -4], [60, 72, 8], [72, 8, 5], [76, 46, -6], [88, 74, 4],
  ],
  "Technical Skills": [
    [11, 64, -6], [32, 86, 6], [42, 80, -5], [53, 60, 4], [53, 84, -6], [59, 88, 5],
    [68, 58, -4], [68, 80, 7], [77, 42, -6], [77, 70, 5], [82, 82, -4],
  ],
  "AI Skills": [
    [50, 82, 6], [58, 70, -5], [64, 86, 4], [73, 10, -6], [74, 38, 5], [72, 66, -4],
    [83, 22, 6], [84, 52, -5], [84, 80, 5], [93, 8, -4], [93, 40, 6],
  ],
};

export function Skills() {
  return (
    <section id="skills" className="surface-paper relative overflow-hidden py-28">
      {/* Workspace illustration behind the section, same treatment as the Journey section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom md:bg-fixed"
        style={{ backgroundImage: `url(${workspaceBg})` }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper/35" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">What I do</p>
        <h2 className="display mt-4 text-5xl sm:text-7xl">
          Skills &amp; <span className="text-outline-ink">Stack</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className="group relative flex flex-col rounded-3xl border border-paper-foreground/25 bg-paper/25 p-8 text-paper-foreground transition-colors duration-300 hover:bg-paper/60"
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
                            className="rounded-full border border-current/30 bg-white/70 px-3 py-1 text-xs font-semibold"
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
                      className="rounded-full border border-current/30 bg-white/70 px-3 py-1 text-xs font-semibold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {ICONS[skill.title] && ICONS[skill.title].length > 1 && (
                <>
                  {/* Large screens: icons tucked into the gaps around the skills */}
                  {ICONS[skill.title].slice(1).map((src, i) => {
                    const spot = SPOTS[skill.title]?.[i];
                    if (!spot) return null;
                    const [top, left, tilt] = spot;
                    return (
                      <img
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        data-skill-icon
                        style={{ top: `${top}%`, left: `${left}%`, transform: `rotate(${tilt}deg)` }}
                        className="absolute hidden size-10 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-125 lg:block"
                      />
                    );
                  })}
                  {/* Smaller screens: a simple row so nothing overlaps the text */}
                  <div aria-hidden="true" className="mt-6 flex flex-wrap gap-3 lg:hidden">
                    {ICONS[skill.title].slice(1).map((src) => (
                      <img key={src} src={src} alt="" className="size-9 object-contain" />
                    ))}
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
