import type React from "react";
import { ArrowDownRight } from "lucide-react";

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
      {/* Full portrait, uncropped; sits closer to the text on wide screens */}
      <div className="pointer-events-none absolute inset-y-0 right-0 aspect-[780/950] h-full max-w-full lg:right-[4%] xl:right-[10%] 2xl:right-[16%]">
        <img
          src={heroPortrait}
          alt={`Portrait of ${profile.brand}`}
          width={780}
          height={950}
          className="size-full object-contain object-bottom opacity-60"
        />
        {/* Soft, even purple wash so the photo reads as a faded background */}
        <div className="absolute inset-0 bg-[var(--hero)]/50 lg:bg-[var(--hero)]/35" />
        {/* Fade every edge into the section colour so there is no visible box */}
        <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[var(--hero)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--hero)] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--hero)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--hero)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-28">
        <p className="eyebrow animate-rise opacity-80">{profile.availability}</p>
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
            <span key={`${word}-${i}`} className="display text-xl whitespace-nowrap opacity-90">
              {word} <span className="opacity-40">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
