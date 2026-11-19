import { certifications } from "@/content/portfolio";

export function Certifications() {
  return (
    <section id="certifications" className="surface-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow opacity-60">Credentials</p>
        <h2 className="display mt-4 text-5xl sm:text-7xl">
          Certifi<span className="text-outline-ink">cations</span>
        </h2>

        <ul className="mt-14 space-y-4">
          {certifications.map((cert, index) => (
            <li
              key={cert.name}
              className="surface-paper flex flex-col gap-2 rounded-2xl border border-paper-foreground/15 p-6 transition-colors duration-300 hover:bg-background hover:text-foreground sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="display mt-1 text-gold text-xl">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold leading-snug">{cert.name}</h3>
                  <p className="mt-1 text-sm opacity-70">{cert.provider}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-current/25 px-3 py-1 text-xs font-semibold opacity-80 sm:ml-4">
                {cert.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
