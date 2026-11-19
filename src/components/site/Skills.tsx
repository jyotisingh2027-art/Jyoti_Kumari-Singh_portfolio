import { skills } from "@/content/portfolio";

export function Skills() {
  return (
    <section id="skills" className="surface-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">What I do</p>
        <h2 className="display mt-4 text-5xl sm:text-7xl">
          Skills &amp; <span className="text-outline-ink">Stack</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className="surface-paper group relative rounded-3xl border border-paper-foreground/15 p-8 transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              <h3 className="display text-3xl">{skill.title}</h3>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
