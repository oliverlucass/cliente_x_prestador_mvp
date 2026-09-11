import { Instagram, Linkedin, MapPin } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Separator } from "@/components/ui/separator";

const companyDescription =
  "Encontre profissionais de confiança perto de você, converse e agende seu serviço.";

const institutionalLinks = [
  { href: "#inicio", label: "Sobre nós" },
  { href: "#contato", label: "Contato" },
  { href: "#", label: "Política de Privacidade" },
  { href: "#", label: "Termos de Uso" },
] as const;

const usefulLinks = [
  { href: "#inicio", label: "Página inicial" },
  { href: "#servicos", label: "Produtos e serviços" },
] as const;

const socialNetworks = [
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
] as const;

const linkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="border-t bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <a href="#inicio" aria-label="Fechô, página inicial">
              <BrandLogo />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {companyDescription}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#527637]">
              Marketplace local de serviços
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold text-foreground">
              Institucional
            </h2>
            <ul className="space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClassName}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold text-foreground">
              Links úteis
            </h2>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClassName}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-sm font-bold text-foreground">
                Contato
              </h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#527637]"
                    aria-hidden="true"
                  />
                  <span>São Paulo, Brasil</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-bold text-foreground">
                Redes sociais
              </h2>
              <div className="flex gap-3" aria-label="Redes sociais">
                {socialNetworks.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    title={label}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Fechô. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Conceito {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
