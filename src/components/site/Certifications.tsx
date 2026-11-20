import { certifications } from "@/content/portfolio";

export function Certifications() {
  return (
    <section id="certifications" className="surface-paper py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">Credentials</p>
        <h2 className="display mt-3 text-4xl sm:text-6xl">
          Certifi<span className="text-outline-ink">cations</span>
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col items-center rounded-2xl border border-paper-foreground/15 bg-white/60 p-5 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              {cert.logo ? (
                <img
                  src={cert.logo}
                  alt={`${cert.provider} logo`}
                  className="h-14 w-auto max-w-[9rem] object-contain"
                />
              ) : (
                <span
                  aria-label={cert.provider}
                  className="display grid size-14 place-items-center rounded-full bg-ink text-xl text-gold"
                >
                  {cert.mark}
                </span>
              )}
              <h3 className="mt-4 text-sm leading-snug font-semibold">{cert.name}</h3>
              <p className="mt-2 text-xs opacity-60">
                {cert.provider} · {cert.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
