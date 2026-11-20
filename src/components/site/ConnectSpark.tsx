import { useEffect, useRef } from "react";

import connectLeft from "@/assets/connect-left.png";
import connectRight from "@/assets/connect-right.png";

/*
 * Two people pulled apart, with a current that runs up the purple cable,
 * jumps between the plugs as a flickering bolt, and carries on down the
 * orange cable. Coordinates are in a 1000 x 371 viewBox:
 *   left image  : x 0   – 485
 *   gap         : x 485 – 645
 *   right image : x 645 – 1000
 */
const W = 1000;
const H = 371;
const LEFT_W = 485;
const GAP = 160;
const RIGHT_W = 355;

const PURPLE_CABLE =
  "M0,323 L20,315 L40,302 L60,282 L80,257 L100,232 L120,211 L140,197 L160,186 L180,179 L200,174";
const ORANGE_CABLE = (() => {
  const pts: [number, number][] = [
    [740, 180], [758, 190], [772, 200], [784, 210], [795, 220], [804, 230],
    [813, 240], [821, 250], [826, 260], [830, 270], [832, 280], [831, 290],
    [824, 300], [814, 310], [795, 320], [776, 330], [762, 340],
  ];
  return "M" + pts.map(([x, y]) => `${x + GAP},${y}`).join(" L");
})();

const BOLT_FROM = { x: 468, y: 155 };
const BOLT_TO = { x: 498 + GAP, y: 157 };

const CYCLE = 2600; // ms
const A_END = 900; // purple pulse travels
const B_END = 1550; // bolt flickers between plugs
const C_END = 2400; // orange pulse travels
const PULSE = 46; // visible length of the travelling pulse

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

export function ConnectSpark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<SVGPathElement>(null);
  const orangeRef = useRef<SVGPathElement>(null);
  const boltRefs = useRef<(SVGPathElement | null)[]>([]);
  const boltGroupRef = useRef<SVGGElement>(null);
  const glowLeftRef = useRef<SVGCircleElement>(null);
  const glowRightRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const purple = purpleRef.current!;
    const orange = orangeRef.current!;
    const boltGroup = boltGroupRef.current!;
    const pLen = purple.getTotalLength();
    const oLen = orange.getTotalLength();
    purple.style.strokeDasharray = `${PULSE} ${pLen + PULSE}`;
    orange.style.strokeDasharray = `${PULSE} ${oLen + PULSE}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      boltGroup.style.opacity = "1";
      boltRefs.current.forEach((b, i) => b?.setAttribute("d", boltPath(8 + i * 4)));
      purple.style.opacity = "0";
      orange.style.opacity = "0";
      return;
    }

    let raf = 0;
    let running = false;
    let start = 0;
    let lastBolt = 0;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) % CYCLE;

      // Phase A: pulse up the purple cable toward him
      if (t < A_END) {
        const p = t / A_END;
        purple.style.opacity = "1";
        purple.style.strokeDashoffset = `${PULSE - p * (pLen + PULSE)}`;
      } else {
        purple.style.opacity = "0";
      }

      // Phase B: bolt jumps between the plugs
      const inB = t >= A_END - 120 && t < B_END;
      if (inB) {
        if (now - lastBolt > 55) {
          lastBolt = now;
          boltRefs.current.forEach((b, i) => b?.setAttribute("d", boltPath(10 + i * 6)));
        }
        const flick = 0.65 + Math.random() * 0.35;
        boltGroup.style.opacity = String(flick);
      } else {
        boltGroup.style.opacity = "0";
      }
      const plugGlow = inB ? 0.9 : Math.max(0, 1 - Math.abs(t - (A_END + B_END) / 2) / 900) * 0.25;
      glowLeftRef.current!.style.opacity = String(plugGlow);
      glowRightRef.current!.style.opacity = String(plugGlow);

      // Phase C: pulse runs on down the orange cable
      if (t >= B_END - 80 && t < C_END) {
        const p = (t - (B_END - 80)) / (C_END - B_END + 80);
        orange.style.opacity = "1";
        orange.style.strokeDashoffset = `${PULSE - p * (oLen + PULSE)}`;
      } else {
        orange.style.opacity = "0";
      }

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
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Two people connecting their cables, with electricity passing between the plugs"
    >
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

        {/* current pulses travelling along the cables */}
        <path
          ref={purpleRef}
          d={PURPLE_CABLE}
          fill="none"
          stroke="#e9d4ff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#spark-glow)"
          style={{ opacity: 0 }}
        />
        <path
          ref={orangeRef}
          d={ORANGE_CABLE}
          fill="none"
          stroke="#ffe3c2"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#spark-glow)"
          style={{ opacity: 0 }}
        />

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
    </div>
  );
}
