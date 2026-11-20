import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile, resumeUrl, socials } from "@/content/portfolio";
import { ConnectSpark } from "./ConnectSpark";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    // Placeholder: wire this up to real email/database delivery later.
    setTimeout(() => {
      setSending(false);
      toast.success("Thanks! This is a demo form — messages aren't sent yet.");
      event.currentTarget?.reset();
    }, 600);
  };

  return (
    <section id="contact" className="surface-ink relative overflow-hidden pt-24 pb-16">
      <h2 className="display pointer-events-none px-4 pb-6 text-center text-[9vw] leading-[1.05] whitespace-nowrap">
        Let's Connect
      </h2>

      <div className="relative mx-auto mt-4 max-w-6xl px-6">
        <ConnectSpark />
        <div className="relative z-10 grid gap-10 rounded-3xl bg-card p-8 shadow-lift sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow opacity-70">Reach me</p>
            <h3 className="display mt-4 text-4xl">Contact</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Looking to collaborate, build, or simply connect? I’m all ears
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="eyebrow opacity-60">Email</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold">
                  <Mail className="size-4 shrink-0 opacity-80" aria-hidden="true" />
                  <a href={`mailto:${profile.email}`} className="hover:underline underline-offset-4">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow opacity-60">Phone</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold">
                  <Phone className="size-4 shrink-0 opacity-80" aria-hidden="true" />
                  <a href={`tel:${profile.phone.replace(/-/g, "")}`} className="hover:underline underline-offset-4">
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow opacity-60">Location</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold">
                  <MapPin className="size-4 shrink-0 opacity-80" aria-hidden="true" />
                  {profile.location}
                </dd>
              </div>
            </dl>
            <ul className="mt-8 flex flex-wrap gap-6">
              {[
                ...socials.map((social) => ({
                  label: social.label,
                  href: social.href,
                  Icon: social.label === "GitHub" ? GitHubIcon : LinkedInIcon,
                })),
                { label: "Resume", href: resumeUrl, Icon: ResumeIcon },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span className="grid size-14 place-items-center rounded-full border border-border transition-all group-hover:-translate-y-0.5 group-hover:bg-foreground group-hover:text-background">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-xs font-semibold opacity-80">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required name="firstName" placeholder="First name" aria-label="First name" />
              <Input required name="lastName" placeholder="Last name" aria-label="Last name" />
            </div>
            <Input required type="email" name="email" placeholder="Email" aria-label="Email" />
            <Input name="subject" placeholder="Subject" aria-label="Subject" />
            <Textarea
              required
              name="message"
              rows={6}
              placeholder="Type your message here"
              aria-label="Message"
            />
            <Button type="submit" size="lg" disabled={sending} className="rounded-full">
              {sending ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>
      </div>

    </section>
  );
}

type IconProps = { className?: string };

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Stacked sheets of paper (label "Resume" sits underneath). */
function ResumeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 3h9a2 2 0 0 1 2 2v12" />
      <rect x="5" y="6" width="11" height="15" rx="2" />
      <path d="M8 11h5M8 14.5h5M8 18h3" />
    </svg>
  );
}
