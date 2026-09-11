import { BrandLogo } from "@/components/brand/brand-logo";
import { Separator } from "@/components/ui/separator";

const institutionalLinks = [
  { href: "#", label: "Sobre nós" },
  { href: "#", label: "Contato" },
  { href: "#", label: "Política de Privacidade" },
  { href: "#", label: "Termos de Uso" },
] as const;

const usefulLinks = [
  { href: "#inicio", label: "Página inicial" },
  { href: "#servicos", label: "Serviços" },
] as const;

const linkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Achou, conversou, fechô. Marketplace local de serviços para
              conectar você a profissionais perto de você.
            </p>
            <p className="text-xs font-bold uppercase text-[#527637]">
              Marketplace local de serviços
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase text-foreground">
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
            <h2 className="mb-4 text-xs font-bold uppercase text-foreground">
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
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Fechô. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
