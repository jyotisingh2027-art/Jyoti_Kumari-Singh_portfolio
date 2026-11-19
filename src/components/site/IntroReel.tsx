import { Play, Pause, ArrowDown } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { profile, heroVideoSrc } from "@/content/portfolio";

/**
 * Full-screen showreel that sits between the preloader and the hero.
 * The video never autoplays: it starts (with sound) on the play button,
 * and once it ends the page glides down to the hero.
 */
export function IntroReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const goToHero = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.volume = 1;
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  if (!heroVideoSrc) return null;

  return (
    <section id="reel" className="relative h-screen w-full overflow-hidden bg-background">
      <video
        ref={videoRef}
        className="size-full object-cover"
        src={heroVideoSrc}
        playsInline
        preload="auto"
        onEnded={() => {
          setPlaying(false);
          goToHero();
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
        <div className="absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="display text-3xl text-foreground sm:text-5xl">{profile.brand}</p>
          <p className="eyebrow mt-3 opacity-70">Press play</p>
        </div>
      </div>

      <Button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause reel" : "Play reel"}
        variant="destructive"
        className="absolute top-1/2 left-1/2 z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border p-0 shadow-lift backdrop-blur transition-transform hover:scale-105"
      >
        {playing ? <Pause className="size-7" /> : <Play className="size-7" />}
      </Button>

      <button
        type="button"
        onClick={goToHero}
        className="eyebrow absolute right-6 bottom-8 z-10 flex items-center gap-2 text-foreground/80 transition-opacity hover:opacity-100 sm:right-12"
      >
        Skip <ArrowDown className="size-4" />
      </button>
    </section>
  );
}
