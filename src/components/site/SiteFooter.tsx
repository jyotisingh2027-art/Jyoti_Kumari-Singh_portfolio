import { profile, navLinks } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="surface-ink border-t border-sidebar-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="display text-2xl">{profile.brand}</p>
        <ul className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:opacity-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs opacity-60">
          © {new Date().getFullYear()} {profile.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
