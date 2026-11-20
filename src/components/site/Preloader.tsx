import { useEffect, useState } from "react";

import { profile } from "@/content/portfolio";

/**
 * Full-screen intro that sits over the page on load, then slides up to
 * reveal the hero (which starts playing immediately underneath).
 */
export function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setLeaving(true), 1900);
    const t2 = window.setTimeout(() => setGone(true), 2800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background text-accent transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : ""
      }`}
    >
      <p className="display animate-rise px-6 text-center text-4xl text-foreground sm:text-6xl">
        <span className="animate-flicker inline-block">{profile.brand}</span>
      </p>
    </div>
  );
}
