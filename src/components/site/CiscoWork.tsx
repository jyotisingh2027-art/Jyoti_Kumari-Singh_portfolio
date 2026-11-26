import { useEffect, useRef, useState, type ReactNode } from "react";

import ciscoLogo from "@/assets/certs/cisco.png";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Account = {
  name: string;
  what: string;
  scope: string;
  mode: "migrate" | "upgrade";
  from: string;
  to: string;
  devices: number;
  steps: string[];
  points: string[];
  tech: string[];
};

const ACCOUNTS: Account[] = [
  {
    name: "Barclays",
    what: "Legacy-to-Nexus data-centre migration",
    scope: "87+ devices · Slough Data Center",
    mode: "migrate",
    from: "Legacy core",
    to: "Cisco Nexus",
    devices: 87,
    steps: ["Assess", "PDI plan", "Lab & failover test", "Configs (NAF)", "Cutover + checks"],
    points: [
      "Worked with the bank and third-party vendors to **assess the infrastructure and design the PDI plan** for moving off legacy gear.",
      "**Ran lab simulations and failover tests before production**, built and documented every device configuration, then cut over with pre- and post-checks.",
      "Planned and executed the changes in **Jira and Confluence**, with end-to-end deliverables from requirements to implementation.",
    ],
    tech: ["Nexus", "Data-centre migration", "Failover testing", "Jira", "Confluence"],
  },
  {
    name: "Bank of America",
    what: "Switch migration, hardware refresh & decommission",
    scope: "100+ switches · 50+ changes · 4 sites",
    mode: "migrate",
    from: "Ageing switches",
    to: "Refreshed estate",
    devices: 104,
    steps: ["Change plan", "NCD & LLD docs", "Config changes", "Refresh / decommission", "UAT validation"],
    points: [
      "Delivered **50+ network changes across 4 sites**: configuration changes, migration, hardware refresh and decommission of **Nexus, Catalyst and Arista** switches.",
      "Wrote the **Network Change Documents and Low-Level Designs** used on implementation day: steps, devices, expected output and topology.",
      "In an **Agile/Scrum** team, tested data-centre automation services (pre/post validation, playbook executor, software staging) in UAT, **saving test engineers 300+ man-hours**.",
    ],
    tech: ["Nexus", "Catalyst", "Arista", "Scrum", "UAT"],
  },
  {
    name: "CVS Health",
    what: "ACI fabric upgrade & VLAN migration",
    scope: "Plan · design · implement",
    mode: "upgrade",
    from: "Current ACI",
    to: "Target ACI",
    devices: 40,
    steps: ["Requirements", "Design", "Lab model", "VLAN migration", "Fabric upgrade"],
    points: [
      "Planned, designed and implemented **ACI fabric upgrades and VLAN migration**, aligned to the customer's requirements.",
      "Built **customer lab setups that mirror production**, so configurations and scenarios were proven before go-live.",
      "Supported the customer team on **network and automation questions**.",
    ],
    tech: ["Cisco ACI", "VLAN migration", "Lab modelling"],
  },
  {
    name: "Expedia",
    what: "ACI fabric upgrade with REST API automation",
    scope: "Upgrade + programmability",
    mode: "upgrade",
    from: "Current ACI",
    to: "Upgraded ACI",
    devices: 36,
    steps: ["Plan", "Fabric design", "REST API automation", "Upgrade", "Verify"],
    points: [
      "Planned and upgraded the customer's **Application Centric Infrastructure (ACI) fabric**.",
      "Enabled **REST API automation for ACI programmability**, working with the customer's engineers and tracking work on a **Kanban** board.",
    ],
    tech: ["Cisco ACI", "REST API", "Kanban"],
  },
  {
    name: "Wipro",
    what: "Standalone ACI fabric upgrade",
    scope: "4.2(3j) → 4.2(7f)",
    mode: "upgrade",
    from: "4.2(3j)",
    to: "4.2(7f)",
    devices: 24,
    steps: ["Understand prod", "MOP", "Pre-upgrade failover", "Upgrade", "NRFU sign-off"],
    points: [
      "Upgraded a standalone **ACI fabric from 4.2(3j) to 4.2(7f)** for production readiness.",
      "Wrote the step-by-step **Method of Procedure (MOP)** and **Network Ready for Use (NRFU)** plan, and ran **pre-upgrade failover testing**.",
    ],
    tech: ["Cisco ACI", "MOP", "NRFU", "Release management"],
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Browser-window frame, like a screenshot of a running tool. */
function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-lift">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-[#ecebef] px-3 py-2">
        <span className="size-2.5 rounded-full bg-gold ring-1 ring-ink/30" />
        <span className="size-2.5 rounded-full bg-ink/40" />
        <span className="size-2.5 rounded-full bg-ink/40" />
        <span className="ml-2 truncate font-mono text-[11px] text-ink/60">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Runs once when scrolled into view; returns [visible, ref]. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [seen, ref] as const;
}

/** Steps a counter from 0 to `max` every `ms` once `go` is true. */
function useStepper(max: number, ms: number, go: boolean, runId: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    setN(0);
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= max) window.clearInterval(t);
    }, ms);
    return () => window.clearInterval(t);
  }, [max, ms, go, runId]);
  return n;
}

const RunButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
  >
    ▶ {label}
  </button>
);

/* ------------------------------------------------------------------ */
/* Prototype 1: internship automation (Excel → XML → ACI REST)          */
/* ------------------------------------------------------------------ */

const ROWS = [
  ["Tenant-A", "BD-App", "EPG-Web", "110"],
  ["Tenant-A", "BD-App", "EPG-API", "120"],
  ["Tenant-A", "BD-Db", "EPG-Db", "130"],
  ["Tenant-B", "BD-Ops", "EPG-Mon", "210"],
];

function ConfigPushDemo() {
  const [seen, ref] = useInView<HTMLDivElement>();
  const [run, setRun] = useState(0);
  const n = useStepper(ROWS.length + 3, 650, seen, run);
  const parsed = Math.min(n, ROWS.length);
  const xml = n > ROWS.length;
  const pushed = n > ROWS.length + 1;
  const done = n > ROWS.length + 2;

  return (
    <div ref={ref}>
      <Frame title="ccpt.internal / deploy (Django)">
        <div className="grid gap-3 p-4 text-[11px] sm:grid-cols-2">
          <div>
            <p className="mb-1.5 font-bold text-ink/70">1 · Dataset (Excel)</p>
            <table className="w-full border-collapse font-mono">
              <thead>
                <tr className="bg-[#1f7a46] text-white">
                  {["Tenant", "BD", "EPG", "VLAN"].map((h) => (
                    <th key={h} className="px-1.5 py-1 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-ink/10 transition-colors duration-300 ${i < parsed ? "bg-gold/40" : ""}`}
                  >
                    {r.map((c, j) => (
                      <td key={j} className="px-1.5 py-1">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-ink/70">2 · Generated XML</p>
            <pre
              className={`flex-1 overflow-hidden rounded-lg bg-ink p-2 font-mono text-[10px] leading-snug text-[#c8f7d0] transition-opacity duration-500 ${xml ? "opacity-100" : "opacity-25"}`}
            >{`<fvTenant name="Tenant-A">
  <fvBD name="BD-App"/>
  <fvAp name="App">
    <fvAEPg name="EPG-Web">
      <fvRsBd tnFvBDName="BD-App"/>
    </fvAEPg>
  </fvAp>
</fvTenant>`}</pre>
            <p
              className={`rounded-lg border px-2 py-1.5 font-mono text-[10px] transition-colors duration-500 ${pushed ? "border-[#1f7a46] bg-[#e7f6ec] text-[#1f7a46]" : "border-ink/15 text-ink/40"}`}
            >
              3 · POST /api/mo/uni.xml → APIC {pushed ? "200 OK" : "…"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-4 py-2.5">
          <p className={`text-xs font-bold ${done ? "text-[#1f7a46]" : "text-ink/50"}`}>
            {done ? "✓ 4 EPGs configured on the fabric · 38 min end to end" : `Parsing rows… ${parsed}/${ROWS.length}`}
          </p>
          <RunButton onClick={() => setRun((x) => x + 1)} label="Run again" />
        </div>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Prototype 2: full-time automation (migration compliance validation)  */
/* ------------------------------------------------------------------ */

const CHECKS = [
  { dev: "leaf-101", item: "Interfaces up/up", ok: true },
  { dev: "leaf-102", item: "VLAN & EPG bindings", ok: true },
  { dev: "leaf-103", item: "Routing adjacencies", ok: true },
  { dev: "leaf-104", item: "VLAN 210 on Eth1/12", ok: false },
  { dev: "spine-201", item: "Fabric health score", ok: true },
  { dev: "spine-202", item: "Software version", ok: true },
];

function ComplianceDemo() {
  const [seen, ref] = useInView<HTMLDivElement>();
  const [run, setRun] = useState(0);
  const n = useStepper(CHECKS.length + 1, 450, seen, run);
  const done = n > CHECKS.length;
  const fails = CHECKS.filter((c, i) => i < n && !c.ok).length;

  return (
    <div ref={ref}>
      <Frame title="migration-validator · pre vs post check">
        <div className="p-4 text-[11px]">
          <div className="mb-2 grid grid-cols-[1fr_1.6fr_auto] gap-2 font-bold text-ink/60">
            <span>Device</span>
            <span>Check (pre → post)</span>
            <span>Result</span>
          </div>
          <ul className="space-y-1 font-mono">
            {CHECKS.map((c, i) => {
              const state = i < n ? (c.ok ? "pass" : "fail") : "wait";
              return (
                <li
                  key={c.dev}
                  className={`grid grid-cols-[1fr_1.6fr_auto] items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-300 ${state === "fail" ? "bg-[#fde8e8]" : state === "pass" ? "bg-[#eef8f1]" : "bg-ink/[0.03]"}`}
                >
                  <span>{c.dev}</span>
                  <span className="truncate">{c.item}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${state === "fail" ? "bg-[#d93030] text-white" : state === "pass" ? "bg-[#1f7a46] text-white" : "bg-ink/10 text-ink/50"}`}
                  >
                    {state === "wait" ? "…" : state.toUpperCase()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-4 py-2.5">
          <p className={`text-xs font-bold ${done ? "text-ink" : "text-ink/50"}`}>
            {done ? `✓ Report exported · ${fails} mismatch flagged for review` : `Validating ${Math.min(n, CHECKS.length)}/${CHECKS.length}…`}
          </p>
          <RunButton onClick={() => setRun((x) => x + 1)} label="Run again" />
        </div>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Prototype 3: account switcher with a live topology                   */
/* ------------------------------------------------------------------ */

const LEAVES = 6;

function Topology({ acc, progress }: { acc: Account; progress: number }) {
  // progress: 0..1 share of devices done
  const doneLeaves = Math.round(progress * LEAVES);
  const doneSpines = progress >= 1 ? 2 : progress > 0.5 ? 1 : 0;
  const nodeX = (i: number) => 40 + i * 64;
  const gold = "#f5d547";
  const grey = "#d9d6df";
  const ink = "#211533";
  const legacy = acc.mode === "migrate";
  return (
    <svg viewBox="0 0 400 210" className="h-auto w-full" role="img" aria-label={`${acc.name} topology prototype`}>
      {/* links */}
      {[0, 1].map((s) =>
        Array.from({ length: LEAVES }, (_, l) => (
          <line
            key={`${s}-${l}`}
            x1={140 + s * 120}
            y1={46}
            x2={nodeX(l)}
            y2={128}
            stroke={l < doneLeaves && s < Math.max(doneSpines, 1) ? gold : grey}
            strokeWidth={2}
          />
        )),
      )}
      {/* spines / core */}
      {[0, 1].map((s) => (
        <g key={s}>
          <rect
            x={110 + s * 120}
            y={26}
            width={60}
            height={28}
            rx={7}
            fill={s < doneSpines ? gold : legacy ? "#efe9da" : "#fff"}
            stroke={ink}
            strokeWidth={2}
          />
          <text x={140 + s * 120} y={45} textAnchor="middle" fontSize={11} fontWeight={700} fill={ink}>
            {legacy ? (s < doneSpines ? "nexus" : "core") : "spine"}-{s + 1}
          </text>
        </g>
      ))}
      {/* leaves / access */}
      {Array.from({ length: LEAVES }, (_, l) => {
        const done = l < doneLeaves;
        return (
          <g key={l} style={{ transition: "all .3s" }}>
            <rect
              x={nodeX(l) - 24}
              y={116}
              width={48}
              height={26}
              rx={6}
              fill={done ? gold : legacy ? "#efe9da" : "#fff"}
              stroke={ink}
              strokeWidth={2}
            />
            <text x={nodeX(l)} y={133} textAnchor="middle" fontSize={10} fontWeight={700} fill={ink}>
              {legacy ? (done ? "new" : "old") : "leaf"}-{l + 1}
            </text>
            {done && (
              <text x={nodeX(l) + 18} y={113} fontSize={12} fill="#1f7a46" fontWeight={800}>
                ✓
              </text>
            )}
            <line x1={nodeX(l)} y1={142} x2={nodeX(l)} y2={170} stroke={grey} strokeWidth={2} />
            <rect x={nodeX(l) - 10} y={170} width={20} height={14} rx={3} fill="#fff" stroke={grey} strokeWidth={2} />
          </g>
        );
      })}
      <text x={200} y={204} textAnchor="middle" fontSize={10} fill="#6b6478">
        Illustrative layout · sample data, no customer details
      </text>
    </svg>
  );
}

function AccountExplorer() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [seen, ref] = useInView<HTMLDivElement>();
  const acc = ACCOUNTS[active];
  const TICKS = 12;
  const n = useStepper(TICKS, 260, seen, run * 10 + active);
  const progress = n / TICKS;
  const stepIdx = Math.min(acc.steps.length - 1, Math.floor(progress * acc.steps.length));
  const count = Math.round(progress * acc.devices);

  return (
    <div ref={ref}>
      <div role="tablist" aria-label="Customer projects" className="flex flex-wrap gap-2">
        {ACCOUNTS.map((a, i) => (
          <button
            key={a.name}
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setRun((x) => x + 1);
            }}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${i === active ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <p className="eyebrow text-ink/60">{acc.scope}</p>
          <h4 className="display mt-2 text-3xl text-ink sm:text-4xl">{acc.what}</h4>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/75">
            {acc.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold ring-1 ring-ink/30" />
                <span>
                  <Marked text={p} />
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {acc.tech.map((t) => (
              <li key={t} className="rounded-full border border-ink/20 px-2.5 py-0.5 text-xs font-semibold text-ink">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Frame title={`change-tracker · ${acc.name.toLowerCase().replace(/\s+/g, "-")}`}>
          <div className="px-4 pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-bold text-ink">
                {acc.from} <span className="text-ink/40">→</span> {acc.to}
              </p>
              <p className="font-mono text-xs text-ink/70">
                {acc.mode === "migrate" ? "devices done" : "nodes upgraded"}:{" "}
                <span className="font-bold text-ink">
                  {count}/{acc.devices}
                  {acc.mode === "migrate" ? "+" : ""}
                </span>
              </p>
            </div>
            <ol className="mt-2 flex gap-1">
              {acc.steps.map((s, i) => (
                <li key={s} className="flex-1">
                  <span
                    className={`block h-1.5 rounded-full transition-colors duration-300 ${i <= stepIdx && n > 0 ? "bg-gold ring-1 ring-ink/20" : "bg-ink/10"}`}
                  />
                  <span className={`mt-1 block text-[9px] leading-tight sm:text-[10px] ${i === stepIdx ? "font-bold text-ink" : "text-ink/50"}`}>
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="px-2 pt-1">
            <Topology acc={acc} progress={progress} />
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-ink/10 px-4 py-2.5">
            <p className="text-xs font-bold text-ink/70">
              {progress >= 1 ? "✓ Change complete · post-checks passed" : "Change window in progress…"}
            </p>
            <RunButton onClick={() => setRun((x) => x + 1)} label="Replay" />
          </div>
        </Frame>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Impact cards                                                         */
/* ------------------------------------------------------------------ */

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-3xl bg-white p-6 shadow-lift">{children}</div>;
}

function BeforeAfter({ after }: { after: number }) {
  return (
    <div className="mt-3 space-y-2 text-xs text-ink/60">
      <div className="flex items-center gap-3">
        <span className="w-10">before</span>
        <span className="h-3 flex-1 rounded-full bg-ink" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-10">after</span>
        <span className="h-3 flex-1 rounded-full bg-ink/10">
          <span className="block h-3 rounded-full bg-ink" style={{ width: `${after}%` }} />
        </span>
      </div>
    </div>
  );
}

function ImpactCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <p className="display text-5xl text-ink">−56%</p>
        <BeforeAfter after={44} />
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Migration validation time</strong>, after I automated compliance validation for
          100+ Cisco consulting engineers.
        </p>
      </Card>
      <Card>
        <p className="display text-5xl text-ink">−80%</p>
        <BeforeAfter after={20} />
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Manual deployment effort</strong>: provisioning went from 2–3 hours to under 40
          minutes with my internship tool.
        </p>
      </Card>
      <Card>
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className={`aspect-square rounded-full ${i === 29 ? "bg-gold ring-1 ring-ink/30" : "bg-ink"}`} />
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">300+ man-hours saved</strong> for Bank of America test engineers by validating
          services and tightening QA. Each dot is ten hours.
        </p>
      </Card>
      <Card>
        <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className="aspect-square rounded-[2px] bg-ink" />
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">100+ switches, 50+ changes, 4 sites</strong> migrated, refreshed or
          decommissioned at Bank of America.
        </p>
      </Card>
      <Card>
        <p className="display text-5xl text-ink">87+</p>
        <p className="mt-1 font-mono text-xs text-ink/60">devices · legacy → Nexus</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Networking devices transformed for Barclays</strong>, de-risked with lab
          simulations and failover tests before every production change.
        </p>
      </Card>
      <Card>
        <p className="display text-5xl text-ink">5</p>
        <p className="mt-1 font-mono text-xs text-ink/60">enterprise accounts</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Barclays, Bank of America, CVS Health, Expedia and Wipro</strong>: banks,
          healthcare and tech, across migration, upgrade and automation work.
        </p>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* People & programs                                                    */
/* ------------------------------------------------------------------ */

const PROGRAMS = [
  { n: 23, label: "engineers cross-skilled", text: "Ran the Cross-Skill Upskill Program with Data Center and Business Critical Services leaders, improving utilisation." },
  { n: 10, label: "interns made project-ready", text: "Managed the Emerging Talent Internship Program and its training roadmap." },
  { n: 4, label: "apprentices supervised", text: "Led an apprentice cohort from onboarding to business readiness (2025–26)." },
  { n: 7, label: "engineers mentored", text: "Trained early-career engineers on ACI upgrades; named ‘Great Mentor’ FY23 by the Data Center Leader." },
];

function Programs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PROGRAMS.map((p) => (
        <Card key={p.label}>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: Math.min(p.n, 12) }, (_, i) => (
              <span key={i} className="block h-4 w-3 rounded-t-full bg-ink" />
            ))}
            {p.n > 12 && <span className="ml-1 text-xs font-bold text-ink/50">+{p.n - 12}</span>}
          </div>
          <p className="display mt-3 text-3xl text-ink">{p.n}</p>
          <p className="text-sm font-bold text-ink">{p.label}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink/65">{p.text}</p>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export function CiscoWork() {
  return (
    <section id="work" className="scroll-mt-20 bg-[#f1eff4] py-20 text-ink">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-ink/60">Proof of work · 2020 – 2026</p>
        <h2 className="display mt-3 text-5xl sm:text-6xl">My Work</h2>

        {/* Company header */}
        <div className="mt-10 flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="grid size-20 shrink-0 -rotate-3 place-items-center rounded-2xl bg-white p-2 shadow-[4px_4px_0_0_var(--gold)] ring-2 ring-ink">
              <img src={ciscoLogo} alt="Cisco" className="w-full" />
            </span>
            <div>
              <h3 className="display text-4xl sm:text-5xl">
                <span className="bg-[linear-gradient(transparent_58%,var(--gold)_58%,var(--gold)_92%,transparent_92%)] px-1">Cisco</span>
              </h3>
              <p className="mt-3 text-sm">
                <strong>Full time</strong> <span className="text-ink/60">· Bengaluru (India)</span>
              </p>
            </div>
          </div>
          <div className="space-y-4 sm:text-right">
            <div>
              <p className="display text-2xl sm:text-3xl">Consulting Engineer</p>
              <p className="text-sm text-ink/60">Aug 2020 – Jun 2026</p>
            </div>
            <div>
              <p className="display text-xl opacity-80 sm:text-2xl">CX Consulting Engineer Intern</p>
              <p className="text-sm text-ink/60">Jan 2020 – Jun 2020</p>
            </div>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl">
          Five-plus years delivering data-centre networks for global banks, healthcare and tech companies, and building
          the automation that made those changes faster and safer.
        </p>
        <p className="mt-3 max-w-3xl rounded-xl border border-dashed border-ink/25 bg-white/60 px-4 py-2.5 text-sm text-ink/70">
          Customer data can't be shared, so the screens below are <strong className="text-ink">working prototypes with
          sample data</strong> that recreate how each tool and project worked. Press ▶ to run them.
        </p>

        {/* Automation */}
        <h3 className="eyebrow mt-14 text-ink/70">01 · Automation I built</h3>
        <div className="mt-5 grid gap-8 lg:grid-cols-2">
          <div>
            <ConfigPushDemo />
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              <strong className="text-ink">Internship · Configuration Compliance Performance Tool.</strong> A Django web app
              on a Linux server that turns Excel datasets into XML and pushes them to Cisco ACI over the REST API.{" "}
              <strong className="text-ink">~80% less manual effort</strong>, provisioning from 2–3 hours to under 40 minutes,
              demoed to senior leadership.
            </p>
          </div>
          <div>
            <ComplianceDemo />
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              <strong className="text-ink">Full time · migration compliance validation.</strong> Automated pre- and
              post-migration checks for 100+ consulting engineers, cutting{" "}
              <strong className="text-ink">validation time by 56%</strong>. Also built CAFÉ, a Python tool that exports
              device data to Excel for ACI Day-2 audits, health checks and change management.
            </p>
          </div>
        </div>

        {/* Accounts */}
        <h3 className="eyebrow mt-16 text-ink/70">02 · Networks I delivered</h3>
        <div className="mt-5">
          <AccountExplorer />
        </div>

        {/* Impact */}
        <h3 className="eyebrow mt-16 text-ink/70">03 · Impact in numbers</h3>
        <div className="mt-5">
          <ImpactCards />
        </div>

        {/* People */}
        <h3 className="eyebrow mt-16 text-ink/70">04 · Growing the team</h3>
        <div className="mt-5">
          <Programs />
        </div>
      </div>
    </section>
  );
}
