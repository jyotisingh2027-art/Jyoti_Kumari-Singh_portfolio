import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { education } from "@/content/portfolio";
import classroomBg from "@/assets/classroom.jpg";
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
        const end = vh * 0.55; // fully "drawn" once it reaches mid-screen
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

type Segment = { x1: number; y1: number; x2: number; y2: number };

/**
 * SVG overlay that measures the real card positions and draws a dashed line
 * from each card's bottom edge all the way to the next card's top pin dot.
 */
function ConnectorLayer({
  listRef,
  itemRefs,
  progresses,
}: {
  listRef: React.RefObject<HTMLOListElement | null>;
  itemRefs: React.RefObject<(HTMLLIElement | null)[]>;
  progresses: number[];
}) {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const items = itemRefs.current;
      if (!list || !items) return;

      const listRect = list.getBoundingClientRect();
      const next: Segment[] = [];

      for (let i = 0; i < items.length - 1; i++) {
        const from = items[i];
        const to = items[i + 1];
        if (!from || !to) continue;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        next.push({
          x1: a.left - listRect.left + a.width / 2,
          y1: a.bottom - listRect.top,
          x2: b.left - listRect.left + b.width / 2,
          y2: b.top - listRect.top,
        });
      }
      setSegments(next);
    };

    measure();
    window.addEventListener("resize", measure);
    // re-measure after fonts/layout settle
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [listRef, itemRefs]);

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      {segments.map((s, i) => {
        const midY = (s.y1 + s.y2) / 2;
        const d = `M ${s.x1} ${s.y1} C ${s.x1} ${midY}, ${s.x2} ${midY}, ${s.x2} ${s.y2}`;
        // segment i draws itself as the next card (i + 1) scrolls into view
        const progress = progresses[i + 1] ?? 0;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1}
            className="text-ink opacity-50"
            style={{ strokeDasharray: "0.04 0.06", strokeDashoffset: 1 - progress }}
          />
        );
      })}
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
        transform: `translateY(${(1 - progress) * 40}px) rotate(${right ? 2 : -2}deg)`,
      }}
      className={cn(
        "relative rounded-[2rem] p-7 pt-9 shadow-lift transition-transform duration-300 hover:-translate-y-2 sm:p-9 sm:pt-10",
        right
          ? "bg-card text-card-foreground"
          : "border-2 border-ink/15 bg-paper text-paper-foreground",
      )}
    >
      {/* pin dot */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 size-7 -translate-x-1/2 rounded-full border-4 border-paper bg-gold shadow-lift"
      />

      {"photo" in stop && stop.photo && (
        <img
          src={stop.photo}
          alt={"photoAlt" in stop ? stop.photoAlt : ""}
          loading="lazy"
          className="absolute top-8 right-6 aspect-[3/4] w-20 rotate-3 rounded-xl border-4 border-white object-cover shadow-lift sm:top-9 sm:right-9 sm:w-28"
        />
      )}

      <div className={cn("photo" in stop && stop.photo && "pr-24 sm:pr-36")}>
        <p className={cn("display text-lg", right ? "text-gold" : "opacity-40")}>{stop.step}</p>
        <h3 className="display mt-2 text-3xl sm:text-4xl">{stop.stage}</h3>
        <p className="mt-3 flex items-center gap-3 text-base font-bold">
          {"logo" in stop && stop.logo && (
            <img
              src={stop.logo}
              alt={"logoAlt" in stop ? stop.logoAlt : ""}
              className={cn(
                "shrink-0 object-contain shadow-sm",
                "logoWide" in stop && stop.logoWide
                  ? "h-10 w-auto rounded-lg bg-black"
                  : "size-10 rounded-full bg-white p-0.5 ring-1 ring-ink/10",
              )}
            />
          )}
          <span>{stop.school}</span>
        </p>
        <p className={cn("mt-1 text-sm", right ? "text-gold" : "opacity-70")}>{stop.score}</p>
      </div>

      <div
        className={cn(
          "mt-5 flex items-center justify-between border-t pt-4 text-xs font-semibold tracking-widest uppercase opacity-70",
          right ? "border-sidebar-border" : "border-ink/15",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {stop.location}
        </span>
        <span>{stop.year}</span>
      </div>
    </article>
  );
}

export function Roadmap() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progresses, setProgresses] = useState<number[]>(() => education.map(() => 0));

  // Track how far each card has scrolled into view; segment i draws as card i+1 appears.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const start = vh * 0.95;
        const end = vh * 0.55;
        setProgresses(
          education.map((_, i) => {
            const el = itemRefs.current?.[i];
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            const p = (start - rect.top) / (start - end);
            return Math.min(1, Math.max(0, p));
          }),
        );
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

  return (
    <section id="journey" className="surface-paper relative overflow-hidden py-28">
      {/* Classroom sketch behind the whole section; stays put while the roadmap scrolls over it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${classroomBg})` }}
      />
      {/* Soft paper wash so the headline and cards stay easy to read */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper/70" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">How I got here</p>
        <h2 className="display mt-4 max-w-4xl text-5xl sm:text-7xl">
          THE ROADMAP THAT <span className="text-outline-ink">BROUGHT ME HERE</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
          A journey from school classrooms to engineering, consulting and business — each stop
          shaped how I solve problems today.
        </p>

        <ol ref={listRef} className="relative mt-20">
          <ConnectorLayer listRef={listRef} itemRefs={itemRefs} progresses={progresses} />
          {education.map((stop, i) => {
            const right = i % 2 === 1;
            const last = i === education.length - 1;
            return (
              <li
                key={stop.step}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn("relative md:w-[44%]", right && "md:ml-auto", !last && "mb-14 md:mb-24")}
              >
                <RoadmapCard stop={stop} right={right} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
