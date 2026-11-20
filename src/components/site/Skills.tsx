import { useEffect, useRef, useState } from "react";

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
                <ScatterIcons icons={ICONS[skill.title].slice(1)} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICON = 34; // icon size in px
const GAP = 6; // clear space kept around text and other icons

/**
 * Places icons into the empty spaces of the parent card, never on top of text.
 * Positions are measured from the real layout and recalculated on resize, picking
 * spots spread as far apart as possible. Icons that do not fit are left out.
 */
function ScatterIcons({ icons }: { icons: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spots, setSpots] = useState<{ x: number; y: number; r: number }[]>([]);

  useEffect(() => {
    const layer = ref.current;
    const card = layer?.parentElement;
    if (!layer || !card) return;

    const place = () => {
      const box = card.getBoundingClientRect();
      const pad = 20;
      const blocked = [...card.querySelectorAll("h3, h4, p, li, img:not([data-scatter])")].map((el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - box.left - GAP, t: r.top - box.top - GAP, r: r.right - box.left + GAP, b: r.bottom - box.top + GAP };
      });
      // Only use the gaps between and beside the text: from under the title down to the last skill row.
      const rel = (el: Element) => el.getBoundingClientRect().top - box.top;
      const relBottom = (el: Element) => el.getBoundingClientRect().bottom - box.top;
      const title = card.querySelector("h3");
      const textEls = [...card.querySelectorAll("p, h4, li")];
      const yMin = title ? relBottom(title) + 4 : pad;
      const yMax = textEls.length ? Math.max(...textEls.map(relBottom)) - ICON + 6 : box.height - pad - ICON;
      void rel;
      const free: { x: number; y: number }[] = [];
      for (let y = yMin; y <= yMax; y += 6) {
        for (let x = pad; x <= box.width - pad - ICON; x += 6) {
          const hit = blocked.some((k) => x < k.r && x + ICON > k.l && y < k.b && y + ICON > k.t);
          if (!hit) free.push({ x, y });
        }
      }
      const chosen: { x: number; y: number; r: number }[] = [];
      const minDist = ICON + 26;
      for (let i = 0; i < icons.length && free.length; i++) {
        let best: { x: number; y: number } | null = null;
        let bestScore = -1;
        for (const c of free) {
          const d = chosen.length
            ? Math.min(...chosen.map((p) => Math.hypot(p.x - c.x, p.y - c.y)))
            : Math.hypot(c.x - box.width / 2, c.y) ; // start near the top-middle gap
          if (chosen.length && d < minDist) continue;
          const score = chosen.length ? d : -d;
          if (best === null || score > bestScore) {
            best = c;
            bestScore = score;
          }
        }
        if (!best) break;
        chosen.push({ ...best, r: ((i * 37) % 17) - 8 });
      }
      setSpots(chosen);
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(card);
    document.fonts?.ready.then(place).catch(() => {});
    return () => ro.disconnect();
  }, [icons]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {spots.map((p, i) => (
        <img
          key={icons[i]}
          src={icons[i]}
          alt=""
          data-scatter
          style={{ left: p.x, top: p.y, width: ICON, height: ICON, transform: `rotate(${p.r}deg)` }}
          className="absolute object-contain drop-shadow-sm"
        />
      ))}
    </div>
  );
}
