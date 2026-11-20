import portraitAsset from "@/assets/jyoti-about.png";

const heroPortrait = portraitAsset;
import { profile, stats } from "@/content/portfolio";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="surface-ink rotate-[-4deg] rounded-3xl p-3 shadow-lift">
            <img
              src={heroPortrait}
              alt={`${profile.brand} at work`}
              width={1280}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="surface-paper absolute -right-4 -bottom-6 rotate-3 rounded-2xl px-5 py-3 shadow-lift">
            <p className="eyebrow">Based in</p>
            <p className="font-display text-lg font-bold">{profile.location}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow opacity-80">About me</p>
          <h2 className="display mt-4 text-5xl sm:text-6xl">
            CREATING WITH PEOPLE, FOR PEOPLE
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Hello!
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I'm <span className="font-bold text-foreground">Jyoti Singh</span>,
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            A technology professional with 5+ years of experience working in enterprise technology
            and customer-facing consulting.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            My journey has taken me from engineering and infrastructure to consulting, client
            engagement, leadership and now technology &amp; business management.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            I enjoy understanding complex problems, bringing people together and turning ideas into
            practical solutions.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Currently, I'm exploring the intersection of technology, business and innovation.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-5 py-6">
                <dt className="display text-4xl">{stat.value}</dt>
                <dd className="mt-2 text-xs tracking-wide text-muted-foreground lowercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-24 w-full"
      >
        <path
          d="M0,64 C240,120 480,8 720,40 C960,72 1200,120 1440,72 L1440,120 L0,120 Z"
          fill="var(--paper)"
        />
      </svg>
    </section>
  );
}
