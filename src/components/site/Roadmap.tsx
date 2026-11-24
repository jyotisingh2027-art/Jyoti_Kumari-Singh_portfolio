import { useEffect, useRef, useState } from "react";
import { MapPin, Award } from "lucide-react";

import { education } from "@/content/portfolio";
import classroomBg from "@/assets/classroom.jpg";
import blurPortrait from "@/assets/jyoti-hero.png";
import { cn } from "@/lib/utils";

/**
 * Returns 0 → 1 as the element travels up the viewport while scrolling.
 */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.95; // element enters at bottom edge
        const end = vh * 0.8; // fully "drawn" once it is comfortably on screen
        const p = (start - rect.top) / (start - end);
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/**
 * One continuous road across the section. It winds gently between the stops,
 * and each stop gets a numbered marker on the tarmac. Signboard cards stand on
 * posts beside the road (above it and below it, alternately).
 */
function RoadLayer({
  wrapRef,
  itemRefs,
  laneRef,
}: {
  wrapRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLLIElement | null)[]>;
  laneRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [geo, setGeo] = useState<{ w: number; y: number; xs: number[] } | null>(null);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const items = itemRefs.current;
      if (!wrap || !items) return;
      const box = wrap.getBoundingClientRect();
      const xs = items.map((li) => {
        const r = li?.getBoundingClientRect();
        return r ? r.left - box.left + r.width / 2 : 0;
      });
      const lane = laneRef.current?.getBoundingClientRect();
      const y = lane ? lane.top - box.top + lane.height / 2 : box.height / 2;
      setGeo({ w: box.width, y, xs });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [wrapRef, itemRefs, laneRef]);

  if (!geo) return null;
  const { w, y, xs } = geo;
  const sway = 22; // how far the road bends between stops
  // start off-screen on the left, pass through every stop, run off to the right
  const pts = [-1600, ...xs, w + 1600];
  let d = `M ${pts[0]} ${y}`;
  for (let i = 1; i < pts.length; i++) {
    const x0 = pts[i - 1];
    const x1 = pts[i];
    const dir = i % 2 ? -1 : 1;
    const span = x1 - x0;
    d += ` C ${x0 + span * 0.35} ${y + dir * sway}, ${x1 - span * 0.35} ${y + dir * sway}, ${x1} ${y}`;
  }

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
      <path d={d} fill="none" stroke="#e9e4d8" strokeWidth={56} />
      <path d={d} fill="none" stroke="#3b3942" strokeWidth={48} />
      <path d={d} fill="none" stroke="#ffd84d" strokeWidth={3} strokeDasharray="16 14" />
      {xs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={17} fill="#ffd84d" stroke="#fdfaf2" strokeWidth={4} />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fontSize={14}
            fontWeight={800}
            fill="#1c1626"
            fontFamily="Manrope, sans-serif"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

function RoadmapCard({
  stop,
  right,
}: {
  stop: (typeof education)[number];
  right: boolean;
}) {
  const { ref, progress } = useScrollProgress<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{
        opacity: 0.15 + progress * 0.85,
        transform: `translateY(${(1 - progress) * 24}px)`,
      }}
      className={cn(
        "relative rounded-3xl p-4 pt-6 shadow-lift transition-transform duration-300 hover:-translate-y-2",
        right
          ? "bg-card text-card-foreground"
          : "border-2 border-ink/15 bg-paper text-paper-foreground",
      )}
    >
      {"cardBg" in stop && stop.cardBg && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl bg-cover bg-center"
            style={{
              backgroundImage: `url(${stop.cardBg})`,
              ...("cardBgSoft" in stop && stop.cardBgSoft
                ? { filter: "saturate(0.6) contrast(0.75) brightness(1.15)" }
                : {}),
            }}
          />
          {/* light wash so the text stays readable over the photo */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r to-transparent",
              "cardBgNatural" in stop && stop.cardBgNatural
                ? "from-black/55 via-black/20"
                : right
                  ? "from-card/90 via-card/50"
                  : "from-paper/85 via-paper/45",
            )}
          />
        </>
      )}


      {"photo" in stop && stop.photo && (
        <img
          src={stop.photo}
          alt={"photoAlt" in stop ? stop.photoAlt : ""}
          loading="lazy"
          className={cn(
            "absolute -top-5 -right-3 z-10 rotate-6 rounded-lg border-[3px] border-white object-cover shadow-lift",
            "photoWide" in stop && stop.photoWide ? "aspect-[7/4] w-24" : "aspect-[3/4] w-14",
          )}
        />
      )}

      {"photoPlaceholder" in stop && stop.photoPlaceholder && (
        <div className="absolute top-8 right-6 aspect-[3/4] w-28 rotate-3 overflow-hidden rounded-xl border-4 border-white shadow-lift sm:top-9 sm:right-9 sm:w-40">
          {/* Deliberately blurred: the picture comes into focus at graduation */}
          <img
            src={blurPortrait}
            alt=""
            aria-hidden="true"
            className="size-full scale-125 object-cover blur-md"
          />
          <div className="absolute inset-0 grid place-items-center bg-black/25 p-2 text-center">
            <span className="text-sm font-semibold text-white italic drop-shadow sm:text-base">
              {stop.photoPlaceholder}
            </span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative",
          "photo" in stop && stop.photo && ("photoWide" in stop && stop.photoWide ? "[&>h3]:pr-16" : "[&>h3]:pr-10"),
        )}
      >
        <p className={cn("display text-base", right ? "text-gold" : "opacity-40")}>{stop.step}</p>
        <h3
          className={cn(
            "display mt-1 leading-tight",
            stop.stage.length > 30 ? "text-base" : "text-xl",
          )}
        >
          {stop.stage}
        </h3>
        {"logoFull" in stop && stop.logoFull ? (
          <p className="mt-3">
            <span className="inline-flex items-center rounded-lg bg-black px-2.5 py-1.5 shadow-lift">
              <img src={stop.logoFull} alt={stop.school} className="h-6 w-auto object-contain" />
            </span>
          </p>
        ) : (
        <p className="mt-2 flex items-center gap-2 text-xs leading-snug font-bold">
            {"logo" in stop && stop.logo && (
              <img
                src={stop.logo}
                alt={"logoAlt" in stop ? stop.logoAlt : ""}
                className={cn(
                  "shrink-0 object-contain shadow-sm",
                  "logoDark" in stop && stop.logoDark
                    ? "size-7 rounded-full bg-black ring-1 ring-white/20"
                    : "size-7 rounded-full bg-white p-0.5 ring-1 ring-ink/10",
                )}
              />
            )}
            <span>{stop.school}</span>
          </p>
        )}
        {"award" in stop && stop.award && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[11px] leading-tight font-bold text-gold-foreground shadow-lift">
            <Award className="size-3.5 shrink-0" />
            {String(stop.award)}
          </p>
        )}
        {stop.score && (
          <p className={cn("mt-1 text-xs", right ? "text-gold" : "opacity-70")}>{stop.score}</p>
        )}
      </div>

      <div
        className={cn(
          "relative mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t pt-2 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase opacity-70",
          right ? "border-sidebar-border" : "border-ink/15",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3" />
          {stop.location}
        </span>
        <span>{stop.year}</span>
      </div>
    </article>
  );
}

