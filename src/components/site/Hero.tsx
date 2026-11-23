import type React from "react";
import { ArrowDownRight, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroPortraitAsset from "@/assets/jyoti-hero.png";

const heroPortrait = heroPortraitAsset;
import { profile, marqueeWords } from "@/content/portfolio";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--hero)]"
      style={{ "--hero": "oklch(0.51 0.16 300)" } as React.CSSProperties}
    >
      {/* Portrait with its green backdrop, faded into the section colour on every side by a soft mask (no hard edges) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 aspect-[1023/1060] h-full max-w-full lg:max-w-[52vw]"
        style={{
          maskImage:
            "radial-gradient(ellipse 64% 70% at 58% 42%, #000 58%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 64% 70% at 58% 42%, #000 58%, transparent 100%)",
        }}
      >
        <img
          src={heroPortrait}
          alt={`Portrait of ${profile.brand}`}
          width={1023}
          height={1060}
          className="size-full object-cover object-center"
        />
        {/* Light purple tint so the photo sits in the page's colour scheme without hiding the greenery */}
        <div className="absolute inset-0 bg-[var(--hero)]/45 lg:bg-[var(--hero)]/25" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-28">
        <p className="mb-5 inline-flex w-fit animate-rise items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-gold-foreground shadow-lift">
          <Rocket className="size-4" />
          0 → 1 Builder
        </p>
        <p className="eyebrow animate-rise opacity-80">
          {profile.availability.split("×").map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1 align-middle text-xl leading-none font-bold sm:text-2xl">×</span>}
              {part}
            </span>
          ))}
        </p>
        <h1 className="mt-6 max-w-4xl animate-rise">
          <span className="display block text-4xl sm:text-5xl lg:text-6xl">
            {profile.greeting}
          </span>
          <span className="display text-outline mt-2 block text-4xl sm:text-5xl lg:text-6xl">
            {profile.role}
          </span>
        </h1>
        <p className="mt-8 max-w-xl animate-rise text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-10 flex animate-rise flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="#projects">View My Journey</a>
          </Button>
          <Button asChild size="lg" variant="destructive" className="rounded-full px-8">
            <a href="#contact">
              Let's Connect <ArrowDownRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>


      <div className="surface-ink absolute inset-x-0 bottom-0 flex overflow-hidden py-4">
        <div className="animate-marquee flex shrink-0 gap-10 pr-10">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={`${word}-${i}`} className="display text-xl whitespace-nowrap opacity-90 lowercase">
              {word} <span className="opacity-40">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
