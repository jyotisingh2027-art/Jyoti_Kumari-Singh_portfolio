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
              <div className="grid size-16 place-items-center overflow-hidden rounded-2xl bg-ink text-gold shadow-sm">
                {cert.logo ? (
                  <img src={cert.logo} alt={`${cert.provider} logo`} className="size-full bg-white object-contain p-2" />
                ) : (
                  <span
                    aria-label={cert.provider}
                    className={`display tracking-wide ${cert.mark.length > 3 ? "text-sm" : "text-2xl"}`}
                  >
                    {cert.mark}
                  </span>
                )}
              </div>
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
