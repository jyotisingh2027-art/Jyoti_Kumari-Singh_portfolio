import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Pause, Play, Trophy, Volume2, VolumeX, X } from "lucide-react";

import { projectGroups, type ProjectPhoto } from "@/content/portfolio";

export function Projects() {
  const [lightbox, setLightbox] = useState<ProjectPhoto | null>(null);

  return (
    <>
    <section id="projects" className="surface-ink overflow-x-clip pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow opacity-60">Selected work</p>
            <h2 className="display mt-3 text-5xl sm:text-6xl">My Work</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed opacity-70">
            Work from my post-graduation programme and my undergraduate academic years.
          </p>
        </div>

        {projectGroups.map((group) => (
          <div key={group.heading} className={"headingImage" in group && group.headingImage ? "mt-6" : "mt-14"}>
            {"headingImage" in group && group.headingImage ? (
              <h3>
                <img
                  src={String(group.headingImage)}
                  alt={group.heading}
                  width={900}
                  height={group.heading === "Graduation" ? 492 : 546}
                  className="h-auto w-full max-w-[15rem] sm:max-w-[18rem]"
                />
              </h3>
            ) : (
              <h3 className="display text-2xl sm:text-3xl">
                <span className="text-gold">{group.heading.split("—")[0]}</span>
                {group.heading.includes("—") && (
                  <span className="opacity-70">—{group.heading.split("—")[1]}</span>
                )}
              </h3>
            )}
            <div className="mt-6">
              {group.projects.map((project, pIdx) => {
                const node = (() => {
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
                  "group grid gap-4 py-8 transition-colors hover:bg-sidebar-accent md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-10 md:px-4";

                const gallery =
                  "gallery" in project && project.gallery ? (project.gallery as ProjectPhoto[]) : null;

                const featureVideo =
                  "featureVideo" in project && project.featureVideo
                    ? (project.featureVideo as { src: string; poster: string; caption: string })
                    : null;
                if (gallery && (featureVideo || ("awardPhoto" in project && project.awardPhoto))) {
                  const awardPhoto = ("awardPhoto" in project ? project.awardPhoto : null) as ProjectPhoto | null;
                  const points = ("points" in project ? project.points : []) as {
                    heading: string;
                    items: string[];
                  }[];
                  return (
                    <article key={project.index} className="relative py-10 md:px-4">
                      {"sectionBg" in project && project.sectionBg && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-6 -bottom-6 left-1/2 w-screen -translate-x-1/2"
                          style={{
                            backgroundColor: String(project.sectionBg),
                            ...("sectionPattern" in project && project.sectionPattern === "dots"
                              ? {
                                  backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Crect x='2' y='6' width='2' height='2' fill='%23dcd8c9'/%3E%3C/svg%3E\")",
                                  backgroundSize: "12px 12px",
                                }
                              : {}),
                          }}
                        />
                      )}
                      {"sectionLogoBg" in project && project.sectionLogoBg && (
                        <div
                          aria-hidden="true"
                          className={`pointer-events-none absolute -top-6 -bottom-6 left-1/2 w-screen -translate-x-1/2 bg-contain bg-center bg-no-repeat ${
                            "sectionLight" in project && project.sectionLight ? "opacity-[0.14]" : "opacity-40"
                          }`}
                          style={{ backgroundImage: `url(${String(project.sectionLogoBg)})` }}
                        />
                      )}
                      <div
                        className={
                          "sectionLight" in project && project.sectionLight
                            ? "relative font-medium text-[#14101c] [&_.opacity-70]:opacity-100 [&_.opacity-80]:opacity-100 [&_.text-gold]:text-amber-800 [&_strong]:text-amber-800 [&_.bg-gold]:bg-gold [&_li]:border-ink/20 [&_.border-sidebar-border]:border-[#14101c]/30 [&_a.bg-foreground]:bg-[#14101c] [&_a.bg-foreground]:text-white"
                            : "relative"
                        }
                      >
                      {/* Top: award details (left) + award photo (right) */}
                      <div
                        className={`grid items-center gap-8 lg:gap-12 ${
                          "award" in project && project.award
                            ? "lg:grid-cols-2"
                            : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                        }`}
                      >
                        <div>
                          {"award" in project && project.award ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <p className="eyebrow text-gold">
                                {project.category} · {project.year}
                              </p>
                              {"comingSoon" in project && project.comingSoon && (
                                <p className="mt-3 inline-flex rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-gold italic">
                                  {String(project.comingSoon)}
                                </p>
                              )}
                              {"titleLogo" in project && project.titleLogo ? (
                                <h4 className="mt-5">
                                  <img
                                    src={String(project.titleLogo)}
                                    alt={project.title}
                                    className="h-24 w-auto object-contain sm:h-28 lg:h-32"
                                  />
                                </h4>
                              ) : (
                                <h4 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{project.title}</h4>
                              )}
                              {"tagline" in project && project.tagline && (
                                <p className="mt-4 text-base leading-relaxed opacity-80 sm:text-lg">
                                  {String(project.tagline)}
                                </p>
                              )}
                              <ul className="mt-6 flex flex-wrap gap-2">
                                {("highlightTags" in project ? (project.highlightTags as string[]) : []).map((tag) => (
                                  <li
                                    key={tag}
                                    className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-gold-foreground"
                                  >
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                              {"link" in project && project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
                                >
                                  {"linkLabel" in project ? project.linkLabel : "Open"} <ArrowUpRight className="size-4" />
                                </a>
                              )}
                              {"channels" in project && project.channels && (
                                <div className="mt-8">
                                  <p className="eyebrow opacity-70">Distribution channels</p>
                                  <ul className="mt-3 flex flex-wrap gap-2">
                                    {(project.channels as { label: string; href: string }[]).map((ch) => (
                                      <li key={ch.label}>
                                        <a
                                          href={ch.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 rounded-full border border-sidebar-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                                        >
                                          {ch.label} <ArrowUpRight className="size-3.5" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {featureVideo ? (
                          <AutoPlayVideo src={featureVideo.src} poster={featureVideo.poster} caption={featureVideo.caption} />
                        ) : (
                        <button
  type="button"
  onClick={() => setLightbox(awardPhoto!)}
  aria-label={`Open photo: ${awardPhoto.caption}`}
  className="group/photo block w-full cursor-zoom-in text-left"
>
                          <div className="relative overflow-hidden rounded-2xl border border-sidebar-border">
                            {"comingSoon" in project && project.comingSoon && (
                              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground shadow-lift">
                                <span className="size-2 animate-pulse rounded-full bg-gold-foreground" />
                                {String(project.comingSoon)}
                              </span>
                            )}
                            <img
                              src={awardPhoto.src}
                              alt={awardPhoto.alt}
                              className="w-full transition-transform duration-500 group-hover/photo:scale-[1.03]"
                            />
                          </div>
                          {!("hideCaption" in awardPhoto && awardPhoto.hideCaption) && (
                            <p className="mt-2 text-xs leading-snug opacity-70">{awardPhoto.caption}</p>
                          )}
                        </button>
                        )}
                      </div>

                      {/* Middle: product and project details */}
                      {points.length === 0 && (
                        <p className="mt-12 text-base leading-relaxed opacity-80 sm:text-lg">{project.blurb}</p>
                      )}
                      <div className={points.length ? "mt-12 grid gap-8 md:grid-cols-3" : "hidden"}>
                        {points.map((block) => (
                          <div key={block.heading}>
                            <p className="eyebrow text-gold">{block.heading}</p>
                            <ul className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
                              {block.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                                  <span>
                                    {item.split("**").map((part, i) =>
                                      i % 2 === 1 ? (
                                        <strong key={i} className="font-bold text-gold">
                                          {part}
                                        </strong>
                                      ) : (
                                        part
                                      ),
                                    )}
                                  </span>
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
                      <ul
                        className={`mt-10 grid grid-cols-2 gap-3 ${gallery.length === 0 ? "hidden" : ""} ${gallery.length === 5 ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-4"}`}
                      >
                        {gallery.map((photo) => (
                          <li key={photo.src}>
                            <button
  type="button"
  onClick={() => setLightbox(photo)}
  aria-label={`Open photo: ${photo.caption}`}
  className="group/photo block w-full cursor-zoom-in text-left"
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
                            </button>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </article>
                  );
                }

                const screens =
                  "screens" in project && project.screens ? (project.screens as ProjectPhoto[]) : null;

                if (screens && "link" in project && project.link) {
                  return (
                    <div key={project.index}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        aria-label={`${project.title} — ${project.linkLabel}`}
                      >
                        {inner}
                      </a>
                      <ul className="grid grid-cols-2 gap-3 pb-10 sm:grid-cols-3 lg:grid-cols-5 md:px-4">
                        {screens.map((shot) => (
                          <li key={shot.src}>
                            <button
  type="button"
  onClick={() => setLightbox(shot)}
  aria-label={`Open photo: ${shot.caption}`}
  className="group/photo block w-full cursor-zoom-in text-left"
>
                              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-sidebar-border">
                                <img
                                  src={shot.src}
                                  alt={shot.alt}
                                  loading="lazy"
                                  className="size-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                                />
                              </div>
                              <p className="mt-2 text-xs leading-snug opacity-70">{shot.caption}</p>
                            </button>
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
                })();
                return (
                  <Fragment key={project.index}>
                    {node}
                    <CodeMarquee seed={pIdx + group.heading.length} />
                  </Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}

/** Full-screen photo viewer with a close (X) button; Esc or clicking the backdrop also closes it. */
function Lightbox({ photo, onClose }: { photo: ProjectPhoto | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white text-black shadow-lift transition-transform hover:scale-105 sm:top-6 sm:right-6"
      >
        <X className="size-6" />
      </button>
      <figure className="flex max-h-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-lift"
        />
        <figcaption className="mt-4 text-center text-sm text-white/80">{photo.caption}</figcaption>
      </figure>
    </div>
  );
}

/**
 * Plays muted while on screen and pauses when scrolled away.
 * A YouTube-style control bar (play/pause, draggable seek bar, time, sound)
 * appears on hover, and stays visible on touch screens.
 */
function AutoPlayVideo({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const seek = (value: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = value;
    setTime(value);
  };

  const fmt = (t: number) => {
    const m = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <figure className="group/video">
      <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-black">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="block w-full cursor-pointer"
          aria-label={caption}
        />

        {/* Control bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 to-transparent px-4 pt-8 pb-3 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover/video:opacity-100 md:focus-within:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-white/15"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.currentTarget.value))}
            aria-label="Seek video"
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full accent-[var(--gold)]"
            style={{
              background: `linear-gradient(to right, var(--gold) ${pct}%, rgb(255 255 255 / 0.3) ${pct}%)`,
            }}
          />

          <span className="shrink-0 text-xs tabular-nums opacity-90">
            {fmt(time)} / {fmt(duration)}
          </span>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            {muted ? "Sound on" : "Mute"}
          </button>
        </div>
      </div>
    </figure>
  );
}

const CODE_TOKENS = [
  "0x7F000001",
  "192.168.1.1/24",
  "10110010",
  "fe80::1ff:fe23:4567:890a",
  "TCP/443",
  "0xDEADBEEF",
  "VLAN 20",
  "00:1A:2B:3C:4D:5E",
  "ping 8.8.8.8",
  "11000000.10101000",
  "BGP AS65001",
  "0xC0A80001",
  "DNS → 1.1.1.1",
  "01001110 01000101 01010100",
  "ARP who-has 10.0.0.1",
  "0xFF",
  "OSPF area 0",
  "255.255.255.0",
  "SYN → SYN-ACK → ACK",
  "0x1F4",
  "TTL=64",
  "10.10.0.0/16",
  "11111111",
  "HTTP 200 OK",
];

/** Full-width band of scrolling network / binary / hex snippets, used as a divider between projects. */
function CodeMarquee({ seed = 0 }: { seed?: number }) {
  const offset = seed % CODE_TOKENS.length;
  const tokens = [...CODE_TOKENS.slice(offset), ...CODE_TOKENS.slice(0, offset)];
  return (
    <div
      aria-hidden="true"
      className="relative left-1/2 my-6 flex w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-black py-1.5 text-white"
    >
      <div className="animate-marquee flex shrink-0 gap-6 pr-6 [animation-direction:reverse]">
        {[...tokens, ...tokens].map((t, i) => (
          <span key={`${t}-${i}`} className="font-mono text-[11px] whitespace-nowrap opacity-90">
            {t} <span className="opacity-60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
