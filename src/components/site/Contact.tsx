import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile, resumeUrl, socials } from "@/content/portfolio";

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
      <h2 className="display pointer-events-none px-4 pb-6 text-center text-[13vw] leading-[1.05]">
        Contact
      </h2>

      <div className="relative mx-auto mt-4 max-w-6xl px-6">
        <div className="grid gap-10 rounded-3xl bg-card p-8 shadow-lift sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow opacity-70">Reach me</p>
            <h3 className="display mt-4 text-4xl">Let's Connect</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Looking to collaborate, build, or simply connect? I’m all ears
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="eyebrow opacity-60">Email</dt>
                <dd className="mt-1 font-semibold">{profile.email}</dd>
              </div>
              <div>
                <dt className="eyebrow opacity-60">Location</dt>
                <dd className="mt-1 font-semibold">{profile.location}</dd>
              </div>
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                >
                  Resume
                </a>
              </li>
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
