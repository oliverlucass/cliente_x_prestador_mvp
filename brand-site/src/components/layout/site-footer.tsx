import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/lib/nav-links";

const footerNavigation = {
  explore: [
    { href: "#services", label: "Services" },
    { href: "#categories", label: "Categories" },
    { href: "#about", label: "About" },
  ],
  support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "FAQs" },
    { href: "#contact", label: "Contact" },
  ],
} as const;

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com", label: "GitHub", icon: Github },
] as const;

const linkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div id="about" className="space-y-4 scroll-mt-20">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Brand connects you with trusted local professionals. Search by
              category, compare ratings, and book services with confidence.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href="mailto:hello@brand.com" className={linkClassName}>
                  hello@brand.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href="tel:+15551234567" className={linkClassName}>
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>123 Market Street, San Francisco, CA</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Navigation
            </h2>
            <ul className="space-y-3">
              {footerNavigation.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Support
            </h2>
            <ul className="space-y-3">
              {footerNavigation.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Follow us
            </h2>
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Brand. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-4">
            <Link href="#" className={linkClassName}>
              Privacy Policy
            </Link>
            <Link href="#" className={linkClassName}>
              Terms of Service
            </Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClassName}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