export function Roadmap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const laneRef = useRef<HTMLDivElement>(null);

  return (
    <section id="journey" className="surface-paper relative scroll-mt-16 overflow-hidden py-10">
      {/* Classroom sketch behind the whole section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${classroomBg})` }}
      />
      {/* Soft paper wash so the headline and cards stay easy to read */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper/70" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-2">
          <div>
            <p className="eyebrow opacity-60">How I got here</p>
            <h2 className="display mt-2 text-4xl sm:text-5xl">
              THE ROADMAP THAT <span className="text-outline-ink">BROUGHT ME HERE</span>
            </h2>
          </div>
        </div>

        <div ref={wrapRef} className="relative mt-6">
          <ol className="relative grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:grid-rows-[auto_56px_auto] lg:gap-x-8 lg:gap-y-0">
            {education.map((stop, i) => {
              const below = i % 2 === 1; // alternate sides of the road
              const posts = (
                <div aria-hidden="true" className="hidden min-h-7 flex-1 justify-center gap-24 lg:flex">
                  <span className="w-2 rounded-sm bg-[#57535f] shadow-sm" />
                  <span className="w-2 rounded-sm bg-[#57535f] shadow-sm" />
                </div>
              );
              return (
                <li
                  key={stop.step}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  style={{ gridColumn: i + 1, gridRow: below ? 3 : 1 }}
                  className="relative lg:flex lg:flex-col max-lg:![grid-column:auto] max-lg:![grid-row:auto]"
                >
                  {below && posts}
                  <RoadmapCard stop={stop} right={below} />
                  {!below && posts}
                </li>
              );
            })}
            <div ref={laneRef} aria-hidden="true" className="hidden lg:block" style={{ gridColumn: "1 / -1", gridRow: 2 }} />
          </ol>
          <RoadLayer wrapRef={wrapRef} itemRefs={itemRefs} laneRef={laneRef} />
        </div>
      </div>
    </section>
  );
}
