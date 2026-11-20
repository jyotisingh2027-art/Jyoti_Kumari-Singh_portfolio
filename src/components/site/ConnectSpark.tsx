import { useEffect, useRef, type ReactNode } from "react";

import connectLeft from "@/assets/connect-left.png";
import connectRight from "@/assets/connect-right.png";

/*
 * Two people pulled apart, with a flickering bolt of current jumping
 * between their plugs. Coordinates are in a 1000 x 371 viewBox:
 *   left image  : x 0   – 485
 *   gap         : x 485 – 645
 *   right image : x 645 – 1000
 */
const W = 1000;
const H = 371;
const LEFT_W = 485;
const GAP = 160;
const RIGHT_W = 355;

const BOLT_FROM = { x: 468, y: 155 };
const BOLT_TO = { x: 498 + GAP, y: 157 };

const CYCLE = 1900; // ms
const BOLT_ON = 1300; // bolt visible for this part of each cycle

function boltPath(jitter: number) {
  const n = 9;
  let d = `M${BOLT_FROM.x},${BOLT_FROM.y}`;
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const taper = Math.sin(Math.PI * t);
    const x = BOLT_FROM.x + (BOLT_TO.x - BOLT_FROM.x) * t + (Math.random() - 0.5) * 6;
    const y = BOLT_FROM.y + (BOLT_TO.y - BOLT_FROM.y) * t + (Math.random() - 0.5) * jitter * 2 * taper;
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return `${d} L${BOLT_TO.x},${BOLT_TO.y}`;
}

export function ConnectSpark({ children }: { children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boltRefs = useRef<(SVGPathElement | null)[]>([]);
  const boltGroupRef = useRef<SVGGElement>(null);
  const glowLeftRef = useRef<SVGCircleElement>(null);
  const glowRightRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const boltGroup = boltGroupRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      boltGroup.style.opacity = "1";
      return;
    }

    let raf = 0;
    let running = false;
    let start = 0;
    let lastBolt = 0;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) % CYCLE;
      const on = t < BOLT_ON;
      if (on) {
        if (now - lastBolt > 55) {
          lastBolt = now;
          boltRefs.current.forEach((b, i) => b?.setAttribute("d", boltPath(10 + i * 6)));
        }
        boltGroup.style.opacity = String(0.65 + Math.random() * 0.35);
      } else {
        boltGroup.style.opacity = "0";
      }
      const glow = on ? 0.9 : 0;
      glowLeftRef.current!.style.opacity = String(glow);
      glowRightRef.current!.style.opacity = String(glow);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        start = 0;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(wrapRef.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none relative z-0 mx-auto -mb-[3px] w-full max-w-4xl select-none"
      style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}
    >
      <span className="sr-only">
        Two people connecting their cables, with electricity passing between the plugs
      </span>
      <img
        src={connectLeft}
        alt=""
        width={LEFT_W}
        height={H}
        className="absolute bottom-0 left-0 h-full w-auto"
        style={{ width: `${(LEFT_W / W) * 100}%` }}
      />
      <img
        src={connectRight}
        alt=""
        width={RIGHT_W}
        height={H}
        className="absolute bottom-0 right-0 h-full w-auto"
        style={{ width: `${(RIGHT_W / W) * 100}%` }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="spark-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="spark-grad" x1={BOLT_FROM.x} x2={BOLT_TO.x} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c99bff" />
            <stop offset="0.5" stopColor="#fff6e0" />
            <stop offset="1" stopColor="#ffb057" />
          </linearGradient>
          <radialGradient id="plug-glow-l">
            <stop offset="0" stopColor="#e4c8ff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#8b3dff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="plug-glow-r">
            <stop offset="0" stopColor="#ffe0b8" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* glow at the plug tips */}
        <circle ref={glowLeftRef} cx={BOLT_FROM.x - 4} cy={BOLT_FROM.y} r="34" fill="url(#plug-glow-l)" style={{ opacity: 0 }} />
        <circle ref={glowRightRef} cx={BOLT_TO.x + 4} cy={BOLT_TO.y} r="34" fill="url(#plug-glow-r)" style={{ opacity: 0 }} />

        {/* the bolt between the plugs */}
        <g ref={boltGroupRef} filter="url(#spark-glow)" style={{ opacity: 0 }}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              ref={(el) => {
                boltRefs.current[i] = el;
              }}
              d={boltPath(10 + i * 6)}
              fill="none"
              stroke={i === 0 ? "#ffffff" : "url(#spark-grad)"}
              strokeWidth={i === 0 ? 2.5 : 1.6}
              strokeOpacity={i === 0 ? 1 : 0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
      </svg>

      {children && (
        <div
          className="absolute -translate-x-1/2"
          style={{ left: "50%", bottom: 0 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
